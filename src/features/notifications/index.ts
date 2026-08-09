import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import { readGoal, readProgress } from '@/features/progress/goal';
import i18n, { type LanguageCode } from '@/i18n';
import { readJSON, remove, StorageKeys, writeJSON } from '@/lib/storage';
import {
  asReminderFrequency,
  REMINDER_DESTINATIONS,
  REMINDER_HORIZON_DAYS,
  REMINDER_JITTER_MINUTES,
  REMINDER_MESSAGE_IDS,
  REMINDER_SLOT_HOURS,
  type ReminderFrequency,
  type ReminderMessageId,
} from './messages';
import { dayKey, planReminders } from './schedule';

const ANDROID_CHANNEL_ID = 'study-reminders';

function shuffle<T>(input: readonly T[]): T[] {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * Picks the messages for one day.
 *
 * Drawing from a shuffled copy and slicing guarantees the ids are distinct,
 * which is what enforces "never the same reminder twice in a day". There are 13
 * messages and at most 4 slots, so a day can always be filled.
 */
function pickForDay(slots: number): ReminderMessageId[] {
  return shuffle(REMINDER_MESSAGE_IDS).slice(0, slots);
}

/** The learner's chosen number of reminders a day. */
export async function readReminderFrequency(): Promise<ReminderFrequency> {
  return asReminderFrequency(
    await readJSON<unknown>(StorageKeys.reminderFrequency, null),
  );
}

/**
 * Whether today's target is already met.
 *
 * Read here rather than passed in, so the suppression rule and the marker that
 * records it cannot disagree — every path that rebuilds the queue gets the same
 * answer from the same place. Failing to `false` on a storage error is the safe
 * direction: the cost is a reminder the learner did not need, against a queue
 * that silently empties itself.
 */
async function isGoalMetToday(): Promise<boolean> {
  try {
    const goal = await readGoal();
    const progress = await readProgress(goal);
    return progress.correct >= goal;
  } catch {
    return false;
  }
}

/**
 * What the queue marker records, and why each field is in it.
 *
 * `refreshReminders` skips a rebuild while this still describes the queue the
 * OS is holding, so anything that would change the *content* of that queue has
 * to appear here or the skip goes stale. Language changes the text, frequency
 * changes which slots exist, and `suppressed` changes whether today has any —
 * that last one is what lets a rebuild after the goal is met actually drop the
 * evening's reminders instead of being skipped as up to date.
 */
type QueueMarker = {
  language: LanguageCode;
  coversThrough: string;
  frequency: ReminderFrequency;
  /** The day whose remaining slots were dropped for a met goal, or null. */
  suppressed: string | null;
};

export function configureNotificationHandler() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowBanner: true,
      shouldShowList: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
}

async function ensureAndroidChannel(language: LanguageCode) {
  if (Platform.OS !== 'android') return;
  const t = i18n.getFixedT(language);
  await Notifications.setNotificationChannelAsync(ANDROID_CHANNEL_ID, {
    name: t('notifications.channelName'),
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 250, 250, 250],
  });
}

/** Asks for permission if not already decided. Returns whether we may post. */
export async function requestPermission(): Promise<boolean> {
  try {
    const current = await Notifications.getPermissionsAsync();
    if (current.granted) return true;
    if (!current.canAskAgain) return false;
    const next = await Notifications.requestPermissionsAsync();
    return next.granted;
  } catch {
    // Same reason `hasPermission` swallows: Expo Go restricts parts of
    // expo-notifications, and this is the documented device-testing workflow
    // for this project. Reporting "not permitted" is the honest answer — see
    // `setRemindersEnabled` for what depends on it.
    return false;
  }
}

export async function hasPermission(): Promise<boolean> {
  try {
    return (await Notifications.getPermissionsAsync()).granted;
  } catch {
    // Expo Go restricts parts of expo-notifications; treat an unavailable
    // module as "no permission" rather than letting it reject into a caller
    // that invoked us with `void`.
    return false;
  }
}

/**
 * Rebuilds the queue of pending reminders in `language`.
 *
 * Everything pending is cancelled first: reminder text is baked in at schedule
 * time, so a stale queue would keep firing in the previous language. Message
 * choices are persisted per day, meaning a mid-day reschedule reuses that day's
 * already-drawn set instead of risking a repeat.
 */
/**
 * Serialises queue rebuilds.
 *
 * `refreshReminders` runs on mount *and* on every foreground, and
 * `scheduleReminders` is cancel-then-schedule with an `await` between the two
 * halves. Two overlapping runs interleave as: A cancels, A queues twelve, B
 * cancels (wiping A's), B queues twelve — or worse, B's cancel lands between
 * A's cancel and A's writes, leaving twenty-four reminders queued and the user
 * getting every notification twice.
 *
 * Chaining onto the previous run rather than dropping the new one matters
 * because the second call is usually the one with fresh intent — a language
 * change, or a day that has rolled over.
 */
