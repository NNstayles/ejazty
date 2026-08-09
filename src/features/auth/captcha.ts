/**
 * The seam where a CAPTCHA provider plugs into the unauthenticated auth calls.
 *
 * ## Why this exists
 *
 * Three GoTrue endpoints are reachable without a session: sign-in, sign-up and
 * password recovery. Because this is a mobile app, `EXPO_PUBLIC_` values are
 * inlined into the bundle, so the anon key can be extracted from any APK in
 * about thirty seconds — "only our app calls this" is never true here. Anyone
 * can script those three endpoints directly.
 *
 * The two abuses that follow are not data disclosure, they are availability:
 * scripted `recover` calls burn the project's hourly email allowance, after
 * which *real users cannot reset their passwords*; and mass unsolicited mail
 * damages the sending domain's reputation. Both are cheap precisely because the
 * built-in SMTP ceiling is low.
 *
 * The fix is a dashboard toggle (Authentication → Attack Protection) plus a
 * token on each request. This module is the client half.
 *
 * ## Why a registry rather than a prop on three screens
 *
 * The actual CAPTCHA widget is a native module — `@hcaptcha/react-native-hcaptcha`
 * or the Turnstile equivalent — which **does not run in Expo Go** and needs a
 * development build. This project pins SDK 54 specifically so device testing
 * through Expo Go keeps working, so taking that dependency is a deliberate
 * decision with a real cost, not a detail to slip in.
 *
 * Keeping the seam here means that decision stays a one-file change: register a
 * provider at app start and every call site is covered, including the re-auth
 * inside `updatePassword` that is easy to forget. Until one is registered this
 * resolves to `undefined` and behaves exactly as before.
 *
 * ## Failing open is correct here
 *
 * A provider that throws, or is simply absent, yields `undefined` and the
 * request goes up without a token. That is not the client waving itself
 * through: **GoTrue is the authority**. With bot protection off, the request was
 * always going to succeed. With it on, GoTrue rejects the tokenless request with
 * `captcha_failed`, which `authErrorKey` already maps to its own message. The
 * server decides; this module only supplies evidence when it can.
 *
 * The alternative — blocking sign-in locally when the widget fails to load —
 * would lock every user out of a correctly configured app because a third-party
 * script did not load.
 */

/**
 * Which endpoint the token is for.
 *
 * hCaptcha and Turnstile do not care, but Supabase's own rate limits are
 * per-endpoint and a provider may reasonably want to render a different
 * challenge for a password reset than for a sign-in.
 */
export type CaptchaAction = 'signin' | 'signup' | 'recover';

/**
 * Produces a token for one request, or `undefined` when it cannot.
 *
 * Called once per auth attempt. Tokens are single-use — do not cache the
 * result.
 */
export type CaptchaProvider = (
  action: CaptchaAction,
) => Promise<string | undefined>;

/**
 * How long to wait for a provider before giving up on it.
 *
 * A challenge that never resolves would otherwise leave the sign-in button
 * spinning forever with no error and no way back. Ten seconds is long enough
 * for a visible challenge on a slow connection and short enough that a wedged
 * provider degrades to the tokenless path — which GoTrue then rejects legibly —
 * rather than to a hung screen.
 */
const PROVIDER_TIMEOUT_MS = 10_000;

let provider: CaptchaProvider | null = null;

/**
 * Registers the app's CAPTCHA provider, or clears it with `null`.
 *
 * Call once during start-up, before the auth screens can be reached. Replacing
 * a provider is allowed so a test can install a double and restore afterwards.
 */
export function setCaptchaProvider(next: CaptchaProvider | null): void {
  provider = next;
}

/** Whether a provider is currently registered. Exposed for diagnostics. */
export function hasCaptchaProvider(): boolean {
  return provider !== null;
}

/**
 * The token to attach to `action`, or `undefined` when there is none to be had.
 *
 * Never rejects: every failure path — no provider, a throwing provider, a
 * provider that never settles — resolves to `undefined` so the caller can hand
 * the decision to GoTrue. See the note on failing open above.
 */
export async function captchaTokenFor(
  action: CaptchaAction,
): Promise<string | undefined> {
  const current = provider;
  if (!current) return undefined;

  // `Promise.race` settles on the first result but does not cancel the loser,
  // so the timer has to be cleared by hand. Left dangling it keeps a 10-second
  // handle alive after every successful challenge — which on a device is a
  // leak per auth attempt, and under Jest holds the worker open past the run.
  let timer: ReturnType<typeof setTimeout> | undefined;

  try {
    const token = await Promise.race([
      // Called inside the `try` so a provider that throws synchronously — an
      // unlinked native module is the usual way — is caught like any other
      // failure rather than escaping as a rejection.
      Promise.resolve(current(action)),
      new Promise<undefined>((resolve) => {
        timer = setTimeout(() => resolve(undefined), PROVIDER_TIMEOUT_MS);
      }),
    ]);
    // A provider returning '' is telling us it has nothing; sending an empty
    // string would be rejected as a malformed token rather than as a missing
    // one, which is a worse error to debug.
    return token ? token : undefined;
  } catch {
    return undefined;
  } finally {
    if (timer !== undefined) clearTimeout(timer);
  }
}

/**
 * Spreads into a supabase-js `options` object, contributing nothing when there
 * is no token.
 *
 * `{ captchaToken: undefined }` would serialise away harmlessly today, but this
 * keeps the request body free of keys we did not mean to send and reads better
 * at the four call sites.
 */
export function captchaOption(
  token: string | undefined,
): { captchaToken: string } | Record<string, never> {
  return token ? { captchaToken: token } : {};
}

/** Exported for tests; not part of the contract callers depend on. */
export const CAPTCHA_PROVIDER_TIMEOUT_MS = PROVIDER_TIMEOUT_MS;
