/**
 * Maps an auth failure onto a translation key.
 *
 * Supabase reports errors in English only, so surfacing `error.message`
 * directly would show English to an Arabic or Sorani user — the one place in
 * the app where that could still happen. Matching is structural rather than by
 * `instanceof`: `AuthError` is not re-exported from `@supabase/supabase-js`.
 */

/**
 * Own-property test, in the form that works on every engine this app runs on.
 *
 * `Object.hasOwn` reads better and is the obvious thing to reach for, but it is
 * ES2022 and **JSC does not implement it** — React Native's own
 * `Animated/nodes/AnimatedProps.js` carries the same fallback for the same
 * reason. Using it directly would turn the bug guarded below into a `TypeError`
 * on every auth failure on a JSC build, which is strictly worse than the bug.
 */
const hasOwn = (obj: object, key: string): boolean =>
  Object.prototype.hasOwnProperty.call(obj, key);

/** Stable `error.code` values, which are locale-independent. */
const CODE_KEYS: Record<string, string> = {
  invalid_credentials: 'auth.errors.invalidCredentials',
  email_not_confirmed: 'auth.errors.emailNotConfirmed',
  user_already_exists: 'auth.errors.emailExists',
  email_exists: 'auth.errors.emailExists',
  weak_password: 'auth.errors.weakPassword',
  over_request_rate_limit: 'auth.errors.rateLimited',
  over_email_send_rate_limit: 'auth.errors.rateLimited',
  validation_failed: 'auth.errors.invalidCredentials',
  same_password: 'auth.errors.samePassword',
  email_address_not_authorized: 'auth.errors.emailNotAllowed',
  // Password recovery. A recovery link is single-use and short-lived, so an
  // expired or already-consumed one is the ordinary failure here, not an edge
  // case — it gets a message that says to request a fresh one.
  otp_expired: 'auth.errors.recoveryLinkExpired',
  access_denied: 'auth.errors.recoveryLinkExpired',
  flow_state_expired: 'auth.errors.recoveryLinkExpired',
  flow_state_not_found: 'auth.errors.recoveryLinkExpired',
  bad_code_verifier: 'auth.errors.recoveryLinkExpired',
  // Raised by `resetPassword` when the link was never redeemed, so there is no
  // session to change the password on.
  session_not_found: 'auth.errors.recoveryLinkExpired',
  // PostgREST: the RPC does not exist. Means the delete_own_account migration
  // has not been applied to this project yet — a setup gap, not a user error,
  // so it gets its own message instead of the generic one.
  PGRST202: 'auth.errors.deleteNotSetUp',
  // Raised by that function when it is somehow called without a JWT.
  '28000': 'auth.errors.sessionExpired',
  // Postgres insufficient_privilege. `delete_own_account` is granted to
  // `authenticated` only, so reaching this means the request went up as `anon`
  // — an expired or rejected JWT, not a missing migration.
  '42501': 'auth.errors.sessionExpired',
  // Raised by GoTrue when bot protection is enabled on the project but the
  // request carried no `captchaToken`. A setup gap rather than a user error, so
  // it says so instead of blaming the credentials.
  captcha_failed: 'auth.errors.captchaFailed',
  // Postgres program_limit_exceeded, raised by `enforce_attempt_quota` in
  // 20260803170000_bound_user_input.sql. Only reachable at 2000 stored attempts,
  // which no real learner hits — but it must not read as a generic failure.
  '54000': 'auth.errors.quotaExceeded',
  // The length bounds from the same migration. Postgres reports a failed CHECK
  // as 23514 (check_violation); the only client-supplied values that can trip
  // one are an over-long display name or client_id.
  '23514': 'auth.errors.valueTooLong',
  /*
    The three ways a provider sign-in can fall over *without* the user having
    cancelled it, all raised by `features/auth/oauth.ts`: Apple returned a
    credential with no identity token, Supabase built no authorisation URL, or
    the browser came back to the redirect carrying no `code`.

    They were unmapped, so all three landed on `auth.errors.generic` — which is
    safe (no raw English can reach the screen, and `auth.test.ts` pins that) but
    unhelpful: "Something went wrong" beside two provider buttons gives no hint
    that the email form immediately below still works. They share one message
    for that reason — the distinction between them is diagnostic rather than
    anything the user can act on differently.

    `oauth_cancelled` is deliberately *not* here. Backing out of the sheet is
    not a failure, and `SocialSignIn` returns early on it rather than showing
    anything at all; giving it a message would be how it acquires one.
  */
  apple_no_token: 'auth.errors.oauthFailed',
  oauth_no_url: 'auth.errors.oauthFailed',
  oauth_no_code: 'auth.errors.oauthFailed',
};

export function authErrorKey(error: unknown): string {
  if (typeof error !== 'object' || error === null) return 'auth.errors.generic';

  const { code, name, message } = error as {
    code?: string;
    name?: string;
    message?: string;
  };

  // Thrown by the provider when Supabase has no URL/key configured.
  if (message === 'NOT_CONFIGURED') return 'auth.notConfigured';
  // An own-property test rather than a bare lookup: `code` is not always ours.
  // The recovery deep link carries `error_code` straight from the URL
  // (`recovery.ts`), and `redeemRecoveryLink` rethrows it as `{ code }` — so an
  // attacker-supplied link can name a key on `Object.prototype`.
  // `CODE_KEYS['constructor']` and `CODE_KEYS['toString']` are both truthy
  // *functions*, and a bare lookup returns one out of a signature that promises
  // a string: the first renders as an empty error line, the second throws
  // inside `t()` and becomes an unhandled rejection. Restricting the lookup to
  // the keys declared above is the whole fix; anything else falls through to
  // the generic message.
  if (code && hasOwn(CODE_KEYS, code)) return CODE_KEYS[code];
  // Connection failures arrive without a code.
  if (name === 'AuthRetryableFetchError') return 'auth.errors.network';

  return 'auth.errors.generic';
}
