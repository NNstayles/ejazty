/**
 * Tests for the attempt cache and the Supabase sync bridge.
 *
 * Two things here are worth more than the rest put together:
 *
 *  - the **owner check**, which is what stops one person's exam history being
 *    shown to the next account signed in on the same phone; and
 *  - the **offline fallback**, because a sync that returned an empty list on a
 *    network error would look exactly like having lost every attempt.
 *
 * Both fail silently in manual testing — you would have to sign in as two
 * different people on one device, or pull the network at the right moment, to
 * notice. That is what makes them worth pinning down here.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  CACHE_LIMIT,
  clearAccountAttemptCache,
  clearAttemptCache,
  isPushable,
  newAttemptId,
  readAttemptCache,
  saveAttemptLocally,
  syncAttempts,
  type ExamAttemptRecord,
} from './attempts';

jest.mock('@react-native-async-storage/async-storage', () =>
  // `require`, not `import`: jest.mock factories are hoisted above the import
  // block, so an imported binding would not exist yet when this runs.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

/**
 * Swappable Supabase stand-in. `null` models an unconfigured build — the state
 * a guest, or anyone running without credentials, is always in.
 */
const mockSupabase: { client: unknown } = { client: null };

jest.mock('@/lib/supabase', () => ({
  get supabase() {
    return mockSupabase.client;
  },
  isSupabaseConfigured: true,
}));

const STORAGE_KEY = 'ejazty.exam.history';

function attempt(overrides: Partial<ExamAttemptRecord> = {}): ExamAttemptRecord {
  return {
    id: 'a1',
    mode: 'full',
    percent: 80,
    passed: true,
    correct: 24,
    total: 30,
    durationSeconds: 900,
    at: '2026-08-01T10:00:00.000Z',
    ...overrides,
  };
}

/** Row shape as it comes back from Postgres (snake_case). */
function row(overrides: Record<string, unknown> = {}) {
  return {
    client_id: 'remote-1',
    mode: 'full',
    percent: 90,
    passed: true,
    correct: 27,
    total: 30,
    duration_seconds: 800,
    taken_at: '2026-08-02T10:00:00.000Z',
    ...overrides,
  };
}

/**
 * Builds a Supabase double for the two calls `attempts.ts` makes: an `upsert`
 * for the push and a `select(...).eq(...).order(...).limit(...)` for the pull.
 */
function supabaseDouble({
  selectResult,
  upsertResult = { error: null },
}: {
  selectResult: { data: unknown[] | null; error: unknown };
  upsertResult?: { error: unknown };
}) {
  const upsert = jest.fn().mockResolvedValue(upsertResult);
  const limit = jest.fn().mockResolvedValue(selectResult);
  const order = jest.fn(() => ({ limit }));
  const eq = jest.fn(() => ({ order }));
  const select = jest.fn(() => ({ eq }));

  return { client: { from: jest.fn(() => ({ upsert, select })) }, upsert, select };
}

beforeEach(async () => {
  await AsyncStorage.clear();
  mockSupabase.client = null;
});

describe('newAttemptId', () => {
  it('does not collide across rapid successive calls', () => {
    // Attempts are only ever minted one at a time in practice, but the id is
    // the dedupe key for the remote upsert — a collision would merge two
    // separate attempts into one row.
    const ids = new Set(Array.from({ length: 500 }, () => newAttemptId()));

    expect(ids.size).toBe(500);
  });
});

