/**
 * Tests for the re-authentication gate.
 *
 * This is the check standing in front of the three operations that can lose
 * someone their account: changing the password, moving the account to a new
 * email address, and deleting it outright. Supabase asks for no proof of
 * identity before any of them, so this function returning normally is the only
 * thing between a borrowed, unlocked phone and an irreversible delete.
 *
 * Everything asserted here fails *open* when it breaks, which is what makes it
 * worth pinning. A version that forgot to call `signInWithPassword` at all
 * would look identical from the app — every screen would keep working, the
 * happy path would be indistinguishable, and the gate would simply be gone.
 * `authConfig` is tested for the same reason in `lib/supabase.test.ts`.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { setCaptchaProvider } from './captcha';
import {
  clearReauthBackoff,
  reauthenticate,
  REAUTH_LOCKOUT_MS,
  REAUTH_MAX_ATTEMPTS,
} from './reauth';

jest.mock('@react-native-async-storage/async-storage', () =>
  // `require`, not `import`: jest.mock factories are hoisted above the import
  // block, so an imported binding would not exist yet when this runs.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

/**
 * In-memory SecureStore, the same fake `lib/secure-storage.test.ts` uses.
 *
 * The backoff counter lives in the keychain rather than AsyncStorage, because
 * restoring an old copy of it is the whole attack — see the note on
 * `MAX_ATTEMPTS`. Faking the store rather than mocking per call means the
 * assertions below check that the counter *round-trips*, not that some
 * particular call sequence happened.
 */
jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    __store: store,
    WHEN_UNLOCKED: 'WHEN_UNLOCKED',
    WHEN_UNLOCKED_THIS_DEVICE_ONLY: 'WHEN_UNLOCKED_THIS_DEVICE_ONLY',
    getItemAsync: jest.fn(async (k: string) => store.get(k) ?? null),
    setItemAsync: jest.fn(async (k: string, v: string, _opts?: unknown) => {
      store.set(k, v);
    }),
    deleteItemAsync: jest.fn(async (k: string) => {
      store.delete(k);
    }),
  };
});

const secureStore = (SecureStore as unknown as { __store: Map<string, string> })
  .__store;

const BACKOFF_KEY = 'ejazty.auth.reauthBackoff';

/**
 * Reads the persisted counter back out of the keychain fake.
 *
 * The adapter chunks, so a value always lives under `<key>.0` — short enough
 * here that there is never a second chunk.
 */
function storedBackoff(): { failures: number; lockedUntil: number } | null {
  const raw = secureStore.get(`${BACKOFF_KEY}.0`);
  return raw ? JSON.parse(raw) : null;
}

/**
 * Swappable Supabase stand-in, matching the pattern in
 * `features/progress/attempts.test.ts`. `null` models an unconfigured build.
 */
const mockSupabase: { client: unknown } = { client: null };

jest.mock('@/lib/supabase', () => ({
  get supabase() {
    return mockSupabase.client;
  },
  isSupabaseConfigured: true,
}));

const EMAIL = 'learner@example.com';

type SignInArgs = {
  email: string;
  password: string;
  options?: { captchaToken?: string };
};

/**
 * Records what `signInWithPassword` was called with, and what it returns.
 *
 * `email: null` models "no verified user". Note it is `null` rather than
 * `undefined` on purpose — a default parameter fires on `undefined`, so passing
 * that would silently hand back the signed-in fixture and the no-session tests
 * would pass against a session that exists.
 *
 * `getSession` is stubbed alongside `getUser` so that a regression back to it
 * would still *run*, and be caught by the assertion below rather than by an
 * incidental "undefined is not a function". A test that fails for the wrong
 * reason is one nobody trusts.
 */
function client({
  email = EMAIL as string | null,
  signInError = null as unknown,
} = {}) {
  const signInWithPassword = jest.fn(async (_args: SignInArgs) => ({
    error: signInError,
  }));
  return {
    signInWithPassword,
    auth: {
      getUser: jest.fn(async () => ({
        data: { user: email ? { email } : null },
        error: null,
      })),
      getSession: jest.fn(async () => ({
        data: { session: email ? { user: { email } } : null },
      })),
      signInWithPassword,
    },
  };
}

beforeEach(async () => {
  mockSupabase.client = null;
  setCaptchaProvider(null);
  jest.clearAllMocks();
  await AsyncStorage.clear();
  secureStore.clear();
});

afterEach(() => {
  jest.useRealTimers();
});

