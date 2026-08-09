/**
 * Tests for the new-password guessability rules.
 *
 * Two failure directions matter here and they pull against each other, so both
 * are asserted deliberately:
 *
 *   - **Too permissive** is the security failure. `Password1!` satisfies every
 *     "one upper, one digit, one symbol" rule ever written and is in every
 *     cracking dictionary.
 *   - **Too strict** is the product failure, and it is the one that actually
 *     gets reverted. A rule that rejects a perfectly good passphrase teaches
 *     users the app is broken, and someone deletes the whole check rather than
 *     tune it. The `accepts` block below is not padding — it is the constraint
 *     that keeps the rules honest.
 *
 * There is no test asserting a *specific* rejection reason beyond length,
 * because the implementation deliberately collapses every guessability failure
 * into one message. Pinning which rule fired would make the tests care about
 * something the user never sees.
 */

import { COMMON_PASSWORD_BASES } from './common-passwords';
import {
  isAcceptablePassword,
  passwordProblemKey,
  PASSWORD_OK,
} from './password-strength';
import { MIN_PASSWORD_LENGTH } from './validation';

const WEAK = 'auth.passwordTooWeak';
const SHORT = 'auth.passwordTooShort';

describe('passwordProblemKey', () => {
  describe('length', () => {
    it('reports a short password as short, not as weak', () => {
      // Length has an obvious fix, so it keeps its own message.
      expect(passwordProblemKey('Kx9$m')).toBe(SHORT);
    });

    it('checks length before anything else', () => {
      // `pass` is on the base list and is also too short. The user should be
      // told the actionable thing.
      expect(passwordProblemKey('pass')).toBe(SHORT);
    });

    it('accepts at exactly the minimum when otherwise fine', () => {
      const atBound = 'tR7vqLm2';
      expect(atBound).toHaveLength(MIN_PASSWORD_LENGTH);
      expect(passwordProblemKey(atBound)).toBe(PASSWORD_OK);
    });
  });

  describe('rejects passwords from the list, however they are dressed up', () => {
    it.each([
      ['the bare word', 'password'],
      ['padded to length', 'dragon12'],
      ['with a year', 'monkey2024'],
      ['with leet digits', 'p4ssw0rd'],
      ['with leet symbols', 'p@ssw0rd'],
      ['the classic', 'P@ssw0rd1'],
      ['mixed case', 'PaSsWoRd'],
      ['symbols on the end', 'football!!'],
      ['digits both ends', '12iloveyou34'],
      ['embedded in a longer string', 'mypasswordhere'],
      ['ambiguous 1-as-l', 'basebal1'],
      // Strips down to a base too short for the proportion rule to consider,
      // so the exact-match lookup is the only thing that catches it. Without
      // this case, deleting that lookup passed the whole suite.
      ['padded down to a short base', '123car456'],
      ['padded down to a short base, symbols', '!!!kia!!!'],
    ])('%s', (_label, password) => {
      expect(passwordProblemKey(password)).toBe(WEAK);
    });

    it('rejects region-specific choices a generic English list would miss', () => {
      // The entries most likely to earn their keep for this app's audience.
      for (const password of [
        'mohammed1',
        'baghdad2024',
        'habibi123',
        'kurdistan1',
        'peshmerga7',
        'inshallah1',
      ]) {
        expect(passwordProblemKey(password)).toBe(WEAK);
      }
    });

    it('rejects the app’s own vocabulary', () => {
      // NIST calls these out by name: the service's own words are exactly what
      // users reach for.
      for (const password of ['ejazty2026', 'drivinglicense', 'trafficexam']) {
        expect(passwordProblemKey(password)).toBe(WEAK);
      }
    });
  });

  describe('rejects passwords that are weak by shape', () => {
    // The half a finite list can never cover.
    it.each([
      ['one repeated character', 'aaaaaaaa'],
      ['two characters only', 'abababab'],
      ['a repeated unit', 'abcabcabcabc'],
      ['an ascending run', '12345678'],
      ['a descending run', '87654321'],
      ['an alphabet run', 'abcdefgh'],
      ['a keyboard walk', 'qwertyui'],
      ['a keyboard walk backwards', 'poiuytre'],
      ['all digits', '19920314'],
      ['a phone number', '07701234567'],
    ])('%s', (_label, password) => {
      expect(passwordProblemKey(password)).toBe(WEAK);
    });

    it('rejects an all-digit password however long', () => {
      // Length does not rescue a numeric-only space: it is a date, a phone
      // number or an ID, and it is exhaustible offline.
      expect(passwordProblemKey('1947382910473829')).toBe(WEAK);
    });
  });

  describe('rejects the user’s own identity', () => {
    // Every name and address in this block is deliberately absent from
    // COMMON_PASSWORD_BASES. Earlier versions used `Mustafa` and `rebaz`, both
    // of which are on the list — so the assertions passed via the list lookup
    // and would have kept passing with the identity rule deleted entirely.
    it('rejects a password built from the display name', () => {
      expect(
        passwordProblemKey('Fairweather7!', { name: 'Tobias Fairweather' }),
      ).toBe(WEAK);
    });

    it('rejects a password built from the email local part', () => {
      expect(
        passwordProblemKey('ravensworth12', {
          email: 'ravensworth@example.com',
        }),
      ).toBe(WEAK);
    });

    it('ignores the email domain, which everyone shares', () => {
      // Rejecting every password containing `gmail` would be noise, not signal.
      expect(
        passwordProblemKey('gmailXq7$vr', { email: 'someone@gmail.com' }),
      ).toBe(PASSWORD_OK);
    });

    it('ignores identity tokens too short to be meaningful', () => {
      // A three-letter name matches inside far too many good passwords.
      expect(passwordProblemKey('AliBrqz7$w', { name: 'Ali' })).toBe(
        PASSWORD_OK,
      );
    });

    it('applies no identity rule when no context is given', () => {
      // The reset-password screen never knows whose account it is.
      //
      // The name here is deliberately one that is *not* on the common list —
      // an earlier version of this test used `Mustafa`, which is, so it passed
      // for the wrong reason and proved nothing about the identity rule.
      expect(passwordProblemKey('Kavanagh@1990')).toBe(PASSWORD_OK);
      expect(
        passwordProblemKey('Kavanagh@1990', { name: 'Ann Kavanagh' }),
      ).toBe(WEAK);
    });
  });

  describe('accepts passwords a real person would reasonably choose', () => {
    // The guard against over-strictness. Every one of these must pass, or the
    // rules are rejecting good input and will end up deleted wholesale.
    it.each([
      ['a random-looking string', 'Xq7$vrTm2!'],
      ['a passphrase', 'correct horse battery staple'],
      ['a passphrase with punctuation', 'blue-coffee-window-42'],
      ['an unrelated long phrase', 'the quiet river runs north'],
      ['a mixed nonsense string', 'Zt4qWn8pLr'],
      ['a word that merely contains a short base', 'carpentryZ8q'],
      ['a long phrase with a digit run inside', 'walnut1234bridge'],
    ])('%s', (_label, password) => {
      expect(passwordProblemKey(password)).toBe(PASSWORD_OK);
    });
  });

  describe('isAcceptablePassword', () => {
    it('agrees with passwordProblemKey', () => {
      expect(isAcceptablePassword('Xq7$vrTm2!')).toBe(true);
      expect(isAcceptablePassword('password1')).toBe(false);
      expect(isAcceptablePassword('short')).toBe(false);
    });
  });
});

