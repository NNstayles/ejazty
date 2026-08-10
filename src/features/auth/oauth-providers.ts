/**
 * Which sign-in providers the **server** actually accepts.
 *
 * This is the client half of a switch whose other half lives in
 * `supabase/config.toml`, and it exists because nothing in the app could
 * otherwise know. `expo-apple-authentication` can tell you the *device* can run
 * Apple's sheet; it cannot tell you the Supabase project will accept the token
 * that comes out of it. So the sign-in and sign-up screens offered two buttons
 * that could not work:
 *
 * - **Google** rendered on both platforms, unconditionally.
 * - **Apple** rendered on every real iPhone, because `isAvailableAsync` answers
 *   yes there.
 *
 * Both providers are `enabled = false` in `config.toml`, so GoTrue rejects the
 * request with `provider is not enabled`. The user meets a control that fails
 * every time, having already handed over their Apple ID or Google password to
 * the sheet — the worst moment to be told the app cannot do this.
 *
 * That is also App Store review material rather than a cosmetic defect: a
 * non-functional "Sign in with Apple" button on a screen that offers it is a
 * guideline failure, and `app.json` declares `usesAppleSignIn: true`.
 *
 * ## Turning one on
 *
 * A provider is only usable when **three** things agree, and this constant is
 * the one a code review can see:
 *
 * 1. credentials exist in the Supabase dashboard (Apple needs a paid Apple
 *    Developer account; Google needs a Cloud OAuth client),
 * 2. `[auth.external.<provider>] enabled = true` in `supabase/config.toml`,
 *    pushed with `supabase config push`,
 * 3. the entry here flips to `true`.
 *
 * Flipping this alone puts the broken button straight back. Flipping only the
 * first two hides a provider that works, which is the harmless direction and
 * why this is the safe place to keep the default.
 *
 * Deliberately a compile-time constant rather than something probed at runtime.
 * There is no unauthenticated endpoint that lists enabled providers, and the
 * alternative — offer the button, let it fail, hide it next time — shows the
 * broken control to exactly the users this exists to protect.
 */

import type { OAuthProvider } from './oauth';

/**
 * Provider → whether the project is configured to accept it.
 *
 * A total `Record`, so adding a provider to {@link OAuthProvider} is a compile
 * error until this file says whether it is live.
 */
export const OAUTH_PROVIDER_ENABLED: Record<OAuthProvider, boolean> = {
  apple: false,
  google: false,
};

/** Whether a provider may be offered at all. */
export function oauthProviderEnabled(provider: OAuthProvider): boolean {
  return OAUTH_PROVIDER_ENABLED[provider];
}

/**
 * Whether *any* provider is live.
 *
 * The divider, the "or continue with" caption and the whole block are hidden on
 * false — with no provider enabled there is nothing to be an alternative *to*,
 * and a lone rule across an empty gap reads as a control that failed to load.
 */
export function anyOAuthProviderEnabled(): boolean {
  return Object.values(OAUTH_PROVIDER_ENABLED).some(Boolean);
}
