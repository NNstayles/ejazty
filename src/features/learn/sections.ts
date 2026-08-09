/**
 * The Learn tab's section list, its groups, and which bank topics each section
 * teaches.
 *
 * This lives outside `app/(tabs)/learn/` so it can be tested. The screen that
 * consumes it imports `expo-router` and `expo-image`, and this project has no
 * renderer tests — so a coverage rule left inline there would be reachable only
 * by opening the app in three languages and counting, which is the same as not
 * being checked at all. Same reasoning as `i18n/directionFor` and
 * `features/exam/choice-markers`.
 *
 * The rule worth pinning is `sections.test.ts`'s: **every topic in the question
 * bank is taught by exactly one section.** The bank is the app's largest asset
 * by a wide margin and it used to be exam-only, which meant a learner could be
 * graded on material with nowhere to go and read it — and `mechanics` and
 * `firstaid` were worse than that, since `EXAM_TOPICS` excludes them, so
 * eighty-five transcribed questions shipped in the bundle unreachable from
 * anywhere in the app. Adding a topic to `QuestionTopic` without giving it a
 * home here puts the app straight back into that state, silently, because
 * nothing renders a topic it was not told about.
 *
 * Note what changed and what did not. The Learn tab no longer renders bank
 * questions as cards — it renders study notes written from them, because a
 * study tab made of multiple-choice questions reads as a quiz with the answers
 * given away. The coverage rule survives that intact: it is now stated over
 * `SECTION_BANK_TOPICS` and checked against `studyNotesFor`, so a section may
 * only claim a topic if it actually has notes teaching it.
 */

import type { NoteTopic, QuestionTopic } from '@/content/schema';

/**
 * A Learn section id.
 *
 * Declared as an alias of `NoteTopic` rather than as its own union, so a note
 * cannot be written for a section that does not exist and a section cannot be
 * added without the content layer knowing about it.
 */
export type LearnSectionId = NoteTopic;

/**
 * Sections in study order, which is the order the home screen renders.
 *
 * Signs first because every other section refers to them; then the rules of the
 * road, then who goes first, then what breaking either costs. The vehicle and
 * its dashboard sit together at the end, and first aid last, since it is the
 * one section about what happens after everything else has failed.
 */
export const SECTION_IDS = [
  'signs',
  'rules',
  'priority',
  'violations',
  'mechanics',
  'dashboard',
  'firstaid',
] as const satisfies readonly LearnSectionId[];

export const SECTION_TITLE_KEYS: Record<LearnSectionId, string> = {
  signs: 'learn.signs',
  violations: 'learn.violations',
  rules: 'learn.rules',
  priority: 'learn.priority',
  dashboard: 'learn.dashboard',
  mechanics: 'learn.mechanics',
  firstaid: 'learn.firstaid',
};

/**
 * Which exam-bank topics each section teaches.
 *
 * A total `Record`, so a new section is a compile error until it states its
 * answer — including `[]`, which is the honest answer for `dashboard`: no
 * question in the bank carries it as a topic, because the tell-tales are study
 * support the manual never asks about.
 *
 * `violations` claims none of its own for a subtler reason. The bank classifies
 * every penalty question as `rules` or `mechanics` by the rule recorded in
 * CLAUDE.md — behaviour in traffic is `rules`, the vehicle itself is
 * `mechanics` — so the offences section teaches material drawn from topics the
 * rules and vehicle sections also draw from. Claiming them here as well would
 * break the "exactly one section" half of the coverage rule for no gain.
 */
export const SECTION_BANK_TOPICS: Record<LearnSectionId, QuestionTopic[]> = {
  signs: ['signs'],
  violations: [],
  rules: ['rules'],
  priority: ['priority'],
  dashboard: [],
  mechanics: ['mechanics'],
  firstaid: ['firstaid'],
};

export function isLearnSectionId(value: string): value is LearnSectionId {
  return (SECTION_IDS as readonly string[]).includes(value);
}

/**
 * The groups a section's cards are divided into, in display order.
 *
 * Long sections are grouped rather than flat because the flat versions are long
 * enough to be unnavigable — traffic signs is 115 cards — and because a reader
 * revising one topic should be able to find it. Which group a *catalogue* card
 * lands in is decided by the data (a sign's `category`, a tell-tale's
 * `colour`); a study note names its own group, and `entries.test.ts` pins that
 * the name is one of the ones listed here.
 *
 * Reference material comes first in the sections that have it, because the
 * catalogue is what the notes are written about.
 */
export const SECTION_GROUPS: Record<LearnSectionId, readonly string[]> = {
  signs: ['basics', 'regulatory', 'warning', 'informative', 'bank'],
  violations: ['offences', 'penalties'],
  rules: [
    'markings',
    'lights',
    'speed',
    'overtaking',
    'lanes',
    'parking',
    'night',
    'weather',
    'people',
    'conduct',
    'situations',
  ],
  priority: ['order', 'scenarios', 'pictures'],
  dashboard: ['red', 'amber', 'green', 'blue', 'white'],
  mechanics: ['cockpit', 'bonnet', 'care', 'tyres', 'faults', 'inspection', 'licensing'],
  firstaid: ['scene', 'injuries'],
};

/**
 * i18n key for a group heading.
 *
 * The dashboard groups reuse `learn.severity.*` rather than declaring their own
 * strings: those five already say exactly what a red or amber lamp means, and a
 * second set of near-identical translations is a way for the two to drift.
 */
export function groupTitleKey(group: string): string {
  const severity = ['red', 'amber', 'green', 'blue', 'white'];
  return severity.includes(group)
    ? `learn.severity.${group}`
    : `learn.groups.${group}`;
}
