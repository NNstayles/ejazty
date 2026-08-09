/**
 * Tests for the shared credential rules and the auth error mapping.
 *
 * Both are small, and both are the kind of thing that breaks quietly: a
 * loosened email check just means a wasted round-trip, but a password minimum
 * that drifts between screens locks someone out of an account they can still
 * sign in to, and an unmapped error code shows an Arabic user an English
 * sentence from Supabase.
 */

import { authErrorKey } from './errors';
import {
  EMAIL_PATTERN,
  isValidEmail,
  isValidName,
  MAX_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
  nameErrorKey,
} from './validation';

describe('isValidEmail', () => {
  it.each([
    'a@b.co',
    'learner@example.com',
    'first.last@sub.domain.iq',
    'user+tag@example.com',
  ])('accepts %s', (email) => {
    expect(isValidEmail(email)).toBe(true);
  });

  it.each([
    ['', 'an empty string'],
    ['plainaddress', 'no @ at all'],
    ['@example.com', 'no local part'],
    ['user@', 'no domain'],
    ['user@example', 'no dot in the domain'],
    ['user name@example.com', 'a space in the local part'],
    ['user@exa mple.com', 'a space in the domain'],
  ])('rejects %s (%s)', (email) => {
    expect(isValidEmail(email)).toBe(false);
  });

  it('ignores surrounding whitespace', () => {
    // The screens trim before submitting, so validation has to agree.
    expect(isValidEmail('  learner@example.com  ')).toBe(true);
  });

  it('exports a pattern that is stateless between calls', () => {
    // A /g flag on a shared regex would make `test` alternate true/false via
    // lastIndex — the classic way a validator starts rejecting valid input.
    expect(EMAIL_PATTERN.global).toBe(false);
    expect(isValidEmail('learner@example.com')).toBe(true);
    expect(isValidEmail('learner@example.com')).toBe(true);
  });
});

describe('MIN_PASSWORD_LENGTH', () => {
  it('is at least Supabase’s own default of 6', () => {
    // Setting it lower would let the app accept a password the server rejects,
    // which surfaces as an unexplained failure after the form said it was fine.
    expect(MIN_PASSWORD_LENGTH).toBeGreaterThanOrEqual(6);
  });

  it('is a single shared constant, so sign-up and change-password agree', () => {
    // The value matters less than there being exactly one of it. This is a
    // tripwire: if someone inlines a different number on one screen, the
    // documented invariant is broken even though this file still passes.
    expect(MIN_PASSWORD_LENGTH).toBe(8);
  });
});

describe('display name rules', () => {
  it('accepts an ordinary name', () => {
    expect(isValidName('Ada Lovelace')).toBe(true);
    expect(nameErrorKey('Ada Lovelace')).toBeNull();
  });

  it('rejects an empty or whitespace-only name', () => {
    for (const empty of ['', '   ', '\t\n']) {
      expect(isValidName(empty)).toBe(false);
      expect(nameErrorKey(empty)).toBe('auth.nameRequired');
    }
  });

  it('accepts a name exactly at the bound', () => {
    const exact = 'a'.repeat(MAX_NAME_LENGTH);

    expect(isValidName(exact)).toBe(true);
    expect(nameErrorKey(exact)).toBeNull();
  });

  it('rejects a name one character past the bound', () => {
    const tooLong = 'a'.repeat(MAX_NAME_LENGTH + 1);

    expect(isValidName(tooLong)).toBe(false);
    expect(nameErrorKey(tooLong)).toBe('auth.nameTooLong');
  });

  it('measures length after trimming, because that is what gets stored', () => {
    // Every caller submits `name.trim()`, so padding must not count against
    // the bound — otherwise a pasted name with trailing spaces is rejected for
    // a length the database will never see.
    const padded = `  ${'a'.repeat(MAX_NAME_LENGTH)}  `;

    expect(isValidName(padded)).toBe(true);
  });

  it('distinguishes "too long" from "required" rather than collapsing them', () => {
    // The two failures need different messages: one says type something, the
    // other says type less. A shared message sends the user looking for the
    // wrong problem.
    expect(nameErrorKey('')).not.toBe(nameErrorKey('a'.repeat(200)));
  });

  it('matches the profiles_display_name_length CHECK constraint', () => {
    // This is the coupling that matters. `handle_new_user` copies
    // `user_metadata.full_name` into `profiles.display_name` inside the
    // `auth.users` insert, so a name this validator lets through but the
    // constraint rejects aborts the entire registration — and reaches the
    // screen as a generic error that retrying cannot fix.
    //
    // Raising this means raising the CHECK in the same change.
    expect(MAX_NAME_LENGTH).toBe(80);
  });
});

