import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import type { GradientTokens } from '@/theme/tokens';

/**
 * Named gradient axes.
 *
 * `diagonal` is the default because a two-stop gradient run corner to corner
 * reads as a lit surface, where the same two stops run straight down read as a
 * deliberate stripe — the difference between depth and decoration.
 */
export type GradientDirection = 'vertical' | 'horizontal' | 'diagonal';

type Point = { x: number; y: number };

const AXES: Record<GradientDirection, { start: Point; end: Point }> = {
  vertical: { start: { x: 0, y: 0 }, end: { x: 0, y: 1 } },
  horizontal: { start: { x: 0, y: 0 }, end: { x: 1, y: 0 } },
  diagonal: { start: { x: 0, y: 0 }, end: { x: 1, y: 1 } },
};

/**
 * A gradient surface drawn from the theme's gradient tokens.
 *
 * ## Why this wraps `LinearGradient` rather than being used directly
 *
 * Two things every call site would otherwise have to remember, and would
 * forget in slightly different ways:
 *
 * **The stops come from the theme.** The dark ramp is not the light one
 * darkened (see `gradients` in `theme/tokens.ts`), so a screen reaching for
 * `brand[600]` inline is correct in one scheme and wrong in the other.
 *
 * **The axis mirrors in RTL.** A gradient carries emphasis, and emphasis
 * belongs where the text starts. Left-to-right, `diagonal` puts its first stop
 * at the top-left, under the first word; in Arabic the first word is at the
 * top-*right*, and an unmirrored gradient leaves the heading sitting on the
 * dark end of the ramp with the light end trailing off into empty margin. This
 * is the same class of bug as `Chevron`: the layout mirrors, so anything that
 * points has to mirror with it.
 *
 * `vertical` is deliberately exempt — it has no horizontal component to mirror,
 * and flipping it would be a no-op that only looked like a decision.
 */
export function Gradient({
  tone = 'brand',
  direction = 'diagonal',
  style,
  children,
  pointerEvents,
}: {
  tone?: keyof GradientTokens;
  direction?: GradientDirection;
  style?: StyleProp<ViewStyle>;
  children?: ReactNode;
  pointerEvents?: 'auto' | 'none';
}) {
  const { gradients, isRTL } = useTheme();
  const axis = AXES[direction];

  const mirror = isRTL && direction !== 'vertical';
  const start = mirror ? { x: 1 - axis.start.x, y: axis.start.y } : axis.start;
  const end = mirror ? { x: 1 - axis.end.x, y: axis.end.y } : axis.end;

  return (
    <LinearGradient
      colors={
        // `readonly [string, string]` from the tokens against the mutable
        // tuple the library asks for. The spread copies rather than casting,
        // so the token arrays stay immutable at their own type.
        [...gradients[tone]] as [string, string, ...string[]]
      }
      end={end}
      pointerEvents={pointerEvents}
      start={start}
      style={style}>
      {children}
    </LinearGradient>
  );
}
