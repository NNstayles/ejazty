/**
 * Tests for the exam engine.
 *
 * The engine is pure, so it is testable without a renderer, a device or a
 * network. What is being protected here is the part of the app a learner
 * cannot check for themselves: whether a score is graded correctly and whether
 * "you passed" means they would pass the real test.
 *
 * Assertions are written against the shipped content bundle rather than
 * fixtures. A fixture would prove the arithmetic and miss the thing most
 * likely to actually break — someone editing `data/official/` and shifting the
 * pool out from under `buildExam`.
 */

import { bankTopics, examPool } from '@/content/registry';
import {
  buildExam,
  canRunExam,
  compareAttempt,
  EXAM_MODES,
  EXAM_TOPICS,
  gradeExam,
  DRILL_SIZE,
  MAX_DERIVED_SHARE,
  PASS_THRESHOLD,
  questionsToGrade,
  type ExamQuestion,
} from './engine';

/** Minimal question shaped like the real thing, for grading arithmetic. */
function question(id: string, correctChoiceId: string): ExamQuestion {
  const text = { ar: id, en: id, ckb: id };
  return {
    id,
    topic: 'rules',
    verified: true,
    source: { authority: 'federal-moi', document: 'test' },
    prompt: text,
    choices: [
      { id: 'a', text },
      { id: 'b', text },
      { id: 'c', text },
    ],
    correctChoiceId,
    explanation: text,
  };
}

describe('gradeExam', () => {
  const questions = [question('q1', 'a'), question('q2', 'b'), question('q3', 'c')];

  it('separates correct, wrong and skipped answers', () => {
    const result = gradeExam('quick', questions, { q1: 'a', q2: 'c' }, 42);

    expect(result.correct).toBe(1);
    expect(result.wrong).toBe(1);
    // q3 was never answered, so it is skipped rather than counted wrong.
    expect(result.skipped).toBe(1);
    expect(result.total).toBe(3);
    expect(result.durationSeconds).toBe(42);
  });

  it('counts an unanswered question as skipped, not wrong', () => {
    const result = gradeExam('quick', questions, {}, 0);

    expect(result.skipped).toBe(3);
    expect(result.wrong).toBe(0);
    expect(result.correct).toBe(0);
    expect(result.percent).toBe(0);
  });

  it('keeps correct + wrong + skipped equal to the total', () => {
    const result = gradeExam('quick', questions, { q1: 'a', q2: 'a' }, 0);

    expect(result.correct + result.wrong + result.skipped).toBe(result.total);
  });

  it('returns 0% rather than NaN for a zero-length attempt', () => {
    const result = gradeExam('quick', [], {}, 0);

    expect(result.percent).toBe(0);
    expect(result.passed).toBe(false);
  });

  it('rounds the percentage to a whole number', () => {
    // 1 of 3 is 33.33…%, which must not reach the UI unrounded.
    const result = gradeExam('quick', questions, { q1: 'a' }, 0);

    expect(result.percent).toBe(33);
  });
});

describe('questionsToGrade', () => {
  const questions = [question('q1', 'a'), question('q2', 'b'), question('q3', 'c')];

  /*
    What this rule is holding open is that open practice has an ending at all.

    It draws the entire eligible bank — several hundred questions — untimed,
    with the answer revealed as each one is answered. `Next` only reaches
    `Submit` on the last card, so before this the only way out of a practice
    session was Quit, which throws the attempt away. Grading the whole draw
    instead would report 8% for a session in which the learner answered forty
    questions and got thirty-four of them right, which is worse than no result.

    Both halves are load-bearing in opposite directions, which is why they are
    asserted separately: a timed paper *must* keep marking what was skipped,
    because the real test does, and a version of this that filtered everywhere
    would silently turn every mock into a "questions I felt sure about" score.
  */
  it('marks every question of a fixed-length paper, skipped ones included', () => {
    for (const mode of ['quick', 'medium', 'full'] as const) {
      expect(questionsToGrade(mode, questions, { q1: 'a' })).toEqual(questions);
    }
  });

  it('marks only what was answered in open practice', () => {
    const marked = questionsToGrade('open', questions, { q1: 'a', q3: 'b' });
    expect(marked.map((q) => q.id)).toEqual(['q1', 'q3']);
  });

  it('leaves an open practice with no answers with nothing to grade', () => {
    // The provider refuses to finalise this rather than storing a zero-length
    // attempt: `total` would be 0, which grades as 0% and which the `total > 0`
    // CHECK on `exam_attempts` rejects outright, so the row would be dropped by
    // `isPushable` and the learner's history would silently disagree with what
    // they saw. The navigator disables the control that gets here.
    expect(questionsToGrade('open', questions, {})).toEqual([]);
  });

  it('grades an open practice on the answered subset', () => {
    // The end-to-end consequence, asserted through `gradeExam` rather than
    // over the filter alone: 2 of 2 is 100%, not 2 of 3.
    const answers = { q1: 'a', q2: 'b' };
    const marked = questionsToGrade('open', questions, answers);
    const result = gradeExam('open', marked, answers, 60);
    expect([result.total, result.correct, result.skipped, result.percent]).toEqual([
      2, 2, 0, 100,
    ]);
  });
});

