import { useEffect } from 'react';
import {
  useSharedValue,
  withDelay,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';

import { easing, useMotion } from '@/lib/motion';

/**
 * The 0→1 driver behind every animated icon.
 *
 * ## The contract each icon is built against
 *
 * **`progress === 1` is the icon's resting state, not the end of a flourish.**
 * Every icon here draws itself entirely from this value, and `1` has to be what
 * the icon looks like sitting quietly on screen — the needle settled at a
 * plausible speed, the checkmark drawn, the halo already faded out. Getting
 * this backwards is the classic icon-animation bug: the icon plays beautifully
 * and then rests in a half-drawn state the moment motion is reduced, or leaves
 * a pulse looping under the user's thumb forever.
 *
 * It is also what makes reduced motion a one-line answer: start at `1` and
 * never move. The user sees a finished icon, which is the whole point.
 *
 * ## Why these play once rather than looping
 *
 * A looping icon is a thing moving on screen that the user cannot stop and did
 * not ask for. On the Learn home that would be five of them at once, under the
 * text they are trying to read, forever — and on a list it costs a UI-thread
 * frame budget for as long as the screen is open. These play on mount and
 * replay when `trigger` changes (a press, a tab gaining focus), which is
 * motion tied to something the user did.
 */
export function useIconPlayback(
  /** Replays whenever this value changes. Pass a press counter or a focus flag. */
  trigger: unknown,
  {
    durationMs = 700,
    delayMs = 0,
  }: { durationMs?: number; delayMs?: number } = {},
): SharedValue<number> {
  const motion = useMotion();
  const progress = useSharedValue(motion.reduced ? 1 : 0);

  useEffect(() => {
    if (motion.reduced) {
      progress.value = 1;
      return;
    }
    progress.value = 0;
    progress.value = withDelay(
      delayMs,
      withTiming(1, { duration: durationMs, easing: easing.decelerate }),
    );
  }, [trigger, motion.reduced, progress, durationMs, delayMs]);

  return progress;
}

/** Props every icon in this directory accepts. */
export type AnimatedIconProps = {
  size?: number;
  color: string;
  /**
   * Replays the icon's animation when it changes.
   *
   * Deliberately typed loosely: callers pass a press counter, a focus boolean
   * or a route key, and forcing those through one shape at every call site
   * would buy nothing — the hook only ever compares it for identity.
   */
  trigger?: unknown;
  /** Delay before playing, for staggering a list of icons with its cards. */
  delayMs?: number;
};
