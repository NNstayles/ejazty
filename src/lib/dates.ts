/**
 * When something happened, as an i18n key rather than a formatted string.
 *
 * Returning a key and a count instead of text is what keeps this testable and
 * translatable at once: the caller passes both to `t`, so Arabic and Sorani get
 * their own plural forms — Arabic has six — without this module knowing
 * anything about them.
 *
 * `Intl.DateTimeFormat` is deliberately not used. Hermes ships a cut-down ICU
 * and what a given build resolves for `ar-IQ` or `ckb` is not something this
 * project can assert from a test, so an absolute date risks rendering in the
 * wrong calendar or falling back to English month names on one platform only.
 * "3 days ago" needs no locale data at all, and is the more useful reading for
 * a practice history besides — nobody is looking up which Tuesday they sat a
 * mock exam.
 */

export type RelativeDay = { key: string; count: number };

const DAY_MS = 86_400_000;

/**
 * A local calendar day as `YYYY-MM-DD`, for keying per-day state.
 *
 * Built from the local getters rather than `toISOString().slice(0, 10)`, which
 * is the obvious one-liner and is wrong east or west of UTC: it formats the
 * *UTC* day, so in Baghdad (UTC+3) everything logged before 03:00 is filed under
 * yesterday, and the daily study goal resets three hours late every day. Same
 * local-midnight rule as `calendarDaysBetween` above, for the same reason.
 */
export function localDayKey(now: Date = new Date()): string {
  const month = `${now.getMonth() + 1}`.padStart(2, '0');
  const day = `${now.getDate()}`.padStart(2, '0');
  return `${now.getFullYear()}-${month}-${day}`;
}

/**
 * Whole days between two instants, counted by *calendar day* rather than by
 * elapsed hours.
 *
 * The difference is the whole point: an attempt at 23:00 last night is
 * "yesterday" at 01:00 this morning, two hours later. Dividing the elapsed
 * milliseconds would call it "today" until the full 24 hours were up, which is
 * wrong in the one case a reader would actually notice.
 *
 * Both instants are reduced to local midnight first, so the arithmetic happens
 * in the reader's own day boundaries.
 */
function calendarDaysBetween(from: Date, to: Date): number {
  const a = new Date(from.getFullYear(), from.getMonth(), from.getDate());
  const b = new Date(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((b.getTime() - a.getTime()) / DAY_MS);
}

/**
 * Describes when an ISO instant was, relative to now.
 *
 * `now` is injectable so the boundaries can be tested without freezing the
 * clock — "yesterday" is entirely a question of which side of local midnight
 * two instants fall on, and that is not something a test should have to
 * discover by waiting.
 */
export function relativeDayKey(iso: string, now: Date = new Date()): RelativeDay {
  const at = new Date(iso);
  // An unparseable timestamp reaches here from a hand-edited cache or a row
  // that drifted, and `NaN` days would render as "NaN days ago". Saying nothing
  // useful is better than saying something false, and the attempt's score — the
  // part that matters — still renders beside it.
  if (Number.isNaN(at.getTime())) return { key: 'time.unknown', count: 0 };

  const days = calendarDaysBetween(at, now);

  // A timestamp in the future is not worth a branch of its own: it means a
  // wrong device clock or a forged row, and the honest reading of both is that
  // this is the most recent thing that happened.
  if (days <= 0) return { key: 'time.today', count: 0 };
  if (days === 1) return { key: 'time.yesterday', count: 1 };
  if (days < 7) return { key: 'time.daysAgo', count: days };
  if (days < 30) return { key: 'time.weeksAgo', count: Math.floor(days / 7) };
  if (days < 365) return { key: 'time.monthsAgo', count: Math.floor(days / 30) };
  return { key: 'time.yearsAgo', count: Math.floor(days / 365) };
}