describe('the pass mark', () => {
  it('passes at exactly the threshold, not just above it', () => {
    // 8 of 10 is precisely 80%, the official mark. An off-by-one here fails a
    // learner who actually passed.
    const questions = Array.from({ length: 10 }, (_, i) => question(`q${i}`, 'a'));
    const answers = Object.fromEntries(
      questions.map((q, i) => [q.id, i < 8 ? 'a' : 'b']),
    );

    const result = gradeExam('full', questions, answers, 0);

    expect(result.percent).toBe(80);
    expect(result.passed).toBe(true);
  });

  it('fails just below the threshold', () => {
    const questions = Array.from({ length: 10 }, (_, i) => question(`q${i}`, 'a'));
    // 5/10 = 50%, one notch under the 60% mark.
    const answers = Object.fromEntries(
      questions.map((q, i) => [q.id, i < 5 ? 'a' : 'b']),
    );

    expect(gradeExam('full', questions, answers, 0).passed).toBe(false);
  });

  it('passes exactly at the threshold', () => {
    const questions = Array.from({ length: 10 }, (_, i) => question(`q${i}`, 'a'));
    const answers = Object.fromEntries(
      questions.map((q, i) => [q.id, i < 6 ? 'a' : 'b']),
    );

    // The rule is `>=`, so the boundary itself passes. Asserted because an
    // off-by-one here fails the learner on the exact mark they were told to hit.
    const graded = gradeExam('full', questions, answers, 0);
    expect(graded.percent).toBe(60);
    expect(graded.passed).toBe(true);
  });

  /**
   * The bank asks the pass mark as a question, and this app overrides its answer
   * to match `PASS_THRESHOLD` (see the note on `q-pass-mark`). Grading at one
   * number while teaching another is the failure this pins shut — whichever
   * number the two are set to.
   */
  it('agrees with the answer the question bank gives for the pass mark', () => {
    const passMarkQuestion = examPool().find((q) => q.id === 'q-pass-mark');
    expect(passMarkQuestion).toBeDefined();

    const correct = passMarkQuestion!.choices.find(
      (c) => c.id === passMarkQuestion!.correctChoiceId,
    );
    expect(correct).toBeDefined();

    // The English choice text is the machine-readable one ("80%").
    const stated = Number(correct!.text.en.replace(/[^0-9]/g, ''));
    expect(stated).toBe(Math.round(PASS_THRESHOLD * 100));
  });
});

