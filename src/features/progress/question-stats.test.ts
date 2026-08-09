/**
 * Tests for per-question performance and its Supabase bridge.
 *
 * The three that carry this file all fail *silently*:
 *
 *  - the **owner check**, which is what stops one person's study record — which
 *    questions they keep failing — being shown to the next account on the phone;
 *  - the **answered-only rule** in `mergeAttempt`, because counting the
 *    questions a timed mock ran out of time on renders a drill full of material
 *    the learner never saw, and it looks like a working drill; and
 *  - **`weakestFirst`'s ordering**, which *is* the feature. A drill in the wrong
 *    order is still a plausible list of questions.
 *
 * None is reachable by hand: you would have to sign in as two people on one
 * device, deliberately time out a mock, or keep a tally across attempts.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import type { GradedAnswer } from '@/features/exam/engine';
import {
  clearAccountQuestionStats,
  clearQuestionStats,
  isPushable,
  mergeAttempt,
  readQuestionStats,
  recordAttemptStats,
  syncQuestionStats,
  weakestFirst,
  type QuestionStat,
} from './question-stats';

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mockSupabase: { client: unknown } = { client: null };

jest.mock('@/lib/supabase', () => ({
  get supabase() {
    return mockSupabase.client;
  },
  isSupabaseConfigured: true,
}));

const STORAGE_KEY = 'ejazty.exam.questionStats';

function stat(overrides: Partial<QuestionStat> = {}): QuestionStat {
  return {
    questionId: 'q-1',
    topic: 'rules',
    seen: 2,
    correct: 1,
    lastCorrect: false,
    lastSeenAt: '2026-08-01T10:00:00.000Z',
    ...overrides,
  };
}

/** Minimal `GradedAnswer`; only the fields `mergeAttempt` reads are populated. */
function graded(
  id: string,
  correct: boolean,
  { answered = true, topic = 'rules' } = {},
): GradedAnswer {
  return {
    question: { id, topic },
    selectedChoiceId: answered ? 'c1' : null,
    correct,
  } as unknown as GradedAnswer;
}

function supabaseDouble({
  selectResult,
  upsertResult = { error: null },
}: {
  selectResult: { data: unknown[] | null; error: unknown };
  upsertResult?: { error: unknown };
}) {
  const upsert = jest.fn().mockResolvedValue(upsertResult);
  const limit = jest.fn().mockResolvedValue(selectResult);
  const eq = jest.fn(() => ({ limit }));
  const select = jest.fn(() => ({ eq }));

  return { client: { from: jest.fn(() => ({ upsert, select })) }, upsert, select };
}

beforeEach(async () => {
  await AsyncStorage.clear();
  mockSupabase.client = null;
});

describe('mergeAttempt', () => {
  it('accumulates counters across attempts', () => {
    const first = mergeAttempt({}, [graded('q-1', true)], '2026-08-01T10:00:00.000Z');
    const second = mergeAttempt(first, [graded('q-1', false)], '2026-08-02T10:00:00.000Z');

    expect(second['q-1']).toEqual({
      questionId: 'q-1',
      topic: 'rules',
      seen: 2,
      correct: 1,
      lastCorrect: false,
      lastSeenAt: '2026-08-02T10:00:00.000Z',
    });
  });

  it('records only questions the learner actually answered', () => {
    /*
      The load-bearing one. A fixed-length paper grades every question it drew,
      including the ones time ran out on — correctly, because skipping costs you
      marks in the real test. But a skipped question says nothing about whether
      the learner *knows* it, and recording a timed-out tail as mistakes fills
      the drill with material they never saw. That is the difference between a
      drill worth doing and a list nobody trusts.
    */
    const merged = mergeAttempt(
      {},
      [graded('q-1', true), graded('q-2', false, { answered: false })],
      '2026-08-01T10:00:00.000Z',
    );

    expect(Object.keys(merged)).toEqual(['q-1']);
  });

  it('does not mutate the stats it was given', () => {
    // It is folded into React state, where an in-place write is a stale render.
    const before = { 'q-1': stat() };
    mergeAttempt(before, [graded('q-1', true)], '2026-08-02T10:00:00.000Z');

    expect(before['q-1'].seen).toBe(2);
  });
});

