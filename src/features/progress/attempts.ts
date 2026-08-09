/**
 * Exam history storage, and the bridge between the device cache and Supabase.
 *
 * The device cache is the source the UI reads: it answers instantly, works
 * offline, and is the only store a guest ever touches. Supabase is the durable
 * copy — it is what survives a reinstall or a new phone. Every write goes to the
 * cache first and is pushed afterwards, so a failed network call costs the
 * learner nothing.
 */

import { MAX_NAME_LENGTH } from '@/features/auth/validation';
import { EXAM_MODES, PASS_THRESHOLD, type ExamMode } from '@/features/exam/engine';
import type { LanguageCode } from '@/i18n';
import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';
import { supabase } from '@/lib/supabase';

export type ExamAttemptRecord = {
  /**
   * Stable id minted on the device. It is what makes the push idempotent: an
   * attempt pushed twice — a retry overlapping a sync, or a queued offline
   * attempt going up late — lands on the same row instead of appearing in the
   * learner's history twice.
   */
  id: string;
  mode: ExamMode;
  percent: number;
  passed: boolean;
  correct: number;
  total: number;
  /** Seconds spent on the attempt. Optional: records written before this field. */
  durationSeconds?: number;
  /** ISO timestamp of when the attempt was graded. */
  at: string;
};

/**
 * Cached attempts plus the account they belong to.
 *
 * The owner is what stops one person's history being shown to the next account
 * signed in on the same phone. `null` means the attempts are device-local —
 * either a guest's, or made before anyone signed in.
 */
type AttemptCache = {
  ownerId: string | null;
  attempts: ExamAttemptRecord[];
};

const EMPTY: AttemptCache = { ownerId: null, attempts: [] };

/**
 * How many attempts the device keeps. Supabase keeps every one; this is only a
 * bound on the local cache so it cannot grow without limit.
 */
export const CACHE_LIMIT = 50;