describe('readAttemptCache', () => {
  it('returns an empty device-local cache when nothing is stored', async () => {
    expect(await readAttemptCache()).toEqual({ ownerId: null, attempts: [] });
  });

  it('survives a corrupt entry instead of crashing boot', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'not json{');

    expect(await readAttemptCache()).toEqual({ ownerId: null, attempts: [] });
  });

  describe('migrating the pre-sync storage shape', () => {
    // The key used to hold a bare array with no ids and no owner.
    const legacy = [
      { mode: 'full', percent: 70, passed: false, correct: 21, total: 30, at: '2026-07-01T09:00:00.000Z' },
      { mode: 'quick', percent: 90, passed: true, correct: 9, total: 10, at: '2026-07-02T09:00:00.000Z' },
    ];

    it('adopts legacy attempts as device-local rather than discarding them', async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));

      const cache = await readAttemptCache();

      // `null` owner is what lets the first account to sign in claim them.
      expect(cache.ownerId).toBeNull();
      expect(cache.attempts).toHaveLength(2);
      for (const record of cache.attempts) {
        expect(record.id).toEqual(expect.stringMatching(/.+/));
      }
    });

    it('derives ids deterministically so migrating twice cannot duplicate', async () => {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
      const first = (await readAttemptCache()).attempts.map((a) => a.id);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(legacy));
      const second = (await readAttemptCache()).attempts.map((a) => a.id);

      expect(second).toEqual(first);
    });

    it('drops entries with no timestamp to sort by', async () => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([...legacy, { mode: 'full', percent: 50 }]),
      );

      expect((await readAttemptCache()).attempts).toHaveLength(2);
    });
  });

  /**
   * The cache is a boundary, and it was the one boundary here that asserted its
   * shape instead of checking it — `parseAttemptRow` already guarded the remote
   * side. What makes it worth pinning is that the damage is *persisted*: the
   * exam home labels a history row by indexing `MODE_META[attempt.mode]`, so one
   * cached attempt carrying a mode that is no longer a key dereferences
   * `undefined` and takes the tab down to the crash screen on every launch,
   * with no way for the user to clear it from inside the app.
   */
  describe('rejecting entries the history screen cannot render', () => {
    const good = {
      id: 'ok',
      mode: 'full',
      percent: 70,
      passed: true,
      correct: 21,
      total: 30,
      at: '2026-07-01T09:00:00.000Z',
    };

    const unrenderable: [string, Record<string, unknown>][] = [
      ['a mode that is not an exam mode', { ...good, id: 'bad', mode: 'marathon' }],
      ['a missing mode', { ...good, id: 'bad', mode: undefined }],
      ['a percent that is not a number', { ...good, id: 'bad', percent: null }],
      ['a NaN percent', { ...good, id: 'bad', percent: Number.NaN }],
      ['a missing passed flag', { ...good, id: 'bad', passed: undefined }],
      ['a missing correct count', { ...good, id: 'bad', correct: undefined }],
      ['an unparseable timestamp', { ...good, id: 'bad', at: 'whenever' }],
    ];

    it.each(unrenderable)('drops an attempt with %s', async (_label, bad) => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ ownerId: null, attempts: [good, bad] }),
      );

      const { attempts } = await readAttemptCache();

      expect(attempts.map((a) => a.id)).toEqual(['ok']);
    });

    it('keeps the rest of the cache when one entry is unreadable', async () => {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          ownerId: 'user-1',
          attempts: [good, { ...good, id: 'bad', mode: 'marathon' }, { ...good, id: 'ok2' }],
        }),
      );

      const cache = await readAttemptCache();

      // The owner survives too: a bad row must not degrade the cache to
      // device-local, which is what would let the next account adopt it.
      expect(cache.ownerId).toBe('user-1');
      expect(cache.attempts.map((a) => a.id).sort()).toEqual(['ok', 'ok2']);
    });

    it('applies the same rule to the legacy array shape', async () => {
      // The bare-array shape predates `id`, so these carry none — the point is
      // that the check runs on that path too, not only on the current one.
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify([
          { ...good, id: undefined },
          { ...good, id: undefined, at: '2026-07-02T09:00:00.000Z', mode: 'marathon' },
        ]),
      );

      const { attempts } = await readAttemptCache();

      expect(attempts).toHaveLength(1);
      expect(attempts[0].mode).toBe('full');
    });
  });
});

