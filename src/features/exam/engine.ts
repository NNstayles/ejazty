import { examPool } from '@/content/registry';
import type { Choice, Question } from '@/content/schema';

export type ExamMode = 'quick' | 'medium' | 'full';

export type ExamModeConfig = {
  mode: ExamMode;
  questionCount: number;
  /** Minutes allowed, or null for an untimed practice run. */
  timeLimitMinutes: number | null;
};

/**
 * The full mock exam mirrors the official theoretical exam: 30 questions in
 * 30 minutes. Quick and medium are practice formats.
 */
export const EXAM_MODES: Record<ExamMode, ExamModeConfig> = {
  quick: { mode: 'quick', questionCount: 10, timeLimitMinutes: 3 },
  medium: { mode: 'medium', questionCount: 20, timeLimitMinutes: 10 },
  full: { mode: 'full', questionCount: 30, timeLimitMinutes: 30 },
};

/**
 * Minimum share of correct answers required to pass.
 *
 * 80% comes from the official bank itself, which asks the pass mark as a
 * question ("درجة النجاح في الامتحان (الاختبار النظري) لمنح إجازة السوق هي؟")
 * and marks 80% as the correct answer.
 */
export const PASS_THRESHOLD = 0.8;

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
 * Draws a fresh attempt. Questions are sampled without replacement, and each
 * question's choices are reshuffled so answer position is never memorisable.
 *
 * Exams cover traffic signs and road priority only, matching the official
 * theoretical exam scope.
 */
export function buildExam(mode: ExamMode): ExamQuestion[] {
  const config = EXAM_MODES[mode];
  const pool = examPool(['signs', 'priority']);
  return shuffle(pool)
    .slice(0, config.questionCount)
    .map((q) => ({ ...q, choices: shuffle(q.choices) }));
}

/** How many questions are actually available for a mode right now. */
export function availableQuestionCount(): number {
  return examPool(['signs', 'priority']).length;
}

export function canRunExam(mode: ExamMode): boolean {
  return availableQuestionCount() >= EXAM_MODES[mode].questionCount;
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