let queueRebuild: Promise<unknown> = Promise.resolve();

function serialise<T>(work: () => Promise<T>): Promise<T> {
  // `.catch` first so one failed rebuild cannot poison every later one.
  const next = queueRebuild.catch(() => {}).then(work);
  queueRebuild = next.catch(() => {});
  return next;
}

export function scheduleReminders(language: LanguageCode): Promise<number> {
  return serialise(() => scheduleRemindersUnsafe(language));
}

async function scheduleRemindersUnsafe(language: LanguageCode): Promise<number> {
  if (!(await hasPermission())) return 0;

  await Notifications.cancelAllScheduledNotificationsAsync();
  await ensureAndroidChannel(language);

  const t = i18n.getFixedT(language);
  const [history, frequency, goalMetToday] = await Promise.all([
    readJSON<Record<string, ReminderMessageId[]>>(
      StorageKeys.notificationHistory,
      {},
    ),
    readReminderFrequency(),
    isGoalMetToday(),
  ]);

  const now = new Date();
  const plan = planReminders({
    now,
    hours: REMINDER_SLOT_HOURS[frequency],
    horizonDays: REMINDER_HORIZON_DAYS,
    jitterMinutes: REMINDER_JITTER_MINUTES,
    drawFor: pickForDay,
    picks: history,
    goalMetToday,
  });

  // Queued together rather than awaited in turn: this runs on every app
  // foreground, and a dozen sequential native round-trips is long enough to be
  // felt as a stutter on resume.
  const pending = plan.reminders.map(({ messageId, fireAt }) => {
    const title = t(`notifications.items.${messageId}.title`);
    const body = t(`notifications.items.${messageId}.body`);

    return Notifications.scheduleNotificationAsync({
      content: {
        title,
        // Some reminders are a single line; an empty body renders as a
        // title-only notification on both platforms.
        ...(body ? { body } : {}),
        // Where a tap on this one goes. Carried on the notification rather than
        // looked up on arrival because the tap can be handled by a *later
        // build* — these sit in the OS queue for up to three days — and the
        // message that was scheduled is the promise that has to be kept.
        // `destinationFrom` validates it back, since by then the id may no
        // longer exist. See `routing.ts`.
        data: { destination: REMINDER_DESTINATIONS[messageId] },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.DATE,
        date: fireAt,
        // On the **trigger**, not on `content`. `NotificationContentInput` has
        // no `channelId` field, and putting one there typechecks only because
        // a conditional spread defeats excess-property checking — so it was
        // silently dropped and every reminder landed on Android's fallback
        // channel instead of the named one created just above. Undefined off
        // Android, which the module ignores.
        ...(Platform.OS === 'android' ? { channelId: ANDROID_CHANNEL_ID } : {}),
      },
    });
  });

  // `allSettled`, not `all`: a single rejected schedule call would otherwise
  // abort the batch, skip both state writes below, and surface as an unhandled
  // rejection — every caller invokes this with `void`. A reminder that fails to
  // queue is worth losing; the queue marker is not.
  const results = await Promise.allSettled(pending);
  const scheduled = results.filter((r) => r.status === 'fulfilled').length;

  await writeJSON(StorageKeys.notificationHistory, plan.picks);
  const marker: QueueMarker = {
    language,
    coversThrough: plan.coversThrough,
    frequency,
    suppressed: goalMetToday ? dayKey(now) : null,
  };
  await writeJSON(StorageKeys.notificationQueue, marker);
  return scheduled;
}

export function cancelReminders(): Promise<void> {
  // Serialised alongside the rebuilds: an unsequenced cancel can land between a
  // rebuild's cancel and its writes, leaving the queue marker claiming a
  // horizon that nothing is scheduled for.
  return serialise(async () => {
    await Notifications.cancelAllScheduledNotificationsAsync();
    await remove(StorageKeys.notificationQueue);
  });
}

/**
 * Entry point for the settings toggle. Requesting permission is only attempted
 * when enabling, so a declined prompt leaves the switch off.
 *
 * **Never rejects, and that is the contract `PreferencesProvider` relies on.**
 * It persists whatever this returns as the effective state; a rejection instead
 * skips both the state correction and the write, leaving the switch showing ON
 * with nothing scheduled behind it — the exact failure the "return the
 * effective state" design exists to prevent, arrived at by a different route.
 * It also escapes as an unhandled rejection, because the settings screen
 * invokes the toggle with `void`.
 *
 * The paths that can throw are all native: `getPermissionsAsync`,
 * `requestPermissionsAsync`, `cancelAllScheduledNotificationsAsync` and
 * `setNotificationChannelAsync` are restricted or unavailable in Expo Go, which
 * is this project's documented device-testing workflow. Failing closed — the
 * switch snapping back to OFF — is both truthful and recoverable; a switch
 * stuck ON is neither.
 */
