/**
 * Tests for the SecureStore session adapter.
 *
 * Every failure mode here is invisible in manual testing. Chunking only bites
 * on a session large enough to split, which depends on how much
 * `user_metadata` an account happens to carry; a stale trailing chunk only
 * corrupts a session that shrank; and the AsyncStorage migration only runs once
 * per install, on the upgrade, where nobody is looking.
 *
 * SecureStore is faked with an in-memory map rather than mocked per-call, so
 * the tests assert round-trip behaviour instead of restating the
 * implementation's call sequence.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

import { SECURE_STORE_CHUNK_SIZE, SecureStoreAdapter } from './secure-storage';

jest.mock('@react-native-async-storage/async-storage', () =>
  // `require`, not `import`: jest.mock factories are hoisted above the import
  // block, so an imported binding would not exist yet when this runs.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-secure-store', () => {
  const store = new Map<string, string>();
  return {
    __store: store,
    // Distinct sentinels rather than the real numeric enum values. The adapter
    // is supposed to pass the constant through, so the tests below compare
    // against `SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY` itself — asserting a
    // hardcoded number would just restate whichever value got typed in.
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

const KEY = 'sb-fduvubpfqcboawmqukjy-auth-token';

beforeEach(async () => {
  secureStore.clear();
  await AsyncStorage.clear();
  jest.clearAllMocks();
});

describe('round trip', () => {
  it('stores and returns a short value', async () => {
    await SecureStoreAdapter.setItem(KEY, 'hello');

    expect(await SecureStoreAdapter.getItem(KEY)).toBe('hello');
  });

  it('returns null for a key that was never written', async () => {
    expect(await SecureStoreAdapter.getItem(KEY)).toBeNull();
  });

  it('round-trips an empty string as a value, not as absence', async () => {
    // '' and null mean different things to the Supabase client, so the adapter
    // has to keep them apart.
    await SecureStoreAdapter.setItem(KEY, '');

    expect(await SecureStoreAdapter.getItem(KEY)).toBe('');
  });

  it('round-trips a realistic JSON session unchanged', async () => {
    const session = JSON.stringify({
      access_token: 'a'.repeat(800),
      refresh_token: 'r'.repeat(64),
      user: { id: 'uuid', email: 'learner@example.com' },
    });

    await SecureStoreAdapter.setItem(KEY, session);

    expect(await SecureStoreAdapter.getItem(KEY)).toBe(session);
  });
});

describe('chunking', () => {
  it('splits a value past the chunk size across several entries', async () => {
    const value = 'x'.repeat(SECURE_STORE_CHUNK_SIZE * 2 + 250);

    await SecureStoreAdapter.setItem(KEY, value);

    expect(secureStore.has(`${KEY}.0`)).toBe(true);
    expect(secureStore.has(`${KEY}.1`)).toBe(true);
    expect(secureStore.has(`${KEY}.2`)).toBe(true);
    expect(secureStore.has(`${KEY}.3`)).toBe(false);
  });

  it('keeps every chunk under the 2048-byte SecureStore limit', async () => {
    // The whole reason chunking exists: SecureStore warns and can drop values
    // past 2048 bytes on Android.
    await SecureStoreAdapter.setItem(KEY, 'x'.repeat(SECURE_STORE_CHUNK_SIZE * 3));

    for (const stored of secureStore.values()) {
      expect(stored.length).toBeLessThanOrEqual(2048);
    }
  });

  it('reassembles a chunked value in order', async () => {
    // Built so a wrong join order is detectable, unlike a run of one character.
    const value = Array.from({ length: 5000 }, (_, i) => String(i % 10)).join('');

    await SecureStoreAdapter.setItem(KEY, value);

    expect(await SecureStoreAdapter.getItem(KEY)).toBe(value);
  });

  it('does not leave stale chunks when a value shrinks', async () => {
    // The bug this guards: a long session replaced by a short one, with the
    // old tail still in the store. `readChunks` would splice it onto the end
    // and hand Supabase unparseable JSON — an unexplained sign-out.
    await SecureStoreAdapter.setItem(KEY, 'y'.repeat(SECURE_STORE_CHUNK_SIZE * 3));
    await SecureStoreAdapter.setItem(KEY, 'short');

    expect(await SecureStoreAdapter.getItem(KEY)).toBe('short');
    expect(secureStore.has(`${KEY}.1`)).toBe(false);
  });
});

describe('removeItem', () => {
  it('clears every chunk', async () => {
    await SecureStoreAdapter.setItem(KEY, 'z'.repeat(SECURE_STORE_CHUNK_SIZE * 2));

    await SecureStoreAdapter.removeItem(KEY);

    expect(await SecureStoreAdapter.getItem(KEY)).toBeNull();
    expect(secureStore.size).toBe(0);
  });

  it('also clears a pre-migration copy from AsyncStorage', async () => {
    // Sign-out must not leave a readable session behind for the next person on
    // a shared phone — which is the entire point of moving off AsyncStorage.
    await AsyncStorage.setItem(KEY, 'legacy-session');

    await SecureStoreAdapter.removeItem(KEY);

    expect(await AsyncStorage.getItem(KEY)).toBeNull();
  });
});

describe('migration from AsyncStorage', () => {
  it('adopts a session written by an older build', async () => {
    // Without this the upgrade signs everyone out.
    await AsyncStorage.setItem(KEY, 'legacy-session');

    expect(await SecureStoreAdapter.getItem(KEY)).toBe('legacy-session');
  });

  it('deletes the plaintext copy once it has been adopted', async () => {
    // Leaving it behind would keep the readable token on disk and defeat the
    // change entirely.
    await AsyncStorage.setItem(KEY, 'legacy-session');

    await SecureStoreAdapter.getItem(KEY);

    expect(await AsyncStorage.getItem(KEY)).toBeNull();
    expect(secureStore.get(`${KEY}.0`)).toBe('legacy-session');
  });

  it('migrates only once, and reads from SecureStore afterwards', async () => {
    await AsyncStorage.setItem(KEY, 'legacy-session');
    await SecureStoreAdapter.getItem(KEY);

    await SecureStoreAdapter.setItem(KEY, 'fresh-session');

    expect(await SecureStoreAdapter.getItem(KEY)).toBe('fresh-session');
  });

  it('finds a legacy value stored under an unsanitised key', async () => {
    // The old code wrote under whatever key Supabase passed, so that is where
    // the legacy value is. Looking it up under the sanitised name would find
    // nothing and sign the user out — silently, and only on the upgrade.
    await AsyncStorage.setItem('sb:auth@token', 'legacy-session');

    expect(await SecureStoreAdapter.getItem('sb:auth@token')).toBe('legacy-session');
    expect(await AsyncStorage.getItem('sb:auth@token')).toBeNull();
  });

  it('prefers an existing SecureStore value over a stale legacy one', async () => {
    // If both somehow exist, the keychain is authoritative — the legacy copy
    // is by definition the older of the two.
    await SecureStoreAdapter.setItem(KEY, 'current');
    await AsyncStorage.setItem(KEY, 'stale');

    expect(await SecureStoreAdapter.getItem(KEY)).toBe('current');
  });
});

describe('failure handling', () => {
  it('reads as "no session" when the keychain throws', async () => {
    // A hard failure here would reject inside the Supabase client's boot path.
    // Failing to "signed out" is recoverable; crashing on launch is not.
    jest
      .mocked(SecureStore.getItemAsync)
      .mockRejectedValueOnce(new Error('keychain unavailable'));

    expect(await SecureStoreAdapter.getItem(KEY)).toBeNull();
  });

  it('sanitises a key SecureStore would reject', async () => {
    // SecureStore throws on characters outside [A-Za-z0-9._-], and a throw on
    // boot is a crash rather than a sign-out.
    await SecureStoreAdapter.setItem('sb:auth@token', 'value');

    expect(await SecureStoreAdapter.getItem('sb:auth@token')).toBe('value');
    for (const key of secureStore.keys()) {
      expect(key).toMatch(/^[A-Za-z0-9._-]+$/);
    }
  });
});

/**
 * The accessibility class is invisible from the app in every ordinary run: the
 * session round-trips identically either way, and the difference only shows up
 * on a device restored from a backup — which is exactly the case nobody
 * exercises before shipping.
 */
