import {
  IMMERSIVE_EXAM_ROUTES,
  isImmersiveRoute,
  swipeTarget,
  tabIndexFor,
  TAB_ROUTES,
} from './tabs';

describe('tabIndexFor', () => {
  it('finds the tab a root path belongs to', () => {
    expect(tabIndexFor('/learn')).toBe(0);
    expect(tabIndexFor('/exam')).toBe(1);
    expect(tabIndexFor('/settings')).toBe(2);
  });

  it('finds the tab a detail screen belongs to', () => {
    // A swipe has to work from inside a section, not only from the tab root.
    expect(tabIndexFor('/learn/signs')).toBe(0);
    expect(tabIndexFor('/settings/account')).toBe(2);
  });

  it('does not match a path that merely starts with the same letters', () => {
    // `/learning` is not the Learn tab. A bare `startsWith` says it is.
    expect(tabIndexFor('/learning')).toBe(-1);
    expect(tabIndexFor('/examination')).toBe(-1);
  });

  it('returns -1 outside the tabs', () => {
    expect(tabIndexFor('/sign-in')).toBe(-1);
    expect(tabIndexFor('/language')).toBe(-1);
    expect(tabIndexFor('/')).toBe(-1);
  });
});

describe('isImmersiveRoute', () => {
  it('names the screens that own the display', () => {
    expect(isImmersiveRoute('/exam/session')).toBe(true);
    expect(isImmersiveRoute('/exam/result')).toBe(true);
  });

  it('leaves the exam home alone', () => {
    // `/exam` is a prefix of `/exam/session`, so a rule written the other way
    // round would make the exam tab unswipeable — the tab most reminders and
    // most of the app point at.
    expect(isImmersiveRoute('/exam')).toBe(false);
    expect(isImmersiveRoute('/learn')).toBe(false);
  });

  it('covers every route the tab bar hides itself for', () => {
    /*
      The two halves of "this screen owns the display" agreeing with each other.

      `(tabs)/_layout.tsx` hides the tab bar for `IMMERSIVE_EXAM_ROUTES`, and
      everything in this file refuses to *leave* those same screens. They were
      two hand-kept lists until they were derived from one, and either way round
      the drift is silent: a screen the bar hides for but a swipe can still
      leave abandons a running attempt to a diagonal finger, and a screen a
      swipe refuses but the bar stays on offers a one-tap exit past the quit
      confirmation.

      Asserted through `isImmersiveRoute` rather than by comparing the constant
      to itself, so this still fails if the derivation is later unpicked and the
      layout goes back to its own literal.
    */
    for (const name of IMMERSIVE_EXAM_ROUTES) {
      expect(isImmersiveRoute(`/exam/${name}`)).toBe(true);
    }
  });
});

describe('swipeTarget', () => {
  const LEFT = -80;
  const RIGHT = 80;

  describe('left to right', () => {
    it('advances on a leftward swipe', () => {
      expect(swipeTarget('/learn', LEFT, false)).toBe('/exam');
      expect(swipeTarget('/exam', LEFT, false)).toBe('/settings');
    });

    it('retreats on a rightward swipe', () => {
      expect(swipeTarget('/settings', RIGHT, false)).toBe('/exam');
      expect(swipeTarget('/exam', RIGHT, false)).toBe('/learn');
    });
  });

  describe('right to left', () => {
    /*
      The load-bearing block. In Arabic and Sorani the row is mirrored — Learn
      on the right, Settings on the left — so the swipe that advances is the
      opposite one. A version that ignored direction passes every LTR test
      above and moves backwards for most of this app's readers, which nobody
      developing in English would ever see.
    */
    it('advances on a rightward swipe', () => {
      expect(swipeTarget('/learn', RIGHT, true)).toBe('/exam');
      expect(swipeTarget('/exam', RIGHT, true)).toBe('/settings');
    });

    it('retreats on a leftward swipe', () => {
      expect(swipeTarget('/settings', LEFT, true)).toBe('/exam');
      expect(swipeTarget('/exam', LEFT, true)).toBe('/learn');
    });

    it('is the exact mirror of the same swipe in English', () => {
      for (const route of TAB_ROUTES) {
        expect(swipeTarget(route, LEFT, true)).toBe(swipeTarget(route, RIGHT, false));
        expect(swipeTarget(route, RIGHT, true)).toBe(swipeTarget(route, LEFT, false));
      }
    });
  });

  it('stops at both ends rather than wrapping or clamping', () => {
    // Null, not the current tab: re-navigating to the tab already showing
    // resets the stack inside it, so swiping past the end of Settings would
    // throw away the account screen underneath.
    expect(swipeTarget('/learn', RIGHT, false)).toBeNull();
    expect(swipeTarget('/settings', LEFT, false)).toBeNull();
    expect(swipeTarget('/learn', LEFT, true)).toBeNull();
    expect(swipeTarget('/settings', RIGHT, true)).toBeNull();
  });

  it('refuses to leave a running attempt', () => {
    // The one that costs the learner something. Leaving the session by any
    // route that skips the quit confirmation abandons the paper: the provider
    // outlives the screen, keeps counting down and auto-submits it as a fail.
    expect(swipeTarget('/exam/session', LEFT, false)).toBeNull();
    expect(swipeTarget('/exam/session', RIGHT, false)).toBeNull();
    expect(swipeTarget('/exam/session', LEFT, true)).toBeNull();
    expect(swipeTarget('/exam/result', LEFT, false)).toBeNull();
  });

  it('does nothing outside the tabs', () => {
    // The auth flow and the language picker are not a row to swipe along.
    expect(swipeTarget('/sign-in', LEFT, false)).toBeNull();
    expect(swipeTarget('/language', RIGHT, false)).toBeNull();
  });

  it('carries a swipe from a detail screen up to its tab', () => {
    expect(swipeTarget('/learn/signs', LEFT, false)).toBe('/exam');
    expect(swipeTarget('/settings/account', RIGHT, false)).toBe('/exam');
  });
});
