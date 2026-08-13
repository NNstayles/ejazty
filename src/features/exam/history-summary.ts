/**
 * The arithmetic behind the full attempt history.
 *
 * Pure, and separate from the screen for the reason everything else in this
 * project is: the history screen is a React component this codebase has no way
 * to render-test, and every rule below fails *quietly* when it breaks — a wrong
 * pass rate is still a plausible percentage, and a filter that drops the wrong
 * attempts still renders a believable list.
 *
 * The exam home derives a near-identical set of figures inline. That is not
 * duplication worth collapsing: it reads only the five most recent attempts and
 * folds its tallies into the same single pass that builds the trend line, so
 * sharing a helper would cost it a second traversal to save four lines. What is
 * shared is the *rounding*, which has to agree — two screens reporting 67% and
 * 66% for one history is the kind of defect nobody reports and everybody
 * notices.
 */

import type { ExamAttemptRecord } from '@/features/progress/attempts';
import { EXAM_MODES, type ExamMode } from './engine';

/** The figures shown above the list. */
export type HistorySummary = {
  total: number;
  passed: number;
  /** Whole percent, 0–100. Zero for an empty history rather than `NaN`. */
  passRate: number;
  /** Highest percent achieved, or null when there is nothing to take a max of. */
  best: number | null;
  /** Mean percent, rounded. Null on an empty history. */
  average: number | null;
};

/**
 * Everything the header reports, in one pass.
 *
 * **The empty case is the one that earns the test.** `passed / total` is `0/0`
 * on a history with nothing in it, which is `NaN` — and `NaN` does not throw,
 * does not warn, and renders as the literal string `NaN%` in the middle of an
 * otherwise finished screen. `Math.round(NaN)` is `NaN` too, so the rounding
 * does not save it either. Both figures that divide are guarded here rather
 * than at the call site, so a second caller cannot reintroduce it.
 *
 * `best` and `average` are null rather than 0 for the same reason the exam
 * home's readiness ring shows the pass mark before the first attempt: zero is a
 * score, and reporting one the learner never earned is worse than reporting
 * nothing. The screen renders a dash.
 */
export function summariseAttempts(
  attempts: readonly ExamAttemptRecord[],
): HistorySummary {
  let passed = 0;
  let best: number | null = null;
  let sum = 0;

  for (const attempt of attempts) {
    if (attempt.passed) passed += 1;
    if (best === null || attempt.percent > best) best = attempt.percent;
    sum += attempt.percent;
  }

  const total = attempts.length;
  return {
    total,
    passed,
    passRate: total > 0 ? Math.round((passed / total) * 100) : 0,
    best,
    average: total > 0 ? Math.round(sum / total) : null,
  };
}

/**
 * Which modes the learner has actually sat, in the order the exam home lists
 * them.
 *
 * **Declaration order, not first-seen order**, and that is the whole reason
 * this is a function rather than a `Set` spread at the call site. The filter
 * chips are a fixed row the reader learns the shape of; ordering them by which
 * exam happened to be sat first means the row rearranges itself as the history
 * grows — Quick sitting third one week and first the next. Walking
 * `EXAM_MODES` instead gives the same order as the format grid on the tab
 * behind it.
 *
 * Modes with no attempts are omitted: a chip that filters to an empty list is
 * a control that can only disappoint.
 */
export function modesPresent(
  attempts: readonly ExamAttemptRecord[],
): ExamMode[] {
  const seen = new Set<ExamMode>();
  for (const attempt of attempts) seen.add(attempt.mode);
  return (Object.keys(EXAM_MODES) as ExamMode[]).filter((mode) =>
    seen.has(mode),
  );
}

/** The chip row's selection: one mode, or everything. */
export type HistoryFilter = ExamMode | 'all';

/**
 * The attempts a filter selects.
 *
 * Returns the input array itself for `'all'` rather than a copy. The caller
 * feeds this straight to a `FlatList`, which re-renders when its `data`
 * identity changes — so copying would make every unrelated render of the
 * screen look like new data to the list.
 */
export function filterByMode(
  attempts: readonly ExamAttemptRecord[],
  filter: HistoryFilter,
): readonly ExamAttemptRecord[] {
  if (filter === 'all') return attempts;
  return attempts.filter((attempt) => attempt.mode === filter);
}