describe('keychain accessibility', () => {
  it('keeps the session out of device backups', async () => {
    // The SecureStore default, WHEN_UNLOCKED, is included in encrypted iCloud
    // and iTunes backups and restores onto other hardware. The value here is a
    // refresh token valid until an explicit sign-out, so a compromised backup
    // is a working session on the attacker's phone.
    await SecureStoreAdapter.setItem(KEY, 'session');

    for (const call of jest.mocked(SecureStore.setItemAsync).mock.calls) {
      expect(call[2]).toEqual({
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
    }
  });

  it('is not the backup-included default', async () => {
    // Stated separately from the assertion above so that reverting the constant
    // to `WHEN_UNLOCKED` fails on its own terms rather than only as a mismatch.
    await SecureStoreAdapter.setItem(KEY, 'session');

    const [, , options] = jest.mocked(SecureStore.setItemAsync).mock.calls[0];

    expect((options as { keychainAccessible: unknown }).keychainAccessible).not.toBe(
      SecureStore.WHEN_UNLOCKED,
    );
  });

  it('applies to every chunk, not just the first', async () => {
    // A long session splits, and a chunk written without the option would sit
    // in the backup on its own — enough to leak part of the token and enough
    // to make the whole value unreadable after a restore.
    await SecureStoreAdapter.setItem(KEY, 'x'.repeat(SECURE_STORE_CHUNK_SIZE * 3));

    const writes = jest.mocked(SecureStore.setItemAsync).mock.calls;

    expect(writes.length).toBe(3);
    for (const call of writes) {
      expect(call[2]).toEqual({
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
    }
  });

  it('applies to the value rewritten by the AsyncStorage migration', async () => {
    // The migration is the one write that does not come from Supabase, and it
    // handles the oldest sessions — the ones most likely to be on a device
    // that gets backed up before the next sign-out.
    await AsyncStorage.setItem(KEY, 'legacy-session');

    expect(await SecureStoreAdapter.getItem(KEY)).toBe('legacy-session');

    const writes = jest.mocked(SecureStore.setItemAsync).mock.calls;

    expect(writes.length).toBeGreaterThan(0);
    for (const call of writes) {
      expect(call[2]).toEqual({
        keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY,
      });
    }
  });
});
