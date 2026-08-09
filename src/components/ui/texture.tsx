import { memo, useId } from 'react';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Defs, Line, Path, Pattern, Rect } from 'react-native-svg';

import { useTheme } from '@/theme/theme-provider';

export type TextureVariant = 'grain' | 'dots' | 'grid' | 'hatch';

/** Pattern cell size, in points, for the regular variants. */
const CELL = 18;

/**
 * Cell size for `grain`, in points.
 *
 * Much larger than `CELL` because the whole point of the variant is that the
 * repeat is not findable. A tile has to be big enough to hold marks at several
 * sizes and off the grid lines; at 18pt there is nowhere for them to go.
 */
const GRAIN_CELL = 48;

/**
 * The marks in one `grain` tile: `[cx, cy, r]`, in points.
 *
 * A jittered three-by-three lattice with the radii varied, rather than dots on
 * a grid. That distinction is the variant: a regular field of identical dots is
 * a *halftone*, and the eye finds the rows in it even at 7% — which is the one
 * thing a background finish must not do, because a pattern you can name is
 * decoration rather than surface. Varying position and size gives the same
 * coverage with no line to find.
 *
 * Every mark sits at least its own radius inside the cell, so nothing is
 * clipped at a tile edge and the repeat leaves no seam.
 *
 * Written out rather than generated from a seeded random, so what ships is what
 * was looked at — a generator would re-roll the texture on any change to how it
 * is called.
 */
const GRAIN: readonly (readonly [number, number, number])[] = [
  [4.5, 6.2, 1.0],
  [20.1, 3.4, 0.7],
  [36.8, 8.9, 1.25],
  [11.3, 19.6, 1.35],
  [28.4, 16.2, 0.75],
  [43.2, 22.7, 0.95],
  [6.8, 35.1, 0.8],
  [23.9, 39.4, 1.2],
  [38.5, 33.6, 0.7],
  [15.6, 29.0, 0.55],
  [32.7, 45.1, 0.6],
  [45.4, 41.8, 0.5],
];

/**
 * How strongly the texture reads, per scheme.
 *
 * Dark mode gets more because the effect is a *lightening* of the surface in
 * both schemes, and a light mark on a near-black background at light-mode
 * opacity is invisible. These numbers are low enough that the texture should
 * never be describable as a pattern when you look at the screen — if you can
 * name the shape without leaning in, it is too strong.
 */
const OPACITY = { light: 0.07, dark: 0.09 } as const;

/**
 * A near-invisible pattern laid over a surface.
 *
 * ## What it is for
 *
 * Flat fills are the thing that makes an app look like a prototype: a large
 * area of one exact colour has no surface, so it reads as absence rather than
 * as material. A texture at the opacity used here does not register as a
 * pattern — it registers as the background having a *finish*, the same way
 * paper does. It is the cheapest single change that separates a screen that
 * looks designed from one that looks defaulted.
 *
 * ## Why SVG rather than an image
 *
 * A tiled PNG would need one asset per scheme, would be resolution-dependent,
 * and would ship bytes. A `Pattern` is resolution-independent, takes its colour
 * from the live theme (so it inverts with the scheme for free) and costs
 * nothing in the bundle.
 *
 * ## `grain` is the default, and the other three are not interchangeable with it
 *
 * `grain` is the screen finish: marks at four radii on a jittered lattice in a
 * 48pt tile, so the repeat cannot be found. `dots` is a plain 18pt halftone and
 * is what the tab bar wants — a small, busy surface where an irregular field
 * would read as dirt rather than as texture. `grid` and `hatch` are there for
 * surfaces that should look ruled.
 *
 * ## The `id` is derived from `useId`, and it has to be
 *
 * SVG pattern references are resolved by document id. Two `Texture`s mounted at
 * once with a hardcoded id — a screen background and the tab bar, which is the
 * normal case — would collide, and one would silently render the other's
 * pattern. `useId` is per-instance, but its output contains colons, which are
 * not valid in a `url(#…)` reference, so it is stripped down to word
 * characters before use.
 *
 * ## Memoised, because nothing it draws ever changes
 *
 * The output is a pure function of the variant, the mark colour and the scheme,
 * none of which move while a screen is open — but this sits inside `Screen`,
 * which re-renders whenever anything above it does. Without the memo an SVG
 * surface with its own `Defs` was being reconciled on every one of those, on
 * every mounted screen at once, to produce the identical tree. It is a plain
 * shallow compare: every prop here is a primitive.
 */
