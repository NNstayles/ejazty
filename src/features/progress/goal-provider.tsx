/**
 * The daily goal, shared by the screen that sets it and the ones that show it.
 *
 * A provider because the three surfaces move together: settings changes the
 * target, the exam runner adds to the tally as answers land, and the Learn hero
 * draws the ring. With a hook each, answering a question would leave the hero
 * behind the runner showing a stale count until something remounted it — and
 * that hero is the first thing seen on returning from an exam.
 */

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
import { AppState } from 'react-native';

import { refreshReminders } from '@/features/notifications';
import {
  DEFAULT_GOAL,
  readGoal,
  readProgress,
  recordCorrect,
  writeGoal,
} from '@/features/progress/goal';
import { goalReachedFeedback } from '@/lib/haptics';
import { usePreferences } from '@/preferences/preferences-provider';

type GoalValue = {
  /** False until the stored goal and tally have been read. */
  ready: boolean;
  /** Questions to answer correctly today. */
  goal: number;
  /** Questions answered correctly today. */
  correct: number;
  /** Consecutive days the goal has been met. */
  streak: number;
  /** 0–1, clamped. What the ring draws. */
  fraction: number;
  setGoal: (goal: number) => Promise<void>;
  /** Adds to today's tally. Called as each *correct* answer lands. */
  record: (count: number) => void;
};

const GoalContext = createContext<GoalValue | null>(null);

export function GoalProvider({ children }: { children: ReactNode }) {
  const { language, notificationsEnabled } = usePreferences();
  const [ready, setReady] = useState(false);
  const [goal, setGoalState] = useState(DEFAULT_GOAL);
  const [correct, setCorrect] = useState(0);
  const [streak, setStreak] = useState(0);

  /**
   * Orders the async reads that can land out of turn.
   *
   * Three things resolve into the same two pieces of state — the cold-start
   * read, the foreground refresh, and `record`'s write-then-read. Storage is
   * the source of truth, so the danger is not a wrong value but an *older* one
   * arriving last: a refresh that began before an answer was written would
   * otherwise repaint the ring with the pre-answer tally. Each write claims a
   * ticket and only applies if nothing newer has already landed.
   */
  const seq = useRef(0);
  const applied = useRef(0);

  /**
   * The day this provider has already reacted to the goal being met on.
   *
   * Two things happen once per day at that moment, and both would be wrong to
   * repeat on every answer afterwards: the congratulatory haptic, and standing
   * down the rest of today's reminders. The reminders cannot wait for
   * `refreshReminders`' usual trigger, the next foreground, because the goal is
   * met *inside* the app and the learner's next move is normally to close it
   * with this evening's reminders still queued behind them.
   *
   * Keyed by day rather than by detecting the crossing: `record` resolves
   * asynchronously and can land out of order, so "have I already done this
   * today" is a question with a stable answer where "was this the crossing" is
   * not.
   */
  const crossed = useRef<string | null>(null);

  const apply = useCallback((ticket: number, next: { correct: number; streak: number }) => {
    if (ticket < applied.current) return;
    applied.current = ticket;
    setCorrect(next.correct);
    setStreak(next.streak);
  }, []);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const ticket = ++seq.current;
      const storedGoal = await readGoal();
      // Read against the goal that was just loaded, not the default: the roll-
      // over decides whether a streak survives by comparing yesterday's tally
      // with the goal, so passing the wrong one here would break a streak on
      // every cold start for anyone whose goal is not 20.
      const progress = await readProgress(storedGoal);
      if (cancelled) return;
      setGoalState(storedGoal);
      apply(ticket, progress);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [apply]);

  /**
   * Re-reads the tally whenever the app comes back to the foreground.
   *
   * `goal.ts` rolls the day over on *read* precisely so that nothing has to
   * fire at midnight — but that only works if something reads. Nothing did:
   * this provider read once on mount, so the case the roll-over exists for,
   * the app backgrounded overnight and reopened the next morning, kept
   * yesterday's count and yesterday's ring on the Learn hero and in settings.
   * It self-corrected only once the learner answered a question, because
   * `recordCorrect` reads before it adds — so the first answer of the day
   * silently absorbed the whole of yesterday's tally.
   *
   * A listener rather than a midnight timer, for the reason `goal.ts` gives:
   * the app is usually not running at midnight, and a timer that only fires
   * while it is would miss exactly the case that matters.
   */
  useEffect(() => {
    const sub = AppState.addEventListener('change', (state) => {
      if (state !== 'active') return;
      const ticket = ++seq.current;
      void readProgress(goal).then((progress) => apply(ticket, progress));
    });
    return () => sub.remove();
  }, [goal, apply]);

  const setGoal = useCallback(async (next: number) => {
    setGoalState(next);
    await writeGoal(next);
  }, []);

  /**
   * Fire-and-forget, and returning `void` rather than a promise is deliberate.
   *
   * This is called from the exam runner's answer handler, on the tap. Making it
   * awaitable would put an AsyncStorage round-trip between the finger and the
   * choice highlighting, and there is nothing useful for the caller to do with
   * the result — the ring it feeds is on a different screen.
   */
  const record = useCallback(
    (count: number) => {
      const ticket = ++seq.current;
      void recordCorrect(count, goal).then((progress) => {
        apply(ticket, progress);

        if (progress.correct < goal) return;
        if (crossed.current === progress.day) return;
        crossed.current = progress.day;

        // The one unprompted haptic in the app. It is warranted because the
        // moment is otherwise invisible: the ring that just filled is on the
        // Learn tab and the learner is looking at an exam question.
        goalReachedFeedback();

        if (!notificationsEnabled) return;
        // The queue marker records the suppression, so this is a no-op if the
        // rest of today has already been dropped — and it fails closed anyway:
        // `refreshReminders` swallows its own errors and returns early without
        // notification permission.
        void refreshReminders(language);
      });
    },
    [goal, apply, language, notificationsEnabled],
  );

  const value = useMemo<GoalValue>(
    () => ({
      ready,
      goal,
      correct,
      streak,
      // Clamped, so a learner who overshoots does not draw an arc past the end
      // of its own track.
      fraction: goal > 0 ? Math.min(1, correct / goal) : 0,
      setGoal,
      record,
    }),
    [ready, goal, correct, streak, setGoal, record],
  );

  return <GoalContext.Provider value={value}>{children}</GoalContext.Provider>;
}

export function useGoal(): GoalValue {
  const ctx = useContext(GoalContext);
  if (!ctx) throw new Error('useGoal must be used inside <GoalProvider>');
  return ctx;
}
