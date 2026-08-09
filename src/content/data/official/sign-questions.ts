/**
 * Sign-identification questions, derived from the verified signs manual.
 *
 * Every prompt shows an official sign and asks what it means; the correct
 * answer is that sign's own official title, and the two distractors are the
 * titles of other real signs. No wording is invented — only the framing of the
 * question is ours, which is why these carry the signs manual as their source.
 *
 * Generation is deterministic (fixed index offsets, no `Math.random`), so ids
 * and answers are stable across rebuilds. Shuffling happens per attempt in the
 * exam engine, not here.
 */
// Imported from the leaf module, not from `./index` — going through the barrel
// would make these two modules import each other, and `signs` would be
// undefined by the time this file runs.
import type { Choice, ChoiceSet, Question, TrafficSign } from '../../schema';
import { signs } from './signs';

const PROMPT = {
  ar: 'ما معنى هذه العلامة؟',
  en: 'What does this sign mean?',
  ckb: 'ئەم تابلۆیە واتای چییە؟',
};

/**
 * Distractors are pulled from the same category when there are enough of them,
 * so a question is never made trivial by two obviously unrelated options.
 */
function distractorsFor(sign: TrafficSign, index: number): TrafficSign[] {
  // A distractor whose title reads the same as the answer in any language makes
  // the question unanswerable — two identical options, one of them graded
  // wrong. The manual does print such pairs (the vehicle and pedestrian red
  // signals), so this is filtered rather than assumed away.
  const distinct = signs.filter(
    (s) => s.id !== sign.id && !sharesTitle(s, sign),
  );
  const sameCategory = distinct.filter((s) => s.category === sign.category);
  const pool = sameCategory.length >= 2 ? sameCategory : distinct;
  if (pool.length < 2) return [];

  const first = (index * 7 + 3) % pool.length;
  let second = (index * 13 + 11) % pool.length;
  // The two offsets collide in small categories — traffic lights have only six
  // members. Step forward rather than dropping the question.
  if (second === first) second = (second + 1) % pool.length;

  return [pool[first], pool[second]];
}

/** True when two signs read identically in any one language. */
function sharesTitle(a: TrafficSign, b: TrafficSign): boolean {
  return (Object.keys(a.title) as (keyof typeof a.title)[]).some(
    (lang) => a.title[lang] === b.title[lang],
  );
}

function toChoice(sign: TrafficSign, id: string): Choice {
  return { id, text: sign.title };
}

function build(): Question[] {
  const out: Question[] = [];
  const eligible = signs.filter((s) => s.image && s.verified);

  eligible.forEach((sign, index) => {
    const [first, second] = distractorsFor(sign, index);
    // A category with a single other member can repeat a distractor; drop those
    // rather than ship a question with two identical options. Matching text is
    // as disqualifying as a matching id — the learner reads the option, not the
    // record behind it.
    if (!first || !second || first.id === second.id || sharesTitle(first, second)) {
      return;
    }

    const choices: ChoiceSet = [
      toChoice(sign, 'a'),
      toChoice(first, 'b'),
      toChoice(second, 'c'),
    ];

    out.push({
      id: `q-sign-${sign.id}`,
      topic: sign.priority ? 'priority' : 'signs',
      verified: true,
      // Generated here, not transcribed from the bank. The exam engine uses
      // this to stop one identification question per sign from crowding out the
      // real questions.
      derived: true,
      source: sign.source,
      prompt: PROMPT,
      image: sign.image,
      choices,
      correctChoiceId: 'a',
      explanation: sign.meaning,
    });
  });

  return out;
}

export const signQuestions: Question[] = build();