describe('saveAttemptLocally', () => {
  it('returns the new attempt at the head of the history', async () => {
    const history = await saveAttemptLocally(attempt(), null);

    expect(history).toHaveLength(1);
    expect(history[0].id).toBe('a1');
  });

  it('orders history newest first regardless of insertion order', async () => {
    await saveAttemptLocally(attempt({ id: 'older', at: '2026-08-01T10:00:00.000Z' }), null);
    const history = await saveAttemptLocally(
      attempt({ id: 'newer', at: '2026-08-03T10:00:00.000Z' }),
      null,
    );

    expect(history.map((a) => a.id)).toEqual(['newer', 'older']);
  });

  it('does not duplicate an attempt saved twice', async () => {
    // The same id landing twice — a retry, or a double submit — must collapse.
    await saveAttemptLocally(attempt({ id: 'dupe' }), null);
    const history = await saveAttemptLocally(attempt({ id: 'dupe' }), null);

    expect(history).toHaveLength(1);
  });

  it('bounds the cache so it cannot grow without limit', async () => {
    for (let i = 0; i < CACHE_LIMIT + 10; i++) {
      await saveAttemptLocally(
        attempt({
          id: `a${i}`,
          // Ascending timestamps, so the newest are the ones that survive.
          at: new Date(Date.UTC(2026, 0, 1, 0, 0, i)).toISOString(),
        }),
        null,
      );
    }

    const cache = await readAttemptCache();
    expect(cache.attempts).toHaveLength(CACHE_LIMIT);
    // The oldest is the one evicted, not the newest.
    expect(cache.attempts.map((a) => a.id)).not.toContain('a0');
  });

  it('records the owner alongside the attempts', async () => {
    await saveAttemptLocally(attempt(), 'user-1');

    expect((await readAttemptCache()).ownerId).toBe('user-1');
  });
});

describe('clearAttemptCache', () => {
  it('drops every attempt and releases ownership', async () => {
    await saveAttemptLocally(attempt(), 'user-1');
    await clearAttemptCache();

    expect(await readAttemptCache()).toEqual({ ownerId: null, attempts: [] });
  });
});

/**
 * The sign-out path, which has to tell two situations apart that reach it
 * through the same button.
 *
 * Neither direction is visible by hand without a second account and a fair
 * amount of patience, and getting the guest case wrong destroys data with
 * nothing to restore it from — the attempts exist on the device and nowhere
 * else, and the moment they are destroyed is the moment the learner goes to
 * register.
 */
describe('clearAccountAttemptCache', () => {
  it("drops an account's attempts, so the next person to sign in cannot see them", async () => {
    await saveAttemptLocally(attempt(), 'user-1');

    await clearAccountAttemptCache();

    expect(await readAttemptCache()).toEqual({ ownerId: null, attempts: [] });
  });

  it("keeps a guest's attempts, so the account they go on to create adopts them", async () => {
    await saveAttemptLocally(attempt({ id: 'practised-as-guest' }), null);

    await clearAccountAttemptCache();

    const cache = await readAttemptCache();
    expect(cache.ownerId).toBeNull();
    expect(cache.attempts.map((a) => a.id)).toEqual(['practised-as-guest']);
  });

  it('leaves those kept attempts adoptable by the next sign-in', async () => {
    // The whole point of the previous test, stated end to end: practise as a
    // guest, leave guest mode to register, sign in — the history is still there.
    await saveAttemptLocally(attempt({ id: 'practised-as-guest' }), null);
    await clearAccountAttemptCache();

    const result = await syncAttempts('user-1');

    expect(result.map((a) => a.id)).toEqual(['practised-as-guest']);
    expect((await readAttemptCache()).ownerId).toBe('user-1');
  });
});

