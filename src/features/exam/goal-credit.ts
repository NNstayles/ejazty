/**
 * Whether an answer just given earns a point toward the daily goal.
 *
 * ## The rule
 *
 * A point is earned when the answer is **correct** and its question has not
 * already been credited during this attempt. Nothing else counts, because the
 * goal is a measure of what the learner got right — a wrong answer moves the
 * ring by nothing, however many of them there are.
 *
 * ## Why this is a module rather than three lines in the runner
 *
 * Both halves of the rule fail *silently*, and neither is reachable by hand
 * without sitting a whole exam and keeping a tally on paper. A version that
 * credited every answer looks identical to a learner who happens to be getting
 * them right, and the version below without its cap looks identical to anyone
 * who does not go back and change an answer. The runner is a React provider and
 * this project has no renderer tests, so a rule left inside it is one that can
 * stop working without anything saying so.
 *
 * ## Credit is capped per question, and never withdrawn
 *
 * The cap is what stops a question being counted twice. Answers stay editable
 * in the three non-revealing modes — that is what the question navigator is
 * *for* — so right, then wrong, then right again is an ordinary thing to do
 * while checking your work, and without the cap it would mint a fresh point on
 * every pass. A learner would reach a goal of twenty on eight questions, and
 * nothing on screen would explain why.
 *
 * Credit is not taken *back* when a correct answer is later changed to a wrong
 * one, which is a decision rather than an oversight: a goal that counts down
 * while you work is one nobody trusts, and the learner did answer it correctly.
 * The accepted cost is that the day's tally is a high-water mark rather than a
 * mirror of the final paper — the result screen is what reports the score, and
 * it grades the answers actually submitted.
 *
 * ## There is no way to farm points against revealed answers
 *
 * `open` is the only mode that shows the answer as it lands, and its choices
 * lock once answered (`Choice` in `(tabs)/exam/session.tsx`), so a revealed
 * answer cannot be retried. The lock and the cap cover each other: if that lock
 * were ever lifted, this function is the thing standing between a learner and a
 * full ring earned on one question.
 */

import type { ExamQuestion } from './engine';

/**
 * The minimum a question has to be for this decision.
 *
 * Narrower than `ExamQuestion` on purpose — the rule reads an id and a correct
 * answer and nothing else, and saying so keeps a caller from assuming the
 * shuffled choice list or the artwork is consulted here.
 */
export type CreditableQuestion = Pick<ExamQuestion, 'id' | 'correctChoiceId'>;

export function earnsGoalCredit(
  /** Undefined when the id does not name a question in this attempt. */
  question: CreditableQuestion | undefined,
  choiceId: string,
  /** Question ids already credited during this attempt. */
  credited: ReadonlySet<string>,
): boolean {
  // An id with no question behind it is not an answer to anything. Nothing in
  // the app can produce one, which is exactly why it must not be credited:
  // the only way to get here is a bug, and a bug should not pay out.
  if (question === undefined) return false;
  if (choiceId !== question.correctChoiceId) return false;
  return !credited.has(question.id);
}
