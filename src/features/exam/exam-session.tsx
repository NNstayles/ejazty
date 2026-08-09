import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/features/auth/auth-provider';
import { useGoal } from '@/features/progress/goal-provider';
import {
  CACHE_LIMIT,
  newAttemptId,
  pushAttempt,
  readAttemptCache,
  saveAttemptLocally,
  syncAttempts,
  type ExamAttemptRecord,
} from '@/features/progress/attempts';
import {
  readQuestionStats,
  recordAttemptStats,
  syncQuestionStats,
  weakestFirst,
  type QuestionStat,
} from '@/features/progress/question-stats';
import {
  buildExam,
  compareAttempt,
  EXAM_MODES,
  gradeExam,
  questionsToGrade,
  type AnswerMap,
  type AttemptComparison,
  type ExamMode,
  type ExamQuestion,
  type ExamResult,
  type GradedAnswer,
} from './engine';
import { earnsGoalCredit } from './goal-credit';

export type { ExamAttemptRecord };

/**
 * Writes a graded attempt to the device and, for a signed-in user, to Supabase.
 *
 * The local write comes first and is what the UI already reflects, so a failed
 * push is not an error the learner has to see: the attempt is cached with its
 * id and the next `syncAttempts` sends it.
 */
async function persistAttempt(
  record: ExamAttemptRecord,
  graded: GradedAnswer[],
  userId: string | null,
): Promise<QuestionStat[]> {
  await saveAttemptLocally(record, userId);
  // Per-question counters go to the same cache-first, push-after rule. Recorded
  // for a guest too — `ownerId: null` is the state the adoption rule in
  // `question-stats.ts` exists to pick up when they register, and without it
  // the drill would be empty for everyone who practised before making an
  // account.
  const local = await recordAttemptStats(graded, record.at, userId);
  if (!userId) return weakestFirst(local);

  await pushAttempt(record, userId);
  // Pushes the merged counters and pulls anything this device has not seen.
  // Failures are swallowed by design, exactly as the attempt push is: the local
  // write above is what the drill reads, so a dropped sync costs the learner
  // nothing and is retried on the next one — which is why the *synced* result
  // is what is returned rather than being discarded.
  return weakestFirst(await syncQuestionStats(userId));
}

type ExamSessionValue = {
  status: 'idle' | 'running' | 'finished';
  mode: ExamMode | null;
  questions: ExamQuestion[];
  answers: AnswerMap;
  index: number;
  result: ExamResult | null;
  /** How the graded attempt compares with earlier ones. Null until graded. */
  comparison: AttemptComparison | null;
  history: ExamAttemptRecord[];
  /**
   * How many distinct questions the learner has answered wrongly and not since
   * got right. Drives the drill card: it is disabled at zero, and the count is
   * what the card advertises.
   */
  weakCount: number;
  answeredCount: number;
  start: (mode: ExamMode) => void;
  answer: (questionId: string, choiceId: string) => void;
  goTo: (index: number) => void;
  next: () => void;
  previous: () => void;
  submit: () => void;
  reset: () => void;
};

const ExamSessionContext = createContext<ExamSessionValue | null>(null);

/**
 * The countdown lives in its own context so a tick re-renders only whatever
 * draws the clock. Kept on the session context it would re-render every
 * consumer — the whole question list and choice set — once per second.
 */
const ExamClockContext = createContext<number | null>(null);

