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
  /**
   * `reference` marks material that is accurate and useful but is NOT from a
   * government publication — it must never be presented as official, and the
   * exam never draws on it.
   */
  authority: 'kurdistan-moi' | 'federal-moi' | 'other-official' | 'reference';
  /** Publication title, exactly as printed. */
  document: string;
  /** Edition or publication year, when the document states one. */
  edition?: string;
  /** Page or article number the record was taken from. */
  locator?: string;
  url?: string;
};

/**
 * `verified: false` marks placeholder or unreviewed records. `examPool()` never
 * draws on them, and the Learn screen badges them as UNOFFICIAL wherever they
 * are shown.
 */
export type Sourced = {
  id: string;
  source: SourceRef;
  verified: boolean;
};

/** The divisions used by the ministry manual. */
export type SignCategory =
  | 'regulatory' // علامات مانعة أو تنظيمية
  | 'warning' // علامات تحذيرية
  | 'informative' // علامات إرشادية أو توجيهية
  | 'roadmarking' // علامات أرضية
  | 'trafficlight'; // إشارات ضوئية

export type TrafficSign = Sourced & {
  category: SignCategory;
  image?: ImageSourcePropType;
  title: Localized;
  /** What the sign denotes, as stated by the source. */
  meaning: Localized;
  /**
   * The required action, only where the source states one separately from the
   * meaning. Optional because the ministry manual gives a single description
   * per sign — inventing an action would put unofficial text in the app.
   */
  action?: Localized;
  /** True when this sign governs right of way, for the priority section. */
  priority?: boolean;
};

/**
 * Which Learn section teaches a study note.
 *
 * Deliberately the same seven values as `LearnSectionId`, which is declared as
 * an alias of this type so the two cannot drift: a note whose topic no section
 * renders would be material shipped in the bundle and reachable from nowhere,
 * which is the exact failure the Learn tab was rebuilt to end.
 */
export type NoteTopic =
  | 'signs'
  | 'rules'
  | 'priority'
  | 'violations'
  | 'dashboard'
  | 'mechanics'
  | 'firstaid';

/**
 * A page of study material, written as something to learn rather than as a
 * question to answer.
 *
 * This is what the Learn tab is made of. It replaced rendering the exam bank
 * there: the bank is ~430 multiple-choice questions, and a study tab built out
 * of them reads as a quiz whose answers have been given away — the same stem
 * repeated down the screen ("What does this sign mean?" 69 times in English),
 * one fact per card, and the same fact restated by every question that happens
 * to test it. Sixteen penalty questions answering "A fine" are one note, not
 * sixteen cards.
 *
 * The bank is still where the *questions* live: `examPool()` draws on it
 * unchanged, and `sections.test.ts` pins that every topic it carries is taught
 * by exactly one section here, so nothing can be graded on material the Learn
 * tab never explains.
 *
 * `body` is a short paragraph. `points` are the facts a learner has to be able
 * to recall — limits, distances, orders of precedence — kept out of the prose
 * because a figure buried in a sentence is a figure nobody revises from.
 */
export type StudyNote = Sourced & {
  topic: NoteTopic;
  /** Sub-heading this note sits under; must be one of its section's groups. */
  group: string;
  image?: ImageSourcePropType;
  title: Localized;
  body: Localized;
  points?: Localized[];
};

/**
 * Severity of a dashboard tell-tale, by the convention every manufacturer
 * follows: red demands stopping, amber means service soon, green and blue are
 * confirmations that a system is simply switched on.
 */
export type DashboardColour = 'red' | 'amber' | 'green' | 'blue' | 'white';

export type DashboardLight = Sourced & {
  image?: ImageSourcePropType;
  colour: DashboardColour;
  title: Localized;
  /** What the lamp is telling the driver. */
  meaning: Localized;
  /** What the driver should do about it, where there is a clear answer. */
  action?: Localized;
};

