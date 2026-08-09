/**
 * Tests for the daily goal.
 *
 * Every rule here is a **date boundary**, which is the reason they are worth
 * pinning: the only way to reach one by hand is to change the device clock and
 * relaunch, so nobody does, and a streak that quietly resets at midnight — or
 * one that never resets at all — looks completely normal on any given day.
 *
 * The two that carry the file:
 *
 *  - **`rollOver` decides whether a streak survives**, and it has to survive
 *    exactly one boundary and no more. Both failure directions are silent and
 *    opposite: a version that always kept the streak turns it into a count of
 *    days since install, and one that never kept it means nobody ever sees a
 *    number above 1.
 *  - **`recordCorrect` increments the streak on the *crossing*,** not on every
 *    answer past the goal. Getting that wrong turns one productive evening into
 *    a twenty-day streak, which is the kind of wrong that is only noticed by
 *    someone who already distrusts the number.
 *
 * The `parseProgress` block is a third of the same kind: the count was renamed
 * from `answered` to `correct` when the goal stopped counting wrong answers,
 * and a record written under the old name has to keep its streak alive across
 * the upgrade — a failure nobody can reach at all without a device that was
 * running the previous build yesterday.
 *
 * Which answers *earn* a point is a separate rule in a separate place;
 * `features/exam/goal-credit.test.ts` pins that one.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  DEFAULT_GOAL,
  GOAL_OPTIONS,
  readGoal,
  readProgress,
  recordCorrect,
  rollOver,
  writeGoal,
  type GoalProgress,
} from './goal';

jest.mock('@react-native-async-storage/async-storage', () =>
  // `require`, not `import`: jest.mock factories are hoisted above the import
  // block, so an imported binding would not exist yet when this runs.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

beforeEach(async () => {
  await AsyncStorage.clear();
});

/** A fixed instant, mid-afternoon so nothing sits near a boundary by accident. */
const NOW = new Date(2026, 7, 7, 15, 30);
const TODAY = '2026-08-07';
const YESTERDAY = '2026-08-06';

function progress(day: string, correct: number, streak: number): GoalProgress {
  return { day, correct, streak };
}

describe('rollOver', () => {
  it('leaves today alone', () => {
    const stored = progress(TODAY, 7, 3);
    expect(rollOver(stored, 20, NOW)).toEqual(stored);
  });

  it('keeps the streak across one boundary when yesterday met the goal', () => {
    const stored = progress(YESTERDAY, 20, 3);
    expect(rollOver(stored, 20, NOW)).toEqual(progress(TODAY, 0, 3));
  });

  it('keeps the streak when yesterday overshot the goal', () => {
    const stored = progress(YESTERDAY, 45, 3);
    expect(rollOver(stored, 20, NOW)).toEqual(progress(TODAY, 0, 3));
  });

  // The other half of the rule above, and the one that makes the streak mean
  // anything: without it the number only ever counts up.
  it('resets the streak when yesterday fell short', () => {
    const stored = progress(YESTERDAY, 19, 3);
    expect(rollOver(stored, 20, NOW)).toEqual(progress(TODAY, 0, 0));
  });

  it('resets the streak when a whole day was missed', () => {
    const stored = progress('2026-08-05', 40, 9);
    expect(rollOver(stored, 20, NOW)).toEqual(progress(TODAY, 0, 0));
  });

  it('starts clean from an empty store', () => {
    expect(rollOver({ day: '', correct: 0, streak: 0 }, 20, NOW)).toEqual(
      progress(TODAY, 0, 0),
    );
  });

  /*
    The boundary this exists for, and the reason `localDayKey` is not
    `toISOString().slice(0, 10)`.

    23:00 and 01:00 are two hours apart and two different days. Anywhere east of
    UTC the ISO form files the late-evening session under the *previous* UTC
    day, so the goal would appear to reset several hours after local midnight —
    and the streak would break for someone who studied late and checked back in
    the morning.
  */
  it('rolls over at local midnight, not at UTC midnight', () => {
    const lateLastNight = new Date(2026, 7, 6, 23, 0);
    const earlyToday = new Date(2026, 7, 7, 1, 0);

    const stored = progress('2026-08-06', 25, 4);
    // Still the same local day at 23:00 the night before.
    expect(rollOver(stored, 20, lateLastNight)).toEqual(stored);
    // Two hours later it is a new local day, and the streak carried.
    expect(rollOver(stored, 20, earlyToday)).toEqual(progress(TODAY, 0, 4));
  });
});

