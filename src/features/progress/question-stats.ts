/**
 * Per-question performance, and the bridge between the device cache and
 * Supabase.
 *
 * This is what lets the app answer "which questions do I keep getting wrong?".
 * `exam_attempts` stores aggregates only — `percent`, `correct`, `total` — so
 * before this, a learner's mistakes existed solely in memory during the result
 * screen and were discarded on reset.
 *
 * Built to the same rule as `attempts.ts`: **local first, push after.** The
 * cache is what the UI reads, it answers instantly, works offline, and is the
 * only store a guest ever touches. A failed push costs the learner nothing.
 *
 * ## One row per question, not one per answer
 *
 * The counters are aggregates. The alternative — a record per (attempt,
 * question) — is unbounded in the way this project explicitly guards against:
 * `open` practice draws the whole bank, and the attempt quota permits 2000
 * attempts, so the ceiling is on the order of a million rows for one account.
 * Aggregating bounds the store by the size of the bank instead. The reasoning
 * is written out in full in `20260808130000_question_stats.sql`.
 *
 * The accepted cost: an individual past attempt cannot be reconstructed
 * question by question. `exam_attempts` still records what it scored.
 */

import type { QuestionTopic } from '@/content/schema';
import type { GradedAnswer } from '@/features/exam/engine';
import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';
import { supabase } from '@/lib/supabase';

export type QuestionStat = {
  questionId: string;
  topic: QuestionTopic;
  /** Times the learner has *answered* this question. Never zero. */
  seen: number;
  /** How many of those were right. */
  correct: number;
  /**
   * The most recent verdict, kept separately from the ratio because the drill
   * reads "missed it last time" while the topic trend reads the ratio. Neither
   * derives from the other: 3 of 4 does not say which one was missed.
   */
  lastCorrect: boolean;
  /** ISO 8601, from the attempt that last asked it. */
  lastSeenAt: string;
};

/**
 * The cache records its owner, exactly as the attempt cache does and for the
 * same reason: `ownerId: null` is device-local (a guest's, or from before
 * anyone signed in) and is adopted by the first account to sign in, while a
 * cache owned by someone *else* is discarded rather than shown. Getting this
 * wrong shows one person's study record to the next account on the phone.
 */
export type QuestionStatsCache = {
  ownerId: string | null;
  stats: Record<string, QuestionStat>;
};

const EMPTY: QuestionStatsCache = { ownerId: null, stats: {} };

/**
 * Bound on the local store, mirroring the `question_stats_quota` trigger. The
 * bank is 541 questions, so a real learner cannot approach it; this stops a
 * hand-edited cache growing without limit.
 */
export const STATS_LIMIT = 2000;

const MAX_QUESTION_ID_LENGTH = 64;

const VALID_TOPICS = new Set<string>([
  'signs',
  'rules',
  'priority',
  'mechanics',
  'firstaid',
]);

/** Same 24-hour slack as the attempt cache, absorbing device clock skew. */
const MAX_CLOCK_SKEW_MS = 24 * 60 * 60 * 1000;

function parseStat(value: unknown): QuestionStat | null {
  if (!value || typeof value !== 'object') return null;
  const s = value as Record<string, unknown>;

  if (typeof s.questionId !== 'string' || s.questionId.trim() === '') return null;
  if (typeof s.topic !== 'string' || !VALID_TOPICS.has(s.topic)) return null;
  if (typeof s.seen !== 'number' || !Number.isInteger(s.seen) || s.seen <= 0) return null;
  if (
    typeof s.correct !== 'number' ||
    !Number.isInteger(s.correct) ||
    s.correct < 0 ||
    s.correct > s.seen
  ) {
    return null;
  }
  if (typeof s.lastCorrect !== 'boolean') return null;
  if (typeof s.lastSeenAt !== 'string' || Number.isNaN(Date.parse(s.lastSeenAt))) {
    return null;
  }

  return {
    questionId: s.questionId,
    topic: s.topic as QuestionTopic,
    seen: s.seen,
    correct: s.correct,
    lastCorrect: s.lastCorrect,
    lastSeenAt: s.lastSeenAt,
  };
}

