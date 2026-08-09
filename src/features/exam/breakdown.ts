/**
 * A graded attempt, split by topic.
 *
 * The result screen could already say *how much* a learner lost and could not
 * say *where*. "30 of 45" is a number to feel bad about; "signs 14/15, priority
 * 4/12" is an instruction — open the Road priority section. That is the whole
 * reason this exists, and it is why the rows are sorted weakest-first and link
 * straight into the matching Learn section rather than being listed in some
 * fixed order.
 *
 * It lives here rather than inside `result.tsx` for the reason the direction
 * rules and the choice markers do: the screen imports `expo-router` and
 * Reanimated, this project has no renderer tests, and the ordering rule is
 * exactly the kind that looks right in a diff and is wrong on a device. See
 * `breakdown.test.ts`.
 *
 * `QuestionTopic` is a subset of `NoteTopic`, which `LearnSectionId` aliases, so
 * a topic id *is* the id of the Learn section that teaches it — that is what
 * makes the link a one-liner at the call site and it is pinned by
 * `sections.test.ts`.
 */

import type { QuestionTopic } from '@/content/schema';
import type { GradedAnswer } from './engine';

export type TopicBreakdown = {
  topic: QuestionTopic;
  correct: number;
  total: number;
  /** 0–100, rounded, matching how `gradeExam` computes the overall figure. */
  percent: number;
};

/**
 * Per-topic scores for one attempt, weakest first.
 *
 * Ties are broken by the larger topic and then by name, so the order is total
 * rather than partial: two topics on 50% would otherwise swap places between
 * renders, and a list that reorders itself under the finger reads as a bug.
 *
 * Topics the attempt did not draw on are absent rather than present at zero. A
 * `full` paper covers all three exam topics, but a `quick` one is fifteen
 * questions and can easily miss one — reporting that as 0% would tell a learner
 * to go and study the topic they were never asked about.
 */
export function breakdownByTopic(
  graded: readonly GradedAnswer[],
): TopicBreakdown[] {
  const tally = new Map<QuestionTopic, { correct: number; total: number }>();

  for (const item of graded) {
    const bucket = tally.get(item.question.topic) ?? { correct: 0, total: 0 };
    bucket.total += 1;
    if (item.correct) bucket.correct += 1;
    tally.set(item.question.topic, bucket);
  }

  return [...tally.entries()]
    .map(([topic, { correct, total }]) => ({
      topic,
      correct,
      total,
      // `total` cannot be zero: a topic is only in the map because a question
      // put it there.
      percent: Math.round((correct / total) * 100),
    }))
    .sort(
      (a, b) =>
        a.percent - b.percent || b.total - a.total || a.topic.localeCompare(b.topic),
    );
}

/**
 * Whether the breakdown is worth showing at all.
 *
 * One topic is not a breakdown — it restates the score already printed inside
 * the ring, under a heading that promises to tell you something new.
 */
export function isBreakdownUseful(breakdown: readonly TopicBreakdown[]): boolean {
  return breakdown.length > 1;
}