describe('buildExam', () => {
  const modes = Object.keys(EXAM_MODES) as (keyof typeof EXAM_MODES)[];

  /**
   * Fixed-length formats that draw from the *bank*.
   *
   * `drill` is fixed-length too but is excluded from all of these, because it
   * is selected rather than sampled: its questions come from the learner's own
   * `question_stats`, so against an empty history it correctly draws nothing.
   * Folding it in here would assert that a learner with no mistakes gets twenty
   * questions to revise, which is the opposite of the feature. It has its own
   * block below.
   */
  const sampledFixedModes = modes.filter(
    (m) => EXAM_MODES[m].questionCount !== null && m !== 'drill',
  );

  it.each(sampledFixedModes)(
    'draws exactly the configured number of questions for %s',
    (mode) => {
      expect(buildExam(mode)).toHaveLength(EXAM_MODES[mode].questionCount!);
    },
  );

  it('draws the entire eligible pool for the open format', () => {
    // Open is defined as unlimited, so the guarantee is that nothing is left
    // behind — not a particular length. A regression that reapplied the derived
    // share here would silently halve the practice set.
    expect(buildExam('open')).toHaveLength(examPool(EXAM_TOPICS).length);
  });

  it.each(modes)('never repeats a question within one %s attempt', (mode) => {
    // `drill` needs ids to draw at all; a duplicate in its input must not
    // become a duplicate in the paper, which is the case worth checking here.
    const ids = buildExam(mode, ['q-pass-mark', 'q-pass-mark']).map((q) => q.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(sampledFixedModes)('caps auto-derived questions at the ceiling for %s', (mode) => {
    const drawn = buildExam(mode);
    const derived = drawn.filter((q) => q.derived).length;
    const transcribedAvailable = examPool(EXAM_TOPICS).filter((q) => !q.derived).length;
    const count = EXAM_MODES[mode].questionCount!;

    // The cap is a ceiling, not a quota: derived questions are allowed past it
    // only to cover a shortfall the transcribed bank cannot fill.
    const shortfall = count - transcribedAvailable;
    const ceiling = Math.max(Math.round(count * MAX_DERIVED_SHARE), shortfall);

    expect(derived).toBeLessThanOrEqual(ceiling);
  });

  it('fills a full paper rather than handing back a short exam', () => {
    expect(buildExam('full')).toHaveLength(45);
  });

  /**
   * The mistake drill, which is selected rather than sampled.
   *
   * Every rule here fails *silently*: a drill that ignored the order it was
   * given, or quietly drew from the bank when the learner had no mistakes, is
   * indistinguishable from a working one — it is a plausible list of questions
   * either way. The learner would simply never notice they were revising the
   * wrong things.
   */
  describe('the mistake drill', () => {
    const weakest = ['q-pass-mark', 'q-priority-train', 'q-priority-emergency-vehicles'];

    it('draws only the questions it was given', () => {
      const drawn = buildExam('drill', weakest);

      expect(drawn.map((q) => q.id).sort()).toEqual([...weakest].sort());
    });

    it('draws nothing when the learner has no mistakes on record', () => {
      // The card is disabled behind this, but the engine must not invent a
      // revision set out of the bank when there is nothing to revise.
      expect(buildExam('drill', [])).toEqual([]);
    });

    it('keeps the weakest questions when there are more than it can hold', () => {
      /*
        `weakIds` arrives ordered weakest-first, and that order is the feature.
        The *selection* has to respect it and only the survivors get shuffled —
        taking a random slice would hand back an arbitrary twenty of the
        learner's mistakes rather than their twenty worst, which looks
        identical and is not the same product.
      */
      const pool = examPool(EXAM_TOPICS).map((q) => q.id);
      const drawn = buildExam('drill', pool);

      expect(drawn).toHaveLength(DRILL_SIZE);
      expect(new Set(drawn.map((q) => q.id))).toEqual(
        new Set(pool.slice(0, DRILL_SIZE)),
      );
    });

    it('ignores an id that is no longer in the bank', () => {
      // A stat can name a question edited out of the bank since. Resolving
      // against the live pool is what stops a stale id silently shortening the
      // drill — or, worse, crashing the runner on an undefined question.
      const drawn = buildExam('drill', ['q-pass-mark', 'q-deleted-long-ago']);

      expect(drawn.map((q) => q.id)).toEqual(['q-pass-mark']);
    });

    it('is unavailable until something has been got wrong', () => {
      expect(canRunExam('drill', 0)).toBe(false);
      expect(canRunExam('drill', 1)).toBe(true);
    });
  });

  it('runs every mode against the shipped bank', () => {
    // `canRunExam` gates the cards on the exam home. If the bank ever shrinks
    // below a mode's length this fails here rather than showing the learner a
    // permanently disabled button.
    // `drill` is bounded by the learner's history rather than by the bank, so
    // it is passed a non-zero count: gating it on the bank would be meaningless
    // and gating the others on mistakes would be wrong. Its own zero-case is
    // asserted directly below.
    for (const mode of modes) expect(canRunExam(mode, 1)).toBe(true);
  });

  it('preserves each question’s choices when shuffling them', () => {
    for (const drawn of buildExam('quick')) {
      const original = examPool(EXAM_TOPICS).find((q) => q.id === drawn.id);
      expect(original).toBeDefined();

      expect([...drawn.choices].map((c) => c.id).sort()).toEqual(
        [...original!.choices].map((c) => c.id).sort(),
      );
      // Shuffling must not orphan the answer key.
      expect(drawn.choices.some((c) => c.id === drawn.correctChoiceId)).toBe(true);
    }
  });

  it('draws only from the exam topics', () => {
    for (const q of buildExam('full')) {
      expect(EXAM_TOPICS).toContain(q.topic);
    }
  });

  it('leaves no transcribed topic unexaminable', () => {
    /*
      The other direction of the rule above, and the one that failed silently.

      `EXAM_TOPICS` used to be `signs`/`rules`/`priority`, on the reasoning that
      a mock should mirror the official test. The cost was invisible from every
      screen: 82 `mechanics` and 3 `firstaid` questions were transcribed,
      validated, bundled and taught in the Learn tab, and could never appear in
      a graded attempt — 85 questions a learner could read about and never be
      asked. Nothing reported that, because a topic that is never drawn looks
      exactly like a topic that happens not to have come up.

      Asserted against the *shipped* bank rather than a literal list, so a topic
      added to `QuestionTopic` later has to be admitted here deliberately rather
      than joining `mechanics` in the gap. `bankTopics` is every topic the bundle
      actually carries.
    */
    expect([...EXAM_TOPICS].sort()).toEqual([...bankTopics].sort());
  });

  it('never draws an unverified question', () => {
    // The guarantee that placeholder content cannot reach a graded attempt.
    for (const q of buildExam('full')) {
      expect(q.verified).toBe(true);
    }
  });

  it('varies the draw between attempts', () => {
    // Not a statistical test — just enough to catch a shuffle that stopped
    // shuffling and started returning the pool in file order.
    const a = buildExam('full').map((q) => q.id);
    const b = buildExam('full').map((q) => q.id);

    expect(a).not.toEqual(b);
  });
});

describe('compareAttempt', () => {
  it('reports the first attempt without inventing a comparison', () => {
    const result = compareAttempt({ mode: 'full', percent: 60 }, []);

    expect(result.trend).toBe('first');
    expect(result.delta).toBeNull();
    expect(result.previousPercent).toBeNull();
    expect(result.attemptNumber).toBe(1);
    // Nothing has been beaten yet, so this is not a personal best.
    expect(result.isPersonalBest).toBe(false);
  });

  it('compares only against attempts in the same mode', () => {
    // A 10-question warm-up and a 30-question mock are not comparable. If the
    // quick attempt leaked in, this would read as a 40-point improvement.
    const result = compareAttempt({ mode: 'full', percent: 70 }, [
      { mode: 'quick', percent: 30 },
      { mode: 'full', percent: 60 },
    ]);

    expect(result.previousPercent).toBe(60);
    expect(result.delta).toBe(10);
    expect(result.trend).toBe('up');
  });

  it('has no same-mode comparison when every prior attempt was another mode', () => {
    const result = compareAttempt({ mode: 'full', percent: 70 }, [
      { mode: 'quick', percent: 90 },
    ]);

    expect(result.previousPercent).toBeNull();
    expect(result.delta).toBeNull();
    expect(result.trend).toBe('first');
  });

  it('tracks the personal best across every mode', () => {
    // Best-ever is a cross-mode figure, unlike the headline comparison.
    const result = compareAttempt({ mode: 'full', percent: 95 }, [
      { mode: 'quick', percent: 90 },
      { mode: 'full', percent: 60 },
    ]);

    expect(result.previousBest).toBe(90);
    expect(result.isPersonalBest).toBe(true);
  });

  it('reports a decline as a decline', () => {
    const result = compareAttempt({ mode: 'full', percent: 50 }, [
      { mode: 'full', percent: 80 },
    ]);

    expect(result.trend).toBe('down');
    expect(result.delta).toBe(-30);
    expect(result.isPersonalBest).toBe(false);
  });

  it('reports an identical score as unchanged', () => {
    const result = compareAttempt({ mode: 'full', percent: 80 }, [
      { mode: 'full', percent: 80 },
    ]);

    expect(result.trend).toBe('same');
    expect(result.delta).toBe(0);
  });

  it('averages only recent same-mode attempts', () => {
    const result = compareAttempt({ mode: 'full', percent: 100 }, [
      { mode: 'full', percent: 90 },
      { mode: 'full', percent: 60 },
      { mode: 'full', percent: 30 },
      // Older than the window, and a different mode besides.
      { mode: 'quick', percent: 0 },
    ]);

    expect(result.recentAverage).toBe(60);
  });

  it('counts attempt number across every mode', () => {
    const result = compareAttempt({ mode: 'full', percent: 50 }, [
      { mode: 'quick', percent: 10 },
      { mode: 'medium', percent: 20 },
    ]);

    expect(result.attemptNumber).toBe(3);
  });
});
