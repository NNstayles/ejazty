import type { Session } from '@supabase/supabase-js';
import * as Linking from 'expo-linking';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { clearLock as clearBiometricLock } from '@/features/auth/biometrics';
import { captchaOption, captchaTokenFor } from '@/features/auth/captcha';
import {
  externalProviders,
  hasPasswordIdentity,
} from '@/features/auth/identities';
import { clearReauthBackoff, reauthenticate } from '@/features/auth/reauth';
import { redeemableLink, type RecoveryLink } from '@/features/auth/recovery';
import { clearAccountAvatar, clearAvatar } from '@/features/profile/avatar';
import {
  clearAccountAttemptCache,
  clearAttemptCache,
  syncProfile,
} from '@/features/progress/attempts';
import {
  clearAccountQuestionStats,
  clearQuestionStats,
} from '@/features/progress/question-stats';
import { usePreferences } from '@/preferences/preferences-provider';
import { readJSON, remove, StorageKeys, writeJSON } from '@/lib/storage';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const GUEST_KEY = 'ejazty.auth.guest';

export type AuthUser = {
  id: string;
  email: string | null;
  displayName: string | null;
  /**
   * Whether this account can be re-authenticated with a password.
   *
   * False for an account created through Apple or Google, which has no
   * `encrypted_password` — so `reauthenticate()` fails for every value the user
   * could type, and the three operations gated behind it are closed to them.
   * The account screen branches on this to explain and offer the way out; it is
   * **not** an authorisation check. See `features/auth/identities.ts`.
   */
  hasPassword: boolean;
  /** Third-party providers on the account, for naming them in that explanation. */
  providers: string[];
};

type AuthValue = {
  /** False until the persisted session has been restored. */
  ready: boolean;
  user: AuthUser | null;
  /** True when browsing without an account. */
  isGuest: boolean;
  /** True when the user may enter the tabs (signed in or explicitly a guest). */
  isAuthenticated: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  /**
   * Resolves with `needsConfirmation: true` when Supabase withheld a session
   * pending email confirmation, and `false` when sign-up signed the user
   * straight in. The caller has to branch on it — otherwise an account created
   * on a project with confirmation switched off is left sitting on the sign-up
   * screen, signed in but never routed anywhere.
   */
  signUp: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ needsConfirmation: boolean }>;
  signOut: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
  /** Changes the display name held in `user_metadata.full_name`. */
  updateName: (name: string) => Promise<void>;
  /**
   * Starts an email change, after re-checking the current password.
   *
   * Supabase confirms the change by mail before it takes effect, so the address
   * on screen does not change until the user clicks the link — the caller
   * should say so rather than reporting success.
   *
   * Re-authenticates for the same reason `updatePassword` does: moving the
   * account to a new address is the other half of a takeover, since whoever
   * controls the address can then reset the password.
   */
  updateEmail: (currentPassword: string, email: string) => Promise<void>;
  /**
   * Changes the password after re-checking the current one.
   *
   * Supabase's `updateUser` does not ask for the existing password, so on an
   * unlocked phone anyone could lock the owner out of their own account. The
   * current password is verified first and a wrong one throws
   * `invalid_credentials`.
   */
  updatePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  /**
   * Deletes the account and wipes this device's copy of the user's data, after
   * re-checking the current password.
   *
   * Needs the `delete_own_account` SQL function from `supabase/migrations/`;
   * see the note on `deleteAccount` below for why this cannot be done from the
   * client alone.
   */
  deleteAccount: (currentPassword: string) => Promise<void>;
  /**
   * Sends the "reset your password" mail.
   *
   * Resolves either way — see the note on the implementation for why a wrong
   * address must not be reported as one.
   */
  requestPasswordReset: (email: string) => Promise<void>;
  /**
   * Turns a recovery deep link into a signed-in session, so the new password
   * can be set. Throws if the link was expired, already used, or malformed.
   */
  redeemRecoveryLink: (link: RecoveryLink) => Promise<void>;
  /**
   * Sets a new password during recovery.
   *
   * Unlike `updatePassword` this does not re-authenticate: the recovery link
   * is itself the proof, and the user is here precisely because they cannot
   * supply the current password.
   */
  resetPassword: (newPassword: string) => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

