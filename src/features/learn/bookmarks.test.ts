/**
 * The saved-cards logic.
 *
 * Everything asserted here fails *silently*. A toggle that appended instead of
 * prepending gives a Saved screen in an order nobody can predict but which
 * still looks like a list of saved cards; a parse that trusts what is on disk
 * hands a non-string to a `FlatList` key; and a resolver that does not check
 * the id against the shipped bundle renders a card with no title the day a note
 * is renamed. None of the three is reachable by reading the screen.
 *
 * The store shell around them is subscription plumbing with no rule in it, and
 * is deliberately not covered — a test of it would assert that a listener was
 * called, which pins the implementation rather than the behaviour.
 */

import {
  MAX_BOOKMARKS,
  nextBookmarks,
  parseBookmarks,
  resolveBookmarks,
} from './bookmarks';

// The four functions under test touch no storage at all, but they share a
// module with the store shell, which imports `lib/storage` and therefore
// AsyncStorage — whose native module is null under Jest. The official mock is
// the same one `reauth.test.ts` and `biometrics.test.ts` use. `babel-jest`
// hoists this above the import, which is why it can be written below it.
jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

describe('nextBookmarks', () => {
  it('saves a card that was not saved', () => {
    expect(nextBookmarks([], 'sign-stop')).toEqual(['sign-stop']);
  });

  it('unsaves a card that was saved', () => {
    expect(nextBookmarks(['sign-stop', 'sign-yield'], 'sign-stop')).toEqual([
      'sign-yield',
    ]);
  });

  /**
   * The order *is* the Saved screen's order, and there is nothing else to sort
   * by — a content id carries no date. Appending instead would bury today's
   * saves under whatever was saved on the first evening with the app.
   */
  it('puts the newest save first', () => {
    const after = nextBookmarks(['sign-stop'], 'sign-yield');
    expect(after).toEqual(['sign-yield', 'sign-stop']);
  });

  it('leaves the rest of the order alone when one is removed', () => {
    expect(nextBookmarks(['a', 'b', 'c'], 'b')).toEqual(['a', 'c']);
  });

  /**
   * At the cap the thing to drop is the card saved longest ago. Trimming the
   * other end would make the newest save the one that silently fails.
   */
  it('drops the oldest save at the cap rather than refusing the new one', () => {
    const full = Array.from({ length: MAX_BOOKMARKS }, (_, i) => `id-${i}`);
    const after = nextBookmarks(full, 'fresh');

    expect(after).toHaveLength(MAX_BOOKMARKS);
    expect(after[0]).toBe('fresh');
    expect(after).not.toContain(`id-${MAX_BOOKMARKS - 1}`);
    expect(after).toContain('id-0');
  });
});

describe('parseBookmarks', () => {
  it('reads a stored list back', () => {
    expect(parseBookmarks(['a', 'b'])).toEqual(['a', 'b']);
  });

  it.each([[null], [undefined], ['not-an-array'], [42], [{ a: 1 }]])(
    'answers empty for %p rather than throwing',
    (raw) => {
      expect(parseBookmarks(raw)).toEqual([]);
    },
  );

  /**
   * A non-string reaches a `FlatList` key and a `Map` lookup. Nothing the app
   * writes can produce one — a partially written or hand-edited entry can.
   */
  it('drops entries that are not usable ids', () => {
    expect(parseBookmarks(['a', 42, null, '', { id: 'b' }, 'c'])).toEqual([
      'a',
      'c',
    ]);
  });

  /**
   * The order is the display order, so a repeated id renders one card twice
   * under two identical keys — which React resolves by dropping one silently.
   */
  it('collapses duplicates, keeping the first position', () => {
    expect(parseBookmarks(['a', 'b', 'a'])).toEqual(['a', 'b']);
  });

  it('bounds a store larger than the cap', () => {
    const huge = Array.from({ length: MAX_BOOKMARKS + 50 }, (_, i) => `id-${i}`);
    expect(parseBookmarks(huge)).toHaveLength(MAX_BOOKMARKS);
  });
});

describe('resolveBookmarks', () => {
  const byId = new Map([
    ['a', { title: 'Alpha' }],
    ['b', { title: 'Bravo' }],
  ]);

  it('returns the saved records in saved order', () => {
    expect(resolveBookmarks(['b', 'a'], byId)).toEqual([
      { title: 'Bravo' },
      { title: 'Alpha' },
    ]);
  });

  /**
   * The load-bearing case. Editing the content bundle is routine — a note gets
   * renamed, two get merged — and a bookmark naming a record that no longer
   * ships would otherwise be a row with no title or a crash on a missing image.
   */
  it('skips an id whose record no longer ships', () => {
    expect(resolveBookmarks(['a', 'deleted-note', 'b'], byId)).toEqual([
      { title: 'Alpha' },
      { title: 'Bravo' },
    ]);
  });

  it('answers empty when nothing is saved', () => {
    expect(resolveBookmarks([], byId)).toEqual([]);
  });
});
