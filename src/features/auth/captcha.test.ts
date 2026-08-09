/**
 * Tests for the CAPTCHA seam.
 *
 * The behaviour worth pinning here is the **failure direction**. This module
 * sits in front of sign-in, sign-up, password recovery and the re-auth inside
 * `updatePassword` — four paths where a bug that fails closed locks every user
 * out of a correctly configured app because a third-party widget did not load.
 *
 * So each test below is really asking the same question: when the provider
 * misbehaves, does the request still reach GoTrue and let *the server* decide?
 */

import {
  CAPTCHA_PROVIDER_TIMEOUT_MS,
  captchaOption,
  captchaTokenFor,
  hasCaptchaProvider,
  setCaptchaProvider,
} from './captcha';

afterEach(() => {
  // Module-level state: leaking a provider into the next test would make these
  // pass or fail depending on their order.
  setCaptchaProvider(null);
  jest.useRealTimers();
});

describe('captchaTokenFor', () => {
  it('resolves to undefined when no provider is registered', async () => {
    // The shipping default. Bot protection is off in the dashboard, so the
    // tokenless request is exactly what GoTrue expects.
    expect(await captchaTokenFor('signin')).toBeUndefined();
  });

  it('returns the provider’s token', async () => {
    setCaptchaProvider(async () => 'tok_abc123');

    expect(await captchaTokenFor('signup')).toBe('tok_abc123');
  });

  it('tells the provider which endpoint the token is for', async () => {
    // Supabase rate-limits per endpoint, and a provider may want to show a
    // different challenge for a password reset than for a sign-in.
    const provider = jest.fn().mockResolvedValue('tok');
    setCaptchaProvider(provider);

    await captchaTokenFor('recover');

    expect(provider).toHaveBeenCalledWith('recover');
  });

  it('resolves to undefined when the provider throws', async () => {
    // Failing closed here would mean a widget that cannot reach its own CDN
    // takes down sign-in for everyone, including on a project with bot
    // protection switched off.
    setCaptchaProvider(async () => {
      throw new Error('challenge dismissed');
    });

    await expect(captchaTokenFor('signin')).resolves.toBeUndefined();
  });

  it('resolves to undefined when the provider rejects synchronously', async () => {
    setCaptchaProvider((() => {
      throw new Error('module not linked');
    }) as never);

    await expect(captchaTokenFor('signin')).resolves.toBeUndefined();
  });

  it('treats an empty string as no token', async () => {
    // Sending '' would be rejected by GoTrue as a malformed token rather than
    // as an absent one, which is a worse error to trace back.
    setCaptchaProvider(async () => '');

    expect(await captchaTokenFor('signin')).toBeUndefined();
  });

  it('gives up on a provider that never settles', async () => {
    // Without the timeout the sign-in button spins forever with no error and
    // no way back — the one failure mode a user cannot work around.
    jest.useFakeTimers();
    setCaptchaProvider(() => new Promise<string>(() => {}));

    const pending = captchaTokenFor('signin');
    jest.advanceTimersByTime(CAPTCHA_PROVIDER_TIMEOUT_MS + 1);

    await expect(pending).resolves.toBeUndefined();
  });

  it('clears the timeout once the provider answers', async () => {
    // `Promise.race` does not cancel the loser. An uncleared timer is a live
    // handle per auth attempt on device, and it holds the Jest worker open
    // past the end of the run — which is how this was found.
    jest.useFakeTimers();
    setCaptchaProvider(async () => 'tok');

    await captchaTokenFor('signin');

    expect(jest.getTimerCount()).toBe(0);
  });

  it('clears the timeout when the provider throws', async () => {
    jest.useFakeTimers();
    setCaptchaProvider(async () => {
      throw new Error('dismissed');
    });

    await captchaTokenFor('signin');

    expect(jest.getTimerCount()).toBe(0);
  });

  it('never rejects, whatever the provider does', async () => {
    // The call sites do not wrap this in a try/catch, on the strength of this
    // guarantee. An unhandled rejection here would surface as a redbox.
    for (const bad of [
      async () => {
        throw new Error('boom');
      },
      async () => undefined,
      (() => Promise.reject(new Error('nope'))) as never,
    ]) {
      setCaptchaProvider(bad);
      await expect(captchaTokenFor('signup')).resolves.toBeUndefined();
    }
  });
});

describe('setCaptchaProvider', () => {
  it('reports whether a provider is registered', () => {
    expect(hasCaptchaProvider()).toBe(false);

    setCaptchaProvider(async () => 'tok');
    expect(hasCaptchaProvider()).toBe(true);

    setCaptchaProvider(null);
    expect(hasCaptchaProvider()).toBe(false);
  });

  it('replaces a previously registered provider', async () => {
    setCaptchaProvider(async () => 'first');
    setCaptchaProvider(async () => 'second');

    expect(await captchaTokenFor('signin')).toBe('second');
  });
});

describe('captchaOption', () => {
  it('contributes nothing when there is no token', () => {
    // Spread into a supabase-js `options` object, so this must not introduce a
    // `captchaToken: undefined` key into the request body.
    expect(captchaOption(undefined)).toEqual({});
    expect('captchaToken' in captchaOption(undefined)).toBe(false);
  });

  it('carries the token when there is one', () => {
    expect(captchaOption('tok_abc')).toEqual({ captchaToken: 'tok_abc' });
  });

  it('merges without disturbing the options it is spread into', () => {
    // `signUp` spreads this alongside `data: { full_name }` — dropping that
    // would lose the display name at registration.
    const options = { data: { full_name: 'Ada' }, ...captchaOption('tok') };

    expect(options).toEqual({ data: { full_name: 'Ada' }, captchaToken: 'tok' });
  });
});