export async function readQuestionStats(): Promise<QuestionStatsCache> {
  const raw = await readJSON<unknown>(StorageKeys.questionStats, null);
  if (!raw || typeof raw !== 'object') return EMPTY;

  const cache = raw as Partial<QuestionStatsCache>;
  if (!cache.stats || typeof cache.stats !== 'object') return EMPTY;

  const stats: Record<string, QuestionStat> = {};
  for (const value of Object.values(cache.stats)) {
    const parsed = parseStat(value);
    // Unreadable entries are dropped rather than repaired: a stat is a
    // derived convenience, and a wrong one silently mis-ranks the drill.
    if (parsed) stats[parsed.questionId] = parsed;
  }

  return {
    ownerId: typeof cache.ownerId === 'string' ? cache.ownerId : null,
    stats,
  };
}

async function writeQuestionStats(cache: QuestionStatsCache): Promise<void> {
  const entries = Object.values(cache.stats);
  // Newest first, so a cache that somehow exceeded the bound keeps what the
  // learner touched most recently rather than an arbitrary slice.
  const bounded = entries
    .sort((a, b) => b.lastSeenAt.localeCompare(a.lastSeenAt))
    .slice(0, STATS_LIMIT);

  await writeJSON(StorageKeys.questionStats, {
    ownerId: cache.ownerId,
    stats: Object.fromEntries(bounded.map((s) => [s.questionId, s])),
  });
}

/**
 * Folds one graded attempt into the existing counters.
 *
 * **Only questions the learner actually answered are recorded**, which is why
 * this filters on `selectedChoiceId`. A timed mock grades every question it
 * drew, including the ones time ran out on, and `ExamResult.skipped` reports
 * that — correctly, because skipping has a cost in the real test. But a skipped
 * question says nothing about whether the learner *knows* it, and recording
 * fifteen untouched questions as mistakes would fill the drill with material
 * they never saw. That is the difference between a drill worth doing and a
 * list nobody trusts.
 *
 * Pure, so the merge rule is testable without storage or a network.
 */
export function mergeAttempt(
  existing: Record<string, QuestionStat>,
  graded: GradedAnswer[],
  at: string,
): Record<string, QuestionStat> {
  const next = { ...existing };

  for (const answer of graded) {
    if (answer.selectedChoiceId === null) continue;

    const id = answer.question.id;
    const prior = next[id];

    next[id] = {
      questionId: id,
      topic: answer.question.topic,
      seen: (prior?.seen ?? 0) + 1,
      correct: (prior?.correct ?? 0) + (answer.correct ? 1 : 0),
      lastCorrect: answer.correct,
      lastSeenAt: at,
    };
  }

  return next;
}

/** Records a graded attempt locally and returns the updated stats. */
export async function recordAttemptStats(
  graded: GradedAnswer[],
  at: string,
  ownerId: string | null,
): Promise<Record<string, QuestionStat>> {
  const cache = await readQuestionStats();
  const stats = mergeAttempt(cache.stats, graded, at);
  await writeQuestionStats({ ownerId, stats });
  return stats;
}

export async function clearQuestionStats(): Promise<void> {
  await writeJSON(StorageKeys.questionStats, EMPTY);
}

/**
 * Clears an *account's* stats on sign-out and deliberately keeps a guest's.
 *
 * The asymmetry is `clearAccountAttemptCache`'s, for the same reason: an
 * account's record is in Supabase by then and must not greet whoever signs in
 * next, while a guest's exists nowhere else — and signing out is how a guest
 * goes off to register, so clearing it would destroy the practice record of
 * everyone who tried the app before making an account, at the moment they went
 * to make one.
 */
export async function clearAccountQuestionStats(): Promise<void> {
  const cache = await readQuestionStats();
  if (cache.ownerId === null) return;
  await clearQuestionStats();
}

type StatRow = {
  question_id: string;
  topic: string;
  seen: number;
  correct: number;
  last_correct: boolean;
  last_seen_at: string;
};

function toRow(stat: QuestionStat, userId: string) {
  return {
    user_id: userId,
    question_id: stat.questionId,
    topic: stat.topic,
    seen: stat.seen,
    correct: stat.correct,
    last_correct: stat.lastCorrect,
    last_seen_at: stat.lastSeenAt,
  };
}

/**
 * Validates what comes back. RLS guarantees the rows are the caller's own; it
 * guarantees nothing about their *shape*, so a renamed column or a drifted
 * projection would otherwise reach the drill as `NaN`.
 */
