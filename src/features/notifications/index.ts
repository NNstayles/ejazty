import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

import i18n, { type LanguageCode } from '@/i18n';
import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';
import {
  REMINDER_HORIZON_DAYS,
  REMINDER_HOURS,
  REMINDER_JITTER_MINUTES,
  REMINDER_MESSAGE_IDS,
  type ReminderMessageId,
} from './messages';

const ANDROID_CHANNEL_ID = 'study-reminders';

/** `YYYY-MM-DD` in the device's local timezone. */
function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

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
 * Drawing from a shuffled copy and slicing guarantees the four ids are
 * distinct, which is what enforces "never the same reminder twice in a day".
 * There are 13 messages and 4 slots, so a day can always be filled.
 */
function pickForDay(slots: number): ReminderMessageId[] {
  return shuffle(REMINDER_MESSAGE_IDS).slice(0, slots);
}

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
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  const next = await Notifications.requestPermissionsAsync();
  return next.granted;
}

export async function hasPermission(): Promise<boolean> {
  return (await Notifications.getPermissionsAsync()).granted;
}

/**
 * Rebuilds the queue of pending reminders in `language`.
 *
 * Everything pending is cancelled first: reminder text is baked in at schedule
 * time, so a stale queue would keep firing in the previous language. Message
 * choices are persisted per day, meaning a mid-day reschedule reuses that day's
 * already-drawn set instead of risking a repeat.
 */
export async function scheduleReminders(language: LanguageCode): Promise<number> {
  if (!(await hasPermission())) return 0;

  await Notifications.cancelAllScheduledNotificationsAsync();
  await ensureAndroidChannel(language);

  const t = i18n.getFixedT(language);
  const history = await readJSON<Record<string, ReminderMessageId[]>>(
    StorageKeys.notificationHistory,
    {},
  );

  const now = new Date();
  const updated: Record<string, ReminderMessageId[]> = {};
  let scheduled = 0;

  for (let dayOffset = 0; dayOffset < REMINDER_HORIZON_DAYS; dayOffset++) {
    const day = new Date(now);
    day.setDate(day.getDate() + dayOffset);
    const key = dayKey(day);

    // Reuse today's existing draw so a reschedule cannot repeat a message that
    // has already been queued or delivered today.
    const picks = history[key] ?? pickForDay(REMINDER_HOURS.length);
    updated[key] = picks;

    for (let slot = 0; slot < REMINDER_HOURS.length; slot++) {
      const messageId = picks[slot];
      if (!messageId) continue;

      const fireAt = new Date(day);
      const jitter = Math.round(
        (Math.random() * 2 - 1) * REMINDER_JITTER_MINUTES,
      );
      fireAt.setHours(REMINDER_HOURS[slot], 0, 0, 0);
      fireAt.setMinutes(fireAt.getMinutes() + jitter);

      // Slots earlier than now (typical on the first day) are skipped rather
      // than fired immediately.
      if (fireAt.getTime() <= now.getTime() + 60_000) continue;

      const title = t(`notifications.items.${messageId}.title`);
      const body = t(`notifications.items.${messageId}.body`);

      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          // Some reminders are a single line; an empty body renders as a
          // title-only notification on both platforms.
          ...(body ? { body } : {}),
          ...(Platform.OS === 'android' ? { channelId: ANDROID_CHANNEL_ID } : {}),
        },
        trigger: {
          type: Notifications.SchedulableTriggerInputTypes.DATE,
          date: fireAt,
        },
      });
      scheduled++;
    }
  }

  await writeJSON(StorageKeys.notificationHistory, updated);
  return scheduled;
}

export async function cancelReminders(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}

/**
 * Entry point for the settings toggle. Requesting permission is only attempted
 * when enabling, so a declined prompt leaves the switch off.
 */
export async function setRemindersEnabled(
  enabled: boolean,
  language: LanguageCode,
): Promise<boolean> {
  if (!enabled) {
    await cancelReminders();
    return false;
  }
  const granted = await requestPermission();
  if (!granted) return false;
  await scheduleReminders(language);
  return true;
}

/** Re-queues pending reminders so their text matches the new language. */
export async function rescheduleForLanguageChange(
  language: LanguageCode,
): Promise<void> {
  const pending = await Notifications.getAllScheduledNotificationsAsync();
  if (pending.length === 0) return;
  await scheduleReminders(language);
}

/**
 * Called on every app foreground. Keeps the rolling horizon topped up as days
 * elapse and prunes day records older than the horizon.
 */
export async function refreshReminders(language: LanguageCode): Promise<void> {
  if (!(await hasPermission())) return;
  await scheduleReminders(language);
}
