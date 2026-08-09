/**
 * Integrity checks on the content that actually ships.
 *
 * `validateBundle` already runs on dev boot, but only as a `console.warn` — a
 * line nobody is obliged to read, in a build nobody ships. These tests run the
 * same checks against the merged bundle as a hard failure, so a malformed
 * question is caught when it is added rather than by a learner mid-attempt.
 *
 * The other half of this file guards the provenance promise: that nothing can
 * reach a graded attempt without being marked verified, and that the
 * unofficial-badge rule stays enforceable.
 */

import fs from 'node:fs';
import path from 'node:path';

import {
  dashboardLights,
  examPool,
  questions,
  signs,
  studyNotes,
} from './registry';
import {
  MAX_CHOICES_PER_QUESTION,
  MIN_CHOICES_PER_QUESTION,
  validateBundle,
  type Localized,
  type Sourced,
} from './schema';

const LANGUAGES = ['ar', 'ckb', 'en'] as const;

/** Everything that ships, as one bundle — the same shape `registry` merges. */
const shipped = {
  signs,
  notes: studyNotes,
  dashboard: dashboardLights,
  questions,
};

const everySourcedRecord: [string, Sourced][] = [
  ...signs.map((r) => [`sign ${r.id}`, r] as [string, Sourced]),
  ...studyNotes.map((r) => [`note ${r.id}`, r] as [string, Sourced]),
  ...dashboardLights.map((r) => [`dashboard ${r.id}`, r] as [string, Sourced]),
  ...questions.map((r) => [`question ${r.id}`, r] as [string, Sourced]),
];

describe('the shipped content bundle', () => {
  it('passes every structural check', () => {
    // Reported as a list so a failure names all the offending records at once
    // rather than one per run.
    expect(validateBundle(shipped)).toEqual([]);
  });

  it('is not empty', () => {
    // Guards against an export or barrel-file mistake quietly emptying a
    // section — every other assertion here would still pass on an empty array.
    expect(signs.length).toBeGreaterThan(0);
    expect(studyNotes.length).toBeGreaterThan(0);
    expect(dashboardLights.length).toBeGreaterThan(0);
    expect(questions.length).toBeGreaterThan(0);
  });
});

describe('study notes', () => {
  it('translates every point in all three languages', () => {
    // `points` is an array of `Localized`, so the flat scan in the translations
    // block below — which only looks at a record's own `{en, ar, ckb}` fields —
    // walks straight past it. A missing point translation would fall back to
    // English silently through `pick`, which on a bulleted list of figures is
    // exactly the kind of thing nobody reports.
    for (const note of studyNotes) {
      note.points?.forEach((point, index) => {
        for (const lang of LANGUAGES) {
          expect([`${note.id}.points[${index}].${lang}`, point[lang]?.trim()]).toEqual([
            `${note.id}.points[${index}].${lang}`,
            expect.stringMatching(/.+/),
          ]);
        }
      });
    }
  });

  it('cites the ministry material a note was condensed from', () => {
    // A note is a condensation rather than a transcription, so its Arabic is
    // written rather than verbatim — which makes the locator the only way back
    // to the page it came from. Notes drawn from general practice carry none by
    // design, and their `document` string says so; the check is that a note
    // claiming a ministry document names where in it.
    for (const note of studyNotes) {
      if (!note.source.document.startsWith('دليل')) continue;
      expect([note.id, note.source.locator?.trim()]).toEqual([
        note.id,
        expect.stringMatching(/.+/),
      ]);
    }
  });
});

describe('provenance', () => {
  it('gives every record a source document', () => {
    for (const [label, record] of everySourcedRecord) {
      expect([label, record.source?.authority]).toEqual([label, expect.any(String)]);
      expect([label, record.source?.document]).toEqual([label, expect.any(String)]);
      expect([label, record.source.document.length > 0]).toEqual([label, true]);
    }
  });

  it('never lets an unverified question into the exam pool', () => {
    // The guarantee behind `examPool`: placeholder material cannot be graded.
    for (const question of examPool()) {
      expect([question.id, question.verified]).toEqual([question.id, true]);
    }
  });

  it('never lets a reference-sourced question into the exam pool', () => {
    // `reference` marks accurate but non-governmental material. It may be
    // studied; it must never be examined on.
    for (const question of examPool()) {
      expect([question.id, question.source.authority]).not.toEqual([
        question.id,
        'reference',
      ]);
    }
  });
});

