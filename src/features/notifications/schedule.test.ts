/**
 * Tests for the reminder schedule.
 *
 * The whole module is date arithmetic reaching three days into the future, and
 * **not one of its failure modes is observable from the app**. A reminder
 * planned into the past does not arrive and nothing says so. A day's draw
 * dropped instead of recorded lets the next rebuild roll that day again and
 * repeat a message the learner has already read. A suppression rule that runs
 * one day too wide empties the queue for everyone who ever meets their goal.
 * Reaching any of it by hand means moving the device clock, or waiting three
 * days with a notification log open — which is exactly why the arithmetic was
 * pulled out of `index.ts`, where it sat behind four native calls.
 *
 * `random` is injected for the same reason `now` is: jitter is the one input
 * that a test could not otherwise pin, and the bounds on it are a real rule —
 * an unbounded one walks a 22:00 reminder into the small hours.
 */

import { REMINDER_HOURS, type ReminderMessageId } from './messages';
import { dayKey, planReminders, type SchedulePlanInput } from './schedule';

/** Before the first slot, so the whole of today is still ahead. */
const EARLY = new Date(2026, 7, 7, 5, 0);
const TODAY = '2026-08-07';
const TOMORROW = '2026-08-08';

/** A draw that is stable and distinguishable, so assertions can name a slot. */
const DRAW = ['didntStudy', 'stopSign', 'futureYou', 'proveIt'] as ReminderMessageId[];

function plan(overrides: Partial<SchedulePlanInput> = {}) {
  return planReminders({
    now: EARLY,
    hours: REMINDER_HOURS,
    horizonDays: 3,
    jitterMinutes: 25,
    drawFor: (slots) => DRAW.slice(0, slots),
    picks: {},
    goalMetToday: false,
    // Dead centre of the range, so jitter contributes exactly zero and every
    // assertion below is about the slot rather than about the noise on it.
    random: () => 0.5,
    ...overrides,
  });
}

describe('dayKey', () => {
  // The same reason `localDayKey` exists in `lib/dates.ts`: east of UTC, the
  // ISO form files a late-evening reminder under the previous day and the
  // per-day draw stops preventing repeats on the one night it matters.
  it('reads the local day, not the UTC one', () => {
    expect(dayKey(new Date(2026, 7, 7, 23, 30))).toBe(TODAY);
    expect(dayKey(new Date(2026, 7, 7, 0, 30))).toBe(TODAY);
  });
});

