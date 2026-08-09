/**
 * Proof that the person holding the phone is the account owner.
 *
 * ## Why this exists
 *
 * Three operations on the account screen are irreversible or account-taking,
 * and Supabase asks for no proof of identity before any of them:
 *
 *   - `updateUser({ password })` — does not ask for the existing password.
 *   - `updateUser({ email })`    — moves the account to a new address, after
 *                                  which that address can reset the password.
 *   - `delete_own_account`       — cascades to profiles, attempts, sessions and
 *                                  refresh tokens, with nothing to restore from.
 *
 * All three act on whatever session is stored, so without this an unlocked
 * phone is enough to lock the owner out of their own account, move it to an
 * attacker's address, or destroy it. Each one re-checks the current password
 * first.
 *
 * ## Why it is a module rather than three inline blocks
 *
 * The obvious reason is drift between three copies. The specific one is the
 * CAPTCHA token: this posts to the same `/token?grant_type=password` endpoint
 * as sign-in, so with bot protection enabled a call site that forgot the token
 * would fail with `captcha_failed` while sign-in kept working. That is a
 * confusing way to find out, and easy to miss in review because all three
 * operations *look* authenticated.
 *
 * The second reason is that it makes the invariant testable. The provider is a
 * React context and this project has no renderer tests on purpose; a security
 * check that can only be exercised by hand is one that silently stops working.
 * See `reauth.test.ts`.
 */

import { captchaOption, captchaTokenFor } from '@/features/auth/captcha';
import { readSecureJSON, writeSecureJSON } from '@/lib/secure-storage';
import { StorageKeys } from '@/lib/storage';
import { supabase } from '@/lib/supabase';

/**
 * Local backoff for the gate.
 *
 * ## Why a client-side limiter is the right control *here*
 *
 * Normally a limiter the attacker controls is worth nothing. This one is not,
 * because of who the attacker is: this gate exists for the borrowed-unlocked-
 * phone case, and that person is driving the app's own UI. Slowing that UI down
 * slows them down.
 *
 * It does nothing against someone scripting `/token?grant_type=password`
 * directly — but that person was never going to execute this function at all,
 * and GoTrue's own `sign_in_sign_ups` limit is what bounds them. The two
 * controls cover different attackers rather than duplicating each other.
 *
 * ## Why GoTrue's limit is not enough on its own
 *
 * `sign_in_sign_ups` is **per IP and shared with real sign-ins** (30 per five
 * minutes, `supabase/config.toml`). It cannot be tightened to a useful number
 * for this screen without throttling ordinary people signing in on a shared
 * network, and GoTrue offers no per-account lockout to fall back on. So without
 * this, the account screen accepted roughly 30 current-password guesses every
 * five minutes, indefinitely, against an irreversible delete — and note that
 * `passwordProblemKey` deliberately never runs on existing credentials, so the
 * password being guessed may well be a weak legacy one.
 *
 * ## Persisted, not module state — and in the keychain, not AsyncStorage
 *
 * In memory this would reset on every force-quit, which is a bypass anyone
 * holding the phone would find by accident. It survives a restart instead.
 *
 * It survives rather more than that now. AsyncStorage is unencrypted on both
 * platforms and, on Android, was eligible for backup until `allowBackup: false`
 * was set in `app.json` — so restoring a crafted backup reset this counter, and
 * that is the *same* bypass as the force-quit one, just one layer further out.
 * Writing it through `readSecureJSON`/`writeSecureJSON` puts it in the iOS
 * keychain and the Android Keystore, where the attacker this gate exists for
 * cannot rewrite it and a backup does not carry it.
 *
 * The two controls are not redundant: `allowBackup: false` protects everything
 * else in AsyncStorage as a class, and this protects the counter specifically
 * even on a device where the app's data is readable. Note the residual, stated
 * plainly — a *rooted* device can still clear the keychain item. That does not
 * matter much, because the same person can uninstall and reinstall the app,
 * which resets the counter by design; what the keychain buys is that neither is
 * accidental, and neither is a backup restore.
 *
 * A counter written by a previous build under the plaintext key is migrated on
 * first read and its AsyncStorage copy deleted — see `readSecureJSON`.
 */
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 60_000;

type BackoffState = { failures: number; lockedUntil: number };

const NO_BACKOFF: BackoffState = { failures: 0, lockedUntil: 0 };