/** Exhausts the attempt budget, leaving the gate locked. */
async function lockOut(c: ReturnType<typeof client>) {
  for (let i = 0; i < REAUTH_MAX_ATTEMPTS; i++) {
    await expect(reauthenticate('wrong')).rejects.toBeDefined();
  }
  // Both, so an assertion after this reads calls made *while locked* rather
  // than the ones that did the locking.
  c.signInWithPassword.mockClear();
  c.auth.getUser.mockClear();
}

describe('reauthenticate', () => {
  it('verifies the password against the signed-in account', async () => {
    const c = client();
    mockSupabase.client = c;

    await expect(reauthenticate('correct horse')).resolves.toBeUndefined();

    // The assertion that matters: it actually asked Supabase. A gate that
    // resolves without this call is not a gate.
    expect(c.signInWithPassword).toHaveBeenCalledTimes(1);
    expect(c.signInWithPassword).toHaveBeenCalledWith(
      expect.objectContaining({ email: EMAIL, password: 'correct horse' }),
    );
  });

  it('checks against the account address, not one supplied by the caller', async () => {
    // There is no parameter for the email on purpose. Taking one would let a
    // caller re-authenticate against some *other* account's credentials and
    // then act on this session — proving the wrong thing entirely.
    const c = client({ email: 'owner@example.com' });
    mockSupabase.client = c;

    await reauthenticate('pw');

    expect(c.signInWithPassword).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'owner@example.com' }),
    );
  });

  it('reads the address from getUser, not from the stored session', async () => {
    // `getSession` returns the session as it sits in SecureStore; supabase-js
    // parses it back out and does not re-verify it. So the address it reports
    // is one an attacker with filesystem access can edit, and this gate would
    // then be checking a password against an account of their choosing.
    // `getUser` sends the token to GoTrue and reads the address off the
    // verified response.
    //
    // Both are stubbed in the fixture, so a revert to `getSession` fails here
    // on the assertion rather than by crashing.
    const c = client();
    mockSupabase.client = c;

    await reauthenticate('pw');

    expect(c.auth.getUser).toHaveBeenCalledTimes(1);
    expect(c.auth.getSession).not.toHaveBeenCalled();
  });

  it('rejects a wrong password, throwing the error unchanged', async () => {
    // Unchanged so `authErrorKey` maps it to `invalid_credentials` — the same
    // message the sign-in screen shows, which is the accurate thing to say.
    const error = { code: 'invalid_credentials', message: 'Invalid login credentials' };
    mockSupabase.client = client({ signInError: error });

    await expect(reauthenticate('wrong')).rejects.toBe(error);
  });

  it('throws rather than resolving when there is no session', async () => {
    // Failing closed. If this fell through, an expired session would *disable*
    // the check on the three operations it guards.
    mockSupabase.client = client({ email: null });

    await expect(reauthenticate('pw')).rejects.toThrow('NOT_CONFIGURED');
  });

  it('throws when the token no longer verifies against GoTrue', async () => {
    // The case `getUser` buys over `getSession`: a session still sitting in
    // storage whose token has been revoked. `getSession` would hand back the
    // stale address and let the gate proceed; `getUser` reports no user, and
    // failing closed is the only acceptable direction here.
    const c = client();
    c.auth.getUser = jest.fn(async () => ({
      data: { user: null },
      error: { code: 'session_not_found' },
    })) as unknown as typeof c.auth.getUser;
    mockSupabase.client = c;

    await expect(reauthenticate('pw')).rejects.toThrow('NOT_CONFIGURED');
    expect(c.signInWithPassword).not.toHaveBeenCalled();
  });

  it('throws when the account has no email address to check against', async () => {
    const c = client({ email: null });
    mockSupabase.client = c;

    await expect(reauthenticate('pw')).rejects.toThrow('NOT_CONFIGURED');
    // And crucially never reached the endpoint with an undefined address.
    expect(c.signInWithPassword).not.toHaveBeenCalled();
  });

  it('throws on an unconfigured build instead of waving the caller through', async () => {
    mockSupabase.client = null;

    await expect(reauthenticate('pw')).rejects.toThrow('NOT_CONFIGURED');
  });

  it('attaches a CAPTCHA token when a provider is registered', async () => {
    // The reason this lives in one module rather than at three call sites.
    // This posts to the same `/token?grant_type=password` endpoint as sign-in,
    // so with bot protection on, a path that omitted the token would fail with
    // `captcha_failed` while signing in worked.
    const c = client();
    mockSupabase.client = c;
    setCaptchaProvider(async () => 'token-abc');

    await reauthenticate('pw');

    expect(c.signInWithPassword).toHaveBeenCalledWith(
      expect.objectContaining({ options: { captchaToken: 'token-abc' } }),
    );
  });

  it('asks for a signin-action token, matching the endpoint it posts to', async () => {
    const c = client();
    mockSupabase.client = c;
    const provider = jest.fn(async () => 'token-abc');
    setCaptchaProvider(provider);

    await reauthenticate('pw');

    expect(provider).toHaveBeenCalledWith('signin');
  });

  it('does not consume the attempt budget on a correct password', async () => {
    const c = client();
    mockSupabase.client = c;

    // Well past the limit. A counter that incremented on every call rather than
    // on every *failure* would lock a user out of their own account screen for
    // using it normally, which is how a rate limit gets deleted.
    for (let i = 0; i < REAUTH_MAX_ATTEMPTS * 2; i++) {
      await expect(reauthenticate('right')).resolves.toBeUndefined();
    }
  });

  it('clears accumulated failures once the correct password arrives', async () => {
    // Otherwise the failures survive and a legitimate user who mistyped four
    // times gets locked out on their next mistake, hours later.
    const wrong = { code: 'invalid_credentials' };
    const c = client({ signInError: wrong });
    mockSupabase.client = c;

    for (let i = 0; i < REAUTH_MAX_ATTEMPTS - 1; i++) {
      await expect(reauthenticate('wrong')).rejects.toBe(wrong);
    }

    c.signInWithPassword.mockResolvedValue({ error: null });
    await expect(reauthenticate('right')).resolves.toBeUndefined();

    // Budget is full again: one more failure must not trip the lockout.
    c.signInWithPassword.mockResolvedValue({ error: wrong });
    await expect(reauthenticate('wrong')).rejects.toBe(wrong);
    expect(c.signInWithPassword).toHaveBeenCalledTimes(REAUTH_MAX_ATTEMPTS + 1);
  });
});

