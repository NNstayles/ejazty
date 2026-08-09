/**
 * Whether a *new* password is one an attacker would try early.
 *
 * ## Where this sits
 *
 * Supabase can do this server-side against the full HIBP corpus, but that is a
 * paid-plan feature. This is the client-side half, and for the threat that
 * matters it is the half that does the work: credential stuffing succeeds
 * because a *real user* chose a breached password, and a real user chooses it
 * through this app. Somebody bypassing the app to POST a weak password straight
 * at GoTrue only weakens their own throwaway account.
 *
 * That asymmetry is why this being client-side is acceptable where
 * `reauthenticate()` being client-side was not. It is still worth turning the
 * Supabase toggle on when the project moves to Pro — the two compose, and the
 * server one cannot be bypassed at all.
 *
 * ## Only on the way in
 *
 * This runs on sign-up, password change and password reset. It must **never**
 * run on sign-in: existing users may already hold a password this would reject,
 * and refusing to let them log in would be locking people out of their own
 * accounts to protect them.
 *
 * ## Deliberately not a "strength meter"
 *
 * No entropy score, no green/amber/red bar. Those reward `P@ssw0rd1!` — which
 * scores well and is in every cracking dictionary — and punish a long
 * passphrase, which is the thing actually worth encouraging. The rules here are
 * all of the form "this specific password is guessable", which is what NIST SP
 * 800-63B §5.1.1.2 asks for and is a claim that is either true or not.
 */

import { COMMON_PASSWORD_BASES } from '@/features/auth/common-passwords';
import { MIN_PASSWORD_LENGTH } from '@/features/auth/validation';

/**
 * Characters people substitute to satisfy a "must contain a number" rule, mapped
 * back to the letter they stand in for. Undoing them is what lets one list entry
 * cover `password`, `p4ssword`, `p@ssw0rd` and `P@$$w0rd`.
 */
const LEET: Record<string, string> = {
  '@': 'a', '4': 'a', '8': 'b', '(': 'c', '3': 'e', '6': 'g', '9': 'g',
  '#': 'h', '0': 'o', '5': 's', '$': 's', '7': 't', '+': 't', '2': 'z',
};

/**
 * `1` is genuinely ambiguous — it stands in for both `i` and `l` — so rather
 * than guessing, both readings are generated and either one matching is enough.
 * Without this, `passw1rd` style entries slip through on a coin flip.
 */
const AMBIGUOUS = { '1': ['i', 'l'], '!': ['i', 'l'] } as const;

/** Rows of a QWERTY keyboard, for detecting walks like `asdfghjk`. */
const KEYBOARD_ROWS = [
  'qwertyuiop',
  'asdfghjkl',
  'zxcvbnm',
  '1234567890',
];

/** Strips padding people add to reach a length rule: `dragon2024!` -> `dragon`. */
function stripAffixes(value: string): string {
  return value.replace(/^[^a-z]+/, '').replace(/[^a-z]+$/, '');
}

/**
 * Every reading of `value` worth checking against the base list.
 *
 * Returns the lowercased original plus each leet interpretation, both with and
 * without surrounding padding — so a single list entry covers the whole family
 * a user might type.
 */
function normalisations(value: string): string[] {
  const lower = value.toLowerCase();

  // Start with one candidate and fork it every time an ambiguous character is
  // met. Real passwords contain few of these, so the branching stays tiny; the
  // cap is there so a pathological input cannot blow up the array.
  let candidates = [''];
  for (const char of lower) {
    const options = char in AMBIGUOUS
      ? AMBIGUOUS[char as keyof typeof AMBIGUOUS]
      : [LEET[char] ?? char];

    if (options.length === 1 || candidates.length > 64) {
      candidates = candidates.map((c) => c + options[0]);
    } else {
      candidates = candidates.flatMap((c) => options.map((o) => c + o));
    }
  }

  const out = new Set<string>([lower, stripAffixes(lower)]);
  for (const candidate of candidates) {
    out.add(candidate);
    out.add(stripAffixes(candidate));
  }
  out.delete('');
  return [...out];
}

/** True when every character is the same one: `aaaaaaaa`. */
function isSingleCharacter(value: string): boolean {
  return /^(.)\1+$/.test(value);
}

/**
 * True when the whole string is one substring repeated: `abcabcabc`, `12121212`.
 * Only units up to half the length can repeat, hence the bound.
 */
function isRepeatedUnit(value: string): boolean {
  for (let size = 1; size <= value.length / 2; size++) {
    if (value.length % size !== 0) continue;
    const unit = value.slice(0, size);
    if (unit.repeat(value.length / size) === value) return true;
  }
  return false;
}

/** True for an unbroken ±1 character run: `12345678`, `hgfedcba`. */
function isSequentialRun(value: string): boolean {
  if (value.length < 4) return false;
  const step = value.charCodeAt(1) - value.charCodeAt(0);
  if (step !== 1 && step !== -1) return false;
  for (let i = 2; i < value.length; i++) {
    if (value.charCodeAt(i) - value.charCodeAt(i - 1) !== step) return false;
  }
  return true;
}

