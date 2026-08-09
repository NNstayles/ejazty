/**
 * Shared client-side credential rules.
 *
 * Sign-in, sign-up and the account screen all validate the same fields. Kept in
 * one place so the three cannot drift apart — a password minimum that differs
 * between sign-up and "change password" lets someone set a password they could
 * not have registered with.
 */

/**
 * Deliberately loose. The only authority on whether an address exists is the
 * confirmation mail; this exists to catch typos before a network round-trip,
 * not to adjudicate RFC 5322.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Supabase's own default minimum is 6; 8 is the stricter rule this app sets. */
export const MIN_PASSWORD_LENGTH = 8;

/**
 * Upper bound on the display name.
 *
 * This is not a taste judgement about how long a name may be — it mirrors the
 * `profiles_display_name_length` CHECK in
 * `supabase/migrations/20260803170000_bound_user_input.sql`, and the two are
 * coupled through sign-up. The `on_auth_user_created` trigger copies
 * `user_metadata.full_name` straight into `profiles.display_name`, so a name
 * the database rejects raises inside the `auth.users` insert and aborts the
 * whole registration — which reaches the screen as an unexplained generic
 * error that retrying cannot fix.
 *
 * Four sites now agree on this number and must be raised together: this
 * constant, the `profiles_display_name_length` CHECK, the `left(…, 80)` inside
 * `handle_new_user` (`20260803180000`), and the `max_name` bound in
 * `bound_user_metadata` (`20260804140000`), which is the one that stops a
 * caller bypassing this app from writing an unbounded name into
 * `user_metadata` in the first place.
 */
export const MAX_NAME_LENGTH = 80;

export function isValidEmail(email: string): boolean {
  return EMAIL_PATTERN.test(email.trim());
}

/**
 * True when `name` is a display name both this app and the database accept.
 *
 * Length is counted after trimming, because that is the value that actually
 * gets stored — every caller submits `name.trim()`.
 */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length > 0 && trimmed.length <= MAX_NAME_LENGTH;
}

/**
 * The i18n key describing what is wrong with `name`, or null when it is fine.
 *
 * Sign-up and the account screen both need the same three-way answer, and
 * duplicating the branch is how the two drift into disagreeing about which
 * message belongs to which failure.
 */
export function nameErrorKey(name: string): string | null {
  const trimmed = name.trim();
  if (trimmed.length === 0) return 'auth.nameRequired';
  if (trimmed.length > MAX_NAME_LENGTH) return 'auth.nameTooLong';
  return null;
}