describe('planReminders', () => {
  it('fills every slot across the horizon', () => {
    const { reminders } = plan();
    expect(reminders).toHaveLength(REMINDER_HOURS.length * 3);
  });

  it('plans each slot at its own hour', () => {
    const today = plan().reminders.filter((r) => r.day === TODAY);
    expect(today.map((r) => r.fireAt.getHours())).toEqual([...REMINDER_HOURS]);
  });

  /*
    The first-day rule, and the one that decides whether this feature survives
    its first minute.

    Someone enabling reminders at 20:00 has three of the day's four slots
    behind them. Planning them anyway means the OS delivers three at once, the
    moment the switch is flipped — which reads as a bug rather than as a
    reminder, and is a very short path to the switch going back off.
  */
  it('drops slots that have already passed today', () => {
    const evening = new Date(2026, 7, 7, 20, 0);
    const today = plan({ now: evening }).reminders.filter((r) => r.day === TODAY);
    expect(today.map((r) => r.fireAt.getHours())).toEqual([22]);
  });

  // The same rule in miniature. A reminder scheduled for forty seconds from now
  // is not a reminder, it is a glitch.
  it('drops a slot that is imminent rather than firing it seconds from now', () => {
    const justBefore = new Date(2026, 7, 7, 21, 59, 30);
    const today = plan({ now: justBefore }).reminders.filter((r) => r.day === TODAY);
    expect(today).toHaveLength(0);
  });

  it('keeps a future day whole even when today is half gone', () => {
    const evening = new Date(2026, 7, 7, 20, 0);
    const tomorrow = plan({ now: evening }).reminders.filter((r) => r.day === TOMORROW);
    expect(tomorrow).toHaveLength(REMINDER_HOURS.length);
  });

  /*
    Jitter exists so reminders do not feel like a cron job, and its bounds are a
    real rule rather than decoration: the 22:00 slot is the last one of the day
    precisely because it is the latest hour that is still a civil time to be
    interrupted at, and unbounded noise on it walks into the small hours.
  */
  it('keeps jitter inside its stated bounds', () => {
    const slot = new Date(2026, 7, 7, 12, 0, 0, 0).getTime();
    for (const r of [0, 0.25, 0.5, 0.75, 1]) {
      const [first] = plan({ hours: [12], random: () => r }).reminders;
      const offsetMinutes = (first.fireAt.getTime() - slot) / 60_000;
      expect(Math.abs(offsetMinutes)).toBeLessThanOrEqual(25);
    }
  });

  // Both ends, so a version that computed `random() * jitter` — positive-only,
  // and the easy mistake — fails rather than passing half the assertions.
  it('jitters in both directions rather than always running late', () => {
    expect(plan({ hours: [12], random: () => 1 }).reminders[0].fireAt.getMinutes()).toBe(25);
    expect(plan({ hours: [12], random: () => 0 }).reminders[0].fireAt.getMinutes()).toBe(35);
  });

  describe('the draw', () => {
    it('reuses a draw already made for a day', () => {
      const existing = { [TODAY]: ['proveIt'] as ReminderMessageId[] };
      const { picks, reminders } = plan({ picks: existing });
      expect(picks[TODAY]).toEqual(['proveIt']);
      expect(reminders.filter((r) => r.day === TODAY)).toHaveLength(1);
    });

    /*
      The subtle one, and the reason the draw is recorded before the slots are
      walked rather than alongside them.

      A day whose slots are *all* skipped — every hour passed, or the goal met —
      still had messages drawn for it, and some of them may already have been
      delivered earlier today. Dropping the record lets the next rebuild roll a
      fresh set for that same day, which is the repeat the without-replacement
      draw exists to prevent.
    */
    it('records a day whose slots were all skipped', () => {
      const nearMidnight = new Date(2026, 7, 7, 23, 30);
      const { picks, reminders } = plan({ now: nearMidnight });
      expect(reminders.filter((r) => r.day === TODAY)).toHaveLength(0);
      expect(picks[TODAY]).toEqual(DRAW);
    });

    // Persisted wholesale, so a day that has fallen out of the horizon is
    // pruned by simply not being in the new record.
    it('drops a day that has fallen out of the horizon', () => {
      const stale = { '2026-08-01': ['proveIt'] as ReminderMessageId[] };
      expect(plan({ picks: stale }).picks['2026-08-01']).toBeUndefined();
    });

    it('covers through the last day of the horizon', () => {
      expect(plan().coversThrough).toBe('2026-08-09');
      expect(plan({ horizonDays: 1 }).coversThrough).toBe(TODAY);
    });
  });

  describe('once the goal is met', () => {
    /*
      The reason the feature exists is to get someone to study. Carrying on
      after they have is nagging, and nagging is what people switch reminders
      off over — at which point they get none at all, which serves nobody.
    */
    it('drops the rest of today', () => {
      const { reminders } = plan({ goalMetToday: true });
      expect(reminders.filter((r) => r.day === TODAY)).toHaveLength(0);
    });

    /*
      The other half, and the one that fails catastrophically rather than
      annoyingly. Tomorrow's goal has not been met — it does not exist yet — so
      a suppression rule that ran across the horizon would leave the queue empty
      for three days for anyone who ever meets a goal, and the emptier it got
      the less likely they were to open the app and refill it.
    */
    it('leaves the rest of the horizon alone', () => {
      const { reminders } = plan({ goalMetToday: true });
      expect(reminders.filter((r) => r.day === TOMORROW)).toHaveLength(
        REMINDER_HOURS.length,
      );
      expect(reminders).toHaveLength(REMINDER_HOURS.length * 2);
    });

    it('still records today, so tomorrow cannot re-roll it', () => {
      expect(plan({ goalMetToday: true }).picks[TODAY]).toEqual(DRAW);
    });
  });

  describe('frequency', () => {
    it('plans only the hours it is given', () => {
      const { reminders } = plan({ hours: [17] });
      expect(reminders).toHaveLength(3);
      expect(reminders.every((r) => r.fireAt.getHours() === 17)).toBe(true);
    });

    // The draw is sized to the slots, so a learner on one reminder a day does
    // not burn four messages out of the day's pool to deliver one.
    it('draws only as many messages as there are slots', () => {
      expect(plan({ hours: [12, 22] }).picks[TODAY]).toHaveLength(2);
    });
  });
});
