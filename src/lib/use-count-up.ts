import { useEffect, useRef, useState } from 'react';

import { duration, useMotion } from './motion';

/**
 * Counts a number up to `target` on the JS thread.
 *
 * ## Why this is not driven by Reanimated
 *
 * The usual way to animate a number in React Native is the animated-`TextInput`
 * trick: drive the private `text` prop from the UI thread so the digits never
 * touch React. It is faster, and it is the wrong trade here — an input rendered
 * as a label announces itself to a screen reader as an empty text field, so the
 * score on the result screen becomes unreadable to exactly the users who most
 * need it read out. These are short, static-once-landed strings; a few dozen
 * re-renders of one `Text` is the cheaper side of that trade.
 *
 * ## Why `Date.now()` rather than a frame count
 *
 * Frame counting assumes 60Hz. On a 120Hz display it runs the count twice as
 * fast as the ring it is supposed to arrive with, and on a device dropping
 * frames it runs slow — either way the number and the graphic separate, which
 * is the one thing this has to avoid.
 */
export function useCountUp(
  target: number,
  { durationMs = duration.deliberate }: { durationMs?: number } = {},
): number {
  const motion = useMotion();
  const animate = !motion.reduced;
  const [value, setValue] = useState(animate ? 0 : target);

  // Held in a ref so the effect below does not have to list it as a dependency
  // and restart the count every time a parent re-renders with a new closure.
  const durationRef = useRef(durationMs);
  durationRef.current = durationMs;

  useEffect(() => {
    // Reduced motion lands on the final value immediately. Not skipped and not
    // left at zero: the number *is* the content here.
    if (!animate) {
      setValue(target);
      return;
    }

    let frame = 0;
    const started = Date.now();
    const tick = () => {
      const t = Math.min(1, (Date.now() - started) / durationRef.current);
      // easeOutCubic, matched to the easing used by the graphics these numbers
      // sit inside, so the count and the fill arrive together rather than one
      // trailing the other.
      setValue(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, animate]);

  return value;
}