/** True for a walk along one keyboard row, in either direction. */
function isKeyboardWalk(value: string): boolean {
  if (value.length < 4) return false;
  return KEYBOARD_ROWS.some((row) => {
    const reversed = [...row].reverse().join('');
    return row.includes(value) || reversed.includes(value);
  });
}

/**
 * Structural weakness — guessable because of its *shape* rather than because it
 * appears on a list. This is the half a finite list can never cover: there are
 * more all-digit passwords than could ever be enumerated, and every one of them
 * is a birthday, a phone number or an ID.
 */
function isStructurallyWeak(value: string): boolean {
  const lower = value.toLowerCase();

  if (isSingleCharacter(lower)) return true;
  if (isRepeatedUnit(lower)) return true;
  if (isSequentialRun(lower)) return true;
  if (isKeyboardWalk(lower)) return true;
  // All digits: dates, phone numbers, national ID numbers. Even at 8+ characters
  // the search space is small enough to exhaust offline.
  if (/^\d+$/.test(lower)) return true;
  // Two distinct characters over any length is a pattern, not a password.
  if (new Set(lower).size <= 2) return true;

  return false;
}

/**
 * How much of a password a common word may account for before the password is
 * really just that word with decoration.
 *
 * This threshold is the whole difference between a useful rule and one that
 * gets deleted. A plain "contains a common word" test rejects
 * `correct horse battery staple` because `horse` is on the list, and
 * `blue-coffee-window-42` because `coffee` is — both are good passwords, and
 * being told otherwise is how a user concludes the app is broken.
 *
 * Requiring the base to be at least half the string separates the two cases on
 * the thing that actually matters, which is how much material is left once the
 * guessable part is removed:
 *
 *   mypasswordhere        password (8) / 14  = 0.57  -> rejected, correctly
 *   blue-coffee-window    coffee   (6) / 18  = 0.33  -> accepted, correctly
 *   correct horse ...     horse    (5) / 28  = 0.18  -> accepted, correctly
 */
const BASE_DOMINANCE = 0.5;

/**
 * True when a listed base makes up most of `reading` — i.e. the password is
 * that word with padding, rather than a phrase that happens to contain it.
 *
 * Bases under five characters are never considered: `car` appears inside
 * `carpentry`, and a rule that cannot tell those apart is worse than no rule.
 */
function dominatedByCommonBase(reading: string): boolean {
  for (const base of COMMON_PASSWORD_BASES) {
    if (base.length < 5) continue;
    if (base.length / reading.length < BASE_DOMINANCE) continue;
    if (reading.includes(base)) return true;
  }
  return false;
}

/**
 * Tokens from the user's own identity, which NIST calls out explicitly as
 * "context-specific words". Short ones are skipped: a three-letter name would
 * match inside far too many legitimate passwords.
 */
function personalTokens(context?: PasswordContext): string[] {
  const tokens: string[] = [];
  const push = (value: string | null | undefined) => {
    if (!value) return;
    for (const part of value.toLowerCase().split(/[^a-z0-9]+/)) {
      if (part.length >= 4) tokens.push(part);
    }
  };

  push(context?.name);
  // The local part only. The domain is shared by everyone at that provider, so
  // rejecting every password containing `gmail` would be noise.
  push(context?.email?.split('@')[0]);
  return tokens;
}

export type PasswordContext = {
  /** The address being registered or already on the account. */
  email?: string | null;
  /** The display name being set. */
  name?: string | null;
};

/** Returned when the password is fine. */
export const PASSWORD_OK = null;

/**
 * The i18n key describing what is wrong with `password`, or null when it is
 * acceptable.
 *
 * One shared entry point so sign-up, password change and password reset cannot
 * drift — previously all three inlined their own length check, which is exactly
 * the divergence `validation.ts` exists to prevent.
 *
 * Length is reported separately because it is the one failure with an obvious
 * fix. Everything else collapses into a single message: telling a user *which*
 * rule fired invites them to edit around it (`password1` -> `password2`), and
 * the honest advice is the same either way.
 */
export function passwordProblemKey(
  password: string,
  context?: PasswordContext,
): string | null {
  if (password.length < MIN_PASSWORD_LENGTH) return 'auth.passwordTooShort';

  if (isStructurallyWeak(password)) return 'auth.passwordTooWeak';

  const readings = normalisations(password);
  for (const reading of readings) {
    if (COMMON_PASSWORD_BASES.has(reading)) return 'auth.passwordTooWeak';
    if (dominatedByCommonBase(reading)) return 'auth.passwordTooWeak';
  }

  const lower = password.toLowerCase();
  for (const token of personalTokens(context)) {
    if (lower.includes(token)) return 'auth.passwordTooWeak';
  }

  return PASSWORD_OK;
}

/** Convenience predicate for call sites that only need a boolean. */
export function isAcceptablePassword(
  password: string,
  context?: PasswordContext,
): boolean {
  return passwordProblemKey(password, context) === PASSWORD_OK;
}