describe('translations', () => {
  /** Every localised field on a record, flattened for iteration. */
  function localizedFields(record: unknown): [string, Localized][] {
    const out: [string, Localized][] = [];
    for (const [key, value] of Object.entries(record as Record<string, unknown>)) {
      if (
        value &&
        typeof value === 'object' &&
        'en' in value &&
        'ar' in value &&
        'ckb' in value
      ) {
        out.push([key, value as Localized]);
      }
    }
    return out;
  }

  it('has all three languages filled in on every record', () => {
    // A missing translation falls back to English silently at runtime via
    // `pick`, so an Arabic learner would just see English with no other signal.
    for (const [label, record] of everySourcedRecord) {
      for (const [field, value] of localizedFields(record)) {
        for (const lang of LANGUAGES) {
          expect([`${label}.${field}.${lang}`, value[lang]?.trim()]).toEqual([
            `${label}.${field}.${lang}`,
            expect.stringMatching(/.+/),
          ]);
        }
      }
    }
  });

  it('translates every choice of every question', () => {
    for (const question of questions) {
      for (const choice of question.choices) {
        for (const lang of LANGUAGES) {
          expect([
            `${question.id}.${choice.id}.${lang}`,
            choice.text[lang]?.trim(),
          ]).toEqual([
            `${question.id}.${choice.id}.${lang}`,
            expect.stringMatching(/.+/),
          ]);
        }
      }
    }
  });
});

