/**
 * Parsing for the password-recovery deep link.
 *
 * Supabase can deliver a recovery redirect in three different shapes, and which
 * one arrives depends on the project's auth flow and on whether the link was
 * consumed successfully:
 *
 *   ejazty://reset-password?code=<one-time code>            (PKCE)
 *   ejazty://reset-password#access_token=…&refresh_token=…  (implicit)
 *   ejazty://reset-password#error=access_denied&error_code=otp_expired
 *
 * All three are handled rather than only the one this project's current
 * settings produce, because the flow type is a dashboard setting nobody would
 * think to check against this file. `detectSessionInUrl` is off — correct for
 * a native app with no URL bar — so nothing parses these for us.
 *
 * This module is deliberately pure: no Supabase import, no navigation. It turns
 * a string into a decision, which is the part worth testing without a device.
 */

export type RecoveryLink =
  /** PKCE: exchange the one-time code for a session. */
  | { kind: 'code'; code: string }
  /** Implicit: the tokens are already here, set them directly. */
  | { kind: 'tokens'; accessToken: string; refreshToken: string }
  /** Supabase rejected the link — expired, already used, or malformed. */
  | { kind: 'error'; code: string };

/**
 * Reads one `a=b&c=d` segment.
 *
 * Hand-rolled rather than via `URLSearchParams`: the fragment is the half that
 * matters here, and `URL` does not expose it as searchable params. `+` is
 * decoded as a space before `decodeURIComponent`, which is what
 * `error_description` arrives encoded with.
 */
function parseParams(segment: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const pair of segment.split('&')) {
    if (!pair) continue;
    const eq = pair.indexOf('=');
    const rawKey = eq === -1 ? pair : pair.slice(0, eq);
    const rawValue = eq === -1 ? '' : pair.slice(eq + 1);
    if (!rawKey) continue;
    try {
      out[decodeURIComponent(rawKey.replace(/\+/g, ' '))] = decodeURIComponent(
        rawValue.replace(/\+/g, ' '),
      );
    } catch {
      // A malformed percent-escape must not take down the whole parse; the
      // remaining pairs may still carry what we need.
    }
  }
  return out;
}

/**
 * Extracts what a recovery redirect is telling us, or null when the URL is not
 * one — an ordinary cold start, or any other deep link into the app.
 */
export function parseRecoveryLink(url: string | null | undefined): RecoveryLink | null {
  if (!url) return null;

  const hashAt = url.indexOf('#');
  const fragment = hashAt === -1 ? '' : url.slice(hashAt + 1);
  const beforeHash = hashAt === -1 ? url : url.slice(0, hashAt);
  const queryAt = beforeHash.indexOf('?');
  const query = queryAt === -1 ? '' : beforeHash.slice(queryAt + 1);

  // Fragment wins: when Supabase sends both, the fragment holds the result and
  // the query holds only what we asked for.
  const params = { ...parseParams(query), ...parseParams(fragment) };

  // Checked before the success shapes. An expired link can still carry a
  // `code`, and treating that as usable would send the user to a new-password
  // form that cannot possibly save.
  const failure = params.error_code || params.error;
  if (failure) return { kind: 'error', code: failure };

  const accessToken = params.access_token;
  const refreshToken = params.refresh_token;
  if (accessToken && refreshToken) {
    return { kind: 'tokens', accessToken, refreshToken };
  }

  if (params.code) return { kind: 'code', code: params.code };

  return null;
}

/**
 * Error code used to reject a link whose shape this project's auth flow cannot
 * legitimately produce. Maps to `auth.errors.recoveryLinkExpired`, so the user
 * is told to request a fresh link rather than shown a generic failure.
 */
export const UNSUPPORTED_FLOW_CODE = 'flow_state_not_found';

/**
 * The shapes this app will act on — everything `RecoveryLink` can be, minus the
 * one carrying a ready-made session.
 *
 * Derived with `Exclude` rather than written out, so a variant added to
 * `RecoveryLink` later shows up here too and has to be considered rather than
 * silently admitted. Narrowing the *return type* of `redeemableLink` is what
 * makes the guarantee a compile error instead of only a runtime one: the caller
 * cannot reach `setSession` with these, because after ruling out `kind:
 * 'error'` there is nothing left but `kind: 'code'`.
 */
export type RedeemableLink = Exclude<RecoveryLink, { kind: 'tokens' }>;

/**
 * Applies this app's flow policy to a parsed link.
 *
 * `parseRecoveryLink` reports what a URL *says*, deliberately including the
 * implicit-flow `tokens` shape — the flow type is a dashboard setting, and a
 * parser that silently ignored a shape it might one day receive would be the
 * harder bug. Deciding whether to *act* on it is a separate question, and this
 * is where it is answered.
 *
 * The answer for `tokens` is no. `flowType` is pinned to `'pkce'`
 * (`src/lib/supabase.ts`), so every legitimate link this project sends arrives
 * as `?code=`. A link carrying a ready-made session therefore did not come from
 * us — and `ejazty://` is a custom scheme, which Android lets any installed app
 * or web page trigger. Calling `setSession` with tokens handed over that way is
 * session fixation: the victim is signed into the *attacker's* account without
 * noticing, and every exam attempt they go on to record syncs there.
 *
 * (What stops it being worse is `attempts.ts`, which drops a cache owned by a
 * different account rather than pushing it — so the victim's existing history
 * does not follow them into the attacker's account.)
 *
 * Kept pure and separate from the provider so it can be pinned by a test: a
 * React context is not reachable from this project's test suite, and a security
 * check that can only be exercised by hand is one that silently stops working.
 * If the project ever moves back to the implicit flow deliberately, this
 * function is the one line to change.
 */
export function redeemableLink(link: RecoveryLink): RedeemableLink {
  if (link.kind === 'tokens') {
    return { kind: 'error', code: UNSUPPORTED_FLOW_CODE };
  }
  return link;
}
