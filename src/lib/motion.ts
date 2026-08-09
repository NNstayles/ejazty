/**
 * The app's motion vocabulary.
 *
 * Durations, easings and springs live here for the same reason colour lives in
 * `theme/tokens.ts`: a screen that picks its own 400ms while its neighbour
 * picks 250 reads as two apps, and the difference is invisible in a diff. Every
 * animation in the app resolves to a name from this file.
 *
 * ## Everything here is reduce-motion aware, and that is not decoration
 *
 * "Reduce Motion" is an accessibility setting people turn on because animation
 * makes them ill — vestibular disorders are the reason the switch exists. The
 * rule this file enforces is **suppress the movement, keep the information**: a
 * staggered list still appears, it simply appears at once rather than sliding
 * in. Nothing is ever left invisible or mid-transition when motion is off,
 * which is the failure mode of skipping an entering animation without
 * substituting anything for it.
 */

import { useMemo } from 'react';
import {
  Easing,
  FadeIn,
  FadeInDown,
  useReducedMotion,
  type WithSpringConfig,
  type WithTimingConfig,
} from 'react-native-reanimated';

/**
 * Duration scale, in milliseconds.
 *
 * `instant` is for state that must feel like a direct consequence of a touch —
 * anything longer reads as lag rather than as animation. `deliberate` is
 * reserved for the one-off moments a screen is built around (the score ring
 * filling), where the motion *is* the content.
 */
export const duration = {
  instant: 120,
  fast: 180,
  base: 260,
  slow: 360,
  deliberate: 900,
} as const;

/** Gap between consecutive items in a staggered list entrance. */
export const STAGGER_MS = 55;

/**
 * The longest stagger the app will ever schedule.
 *
 * A list is not always short: the Learn sections run to 111 cards, and
 * `index * 55ms` would put the last one nearly a minute out — the screen would
 * look broken, and a user who scrolls fast outruns their own content. Capping
 * the *delay* rather than the index keeps the top of any list feeling
 * sequenced while guaranteeing everything has landed within a third of a
 * second.
 */
const MAX_STAGGER_MS = 330;

export const easing = {
  /**
   * The default. A sharp out-curve — quick to leave, slow to settle — which is
   * what reads as responsive; a symmetric ease makes every transition feel like
   * it is being poured.
   */
  standard: Easing.bezier(0.2, 0, 0, 1),
  /** For things arriving on screen. */
  decelerate: Easing.out(Easing.cubic),
  /** For things leaving it. */
  accelerate: Easing.in(Easing.cubic),
} as const;

export const spring = {
  /** Press feedback: tight and over-damped, so it never wobbles under the finger. */
  press: { damping: 18, stiffness: 260, mass: 0.6 } satisfies WithSpringConfig,
  /** General-purpose settling for layout and colour-adjacent transforms. */
  gentle: { damping: 20, stiffness: 180, mass: 0.9 } satisfies WithSpringConfig,
  /** Deliberate overshoot, for a state change worth drawing the eye to. */
  bouncy: { damping: 11, stiffness: 220, mass: 0.7 } satisfies WithSpringConfig,
} as const;

/** `withTiming` config at a named duration. */
export function timing(
  ms: number = duration.base,
  ease = easing.standard,
): WithTimingConfig {
  return { duration: ms, easing: ease };
}

export type Motion = {
  /** True when the OS asks for reduced motion. */
  reduced: boolean;
  /**
   * Entrance for item `index` of a list. `undefined` when motion is reduced,
   * which Reanimated reads as "no entering animation" — the item is simply
   * mounted in its final position rather than being left invisible.
   */
  entrance: (index?: number) => FadeInDown | undefined;
  /** Entrance with no movement, for content that should not travel. */
  appear: (delayMs?: number) => FadeIn | undefined;
  /**
   * Duration to use, collapsed to 0 when motion is reduced.
   *
   * Zero rather than "skip the call": a `withTiming` at 0ms still lands on the
   * target value, so every animated style stays correct without the call site
   * branching. Use this for anything driven imperatively rather than by an
   * entering animation.
   */
  ms: (value?: number) => number;
};

/**
 * The active motion settings.
 *
 * Prefer this over importing the constants directly — the constants describe
 * the app's taste, this describes what the *user* has asked for, and only one
 * of those is negotiable.
 */
export function useMotion(): Motion {
  const reduced = useReducedMotion();

  // Memoised on `reduced`, which changes about once in the life of an install.
  //
  // Not a micro-optimisation: `renderItem` on the Learn list closes over this,
  // and a fresh object every render gives `FlatList` a new `renderItem`
  // identity every render, which is exactly the signal it uses to decide that
  // every mounted cell needs re-rendering. A hundred-and-eleven-row list is the
  // wrong place to hand out a new closure per frame.
  return useMemo<Motion>(
    () => ({
      reduced,
      entrance: (index = 0) =>
        reduced
          ? undefined
          : FadeInDown.delay(
              Math.min(index * STAGGER_MS, MAX_STAGGER_MS),
            ).duration(duration.slow),
      appear: (delayMs = 0) =>
        reduced ? undefined : FadeIn.delay(delayMs).duration(duration.base),
      ms: (value = duration.base) => (reduced ? 0 : value),
    }),
    [reduced],
  );
}