describe('syncAttempts — the owner boundary', () => {
  it("discards another account's cached attempts", async () => {
    // The case this exists for: someone signs out, someone else signs in on the
    // same phone. Their history must not appear.
    await saveAttemptLocally(attempt({ id: 'theirs' }), 'user-1');

    const result = await syncAttempts('user-2');

    expect(result).toEqual([]);
    const cache = await readAttemptCache();
    expect(cache.ownerId).toBe('user-2');
    expect(cache.attempts).toEqual([]);
  });

  it("discards another account's attempts even with no network", async () => {
    // Unconfigured/offline is the path where it would be tempting to keep them
    // "until we can check". It must not.
    mockSupabase.client = null;
    await saveAttemptLocally(attempt({ id: 'theirs' }), 'user-1');

    expect(await syncAttempts('user-2')).toEqual([]);
  });

  it('adopts a device-local cache for the first account to sign in', async () => {
    // A guest's attempts, or ones made before anyone signed in, belong to
    // whoever signs in first — throwing them away would lose real work.
    await saveAttemptLocally(attempt({ id: 'guest-attempt' }), null);

    const result = await syncAttempts('user-1');

    expect(result.map((a) => a.id)).toEqual(['guest-attempt']);
    expect((await readAttemptCache()).ownerId).toBe('user-1');
  });

  it('keeps the same account’s own attempts', async () => {
    await saveAttemptLocally(attempt({ id: 'mine' }), 'user-1');

    expect((await syncAttempts('user-1')).map((a) => a.id)).toEqual(['mine']);
  });
});

describe('syncAttempts — reconciling with the server', () => {
  it('pushes local attempts before pulling, so offline ones are not lost', async () => {
    const double = supabaseDouble({ selectResult: { data: [row()], error: null } });
    mockSupabase.client = double.client;
    await saveAttemptLocally(attempt({ id: 'graded-offline' }), 'user-1');

    const result = await syncAttempts('user-1');

    expect(double.upsert).toHaveBeenCalled();
    // Both the pushed local attempt and the remote one come back.
    expect(result.map((a) => a.id).sort()).toEqual(['graded-offline', 'remote-1']);
  });

  it('dedupes an attempt that exists both locally and remotely', async () => {
    // Same client id on both sides — the normal case after a successful push.
    const double = supabaseDouble({
      selectResult: { data: [row({ client_id: 'shared' })], error: null },
    });
    mockSupabase.client = double.client;
    await saveAttemptLocally(attempt({ id: 'shared', percent: 80 }), 'user-1');

    const result = await syncAttempts('user-1');

    expect(result).toHaveLength(1);
    // Remote wins the collision.
    expect(result[0].percent).toBe(90);
  });

  it('returns cached attempts, not an empty list, when the pull fails', async () => {
    // Being offline must not look like having no history.
    const double = supabaseDouble({
      selectResult: { data: null, error: { message: 'network down' } },
    });
    mockSupabase.client = double.client;
    await saveAttemptLocally(attempt({ id: 'cached' }), 'user-1');

    const result = await syncAttempts('user-1');

    expect(result.map((a) => a.id)).toEqual(['cached']);
  });

  it('keeps a failed push in the cache so the next sync retries it', async () => {
    const double = supabaseDouble({
      selectResult: { data: null, error: { message: 'network down' } },
      upsertResult: { error: { message: 'network down' } },
    });
    mockSupabase.client = double.client;
    await saveAttemptLocally(attempt({ id: 'pending' }), 'user-1');

    await syncAttempts('user-1');

    expect((await readAttemptCache()).attempts.map((a) => a.id)).toEqual(['pending']);
  });

  it('maps remote rows back into the app’s shape', async () => {
    const double = supabaseDouble({ selectResult: { data: [row()], error: null } });
    mockSupabase.client = double.client;

    const [record] = await syncAttempts('user-1');

    expect(record).toEqual({
      id: 'remote-1',
      mode: 'full',
      percent: 90,
      passed: true,
      correct: 27,
      total: 30,
      durationSeconds: 800,
      at: '2026-08-02T10:00:00.000Z',
    });
  });

  it('tolerates a remote row with no recorded duration', async () => {
    // The column is nullable for attempts written before it existed.
    const double = supabaseDouble({
      selectResult: { data: [row({ duration_seconds: null })], error: null },
    });
    mockSupabase.client = double.client;

    const [record] = await syncAttempts('user-1');

    expect(record.durationSeconds).toBeUndefined();
  });

  it('skips the push entirely when there is nothing local to send', async () => {
    const double = supabaseDouble({ selectResult: { data: [], error: null } });
    mockSupabase.client = double.client;

    await syncAttempts('user-1');

    expect(double.upsert).not.toHaveBeenCalled();
  });
});

