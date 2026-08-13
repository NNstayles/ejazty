import type { ExamAttemptRecord } from '@/features/progress/attempts';
import type { ExamMode } from './engine';
import {
  filterByMode,
  modesPresent,
  summariseAttempts,
} from './history-summary';

/**
 * What the full history screen has to get right.
 *
 * Every rule here fails silently. A wrong pass rate is a plausible percentage,
 * a filter that drops the wrong rows is a plausible list, and a chip row in
 * first-seen order looks correct to whoever wrote it because their own test
 * history happened to be sat in that order.
 *
 * The empty-history cases are the load-bearing ones: this screen is reachable
 * from the exam home's history card, and the first thing a brand-new install
 * can do is open it.
 */

let n = 0;
const attempt = (
  mode: ExamMode,
  percent: number,
  passed = percent >= 60,
): ExamAttemptRecord => ({
  id: `a-${n++}`,
  mode,
  percent,
  passed,
  correct: percent,
  total: 100,
  at: '2026-08-10T10:00:00.000Z',
});

describe('summariseAttempts', () => {
  it('counts, rates, and takes the best and the mean', () => {
    const rows = [
      attempt('quick', 80),
      attempt('quick', 40),
      attempt('full', 60),
      attempt('full', 100),
    ];

    expect(summariseAttempts(rows)).toEqual({
      total: 4,
      passed: 3,
      passRate: 75,
      best: 100,
      average: 70,
    });
  });

  it('reports zero and null on an empty history rather than NaN', () => {
    // The one that earns its keep. `passed / total` is `0 / 0` here, and `NaN`
    // neither throws nor warns — `Math.round(NaN)` is `NaN` too, so the
    // rounding does not catch it. It renders as the literal string `NaN%` in
    // the middle of an otherwise finished screen, on the very first thing a
    // new install can open.
    const summary = summariseAttempts([]);

    expect(summary).toEqual({
      total: 0,
      passed: 0,
      passRate: 0,
      best: null,
      average: null,
    });
    expect(Number.isNaN(summary.passRate)).toBe(false);
  });

  it('distinguishes never-scored from scored-zero', () => {
    // `best: null` means "no attempt yet"; `best: 0` means "sat one and got
    // everything wrong". Collapsing the two would report a score the learner
    // never earned, which is the same reason the readiness ring shows the pass
    // mark rather than 0% before the first attempt.
    expect(summariseAttempts([]).best).toBeNull();
    expect(summariseAttempts([attempt('quick', 0, false)]).best).toBe(0);
  });

  it('rounds the pass rate the way the exam home does', () => {
    // Two screens reporting 67% and 66% for one history is the kind of defect
    // nobody reports and everybody notices.
    const rows = [attempt('quick', 90), attempt('quick', 90), attempt('quick', 10)];

    expect(summariseAttempts(rows).passRate).toBe(67);
  });
});

describe('modesPresent', () => {
  it('lists only modes actually sat', () => {
    const rows = [attempt('full', 70), attempt('drill', 50)];

    expect(modesPresent(rows)).toEqual(['full', 'drill']);
  });

  it('orders by the format grid, not by which was sat first', () => {
    // A chip row that reorders itself as the history grows is a control the
    // reader cannot build a habit around. `drill` is declared last in
    // `EXAM_MODES`, so it stays last here however early it was sat.
    const rows = [attempt('drill', 50), attempt('quick', 80), attempt('full', 70)];

    expect(modesPresent(rows)).toEqual(['quick', 'full', 'drill']);
  });

  it('is empty for an empty history', () => {
    expect(modesPresent([])).toEqual([]);
  });
});

describe('filterByMode', () => {
  const rows = [attempt('quick', 80), attempt('full', 70), attempt('quick', 40)];

  it('selects one mode', () => {
    expect(filterByMode(rows, 'quick').map((r) => r.percent)).toEqual([80, 40]);
  });

  it('returns the input array itself for "all"', () => {
    // Identity, not just equality. The result is a `FlatList`'s `data`, and
    // that list re-renders when the identity changes — so returning a copy
    // would make every unrelated render of the screen look like new data.
    expect(filterByMode(rows, 'all')).toBe(rows);
  });

  it('gives an empty list for a mode never sat', () => {
    expect(filterByMode(rows, 'drill')).toEqual([]);
  });
});