describe('COMMON_PASSWORD_BASES', () => {
  it('is stored lowercase, since matching happens after lowercasing', () => {
    // An uppercase entry would be unreachable — a silent dead entry rather than
    // a loud mistake, which is why it is worth asserting.
    for (const base of COMMON_PASSWORD_BASES) {
      expect(base).toBe(base.toLowerCase());
    }
  });

  it('holds bare bases, not pre-padded variants', () => {
    // `stripAffixes` removes leading and trailing non-letters before matching,
    // so an entry like `password1` is redundant with `password` and only bloats
    // the bundle.
    //
    // Internal digits are fine and are *not* redundant: `1qaz2wsx` is a column
    // walk on a QWERTY keyboard that the row-walk detector cannot see and that
    // strips down to nothing useful, so it has to be listed literally. An
    // earlier version of this test demanded `^[a-z]+$` and would have forced
    // that entry out.
    for (const base of COMMON_PASSWORD_BASES) {
      expect(base).toMatch(/^[a-z0-9]*[a-z]$/);
    }
  });

  it('carries enough entries to be worth shipping', () => {
    // Not a strict bound — a canary. If someone trims this to a handful the
    // check still passes every test above while protecting nobody.
    expect(COMMON_PASSWORD_BASES.size).toBeGreaterThan(250);
  });
});
