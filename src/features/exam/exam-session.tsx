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

import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';
import {
  buildExam,
  EXAM_MODES,
  gradeExam,
  type AnswerMap,
  type ExamMode,
  type ExamQuestion,
  type ExamResult,
} from './engine';

export type ExamAttemptRecord = {
  mode: ExamMode;
  percent: number;
  passed: boolean;
  correct: number;
  total: number;
  /** ISO timestamp of when the attempt was graded. */
  at: string;
};

type ExamSessionValue = {
  status: 'idle' | 'running' | 'finished';
  mode: ExamMode | null;
  questions: ExamQuestion[];
  answers: AnswerMap;
  index: number;
  /** Null when the mode is untimed. */
  secondsLeft: number | null;
  result: ExamResult | null;
  history: ExamAttemptRecord[];
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

export function ExamSessionProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ExamSessionValue['status']>('idle');
  const [mode, setMode] = useState<ExamMode | null>(null);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<AnswerMap>({});
  const [index, setIndex] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [result, setResult] = useState<ExamResult | null>(null);
  const [history, setHistory] = useState<ExamAttemptRecord[]>([]);

  const startedAt = useRef<number>(0);
  // Read inside the timer tick so the interval never closes over stale answers.
  const latest = useRef({ mode, questions, answers });
  latest.current = { mode, questions, answers };

  useEffect(() => {
    void readJSON<ExamAttemptRecord[]>(StorageKeys.examHistory, []).then(setHistory);
  }, []);

  const finalise = useCallback((reason: 'manual' | 'timeout') => {
    const { mode: m, questions: qs, answers: a } = latest.current;
    if (!m) return;
    const duration = Math.round((Date.now() - startedAt.current) / 1000);
    const graded = gradeExam(m, qs, a, duration);
    setResult(graded);
    setStatus('finished');
    setSecondsLeft(reason === 'timeout' ? 0 : null);

    const record: ExamAttemptRecord = {
      mode: graded.mode,
      percent: graded.percent,
      passed: graded.passed,
      correct: graded.correct,
      total: graded.total,
      at: new Date().toISOString(),
    };
    setHistory((prev) => {
      const nextHistory = [record, ...prev].slice(0, 50);
      void writeJSON(StorageKeys.examHistory, nextHistory);
      return nextHistory;
    });
  }, []);

  // Countdown for timed modes. Auto-submits the attempt when it hits zero.
  useEffect(() => {
    if (status !== 'running' || secondsLeft === null) return;
    if (secondsLeft <= 0) {
      finalise('timeout');
      return;
    }
    const id = setTimeout(() => setSecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(id);
  }, [status, secondsLeft, finalise]);

  const start = useCallback((nextMode: ExamMode) => {
    const drawn = buildExam(nextMode);
    const limit = EXAM_MODES[nextMode].timeLimitMinutes;
    startedAt.current = Date.now();
    setMode(nextMode);
    setQuestions(drawn);
    setAnswers({});
    setIndex(0);
    setResult(null);
    setSecondsLeft(limit === null ? null : limit * 60);
    setStatus('running');
  }, []);

  const answer = useCallback((questionId: string, choiceId: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: choiceId }));
  }, []);

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
    setStatus('idle');
    setMode(null);
    setQuestions([]);
    setAnswers({});
    setIndex(0);
    setSecondsLeft(null);
    setResult(null);
  }, []);

  const value = useMemo<ExamSessionValue>(
    () => ({
      status,
      mode,
      questions,
      answers,
      index,
      secondsLeft,
      result,
      history,
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
      secondsLeft,
      result,
      history,
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
      {children}
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