export function newAttemptId(): string {
  // Not a UUID — the column is text and only has to be unique per user. Time
  // prefix plus randomness is enough, and avoids pulling in a crypto polyfill.
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

/**
 * Ids for records written before `id` existed, derived from fields that were
 * already there. Deterministic on purpose — running the migration twice must
 * produce the same id, or the same attempt would sync as two.
 */
function legacyId(record: { at: string; mode: string }): string {
  return `legacy-${record.mode}-${record.at}`;
}

function sortNewestFirst(attempts: ExamAttemptRecord[]): ExamAttemptRecord[] {
  return [...attempts].sort((a, b) => b.at.localeCompare(a.at));
}

function dedupe(attempts: ExamAttemptRecord[]): ExamAttemptRecord[] {
  const byId = new Map<string, ExamAttemptRecord>();
  for (const attempt of attempts) {
    if (!byId.has(attempt.id)) byId.set(attempt.id, attempt);
  }
  return [...byId.values()];
}

/**
 * Turns one cached entry into a record, or null when it is not one.
 *
 * This is the local counterpart of `parseAttemptRow`, and it exists for the
 * same reason: the cache is a boundary, and what comes back over it is not
 * guaranteed to be what was written. It is read from AsyncStorage — plaintext
 * on both platforms, and editable on a rooted device — and it can also hold
 * records written by an *older build* whose modes or fields differed.
 *
 * The remote boundary was already checked and this one was not, which left the
 * two disagreeing about the same data. That gap is reachable: the exam home
 * indexes `MODE_META[attempt.mode]` to label a history row, so a cached attempt
 * carrying an unknown mode dereferences `undefined` and takes the whole tab down
 * to the crash screen — and it does it on every launch, because the bad record
 * is *persisted*. The other fields are milder but visible in the same list:
 * a missing `percent` renders as `undefined%`.
 *
 * Dropping an unreadable entry is better than rendering it. The bound is one
 * record: everything else in the cache still loads.
 */
function parseCachedAttempt(value: unknown): ExamAttemptRecord | null {
  if (typeof value !== 'object' || value === null) return null;
  const a = value as Partial<ExamAttemptRecord>;

  // `at` is the sort key and the fallback id's only distinguishing part, so an
  // entry without one cannot be placed in the history at all.
  if (typeof a.at !== 'string' || Number.isNaN(Date.parse(a.at))) return null;
  if (typeof a.mode !== 'string' || !VALID_MODES.has(a.mode)) return null;
  if (typeof a.percent !== 'number' || !Number.isFinite(a.percent)) return null;
  if (typeof a.passed !== 'boolean') return null;
  if (typeof a.correct !== 'number' || !Number.isFinite(a.correct)) return null;
  if (typeof a.total !== 'number' || !Number.isFinite(a.total)) return null;

  const duration =
    typeof a.durationSeconds === 'number' && Number.isFinite(a.durationSeconds)
      ? a.durationSeconds
      : undefined;

  return {
    // Records written before `id` existed get a deterministic one derived from
    // fields that were already there — see `legacyId`.
    id: typeof a.id === 'string' && a.id.length > 0 ? a.id : legacyId({ at: a.at, mode: a.mode }),
    mode: a.mode as ExamMode,
    percent: a.percent,
    passed: a.passed,
    correct: a.correct,
    total: a.total,
    durationSeconds: duration,
    at: a.at,
  };
}

/**
 * Reads the cache, upgrading the pre-sync shape on the way.
 *
 * The key used to hold a bare array with no ids and no owner. Those attempts
 * are treated as device-local so the first account to sign in adopts them,
 * rather than being thrown away.
 *
 * Every entry goes through `parseCachedAttempt`; see there for why the cache is
 * validated rather than trusted.
 */
export async function readAttemptCache(): Promise<AttemptCache> {
  const raw = await readJSON<unknown>(StorageKeys.examHistory, null);
  if (raw == null) return EMPTY;

  const parseAll = (entries: unknown[]): ExamAttemptRecord[] =>
    entries
      .map(parseCachedAttempt)
      .filter((a): a is ExamAttemptRecord => a !== null);

  if (Array.isArray(raw)) {
    return { ownerId: null, attempts: sortNewestFirst(parseAll(raw)) };
  }

  const cache = raw as Partial<AttemptCache>;
  if (!Array.isArray(cache.attempts)) return EMPTY;
  return {
    ownerId: typeof cache.ownerId === 'string' ? cache.ownerId : null,
    attempts: parseAll(cache.attempts),
  };
}

async function writeAttemptCache(cache: AttemptCache): Promise<void> {
  await writeJSON(StorageKeys.examHistory, {
    ownerId: cache.ownerId,
    attempts: sortNewestFirst(cache.attempts).slice(0, CACHE_LIMIT),
  });
}

/** Adds a freshly graded attempt to the cache and returns the new history. */
export async function saveAttemptLocally(
  record: ExamAttemptRecord,
  ownerId: string | null,
): Promise<ExamAttemptRecord[]> {
  const cache = await readAttemptCache();
  const attempts = sortNewestFirst(dedupe([record, ...cache.attempts])).slice(
    0,
    CACHE_LIMIT,
  );
  await writeAttemptCache({ ownerId, attempts });
  return attempts;
}

/** Drops every cached attempt. Used on account deletion. */
export async function clearAttemptCache(): Promise<void> {
  await writeAttemptCache(EMPTY);
}

/**
 * Drops the cache only when it belongs to an account.
 *
 * "Sign out" covers two different things on this screen: leaving a real
 * account, and leaving guest mode. They need different answers.
 *
 * Leaving an account must clear the cache — the attempts are in Supabase by
 * then, and leaving them here would show one person's history to whoever signs
 * in on this phone next.
 *
 * Leaving guest mode must **not**. A guest's attempts exist nowhere else, and
 * `ownerId: null` is exactly the state `syncAttempts` adopts into the first
 * account that signs in — that adoption path is why the field is nullable at
 * all. Clearing unconditionally destroyed the practice history of every learner
 * who tried the app first and registered afterwards, at the moment they went to
 * register, and there was nothing to restore it from.
 *
 * Nothing is given away by keeping it: a device-local cache has no account
 * behind it to protect, and a signed-in user still never sees a cache owned by
 * someone else — `syncAttempts` drops those before anything is read or pushed.
 */
export async function clearAccountAttemptCache(): Promise<void> {
  const cache = await readAttemptCache();
  if (cache.ownerId === null) return;
  await writeAttemptCache(EMPTY);
}

/**
 * Upper bound on `client_id`, mirroring the `exam_attempts_client_id_length`
 * CHECK in `20260803170000_bound_user_input.sql`.
 */
const MAX_CLIENT_ID_LENGTH = 64;

/**
 * How far ahead of now a `taken_at` may sit, matching
 * `exam_attempts_taken_at_not_future`. The slack absorbs device clock skew.
 */
const MAX_CLOCK_SKEW_MS = 24 * 60 * 60 * 1000;

const VALID_MODES = new Set<string>(Object.keys(EXAM_MODES));

/**
 * Whether the remote table would accept this record.
 *
 * ## Why this is not paranoia
 *
 * The push in `syncAttempts` is **one batch upsert**, and Postgres fails a
 * batch as a unit: a single row violating a single CHECK rejects every other
 * row with it. The error is deliberately ignored there — a failed push is meant
 * to cost the learner nothing, because the attempts stay cached and go up next
 * time.
 *
 * Those two facts compose badly. One malformed record in the cache — a
 * hand-edited file on a rooted device, a record written by a build whose
 * grading differed, an `at` from a phone whose clock was wrong — makes *every*
 * subsequent sync fail silently, forever. The learner's history simply stops
 * reaching the server, and nothing anywhere says so.
 *
 * Filtering first means a bad row costs only itself. It stays in the local
 * cache and keeps showing in the history — it is still the user's result, and
 * deleting their data to satisfy a constraint would be the wrong trade — it
 * just never joins a batch it would sink.
 *
 * Each clause below restates one constraint from the migrations. They are
 * coupled on purpose: this is the client-side statement of the same rules, and
 * `attempts.test.ts` asserts the pairing.
 */
export function isPushable(record: ExamAttemptRecord): boolean {
  // `unique (user_id, client_id)` is the dedupe key, `length between 1 and 64`,
  // and `btrim(client_id) <> ''`. An empty id would also collapse unrelated
  // attempts onto one row. The trim check mirrors
  // `exam_attempts_client_id_not_blank`: a whitespace-only id clears the length
  // bound but is not a usable dedupe key.
  if (
    typeof record.id !== 'string' ||
    record.id.trim().length === 0 ||
    record.id.length > MAX_CLIENT_ID_LENGTH
  ) {
    return false;
  }

  if (!VALID_MODES.has(record.mode)) return false;

  // `correct >= 0`, `total > 0`, `correct <= total`, `percent between 0 and
  // 100`. Integer checks matter independently: the columns are `integer`, so a
  // float is rejected by Postgres rather than rounded.
  if (!Number.isInteger(record.correct) || record.correct < 0) return false;
  if (!Number.isInteger(record.total) || record.total <= 0) return false;
  if (record.correct > record.total) return false;
  if (
    !Number.isInteger(record.percent) ||
    record.percent < 0 ||
    record.percent > 100
  ) {
    return false;
  }

  // `percent = round((correct::numeric / total) * 100)`, from
  // 20260804120000_tighten_user_data.sql. Without this the other clauses admit
  // `correct: 0, total: 30, percent: 100` — a nought-out-of-thirty attempt
  // rendered as a perfect score, which then poisons every comparison drawn
  // against it. `Math.round` and Postgres `round(numeric)` agree at .5 for
  // positive values, so the client and the constraint round identically.
  if (record.percent !== Math.round((record.correct / record.total) * 100)) {
    return false;
  }

  // `passed = (percent >= 60)`, from 20260806090000_pass_threshold_60.sql. The
  // threshold lives in one place in the client and is read from there, so this
  // clause follows `PASS_THRESHOLD` automatically; the migration restates it as
  // a literal and does not. Changing one means changing both — `engine.ts` and
  // the migration comment both say so too.
  if (record.passed !== record.percent >= PASS_THRESHOLD * 100) return false;

  // `duration_seconds is null or >= 0`.
  if (record.durationSeconds !== undefined) {
    if (
      !Number.isInteger(record.durationSeconds) ||
      record.durationSeconds < 0
    ) {
      return false;
    }
  }

  // `taken_at <= now() + interval '1 day'`, plus a parseability check: `at` is
  // sent as a string and an unparseable one is a 400 for the whole batch.
  const takenAt = Date.parse(record.at);
  if (Number.isNaN(takenAt)) return false;
  if (takenAt > Date.now() + MAX_CLOCK_SKEW_MS) return false;

  return true;
}

type AttemptRow = {
  client_id: string;
  mode: ExamMode;
  percent: number;
  passed: boolean;
  correct: number;
  total: number;
  duration_seconds: number | null;
  taken_at: string;
};

/**
 * Turns one PostgREST row into a record, or null when it is not one.
 *
 * The previous `as AttemptRow[]` cast asserted a shape rather than checking it.
 * RLS guarantees these rows belong to the caller, but it guarantees nothing
 * about their *shape* — a column renamed by a later migration, a partially
 * applied schema, or a select whose projection drifted all arrive as `undefined`
 * fields that then flow into the cache and onto the results screen as `NaN%`.
 * Dropping an unreadable row is better than rendering it.
 */
function parseAttemptRow(row: unknown): ExamAttemptRecord | null {
  if (typeof row !== 'object' || row === null) return null;
  const r = row as Partial<AttemptRow>;

  if (typeof r.client_id !== 'string' || r.client_id.length === 0) return null;
  if (typeof r.mode !== 'string' || !VALID_MODES.has(r.mode)) return null;
  if (typeof r.percent !== 'number' || !Number.isFinite(r.percent)) return null;
  if (typeof r.passed !== 'boolean') return null;
  if (typeof r.correct !== 'number' || !Number.isFinite(r.correct)) return null;
  if (typeof r.total !== 'number' || !Number.isFinite(r.total)) return null;
  if (typeof r.taken_at !== 'string' || Number.isNaN(Date.parse(r.taken_at))) {
    return null;
  }

  const duration =
    typeof r.duration_seconds === 'number' && Number.isFinite(r.duration_seconds)
      ? r.duration_seconds
      : undefined;

  return {
    id: r.client_id,
    mode: r.mode as ExamMode,
    percent: r.percent,
    passed: r.passed,
    correct: r.correct,
    total: r.total,
    durationSeconds: duration,
    at: r.taken_at,
  };
}

function toRow(record: ExamAttemptRecord, userId: string) {
  return {
    user_id: userId,
    client_id: record.id,
    mode: record.mode,
    percent: record.percent,
    passed: record.passed,
    correct: record.correct,
    total: record.total,
    duration_seconds: record.durationSeconds ?? null,
    taken_at: record.at,
  };
}

/**
 * Pushes one attempt. Returns false when it could not be stored remotely — the
 * caller has already written it to the cache, so the next `syncAttempts` picks
 * it up and retries.
 */
export async function pushAttempt(
  record: ExamAttemptRecord,
  userId: string,
): Promise<boolean> {
  if (!supabase) return false;
  // Checked before the round-trip rather than after the rejection: a record the
  // table cannot accept will not become acceptable on a retry, so there is
  // nothing to gain from asking.
  if (!isPushable(record)) return false;
  const { error } = await supabase
    .from('exam_attempts')
    .upsert(toRow(record, userId), { onConflict: 'user_id,client_id' });
  return !error;
}

/**
 * Reconciles the device cache with the account's remote history.
 *
 * Runs when a user signs in and on app start. The order matters: local-only
 * attempts are pushed *before* the pull, so the merged result already contains
 * them and an attempt graded offline is never dropped.
 *
 * Returns the history the UI should show. On a network failure it returns
 * whatever is cached rather than an empty list — being offline must not look
 * like having no history.
 */
export async function syncAttempts(userId: string): Promise<ExamAttemptRecord[]> {
  const cache = await readAttemptCache();

  // Attempts belonging to a *different* account never carry over, network or
  // not. Signing in as someone else must not surface the previous user's
  // history, so they are dropped before anything is pushed.
  const carried = cache.ownerId === null || cache.ownerId === userId
    ? cache.attempts
    : [];

  if (!supabase) {
    await writeAttemptCache({ ownerId: userId, attempts: carried });
    return sortNewestFirst(carried);
  }

  // Postgres rejects a batch as a unit, so one record the table would refuse
  // takes every other attempt down with it — silently, because the error below
  // is ignored by design. Filtering here keeps the cost of a bad record to
  // itself; it stays in the cache and on screen, it just never sinks a batch.
  const pushable = carried.filter(isPushable);

  if (pushable.length > 0) {
    // One round-trip for the batch. A failure here is not fatal: the pull below
    // still runs, and these attempts stay in the cache to be retried next time.
    await supabase
      .from('exam_attempts')
      .upsert(pushable.map((a) => toRow(a, userId)), {
        onConflict: 'user_id,client_id',
      });
  }

  const { data, error } = await supabase
    .from('exam_attempts')
    .select('client_id, mode, percent, passed, correct, total, duration_seconds, taken_at')
    .eq('user_id', userId)
    .order('taken_at', { ascending: false })
    .limit(CACHE_LIMIT);

  if (error || !data) {
    await writeAttemptCache({ ownerId: userId, attempts: carried });
    return sortNewestFirst(carried);
  }

  // Remote first so it wins on id collisions; anything local that failed to
  // push survives the merge and is retried on the next sync. Unreadable rows
  // are dropped rather than rendered — see `parseAttemptRow`.
  const remote = (data as unknown[])
    .map(parseAttemptRow)
    .filter((r): r is ExamAttemptRecord => r !== null);

  const merged = sortNewestFirst(dedupe([...remote, ...carried])).slice(
    0,
    CACHE_LIMIT,
  );

  await writeAttemptCache({ ownerId: userId, attempts: merged });
  return merged;
}

/**
 * Mirrors the account's display name and study language into `profiles`.
 *
 * Best-effort and deliberately silent: this is a convenience copy for querying
 * from SQL, and failing to write it must never block signing in or switching
 * language.
 */
export async function syncProfile(
  userId: string,
  displayName: string | null,
  locale: LanguageCode,
): Promise<void> {
  if (!supabase) return;
  // Truncated to the `profiles_display_name_length` bound. The forms already
  // enforce `MAX_NAME_LENGTH`, so this only catches a name that predates them
  // or arrived through `user_metadata` some other way — but because this call
  // is fire-and-forget, a CHECK violation here would be swallowed whole, and
  // the profile row would silently stop tracking the account's name with
  // nothing on screen to show for it.
  const bounded =
    displayName === null ? null : displayName.slice(0, MAX_NAME_LENGTH);
  await supabase
    .from('profiles')
    .upsert({ id: userId, display_name: bounded, locale }, { onConflict: 'id' });
}