export const Texture = memo(function Texture({
  variant = 'grain',
  style,
  /** Multiplies the scheme's base opacity, for a surface that needs less. */
  intensity = 1,
  /**
   * The mark's colour. Defaults to `colors.primary` — the brand violet — which
   * is what ties the finish to the rest of the palette rather than leaving it
   * as neutral grain.
   *
   * It used to default to `colors.text`, a near-black violet. That reads as
   * grey at 5–7% opacity, so the one surface treatment covering every screen in
   * the app was the one element not participating in the palette. `primary`
   * still inverts with the scheme for free — `brand[600]` in light, `brand[400]`
   * in dark — so a mark that darkens a near-white ground and one that lightens
   * a near-black one both stay on the same hue.
   *
   * It has to be overridable because not every surface is themed. The floating
   * tab bar is near-black in **both** schemes, so on it even the light-mode
   * violet would paint a dark mark onto a dark bar and render close to nothing
   * — a texture that silently does nothing is worse than none, because it looks
   * like it is working in dark mode.
   */
  color,
}: {
  variant?: TextureVariant;
  style?: StyleProp<ViewStyle>;
  intensity?: number;
  color?: string;
}) {
  const { colors, scheme } = useTheme();
  const mark = color ?? colors.primary;
  const id = `tex${useId().replace(/[^a-zA-Z0-9]/g, '')}${variant}`;
  const cell = variant === 'grain' ? GRAIN_CELL : CELL;

  return (
    <Svg
      height="100%"
      pointerEvents="none"
      style={[StyleSheet.absoluteFill, style]}
      width="100%">
      <Defs>
        <Pattern
          height={cell}
          id={id}
          patternUnits="userSpaceOnUse"
          width={cell}>
          {/*
            Mapped rather than wrapped in a fragment. `react-native-svg` maps
            children onto native nodes and a fragment is not one, so nesting a
            fragment inside `Pattern` is a reliable way to have children
            silently dropped on a single platform — the same reason the `grid`
            variant below is one `Path` with two subpaths rather than two
            `Line`s. An array of elements is not a fragment and is fine.
          */}
          {variant === 'grain'
            ? GRAIN.map(([cx, cy, r]) => (
                <Circle
                  cx={cx}
                  cy={cy}
                  fill={mark}
                  key={`${cx}-${cy}`}
                  r={r}
                />
              ))
            : null}
          {variant === 'dots' ? (
            <Circle cx={CELL / 2} cy={CELL / 2} fill={mark} r={1} />
          ) : null}
          {variant === 'grid' ? (
            // One `Path` with two subpaths rather than two `Line`s wrapped in a
            // fragment. `react-native-svg` maps children onto native nodes, and
            // a fragment is not a node — nesting one inside `Pattern` is a
            // reliable way to have children silently dropped on one platform.
            <Path
              d={`M0 0 H${CELL} M0 0 V${CELL}`}
              stroke={mark}
              strokeWidth={0.5}
            />
          ) : null}
          {variant === 'hatch' ? (
            // Drawn corner to corner so the stroke tiles seamlessly: any other
            // angle leaves the line ending mid-cell and the seams show up as a
            // visible grid, which is the one thing a hatch must not look like.
            <Line
              stroke={mark}
              strokeWidth={0.6}
              x1={0}
              x2={CELL}
              y1={CELL}
              y2={0}
            />
          ) : null}
        </Pattern>
      </Defs>
      <Rect
        fill={`url(#${id})`}
        height="100%"
        opacity={OPACITY[scheme] * intensity}
        width="100%"
      />
    </Svg>
  );
});