/**
 * Topics a bank question can carry.
 *
 * `signs`, `rules` and `priority` are the official exam's scope and are the only
 * ones `EXAM_TOPICS` draws on. `mechanics` covers the large vehicle-upkeep
 * section of the ministry bank — oil changes, engine fires, the annual
 * inspection, tyres, documents and penalties. `firstaid` covers the bank's
 * casualty-care questions (burns, bleeding, moving an injured person), which are
 * neither about the vehicle nor about behaviour in traffic.
 *
 * Both extra topics are transcribed and studyable but deliberately outside the
 * exam: adding either to `EXAM_TOPICS` would put material into graded attempts
 * that the real theoretical test does not ask about.
 */
export type QuestionTopic =
  | 'signs'
  | 'rules'
  | 'priority'
  | 'mechanics'
  | 'firstaid';

/**
 * Every exam question is multiple choice with exactly one correct option.
 *
 * The official ministry bank uses three options throughout, so three is the
 * canonical shape; four is permitted for any future material that uses it.
 * Anything outside this range is rejected by `validateBundle`, so a malformed
 * import fails loudly instead of rendering a lopsided question card.
 */
export const MIN_CHOICES_PER_QUESTION = 3;
export const MAX_CHOICES_PER_QUESTION = 4;

export type Choice = {
  id: string;
  text: Localized;
};

export type ChoiceSet =
  | [Choice, Choice, Choice]
  | [Choice, Choice, Choice, Choice];

export type Question = Sourced & {
  topic: QuestionTopic;
  prompt: Localized;
  image?: ImageSourcePropType;
  choices: ChoiceSet;
  /** Must match exactly one entry in `choices`. */
  correctChoiceId: string;
  explanation: Localized;
  /**
   * True for questions generated from other content rather than transcribed
   * from the question bank — currently the one-per-sign identification
   * questions. Their wording is ours, not the ministry's, and there is one for
   * every sign, so they vastly outnumber the transcribed bank. `buildExam`
   * caps how much of an attempt they may fill; see `MAX_DERIVED_SHARE`.
   */
  derived?: boolean;
};

/**
 * Everything the app ships, in four kinds.
 *
 * There used to be three more — `Violation`, `TrafficRule` and
 * `PriorityScenario` — each a `Sourced` record with a title and a paragraph or
 * two, each rendered as its own kind of card in one Learn section. They are all
 * `StudyNote` now. Keeping them apart bought nothing the `topic` field does not
 * give, and it cost the thing the Learn tab was rebuilt to fix: a "Keep your
 * distance" rule card and a "Speed and following distance" note in the same
 * list is a duplicate a reader sees immediately and a type system never will.
 *
 * `signs` and `dashboard` stay distinct because they genuinely are: both are
 * artwork catalogues, keyed by a `category` or a `colour` the screen groups and
 * colours by, and both carry labelled fields a reader looks up individually.
 */
export type ContentBundle = {
  signs: TrafficSign[];
  notes: StudyNote[];
  dashboard: DashboardLight[];
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
  for (const d of bundle.dashboard) checkId('dashboard', d.id);

  for (const note of bundle.notes) {
    checkId('note', note.id);
    if (!note.group.trim()) problems.push(`Note "${note.id}" has no group`);
    // An empty `points` array renders as a bulleted list with no bullets — a
    // gap under the paragraph that looks like a failed load rather than like a
    // note that simply had nothing to list.
    if (note.points && note.points.length === 0) {
      problems.push(`Note "${note.id}" has an empty points list`);
    }
  }

  for (const q of bundle.questions) {
    checkId('question', q.id);
    if (
      q.choices.length < MIN_CHOICES_PER_QUESTION ||
      q.choices.length > MAX_CHOICES_PER_QUESTION
    ) {
      problems.push(
        `Question "${q.id}" has ${q.choices.length} choices; expected ${MIN_CHOICES_PER_QUESTION}-${MAX_CHOICES_PER_QUESTION}`,
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

    // Distinct ids are not enough. Two choices that *read* the same make the
    // question unanswerable in that language: the learner picks the right
    // wording and is still marked wrong. Derived questions reuse content titles
    // verbatim, so a duplicate title upstream lands here.
    for (const lang of Object.keys(q.prompt) as LanguageCode[]) {
      const texts = q.choices.map((c) => c.text[lang]);
      if (new Set(texts).size !== texts.length) {
        problems.push(
          `Question "${q.id}" has two choices with identical "${lang}" text`,
        );
      }
    }
  }

  return problems;
}
