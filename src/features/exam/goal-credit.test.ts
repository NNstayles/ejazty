/**
 * Tests for the daily goal's crediting rule.
 *
 * The rule is small and every way of breaking it is invisible from the app,
 * which is the whole reason it was pulled out of the runner. Three groups carry
 * the file, and each pins a failure that renders a perfectly plausible screen:
 *
 *  - **A wrong answer earns nothing.** The version that credits every answer
 *    looks *identical* to a learner who is getting them right, so the only way
 *    to notice by hand is to sit an exam answering badly on purpose and keep a
 *    tally on paper.
 *  - **A question credits at most once.** Answers stay editable in the three
 *    non-revealing modes, so right → wrong → right is ordinary behaviour while
 *    checking your work, and without the cap it pays out every time.
 *  - **Credit is not withdrawn.** Asserted as hard as the other two, because it
 *    is the half most likely to be "fixed" into a tally that counts down —
 *    see the note in `goal-credit.ts` for why that is the wrong trade.
 */

import { earnsGoalCredit, type CreditableQuestion } from './goal-credit';

const QUESTION: CreditableQuestion = { id: 'q-1', correctChoiceId: 'c-2' };
const OTHER: CreditableQuestion = { id: 'q-2', correctChoiceId: 'c-1' };

/** The runner's `credited` ref, as a value. */
function credited(...ids: string[]): ReadonlySet<string> {
  return new Set(ids);
}

describe('earnsGoalCredit', () => {
  it('credits a correct answer on a question not yet counted', () => {
    expect(earnsGoalCredit(QUESTION, 'c-2', credited())).toBe(true);
  });

  it('credits nothing for a wrong answer', () => {
    expect(earnsGoalCredit(QUESTION, 'c-1', credited())).toBe(false);
    expect(earnsGoalCredit(QUESTION, 'c-3', credited())).toBe(false);
  });

  // Every question in an attempt is independent: crediting one must not spend
  // the next one's point. A `credited` check that looked at size rather than
  // membership would pass every test above and fail every learner after their
  // first correct answer.
  it('credits each question separately', () => {
    expect(earnsGoalCredit(OTHER, 'c-1', credited('q-1'))).toBe(true);
  });

  it('refuses a question id that is not in the attempt', () => {
    expect(earnsGoalCredit(undefined, 'c-2', credited())).toBe(false);
  });

  /*
    The cap, and the sequence that motivates it.

    A learner answers question 6 correctly, moves on, comes back through the
    navigator, second-guesses themselves, and then talks themselves back into
    the original answer. That is three calls on one question, and exactly one
    point. Without the `credited` check it is two.
  */
  it('credits a question once, however many times the answer changes', () => {
    const seen = new Set<string>();
    const answer = (choiceId: string) => {
      const earned = earnsGoalCredit(QUESTION, choiceId, seen);
      if (earned) seen.add(QUESTION.id);
      return earned;
    };

    expect(answer('c-2')).toBe(true); // right, and paid
    expect(answer('c-1')).toBe(false); // second thoughts
    expect(answer('c-2')).toBe(false); // back to the right answer, already paid
    expect(seen.size).toBe(1);
  });

  /*
    The other direction, and the one most at risk of being "corrected".

    Changing a credited answer to a wrong one returns false — it does not
    signal a *withdrawal*, and the runner has nothing to withdraw with. A goal
    that counts down while the learner works is one nobody trusts, and the
    result screen is what reports the score of the paper actually submitted.
  */
  it('does not withdraw credit when a correct answer is changed to a wrong one', () => {
    expect(earnsGoalCredit(QUESTION, 'c-1', credited('q-1'))).toBe(false);
  });
});
