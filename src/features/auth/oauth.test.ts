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
