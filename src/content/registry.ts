/**
 * Single entry point for all study material.
 *
 * Swapping in the official ministry content is a one-file change: build an
 * `officialBundle` under `data/official.ts`, import it here, and put it first
 * in `BUNDLES`. Screens and the exam engine read only from this module.
 */

import { officialBundle } from './data/official';
import {
  samplePriority,
  sampleQuestions,
  sampleRules,
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

/**
 * Placeholder material for the areas the official transcription does not cover
 * yet. Signs are gone from here — the ministry manual supplies all of them.
 */
const sampleBundle: ContentBundle = {
  signs: [],
  violations: sampleViolations,
  rules: sampleRules,
  priority: samplePriority,
  questions: sampleQuestions,
};

/** Ordered highest-trust first. */
const BUNDLES: ContentBundle[] = [officialBundle, sampleBundle];

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

/** Signs governing right of way, surfaced as the road-priority section. */
export const prioritySigns: TrafficSign[] = signs.filter((s) => s.priority);

/** Signs shown under the "traffic signs" section, excluding markings/lights. */
export const roadSigns: TrafficSign[] = signs.filter(
  (s) => s.category !== 'roadmarking' && s.category !== 'trafficlight',
);

/** Markings and light signals, shown under the "traffic rules" section. */
export const markingsAndLights: TrafficSign[] = signs.filter(
  (s) => s.category === 'roadmarking' || s.category === 'trafficlight',
);

const anyUnverified = (items: { verified: boolean }[]) =>
  items.length === 0 || items.some((i) => !i.verified);

/**
 * Placeholder status is tracked per area rather than globally: the signs are
 * fully transcribed while the question bank is not, so a single flag would
 * wrongly clear the warning on the Exam tab.
 */
export const sampleAreas = {
  signs: anyUnverified(bundle.signs),
  violations: anyUnverified(bundle.violations),
  rules: anyUnverified(bundle.rules),
  priority: anyUnverified(bundle.priority),
  questions: anyUnverified(bundle.questions),
} as const;

export type SampleArea = keyof typeof sampleAreas;

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