describe('weakestFirst', () => {
  it('omits questions the learner has never got wrong', () => {
    const stats = {
      'q-1': stat({ questionId: 'q-1', seen: 3, correct: 3, lastCorrect: true }),
      'q-2': stat({ questionId: 'q-2', seen: 3, correct: 1, lastCorrect: false }),
    };

    expect(weakestFirst(stats).map((s) => s.questionId)).toEqual(['q-2']);
  });

  it('puts a question missed last time ahead of a worse average got right last time', () => {
    /*
      The ordering *is* the feature, and this is the case that separates a
      useful drill from a plausible-looking one. Ordering by ratio alone buries
      the question just got wrong under one missed twice a month ago — and the
      one in front of the learner is the one they have the best chance of
      fixing now.
    */
    const stats = {
      // Worse average, but got it right most recently.
      'q-old': stat({ questionId: 'q-old', seen: 10, correct: 2, lastCorrect: true }),
      // Better average, but missed last time.
      'q-fresh': stat({ questionId: 'q-fresh', seen: 10, correct: 8, lastCorrect: false }),
    };

    expect(weakestFirst(stats).map((s) => s.questionId)).toEqual(['q-fresh', 'q-old']);
  });

  it('breaks a tie by the weaker ratio', () => {
    const stats = {
      'q-a': stat({ questionId: 'q-a', seen: 4, correct: 3, lastCorrect: false }),
      'q-b': stat({ questionId: 'q-b', seen: 4, correct: 1, lastCorrect: false }),
    };

    expect(weakestFirst(stats).map((s) => s.questionId)).toEqual(['q-b', 'q-a']);
  });
});

describe('isPushable', () => {
  it('accepts a well-formed stat', () => {
    expect(isPushable(stat())).toBe(true);
  });

  it.each([
    ['a blank question id', stat({ questionId: '   ' })],
    ['an over-long question id', stat({ questionId: 'q'.repeat(65) })],
    ['an unknown topic', stat({ topic: 'dashboard' as QuestionStat['topic'] })],
    ['a zero seen count', stat({ seen: 0, correct: 0, lastCorrect: false })],
    ['more correct than seen', stat({ seen: 1, correct: 2 })],
    ['a fractional counter', stat({ seen: 1.5, correct: 1 })],
  ])('rejects %s', (_label, record) => {
    expect(isPushable(record)).toBe(false);
  });

  it('rejects a verdict that contradicts the counters', () => {
    // `question_stats_last_correct_agrees`. Never right, yet right last time —
    // and the mirror image. Both satisfy every individual bound, which is
    // exactly the gap the cross-column CHECK exists to close.
    expect(isPushable(stat({ seen: 2, correct: 0, lastCorrect: true }))).toBe(false);
    expect(isPushable(stat({ seen: 2, correct: 2, lastCorrect: false }))).toBe(false);
  });

  it('rejects a timestamp beyond the clock-skew slack', () => {
    const future = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString();

    expect(isPushable(stat({ lastSeenAt: future }))).toBe(false);
  });
});

describe('readQuestionStats', () => {
  it('returns an empty device-local cache when nothing is stored', async () => {
    expect(await readQuestionStats()).toEqual({ ownerId: null, stats: {} });
  });

  it('survives a corrupt entry instead of crashing boot', async () => {
    await AsyncStorage.setItem(STORAGE_KEY, 'not json{');

    expect(await readQuestionStats()).toEqual({ ownerId: null, stats: {} });
  });

  it('drops an unreadable stat rather than rendering it', async () => {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ownerId: null,
        stats: { 'q-1': stat(), 'q-2': { questionId: 'q-2', seen: 'lots' } },
      }),
    );

    const cache = await readQuestionStats();

    expect(Object.keys(cache.stats)).toEqual(['q-1']);
  });
});

