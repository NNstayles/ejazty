import type { ImageSourcePropType } from 'react-native';

import type { LanguageCode } from '@/i18n';

/** Every user-facing content string must exist in all three languages. */
export type Localized = Record<LanguageCode, string>;

export function pick(value: Localized, language: LanguageCode): string {
  return value[language] || value.en;
}

/**
 * Provenance for a single content record.
 *
 * This is deliberately non-optional across every content type: the product
 * promise is that material comes from an official ministry publication, and an
 * unsourced record should be impossible to add without noticing.
 */
export type SourceRef = {
  authority: 'kurdistan-moi' | 'federal-moi' | 'other-official';
  /** Publication title, exactly as printed. */
  document: string;
  /** Edition or publication year, when the document states one. */
  edition?: string;
  /** Page or article number the record was taken from. */
  locator?: string;
  url?: string;
};

/**
 * `verified: false` marks placeholder or unreviewed records. The exam engine
 * refuses to draw on unverified questions unless sample mode is explicitly on,
 * and the UI badges unverified material wherever it is shown.
 */
type Sourced = {
  id: string;
  source: SourceRef;
  verified: boolean;
};

export type SignCategory =
  | 'warning'
  | 'regulatory'
  | 'informative'
  | 'priority'
  | 'roadwork';

export type TrafficSign = Sourced & {
  category: SignCategory;
  image?: ImageSourcePropType;
  title: Localized;
  /** What the sign denotes. */
  meaning: Localized;
  /** The action the driver is legally required to take. */
  action: Localized;
};

export type Violation = Sourced & {
  title: Localized;
  description: Localized;
  /** Penalty exactly as stated by the source; never inferred. */
  penalty: Localized;
};

export type TrafficRule = Sourced & {
  title: Localized;
  body: Localized;
};

export type PriorityScenario = Sourced & {
  image?: ImageSourcePropType;
  title: Localized;
  /** The situation, then who has right of way and why. */
  description: Localized;
};

/** Exams draw only from these two topics, per the official exam scope. */
export type QuestionTopic = 'signs' | 'priority';

/**
 * Every exam question is multiple choice with exactly four options, one of
 * which is correct. This is enforced both in the type (a 4-tuple) and in
 * `validateBundle`, so an imported question with the wrong shape fails loudly
 * instead of rendering a lopsided question card.
 */
export const CHOICES_PER_QUESTION = 4;

export type Choice = {
  id: string;
  text: Localized;
};

export type ChoiceSet = [Choice, Choice, Choice, Choice];

export type Question = Sourced & {
  topic: QuestionTopic;
  prompt: Localized;
  image?: ImageSourcePropType;
  choices: ChoiceSet;
  /** Must match exactly one entry in `choices`. */
  correctChoiceId: string;
  explanation: Localized;
};

export type ContentBundle = {
  signs: TrafficSign[];
  violations: Violation[];
  rules: TrafficRule[];
  priority: PriorityScenario[];
  questions: Question[];
};

/**
 * Structural checks that catch data-entry mistakes at load time — a question
 * whose `correctChoiceId` does not match any choice would otherwise be
 * unanswerable and silently mark every attempt wrong.
 */
export function validateBundle(bundle: ContentBundle): string[] {
  const problems: string[] = [];
  const seen = new Set<string>();

  const checkId = (kind: string, id: string) => {
    const key = `${kind}:${id}`;
    if (seen.has(key)) problems.push(`Duplicate ${kind} id "${id}"`);
    seen.add(key);
  };

  for (const sign of bundle.signs) checkId('sign', sign.id);
  for (const v of bundle.violations) checkId('violation', v.id);
  for (const r of bundle.rules) checkId('rule', r.id);
  for (const p of bundle.priority) checkId('priority', p.id);

  for (const q of bundle.questions) {
    checkId('question', q.id);
    if (q.choices.length !== CHOICES_PER_QUESTION) {
      problems.push(
        `Question "${q.id}" has ${q.choices.length} choices; every question must have exactly ${CHOICES_PER_QUESTION}`,
      );
    }
    const correctMatches = q.choices.filter(
      (c) => c.id === q.correctChoiceId,
    ).length;
    if (correctMatches !== 1) {
      problems.push(
        `Question "${q.id}" must have exactly one choice matching correctChoiceId "${q.correctChoiceId}" (found ${correctMatches})`,
      );
    }
    const choiceIds = new Set(q.choices.map((c) => c.id));
    if (choiceIds.size !== q.choices.length) {
      problems.push(`Question "${q.id}" has duplicate choice ids`);
    }
  }

  return problems;
}
