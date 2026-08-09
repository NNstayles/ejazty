/**
 * Single entry point for all study material.
 *
 * Swapping in the official ministry content is a one-file change: build an
 * `officialBundle` under `data/official.ts`, import it here, and put it first
 * in `BUNDLES`. Screens and the exam engine read only from this module.
 */

import { dashboardLights as dashboardData } from './data/dashboard';
import { officialBundle } from './data/official';
import { studyNotes as studyNotesData } from './data/study';
import {
  validateBundle,
  type ContentBundle,
  type DashboardLight,
  type NoteTopic,
  type Question,
  type QuestionTopic,
  type StudyNote,
  type TrafficSign,
} from './schema';

/**
 * The Learn tab's study notes.
 *
 * Kept in its own bundle because its provenance is mixed and has to stay
 * traceable: most notes condense the ministry question bank and carry the
 * question numbers they came from, but the general road-code material and the
 * added first-aid content do not come from a ministry publication at all. See
 * `data/study/source.ts` for the provenance note behind each source ref.
 *
 * Exports no questions, so nothing here can reach a graded attempt.
 */
const studyBundle: ContentBundle = {
  signs: [],
  notes: studyNotesData,
  dashboard: [],
  questions: [],
};

/**
 * Dashboard tell-tales. Kept in its own bundle so its provenance stays
 * traceable — it is study support, never exam material. Sourced from a
 * published car-symbol guide rather than the ministry; see
 * `data/dashboard/source.ts` for the provenance note behind its official label.
 */
const dashboardBundle: ContentBundle = {
  signs: [],
  notes: [],
  dashboard: dashboardData,
  questions: [],
};

/** Ordered highest-trust first. */
const BUNDLES: ContentBundle[] = [officialBundle, studyBundle, dashboardBundle];

function merge(bundles: ContentBundle[]): ContentBundle {
  return {
    signs: bundles.flatMap((b) => b.signs),
    notes: bundles.flatMap((b) => b.notes),
    dashboard: bundles.flatMap((b) => b.dashboard),
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
export const dashboardLights: DashboardLight[] = bundle.dashboard;
export const questions: Question[] = bundle.questions;

/**
 * Every study note that ships, and the per-topic view the Learn tab reads.
 *
 * Grouped once at module load rather than filtered per call: the Learn home
 * asks for every section's count on each render, and the section screen asks
 * again on every language change.
 */
export const studyNotes: StudyNote[] = bundle.notes;

const notesByTopic = new Map<NoteTopic, StudyNote[]>();
for (const note of studyNotes) {
  const bucket = notesByTopic.get(note.topic);
  if (bucket) bucket.push(note);
  else notesByTopic.set(note.topic, [note]);
}

export function studyNotesFor(topic: NoteTopic): StudyNote[] {
  return notesByTopic.get(topic) ?? [];
}

/**
 * Signs governing right of way.
 *
 * **The Learn tab no longer renders this as a section of its own.** Every
 * record in here is also a `roadSign` or one of `markingsAndLights`, so
 * listing it separately put sixteen records on screen twice — once in the sign
 * catalogue that owns them and once under road priority. The catalogue won,
 * because a "Traffic signs" section missing STOP and Give Way is worse than a
 * priority section that holds only scenarios and questions.
 *
 * The view stays because `priority` is a real property of a sign and a future
 * screen may well want it; it is simply not a section boundary.
 */
export const prioritySigns: TrafficSign[] = signs.filter((s) => s.priority);

/** Signs shown under the "traffic signs" section, excluding markings/lights. */
export const roadSigns: TrafficSign[] = signs.filter(
  (s) => s.category !== 'roadmarking' && s.category !== 'trafficlight',
);

/** Markings and light signals, shown under the "traffic rules" section. */
export const markingsAndLights: TrafficSign[] = signs.filter(
  (s) => s.category === 'roadmarking' || s.category === 'trafficlight',
);

/**
 * Questions eligible for an exam.
 *
 * Only verified questions are ever drawn. Placeholder material has been removed
 * from the app entirely, but the filter stays as the guarantee: anything added
 * later without `verified: true` cannot reach a graded attempt.
 *
 * The general and dashboard bundles export no questions at all, so nothing but
 * transcribed ministry material can reach this pool.
 */
const verifiedQuestions: Question[] = questions.filter((q) => q.verified);
const poolCache = new Map<string, Question[]>();

export function examPool(topics?: QuestionTopic[]): Question[] {
  if (!topics || topics.length === 0) return verifiedQuestions;

  // The exam home calls this four times per render — once for the pool size and
  // once per mode to decide whether it is runnable — and the bank is static for
  // the life of the process, so the filtered result is computed once per topic
  // set rather than on every call.
  const key = [...topics].sort().join(',');
  const cached = poolCache.get(key);
  if (cached) return cached;

  const pool = verifiedQuestions.filter((q) => topics.includes(q.topic));
  poolCache.set(key, pool);
  return pool;
}

/**
 * Every topic the transcribed bank actually carries.
 *
 * The Learn tab no longer renders bank questions — it renders study notes
 * written from them — so this is what stands in for the old coverage check:
 * `sections.test.ts` asserts that every topic in here is taught by exactly one
 * Learn section. Without it, adding a topic to `QuestionTopic` would put
 * material into the bundle that a learner can be graded on and can read about
 * nowhere, which is the state the app shipped in before the Learn tab had a
 * section for `mechanics` or `firstaid` at all.
 *
 * `derived` questions are excluded: they are generated from `signs`, so their
 * topic is covered by the sign catalogue whatever the bank says.
 */
export const bankTopics: QuestionTopic[] = [
  ...new Set(questions.filter((q) => q.verified && !q.derived).map((q) => q.topic)),
];