describe('the owner boundary', () => {
  it('discards stats owned by a different account', async () => {
    // The rule that stops one person's study record reaching the next account
    // on the phone. Asserted with no Supabase configured, so it holds offline
    // too — the drop must not depend on a successful network call.
    await recordAttemptStats([graded('q-1', false)], '2026-08-01T10:00:00.000Z', 'user-a');

    const merged = await syncQuestionStats('user-b');

    expect(merged).toEqual({});
  });

  it('adopts a device-local record for the first account to sign in', async () => {
    // The other half, and why sign-out keeps a guest's: this is the state a
    // guest who goes off to register arrives in.
    await recordAttemptStats([graded('q-1', false)], '2026-08-01T10:00:00.000Z', null);

    const merged = await syncQuestionStats('user-a');

    expect(Object.keys(merged)).toEqual(['q-1']);
  });
});

describe('clearAccountQuestionStats', () => {
  it("clears an account's record", async () => {
    await recordAttemptStats([graded('q-1', false)], '2026-08-01T10:00:00.000Z', 'user-a');

    await clearAccountQuestionStats();

    expect((await readQuestionStats()).stats).toEqual({});
  });

  it("keeps a guest's, because signing out is how a guest goes to register", async () => {
    // Clearing unconditionally destroys the practice record of everyone who
    // tried the app before making an account, at the moment they went to make
    // one. Same asymmetry as `clearAccountAttemptCache`.
    await recordAttemptStats([graded('q-1', false)], '2026-08-01T10:00:00.000Z', null);

    await clearAccountQuestionStats();

    expect(Object.keys((await readQuestionStats()).stats)).toEqual(['q-1']);
  });
});

describe('syncQuestionStats', () => {
  it('returns the cache when the network fails, not an empty record', async () => {
    // Being offline must not look like having never studied.
    await recordAttemptStats([graded('q-1', false)], '2026-08-01T10:00:00.000Z', 'user-a');
    const double = supabaseDouble({
      selectResult: { data: null, error: { message: 'offline' } },
    });
    mockSupabase.client = double.client;

    const merged = await syncQuestionStats('user-a');

    expect(Object.keys(merged)).toEqual(['q-1']);
  });

  it('keeps the higher counter when local and remote disagree', async () => {
    // Both sides are absolute counters, so the larger has folded in at least as
    // many attempts. A stat that failed to push therefore survives and is
    // retried rather than being overwritten by the staler server copy.
    await recordAttemptStats([graded('q-1', false)], '2026-08-01T10:00:00.000Z', 'user-a');
    await recordAttemptStats([graded('q-1', false)], '2026-08-02T10:00:00.000Z', 'user-a');

    mockSupabase.client = supabaseDouble({
      selectResult: {
        data: [
          {
            question_id: 'q-1',
            topic: 'rules',
            seen: 1,
            correct: 0,
            last_correct: false,
            last_seen_at: '2026-07-01T10:00:00.000Z',
          },
        ],
        error: null,
      },
    }).client;

    const merged = await syncQuestionStats('user-a');

    expect(merged['q-1'].seen).toBe(2);
  });

  it('never sends a row the table would reject', async () => {
    /*
      The push is one batch upsert and Postgres fails a batch as a unit, so a
      single bad row would take every other stat down with it — silently,
      because the error is ignored by design.
    */
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        ownerId: 'user-a',
        stats: {
          'q-1': stat(),
          'q-2': stat({ questionId: 'q-2', seen: 2, correct: 0, lastCorrect: true }),
        },
      }),
    );
    const double = supabaseDouble({ selectResult: { data: [], error: null } });
    mockSupabase.client = double.client;

    await syncQuestionStats('user-a');

    expect(double.upsert).toHaveBeenCalledTimes(1);
    expect(double.upsert.mock.calls[0][0]).toHaveLength(1);
    expect(double.upsert.mock.calls[0][0][0].question_id).toBe('q-1');
  });
});

describe('clearQuestionStats', () => {
  it('leaves nothing behind', async () => {
    await recordAttemptStats([graded('q-1', false)], '2026-08-01T10:00:00.000Z', 'user-a');

    await clearQuestionStats();

    expect(await readQuestionStats()).toEqual({ ownerId: null, stats: {} });
  });
});
