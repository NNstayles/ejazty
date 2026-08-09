import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';

/**
 * SecureStore-backed session store for the Supabase client.
 *
 * The default store is `AsyncStorage`, which is an unencrypted SQLite database
 * on Android and a plaintext file in the app container on iOS. The value kept
 * there is a *refresh* token: with `autoRefreshToken` on it stays usable until
 * an explicit sign-out, so anyone who can read the filesystem — a rooted or
 * jailbroken device, an unencrypted backup, a forensic extraction of a lost
 * phone — holds the account until the user happens to sign out. SecureStore
 * puts it in the iOS keychain and the Android keystore instead.
 *
 * ## Chunking
 *
 * SecureStore warns past 2048 bytes per value on Android, and a Supabase
 * session carrying `user_metadata` can exceed that. Values are therefore split
 * across `key.0`, `key.1`, … Chunk 0 always exists when a value is present, so
 * its absence is what "no value" means — there is no separate length record to
 * fall out of step with the chunks it describes.
 */

/** Comfortably under the 2048-byte Android warning threshold. */
const CHUNK_SIZE = 1800;

/**
 * Keychain accessibility class for every chunk written here.
 *
 * The SecureStore default is `WHEN_UNLOCKED`, and items in that class are
 * **included in encrypted iCloud and iTunes backups** and restore onto a
 * different device. The value stored here is a refresh token that stays valid
 * until an explicit sign-out, so a compromised or weakly-passworded backup
 * yields a working session on the attacker's hardware — which is the same
 * "unencrypted backup / forensic extraction" case this adapter exists to close,
 * just one step further out.
 *
 * `..._THIS_DEVICE_ONLY` keeps the identical unlock semantics — readable only
 * while the device is unlocked, so background token refresh behaves exactly as
 * before — and excludes the item from backups entirely.
 *
 * The trade, accepted deliberately: a user restoring onto a new iPhone arrives
 * signed out and re-authenticates, rather than arriving signed in. That is the
 * correct direction to fail for a credential, and it is the same thing that
 * already happens on a fresh install.
 *
 * iOS only. SecureStore ignores it on Android, where the value is encrypted
 * with a Keystore key that never leaves the device — so a backed-up ciphertext
 * is not usable off it.
 */
const KEYCHAIN_ACCESSIBLE = SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY;

const chunkKey = (key: string, index: number) => `${key}.${index}`;

/**
 * SecureStore rejects keys outside `[A-Za-z0-9._-]`. Supabase's own keys are
 * already safe, but a caller-supplied one need not be, and an invalid key
 * throws rather than returning null — which would surface as a crash on boot.
 */
const INVALID_KEY_CHARS = /[^A-Za-z0-9._-]/g;

function safeKey(key: string): string {
  return key.replace(INVALID_KEY_CHARS, '_');
}

async function readChunks(key: string): Promise<string | null> {
  const head = await SecureStore.getItemAsync(chunkKey(key, 0));
  if (head === null) return null;

  let value = head;
  for (let i = 1; ; i++) {
    const part = await SecureStore.getItemAsync(chunkKey(key, i));
    if (part === null) break;
    value += part;
  }
  return value;
}

async function deleteChunks(key: string): Promise<void> {
  for (let i = 0; ; i++) {
    const k = chunkKey(key, i);
    if ((await SecureStore.getItemAsync(k)) === null) break;
    await SecureStore.deleteItemAsync(k);
  }
}

async function writeChunks(key: string, value: string): Promise<void> {
  // Cleared first so shrinking a value cannot leave stale trailing chunks that
  // `readChunks` would then splice onto the end of the new one.
  await deleteChunks(key);
  // A zero-length value still writes chunk 0, so it round-trips as '' rather
  // than as "absent".
  const count = Math.max(1, Math.ceil(value.length / CHUNK_SIZE));
  for (let i = 0; i < count; i++) {
    await SecureStore.setItemAsync(
      chunkKey(key, i),
      value.slice(i * CHUNK_SIZE, (i + 1) * CHUNK_SIZE),
      { keychainAccessible: KEYCHAIN_ACCESSIBLE },
    );
  }
}

