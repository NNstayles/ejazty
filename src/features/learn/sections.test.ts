import { bankTopics, studyNotesFor } from '@/content/registry';
import type { QuestionTopic } from '@/content/schema';
import {
  isLearnSectionId,
  SECTION_BANK_TOPICS,
  SECTION_GROUPS,
  SECTION_IDS,
  SECTION_TITLE_KEYS,
} from './sections';

/**
 * The rule this file exists for: **nothing in the exam bank is material the
 * Learn tab never teaches.**
 *
 * That was not true before these tests. The whole transcribed bank was
 * exam-only, so a learner could be graded on a question with nowhere in the app
 * to go and read about it — and `mechanics` and `firstaid` were worse, since
 * `EXAM_TOPICS` excluded them from graded attempts too: eighty-five questions
 * shipped in the bundle that nothing in the app could reach.
 *
 * That second half is now closed from the other side as well: `EXAM_TOPICS`
 * covers every topic the bank carries as of 2026-08-08, pinned by
 * `engine.test.ts`'s `leaves no transcribed topic unexaminable`. The rule here
 * is still the one that matters, though, and it is the one that generalises —
 * being *examinable* is not the same as being *taught*, and this file is what
 * guarantees the second.
 *
 * The rule survived the Learn tab being rebuilt out of study notes rather than
 * out of the questions themselves; only its subject changed. It used to be
 * checked by counting rendered question cards. It is now checked one level up:
 * every topic the bank carries is claimed by exactly one section, and a section
 * may only claim a topic if it has notes to teach it with.
 *
 * Every assertion here fails silently in manual testing. A topic with no
 * section renders as a Learn tab that simply looks finished — nothing is
 * missing on screen, because a screen cannot show you what it was never told
 * about.
 */
describe('learn sections', () => {
  it('teaches every topic the question bank carries', () => {
    const covered = new Set(Object.values(SECTION_BANK_TOPICS).flat());

    // Named rather than compared as sets, so the failure says which topic went
    // homeless instead of printing two unordered lists to diff by eye.
    const homeless = bankTopics.filter((topic) => !covered.has(topic));
    expect(homeless).toEqual([]);
  });

  it('claims each bank topic in exactly one section', () => {
    const claims = new Map<QuestionTopic, string[]>();
    for (const id of SECTION_IDS) {
      for (const topic of SECTION_BANK_TOPICS[id]) {
        claims.set(topic, [...(claims.get(topic) ?? []), id]);
      }
    }
    const shared = [...claims.entries()]
      .filter(([, sections]) => sections.length > 1)
      .map(([topic, sections]) => `${topic} → ${sections.join(', ')}`);
    expect(shared).toEqual([]);
  });

  it('backs every claimed topic with notes that teach it', () => {
    // The half that makes the claim mean something. A section could otherwise
    // list `mechanics` in the map, render nothing about vehicles, and satisfy
    // the coverage rule while the material stayed exactly as unreachable as it
    // was before any of this existed.
    for (const id of SECTION_IDS) {
      if (SECTION_BANK_TOPICS[id].length === 0) continue;
      expect([id, studyNotesFor(id).length > 0]).toEqual([id, true]);
    }
  });

  it('claims no topic the bank does not have', () => {
    // The mirror of the first test, and the one that catches a typo: a section
    // pointing at a misspelled topic would claim coverage of a topic that does
    // not exist while the real one went unclaimed.
    for (const id of SECTION_IDS) {
      for (const topic of SECTION_BANK_TOPICS[id]) {
        expect([`${id}/${topic}`, bankTopics.includes(topic)]).toEqual([
          `${id}/${topic}`,
          true,
        ]);
      }
    }
  });

  it('gives every section a title key, a topic list and groups', () => {
    // All three are total `Record`s, so this cannot fail at runtime without
    // failing to compile first — it is here to fail loudly if any is ever
    // widened to a partial, which is the change that makes a section render
    // with a raw i18n key as its header or with no groups at all.
    for (const id of SECTION_IDS) {
      expect(SECTION_TITLE_KEYS[id]).toMatch(/^learn\./);
      expect(Array.isArray(SECTION_BANK_TOPICS[id])).toBe(true);
      expect(SECTION_GROUPS[id].length).toBeGreaterThan(0);
    }
  });

  it('lists every section exactly once, in study order', () => {
    // `SECTION_IDS` drives the home screen directly, so a section missing from
    // it is a section nobody can reach except by deep link, and one listed
    // twice renders two identical tiles.
    expect(new Set(SECTION_IDS).size).toBe(SECTION_IDS.length);
    expect(SECTION_IDS[0]).toBe('signs');
    expect(Object.keys(SECTION_TITLE_KEYS).sort()).toEqual([...SECTION_IDS].sort());
  });

  it('accepts only known section ids', () => {
    expect(isLearnSectionId('mechanics')).toBe(true);
    expect(isLearnSectionId('firstaid')).toBe(true);
    // A deep link to a section that does not exist must not be treated as one:
    // the screen falls back to `signs`, and a guard that returned true here
    // would send an unknown id into a `Record` lookup and render an empty list
    // under an undefined title.
    expect(isLearnSectionId('nonsense')).toBe(false);
    expect(isLearnSectionId('')).toBe(false);
  });

  it('leaves the reference-only sections claiming nothing', () => {
    // `dashboard` carries no bank topic because no question declares one, and
    // `violations` teaches penalty questions the bank files under `rules` and
    // `mechanics` — claiming those here would break the "exactly one section"
    // rule above. Pinned so neither gets quietly wired up without the section
    // being looked at.
    expect(SECTION_BANK_TOPICS.dashboard).toEqual([]);
    expect(SECTION_BANK_TOPICS.violations).toEqual([]);

    const declared: QuestionTopic[] = [
      'signs',
      'rules',
      'priority',
      'mechanics',
      'firstaid',
    ];
    expect(new Set(Object.values(SECTION_BANK_TOPICS).flat())).toEqual(
      new Set(declared),
    );
  });
});