export function ExamSessionProvider({ children }: { children: ReactNode }) {
  const { user, ready: authReady } = useAuth();
  const { record: recordCorrect } = useGoal();
  const userId = user?.id ?? null;

  const [status, setStatus] = useState<ExamSessionValue['status']>('idle');
  const [mode, setMode] = useState<ExamMode | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [comparison, setComparison] = useState<AttemptComparison | null>(null);
  const [history, setHistory] = useState<ExamAttemptRecord[]>([]);
  /**
   * The learner's wrong answers, weakest first. State rather than a ref because
   * the exam home renders a count from it and disables the drill card while it
   * is empty; `latest` carries it into `start` so the draw never closes over a
   * stale copy.
   */
  const [weak, setWeak] = useState<QuestionStat[]>([]);

  const startedAt = useRef<number>(0);
  /** Wall-clock instant the attempt expires, or null when untimed. */
  const deadline = useRef<number | null>(null);
  /** Guards against a second grade pass if a tick lands during finalisation. */
  const finalised = useRef(false);
  /**
   * Questions already credited to the daily goal during this attempt.
   *
   * A ref rather than state because nothing renders it, and per-attempt because
   * that is the span over which an answer can be changed — `start` and `reset`
   * both clear it. `earnsGoalCredit` in `goal-credit.ts` is the rule it feeds
   * and the place its reasoning is written down.
   */
  const credited = useRef<Set<string>>(new Set());
  // Read inside the timer tick so it never closes over stale answers. Written
  // during render rather than in an effect: a timeout landing in the gap before
  // effects flush would otherwise grade the attempt without the last answer.
  const latest = useRef({ mode, questions, answers, history, userId, weak });
  latest.current = { mode, questions, answers, history, userId, weak };

  /**
   * Loads the history the current viewer is entitled to see.
   *
   * For a signed-in user this reconciles the device cache with Supabase, which
   * both restores attempts made on another device and pushes any that were
   * graded while offline. A guest reads the cache alone — and only the
   * device-local part of it, so a signed-out account's attempts stay hidden
   * even if the cache was not cleared.
   *
   * Waits for `authReady`: running before the persisted session is restored
   * would read as "guest" and blank a signed-in user's history for a frame.
   */
  useEffect(() => {
    if (!authReady) return;
    let cancelled = false;

    (async () => {
      if (userId) {
        const synced = await syncAttempts(userId);
        if (!cancelled) setHistory(synced);
      } else {
        const cache = await readAttemptCache();
        if (!cancelled) setHistory(cache.ownerId === null ? cache.attempts : []);
      }

      // Per-question counters, on the same owner rules as the history above.
      // A guest reads only the device-local part, so a signed-out account's
      // record stays hidden even if the cache was not cleared.
      const stats = userId
        ? await syncQuestionStats(userId)
        : await (async () => {
            const cache = await readQuestionStats();
            return cache.ownerId === null ? cache.stats : {};
          })();

      if (!cancelled) setWeak(weakestFirst(stats));
    })();

    return () => {
      cancelled = true;
    };
  }, [authReady, userId]);

  const finalise = useCallback((reason: 'manual' | 'timeout') => {
    const {
      mode: m,
      questions: qs,
      answers: a,
      history: prior,
      userId: owner,
    } = latest.current;
    if (!m || finalised.current) return;

    // Open practice is marked on what was answered rather than on the whole
    // bank it drew — see `questionsToGrade`. Finishing it with nothing answered
    // would produce a zero-length attempt, which grades as 0% and which the
    // `total > 0` CHECK on `exam_attempts` rejects outright, so the session
    // stays running instead. The UI disables the control that gets here, and
    // this is the guard behind it rather than a state anyone can reach.
    const marked = questionsToGrade(m, qs, a);
    if (marked.length === 0) return;

    finalised.current = true;
    const duration = Math.round((Date.now() - startedAt.current) / 1000);
    const graded = gradeExam(m, marked, a, duration);
    setResult(graded);
    // `prior` is every attempt before this one, so it is exactly the baseline
    // the comparison needs.
    setComparison(compareAttempt(graded, prior));
    setStatus('finished');
    setSecondsLeft(reason === 'timeout' ? 0 : null);

    const record: ExamAttemptRecord = {
      id: newAttemptId(),
      mode: graded.mode,
      percent: graded.percent,
      passed: graded.passed,
      correct: graded.correct,
      total: graded.total,
      durationSeconds: duration,
      at: new Date().toISOString(),
    };
    // Shown immediately; storage and the remote push happen behind it so
    // grading never waits on a disk or network round-trip.
    // Trimmed to the same bound the cache uses, so what is on screen cannot
    // drift from what a reload would produce.
    setHistory((prev) => [record, ...prev].slice(0, CACHE_LIMIT));
    // The updated counters come back from the same write, so the drill reflects
    // the attempt just graded: a question finally got right drops out of it,
    // and one just missed joins. Recomputing from storage afterwards would race
    // the write; taking the returned value cannot.
    void persistAttempt(record, graded.graded, owner).then(setWeak);
  }, []);

  /**
   * Countdown for timed modes. Remaining time is derived from a fixed deadline
   * rather than decremented, so it neither drifts over a 30-minute attempt nor
   * hands back free time when the app is backgrounded. Polling twice a second
   * lands close to each second boundary; re-rendering only happens when the
   * displayed value actually changes, because React bails out on an identical
   * state value.
   */
  useEffect(() => {
    if (status !== 'running' || deadline.current === null) return;

    const tick = () => {
      const target = deadline.current;
      if (target === null) return;
      const remaining = Math.max(0, Math.ceil((target - Date.now()) / 1000));
      setSecondsLeft(remaining);
      if (remaining <= 0) finalise('timeout');
    };

    tick();
    const id = setInterval(tick, 500);
    return () => clearInterval(id);
  }, [status, finalise]);

  const start = useCallback((nextMode: ExamMode) => {
    // Read from `latest` rather than closing over `weak`: this callback is
    // stable by design (it is on the context value that every consumer holds),
    // so a captured copy would be whatever the list was on first render.
    const drawn = buildExam(
      nextMode,
      latest.current.weak.map((s) => s.questionId),
    );
    const limit = EXAM_MODES[nextMode].timeLimitMinutes;
    startedAt.current = Date.now();
    deadline.current = limit === null ? null : Date.now() + limit * 60_000;
    finalised.current = false;
    credited.current = new Set();
    setMode(nextMode);
    setQuestions(drawn);
    setAnswers({});
    setIndex(0);
    setResult(null);
    // Cleared alongside `result`: the two are read together on the result
    // screen, and leaving the previous attempt's comparison in place would let
    // a retake render last attempt's trend against this attempt's score.
    setComparison(null);
    setSecondsLeft(limit === null ? null : limit * 60);
    setStatus('running');
  }, []);

  const answer = useCallback(
    (questionId: string, choiceId: string) => {
      /*
        The daily tally counts questions answered *correctly*. `goal.ts` only
        knows how to add, so which answers qualify is decided here, against
        `earnsGoalCredit` — this is the only place holding both the question and
        what the attempt has already paid out for.

        Read the question and the credit from refs rather than from inside the
        state updater: a `setAnswers` callback is a reducer, React is free to
        invoke it more than once for a single update (it does exactly that under
        StrictMode), and a side effect in there would double-count every answer
        in development and be a latent double-count in production. `latest` is
        written during render, so it is already current at event time.
      */
      const question = latest.current.questions.find((q) => q.id === questionId);
      setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));

      if (!earnsGoalCredit(question, choiceId, credited.current)) return;
      credited.current.add(questionId);
      recordCorrect(1);
    },
    [recordCorrect],
  );

  const goTo = useCallback(
    (target: number) => {
      setIndex(Math.max(0, Math.min(target, questions.length - 1)));
    },
    [questions.length],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);
  const submit = useCallback(() => finalise('manual'), [finalise]);

  const reset = useCallback(() => {
    deadline.current = null;
    finalised.current = false;
    credited.current = new Set();
    setStatus('idle');
    setMode(null);
    setQuestions([]);
    setAnswers({});
    setIndex(0);
    setSecondsLeft(null);
    setResult(null);
    setComparison(null);
  }, []);

  const value = useMemo<ExamSessionValue>(
    () => ({
      status,
      mode,
      questions,
      answers,
      index,
      result,
      comparison,
      history,
      weakCount: weak.length,
      answeredCount: Object.keys(answers).length,
      start,
      answer,
      goTo,
      next,
      previous,
      submit,
      reset,
    }),
    [
      status,
      mode,
      questions,
      answers,
      index,
      result,
      comparison,
      history,
      weak,
      start,
      answer,
      goTo,
      next,
      previous,
      submit,
      reset,
    ],
  );


  return (
    <ExamSessionContext.Provider value={value}>
      <ExamClockContext.Provider value={secondsLeft}>
        {children}
      </ExamClockContext.Provider>
    </ExamSessionContext.Provider>
  );
}

export function useExamSession(): ExamSessionValue {
  const ctx = useContext(ExamSessionContext);
  if (!ctx) {
    throw new Error('useExamSession must be used inside <ExamSessionProvider>');
  }
  return ctx;
}

/**
 * Seconds remaining in the current attempt, or null when the mode is untimed.
 * Subscribing to this re-renders once per second, so read it from the smallest
 * component that draws the clock.
 */
export function useExamClock(): number | null {
  return useContext(ExamClockContext);
}
