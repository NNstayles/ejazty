/**
 * When the queued reminders fire, decided without touching a native module.
 *
 * ## Why this is its own module
 *
 * This is date arithmetic that runs three days into the future, and *every*
 * mistake it can make is unobservable from the app. A reminder scheduled into
 * the past silently never arrives. A draw dropped for a day whose slots were
 * all skipped lets the next rebuild roll that day again and repeat a message
 * already delivered. A suppression rule that catches tomorrow as well as today
 * turns the feature off for everyone who ever meets their goal. None of that is
 * visible in a diff and none is reachable by hand — reaching it means moving
 * the device clock, or waiting three days with a notification log open.
 *
 * Pulling it out of `index.ts` leaves that file doing what it should: cancel,
 * hand this the state, post what comes back. `random` is injected for the same
 * reason `now` is — jitter is the one input a test cannot otherwise pin.
 *
 * ## The rules, and which way each fails
 *
 * - **A slot already past is dropped, not fired immediately.** Typical on the
 *   first day: someone enabling reminders at 20:00 has three of today's four
 *   slots behind them. Posting them anyway means four notifications arriving at
 *   once, which reads as a bug and is how a feature gets switched off in its
 *   first minute. There is a one-minute margin because scheduling something for
 *   "four seconds from now" is the same mistake in miniature.
 * - **Today's remaining slots are dropped once the goal is met.** The feature
 *   exists to get someone to study; carrying on after they have is nagging, and
 *   nagging is what people turn reminders off over. It applies to *today only* —
 *   tomorrow's goal has not been met yet, and a rule that leaked into the
 *   horizon would silently stop the queue ever refilling.
 * - **A day's messages are drawn without replacement**, so no message can
 *   repeat within a day; the caller persists the draw so that a mid-day rebuild
 *   reuses it rather than rolling again.
 */

import type { ReminderMessageId } from './messages';

/** One reminder, resolved to an instant. */
export type PlannedReminder = {
  /** Local day it belongs to, `YYYY-MM-DD`. Also the key of its draw. */
  day: string;
  messageId: ReminderMessageId;
  fireAt: Date;
};

export type SchedulePlan = {
  reminders: PlannedReminder[];
  /**
   * The draw for every day in the horizon, including days whose slots all fell
   * in the past. Persisted wholesale by the caller, which is what prunes days
   * older than the horizon — they are simply absent from the new record.
   */
  picks: Record<string, ReminderMessageId[]>;
  /** Last day covered. The caller stores it to decide when a rebuild is due. */
  coversThrough: string;
};

export type SchedulePlanInput = {
  now: Date;
  /** Local hours to fire at, for the frequency the learner chose. */
  hours: readonly number[];
  horizonDays: number;
  jitterMinutes: number;
  /** Draws a day's messages. Called only for days not already in `picks`. */
  drawFor: (slots: number) => ReminderMessageId[];
  /** Draws already made, keyed by day. Reused so a rebuild cannot re-roll. */
  picks: Record<string, ReminderMessageId[]>;
  /** True when today's goal is already met. Suppresses today's slots only. */
  goalMetToday: boolean;
  /** Injected so jitter is pinnable. Must return [0, 1). */
  random?: () => number;
};

/** `YYYY-MM-DD` in the device's local timezone. */
export function dayKey(date: Date): string {
  const y = date.getFullYear();
  const m = `${date.getMonth() + 1}`.padStart(2, '0');
  const d = `${date.getDate()}`.padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * How close to `now` a reminder may be scheduled.
 *
 * Anything nearer is treated as already past. A notification arriving in the
 * seconds after the user flipped the switch reads as a glitch, not a reminder.
 */
const MIN_LEAD_MS = 60_000;

export function planReminders(input: SchedulePlanInput): SchedulePlan {
  const { now, hours, horizonDays, jitterMinutes, drawFor, goalMetToday } = input;
  const random = input.random ?? Math.random;

  const today = dayKey(now);
  const reminders: PlannedReminder[] = [];
  const picks: Record<string, ReminderMessageId[]> = {};
  let coversThrough = today;

  for (let dayOffset = 0; dayOffset < horizonDays; dayOffset++) {
    const day = new Date(now);
    day.setDate(day.getDate() + dayOffset);
    const key = dayKey(day);

    // The draw is recorded for every day in the horizon, even one whose slots
    // are all suppressed or all in the past. Dropping it would let the *next*
    // rebuild roll a fresh set for a day that has already delivered messages,
    // which is precisely the repeat the without-replacement draw prevents.
    const drawn = input.picks[key] ?? drawFor(hours.length);
    picks[key] = drawn;
    coversThrough = key;

    // Today only. Tomorrow's goal is not met yet, and suppressing the horizon
    // would leave the queue empty until the next foreground refilled it.
    if (goalMetToday && key === today) continue;

    for (let slot = 0; slot < hours.length; slot++) {
      const messageId = drawn[slot];
      if (messageId === undefined) continue;

      const fireAt = new Date(day);
      fireAt.setHours(hours[slot], 0, 0, 0);
      // Symmetric around the hour, so the slot stays where it is advertised
      // rather than drifting later over the horizon.
      fireAt.setMinutes(fireAt.getMinutes() + Math.round((random() * 2 - 1) * jitterMinutes));

      if (fireAt.getTime() <= now.getTime() + MIN_LEAD_MS) continue;

      reminders.push({ day: key, messageId, fireAt });
    }
  }

  return { reminders, picks, coversThrough };
}