function toUser(session: Session | null): AuthUser | null {
  if (!session?.user) return null;
  const meta = session.user.user_metadata as { full_name?: string } | null;
  // Read off the session rather than fetched. `identities` rides along with the
  // user object, so this costs no round-trip — and unlike `reauthenticate`,
  // which deliberately re-verifies with `getUser()` because it is a gate, this
  // only decides what the account screen offers. A tampered session buys
  // nothing: claiming a password you do not have shows you a form that fails,
  // and claiming you have none shows you a recovery link that works anyway.
  const identities = session.user.identities;
  return {
    id: session.user.id,
    email: session.user.email ?? null,
    displayName: meta?.full_name ?? null,
    hasPassword: hasPasswordIdentity(identities),
    providers: externalProviders(identities),
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Available because this provider is nested inside `PreferencesProvider`
  // (see the provider order in `src/app/_layout.tsx`).
  const { language } = usePreferences();

  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const guest = await readJSON<boolean>(GUEST_KEY, false);
      if (!cancelled) setIsGuest(guest);

      if (!supabase) {
        if (!cancelled) setReady(true);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setUser(toUser(data.session));
      setReady(true);
    })();

    // Keeps React state aligned with token refreshes and sign-outs that happen
    // outside of the explicit calls below.
    const subscription = supabase?.auth.onAuthStateChange((_event, session) => {
      setUser(toUser(session));
    });

    return () => {
      cancelled = true;
      subscription?.data.subscription.unsubscribe();
    };
  }, []);

  /**
   * Mirrors the account into `public.profiles`.
   *
   * Runs on sign-in, on a name change and on a language change, so the row
   * tracks whatever the client last knew. Deliberately fire-and-forget: the
   * profile row is a convenience copy for querying, and the authoritative
   * display name stays in `user_metadata`.
   */
  const displayName = user?.displayName ?? null;
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;
    void syncProfile(userId, displayName, language);
  }, [userId, displayName, language]);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('NOT_CONFIGURED');
    // Unauthenticated endpoint: carries a CAPTCHA token when a provider is
    // registered, and nothing when one is not. GoTrue decides whether that is
    // acceptable — see `features/auth/captcha.ts`.
    const captchaToken = await captchaTokenFor('signin');
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
      options: captchaOption(captchaToken),
    });
    if (error) throw error;
    await remove(GUEST_KEY);
    setIsGuest(false);
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      if (!supabase) throw new Error('NOT_CONFIGURED');
      const captchaToken = await captchaTokenFor('signup');
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: name.trim() },
          ...captchaOption(captchaToken),
        },
      });
      if (error) throw error;
      await remove(GUEST_KEY);
      setIsGuest(false);
      // Supabase returns a session only when email confirmation is off, which
      // is how this project is configured (`auth.email.enable_confirmations =
      // false` in supabase/config.toml), so the live path is a session and the
      // caller routes straight into the app. With confirmation on, `session` is
      // null and the user has to visit their inbox first — one config key away,
      // which is why the caller must keep branching on this rather than
      // assuming either answer.
      return { needsConfirmation: data.session === null };
    },
    [],
  );

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
    await remove(GUEST_KEY);
    // Only an *account's* cache goes with the session. Its attempts are safe in
    // Supabase by now, and leaving them would show one person's history to
    // whoever signs in on this phone next.
    //
    // A guest's are not safe anywhere else, and this same button is how a guest
    // leaves guest mode to go and register — so clearing theirs threw away the
    // history the account they were about to create would have adopted. See
    // `clearAccountAttemptCache`.
    await clearAccountAttemptCache();
    // Per-question stats follow the attempts exactly, and for the same reason:
    // they are in Supabase by now, and a study record left behind would tell
    // the next account on this phone which questions the previous person kept
    // getting wrong. A guest's are kept so the account they are about to make
    // adopts them.
    await clearAccountQuestionStats();
    // The picture follows the same rule as the attempts for the same reason,
    // and it is the more visible half: an account's photo left on the phone
    // greets whoever signs in next by name and face. A guest's is kept, because
    // this button is also how a guest goes off to register.
    await clearAccountAvatar();
    // The re-auth lockout is device-wide, so without this the next person to
    // sign in on this phone could inherit the previous account's cooldown. It
    // is not a bypass to clear it here: signing back in requires the very
    // password an attacker would be trying to guess.
    await clearReauthBackoff();
    // Unconditional, unlike the cache and the picture above, and it is the one
    // place the guest/account asymmetry does not apply: biometric enrolment
    // belongs to the *device*, not the account, so a lock left set would meet
    // the next person to sign in on this phone with a prompt they can pass —
    // protection that is simultaneously gone for its owner and in the way for
    // everyone else. See `features/auth/biometrics.ts`.
    await clearBiometricLock();
    setUser(null);
    setIsGuest(false);
  }, []);

  const continueAsGuest = useCallback(async () => {
    await writeJSON(GUEST_KEY, true);
    setIsGuest(true);
  }, []);

  const updateName = useCallback(async (name: string) => {
    if (!supabase) throw new Error('NOT_CONFIGURED');
    const { data, error } = await supabase.auth.updateUser({
      data: { full_name: name.trim() },
    });
    if (error) throw error;
    // `updateUser` does not always emit an auth state change, so the local copy
    // is refreshed here rather than waiting for a listener that may not fire.
    if (data.user) {
      setUser((prev) =>
        prev ? { ...prev, displayName: name.trim() || null } : prev,
      );
    }
  }, []);

  const updateEmail = useCallback(
    async (currentPassword: string, email: string) => {
      if (!supabase) throw new Error('NOT_CONFIGURED');

      // Whoever controls the address controls the account: they can request a
      // password reset and take it over. That makes an email change as
      // sensitive as a password change, so it is gated the same way.
      //
      // This is the client half. The server half is "Secure email change" in
      // the Supabase dashboard, which makes the *old* address confirm too — see
      // supabase/SECURITY.md section 4. Neither substitutes for the other: this
      // stops the change being started from an unlocked phone, that stops it
      // completing if the session was taken some other way.
      await reauthenticate(currentPassword);

      const { error } = await supabase.auth.updateUser({ email: email.trim() });
      if (error) throw error;
      // Deliberately not updated locally: the address only changes once the user
      // confirms it by mail, and showing the new one now would be a lie.
    },
    [],
  );

  const updatePassword = useCallback(
    async (currentPassword: string, newPassword: string) => {
      if (!supabase) throw new Error('NOT_CONFIGURED');

      // Supabase would accept the new password without this, which makes an
      // unlocked phone enough to lock the owner out of their own account.
      await reauthenticate(currentPassword);

      const { error } = await supabase.auth.updateUser({ password: newPassword });
      if (error) throw error;
    },
    [],
  );

  /**
   * Account deletion has to happen on the server.
   *
   * `auth.admin.deleteUser` needs the service-role key, and every
   * `EXPO_PUBLIC_` value is inlined into the JS bundle at build time — shipping
   * that key would hand every installer a credential that bypasses RLS
   * entirely. Instead the app calls a `security definer` SQL function that
   * deletes only `auth.uid()`, so the privilege stays in the database and the
   * client can never name someone else's row.
   */
  const deleteAccount = useCallback(async (currentPassword: string) => {
    if (!supabase) throw new Error('NOT_CONFIGURED');

    // The most destructive operation in the app, and the only irreversible one:
    // `delete from auth.users` cascades to `profiles`, `exam_attempts`,
    // sessions and refresh tokens, with no soft delete and nothing to restore
    // from. An OS confirmation dialog is proof of a tap, not proof of identity,
    // so this is gated at least as hard as a password change.
    await reauthenticate(currentPassword);

    const { error } = await supabase.rpc('delete_own_account');
    if (error) throw error;

    // The account is gone; drop this device's copy of the user's data too. The
    // server side goes with it: `exam_attempts` and `profiles` both cascade
    // from `auth.users`.
    // Language and theme are device preferences, not account data, so they stay.
    //
    // Local scope on purpose: the user row no longer exists, so the default
    // global sign-out would post this device's now-dead JWT to `/logout` and
    // get a 401 back. There are no server-side sessions left to revoke — the
    // cascade took them — so the only work left is clearing the stored token.
    await supabase.auth.signOut({ scope: 'local' });
    await clearAttemptCache();
    // Unconditional, like the attempts: the remote rows cascade from
    // `auth.users`, so there is nothing left for a device-local copy to belong
    // to.
    await clearQuestionStats();
    // Unconditional here, unlike sign-out: the account is gone, so there is no
    // device-local picture left to preserve for it.
    await clearAvatar();
    await clearBiometricLock();
    await remove(GUEST_KEY);
    setUser(null);
    setIsGuest(false);
  }, []);

  /**
   * Sends the recovery mail.
   *
   * `redirectTo` is built with `Linking.createURL` rather than hard-coded, so
   * it resolves to `exp://…/--/reset-password` under Expo Go and
   * `ejazty://reset-password` in a standalone build.
   *
   * **Only the standalone form is allow-listed** (`additional_redirect_urls` in
   * `supabase/config.toml`), so under Expo Go this mail falls back to
   * `site_url` — a dead link — and never reaches the app. That is deliberate,
   * not a gap: an `exp://` entry is a permanently allow-listed redirect to a
   * host the project does not control, and since the anon key is extractable,
   * anyone can select it as the `redirectTo` for *someone else's* reset. They
   * hold the PKCE `code_verifier`; whoever answers on that address gets the
   * code. Do not add one to test with — see SECURITY.md section 3 for the
   * options that do not reopen it.
   *
   * Note this resolves even when the address has no account. Supabase returns
   * success either way, and surfacing "no account for that address" would turn
   * this screen into an oracle for which emails are registered.
   */
  const requestPasswordReset = useCallback(async (email: string) => {
    if (!supabase) throw new Error('NOT_CONFIGURED');
    const redirectTo = Linking.createURL('/reset-password');
    // The endpoint that actually sends mail, and therefore the one whose abuse
    // exhausts the project's send quota and denies password recovery to
    // everyone else. It is the highest-value of the four to protect.
    const captchaToken = await captchaTokenFor('recover');
    const { error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
      redirectTo,
      ...captchaOption(captchaToken),
    });
    if (error) throw error;
  }, []);

  const redeemRecoveryLink = useCallback(async (link: RecoveryLink) => {
    if (!supabase) throw new Error('NOT_CONFIGURED');

    // Policy first, and it is not optional: `redeemableLink` is what turns a
    // link carrying a ready-made session into a rejection. Without it, any app
    // or web page able to open `ejazty://` could hand this screen an
    // attacker-owned session and have it adopted. See `recovery.ts`.
    const decided = redeemableLink(link);

    if (decided.kind === 'error') {
      // Thrown in the shape `authErrorKey` already reads, so an expired link
      // maps to its own message rather than the generic one.
      throw { code: decided.code };
    }

    const { error } = await supabase.auth.exchangeCodeForSession(decided.code);
    if (error) throw error;
  }, []);

  /**
   * No re-authentication here, unlike `updatePassword`: the recovery link is
   * the proof of identity, and requiring the current password would defeat the
   * only flow that exists for someone who has forgotten it. The link is
   * single-use and short-lived, which is what keeps that safe.
   */
  const resetPassword = useCallback(async (newPassword: string) => {
    if (!supabase) throw new Error('NOT_CONFIGURED');
    const { data } = await supabase.auth.getSession();
    // Without a session the recovery link was never redeemed, and `updateUser`
    // would fail with a confusing generic error instead of saying so.
    if (!data.session) throw { code: 'session_not_found' };

    const { error } = await supabase.auth.updateUser({ password: newPassword });
    if (error) throw error;
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      ready,
      user,
      isGuest,
      isAuthenticated: Boolean(user) || isGuest,
      configured: isSupabaseConfigured,
      signIn,
      signUp,
      signOut,
      continueAsGuest,
      updateName,
      updateEmail,
      updatePassword,
      deleteAccount,
      requestPasswordReset,
      redeemRecoveryLink,
      resetPassword,
    }),
    [
      ready,
      user,
      isGuest,
      signIn,
      signUp,
      signOut,
      continueAsGuest,
      updateName,
      updateEmail,
      updatePassword,
      deleteAccount,
      requestPasswordReset,
      redeemRecoveryLink,
      resetPassword,
    ],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Referenced so the storage key stays greppable alongside the others. */
export const AuthStorageKeys = { guest: GUEST_KEY, ...StorageKeys };
