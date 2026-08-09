/**
 * Tests for the recovery deep-link parser.
 *
 * This is the one part of password recovery that can be tested without a
 * device, a mail server and a live Supabase project — and it is also the part
 * most likely to be wrong, because the link arrives in three different shapes
 * depending on a dashboard setting nobody reads this file next to.
 *
 * The failure that matters is treating a *failed* link as usable: an expired
 * recovery redirect can still carry a `code`, and taking it would drop the user
 * on a new-password form that cannot possibly save, with no explanation.
 */

// `errors.ts` is pure too, so pulling it in here keeps the rejection code and
// the message it maps to asserted together rather than in two files that can
// drift apart silently.
import { authErrorKey } from './errors';
import {
  parseRecoveryLink,
  redeemableLink,
  UNSUPPORTED_FLOW_CODE,
} from './recovery';

describe('parseRecoveryLink', () => {
  describe('PKCE links', () => {
    it('reads a one-time code from the query string', () => {
      expect(parseRecoveryLink('ejazty://reset-password?code=abc123')).toEqual({
        kind: 'code',
        code: 'abc123',
      });
    });

    it('reads a code from an Expo Go style URL', () => {
      // Expo Go serves the app from exp://<lan-ip>:8081/--/<path>, so the
      // redirect that comes back looks nothing like the standalone scheme.
      const url = 'exp://192.168.1.5:8081/--/reset-password?code=abc123';

      expect(parseRecoveryLink(url)).toEqual({ kind: 'code', code: 'abc123' });
    });

    it('percent-decodes the code', () => {
      expect(parseRecoveryLink('ejazty://reset-password?code=a%2Bb%2Fc')).toEqual({
        kind: 'code',
        code: 'a+b/c',
      });
    });
  });

  describe('implicit links', () => {
    it('reads both tokens out of the fragment', () => {
      const url =
        'ejazty://reset-password#access_token=at-1&refresh_token=rt-1' +
        '&expires_in=3600&token_type=bearer&type=recovery';

      expect(parseRecoveryLink(url)).toEqual({
        kind: 'tokens',
        accessToken: 'at-1',
        refreshToken: 'rt-1',
      });
    });

    it('ignores a fragment carrying only an access token', () => {
      // `setSession` needs both. Half a pair is not a session, and returning
      // one would surface as an opaque Supabase error instead of "bad link".
      const url = 'ejazty://reset-password#access_token=at-1&type=recovery';

      expect(parseRecoveryLink(url)).toBeNull();
    });
  });

  describe('failed links', () => {
    it('reports an expired link by its error_code', () => {
      const url =
        'ejazty://reset-password#error=access_denied&error_code=otp_expired' +
        '&error_description=Email+link+is+invalid+or+has+expired';

      expect(parseRecoveryLink(url)).toEqual({
        kind: 'error',
        code: 'otp_expired',
      });
    });

    it('falls back to `error` when there is no `error_code`', () => {
      const url = 'ejazty://reset-password#error=access_denied';

      expect(parseRecoveryLink(url)).toEqual({
        kind: 'error',
        code: 'access_denied',
      });
    });

    it('prefers the error over a code that arrived alongside it', () => {
      // The important case. Supabase can send both; taking the code would send
      // the user to a form that silently cannot work.
      const url = 'ejazty://reset-password?code=abc123#error_code=otp_expired';

      expect(parseRecoveryLink(url)).toEqual({
        kind: 'error',
        code: 'otp_expired',
      });
    });

    it('prefers the error over tokens that arrived alongside it', () => {
      const url =
        'ejazty://reset-password#error_code=otp_expired&access_token=at-1&refresh_token=rt-1';

      expect(parseRecoveryLink(url)).toEqual({
        kind: 'error',
        code: 'otp_expired',
      });
    });
  });

  describe('non-recovery input', () => {
    it.each([
      ['null', null],
      ['undefined', undefined],
      ['an empty string', ''],
    ])('returns null for %s', (_label, value) => {
      expect(parseRecoveryLink(value)).toBeNull();
    });

    it('returns null for a plain cold-start URL', () => {
      // The app's own launch URL reaches this parser on every cold start.
      expect(parseRecoveryLink('ejazty://')).toBeNull();
      expect(parseRecoveryLink('ejazty://learn')).toBeNull();
    });

    it('returns null when someone opens the route directly', () => {
      expect(parseRecoveryLink('ejazty://reset-password')).toBeNull();
    });

    it('ignores unrelated query parameters', () => {
      expect(parseRecoveryLink('ejazty://reset-password?utm_source=mail')).toBeNull();
    });
  });

  describe('robustness', () => {
    it('survives a malformed percent-escape without losing the rest', () => {
      // `decodeURIComponent('%zz')` throws. One bad pair must not take down the
      // parse of the pair that actually matters.
      const url = 'ejazty://reset-password?bad=%zz&code=abc123';

      expect(parseRecoveryLink(url)).toEqual({ kind: 'code', code: 'abc123' });
    });

    it('tolerates empty pairs and a trailing ampersand', () => {
      const url = 'ejazty://reset-password?&&code=abc123&';

      expect(parseRecoveryLink(url)).toEqual({ kind: 'code', code: 'abc123' });
    });

    it('lets the fragment win over the query for the same key', () => {
      // Supabase puts the outcome in the fragment; anything in the query is
      // what we asked for on the way out.
      const url = 'ejazty://reset-password?code=stale#code=fresh';

      expect(parseRecoveryLink(url)).toEqual({ kind: 'code', code: 'fresh' });
    });
  });
});

