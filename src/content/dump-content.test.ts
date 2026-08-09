import { writeFileSync } from 'fs';

import { questions, studyNotes, signs, dashboardLights } from './registry';

/**
 * Writes the whole content bundle to `audit-dump.json` for
 * `scripts/coverage-sweep.py`, which checks that every exam question has Learn
 * material teaching it.
 *
 * **Opt-in, and it has to be.** This writes a 400 kB file into the repo root,
 * which is not something `npm test` should do on every run or in CI. Run it
 * deliberately:
 *
 *     DUMP_CONTENT=1 npx jest src/content/dump-content.test.ts
 *     python scripts/coverage-sweep.py 0.30
 *
 * It lives as a test rather than a script because the content bundle `require`s
 * its artwork, so it can only be loaded through `jest-expo`'s asset transform —
 * plain Node cannot resolve a `.jpg` import. `audit-dump.json` is gitignored.
 *
 * English is dumped because that is what the sweep matches on: the Arabic sides
 * use deliberately different vocabulary (the bank is transcribed verbatim and
 * prints colloquial Iraqi forms, the notes are written in MSA), so an Arabic
 * sweep reports a translation difference as a coverage gap. See CLAUDE.md.
 */
const enabled = process.env.DUMP_CONTENT === '1';

(enabled ? it : it.skip)('dumps the content bundle for the coverage sweep', () => {
  const payload = {
    questions: questions.map((q) => ({
      id: q.id,
      topic: q.topic,
      derived: Boolean(q.derived),
      prompt: q.prompt.en,
      promptAr: q.prompt.ar,
      answer: q.choices.find((c) => c.id === q.correctChoiceId)?.text.en ?? '',
      choices: q.choices.map((c) => c.text.en),
      explanation: q.explanation.en,
      hasImage: Boolean(q.image),
    })),
    notes: studyNotes.map((n) => ({
      id: n.id,
      topic: n.topic,
      group: n.group,
      title: n.title.en,
      body: n.body.en,
      points: (n.points ?? []).map((p) => p.en),
    })),
    signs: signs.map((s) => ({
      id: s.id,
      category: s.category,
      name: s.title.en,
      meaning: s.meaning.en,
    })),
    dashboard: dashboardLights.map((d) => ({
      id: d.id,
      name: d.title.en,
      meaning: d.meaning.en,
    })),
  };

  writeFileSync('audit-dump.json', JSON.stringify(payload, null, 1), 'utf-8');
});
