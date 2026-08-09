/**
 * Tests for the sign-in-method rules behind the account screen.
 *
 * Everything here is currently unreachable by hand, because both OAuth
 * providers are `enabled = false` in `supabase/config.toml` — which is exactly
 * why it is worth pinning. The gap these rules close opens on a **config flip**
 * rather than a code change: `<SocialSignIn>` already ships on both auth
 * screens, so the first provider-only account appears the moment somebody
 * enables a provider in the dashboard, and nothing in a code review sees that
 * happen.
 *
 * The failure being guarded is not subtle once it lands — an account with no
 * password meets three forms that cannot succeed and, because deletion is gated
 * behind the same call, has no route to deleting itself — but it is invisible
 * until then.
 */

import {
  externalProviders,
  hasPasswordIdentity,
  providerList,
  providerName,
} from './identities';

describe('hasPasswordIdentity', () => {
  it('recognises an ordinary email account', () => {
    expect(hasPasswordIdentity([{ provider: 'email' }])).toBe(true);
  });

  it('recognises an account that has both a password and a provider', () => {
    // Linking is off (`enable_manual_linking = false`), but GoTrue still
    // produces this shape when a provider returns an address that already has
    // an account. Such a user *can* re-authenticate, so they get the normal
    // forms.
    expect(
      hasPasswordIdentity([{ provider: 'apple' }, { provider: 'email' }]),
    ).toBe(true);
  });

  /*
    The assertion this module exists for. A provider-only account cannot satisfy
    `signInWithPassword` with any input, so every gate built on it is closed to
    them permanently — including the irreversible one, which is the compliance
    problem.
  */
  it('reports a provider-only account as having no password', () => {
    expect(hasPasswordIdentity([{ provider: 'apple' }])).toBe(false);
    expect(hasPasswordIdentity([{ provider: 'google' }])).toBe(false);
    expect(
      hasPasswordIdentity([{ provider: 'apple' }, { provider: 'google' }]),
    ).toBe(false);
  });

  /*
    Both no-evidence cases answer `true`, and the direction is the whole design
    — see the note in `identities.ts`. `identities` is absent on a session
    persisted by an older build, and answering "no password" there would tell an
    ordinary email user that their password does not work, on the screen where
    they came to change it.

    This is safe only because the function is an affordance rather than a gate:
    a wrong `true` renders the pre-existing form, and `reauthenticate` still
    decides. If anyone ever routes an authorisation decision through this, these
    two cases become the bug.
  */
  it('assumes a password when there is no evidence either way', () => {
    expect(hasPasswordIdentity(undefined)).toBe(true);
    expect(hasPasswordIdentity(null)).toBe(true);
    expect(hasPasswordIdentity([])).toBe(true);
    // Not an array at all — a drifted payload rather than a real case, but it
    // must not throw on the settings screen.
    expect(hasPasswordIdentity('email' as never)).toBe(true);
  });

  it('survives a malformed entry rather than throwing', () => {
    expect(hasPasswordIdentity([null, undefined, {}])).toBe(false);
    expect(hasPasswordIdentity([null, { provider: 'email' }])).toBe(true);
    expect(hasPasswordIdentity([{ provider: null }])).toBe(false);
  });
});

describe('externalProviders', () => {
  it('names the third-party providers and omits the email identity', () => {
    // `email` is not a *provider* from the reader's point of view — it is the
    // ordinary case, and listing it would produce "signs in with email".
    expect(externalProviders([{ provider: 'email' }])).toEqual([]);
    expect(
      externalProviders([{ provider: 'email' }, { provider: 'apple' }]),
    ).toEqual(['apple']);
  });

  it('deduplicates and orders stably', () => {
    // Order matters only because an unstable one makes the sentence flicker
    // between renders for no reason the reader can see.
    expect(
      externalProviders([
        { provider: 'google' },
        { provider: 'apple' },
        { provider: 'google' },
      ]),
    ).toEqual(['apple', 'google']);
  });

  it('returns nothing to name when there is nothing to name', () => {
    expect(externalProviders(undefined)).toEqual([]);
    expect(externalProviders([])).toEqual([]);
    expect(externalProviders([{}, null])).toEqual([]);
  });
});

describe('naming providers for a reader', () => {
  it('uses the brand spelling rather than the slug', () => {
    // `apple` in a sentence reads as a typo; every button in the app says
    // "Apple".
    expect(providerName('apple')).toBe('Apple');
    expect(providerName('google')).toBe('Google');
  });

  it('falls back to the raw id for a provider it does not know', () => {
    // Worse-looking, but honest. Dropping it would leave a provider out of a
    // sentence whose entire job is to list the providers.
    expect(providerName('azure')).toBe('azure');
  });

  it('joins with a translated conjunction, not a hardcoded "and"', () => {
    // The sentence is read in Arabic and Sorani too, so the separator is a
    // translation key. A literal ` and ` here would be the one untranslated
    // word in a fully localised screen.
    expect(providerList(['apple'], 'and')).toBe('Apple');
    expect(providerList(['apple', 'google'], 'and')).toBe('Apple and Google');
    expect(providerList(['apple', 'google'], 'و')).toBe('Apple و Google');
    expect(providerList([], 'and')).toBe('');
  });
});
