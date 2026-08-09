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
 * Local times reminders fire at — every five hours, confined to waking hours so
 * nobody is woken at 02:00.
 *
 * 07:00 · 12:00 · 17:00 · 22:00 is exactly five hours between each slot, with
 * the overnight gap absorbing the remainder of the 24-hour day. Four slots is
 * also the most that fits at this spacing without crossing into the night.
 *
 * `REMINDER_MESSAGE_IDS` must stay at least this long: a day's messages are
 * drawn without replacement, one per slot.
 */
export const REMINDER_HOURS = [7, 12, 17, 22] as const;

/**
 * How many reminders a day the learner has asked for.
 *
 * Four a day is a lot to sign up to sight-unseen, and "too many notifications"
 * is the reason people turn a feature like this *off* rather than down — at
 * which point they get none, which serves nobody. Three choices rather than a
 * number picker, for the same reason `GOAL_OPTIONS` is a short list.
 */
export const REMINDER_FREQUENCIES = [1, 2, 4] as const;

export type ReminderFrequency = (typeof REMINDER_FREQUENCIES)[number];

/**
 * The default, and it stays at four so that turning reminders on behaves
 * exactly as it did before this setting existed.
 */
export const DEFAULT_REMINDER_FREQUENCY: ReminderFrequency = 4;

/**
 * Which of the day's slots each frequency uses.
 *
 * Written out rather than sliced from `REMINDER_HOURS`, because the interesting
 * choice is *which* hours survive and slicing would silently answer it with
 * "the earliest ones" — the worst available answer. A single daily reminder
 * belongs in the evening, when someone has ten minutes and a phone in their
 * hand; 07:00 is the slot most likely to be swiped away while getting ready and
 * is therefore the first to go.
 *
 * Every entry is a subset of `REMINDER_HOURS`, so the waking-hours and
 * five-hours-apart reasoning above still governs all of them. A total `Record`,
 * so adding a frequency without saying when it fires is a compile error.
 */
export const REMINDER_SLOT_HOURS: Record<ReminderFrequency, readonly number[]> = {
  1: [17],
  2: [12, 22],
  4: REMINDER_HOURS,
};

/** Bounds a stored frequency, so a hand-edited preference cannot schedule 900. */
export function asReminderFrequency(value: unknown): ReminderFrequency {
  return REMINDER_FREQUENCIES.includes(value as ReminderFrequency)
    ? (value as ReminderFrequency)
    : DEFAULT_REMINDER_FREQUENCY;
}

/** Random offset applied per slot so reminders never feel like a cron job. */
export const REMINDER_JITTER_MINUTES = 25;

/** How many days of reminders are queued ahead of time. */
export const REMINDER_HORIZON_DAYS = 3;

/**
 * Where tapping a reminder takes the reader.
 *
 * Deliberately only the two tab roots. A reminder is a nudge to *start*, so it
 * opens the tab that starts the thing it promised and lets the reader choose
 * from there — deep-linking straight into a running attempt would begin a timed
 * paper from a lock screen, which is not a decision a notification gets to make.
 */
export type ReminderDestination = '/exam' | '/learn';

/**
 * Which tab each reminder opens.
 *
 * A total `Record`, so a message added without stating where it goes is a
 * compile error rather than a tap that silently falls back. That matters more
 * here than it looks: the copy makes a specific promise — "Try the Full Mock
 * Exam", "come finish your exam" — and the whole point of routing is that the
 * screen which arrives is the one the notification just advertised.
 *
 * Most are `/exam`, because most of the copy is about sitting a paper. The two
 * that talk about *learning* rather than being tested open the Learn tab.
 */
export const REMINDER_DESTINATIONS: Record<ReminderMessageId, ReminderDestination> = {
  didntStudy: '/learn',
  licenseWaiting: '/exam',
  stopScrolling: '/exam',
  stopSign: '/learn',
  beatYesterday: '/exam',
  redMeansStop: '/exam',
  futureYou: '/learn',
  firstAttempt: '/exam',
  oneQuickExam: '/exam',
  examinerPractising: '/exam',
  parkingSpot: '/exam',
  realChallenge: '/exam',
  proveIt: '/exam',
};
