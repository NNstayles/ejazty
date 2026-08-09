import { authConfig } from './supabase';

// `authConfig` itself is pure, but importing the module pulls in the storage
// adapter it hands to `createClient`, and AsyncStorage needs its official mock
// to load outside a native runtime. Same setup as `secure-storage.test.ts`.
jest.mock('@react-native-async-storage/async-storage', () =>
  // `require`, not `import`: jest.mock factories are hoisted above the import
  // block, so an imported binding would not exist yet when this runs.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

/**
 * Guards on how the Supabase client is configured.
 *
 * Both settings covered here are one line from being reverted, and neither
 * failure is visible from the app: nothing looks different under the wrong auth
 * flow, and nothing looks different when a refresh token is left in
 * localStorage. They surface in an incident, which is the kind of failure worth
 * pinning down in a test.
 *
 * `authConfig` is a pure function of the platform precisely so this needs no
 * client, no network and no Platform mocking.
 */

describe('authConfig', () => {
  it('uses the PKCE flow, not the supabase-js default', () => {
    // The default is `implicit`, which delivers a recovery session as
    // `#access_token=&refresh_token=` in the deep-link URL itself. `ejazty://`
    // is a custom scheme and Android does not enforce uniqueness for those, so
    // under implicit any app registering the same scheme can read a live,
    // long-lived session straight out of a password-reset link.
    //
    // Under PKCE the link carries only `?code=`, useless without the
    // code_verifier held in this install's SecureStore.
    expect(authConfig(false).flowType).toBe('pkce');
    expect(authConfig(true).flowType).toBe('pkce');
  });

  it('does not persist the session on web', () => {
    // SecureStore has no web implementation, so persisting there would fall
    // back to localStorage — readable by any script on the page, and valid
    // until an explicit sign-out. Web re-authenticates on reload instead.
    expect(authConfig(true).persistSession).toBe(false);
  });

  it('persists the session on native, where SecureStore backs it', () => {
    // The whole point of the SecureStoreAdapter is that the session survives a
    // restart in the keychain rather than in AsyncStorage. Turning persistence
    // off here would sign every user out on every cold start.
    expect(authConfig(false).persistSession).toBe(true);
  });

  it('never parses a session out of the URL', () => {
    // A native app has no URL bar. The recovery deep link is handled
    // explicitly in `features/auth/recovery.ts`, which checks the error shape
    // before the success shapes; letting the library race it would bypass that.
    expect(authConfig(false).detectSessionInUrl).toBe(false);
    expect(authConfig(true).detectSessionInUrl).toBe(false);
  });

  it('keeps tokens refreshing so a signed-in user stays signed in', () => {
    expect(authConfig(false).autoRefreshToken).toBe(true);
  });
});
