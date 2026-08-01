/**
 * Single entry point for all study material.
 *
 * Swapping in the official ministry content is a one-file change: build an
 * `officialBundle` under `data/official.ts`, import it here, and put it first
 * in `BUNDLES`. Screens and the exam engine read only from this module.
 */

import {
  samplePriority,
  sampleQuestions,
  sampleRules,
  sampleSigns,
  sampleViolations,
} from './data/sample';
import {
  validateBundle,
  type ContentBundle,
  type PriorityScenario,
  type Question,
  type QuestionTopic,
  type TrafficRule,
  type TrafficSign,
  type Violation,
} from './schema';

const sampleBundle: ContentBundle = {
  signs: sampleSigns,
  violations: sampleViolations,
  rules: sampleRules,
  priority: samplePriority,
  questions: sampleQuestions,
};

/**
 * Ordered highest-trust first. Add the official bundle ahead of the sample one;
 * once it covers a topic you can drop the sample bundle entirely.
 */
const BUNDLES: ContentBundle[] = [sampleBundle];

function merge(bundles: ContentBundle[]): ContentBundle {
  return {
    signs: bundles.flatMap((b) => b.signs),
    violations: bundles.flatMap((b) => b.violations),
    rules: bundles.flatMap((b) => b.rules),
    priority: bundles.flatMap((b) => b.priority),
    questions: bundles.flatMap((b) => b.questions),
  };
}

const bundle = merge(BUNDLES);

// Surfaces malformed records during development instead of at exam time.
if (__DEV__) {
  const problems = validateBundle(bundle);
  if (problems.length > 0) {
    console.warn(
      `[content] ${problems.length} problem(s) found:\n- ${problems.join('\n- ')}`,
    );
  }
}

export const signs: TrafficSign[] = bundle.signs;
export const violations: Violation[] = bundle.violations;
export const rules: TrafficRule[] = bundle.rules;
export const priorityScenarios: PriorityScenario[] = bundle.priority;
export const questions: Question[] = bundle.questions;

/** True when no verified official material has been loaded yet. */
export const isSampleOnly: boolean = ![
  ...bundle.signs,
  ...bundle.violations,
  ...bundle.rules,
  ...bundle.priority,
  ...bundle.questions,
].some((item) => item.verified);

/**
 * Questions eligible for an exam.
 *
 * Once any verified question exists, unverified ones are excluded so a real
 * attempt is never scored against placeholder material. Until then the sample
 * set is used so the exam flow remains testable.
 */
export function examPool(topics?: QuestionTopic[]): Question[] {
  const hasVerified = questions.some((q) => q.verified);
  const pool = hasVerified ? questions.filter((q) => q.verified) : questions;
  if (!topics || topics.length === 0) return pool;
  return pool.filter((q) => topics.includes(q.topic));
}

export function findSign(id: string): TrafficSign | undefined {
  return signs.find((s) => s.id === id);
}

export function findQuestion(id: string): Question | undefined {
  return questions.find((q) => q.id === id);
}