/**
 * The flow policy, which is the half that decides whether to *act* on a parsed
 * link rather than what the link says.
 *
 * This exists because `ejazty://` is a custom scheme and Android does not make
 * those exclusive: any installed app, and any web page, can send this app a
 * URL of its choosing. Under the implicit flow that URL carries a complete,
 * ready-to-use session — so a link the app adopts on sight is a way to sign the
 * victim into the *attacker's* account, after which everything they study syncs
 * there.
 *
 * The project pins `flowType: 'pkce'` precisely so its own links never carry
 * tokens, which leaves the token shape reachable only by someone supplying it
 * deliberately. Rejecting it costs nothing and closes the hole.
 *
 * Pinned here rather than in the provider for the reason `reauth.test.ts` gives:
 * the provider is a React context, this project has no renderer tests, and a
 * security check reachable only by hand is one that silently stops working.
 */
describe('redeemableLink', () => {
  it('refuses a link carrying a ready-made session', () => {
    const link = parseRecoveryLink(
      'ejazty://reset-password#access_token=stolen-at&refresh_token=stolen-rt',
    );

    // The parser still reports it — reporting and acting are separate.
    expect(link).toEqual({
      kind: 'tokens',
      accessToken: 'stolen-at',
      refreshToken: 'stolen-rt',
    });

    // The policy refuses it.
    expect(redeemableLink(link!)).toEqual({
      kind: 'error',
      code: UNSUPPORTED_FLOW_CODE,
    });
  });

  it('never lets a token shape through, whatever the tokens look like', () => {
    // A plausible-looking JWT pair must fare no better than an obvious one:
    // the rejection is about where the link came from, not about its contents.
    const link = redeemableLink({
      kind: 'tokens',
      accessToken: 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIn0.sig',
      refreshToken: 'v1.MRfSt0kEn',
    });

    expect(link.kind).toBe('error');
  });

  it('rejects with a code the user can act on', () => {
    // Not the generic message: the user is told the link is no good and to
    // request a fresh one, which is both true and the only useful next step.
    // `errors.ts` owns the mapping; this asserts the two agree.
    expect(UNSUPPORTED_FLOW_CODE).toBe('flow_state_not_found');
    expect(authErrorKey({ code: UNSUPPORTED_FLOW_CODE })).toBe(
      'auth.errors.recoveryLinkExpired',
    );
  });

  it('passes a PKCE code through untouched', () => {
    // The shape this project actually uses must be unaffected. If this fails,
    // the guard has broken password recovery outright.
    const link = { kind: 'code', code: 'abc123' } as const;

    expect(redeemableLink(link)).toBe(link);
  });

  it('passes an error through untouched', () => {
    // An expired link must keep its own code rather than being flattened into
    // the unsupported-flow one, or every failure would read the same.
    const link = { kind: 'error', code: 'otp_expired' } as const;

    expect(redeemableLink(link)).toBe(link);
  });
});