export async function setRemindersEnabled(
  enabled: boolean,
  language: LanguageCode,
): Promise<boolean> {
  if (!enabled) {
    // Reported as off either way. A cancel that could not reach the OS leaves
    // reminders queued, but telling the user they are still on when they asked
    // for them off — and then re-queueing on the next foreground, since the
    // stored preference would stay ON — is the worse of the two.
    await cancelReminders().catch(() => {});
    return false;
  }
  const granted = await requestPermission();
  if (!granted) return false;
  try {
    await scheduleReminders(language);
  } catch {
    return false;
  }
  return true;
}

/** Re-queues pending reminders so their text matches the new language. */
export function rescheduleForLanguageChange(
  language: LanguageCode,
): Promise<void> {
  // Inside the lock, and for a sharper reason than the others: the "is anything
  // pending?" check reads zero while a concurrent rebuild sits between its
  // cancel and its re-schedule. Unsequenced, a language change landing in that
  // window returns early and leaves the whole queue in the *previous* language
  // — the one failure this function exists to prevent.
  return serialise(async () => {
    try {
      const pending = await Notifications.getAllScheduledNotificationsAsync();
      if (pending.length === 0) return;
      await scheduleRemindersUnsafe(language);
    } catch {
      // Language switching must never fail because reminders could not be
      // re-queued; the next foreground rebuilds the queue.
    }
  });
}

/**
 * Called on every app foreground. Keeps the rolling horizon topped up as days
 * elapse and prunes day records older than the horizon.
 *
 * Rebuilding the queue means cancelling and re-scheduling every reminder, so it
 * is skipped while the existing queue already covers the horizon in the current
 * language — otherwise every resume, however brief, would pay for a full
 * rebuild. Only the day rolling over or a language change forces the work.
 */
export function refreshReminders(language: LanguageCode): Promise<void> {
  // The whole decision runs inside the lock, not just the rebuild it triggers.
  // Checking the marker outside would let two foregrounds both read a stale
  // marker and both queue a rebuild — harmless once serialised, but it pays for
  // the work twice on a resume, which is exactly what the marker exists to
  // avoid.
  return serialise(async () => {
    try {
      if (!(await hasPermission())) return;

      const now = new Date();
      const horizonEnd = new Date(now);
      horizonEnd.setDate(horizonEnd.getDate() + REMINDER_HORIZON_DAYS - 1);

      const [queue, frequency, goalMetToday] = await Promise.all([
        readJSON<QueueMarker | null>(StorageKeys.notificationQueue, null),
        readReminderFrequency(),
        isGoalMetToday(),
      ]);

      // Every field that shapes the queue is compared, not just the horizon.
      // Frequency and the goal suppression both change *which* reminders should
      // exist without moving the horizon a day, so a check that ignored them
      // would report the queue as current and leave the old one in place — the
      // frequency picker would appear to do nothing until midnight, and the
      // reminders someone just earned the right not to receive would still
      // arrive that evening.
      const current =
        queue !== null &&
        queue.language === language &&
        queue.coversThrough === dayKey(horizonEnd) &&
        queue.frequency === frequency &&
        queue.suppressed === (goalMetToday ? dayKey(now) : null);

      if (current) {
        // Confirm the OS still holds them — a restore or a cleared queue leaves
        // the marker behind with nothing scheduled.
        const scheduled = await Notifications.getAllScheduledNotificationsAsync();
        if (scheduled.length > 0) return;
      }

      await scheduleRemindersUnsafe(language);
    } catch {
      // Runs on every foreground with `void`; a native failure here must not
      // become an unhandled rejection. The next resume retries.
    }
  });
}

/**
 * Stores how many reminders a day the learner wants, and re-queues to match.
 *
 * **Never rejects**, the same contract `setRemindersEnabled` carries and for the
 * same reason: the settings screen calls it with `void`, so a native failure
 * would escape unhandled. The preference is written even when the re-queue
 * fails — it is the user's stated choice, and the next foreground rebuilds the
 * queue against it.
 */
export async function setReminderFrequency(
  frequency: ReminderFrequency,
  language: LanguageCode,
): Promise<void> {
  await writeJSON(StorageKeys.reminderFrequency, frequency);
  await refreshReminders(language);
}
