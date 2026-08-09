import type { TrafficSign } from '../../schema';
import { informativeSigns } from './signs-informative';
import { regulatorySigns } from './signs-regulatory';
import { warningSigns } from './signs-warning';

/**
 * The 111 signs, assembled here rather than in `index.ts`.
 *
 * `sign-questions.ts` needs this list, and `index.ts` needs the questions — so
 * building the list in `index.ts` makes the two modules import each other. The
 * cycle is invisible to the type checker and the bundler; it only shows up at
 * runtime, as `signs` being undefined while `sign-questions` is evaluating.
 * Keeping the list in its own leaf module removes the cycle entirely.
 */
export const signs: TrafficSign[] = [
  ...regulatorySigns,
  ...warningSigns,
  ...informativeSigns,
];
