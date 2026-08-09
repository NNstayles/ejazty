/**
 * Tests for the profile picture's owner boundary.
 *
 * This is the same rule `attempts.test.ts` pins for exam history, and it fails
 * in the same silent way — you would have to sign in as two different people on
 * one phone to see it — except that the failure here is the more visible of the
 * two by a distance: an app that shows one person's *face* on another person's
 * account has not made a subtle mistake.
 *
 * ## What is and is not covered
 *
 * `isVisibleTo` is the whole rule in one function, and it is pure, so it is
 * tested directly. The filesystem half — copy in, unlink the previous file,
 * rebuild the URI from `Paths.document` — is not: it is a thin wrapper over
 * `expo-file-system`, and a test of it would end up asserting that a mock of
 * that module was called, which pins the call sequence rather than the
 * behaviour. The parts of it worth protecting are stated as comments in
 * `avatar.ts` instead; the one genuine invariant reachable from here is that a
 * stored entry naming a *path* rather than a filename is rejected, which is
 * covered below through `readAvatar`.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  clearAccountAvatar,
  clearAvatar,
  isSupportedImageMime,
  isVisibleTo,
  readAvatar,
  safeExtension,
} from './avatar';

jest.mock('@react-native-async-storage/async-storage', () =>
  // `require`, not `import`: jest.mock factories are hoisted above the import
  // block, so an imported binding would not exist yet when this runs.
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

/**
 * A stand-in for the filesystem, so `readAvatar` can be reached at all.
 *
 * Every file is reported as absent, which is the honest answer in a test
 * environment with no document directory: it means `readAvatar` resolves to
 * null on the happy path too, so the assertions below are about the *owner*
 * decision reached before that point. `isVisibleTo` carries the rule itself and
 * is asserted directly.
 */
jest.mock('expo-file-system', () => ({
  Paths: { document: { uri: 'file:///documents/' } },
  Directory: class {},
  File: class {
    exists = false;
    uri = '';
  },
}));

jest.mock('expo-image-picker', () => ({
  requestMediaLibraryPermissionsAsync: jest.fn(),
  launchImageLibraryAsync: jest.fn(),
}));

const KEY = 'ejazty.profile.avatar';

beforeEach(async () => {
  await AsyncStorage.clear();
});

describe('isVisibleTo', () => {
  it('shows a device-local picture to anyone on this device', () => {
    const cache = { ownerId: null, file: 'a.jpg' };
    // The guest who set it.
    expect(isVisibleTo(cache, null)).toBe(true);
    // And the account they go on to create — the adoption rule. Without this,
    // registering after trying the app as a guest silently loses the picture.
    expect(isVisibleTo(cache, 'user-1')).toBe(true);
  });

  it('shows an account its own picture', () => {
    expect(isVisibleTo({ ownerId: 'user-1', file: 'a.jpg' }, 'user-1')).toBe(true);
  });

  /*
    The assertion the file exists for. Inverting this — returning true
    unconditionally, which is what a version without an owner field does —
    greets the second person to sign in on a shared phone with the first
    person's face, and nothing on screen says why.
  */
  it('never shows one account another account picture', () => {
    expect(isVisibleTo({ ownerId: 'user-1', file: 'a.jpg' }, 'user-2')).toBe(false);
  });

  it('never shows an account picture to a guest', () => {
    expect(isVisibleTo({ ownerId: 'user-1', file: 'a.jpg' }, null)).toBe(false);
  });

  it('reports nothing stored as nothing to show', () => {
    expect(isVisibleTo(null, 'user-1')).toBe(false);
  });
});

describe('readAvatar', () => {
  it('resolves to null when nothing is stored', async () => {
    await expect(readAvatar('user-1')).resolves.toBeNull();
  });

  it('resolves to null for a picture owned by someone else', async () => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ ownerId: 'user-1', file: 'a.jpg' }),
    );
    await expect(readAvatar('user-2')).resolves.toBeNull();
  });

  /*
    The stored value is a bare filename by design — see the note in `avatar.ts`
    on why an absolute URI goes stale across a reinstall. A stored entry
    carrying a separator means something is treating that field as a path, and
    resolving it would read from wherever it pointed. Refusing is the only safe
    reading of a value that cannot have come from this app.
  */
  it('refuses a stored name that is really a path', async () => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ ownerId: null, file: '../../secrets.jpg' }),
    );
    await expect(readAvatar(null)).resolves.toBeNull();
  });

  it('refuses a malformed entry rather than throwing', async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify({ ownerId: 'user-1' }));
    await expect(readAvatar('user-1')).resolves.toBeNull();

    await AsyncStorage.setItem(KEY, 'not json at all');
    await expect(readAvatar('user-1')).resolves.toBeNull();
  });
});

describe('clearing', () => {
  /*
    The asymmetry, and it is reached through the same button as
    `clearAccountAttemptCache`'s. Sign-out has to drop an *account's* picture —
    it must not greet the next person to sign in — while keeping a guest's,
    because signing out is exactly how a guest leaves guest mode to go and
    register, and the account they create is meant to adopt what they set.
  */
  it('drops an account picture on sign-out', async () => {
    await AsyncStorage.setItem(
      KEY,
      JSON.stringify({ ownerId: 'user-1', file: 'a.jpg' }),
    );
    await clearAccountAvatar();
    await expect(AsyncStorage.getItem(KEY)).resolves.toBeNull();
  });

  it('keeps a device-local picture on sign-out', async () => {
    const stored = JSON.stringify({ ownerId: null, file: 'a.jpg' });
    await AsyncStorage.setItem(KEY, stored);
    await clearAccountAvatar();
    await expect(AsyncStorage.getItem(KEY)).resolves.toBe(stored);
  });

  // Account deletion is the unconditional case: there is no account left for a
  // device-local picture to belong to.
  it('drops everything on an explicit clear', async () => {
    await AsyncStorage.setItem(KEY, JSON.stringify({ ownerId: null, file: 'a.jpg' }));
    await clearAvatar();
    await expect(AsyncStorage.getItem(KEY)).resolves.toBeNull();
  });
});