describe('readGoal / writeGoal', () => {
  it('defaults when nothing is stored', async () => {
    await expect(readGoal()).resolves.toBe(DEFAULT_GOAL);
  });

  it('round-trips every option the settings screen offers', async () => {
    for (const option of GOAL_OPTIONS) {
      await writeGoal(option);
      await expect(readGoal()).resolves.toBe(option);
    }
  });

  // The cache is plaintext AsyncStorage and editable on a rooted device, so a
  // zero here would reach `fraction` as a division by zero and render the ring
  // as `NaN`.
  it('clamps a stored goal that could not have come from the app', async () => {
    await AsyncStorage.setItem('ejazty.study.goal', JSON.stringify(0));
    await expect(readGoal()).resolves.toBe(1);

    await AsyncStorage.setItem('ejazty.study.goal', JSON.stringify(99999));
    await expect(readGoal()).resolves.toBe(500);

    await AsyncStorage.setItem('ejazty.study.goal', JSON.stringify('twenty'));
    await expect(readGoal()).resolves.toBe(DEFAULT_GOAL);
  });
});

describe('recordCorrect', () => {
  it('accumulates within a day', async () => {
    await recordCorrect(1, 20, NOW);
    await recordCorrect(1, 20, NOW);
    const after = await recordCorrect(1, 20, NOW);
    expect(after.correct).toBe(3);
  });

  it('ignores a non-positive count', async () => {
    await recordCorrect(5, 20, NOW);
    const after = await recordCorrect(0, 20, NOW);
    expect(after.correct).toBe(5);
  });

  /*
    The load-bearing one. The streak counts *days on which the goal was met*, so
    it may increment at most once per day — on the answer that crosses the line.
    A version incrementing on every answer at or past the goal would report a
    single evening of forty questions as a twenty-day streak.
  */
  it('increments the streak once, on the answer that crosses the goal', async () => {
    const goal = 3;
    expect((await recordCorrect(1, goal, NOW)).streak).toBe(0);
    expect((await recordCorrect(1, goal, NOW)).streak).toBe(0);
    // The crossing.
    expect((await recordCorrect(1, goal, NOW)).streak).toBe(1);
    // Everything past it.
    expect((await recordCorrect(1, goal, NOW)).streak).toBe(1);
    expect((await recordCorrect(5, goal, NOW)).streak).toBe(1);
  });

  it('counts a single batch that vaults the goal as one crossing', async () => {
    const after = await recordCorrect(50, 20, NOW);
    expect(after.correct).toBe(50);
    expect(after.streak).toBe(1);
  });

  it('builds a streak across consecutive days', async () => {
    const goal = 2;
    const dayTwo = new Date(2026, 7, 8, 15, 30);
    const dayThree = new Date(2026, 7, 9, 15, 30);

    await recordCorrect(2, goal, NOW);
    expect((await recordCorrect(2, goal, dayTwo)).streak).toBe(2);
    expect((await recordCorrect(2, goal, dayThree)).streak).toBe(3);
  });

  it('drops the streak after a missed day', async () => {
    const goal = 2;
    const threeDaysLater = new Date(2026, 7, 10, 15, 30);

    await recordCorrect(2, goal, NOW);
    const after = await recordCorrect(2, goal, threeDaysLater);
    expect(after.streak).toBe(1);
  });
});

describe('parseProgress', () => {
  const KEY = 'ejazty.study.progress';

  /*
    The rename migration, and the reason it is three lines rather than none.

    `correct` was called `answered` before the goal stopped counting wrong
    answers. Reading only the new name would zero the stored count — which
    matters far less than what `rollOver` then does with it: a *yesterday* that
    suddenly reads 0 falls short of any goal, so the streak of every learner
    who had one breaks silently on the upgrade. Unreachable by hand without a
    device that ran the previous build the day before.
  */
  it('reads a count stored under the old name', async () => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ day: TODAY, answered: 14, streak: 5 }),
    );
    expect(await readProgress(20, NOW)).toEqual(progress(TODAY, 14, 5));
  });

  it('carries a streak across the rename', async () => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ day: YESTERDAY, answered: 20, streak: 5 }),
    );
    expect(await readProgress(20, NOW)).toEqual(progress(TODAY, 0, 5));
  });

  it('prefers the new name when a record carries both', async () => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ day: TODAY, answered: 99, correct: 7, streak: 1 }),
    );
    expect((await readProgress(20, NOW)).correct).toBe(7);
  });

  // The cache is plaintext AsyncStorage and editable on a rooted device. A
  // negative count draws the ring backwards and a fractional one renders a
  // tally reading `12.5`.
  it.each([
    ['a negative count', -3, 0],
    ['a string', 'twelve', 0],
    ['a missing count', undefined, 0],
    ['a fractional count', 1.5, 1],
  ])('discards %s that could not have come from the app', async (_label, stored, expected) => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ day: TODAY, correct: stored, streak: 0 }),
    );
    expect((await readProgress(20, NOW)).correct).toBe(expected);
  });
});

describe('readProgress', () => {
  // Rolling over on *read* rather than on a timer is what makes the count
  // correct in the case that actually happens: the app is backgrounded
  // overnight and foregrounded the next morning, with nothing having fired at
  // midnight to reset it.
  it('reports a fresh day without anything having been written', async () => {
    await recordCorrect(12, 20, NOW);
    const tomorrow = new Date(2026, 7, 8, 9, 0);
    const found = await readProgress(20, tomorrow);
    expect(found).toEqual(progress('2026-08-08', 0, 0));
  });
});