/**
 * The local backoff.
 *
 * This bounds the borrowed-unlocked-phone attacker, who is driving the app's
 * own UI — GoTrue's `sign_in_sign_ups` limit is per IP, shared with real
 * sign-ins, and has no per-account lockout, so without this the account screen
 * accepted roughly 30 guesses every five minutes forever against an
 * irreversible delete.
 *
 * The assertion that carries the weight is `stops reaching Supabase`: a version
 * that counted failures but still forwarded the request would look identical
 * from the app and bound nothing at all.
 */
describe('reauthenticate backoff', () => {
  it('locks out after the configured number of failures', async () => {
    const c = client({ signInError: { code: 'invalid_credentials' } });
    mockSupabase.client = c;
    await lockOut(c);

    await expect(reauthenticate('wrong')).rejects.toMatchObject({
      code: 'over_request_rate_limit',
    });
  });

  it('stops reaching Supabase while locked out', async () => {
    // The whole point. Counting failures while still forwarding every request
    // would slow nothing down.
    const c = client({ signInError: { code: 'invalid_credentials' } });
    mockSupabase.client = c;
    await lockOut(c);

    await expect(reauthenticate('wrong')).rejects.toBeDefined();

    expect(c.signInWithPassword).not.toHaveBeenCalled();
    // And it did not even ask who the user is — the lock is checked first.
    expect(c.auth.getUser).not.toHaveBeenCalled();
  });

  it('rejects with a code that maps to the rate-limit message', async () => {
    // `over_request_rate_limit` is already in CODE_KEYS, so this needs no new
    // string in three locales — and it tells the truth, rather than reporting a
    // wrong password to someone whose password may well be right.
    const c = client({ signInError: { code: 'invalid_credentials' } });
    mockSupabase.client = c;
    await lockOut(c);

    await expect(reauthenticate('correct-but-locked')).rejects.toMatchObject({
      code: 'over_request_rate_limit',
    });
  });

  it('lets the correct password through once the lockout expires', async () => {
    const c = client({ signInError: { code: 'invalid_credentials' } });
    mockSupabase.client = c;
    await lockOut(c);

    // Failing closed forever would lock a legitimate owner out of their own
    // account permanently, which is worse than the attack.
    const realNow = Date.now;
    Date.now = () => realNow() + REAUTH_LOCKOUT_MS + 1;
    try {
      c.signInWithPassword.mockResolvedValue({ error: null });
      await expect(reauthenticate('right')).resolves.toBeUndefined();
      expect(c.signInWithPassword).toHaveBeenCalledTimes(1);
    } finally {
      Date.now = realNow;
    }
  });

  it('writes the lockout to storage rather than holding it in module state', async () => {
    // In memory this counter would reset on every force-quit, which is a
    // bypass anyone holding the phone finds by accident.
    const c = client({ signInError: { code: 'invalid_credentials' } });
    mockSupabase.client = c;
    await lockOut(c);

    const stored = storedBackoff();
    expect(stored).not.toBeNull();
    expect(stored?.lockedUntil).toBeGreaterThan(Date.now());
  });

  it('keeps the counter out of AsyncStorage entirely', async () => {
    // The reason the counter moved to the keychain, and the one assertion that
    // fails if it ever moves back. AsyncStorage is unencrypted on both
    // platforms and was eligible for Android backup, so a plaintext copy is
    // restorable and directly editable — which is the same bypass persisting
    // the counter exists to close, one layer further out.
    //
    // Asserted as an absence rather than by checking the keychain alone,
    // because a version that wrote to *both* would pass every other test here
    // while leaving the bypass wide open.
    const c = client({ signInError: { code: 'invalid_credentials' } });
    mockSupabase.client = c;
    await lockOut(c);

    expect(await AsyncStorage.getItem(BACKOFF_KEY)).toBeNull();
    expect(storedBackoff()?.lockedUntil).toBeGreaterThan(Date.now());
  });

  it('honours a lockout left behind by a previous run', async () => {
    // The relaunch case from the other side, and the one that actually matters:
    // this process has no memory of the failures, so if the gate consulted
    // module state it would wave the caller straight through.
    const c = client();
    mockSupabase.client = c;
    secureStore.set(
      `${BACKOFF_KEY}.0`,
      JSON.stringify({ failures: 0, lockedUntil: Date.now() + REAUTH_LOCKOUT_MS }),
    );

    await expect(reauthenticate('right')).rejects.toMatchObject({
      code: 'over_request_rate_limit',
    });
    expect(c.signInWithPassword).not.toHaveBeenCalled();
  });

  it('carries a lockout written by a pre-keychain build across the upgrade', async () => {
    // The counter used to live in AsyncStorage. Without the migration in
    // `readSecureJSON`, the upgrade itself would clear every active lockout —
    // and anyone mid-way through guessing a password would simply wait for the
    // next release. Only reachable on a device that ran the previous build.
    const c = client();
    mockSupabase.client = c;
    await AsyncStorage.setItem(
      BACKOFF_KEY,
      JSON.stringify({ failures: 0, lockedUntil: Date.now() + REAUTH_LOCKOUT_MS }),
    );

    await expect(reauthenticate('right')).rejects.toMatchObject({
      code: 'over_request_rate_limit',
    });
    expect(c.signInWithPassword).not.toHaveBeenCalled();
    // And the plaintext copy is gone afterwards, or the migration would have
    // moved the value while leaving the bypass in place.
    expect(await AsyncStorage.getItem(BACKOFF_KEY)).toBeNull();
  });

  it('is cleared explicitly, so a second account does not inherit a lockout', async () => {
    const c = client({ signInError: { code: 'invalid_credentials' } });
    mockSupabase.client = c;
    await lockOut(c);

    // `signOut` calls this. Not a bypass: signing back in needs the very
    // password an attacker is trying to guess.
    await clearReauthBackoff();

    c.signInWithPassword.mockResolvedValue({ error: null });
    await expect(reauthenticate('right')).resolves.toBeUndefined();
  });

  it('fails open when the backoff store is unreadable', async () => {
    // Same direction as the CAPTCHA seam. A storage glitch must not lock a
    // legitimate owner out of changing their own password, and an attacker
    // gains nothing they did not already have — GoTrue's per-IP limit still
    // applies to every request this forwards.
    const c = client();
    mockSupabase.client = c;
    jest
      .spyOn(SecureStore, 'getItemAsync')
      .mockRejectedValueOnce(new Error('keychain unavailable'));

    await expect(reauthenticate('right')).resolves.toBeUndefined();
    expect(c.signInWithPassword).toHaveBeenCalledTimes(1);
  });
});

describe('reauthenticate', () => {
  it('still reaches Supabase when no provider is registered', async () => {
    // The captcha seam fails open by design: GoTrue is the authority on
    // whether a tokenless request is acceptable. Blocking locally would lock
    // users out of a correctly configured project.
    const c = client();
    mockSupabase.client = c;

    await reauthenticate('pw');

    expect(c.signInWithPassword).toHaveBeenCalledWith(
      expect.objectContaining({ options: {} }),
    );
  });
});
