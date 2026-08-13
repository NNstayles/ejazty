/**
 * Saved Learn cards.
 *
 * ## Device-local, deliberately
 *
 * The same argument the profile picture and the daily goal are built on, and it
 * is the app's existing commitments rather than laziness: Learn has to work
 * **offline** and **for guests**, and a guest has no account to hang a remote
 * row off. Every server-side store here is reachable with the anon key that
 * ships in the bundle, so a new table is a new RLS surface to get right — for a
 * list of content ids that costs nothing to lose. The cost is stated in the UI
 * (`learn.savedNotice`) rather than left to be discovered: saved cards do not
 * follow the account to a second device, and a reinstall loses them.
 *
 * It also means they survive sign-out, unlike the attempt cache and the profile
 * picture. Those two clear because they are *about a person* — one learner's
 * exam history or face must not greet the next account on the phone. A list of
 * signs someone wanted to re-read is not that, and clearing it would punish a
 * guest for going off to register, which is the same trap
 * `clearAccountAttemptCache` had to be split to avoid.
 *
 * ## Why the store is external rather than a provider
 *
 * The toggle sits on a row of a virtualised list that runs to 111 cards. Held
 * in a context, one tap re-renders every consumer of that context, which is
 * every mounted row. `useIsBookmarked` subscribes a single button to a single
 * boolean instead, so saving a card repaints one glyph. The list screens
 * subscribe to the whole order through `useBookmarkIds`, which is what they
 * genuinely depend on.
 *
 * The logic is separated from the store for the reason `schedule.ts` and
 * `goal-credit.ts` are: the shell is four lines of subscription plumbing, and
 * everything that can actually be wrong — the ordering, the cap, the parse of
 * whatever is on disk, and resolving an id whose record has since been edited
 * out of the bundle — is a pure function with a test.
 */

import { useCallback, useSyncExternalStore } from 'react';

import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';

/**
 * Upper bound on how many cards may be saved.
 *
 * There are ~470 cards in the app, so this is not a limit a reader can reach by
 * saving things they mean to re-read — it bounds a corrupt or hand-edited store
 * rather than the user. The whole list is read into memory and rendered, so an
 * unbounded array read off disk is an unbounded amount of work at boot.
 */
export const MAX_BOOKMARKS = 500;

/**
 * Validates what came off disk.
 *
 * `readJSON` returns whatever parsed, which for a hand-edited or partially
 * written entry is any JSON at all. A non-string in here reaches a `FlatList`
 * key and a `Map` lookup, so it is filtered rather than trusted — the same
 * reasoning as `parseAttemptRow` and `asReminderFrequency`.
 *
 * Duplicates are collapsed because the order is also the display order, and a
 * repeated id would render the same card twice with two identical keys, which
 * React resolves by dropping one silently.
 */
export function parseBookmarks(raw: unknown): string[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const value of raw) {
    if (typeof value !== 'string' || value.length === 0) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    out.push(value);
    if (out.length === MAX_BOOKMARKS) break;
  }
  return out;
}

/**
 * The order after saving or unsaving `id`.
 *
 * Newest first, because that is the order the Saved screen reads in and there
 * is no other order available — a content id carries no date, and storing one
 * per bookmark to sort by would be a second thing to keep in step for a list
 * whose natural order is already "what I just saved".
 *
 * Saving an id that is already saved moves it to the front rather than being a
 * no-op. That cannot happen through the toggle, which unsaves instead, but it
 * is the only sensible answer for a function that takes an arbitrary id.
 */
export function nextBookmarks(
  current: readonly string[],
  id: string,
): string[] {
  const without = current.filter((saved) => saved !== id);
  if (without.length !== current.length) return without;
  // Trimmed from the *oldest* end: at the cap, the thing to drop is the card
  // saved longest ago, not the one being saved right now.
  return [id, ...without].slice(0, MAX_BOOKMARKS);
}

/**
 * Saved ids resolved against what the app currently ships, in saved order.
 *
 * Ids are resolved rather than trusted, for the same reason `buildExam`
 * resolves the mistake drill's `weakIds` against the live pool: a bookmark
 * names a record in the content bundle, and editing that bundle is a routine
 * thing to do. A saved card whose note was renamed or merged away would
 * otherwise be a row with no title, or a crash on a missing image.
 *
 * The stale id is dropped from the *view* and left in storage. Pruning it on
 * read would mean a build that failed to load one bundle silently deleting the
 * reader's saved list, which is much worse than a card quietly not appearing.
 */
export function resolveBookmarks<T>(
  order: readonly string[],
  byId: ReadonlyMap<string, T>,
): T[] {
  const out: T[] = [];
  for (const id of order) {
    const hit = byId.get(id);
    if (hit !== undefined) out.push(hit);
  }
  return out;
}

// ---------------------------------------------------------------------------
// The store
// ---------------------------------------------------------------------------

let order: readonly string[] = [];
let index: ReadonlySet<string> = new Set();
let hydrated = false;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function commit(next: readonly string[]): void {
  order = next;
  index = new Set(next);
  for (const listener of listeners) listener();
  // Best-effort, like every other preference write. A failed write costs the
  // save on the next launch and nothing on this one.
  void writeJSON(StorageKeys.bookmarks, next);
}

/**
 * Reads the saved list into module state.
 *
 * Called from `PreferencesProvider`'s boot effect, before `ready` flips — so by
 * the time anything renders, `useIsBookmarked` answers correctly on its first
 * call. Hydrating lazily on first subscribe would paint every card unsaved and
 * then flip them a frame later, which on the signs section is a hundred icons
 * changing at once for no reason the reader can see.
 *
 * The `hydrated` guard makes a second call a no-op rather than a way to discard
 * whatever has been saved since the first.
 */
export async function hydrateBookmarks(): Promise<void> {
  if (hydrated) return;
  hydrated = true;
  const stored = parseBookmarks(await readJSON<unknown>(StorageKeys.bookmarks, null));
  if (stored.length === 0) return;
  order = stored;
  index = new Set(stored);
  for (const listener of listeners) listener();
}

/** Saves or unsaves a card. Returns true when it is now saved. */
export function toggleBookmark(id: string): boolean {
  commit(nextBookmarks(order, id));
  return index.has(id);
}

export function isBookmarked(id: string): boolean {
  return index.has(id);
}

/** Saved ids, newest first. A stable reference between changes. */
export function bookmarkIds(): readonly string[] {
  return order;
}

/**
 * Subscribes one card's save button to one card's state.
 *
 * The snapshot is a boolean rather than the set, so `useSyncExternalStore`'s
 * own `Object.is` check absorbs every change that is not about this id — with a
 * hundred rows mounted, saving one card notifies a hundred subscribers and
 * re-renders exactly one.
 */
export function useIsBookmarked(id: string): boolean {
  const snapshot = useCallback(() => index.has(id), [id]);
  return useSyncExternalStore(subscribe, snapshot, snapshot);
}

/** Subscribes a list screen to the whole saved order. */
export function useBookmarkIds(): readonly string[] {
  return useSyncExternalStore(subscribe, bookmarkIds, bookmarkIds);
}
