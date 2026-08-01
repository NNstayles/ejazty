/**
 * Ids of the reminder copy. Each maps to `notifications.items.<id>` in every
 * locale file, so the text is always delivered in the user's chosen language.
 *
 * Order here is irrelevant — a day's four reminders are drawn by shuffling.
 */
export const REMINDER_MESSAGE_IDS = [
  'didntStudy',
  'licenseWaiting',
  'stopScrolling',
  'stopSign',
  'beatYesterday',
  'redMeansStop',
  'futureYou',
  'firstAttempt',
  'oneQuickExam',
  'examinerPractising',
  'parkingSpot',
  'realChallenge',
  'proveIt',
] as const;

export type ReminderMessageId = (typeof REMINDER_MESSAGE_IDS)[number];

/**
 * Local times reminders fire at — four a day, matching the every-six-hours
 * cadence but confined to waking hours so nobody is woken at 03:00.
 *
 * For strict six-hour spacing across the whole day, use [0, 6, 12, 18].
 */
export const REMINDER_HOURS = [9, 13, 17, 21] as const;

/** Random offset applied per slot so reminders never feel like a cron job. */
export const REMINDER_JITTER_MINUTES = 25;

/** How many days of reminders are queued ahead of time. */
export const REMINDER_HORIZON_DAYS = 3;
