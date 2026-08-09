import { examPool } from '@/content/registry';
import type { Choice, Question, QuestionTopic } from '@/content/schema';

export type ExamMode = 'quick' | 'medium' | 'full' | 'open' | 'drill';

export type ExamModeConfig = {
  mode: ExamMode;
  /**
   * How many questions to draw, or null to draw the entire eligible pool —
   * the "open" format, which is unlimited by design.
   */
  questionCount: number | null;
  /** Minutes allowed, or null for an untimed run. */
  timeLimitMinutes: number | null;
  /**
   * True when the runner reveals whether the answer was right the moment it is
   * chosen, rather than holding everything back for the result screen.
   *
   * Only `open` does this. In a timed mock, per-question feedback would change
   * what is being measured — a learner who sees the first answer was wrong
   * approaches the rest differently, and the score stops being comparable with
   * the real exam. Open practice has no clock and no pass mark to protect, so
   * immediate feedback is the whole point of it.
   */
  immediateFeedback: boolean;
};

/**
 * The topics an exam draws from — every topic the question bank carries.
 *
 * **This is the whole transcribed bank, and that is a product decision taken on
 * 2026-08-08.** It used to be `['signs', 'rules', 'priority']`, on the reasoning
 * that the official Iraqi theoretical test covers those three and a mock should
 * mirror it. The cost of that was 85 transcribed questions — 82 `mechanics` and
 * 3 `firstaid` — which were validated, bundled, taught in the Learn tab, and
 * could never appear in a graded attempt. The owner asked for the exam to cover
 * everything in the source, so it does.
 *
 * The trade, stated rather than buried: a mock is no longer a pure simulation of
 * the real paper. Roughly a sixth of a 45-question mock is now vehicle upkeep and
 * first aid, which the real test does not ask about, so a percentage here reads
 * slightly low against the real thing rather than slightly high. That is the
 * safer direction of the two, and it is the direction the owner chose.
 *
 * **Dashboard tell-tales are deliberately still out**, and cost nothing to keep
 * out: `data/dashboard/` exports 94 catalogue records and *no questions at all*,
 * so they have never been in the pool. The 111 derived questions are one per
 * sign and come from `sign-questions.ts` alone. If dashboard lights are ever
 * given derived questions, they need a topic of their own rather than joining
 * one of these — this comment is the record of that intent.
 */
export const EXAM_TOPICS: QuestionTopic[] = [
  'signs',
  'rules',
  'priority',
  'mechanics',
  'firstaid',
];

/**
 * How many questions a mistake drill draws.
 *
 * Short on purpose. The drill is the questions the learner has already failed,
 * so it is the least comfortable session in the app, and a set of forty would
 * be abandoned halfway — which is worse than a set of twenty finished, because
 * an abandoned attempt records nothing and the same questions stay unfixed.
 */
export const DRILL_SIZE = 20;

/**
 * The five exam formats.
 *
 * `quick`, `medium` and `full` are timed papers of a fixed length. `open` is
 * untimed study practice over the whole eligible bank, with the answer revealed
 * as each question is answered.
 */
export const EXAM_MODES: Record<ExamMode, ExamModeConfig> = {
  quick: {
    mode: 'quick',
    questionCount: 15,
    timeLimitMinutes: 3,
    immediateFeedback: false,
  },
  medium: {
    mode: 'medium',
    questionCount: 25,
    timeLimitMinutes: 5,
    immediateFeedback: false,
  },
  full: {
    mode: 'full',
    questionCount: 45,
    timeLimitMinutes: 15,
    immediateFeedback: false,
  },
  open: {
    mode: 'open',
    questionCount: null,
    timeLimitMinutes: null,
    immediateFeedback: true,
  },
  /**
   * The mistake drill: the questions this learner personally keeps getting
   * wrong, weakest first, drawn from `question_stats` rather than from the bank
   * at large.
   *
   * Untimed with immediate feedback, because it is revision rather than
   * assessment — the point is to be told the answer on the question you just
   * missed, while you are looking at it. Its percentage is deliberately *not*
   * comparable with a mock's, and nothing joins them: `compareAttempt` is
   * same-mode only.
   */
  drill: {
    mode: 'drill',
    questionCount: DRILL_SIZE,
    timeLimitMinutes: null,
    immediateFeedback: true,
  },
};