/*
  The filename the writer mints has to be one the reader will accept.

  `parseCache` refuses a stored `file` containing a path separator, and that
  rule was only ever enforced on the read side — `setAvatar` interpolated
  `File.extension` straight into the name with no check. `File.extension` is
  `Paths.extname` over the *whole URI*, so a picker URI carrying a query string
  yields `.jpg?width=800`.

  Every failure here is silent in exactly the way the rest of this module's are:
  a name the reader rejects is a profile picture that never appears, with
  nothing on screen and nothing in a log to say the write is what went wrong.
*/
describe('stored filenames', () => {
  it('keeps an ordinary image extension', () => {
    expect(safeExtension('.jpg')).toBe('.jpg');
    expect(safeExtension('.png')).toBe('.png');
    expect(safeExtension('.heic')).toBe('.heic');
    expect(safeExtension('.webp')).toBe('.webp');
  });

  // The picker is inconsistent about case across platforms, and a name is
  // compared as a string everywhere it is used.
  it('normalises case', () => {
    expect(safeExtension('.JPG')).toBe('.jpg');
    expect(safeExtension('.PNG')).toBe('.png');
  });

  /*
    The case that motivated this. `Paths.extname` does not strip a query string
    or a fragment, so these are values the picker can genuinely hand over —
    unbounded in length and unrestricted in character class.
  */
  it('refuses an extension carrying a query string or fragment', () => {
    expect(safeExtension('.jpg?width=800')).toBe('.jpg');
    expect(safeExtension('.png#fragment')).toBe('.jpg');
    expect(safeExtension('.jpg?a=1&b=2')).toBe('.jpg');
  });

  /*
    The load-bearing one: whatever this returns is interpolated into a name that
    `parseCache` will read back, and `parseCache` rejects separators outright.
    A writer that could produce one is a writer that can silently destroy the
    picture it just saved.
  */
  it('never produces a value containing a path separator', () => {
    for (const raw of [
      '.jpg/../../evil',
      '.jpg\\..\\evil',
      '../..',
      '.jpg?path=/etc/passwd',
    ]) {
      expect(safeExtension(raw)).not.toContain('/');
      expect(safeExtension(raw)).not.toContain('\\');
    }
  });

  it('falls back for an empty, dotless or over-long extension', () => {
    expect(safeExtension('')).toBe('.jpg');
    expect(safeExtension('jpg')).toBe('.jpg');
    // Nothing legitimate is nine characters; the bound is what stops an
    // arbitrarily long tail being carried into a filename.
    expect(safeExtension('.abcdefghi')).toBe('.jpg');
  });

  // Over-strictness is a real failure mode here too: rejecting a legitimate
  // extension is invisible, because the fallback still produces a working file.
  // This pins that the common formats are not quietly being rewritten.
  it('does not rewrite extensions it should be keeping', () => {
    for (const ext of ['.jpg', '.jpeg', '.png', '.heic', '.heif', '.webp', '.gif']) {
      expect(safeExtension(ext)).toBe(ext);
    }
  });
});

/**
 * The picked asset's reported type.
 *
 * Not an upload filter — nothing is uploaded, and a file in an app sandbox has
 * no execution path. What it bounds is what reaches the document directory, and
 * what it fixes is a silent failure: before it, a non-image was copied in,
 * recorded as the avatar, and then never drew, under a "photo updated" notice.
 *
 * Both directions are asserted, because both are ways to get this wrong and
 * only one of them is visible. Over-strictness is the invisible one — an iPhone
 * camera roll hands back HEIC, and rejecting it would break the feature for
 * every iOS user while looking like a picker that simply does nothing.
 */
describe('isSupportedImageMime', () => {
  it('accepts every type the two platforms actually return', () => {
    for (const mime of [
      'image/jpeg',
      'image/png',
      'image/heic',
      'image/heif',
      'image/webp',
      'image/gif',
    ]) {
      expect(isSupportedImageMime(mime)).toBe(true);
    }
  });

  it('accepts a type whose case does not match', () => {
    // Reported casing is not guaranteed, and a case-sensitive check would
    // reject a perfectly good picture on whichever platform capitalises.
    expect(isSupportedImageMime('IMAGE/JPEG')).toBe(true);
  });

  it('refuses something that is present and not an image', () => {
    for (const mime of [
      'application/pdf',
      'application/octet-stream',
      'video/mp4',
      'text/html',
    ]) {
      expect(isSupportedImageMime(mime)).toBe(false);
    }
  });

  it('refuses a type that merely starts with an accepted one', () => {
    // Anchored, so `image/png-evil` and a prefix match are not enough. This is
    // the assertion that fails if the regex ever loses its `^`/`$`.
    expect(isSupportedImageMime('image/pngx')).toBe(false);
    expect(isSupportedImageMime('ximage/png')).toBe(false);
    expect(isSupportedImageMime('image/svg+xml')).toBe(false);
  });

  it('accepts an absent type, deliberately', () => {
    // `mimeType` is optional on `ImagePickerAsset` and genuinely missing on
    // some platform and SDK combinations. Failing closed here would disable the
    // profile picture entirely wherever that happens, to guard against a threat
    // this app does not have — the same fail-open call the CAPTCHA seam makes.
    expect(isSupportedImageMime(undefined)).toBe(true);
    expect(isSupportedImageMime(null)).toBe(true);
    expect(isSupportedImageMime('')).toBe(true);
  });
});
