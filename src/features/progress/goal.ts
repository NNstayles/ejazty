/**
 * The daily study goal, and today's progress toward it.
 *
 * ## What this is for
 *
 * The app could say how well you did and never how much you had done. A learner
 * sitting a mock every few days had no reason to open it on the days in between,
 * and the Learn tab opened on a greeting and a list of sections — a table of
 * contents, not a session. A goal turns "study sometime" into "eight more
 * questions", which is the whole difference between an app you return to and one
 * you remember you have.
 *
 * ## It counts questions answered correctly, not exams finished
 *
 * A goal of "one exam a day" is unreachable on a busy day and trivially met on a
 * quiet one, and it makes open practice — which has no fixed length — count for
 * nothing until it is submitted. Questions are the unit the learner actually
 * spends, they accrue while they work rather than at the end, and they let a
 * two-minute session count for something. `recordCorrect` is therefore called
 * from the exam runner as each answer lands, not from `finalise`.
 *
 * Only *correct* answers count, and this module is not what decides that: it
 * only knows how to add. Whether an answer earned a point — whether it was
 * right, and whether its question was already credited earlier in the same
 * attempt — is `earnsGoalCredit` in `features/exam/goal-credit.ts`, called from
 * the runner, which is the only place holding both the question and what the
 * attempt has already paid out for.
 *
 * ## Device-local, and deliberately not synced
 *
 * ## Device-local, and deliberately not synced
 *
 * Same reasoning as the profile picture: this has to work offline and for
 * guests, and a streak that disagreed with itself across two devices would be
 * worse than one that is honest about being about *this* device. It is also the
 * kind of low-value, high-frequency write that has no business on the network.
 */

import { localDayKey } from '@/lib/dates';
import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';

/**
 * The goals offered in settings.
 *
 * A short list of round numbers rather than a slider. A slider invites a learner
 * to set 37, which is a number they will neither remember nor hit, and it puts a
 * fiddly gesture in front of a decision that has four sensible answers.
 */
export const GOAL_OPTIONS = [10, 20, 30, 50] as const;

export const DEFAULT_GOAL = 20;

/** Bounds a stored goal, so a hand-edited cache cannot divide by zero downstream. */
const MIN_GOAL = 1;
const MAX_GOAL = 500;

/** Today's tally, and the day it belongs to. */
export type GoalProgress = {
  /** `YYYY-MM-DD`, local. See `localDayKey`. */
  day: string;
  /** Questions answered correctly today. */
  correct: number;
  /** Consecutive days ending today (or yesterday) on which the goal was met. */
  streak: number;
};

const EMPTY: GoalProgress = { day: '', correct: 0, streak: 0 };

/**
 * The name `correct` had before the goal counted only correct answers.
 *
 * Read as a fallback rather than migrated, because a record written under it
 * is at most one day old and this costs three lines. Dropping it would not
 * merely zero today's tally on the upgrade — `rollOver` decides whether a
 * streak survives by comparing the *stored* count against the goal, so a
 * yesterday that suddenly read as 0 would silently break the streak of every
 * learner who had one. Delete it once no shipped build can still be holding a
 * record from before the rename.
 */
const LEGACY_COUNT_KEY = 'answered';

function nonNegativeInt(value: unknown): number {
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0) return 0;
  return Math.floor(value);
}

function parseProgress(value: unknown): GoalProgress {
  if (typeof value !== 'object' || value === null) return EMPTY;
  const p = value as Partial<GoalProgress> & Record<string, unknown>;
  if (typeof p.day !== 'string') return EMPTY;
  // A legacy record counted *every* answer, so carrying it forward over-credits
  // the upgrade day. That is the gentler of the two errors available here, and
  // it errs toward the learner in the same direction `rollOver` already does.
  const correct = nonNegativeInt(p.correct ?? p[LEGACY_COUNT_KEY]);
  return { day: p.day, correct, streak: nonNegativeInt(p.streak) };
}

export async function readGoal(): Promise<number> {
  const stored = await readJSON<unknown>(StorageKeys.studyGoal, DEFAULT_GOAL);
  if (typeof stored !== 'number' || !Number.isFinite(stored)) return DEFAULT_GOAL;
  return Math.min(MAX_GOAL, Math.max(MIN_GOAL, Math.floor(stored)));
}

export async function writeGoal(goal: number): Promise<void> {
  await writeJSON(
    StorageKeys.studyGoal,
    Math.min(MAX_GOAL, Math.max(MIN_GOAL, Math.floor(goal))),
  );
}

/**
 * Today's tally, rolled over if the stored one belongs to an earlier day.
 *
 * Rolling over on *read* rather than on a timer is what makes this correct
 * across the case that actually happens: the app is backgrounded overnight and
 * foregrounded the next morning. Nothing fires at midnight, so a version that
 * only rolled over on write would show yesterday's count until the learner
 * answered something.
 */
export async function readProgress(
  goal: number,
  now: Date = new Date(),
): Promise<GoalProgress> {
  const stored = parseProgress(await readJSON<unknown>(StorageKeys.studyProgress, null));
  return rollOver(stored, goal, now);
}

/**
 * Brings a stored tally forward to `now`.
 *
 * Exported for the tests: every branch here is a date boundary, and the only way
 * to reach one by hand is to change the device clock.
 */
export function rollOver(
  stored: GoalProgress,
  goal: number,
  now: Date = new Date(),
): GoalProgress {
  const today = localDayKey(now);
  if (stored.day === today) return stored;

  const yesterday = localDayKey(new Date(now.getTime() - 86_400_000));

  // The streak survives exactly one boundary, and only if yesterday's goal was
  // met. Anything older means at least one whole day was missed.
  //
  // Note this reads the *stored* count against the *current* goal.
  // That is deliberate: someone who lowers their goal has not retroactively
  // earned yesterday, and someone who raises it has not retroactively lost it —
  // but re-deciding yesterday under today's rule is the only option that needs
  // no second copy of the goal on every record, and it errs toward the learner
  // in the case that matters (raising a goal is the ambitious move, and it
  // would be a strange punishment to break their streak for it). A goal history
  // is the fix if that ever feels wrong.
  const kept = stored.day === yesterday && stored.correct >= goal;
  return { day: today, correct: 0, streak: kept ? stored.streak : 0 };
}

/**
 * Adds to today's tally and returns the new state.
 *
 * `count` is a number of answers already established to be correct and not yet
 * credited; the caller makes that decision (see the note at the top of the
 * file).
 *
 * The streak increments on the *transition* into meeting the goal — the answer
 * that crosses the line — rather than on every answer after it, which would
 * count a single productive evening as a twenty-day streak.
 */
export async function recordCorrect(
  count: number,
  goal: number,
  now: Date = new Date(),
): Promise<GoalProgress> {
  if (count <= 0) return readProgress(goal, now);

  const current = await readProgress(goal, now);
  const correct = current.correct + Math.floor(count);
  const crossed = current.correct < goal && correct >= goal;

  const next: GoalProgress = {
    day: current.day,
    correct,
    streak: crossed ? current.streak + 1 : current.streak,
  };
  await writeJSON(StorageKeys.studyProgress, next);
  return next;
}
