import type { QuestionTopic } from '@/content/schema';
import { breakdownByTopic, isBreakdownUseful } from './breakdown';
import type { ExamQuestion, GradedAnswer } from './engine';

/**
 * What the topic breakdown has to get right.
 *
 * Every rule here is invisible from the app. A wrong sort order still renders a
 * plausible list; a topic reported at 0% because the attempt never asked about
 * it still renders a plausible row — and both send a learner to study the wrong
 * section, which is the one thing this feature exists to get right.
 */

let n = 0;
const answer = (topic: QuestionTopic, correct: boolean): GradedAnswer => ({
  question: { id: `q-${n++}`, topic } as unknown as ExamQuestion,
  selectedChoiceId: correct ? 'a' : 'b',
  correct,
});

/** `n` correct and `m` wrong answers on one topic. */
const run = (topic: QuestionTopic, right: number, wrong: number): GradedAnswer[] => [
  ...Array.from({ length: right }, () => answer(topic, true)),
  ...Array.from({ length: wrong }, () => answer(topic, false)),
];

describe('breakdownByTopic', () => {
  it('scores each topic over its own questions', () => {
    const rows = breakdownByTopic([...run('signs', 3, 1), ...run('rules', 1, 3)]);

    expect(rows).toEqual([
      { topic: 'rules', correct: 1, total: 4, percent: 25 },
      { topic: 'signs', correct: 3, total: 4, percent: 75 },
    ]);
  });

  it('puts the weakest topic first', () => {
    // The ordering *is* the feature: the list is read as "study this next", so
    // a stable-but-arbitrary order — insertion, alphabetical — would quietly
    // point most learners at the wrong section.
    const rows = breakdownByTopic([
      ...run('signs', 9, 1),
      ...run('rules', 5, 5),
      ...run('priority', 2, 8),
    ]);

    expect(rows.map((r) => r.topic)).toEqual(['priority', 'rules', 'signs']);
  });

  it('breaks a tie by the larger topic, then by name', () => {
    // Without a total order two topics on the same percentage can swap places
    // between renders, and a list that reorders itself under the finger reads
    // as a bug rather than as a ranking.
    const rows = breakdownByTopic([
      ...run('signs', 1, 1),
      ...run('rules', 5, 5),
      ...run('priority', 1, 1),
    ]);

    expect(rows.map((r) => r.topic)).toEqual(['rules', 'priority', 'signs']);
  });

  it('omits a topic the attempt never asked about', () => {
    // The load-bearing case. A `quick` exam is fifteen questions and can easily
    // miss a topic entirely; a row reporting that as 0% would send a learner to
    // revise the one subject they were not tested on.
    const rows = breakdownByTopic(run('signs', 4, 1));

    expect(rows.map((r) => r.topic)).toEqual(['signs']);
  });

  it('rounds the same way the overall score does', () => {
    // `gradeExam` uses `Math.round`, and the two figures sit on the same screen.
    // A breakdown that floored would show 66% beside a ring reading 67% on a
    // single-topic paper, which reads as one of them being broken.
    const rows = breakdownByTopic(run('rules', 2, 1));

    expect(rows[0].percent).toBe(67);
  });

  it('handles a perfect and a blank topic without dividing by zero', () => {
    const rows = breakdownByTopic([...run('signs', 3, 0), ...run('rules', 0, 3)]);

    expect(rows).toEqual([
      { topic: 'rules', correct: 0, total: 3, percent: 0 },
      { topic: 'signs', correct: 3, total: 3, percent: 100 },
    ]);
  });

  it('returns nothing for an empty attempt', () => {
    expect(breakdownByTopic([])).toEqual([]);
  });
});

describe('isBreakdownUseful', () => {
  it('hides a breakdown of one topic', () => {
    // One row restates the score already printed inside the ring, under a
    // heading that promises to tell you something new.
    expect(isBreakdownUseful(breakdownByTopic(run('signs', 4, 1)))).toBe(false);
    expect(isBreakdownUseful(breakdownByTopic([]))).toBe(false);
  });

  it('shows a breakdown that actually splits the attempt', () => {
    expect(
      isBreakdownUseful(breakdownByTopic([...run('signs', 1, 1), ...run('rules', 1, 1)])),
    ).toBe(true);
  });
});
