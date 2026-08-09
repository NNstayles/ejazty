/**
 * The profile picture: picking one, keeping it, and knowing whose it is.
 *
 * ## Why this is device-local rather than a Supabase Storage object
 *
 * Three of the app's existing commitments decide it. The app has to be usable
 * **offline** and **by guests** — a guest has no account to hang a remote object
 * off — and every server-side store in this project is reachable with the anon
 * key that ships in the bundle, so a new bucket is a new RLS surface to get
 * right. A picture the user chose from their own camera roll gains nothing from
 * a round trip. The cost is honest and worth stating: the picture does **not**
 * follow the account to a second device, and a reinstall loses it. If that ever
 * becomes worth fixing, this module is the seam — every screen reads the URI
 * through `useAvatar`, so the storage behind it can change without touching one
 * of them.
 *
 * ## The stored value is a filename, and that is not an implementation detail
 *
 * The obvious version stores the absolute URI the picker handed back. It works
 * in testing and breaks in the field, twice over:
 *
 * - **The picker's URI is in the *cache* directory**, which the OS is free to
 *   evict whenever the device runs low on storage. A profile picture that
 *   quietly becomes a broken image after a busy fortnight is worse than one that
 *   was never set.
 * - **The app container path is not stable across installs on iOS.** It carries
 *   a UUID that is re-minted on reinstall and can change on an OS upgrade, so a
 *   stored absolute URI goes stale while the file it names is still there.
 *
 * So the file is *copied* into the document directory — which is backed up and
 * never evicted — and only its name is persisted. The URI is rebuilt from
 * `Paths.document` on every read, which is always the container as it is *now*.
 *
 * ## The owner check is the same rule the attempts cache follows
 *
 * A picture is as personal as a history. `ownerId: null` means device-local — a
 * guest's, or one set before anyone signed in — and is *adopted* by the first
 * account to sign in, so someone who tries the app as a guest and then registers
 * keeps their picture. A picture owned by a *different* account is never shown.
 * See `clearAccountAvatar` for the sign-out half, which is asymmetric for
 * exactly the reason `clearAccountAttemptCache` is.
 */

import { Directory, File, Paths } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';

import { readJSON, remove, StorageKeys, writeJSON } from '@/lib/storage';

/** Subdirectory of the document directory holding the picture. */
const AVATAR_DIR = 'profile';

/**
 * Extensions `setAvatar` will carry through into a stored filename.
 *
 * `File.extension` is `Paths.extname` over the **whole URI**, not over a
 * sanitised basename — so a picker URI carrying a query string or a fragment
 * (`…/IMG_0042.jpg?width=800`) yields `.jpg?width=800`, which is unbounded in
 * length and unrestricted in character class. `Paths.extname` cannot produce a
 * path separator, so this is not traversal; what it can produce is a name this
 * module's own reader refuses.
 *
 * That is the actual defect being closed: `parseCache` already rejects a stored
 * `file` containing a separator, on the stated grounds that treating the name as
 * a path is the bug the shape exists to prevent — but the write path applied no
 * check at all, so it could mint a value `parseCache` would then throw away. The
 * picture would silently never render and nothing anywhere would say why. The
 * two halves of one invariant have to agree about what a valid name is.
 *
 * Anything unrecognised falls back to `.jpg` rather than being carried through.
 * The extension is only a hint for type sniffing: `pickImage` re-encodes through
 * `allowsEditing`/`quality`, so it is not a fact about the bytes and there is
 * nothing to lose by normalising it.
 */
const SAFE_EXTENSION = /^\.[A-Za-z0-9]{1,8}$/;

/**
 * The extension to store for a picked file, always a safe one.
 *
 * Exported for tests. The rest of `setAvatar` is filesystem wrapping that a test
 * could only assert a mock against, but this is the one pure decision in it, and
 * the one whose failure is silent — a name the writer produces and the reader
 * then rejects renders as a profile picture that simply never appears.
 */
export function safeExtension(raw: string): string {
  return SAFE_EXTENSION.test(raw) ? raw.toLowerCase() : '.jpg';
}

/**
 * Image types this app is willing to copy into its own storage.
 *
 * The set is what the two platforms' pickers actually hand back — JPEG and PNG
 * everywhere, HEIC/HEIF from an iPhone camera roll, WebP and GIF from a
 * download or a messaging app.
 */