/**
 * Minimum share of correct answers required to pass.
 *
 * **60% is an app policy set by the product owner, not the ministry's mark.**
 * The bank asks the pass mark as a question — "درجة النجاح في الامتحان
 * (الاختبار النظري) لمنح إجازة السوق هي؟" — and the publication marks 80%. On
 * 2026-08-05 the owner asked for both the grading threshold and that question's
 * answer to read 60%, and `q-pass-mark` carries a note recording that its answer
 * has been overridden away from the source.
 *
 * The consequence to keep in view: a learner who passes here at 62% would fail
 * the real theoretical test. If that trade is ever reconsidered, this constant
 * and `q-pass-mark` move back together.
 *
 * This value is pinned in three places that must change together: this constant,
 * the `q-pass-mark` answer in the question bank, and the
 * `exam_attempts_passed_matches_percent` CHECK constraint — originally added in
 * `20260803160000_harden_exam_attempts.sql` and relaxed to 60 in
 * `20260806090000_pass_threshold_60.sql`, which restates the rule server-side so
 * a forged row cannot claim a pass it did not earn. Changing it here alone makes
 * every graded attempt fail that constraint and silently stop syncing.
 */
export const PASS_THRESHOLD = 0.6;

/** A question with its choices already shuffled for this attempt. */
export type ExamQuestion = Omit<Question, 'choices'> & { choices: Choice[] };

/** Answers keyed by question id; a missing key means the question was skipped. */
export type AnswerMap = Record<string, string>;