async function readBackoff(): Promise<BackoffState> {
  const raw = await readSecureJSON<Partial<BackoffState> | null>(
    StorageKeys.reauthBackoff,
    null,
  );
  if (!raw || typeof raw !== 'object') return NO_BACKOFF;
  return {
    failures: typeof raw.failures === 'number' ? raw.failures : 0,
    lockedUntil: typeof raw.lockedUntil === 'number' ? raw.lockedUntil : 0,
  };
}

/**
 * Clears the counter. Exported because signing in as a different account on the
 * same device should not inherit the previous one's lockout.
 */
export async function clearReauthBackoff(): Promise<void> {
  await writeSecureJSON(StorageKeys.reauthBackoff, NO_BACKOFF);
}

/**
 * Verifies `currentPassword` against the signed-in account.
 *
 * Resolves only when the password is correct. Throws the Supabase error
 * unchanged on a wrong one, so `authErrorKey` maps it to
 * `invalid_credentials` — the same message the sign-in screen shows, which is
 * the accurate thing to say.
 *
 * Throws `NOT_CONFIGURED` when there is no client, no session, or no address to
 * check against. Failing closed matters more here than anywhere else in the
 * app: this function returning normally is the *only* thing standing between a
 * borrowed phone and an irreversible delete, so every path that cannot verify
 * has to throw rather than fall through.
 *
 * ## What this does *not* protect against
 *
 * This runs in the client, and the client is not a boundary — the anon key
 * ships in the bundle, so anyone holding a stolen access token can post
 * straight to GoTrue or PostgREST and never execute this function at all. It
 * closes the borrowed-unlocked-phone case, which is the common one. The
 * stolen-token case has to be closed on the server, and is:
 *
 *   - password change — `secure_password_change` in `supabase/config.toml`
 *   - email change    — `double_confirm_changes`, same file
 *   - deletion        — the `amr` freshness check inside `delete_own_account()`
 *                       (`20260804130000_require_recent_reauth.sql`)
 *
 * Each of those is the server half of a pair. Neither half substitutes for the
 * other, and this docstring used to claim more than the function delivered.
 *
 * What it *does* now bound is the rate of guessing through the app itself: five
 * wrong passwords earn a one-minute lockout, persisted so a force-quit does not
 * clear it. See the note on `MAX_ATTEMPTS` for why a client-side limiter is the
 * correct control for this particular attacker and not for the other one.
 */
export async function reauthenticate(currentPassword: string): Promise<void> {
  if (!supabase) throw new Error('NOT_CONFIGURED');

  const backoff = await readBackoff();
  if (Date.now() < backoff.lockedUntil) {
    // Thrown in the shape `authErrorKey` already reads, and mapped to the
    // existing `over_request_rate_limit` key — so this needs no new string in
    // three locales, and it says the accurate thing: too many attempts, wait.
    throw { code: 'over_request_rate_limit' };
  }

  // `getUser`, not `getSession`. `getSession` returns the session object as it
  // sits in storage — supabase-js parses it back out of SecureStore and does
  // not re-verify it — so the address this gate checks against would be one an
  // attacker with filesystem access could edit. `getUser` sends the access
  // token to GoTrue and reads the address off the *verified* response.
  //
  // The extra round-trip costs nothing real: the very next line makes a network
  // call anyway, so there is no offline case this takes away.
  const { data } = await supabase.auth.getUser();
  const email = data.user?.email;
  // No session, no valid token, or an account with no address to
  // re-authenticate against. None is something the user can act on, so it reads
  // as unconfigured rather than as a wrong password.
  if (!email) throw new Error('NOT_CONFIGURED');

  const captchaToken = await captchaTokenFor('signin');
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
    options: captchaOption(captchaToken),
  });

  if (error) {
    const failures = backoff.failures + 1;
    await writeSecureJSON(
      StorageKeys.reauthBackoff,
      failures >= MAX_ATTEMPTS
        ? { failures: 0, lockedUntil: Date.now() + LOCKOUT_MS }
        : { failures, lockedUntil: 0 },
    );
    throw error;
  }

  // Only a *correct* password clears the counter. Resetting on any settled call
  // would let an attacker launder failures by interleaving them with something
  // that succeeds.
  await clearReauthBackoff();
}

/** Exported for tests; not part of the contract callers depend on. */
export const REAUTH_MAX_ATTEMPTS = MAX_ATTEMPTS;
export const REAUTH_LOCKOUT_MS = LOCKOUT_MS;