const SUPPORTED_IMAGE_MIME = /^image\/(jpeg|png|heic|heif|webp|gif)$/i;

/**
 * Whether a picked asset's reported MIME type is an image this app will store.
 *
 * ## What this is, stated accurately
 *
 * It is **not** an upload filter, because nothing is uploaded — the picture is
 * copied into this app's own sandbox and rendered by `expo-image` on the same
 * device that chose it. There is no server to protect, no other user to serve
 * it to, and no execution path for a file in an app container. The classic
 * "user renames malware.exe to photo.jpg" attack has nowhere to land here.
 *
 * What it buys is a better failure mode, and a bound on what reaches the
 * filesystem. `launchImageLibraryAsync` is asked for `mediaTypes: ['images']`,
 * but that constrains the *picker UI*, not what comes back — a provider-backed
 * document, a corrupt file, or a format the decoder does not support all arrive
 * as an ordinary asset. Before this, any of them was copied into the document
 * directory, recorded as the avatar, and then silently failed to draw: the user
 * sees their old picture (or their initials) with a "photo updated" notice above
 * it, and there is no way to find out why. Refusing early turns that into
 * `account.photoFailed`, which is at least true.
 *
 * ## Absent means accepted, deliberately
 *
 * `mimeType` is optional on `ImagePickerAsset` and is genuinely missing on some
 * platform and SDK combinations. Rejecting on absence would disable the profile
 * picture entirely wherever that happens, to guard against a threat that does
 * not exist here — the wrong trade, and the same fail-open reasoning
 * `features/auth/captcha.ts` documents. A type that is *present and not an
 * image* is a different claim: something knows what this file is and it is not
 * a picture.
 */
export function isSupportedImageMime(mime: string | null | undefined): boolean {
  if (mime === null || mime === undefined || mime === '') return true;
  return SUPPORTED_IMAGE_MIME.test(mime);
}

/**
 * Cached picture plus the account it belongs to.
 *
 * `file` is a bare filename — see the note above on why it is never a URI.
 */
type AvatarCache = {
  ownerId: string | null;
  file: string;
};

/** The result of asking the user for a picture. */
export type PickOutcome =
  | { kind: 'picked'; uri: string }
  /** The user backed out of the picker. Not an error, and not worth reporting. */
  | { kind: 'cancelled' }
  /** The OS refused access to the library. The caller should offer Settings. */
  | { kind: 'denied' }
  /** Anything else: a decode failure, a full disk, a missing native module. */
  | { kind: 'failed' };

function parseCache(value: unknown): AvatarCache | null {
  if (typeof value !== 'object' || value === null) return null;
  const c = value as Partial<AvatarCache>;
  if (typeof c.file !== 'string' || c.file.length === 0) return null;
  // A path separator here would mean the stored name is being treated as a
  // path, which is the bug this shape exists to prevent — refuse rather than
  // resolve it somewhere unexpected.
  if (c.file.includes('/') || c.file.includes('\\')) return null;
  if (c.ownerId !== null && typeof c.ownerId !== 'string') return null;
  return { ownerId: c.ownerId ?? null, file: c.file };
}

function avatarDirectory(): Directory {
  return new Directory(Paths.document, AVATAR_DIR);
}

/**
 * Whether a cached picture may be shown to `ownerId`.
 *
 * Exported because it is the whole owner rule in one line and the place a
 * mistake would be silent — a version returning `true` unconditionally shows one
 * person's face on another person's account, and nothing on screen says so.
 */
export function isVisibleTo(
  cache: AvatarCache | null,
  ownerId: string | null,
): cache is AvatarCache {
  if (!cache) return false;
  // Device-local: adopted by whoever is signed in, and shown to a guest.
  if (cache.ownerId === null) return true;
  return cache.ownerId === ownerId;
}

/**
 * The current picture's URI, or null.
 *
 * Returns null rather than a dangling URI when the file has gone — the entry is
 * left in storage rather than repaired here, because a read should not have a
 * write's failure modes, and the next `setAvatar` overwrites it anyway.
 */
export async function readAvatar(ownerId: string | null): Promise<string | null> {
  const cache = parseCache(await readJSON<unknown>(StorageKeys.avatar, null));
  if (!isVisibleTo(cache, ownerId)) return null;

  try {
    const file = new File(avatarDirectory(), cache.file);
    return file.exists ? file.uri : null;
  } catch {
    return null;
  }
}