describe('authErrorKey', () => {
  it('maps a wrong password to the invalid-credentials message', () => {
    expect(authErrorKey({ code: 'invalid_credentials' })).toBe(
      'auth.errors.invalidCredentials',
    );
  });

  it('maps an unconfirmed email to its own message', () => {
    expect(authErrorKey({ code: 'email_not_confirmed' })).toBe(
      'auth.errors.emailNotConfirmed',
    );
  });

  it.each(['user_already_exists', 'email_exists'])(
    'maps %s to the same "already registered" message',
    (code) => {
      expect(authErrorKey({ code })).toBe('auth.errors.emailExists');
    },
  );

  it.each(['over_request_rate_limit', 'over_email_send_rate_limit'])(
    'maps %s to the rate-limit message',
    (code) => {
      expect(authErrorKey({ code })).toBe('auth.errors.rateLimited');
    },
  );

  it('maps a missing RPC to the setup message, not the generic one', () => {
    // PGRST202 means the delete_own_account migration was never applied. That
    // is a deployment gap, and telling the user "something went wrong" would
    // send them chasing their own account instead of the server.
    expect(authErrorKey({ code: 'PGRST202' })).toBe('auth.errors.deleteNotSetUp');
  });

  it.each(['28000', '42501'])(
    'maps the %s Postgres code to an expired session',
    (code) => {
      expect(authErrorKey({ code })).toBe('auth.errors.sessionExpired');
    },
  );

  it.each([
    'otp_expired',
    'access_denied',
    'flow_state_expired',
    'flow_state_not_found',
    'bad_code_verifier',
    'session_not_found',
  ])('maps the %s recovery failure to "request a new link"', (code) => {
    // A recovery link is single-use and short-lived, so an expired or already
    // consumed one is the ordinary failure on that screen, not an edge case.
    // The generic "something went wrong" would leave the user retrying the
    // same dead link instead of asking for a fresh one.
    expect(authErrorKey({ code })).toBe('auth.errors.recoveryLinkExpired');
  });

  it('maps a rejected captcha to its own message, not to bad credentials', () => {
    // Raised when bot protection is enabled on the project but the client sent
    // no `captchaToken`. That is a setup gap between the dashboard and the app
    // — reporting it as "wrong email or password" would have every user
    // resetting a password that was never the problem.
    expect(authErrorKey({ code: 'captcha_failed' })).toBe(
      'auth.errors.captchaFailed',
    );
  });

  it('maps the attempt-quota trigger to its own message', () => {
    // 54000 is raised by `enforce_attempt_quota`
    // (20260803170000_bound_user_input.sql) at 2000 stored attempts. Only a
    // scripted client reaches it, but the generic message would make a real
    // learner think their result failed to save for an unknown reason.
    expect(authErrorKey({ code: '54000' })).toBe('auth.errors.quotaExceeded');
  });

  it('maps a CHECK violation to "too long"', () => {
    // 23514 is check_violation. The only client-supplied values that can trip
    // one are an over-long display name or client_id, both bounded by the same
    // migration.
    expect(authErrorKey({ code: '23514' })).toBe('auth.errors.valueTooLong');
  });

  it('recognises the unconfigured-build sentinel', () => {
    expect(authErrorKey(new Error('NOT_CONFIGURED'))).toBe('auth.notConfigured');
  });

  it('maps a connection failure by name, since it arrives without a code', () => {
    expect(authErrorKey({ name: 'AuthRetryableFetchError' })).toBe(
      'auth.errors.network',
    );
  });

  it.each([
    ['null', null],
    ['undefined', undefined],
    ['a bare string', 'boom'],
    ['a number', 42],
  ])('falls back to the generic message for %s', (_label, value) => {
    expect(authErrorKey(value)).toBe('auth.errors.generic');
  });

  it('falls back to the generic message for an unrecognised code', () => {
    expect(authErrorKey({ code: 'something_new_from_supabase' })).toBe(
      'auth.errors.generic',
    );
  });

  it('never returns a raw Supabase message', () => {
    // The whole point: Supabase reports in English only, so `error.message`
    // must never reach the screen.
    const key = authErrorKey({ message: 'Invalid login credentials' });

    expect(key).not.toContain('Invalid login credentials');
    expect(key).toBe('auth.errors.generic');
  });

  describe('inherited object keys', () => {
    /**
     * `code` is not always ours. `recovery.ts` reads `error_code` straight out
     * of the deep-link URL and `redeemRecoveryLink` rethrows it as `{ code }`,
     * so anything able to open `ejazty://` chooses this string.
     *
     * The lookup table is a plain object literal, so before the `hasOwn` guard
     * these names resolved through `Object.prototype` and the *function* found
     * there was returned out of a signature that promises a string. Two
     * different failures came out of that: `constructor` made `t()` return an
     * empty string, so the user was shown a blank error line; `toString` made
     * `t()` throw, which inside the redeeming effect became an unhandled
     * rejection.
     *
     * Both are minor on their own. The reason this is pinned is that
     * `authErrorKey` is the single function whose whole job is keeping
     * untrusted text off the screen, so a hole in it is worth a test.
     */
    it.each([
      ['constructor'],
      ['toString'],
      ['__proto__'],
      ['hasOwnProperty'],
      ['valueOf'],
      ['isPrototypeOf'],
      ['propertyIsEnumerable'],
      ['toLocaleString'],
    ])('does not resolve %s through the prototype chain', (code) => {
      expect(authErrorKey({ code })).toBe('auth.errors.generic');
    });

    it('always returns a string, whatever the code is', () => {
      // The bug was a type violation before it was anything else: the declared
      // return type is `string` and TypeScript could not catch it, because
      // indexing a `Record<string, string>` is typed `string` regardless of
      // what is actually there.
      for (const code of ['constructor', 'toString', 'valueOf', 'real_code']) {
        expect(typeof authErrorKey({ code })).toBe('string');
      }
    });

    it('still maps the codes it actually declares', () => {
      // Guarding the lookup must not have narrowed it. If this fails alongside
      // the tests above, the guard is rejecting everything rather than only
      // inherited names.
      expect(authErrorKey({ code: 'invalid_credentials' })).toBe(
        'auth.errors.invalidCredentials',
      );
    });
  });
});
