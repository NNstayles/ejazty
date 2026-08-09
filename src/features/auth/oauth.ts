/**
 * Sign in with Apple and Google.
 *
 * ## Two mechanisms, and the split is not arbitrary
 *
 * - **Apple, on iOS, is native.** `expo-apple-authentication` returns an
 *   identity token that goes straight to Supabase via `signInWithIdToken`, with
 *   no browser involved. Apple's Human Interface Guidelines require the real
 *   button, App Store review checks for it, and the native sheet is the flow
 *   users recognise. It is also the only one of the two that cannot be done
 *   any other way on iOS without looking wrong.
 * - **Everything else is the browser flow.** `signInWithOAuth` builds the
 *   provider URL, `openAuthSessionAsync` runs it in an ephemeral in-app
 *   browser, and the `?code=` it comes back with is exchanged for a session.
 *   Google needs no native SDK for this, which keeps a whole native dependency
 *   and its credentials out of the project.
 *
 * ## Why intercepting the redirect does not hurt here
 *
 * This is the question `supabase/SECURITY.md` §3 answers *the other way* for
 * password recovery, and the difference matters enough to write down, because
 * the two look identical from a distance.
 *
 * Recovery is dangerous because **the attacker can be the initiator**: anyone
 * holding the anon key — which ships in the bundle by design — can call
 * `resetPasswordForEmail(victim, { redirectTo: <any allow-listed URL> })` while
 * keeping the PKCE `code_verifier` themselves. The victim taps the mail, the
 * code goes to whoever answers on that address, and the attacker redeems it
 * with the verifier they already hold. PKCE does not help, because the
 * interceptor *is* the initiator.
 *
 * OAuth sign-in inverts that. The flow starts here, in this install, and the
 * `code_verifier` is generated here and kept in this app's SecureStore. A
 * hostile app that registers the same `ejazty://` scheme and wins the race
 * receives a `?code=` it cannot exchange for anything. So allow-listing
 * `ejazty://auth/callback` does not reopen what §3 closed — but note that this
 * argument depends entirely on `flowType: 'pkce'` being pinned in
 * `lib/supabase.ts`. Under the implicit flow the redirect would carry a live
 * session and every word of this would be wrong.
 *
 * **Still do not add an `exp://` entry.** Under Expo Go the redirect resolves
 * to a LAN address the project does not control, and while the code would be
 * useless to an interceptor for the reason above, the entry itself stays
 * allow-listed for *every* flow — including recovery, which is exactly the
 * hole §3 exists to keep shut. OAuth therefore needs a development build, the
 * same as recovery does.
 */

import * as AppleAuthentication from 'expo-apple-authentication';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { Platform } from 'react-native';

import { supabase } from '@/lib/supabase';
import { codeFromRedirect } from './oauth-redirect';

export type OAuthProvider = 'apple' | 'google';

// Re-exported so callers have one import for the flow. The implementation
// lives in `oauth-redirect.ts`, away from anything that touches Supabase, so
// it stays reachable from a test — see the note there.
export { codeFromRedirect };

/**
 * Where the provider sends the browser back to.
 *
 * Built with `Linking.createURL` rather than hardcoded so it is right in both
 * a development build and a release, and it must match an entry in
 * `additional_redirect_urls` exactly — Supabase compares, it does not guess.
 */
export function redirectUri(): string {
  return Linking.createURL('/auth/callback');
}

/**
 * Whether the native Apple button should be offered.
 *
 * iOS only, and `isAvailableAsync` on top of the platform check because the
 * API exists on iOS versions and simulator configurations where it cannot
 * actually run. A button that opens nothing is worse than no button.
 */
export async function appleSignInAvailable(): Promise<boolean> {
  if (Platform.OS !== 'ios') return false;
  try {
    return await AppleAuthentication.isAvailableAsync();
  } catch {
    return false;
  }
}

/**
 * Signs in with Apple's native sheet.
 *
 * Apple sends the user's name **only on the very first authorisation** and
 * never again, so it is captured here and written to `user_metadata` rather
 * than being read back from the token on a later sign-in — there is no later
 * chance. Truncated to the same bound the sign-up form uses, because the same
 * CHECK constraint aborts the same insert.
 */
export async function signInWithApple(): Promise<void> {
  if (!supabase) throw new Error('NOT_CONFIGURED');

  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!credential.identityToken) throw { code: 'apple_no_token' };

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'apple',
    token: credential.identityToken,
  });
  if (error) throw error;

  const full = [credential.fullName?.givenName, credential.fullName?.familyName]
    .filter(Boolean)
    .join(' ')
    .trim();

  // Only when Apple actually gave a name and the account does not already
  // carry one: a second sign-in returns no name at all, and writing the empty
  // string would erase what the first one stored.
  const existing = (data.user?.user_metadata as { full_name?: string } | null)
    ?.full_name;
  if (full && !existing) {
    // Deliberately not awaited into the failure path: the user is signed in by
    // this point, and a failed metadata write must not read as a failed
    // sign-in. The name is recoverable from the account screen.
    void supabase.auth.updateUser({ data: { full_name: full.slice(0, 80) } });
  }
}

/**
 * Signs in through the provider's web page.
 *
 * `skipBrowserRedirect` is what makes this work on a device at all: without it
 * supabase-js tries to navigate `window.location`, which does not exist in
 * React Native. We take the URL and drive the browser ourselves.
 */
export async function signInWithProvider(
  provider: Exclude<OAuthProvider, 'apple'> | OAuthProvider,
): Promise<void> {
  if (!supabase) throw new Error('NOT_CONFIGURED');

  const redirectTo = redirectUri();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: { redirectTo, skipBrowserRedirect: true },
  });
  if (error) throw error;
  if (!data.url) throw { code: 'oauth_no_url' };

  const result = await WebBrowser.openAuthSessionAsync(data.url, redirectTo, {
    // An ephemeral session, so the provider's cookies do not persist in a
    // shared browser jar. Without it, "sign in with Google" on a borrowed
    // phone silently leaves that Google account signed in for the next person
    // who taps the button.
    preferEphemeralSession: true,
  });

  // `dismiss` and `cancel` are the user backing out. They are not errors and
  // must not be reported as one — a "something went wrong" toast for closing a
  // sheet you opened by accident is how a screen loses trust.
  if (result.type !== 'success') throw { code: 'oauth_cancelled' };

  const code = codeFromRedirect(result.url);
  if (!code) throw { code: 'oauth_no_code' };

  const { error: exchangeError } =
    await supabase.auth.exchangeCodeForSession(code);
  if (exchangeError) throw exchangeError;
}