describe('isPushable', () => {
  /**
   * Each case below restates one CHECK constraint from the migrations. They are
   * a pair on purpose: the client filter exists so a record the table would
   * reject never joins a batch, and if the two drift the filter stops
   * protecting anything.
   */
  it('accepts an ordinary graded attempt', () => {
    expect(isPushable(attempt())).toBe(true);
  });

  it.each([
    ['an empty client id', { id: '' }],
    ['a client id past the 64-character bound', { id: 'x'.repeat(65) }],
    ['a mode the column does not allow', { mode: 'marathon' as never }],
    ['a negative correct count', { correct: -1, percent: 0, passed: false }],
    ['a zero total', { total: 0, correct: 0, percent: 0, passed: false }],
    ['more correct than total', { correct: 31, total: 30 }],
    ['a percent above 100', { percent: 101 }],
    ['a fractional percent', { percent: 80.5 }],
    ['a negative duration', { durationSeconds: -1 }],
    ['an unparseable timestamp', { at: 'yesterday' }],
  ])('rejects %s', (_label, overrides) => {
    expect(isPushable(attempt(overrides as Partial<ExamAttemptRecord>))).toBe(false);
  });

  it('rejects a passed flag that disagrees with the percent', () => {
    // `exam_attempts_passed_matches_percent` restates the grading rule in SQL.
    // A record claiming a pass at 40% is rejected by the table, and one bad
    // record used to reject the whole batch with it.
    expect(isPushable(attempt({ percent: 40, passed: true, correct: 12 }))).toBe(
      false,
    );
    expect(isPushable(attempt({ percent: 90, passed: false, correct: 27 }))).toBe(
      false,
    );
  });

  it('holds the pass mark at 60, matching the constraint and the answer bank', () => {
    // Three coupled sites: PASS_THRESHOLD, this filter, and the SQL literal in
    // 20260806090000_pass_threshold_60.sql. A mutation to any one of them
    // should fail here.
    //
    // 18 of 30 is exactly 60, the boundary itself, which is the value most
    // worth pinning: `>=` versus `>` is the off-by-one that would fail a
    // learner on the exact mark the app told them to hit.
    expect(isPushable(attempt({ percent: 60, passed: true, correct: 18 }))).toBe(
      true,
    );
    expect(isPushable(attempt({ percent: 60, passed: false, correct: 18 }))).toBe(
      false,
    );
    // 17 of 30 is 56.67, which rounds to 57 — there is no 30-question score
    // that lands on 59. The fixtures have to be arithmetically real now that
    // `exam_attempts_percent_matches_score` is enforced, so this uses the
    // genuine score one step below the pass mark rather than a round number.
    expect(isPushable(attempt({ percent: 57, passed: false, correct: 17 }))).toBe(
      true,
    );
    expect(isPushable(attempt({ percent: 57, passed: true, correct: 17 }))).toBe(
      false,
    );
  });

  it('rejects a percent that does not match the score it claims to describe', () => {
    // `exam_attempts_percent_matches_score` (20260804120000). Every other
    // clause admits this row: correct >= 0, total > 0, correct <= total,
    // percent in range, and `passed` agrees with `percent`. Only this rule
    // catches nought out of thirty being stored as a perfect score.
    expect(
      isPushable(attempt({ correct: 0, total: 30, percent: 100, passed: true })),
    ).toBe(false);

    // The subtler direction: off by a single point, which is what a rounding
    // change or a hand-edited cache actually produces.
    expect(
      isPushable(attempt({ correct: 24, total: 30, percent: 81, passed: true })),
    ).toBe(false);

    // And the honest row still goes up.
    expect(
      isPushable(attempt({ correct: 24, total: 30, percent: 80, passed: true })),
    ).toBe(true);
  });

  it('rounds percent the way Postgres does, so client and constraint agree', () => {
    // 25 of 30 is 83.33 -> 83; 26 of 30 is 86.67 -> 87. A client that truncated
    // instead of rounding would send 83 and 86, and the second would be
    // rejected by the table — silently, since the push ignores its error.
    expect(
      isPushable(attempt({ correct: 25, total: 30, percent: 83, passed: true })),
    ).toBe(true);
    expect(
      isPushable(attempt({ correct: 26, total: 30, percent: 87, passed: true })),
    ).toBe(true);
    expect(
      isPushable(attempt({ correct: 26, total: 30, percent: 86, passed: true })),
    ).toBe(false);
  });

  it('rejects a whitespace-only client id', () => {
    // `exam_attempts_client_id_not_blank`. The length bound alone admits it,
    // but it is the dedupe key — a blank one collapses unrelated attempts.
    expect(isPushable(attempt({ id: '   ' }))).toBe(false);
  });

  it('rejects a timestamp further ahead than clock skew explains', () => {
    const wayAhead = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

    expect(isPushable(attempt({ at: wayAhead }))).toBe(false);
  });

  it('allows a timestamp slightly ahead, since device clocks drift', () => {
    const slightlyAhead = new Date(Date.now() + 60 * 60 * 1000).toISOString();

    expect(isPushable(attempt({ at: slightlyAhead }))).toBe(true);
  });
});