function parseRow(value: unknown): QuestionStat | null {
  if (!value || typeof value !== 'object') return null;
  const r = value as Partial<StatRow>;
  return parseStat({
    questionId: r.question_id,
    topic: r.topic,
    seen: r.seen,
    correct: r.correct,
    lastCorrect: r.last_correct,
    lastSeenAt: r.last_seen_at,
  });
}

/**
 * Whether the remote table would accept this row.
 *
 * Each clause restates one CHECK from `20260808130000_question_stats.sql`, and
 * they are coupled on purpose. The push is **one batch upsert** and Postgres
 * fails a batch as a unit, so a single row the table refuses would take every
 * other stat down with it — silently, because the error is ignored by design.
 * Filtering keeps the cost of a bad row to itself.
 */
export function isPushable(stat: QuestionStat): boolean {
  if (
    typeof stat.questionId !== 'string' ||
    stat.questionId.trim().length === 0 ||
    stat.questionId.length > MAX_QUESTION_ID_LENGTH
  ) {
    return false;
  }
  if (!VALID_TOPICS.has(stat.topic)) return false;
  if (!Number.isInteger(stat.seen) || stat.seen <= 0) return false;
  if (!Number.isInteger(stat.correct) || stat.correct < 0) return false;
  if (stat.correct > stat.seen) return false;

  // `question_stats_last_correct_agrees`: a question never answered correctly
  // cannot have been correct last time, and one never missed cannot have been
  // wrong last time.
  if (stat.correct === 0 && stat.lastCorrect) return false;
  if (stat.correct === stat.seen && !stat.lastCorrect) return false;

  const at = Date.parse(stat.lastSeenAt);
  if (Number.isNaN(at)) return false;
  if (at > Date.now() + MAX_CLOCK_SKEW_MS) return false;

  return true;
}

/**
 * Reconciles the device cache with the account's remote stats.
 *
 * Push before pull, so anything recorded offline is already in the merged
 * result. On any network failure it returns the cache rather than an empty
 * object: being offline must not look like having never studied.
 */
export async function syncQuestionStats(
  userId: string,
): Promise<Record<string, QuestionStat>> {
  const cache = await readQuestionStats();

  // Stats belonging to a *different* account never carry over, network or not.
  const carried =
    cache.ownerId === null || cache.ownerId === userId ? cache.stats : {};

  if (!supabase) {
    await writeQuestionStats({ ownerId: userId, stats: carried });
    return carried;
  }

  const pushable = Object.values(carried).filter(isPushable);
  if (pushable.length > 0) {
    await supabase
      .from('question_stats')
      .upsert(pushable.map((s) => toRow(s, userId)), {
        onConflict: 'user_id,question_id',
      });
  }

  const { data, error } = await supabase
    .from('question_stats')
    .select('question_id, topic, seen, correct, last_correct, last_seen_at')
    .eq('user_id', userId)
    .limit(STATS_LIMIT);

  if (error || !data) {
    await writeQuestionStats({ ownerId: userId, stats: carried });
    return carried;
  }

  const merged: Record<string, QuestionStat> = { ...carried };
  for (const row of data as unknown[]) {
    const remote = parseRow(row);
    if (!remote) continue;
    const local = merged[remote.questionId];
    // The higher `seen` wins, because both sides are absolute counters and the
    // larger one has folded in at least as many attempts. A row that failed to
    // push therefore survives the merge and is retried next sync, rather than
    // being overwritten by the staler server copy.
    merged[remote.questionId] = !local || remote.seen > local.seen ? remote : local;
  }

  await writeQuestionStats({ ownerId: userId, stats: merged });
  return merged;
}

/**
 * The questions worth drilling, weakest first.
 *
 * "Weakest" is **missed last time first**, then by success ratio, then by how
 * long ago it was seen. Ordering by ratio alone would bury a question just got
 * wrong under one missed twice a month ago, and the one in front of the learner
 * is the one they have the best chance of fixing now.
 *
 * Pure and exported so the ordering — which is the whole feature — is testable
 * without a device.
 */
export function weakestFirst(stats: Record<string, QuestionStat>): QuestionStat[] {
  return Object.values(stats)
    .filter((s) => s.correct < s.seen)
    .sort((a, b) => {
      if (a.lastCorrect !== b.lastCorrect) return a.lastCorrect ? 1 : -1;
      const ratioA = a.correct / a.seen;
      const ratioB = b.correct / b.seen;
      if (ratioA !== ratioB) return ratioA - ratioB;
      return b.lastSeenAt.localeCompare(a.lastSeenAt);
    });
}