describe('questions', () => {
  it('gives every question an answer that exists among its choices', () => {
    // Duplicated from `validateBundle` on purpose: this is the failure that
    // marks a learner wrong no matter what they pick, so it is worth naming
    // explicitly rather than only as one entry in a problems array.
    for (const question of questions) {
      const matches = question.choices.filter(
        (c) => c.id === question.correctChoiceId,
      );
      expect([question.id, matches.length]).toEqual([question.id, 1]);
    }
  });

  it('keeps every question within the allowed choice count', () => {
    for (const question of questions) {
      expect([question.id, question.choices.length]).toEqual([
        question.id,
        expect.any(Number),
      ]);
      expect(question.choices.length).toBeGreaterThanOrEqual(
        MIN_CHOICES_PER_QUESTION,
      );
      expect(question.choices.length).toBeLessThanOrEqual(MAX_CHOICES_PER_QUESTION);
    }
  });

  it('never offers two choices that read identically', () => {
    // Distinct ids are not enough: two options with the same wording make the
    // question unanswerable in that language.
    for (const question of questions) {
      for (const lang of LANGUAGES) {
        const texts = question.choices.map((c) => c.text[lang].trim());
        expect([`${question.id}.${lang}`, new Set(texts).size]).toEqual([
          `${question.id}.${lang}`,
          texts.length,
        ]);
      }
    }
  });

  it('uses globally unique ids', () => {
    const ids = questions.map((q) => q.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});

/**
 * That the bank holds no duplicate question, and that its pictures belong to
 * the questions they are attached to.
 *
 * Both are invisible to every other check in this file and to a reviewer
 * reading a diff. The bank is ~540 records across two independently numbered
 * transcription series plus one generated question per sign, so a stem can be
 * repeated legitimately — sixteen right-of-way questions all ask "who has
 * right of way in this picture?" — and the thing that tells them apart is the
 * *picture*. Identity therefore has to be stem + choices + image, and nothing
 * short of that is a duplicate test at all.
 *
 * Measured when these were written: 0 exact duplicates, 0 contradictions, and
 * no image used by two questions.
 */
describe('duplicate questions and their pictures', () => {
  /**
   * Arabic normalised for comparison.
   *
   * Arabic is the transcribed language, so it is the one where a duplicate
   * would be a real duplicate rather than a translation coincidence. Harakat,
   * alif and ta-marbuta variants are folded because the same sentence was
   * typed on different days: `هذه الصورة` and `هذة الصوره` are one stem, and a
   * comparison that treats them as two finds nothing.
   */
  const norm = (s: string) =>
    s
      .replace(/[ً-ْـ]/g, '')
      .replace(/[أإآ]/g, 'ا')
      .replace(/ة/g, 'ه')
      .replace(/ى/g, 'ي')
      .replace(/[^\p{L}\p{N}\s]/gu, '')
      .replace(/\s+/g, ' ')
      .trim();

  /** Stable key for a `require`d image, whatever the bundler resolves it to. */
  const imageKey = (image: unknown): string =>
    image === undefined ? 'none' : JSON.stringify(image);

  /** Stem + choices + picture. Two questions sharing all three are the same. */
  const identity = (q: (typeof questions)[number]) =>
    [
      norm(q.prompt.ar),
      q.choices
        .map((c) => norm(c.text.ar))
        .sort()
        .join('|'),
      imageKey(q.image),
    ].join('||');

  const grouped = new Map<string, typeof questions>();
  for (const q of questions) {
    const key = identity(q);
    grouped.set(key, [...(grouped.get(key) ?? []), q]);
  }
  const collisions = [...grouped.values()].filter((group) => group.length > 1);

  it('asks no question twice', () => {
    // A learner meeting the same card twice in one paper reads it as the app
    // having lost its place, and in `open` — which draws the entire bank — a
    // duplicate is guaranteed to appear rather than merely possible.
    expect(collisions.map((group) => group.map((q) => q.id).join(' = '))).toEqual([]);
  });

  it('never gives one question two different answers', () => {
    // The sharper half. Picture question 150 is deliberately not transcribed
    // because it repeats 145's stem and options and marks the *opposite*
    // answer — one of the two is wrong in the publication, and shipping both
    // would put a contradiction into graded attempts. This is what stops the
    // next one arriving unnoticed: the identity above already catches the pair,
    // but a contradiction is worth failing under its own name, because the fix
    // is different — a duplicate gets deleted, a contradiction gets read.
    const contradictions = collisions
      .filter(
        (group) =>
          new Set(
            group.map((q) =>
              norm(q.choices.find((c) => c.id === q.correctChoiceId)!.text.ar),
            ),
          ).size > 1,
      )
      .map((group) => group.map((q) => q.id).join(' vs '));
    expect(contradictions).toEqual([]);
  });

  it('gives every picture to exactly one question', () => {
    /*
      The picture *is* the question in a third of the bank, so an image reused
      across two of them means at least one is captioned with artwork that does
      not match — the failure that cannot be seen in a diff and can only be
      found by opening every card.

      This is deliberately narrower than "no image is used twice anywhere": a
      study note is often written about the very picture a question asks, and
      that pairing is the point of `data/study/priority-pictures.ts`. What must
      not happen is one picture standing in for two different questions.
    */
    const byImage = new Map<string, string[]>();
    for (const q of questions) {
      if (q.image === undefined) continue;
      const key = imageKey(q.image);
      byImage.set(key, [...(byImage.get(key) ?? []), q.id]);
    }
    const shared = [...byImage.values()]
      .filter((ids) => ids.length > 1)
      .map((ids) => ids.join(', '));
    expect(shared).toEqual([]);
  });

  it('gives a question that names a picture a picture to show', () => {
    /*
      "What does this sign mean?" with no artwork is unanswerable, and it grades
      as wrong for everyone who meets it.

      `q-stop-line-meaning` is the one deliberate exception and is listed rather
      than pattern-matched around: its stem describes the marking in full — a
      continuous transverse line near the traffic-light poles — so it reads
      correctly with nothing attached. Naming it here means a *second* such
      question fails this test rather than widening a regex until it passes.
    */
    const SELF_DESCRIBING = new Set(['q-stop-line-meaning']);
    const namesAPicture = /هذه الصورة|هذه العلامة|هذا الشكل|المؤشر/;
    const missing = questions
      .filter(
        (q) =>
          q.image === undefined &&
          !SELF_DESCRIBING.has(q.id) &&
          namesAPicture.test(q.prompt.ar),
      )
      .map((q) => `${q.id}: ${q.prompt.ar}`);
    expect(missing).toEqual([]);
  });
});

/**
 * The dashboard tell-tale artwork.
 *
 * This replaced an identical set of rules over the drawn SVG glyphs, deleted
 * once the artwork was licensed (see `LICENSE-gofar.md`). The rules did not
 * change with the medium, because the failure they catch did not: this is a
 * *content* question — whether every lamp the bundle ships has a picture — and
 * it has to fail when someone adds a lamp, not when someone renders one. There
 * are no renderer tests here, so without this a new dashboard record is a
 * silent empty tile on a card that otherwise looks finished.
 */
describe('dashboard artwork', () => {
  it('ships a picture for every tell-tale in the bundle', () => {
    const missing = dashboardLights
      .filter((d) => d.image === undefined)
      .map((d) => d.id);
    expect(missing).toEqual([]);
  });

  it('has no artwork for a lamp that no longer exists', () => {
    // The other direction, and the one that rots quietly: a record renamed or
    // removed leaves a file nothing can reach, and nothing on screen says so.
    // Read off the directory rather than a manifest, because the directory is
    // what ships — a manifest could agree with the records and with neither.
    const dir = path.join(__dirname, '../../assets/dashboard');
    const onDisk = fs
      .readdirSync(dir)
      .filter((f) => f.endsWith('.png'))
      .map((f) => f.replace(/\.png$/, ''));
    const live = new Set(dashboardLights.map((d) => d.id));
    expect(onDisk.filter((id) => !live.has(id))).toEqual([]);
  });

  it('gives no two lamps the same picture', () => {
    /*
      Two different tell-tales pointing at one file, which the two checks above
      both pass happily: every lamp has artwork and nothing is orphaned.

      This is the one rule that got *stricter* when the medium changed, and the
      change is worth understanding before loosening it. Against the drawn
      glyphs, identity had to be shape-plus-label, because sharing a base symbol
      is the vocabulary rather than a defect — a real cluster draws ABS and
      brake-hold as the same braked-disc ring lettered differently, and fifteen
      of these lamps legitimately pair off that way. A file is not like that: two
      records naming one file is always a copy-paste slip, never a design.

      What it still cannot check is fidelity. A picture can be unique, present,
      and the wrong lamp — that is what the contact sheet is for, and it is
      worth rasterising all 94 and looking at them after any bulk edit here.
    */
    const byFile = new Map<string, string[]>();
    for (const d of dashboardLights) {
      const key = JSON.stringify(d.image);
      byFile.set(key, [...(byFile.get(key) ?? []), d.id]);
    }
    expect([...byFile.values()].filter((ids) => ids.length > 1)).toEqual([]);
  });
});