function shuffle<T>(input: readonly T[]): T[] {
  const out = [...input];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * The share of each attempt made up of auto-derived sign-identification
 * questions (`Question.derived`).
 *
 * There is one derived question per sign — 111 of them. When only 26 bank
 * questions were transcribed, drawing uniformly from the merged pool made a
 * "full mock exam" roughly 24 rounds of "what does this sign mean?" and six real
 * questions, which is not what the official test looks like.
 *
 * The whole bank is transcribed now, so the transcribed side vastly outnumbers
 * the derived one and the shortfall arm below never fires; a 45-question mock is
 * 23 derived and 22 transcribed. The share is still doing the work it always
 * did, just from the other direction — without it, sign-identification cards
 * would be a small minority rather than the half the official test warrants.
 *
 * **This is a target split, not merely an upper bound.** Read the arithmetic in
 * `buildExam` before changing it: `Math.max(share, shortfall)` means a paper
 * gets *exactly* this proportion of derived questions whenever enough exist,
 * and more only when the transcribed bank is too small to fill its own half.
 * A 45-question full mock is therefore 23 derived and 22 transcribed, and it
 * stays there as the bank grows — it does not decay toward all-transcribed as
 * more questions are added.
 *
 * That is deliberate. Sign identification is a real part of the official test,
 * so a standing half-share of it is study value rather than filler, and the
 * split stops one generated family dominating without pretending to know the
 * official topic breakdown — which stays unknown until pages 4-50 are
 * transcribed.
 *
 * To make derived questions recede as the bank grows, the `Math.max` is the
 * line to change; nothing else here needs to move.
 */
export const MAX_DERIVED_SHARE = 0.5;

/**
 * Draws a fresh attempt. Questions are sampled without replacement, and each
 * question's choices are reshuffled so answer position is never memorisable.
 *
 * Exams cover traffic signs, traffic rules and road priority.
 */
export function buildExam(mode: ExamMode, weakIds: string[] = []): ExamQuestion[] {
  const config = EXAM_MODES[mode];
  const pool = examPool(EXAM_TOPICS);

  /*
    The drill is selected rather than sampled, so it shares none of the logic
    below. `weakIds` arrives already ordered weakest-first by `weakestFirst`,
    and that order is the whole feature — so the *selection* preserves it and
    only the questions that survive the cut are shuffled. Shuffling first would
    hand back an arbitrary twenty of the learner's mistakes instead of their
    twenty worst.

    Ids are resolved against the live pool rather than trusted: a stat can name
    a question that has since been edited out of the bank, and a stale id would
    otherwise silently shorten the drill.
  */
  if (mode === 'drill') {
    const byId = new Map(pool.map((q) => [q.id, q]));
    const seen = new Set<string>();
    const selected = weakIds
      .filter((id) => {
        // Deduplicated defensively. `weakestFirst` reads a record keyed by
        // question id and cannot repeat one today, but "no question appears
        // twice in one paper" is a guarantee the whole app rests on and it
        // should not depend on a caller's internals staying as they are.
        if (seen.has(id)) return false;
        seen.add(id);
        return true;
      })
      .map((id) => byId.get(id))
      .filter((q): q is (typeof pool)[number] => q !== undefined)
      .slice(0, config.questionCount ?? DRILL_SIZE);

    return shuffle(selected).map((q) => ({ ...q, choices: shuffle(q.choices) }));
  }

  // The open format is the whole eligible bank in a fresh order. The derived
  // share below is a way of shaping a *sample*; with nothing being sampled there
  // is nothing to balance, and applying it would silently cut the pool in half.
  if (config.questionCount === null) {
    return shuffle(pool).map((q) => ({ ...q, choices: shuffle(q.choices) }));
  }

  const transcribed = shuffle(pool.filter((q) => !q.derived));
  const derived = shuffle(pool.filter((q) => q.derived));

  // Two rules, in this order. The share is a target: `Math.max` holds derived
  // questions at exactly `MAX_DERIVED_SHARE` of the paper whenever that many
  // exist. The shortfall then overrides it upward — when the transcribed bank
  // cannot fill its own half, derived questions cover the gap rather than the
  // learner being handed a short exam.
  const shortfall = config.questionCount - transcribed.length;
  const takeDerived = Math.min(
    derived.length,
    Math.max(Math.round(config.questionCount * MAX_DERIVED_SHARE), shortfall),
  );
  const takeTranscribed = Math.min(
    transcribed.length,
    config.questionCount - takeDerived,
  );

  // Reshuffled after slicing so the two groups are interleaved rather than
  // arriving as a block of real questions followed by a block of sign cards.
  return shuffle([
    ...transcribed.slice(0, takeTranscribed),
    ...derived.slice(0, takeDerived),
  ]).map((q) => ({ ...q, choices: shuffle(q.choices) }));
}

/** How many questions are actually available for a mode right now. */
export function availableQuestionCount(): number {
  return examPool(EXAM_TOPICS).length;
}

export function canRunExam(mode: ExamMode, weakCount = 0): boolean {
  // The drill is bounded by the learner's own history, not by the bank, so it
  // is the one format whose availability changes as they practise. It stays
  // disabled until something has actually been got wrong — offering an empty
  // drill would be a card that grades 0 of 0 and rejects its own attempt.
  if (mode === 'drill') return weakCount > 0;

  const required = EXAM_MODES[mode].questionCount;
  // Open draws whatever exists, so it is runnable as soon as the bank is not
  // empty — there is no fixed length it could fall short of.
  return availableQuestionCount() >= (required ?? 1);
}

/**
 * Which of the drawn questions an attempt is actually marked on.
 *
 * For a paper of fixed length this is all of them, and it has to be: skipping a
 * question in a timed mock is a decision with a cost, and the real test counts
 * it against you. `ExamResult.skipped` exists to report exactly that.
 *
 * **`open` is different in kind, and this is the rule that makes it usable.**
 * It draws the *whole* eligible bank — several hundred questions — as untimed
 * practice with the answer revealed as each one is answered. A learner working
 * through it will stop when they have had enough, which is the intended way to
 * use it. Marking the untouched remainder wrong would report 8% for a session
 * that went well, so the session had no ending at all: the only way out was to
 * quit, which threw the whole thing away. Grading what was answered turns
 * "I did forty questions and got thirty-four" into a result worth keeping.
 *
 * The consequence to keep in view is that an `open` percentage is not
 * comparable with a mock's, because the learner chose which questions counted.
 * Nothing joins them: `compareAttempt` and the trend line both restrict
 * themselves to one mode, for this reason among others.
 */
export function questionsToGrade(
  mode: ExamMode,
  questions: ExamQuestion[],
  answers: AnswerMap,
): ExamQuestion[] {
  if (EXAM_MODES[mode].questionCount !== null) return questions;
  return questions.filter((q) => answers[q.id] !== undefined);
}

export type GradedAnswer = {
  question: ExamQuestion;
  selectedChoiceId: string | null;
  correct: boolean;
};

export type ExamResult = {
  mode: ExamMode;
  total: number;
  correct: number;
  wrong: number;
  skipped: number;
  /** 0–100, rounded to the nearest whole percent. */
  percent: number;
  passed: boolean;
  graded: GradedAnswer[];
  /** Seconds actually spent on the attempt. */
  durationSeconds: number;
};

/** How this attempt stands against the ones before it. */
export type AttemptComparison = {
  /** Which attempt this is overall, counting from 1. */
  attemptNumber: number;
  /** Score of the previous attempt in the same mode, if there is one. */
  previousPercent: number | null;
  /** Signed change against that attempt, in percentage points. */
  delta: number | null;
  /** Best score before this attempt, across every mode. */
  previousBest: number | null;
  isPersonalBest: boolean;
  /** Average of the last few attempts before this one, for a steadier read. */
  recentAverage: number | null;
  trend: 'first' | 'up' | 'down' | 'same';
};

/** Attempts before the current one, newest first. */
type PriorAttempt = { mode: ExamMode; percent: number };

/**
 * Compares a freshly graded attempt with the learner's earlier ones.
 *
 * The headline comparison is against the previous attempt *in the same mode*,
 * because a 10-question quick test and a 30-question full mock are not
 * comparable scores; falling back to a cross-mode comparison would report
 * improvement that did not happen.
 */
export function compareAttempt(
  current: { mode: ExamMode; percent: number },
  prior: readonly PriorAttempt[],
): AttemptComparison {
  const sameMode = prior.filter((a) => a.mode === current.mode);
  const previousPercent = sameMode.length > 0 ? sameMode[0].percent : null;
  const delta = previousPercent === null ? null : current.percent - previousPercent;
  const previousBest =
    prior.length > 0 ? Math.max(...prior.map((a) => a.percent)) : null;

  const window = sameMode.slice(0, 3);
  const recentAverage =
    window.length > 0
      ? Math.round(window.reduce((sum, a) => sum + a.percent, 0) / window.length)
      : null;

  let trend: AttemptComparison['trend'] = 'first';
  if (delta !== null) trend = delta > 0 ? 'up' : delta < 0 ? 'down' : 'same';

  return {
    attemptNumber: prior.length + 1,
    previousPercent,
    delta,
    previousBest,
    // A first-ever attempt is not framed as a personal best — there is nothing
    // to have beaten.
    isPersonalBest: previousBest !== null && current.percent > previousBest,
    recentAverage,
    trend,
  };
}

export function gradeExam(
  mode: ExamMode,
  questions: ExamQuestion[],
  answers: AnswerMap,
  durationSeconds: number,
): ExamResult {
  const graded: GradedAnswer[] = questions.map((question) => {
    const selectedChoiceId = answers[question.id] ?? null;
    return {
      question,
      selectedChoiceId,
      correct: selectedChoiceId === question.correctChoiceId,
    };
  });

  const correct = graded.filter((g) => g.correct).length;
  const skipped = graded.filter((g) => g.selectedChoiceId === null).length;
  const total = questions.length;
  // Guard against a zero-length attempt producing NaN.
  const percent = total === 0 ? 0 : Math.round((correct / total) * 100);

  return {
    mode,
    total,
    correct,
    wrong: total - correct - skipped,
    skipped,
    percent,
    passed: percent >= PASS_THRESHOLD * 100,
    graded,
    durationSeconds,
  };
}
