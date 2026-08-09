import 'react-native-url-polyfill/auto';

import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

import { SecureStoreAdapter } from './secure-storage';

/**
 * `EXPO_PUBLIC_` variables are inlined at build time by the Expo bundler. The
 * anon key is designed to be public — row level security on the Supabase side,
 * not secrecy of this key, is what protects your data.
 */
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * A dev build may run without a backend on purpose: the guest path has to be
 * explorable before a Supabase project exists, which is why `supabase` is
 * nullable at all. A release build must not have that latitude — a store
 * binary that silently lost its credentials strands every user in guest mode,
 * writing their history only to a device cache a reinstall erases. `__DEV__`
 * is false in production bundles, so this turns a silent degradation into a
 * failure at the first import.
 */
if (!isSupabaseConfigured && !__DEV__) {
  throw new Error(
    'Supabase is not configured. EXPO_PUBLIC_SUPABASE_URL and ' +
      'EXPO_PUBLIC_SUPABASE_ANON_KEY must be set at build time.',
  );
}

const isWeb = Platform.OS === 'web';

/**
 * The security-relevant half of the auth options, as a pure function of the
 * platform.
 *
 * Split out so it can be asserted without standing up a client: both settings
 * below are one line from being reverted and neither failure is visible from
 * the app. Nothing looks different under the wrong auth flow, and nothing looks
 * different when a refresh token is left in localStorage — they surface in an
 * incident. See `supabase.test.ts`.
 */
export function authConfig(web: boolean) {
  return {
    autoRefreshToken: true,
    /**
     * Web is a development convenience here (`npm run web`), not a shipping
     * target: EAS builds iOS and Android only, and there is no web deploy
     * config anywhere in the repo. SecureStore has no web implementation, so
     * persisting there would fall back to localStorage — where the refresh
     * token is readable by any script on the page and, with `autoRefreshToken`
     * on, stays valid until an explicit sign-out. Web therefore keeps the
     * session in memory and re-authenticates on reload.
     *
     * If web ever does ship, that needs a real answer — a server exchanging the
     * session for an httpOnly, Secure, SameSite cookie — not a silent return to
     * the localStorage default.
     */
    persistSession: !web,
    /**
     * PKCE, set explicitly. The supabase-js default is `implicit`, which
     * delivers a recovery session as `#access_token=&refresh_token=` in the
     * deep-link URL itself. `ejazty://` is a custom scheme and Android does not
     * enforce uniqueness for those — any installed app may register the same
     * one — so under implicit a hostile app that wins the race reads a live,
     * long-lived session straight out of a password-reset link.
     *
     * Under PKCE the link carries only `?code=`, which is inert without the
     * code_verifier this install holds in SecureStore. `recovery.ts` already
     * parses both shapes, so this costs no client code; it does also move the
     * sign-up confirmation link to `?code=`, which is why both email flows get
     * retested when this changes.
     *
     * The real fix for scheme hijacking is verified App Links / Universal Links
     * once a domain exists. PKCE is what makes interception harmless until then.
     */
    flowType: 'pkce' as const,
    /**
     * There is no URL bar to parse a session out of in a native app; the
     * password-recovery deep link is handled explicitly in
     * `features/auth/recovery.ts`.
     */
    detectSessionInUrl: false,
  };
}

/**
 * Null until credentials are supplied, so the app can boot and be explored
 * before a Supabase project exists. Callers must handle the null case.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        // The session is a long-lived refresh token, so it belongs in the iOS
        // keychain / Android keystore rather than AsyncStorage, which is
        // unencrypted on both platforms. On web there is no SecureStore and
        // nothing is persisted at all — see `authConfig`.
        storage: isWeb ? undefined : SecureStoreAdapter,
        ...authConfig(isWeb),
      },
    })
  : null;
