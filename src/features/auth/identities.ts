/**
 * Which sign-in methods an account actually has, and what follows from that.
 *
 * ## Why this exists
 *
 * Every account-mutating operation on the settings screen goes through
 * `reauthenticate()`, which proves identity with `signInWithPassword`. That is
 * the right gate — see the note there — but it rests on an assumption nothing
 * was checking: **that the account has a password at all.**
 *
 * An account created through Sign in with Apple or Google does not. GoTrue
 * stores no `encrypted_password` for it, so `signInWithPassword` fails for every
 * value the user could possibly type, and it fails as `invalid_credentials` —
 * indistinguishable from a typo. Before this module, such a user was shown three
 * forms that could not succeed, given no explanation, and, because deletion is
 * gated behind the same call, **had no route to deleting their own account**.
 * That is a compliance problem rather than an inconvenience, and it is the one
 * this project would least want to have, having gone to the trouble of writing a
 * `delete_own_account` RPC by hand rather than shipping a service-role key.
 *
 * The server half agrees, for a different reason: `delete_own_account()` looks
 * for an `amr` entry with `method = 'password'`, which an OAuth session never
 * carries, so it falls through to the weaker `iat` branch and succeeds or fails
 * depending on how recently the token happened to auto-refresh. Even bypassing
 * the client, deletion would be intermittent rather than available.
 *
 * ## Currently latent, which is why it is worth fixing now
 *
 * Both providers are `enabled = false` in `supabase/config.toml`, so no such
 * account can exist yet. But `<SocialSignIn>` is rendered on both auth screens
 * gated only on `configured`, and `ejazty://auth/callback` is already
 * allow-listed — so this becomes live for every user who takes the easier button
 * the moment one config key changes. A gap that opens on a config flip is worse
 * than one that opens on a code change, because nothing in review sees it.
 *
 * ## Kept pure, and kept out of the provider
 *
 * Same reason `recovery.ts` and `routing.ts` are: the rule is the testable half
 * and the React context is not reachable from this project's test suite. A
 * security check that can only be exercised by hand is one that silently stops
 * working.
 */

/**
 * The shape we care about, structurally.
 *
 * Typed against the payload rather than against supabase-js's `UserIdentity`
 * because every field here is optional in some real case: `identities` is
 * `undefined` on a session restored by an older client, and an entry with no
 * `provider` is not something to crash on. Stating that is what forces the
 * checks below to exist.
 */
export type IdentityLike = { provider?: string | null } | null | undefined;

/** GoTrue's name for the email-and-password identity. */
const PASSWORD_PROVIDER = 'email';

/**
 * Whether this account can be re-authenticated with a password.
 *
 * ## The default when we cannot tell is `true`, and that is deliberate
 *
 * `identities` is absent on a session persisted by a build that predates this,
 * and supabase-js does not guarantee it is populated on every path. Answering
 * "no password" on missing evidence would show the provider-account explanation
 * to an ordinary email user and imply their password does not work — which is
 * both wrong and alarming, on the screen where they came to change it.
 *
 * Answering "yes" on missing evidence costs nothing, because **this is not a
 * gate**. It decides what the screen *offers*, not what the server *accepts*.
 * A wrong `true` shows a password form to someone who has no password, which is
 * exactly the pre-existing behaviour, and the escape hatch beside it still
 * works. A wrong `false` would be the damaging direction, so that is the one
 * that requires positive evidence.
 *
 * Do not repurpose this as an authorisation check. `reauthenticate()` is the
 * gate; this is a UI affordance in front of it.
 */
export function hasPasswordIdentity(
  identities: readonly IdentityLike[] | null | undefined,
): boolean {
  if (!Array.isArray(identities) || identities.length === 0) return true;
  return identities.some((i) => i?.provider === PASSWORD_PROVIDER);
}

/**
 * The third-party providers on an account, deduplicated and in a stable order.
 *
 * Used only to name them in the explanation ("This account signs in with
 * Apple"), so the email identity is excluded — it is not a *provider* from the
 * reader's point of view, it is the ordinary case. Returns an empty array when
 * there is nothing to name, which the screen reads as "say it generically"
 * rather than rendering an empty list.
 */
export function externalProviders(
  identities: readonly IdentityLike[] | null | undefined,
): string[] {
  if (!Array.isArray(identities)) return [];
  const seen = new Set<string>();
  for (const identity of identities) {
    const provider = identity?.provider;
    if (typeof provider !== 'string') continue;
    if (provider === PASSWORD_PROVIDER) continue;
    seen.add(provider);
  }
  return [...seen].sort();
}

/**
 * How a provider id is written for a reader.
 *
 * A small map rather than capitalising the id, because the ids are lowercase
 * slugs and the brands are not — "Apple" and "Google" are how those buttons are
 * labelled everywhere else in the app, and `apple` in a sentence reads as a
 * typo. Anything unrecognised falls back to the raw id, which is worse-looking
 * but honest; the alternative is dropping a provider out of an explanation of
 * which providers an account uses.
 */
const PROVIDER_NAMES: Record<string, string> = {
  apple: 'Apple',
  google: 'Google',
};

export function providerName(provider: string): string {
  return PROVIDER_NAMES[provider] ?? provider;
}

/**
 * The providers, written out for a sentence: "Apple", or "Apple and Google".
 *
 * The separator is a translation key rather than a literal ` and `, because
 * this string is read in Arabic and Sorani too. Callers pass `t`.
 */
export function providerList(
  providers: readonly string[],
  and: string,
): string {
  const names = providers.map(providerName);
  if (names.length === 0) return '';
  if (names.length === 1) return names[0];
  return `${names.slice(0, -1).join(', ')} ${and} ${names[names.length - 1]}`;
}
