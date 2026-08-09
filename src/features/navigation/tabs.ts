/**
 * Which tab a horizontal swipe lands on.
 *
 * ## Why this is pure, and separate from the gesture
 *
 * The gesture itself is four lines of Reanimated that cannot be reached from a
 * test — but the *decision* it makes has two rules in it that are both easy to
 * get backwards and impossible to notice in the language you develop in:
 *
 *   1. **The direction mirrors.** In Arabic and Sorani the tab row is laid out
 *      right-to-left, so Learn sits on the right and Settings on the left. The
 *      swipe that moves *forward* through the tabs is therefore the opposite
 *      one, and a version that ignored this would work perfectly in English and
 *      move backwards in the two languages most of this app is written for.
 *      Same class of detail as `Chevron`, `Gradient` and the tab bar's
 *      travelling circle — see the i18n notes in CLAUDE.md.
 *
 *   2. **It refuses to leave a running attempt.** The exam session and result
 *      screens own the whole display and hide the tab bar, deliberately: any
 *      exit that skips the quit confirmation abandons the attempt, and the
 *      provider above keeps counting down and auto-submits it into the history
 *      as a failure. A swipe is exactly such an exit, and an accidental one at
 *      that — a learner scrolling a long question with a slightly diagonal
 *      finger must not lose the paper.
 *
 * Both fail silently: a mirrored-wrong swipe is only visible to someone reading
 * Arabic, and a lost attempt looks like the app having navigated somewhere.
 */

/**
 * The tabs, in the order `(tabs)/_layout.tsx` declares them.
 *
 * The order is the layout's, not this file's — it has to match, because the
 * whole point of a swipe is that it moves along the row the reader can see.
 */
export const TAB_ROUTES = ['/learn', '/exam', '/settings'] as const;

export type TabRoute = (typeof TAB_ROUTES)[number];

/**
 * Screens inside the exam stack that own the whole display, by the route name
 * expo-router knows them as.
 *
 * ## Why this is exported rather than a local list
 *
 * There are two consequences of a screen being immersive and they are enforced
 * in two different files, which is how they drift:
 *
 * - **The tab bar is hidden** — `(tabs)/_layout.tsx` reads this to set
 *   `tabBarStyle: { display: 'none' }`, because the bar is otherwise a way out
 *   of a running attempt that skips the quit confirmation entirely.
 * - **A gesture or a notification may not leave** — `swipeTarget` and
 *   `mayNavigateFrom` read `isImmersiveRoute` below, for exactly the same
 *   reason arrived at from the other side.
 *
 * Those used to be two hand-kept lists, one here and one in the layout. Adding
 * a third immersive screen to only one of them fails **silently and in whichever
 * direction you forgot**: register it in the layout alone and a slightly
 * diagonal finger still swipes out of a paper mid-attempt, which the provider
 * keeps counting down and auto-submits as a failure; register it here alone and
 * the tab bar stays on screen offering a one-tap exit past the confirmation.
 * Neither is visible in review and neither is reachable without sitting a mock
 * and trying to leave it the wrong way.
 *
 * One list now, and the prefixes below are derived from it.
 */
export const IMMERSIVE_EXAM_ROUTES = ['session', 'result'] as const;

/**
 * The same screens as pathnames.
 *
 * Matched as prefixes so the exam stack's sub-routes are covered without
 * listing each one. Note `/exam` itself is a prefix of `/exam/session`, so the
 * test for this is written the way round that keeps the exam *home* swipeable.
 */
const IMMERSIVE_PREFIXES = IMMERSIVE_EXAM_ROUTES.map((name) => `/exam/${name}`);

/** Whether `pathname` is a screen that owns the display. */
export function isImmersiveRoute(pathname: string): boolean {
  return IMMERSIVE_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

/**
 * Which tab `pathname` is inside, or -1 if none.
 *
 * Prefix-matched, because a swipe has to work from a *detail* screen too —
 * `/learn/signs` is still the Learn tab. Sorted longest-first so a route that
 * is a prefix of another cannot claim it.
 */
export function tabIndexFor(pathname: string): number {
  let best = -1;
  let bestLength = 0;
  TAB_ROUTES.forEach((route, index) => {
    if (pathname === route || pathname.startsWith(`${route}/`)) {
      if (route.length > bestLength) {
        best = index;
        bestLength = route.length;
      }
    }
  });
  return best;
}

/**
 * The tab a swipe should land on, or null to do nothing.
 *
 * `translationX` is the raw gesture distance in points: negative is a finger
 * travelling left, whichever language is active. Turning that into a *direction
 * of travel through the tabs* is the mirroring rule above.
 *
 * Returns null rather than clamping at the ends. Clamping would re-navigate to
 * the tab already showing, which resets any stack pushed inside it — swiping
 * left on Settings would throw away the account screen underneath.
 */
export function swipeTarget(
  pathname: string,
  translationX: number,
  isRTL: boolean,
): TabRoute | null {
  if (isImmersiveRoute(pathname)) return null;

  const current = tabIndexFor(pathname);
  if (current < 0) return null;

  // A leftward swipe advances through a left-to-right row and retreats through
  // a mirrored one. Written as a sign so the two cases cannot drift apart.
  const forward = translationX < 0;
  const step = (forward ? 1 : -1) * (isRTL ? -1 : 1);

  const target = current + step;
  if (target < 0 || target >= TAB_ROUTES.length) return null;
  return TAB_ROUTES[target];
}
