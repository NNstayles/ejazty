/**
 * The OAuth redirect parser, kept apart from everything that talks to Supabase.
 *
 * Split out for the same reason `recovery.ts` has no Supabase import: this is
 * the only part of the flow a test can reach without a browser, a provider and
 * a network, and importing `oauth.ts` pulls in the client, which pulls in the
 * SecureStore adapter, which needs native modules a test does not have. A pure
 * rule that can only be exercised through four layers of mocks is one that
 * stops being tested.
 */

/**
 * Pulls the authorisation code out of a provider redirect.
 *
 * The URL arrives from outside the app, so the shapes it can arrive in are the
 * part worth pinning. In particular a provider can return an error *and* a
 * stale-looking code together; taking the code without looking would hand the
 * app something inert and turn a clear "you cancelled" into a generic failure
 * further down. Same class of case as the recovery links that carry an error
 * beside a usable-looking token.
 */
export function codeFromRedirect(url: string): string | null {
  try {
    const parsed = new URL(url);
    // Checked first: when both are present the error is the one that is true.
    if (parsed.searchParams.get('error')) return null;
    const code = parsed.searchParams.get('code');
    return code && code.length > 0 ? code : null;
  } catch {
    // Not a URL at all. A throw here would escape into a screen with no catch
    // around it.
    return null;
  }
}
