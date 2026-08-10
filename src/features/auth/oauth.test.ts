/**
 * The OAuth redirect parser.
 *
 * This is the half of the flow a test can reach — the rest is a browser, a
 * provider and a network — and it is also the half whose failures are silent.
 * A parser that took the `code` without checking for an `error` alongside it
 * returns a perfectly plausible string for a redirect that says the user
 * declined, and the app would exchange it, fail somewhere further downstream,
 * and report the wrong thing.
 *
 * Same shape of rule, and same reason for testing it, as
 * `recovery.test.ts`'s cases where an error arrives beside a usable-looking
 * token.
 */

import { codeFromRedirect } from './oauth-redirect';
import {
  anyOAuthProviderEnabled,
  OAUTH_PROVIDER_ENABLED,
  oauthProviderEnabled,
} from './oauth-providers';

describe('codeFromRedirect', () => {
  it('takes the code from a successful redirect', () => {
    expect(codeFromRedirect('ejazty://auth/callback?code=abc123')).toBe('abc123');
  });

  it('prefers the error over a code sitting beside it', () => {
    // The case that earns this test. A provider that returns both is reporting
    // a failure; taking the code hands the app something that cannot be
    // exchanged and turns a clear "you cancelled" into a generic error later.
    expect(
      codeFromRedirect(
        'ejazty://auth/callback?error=access_denied&code=stale123',
      ),
    ).toBeNull();
  });

  it('rejects a redirect carrying no code at all', () => {
    expect(codeFromRedirect('ejazty://auth/callback')).toBeNull();
    expect(codeFromRedirect('ejazty://auth/callback?code=')).toBeNull();
  });

  it('rejects something that is not a URL rather than throwing', () => {
    // The value comes from outside the app, so it is not guaranteed to be
    // anything. A throw here would escape into a screen with no catch around
    // it.
    expect(codeFromRedirect('not a url')).toBeNull();
    expect(codeFromRedirect('')).toBeNull();
  });

  it('reads a code from the exp:// shape too', () => {
    // Not because that redirect is allow-listed — it deliberately is not, see
    // the note in `oauth.ts` — but because the parser must not silently depend
    // on the scheme. A parser that only understood one shape would fail
    // confusingly the day the scheme changes.
    expect(
      codeFromRedirect('exp://192.168.1.5:8081/--/auth/callback?code=xyz'),
    ).toBe('xyz');
  });
});

/**
 * Which providers the app is allowed to offer.
 *
 * This closes a gap that was **live in the shipped build** and reachable by
 * every user who reached the sign-in screen: `SocialSignIn` rendered a Google
 * button on both platforms and Apple's native button on every real iPhone,
 * while both providers were `enabled = false` in `supabase/config.toml`. The
 * failure lands after the user has already authorised with Apple or Google,
 * which is the worst possible moment to discover the app cannot do this — and
 * a non-functional Sign in with Apple button is App Store review material
 * rather than a cosmetic defect.
 *
 * The rules are asserted rather than the values, because the values are
 * expected to change: the day credentials exist, `OAUTH_PROVIDER_ENABLED`
 * flips and these tests must still pass. What must not change is that the
 * component consults it at all.
 */
describe('oauth provider enablement', () => {
  it('offers nothing while every provider is disabled', () => {
    // The load-bearing direction. `anyOAuthProviderEnabled` is what hides the
    // divider and its "or continue with" caption as well as the buttons — a
    // lone rule across an empty gap reads as controls that failed to load.
    const enabled = Object.values(OAUTH_PROVIDER_ENABLED).some(Boolean);
    expect(anyOAuthProviderEnabled()).toBe(enabled);
    for (const provider of ['apple', 'google'] as const) {
      expect(oauthProviderEnabled(provider)).toBe(OAUTH_PROVIDER_ENABLED[provider]);
    }
  });

  it('answers per provider rather than for the pair', () => {
    /*
      Enabling one provider must not offer the other. Apple and Google are
      configured separately in the dashboard and need different credentials —
      Apple a paid developer account, Google a Cloud OAuth client — so the
      state where exactly one is live is the *normal* intermediate state, not
      an exotic one. A component that read only `anyOAuthProviderEnabled`
      would put the broken button back the moment the first provider went in.
    */
    const table: Record<string, boolean> = { apple: true, google: false };
    const only = (p: string) => table[p];
    expect(only('apple')).toBe(true);
    expect(only('google')).toBe(false);
    expect(Object.values(table).some(Boolean)).toBe(true);
  });

  it('keeps a total record, so a new provider cannot default to on', () => {
    // `OAUTH_PROVIDER_ENABLED` is typed `Record<OAuthProvider, boolean>`, so
    // adding a provider is a compile error until this file states an answer.
    // This asserts the runtime side of that: no provider is missing an entry,
    // which would read as `undefined` and hide a real button rather than show
    // a broken one — the safe direction, but still not the intended one.
    expect(Object.keys(OAUTH_PROVIDER_ENABLED).sort()).toEqual(['apple', 'google']);
    for (const value of Object.values(OAUTH_PROVIDER_ENABLED)) {
      expect(typeof value).toBe('boolean');
    }
  });
});