/**
 * Opens the library and returns what the user did.
 *
 * Never throws: every branch is a `PickOutcome` the caller can render. The
 * native module is absent on web and restricted in some managed contexts, and a
 * screen that has to `try`/`catch` around a picker ends up not doing it.
 */
export async function pickImage(): Promise<PickOutcome> {
  try {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) return { kind: 'denied' };

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      // Square, because every surface that renders this is a circle. Cropping
      // here rather than with `resizeMode` on the view means the *stored* file
      // is the square one, so a 12 MP portrait is not carried around forever to
      // be displayed at 44pt.
      allowsEditing: true,
      aspect: [1, 1],
      // Well under 1: the largest this is ever drawn is a 96pt hero circle, and
      // the file is copied into a backed-up directory, so full quality would be
      // several megabytes of a picture nothing can show the detail of.
      quality: 0.6,
    });

    if (result.canceled) return { kind: 'cancelled' };
    const asset = result.assets[0];
    const uri = asset?.uri;
    if (!uri) return { kind: 'failed' };
    // `mediaTypes` constrains the picker's UI, not what comes back. Refusing a
    // non-image here rather than copying it in and discovering later — see
    // `isSupportedImageMime` for what this does and does not claim to do.
    if (!isSupportedImageMime(asset.mimeType)) return { kind: 'failed' };
    return { kind: 'picked', uri };
  } catch {
    return { kind: 'failed' };
  }
}

/**
 * Copies a picked image into the document directory and records it.
 *
 * Returns the stored URI, or null if the copy failed — the caller should treat
 * null as "nothing changed" and say so, rather than showing a picture that is
 * not persisted.
 *
 * The filename is minted fresh every time rather than being a fixed
 * `avatar.jpg`. Two reasons, and the second is the one that bites: a stable name
 * means `expo-image`'s memory and disk caches keep serving the *previous*
 * picture — the URI has not changed, so nothing tells them to reload — and the
 * user sees their old photo after choosing a new one.
 */
export async function setAvatar(
  ownerId: string | null,
  sourceUri: string,
): Promise<string | null> {
  try {
    const directory = avatarDirectory();
    directory.create({ idempotent: true, intermediates: true });

    // Keep the source's extension so the file stays decodable by type sniffing
    // as well as by name — but only after checking it is one. `File.extension`
    // runs `Paths.extname` over the whole URI, so a picker URI with a query
    // string yields `.jpg?width=800`, and writing that produces a filename
    // `parseCache` then refuses on read. See `safeExtension`.
    const source = new File(sourceUri);
    const name = `avatar-${Date.now().toString(36)}${safeExtension(source.extension)}`;

    const destination = new File(directory, name);
    source.copy(destination);

    // The previous file is removed only *after* the new one is safely written,
    // so a failed copy leaves the user with the picture they already had rather
    // than with none.
    const previous = parseCache(await readJSON<unknown>(StorageKeys.avatar, null));
    await writeJSON(StorageKeys.avatar, { ownerId, file: name } satisfies AvatarCache);
    if (previous && previous.file !== name) deleteFile(previous.file);

    return destination.uri;
  } catch {
    return null;
  }
}

/** Best-effort unlink. A leftover file is a few hundred kilobytes, not a bug. */
function deleteFile(name: string): void {
  try {
    const file = new File(avatarDirectory(), name);
    if (file.exists) file.delete();
  } catch {
    // ignore
  }
}

/** Removes the picture entirely — the "remove photo" action. */
export async function clearAvatar(): Promise<void> {
  const cache = parseCache(await readJSON<unknown>(StorageKeys.avatar, null));
  if (cache) deleteFile(cache.file);
  await remove(StorageKeys.avatar);
}

/**
 * Drops an *account's* picture, keeping a device-local one.
 *
 * The asymmetry is the same one `clearAccountAttemptCache` documents, and it is
 * reached through the same button. An account's picture must not be left on the
 * phone for whoever signs in next. A guest's exists nowhere else, and signing
 * out is exactly how a guest leaves guest mode to go and register — so clearing
 * it would delete the picture the account they are about to create is meant to
 * adopt, at the moment they go to create it.
 */
export async function clearAccountAvatar(): Promise<void> {
  const cache = parseCache(await readJSON<unknown>(StorageKeys.avatar, null));
  if (!cache || cache.ownerId === null) return;
  deleteFile(cache.file);
  await remove(StorageKeys.avatar);
}