describe('syncAttempts row integrity', () => {
  it('pushes the good attempts even when a bad one is cached alongside', async () => {
    // The regression this exists for: Postgres fails a batch as a unit and the
    // push error is deliberately ignored, so a single unacceptable record used
    // to stop every attempt syncing — silently, and for good.
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ownerId: null,
        attempts: [
          attempt({ id: 'good-1', at: '2026-08-01T10:00:00.000Z' }),
          attempt({ id: 'bad-1', percent: 40, passed: true, at: '2026-08-01T11:00:00.000Z' }),
          attempt({ id: 'good-2', at: '2026-08-01T12:00:00.000Z' }),
        ],
      }),
    );
    const double = supabaseDouble({ selectResult: { data: [], error: null } });
    mockSupabase.client = double.client;

    await syncAttempts('user-1');

    const pushed = double.upsert.mock.calls[0][0] as { client_id: string }[];
    expect(pushed.map((r) => r.client_id).sort()).toEqual(['good-1', 'good-2']);
  });

  it('keeps the unpushable attempt in the local history rather than deleting it', async () => {
    // It is still the learner's result. Refusing to sync it is not a reason to
    // take it off their screen.
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ownerId: null,
        attempts: [attempt({ id: 'bad-1', percent: 40, passed: true })],
      }),
    );
    const double = supabaseDouble({ selectResult: { data: [], error: null } });
    mockSupabase.client = double.client;

    const history = await syncAttempts('user-1');

    expect(history.map((a) => a.id)).toEqual(['bad-1']);
  });

  it('drops a remote row that is missing required fields', async () => {
    // RLS guarantees these rows are the caller's own; it guarantees nothing
    // about their shape. A column renamed by a later migration would otherwise
    // reach the results screen as NaN%.
    const double = supabaseDouble({
      selectResult: {
        data: [row(), { client_id: 'broken', mode: 'full' }],
        error: null,
      },
    });
    mockSupabase.client = double.client;

    const history = await syncAttempts('user-1');

    expect(history.map((a) => a.id)).toEqual(['remote-1']);
  });

  it('drops a remote row whose mode is not one the app knows', async () => {
    const double = supabaseDouble({
      selectResult: { data: [row({ mode: 'marathon' })], error: null },
    });
    mockSupabase.client = double.client;

    expect(await syncAttempts('user-1')).toEqual([]);
  });
});