/**
 * Moves a session written by an older build out of AsyncStorage.
 *
 * Before this adapter existed the session lived in AsyncStorage. Without this
 * step every signed-in user would be silently logged out by the upgrade. Read
 * once, re-written into the keychain, then deleted from the insecure store —
 * leaving the plaintext copy behind would defeat the change.
 *
 * `rawKey` is the un-sanitised key on purpose: the old code stored under
 * whatever Supabase passed, so that is where the legacy value actually is.
 * (Supabase's own `sb-<ref>-auth-token` needs no sanitising, which is why the
 * two agree in practice — but reading the sanitised name would quietly find
 * nothing for any key that did.)
 */
async function migrateLegacyValue(
  rawKey: string,
  safe: string,
): Promise<string | null> {
  const legacy = await AsyncStorage.getItem(rawKey);
  if (legacy === null) return null;

  await writeChunks(safe, legacy);
  await AsyncStorage.removeItem(rawKey);
  return legacy;
}

export const SecureStoreAdapter = {
  async getItem(key: string): Promise<string | null> {
    try {
      const secure = await readChunks(safeKey(key));
      if (secure !== null) return secure;
      return await migrateLegacyValue(key, safeKey(key));
    } catch {
      // A read failure must not become an unhandled rejection inside the
      // Supabase client's boot path. Treating it as "no session" means the
      // user signs in again, which is the safe direction to fail in.
      return null;
    }
  },

  async setItem(key: string, value: string): Promise<void> {
    await writeChunks(safeKey(key), value);
  },

  async removeItem(key: string): Promise<void> {
    await deleteChunks(safeKey(key));
    // Also clear any pre-migration copy — under the raw key, for the same
    // reason `migrateLegacyValue` reads it there — so signing out cannot leave
    // a session behind in the insecure store for the next person on this phone.
    await AsyncStorage.removeItem(key);
  },
};

/**
 * `readJSON`/`writeJSON` from `lib/storage`, backed by the keychain instead of
 * AsyncStorage.
 *
 * ## What belongs here rather than in `lib/storage`
 *
 * Almost nothing. AsyncStorage is the right home for the language, the theme,
 * the daily goal and the exam history: none of them is a credential, and all of
 * them are cheap to read on a hot path. The keychain is slower, is a per-item
 * syscall, and on Android is a Keystore round-trip.
 *
 * The test is whether *restoring an old copy of the value* is an attack. For a
 * study streak it is not. For the re-auth lockout counter it is exactly the
 * attack — see `features/auth/reauth.ts`, whose whole argument for persisting
 * the counter is that "in memory this would reset on every force-quit, which is
 * a bypass anyone holding the phone would find by accident". A plaintext
 * AsyncStorage row is that same bypass one layer out: it is included in Android
 * backup by default, and directly editable on a rooted device. Values that
 * bound an attacker go here; values that merely describe the user do not.
 *
 * ## The legacy read is free, and is why this wraps the adapter
 *
 * `SecureStoreAdapter.getItem` already migrates a value it finds under the raw
 * key in AsyncStorage — it was written for the session, but the behaviour is
 * general: read the plaintext copy once, rewrite it into the keychain, delete
 * the original. Wrapping the adapter rather than calling SecureStore directly
 * means a counter written by a previous build is carried across on first read
 * and its plaintext copy removed, with no migration code of its own.
 *
 * Both functions swallow their failures, matching `lib/storage` exactly.
 * Callers that must not be blocked by a storage glitch — `reauthenticate` is
 * one, deliberately, and says so — depend on that.
 */
export async function readSecureJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await SecureStoreAdapter.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export async function writeSecureJSON(key: string, value: unknown): Promise<void> {
  try {
    await SecureStoreAdapter.setItem(key, JSON.stringify(value));
  } catch {
    // Best-effort, as in `lib/storage`. A failed write must not break the UI.
  }
}

/** Exported for tests; not part of the storage contract Supabase consumes. */
export const SECURE_STORE_CHUNK_SIZE = CHUNK_SIZE;
