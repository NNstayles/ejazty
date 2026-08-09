/**
 * Animated icons for the seven Learn sections.
 *
 * ## Why these are drawn rather than taken from a glyph set
 *
 * The app previously used one Ionicon per section and gave all five the same
 * brand accent, on the reasoning that the glyph is what identifies a section.
 * That is right, and it is also where a static icon stops: `speedometer-outline`
 * is a picture *of* a speedometer, but a speedometer's meaning is a needle
 * moving. Drawing these as SVG buys the one thing a font glyph cannot do —
 * animating a part rather than the whole — so each icon performs the idea of
 * its section instead of merely depicting it:
 *
 * | Section    | Icon                    | What moves, and why |
 * | ---------- | ----------------------- | ------------------- |
 * | Signs      | warning triangle        | the outline draws itself, then the mark inside lands — a sign being read |
 * | Priority   | a slip road merging     | a vehicle travels the slip road and merges into the main carriageway |
 * | Rules      | a page of clauses       | the lines of text write themselves in order |
 * | Dashboard  | speedometer             | the needle sweeps and settles, exactly as it does at ignition |
 * | Violations | prohibition mark        | the bar strikes through, and an alert pulse leaves it |
 * | Mechanics  | a spanner on a fastener | the spanner turns, pivoting on the fastener it grips |
 * | First aid  | a first-aid case        | the cross draws itself, upright bar then cross bar |
 *
 * ## Constraints every icon here is built to
 *
 * - **`progress === 1` is the resting state.** See `useIconPlayback` — this is
 *   what makes reduced motion a finished icon rather than a half-drawn one.
 * - **Only numeric SVG props are animated** (`strokeDashoffset`, `opacity`,
 *   `r`, endpoint coordinates). No `d` strings are built in worklets and no
 *   transforms are animated on `G`, both of which are considerably more
 *   fragile across the two platforms than plain numbers.
 * - **One `useAnimatedProps` per animated element.** They run on the UI thread
 *   and each is cheap; sharing one across elements would mean recomputing
 *   every element's props whenever any one of them changes.
 * - **Geometry is written for a 24×24 viewBox** and scaled by `size`, so the
 *   stroke scales with the icon and stays optically consistent from the 26pt
 *   section tiles down to a 20pt inline use.
 * - **Every glyph is centred on (12, 12) and drawn to a common optical box.**
 *   See below — this is the constraint most easily lost, because each icon
 *   looks right on its own.
 *
 * ## The common optical box
 *
 * These are drawn side by side in a grid, which is the one arrangement that
 * makes inconsistent sizing obvious — and they were inconsistent. Measured in
 * viewBox units before this was fixed:
 *
 * | Icon       | box          | centre         |
 * | ---------- | ------------ | -------------- |
 * | Signs      | 16.8 × 15.0  | (12.0, 11.1)   |
 * | Priority   | 10.2 × 14.5  | (13.9, 13.75)  |
 * | Rules      | 13.5 × 18.0  | (12.25, 12.0)  |
 * | Dashboard  | 15.2 × 11.4  | (12.0, 12.3)   |
 * | Violations | 14.8 × 14.8  | (12.0, 12.0)   |
 * | Mechanics  |  9.8 ×  9.8  | ( 9.5, 14.5)   |
 * | First aid  | 17.0 × 15.6  | (12.0, 11.6)   |
 *
 * Mechanics was **1.7× smaller** than First aid and sat a full 2.5 units down
 * and to the left of centre; Priority sat 1.9 right of it. In a two-column grid
 * of tinted cards that reads as the icons having been dropped in rather than
 * drawn for it.
 *
 * Every glyph now centres on (12, 12) within a tenth of a unit. The sizes are
 * deliberately *not* all identical, because equal bounding boxes do not look
 * equal: a triangle reads smaller than its box (most of it is empty corner), a
 * diagonal object like the spanner reads larger because its true extent is the
 * diagonal, and a dial is honestly a wide, short shape. So the remaining spread
 * — 12.6 for the spanner up to 16.4 for the triangle — is optical compensation
 * rather than accident, and each is noted at its own constant.
 *
 * **If you edit any geometry here, re-check the centre.** It is the property
 * that cannot be seen in one icon and is glaring across seven.
 */

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import { useTheme } from '@/theme/theme-provider';
import { useIconPlayback, type AnimatedIconProps } from './use-playback';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const VIEW_BOX = 24;
const STROKE = 1.7;

/** Shared stroke styling, so the five icons cannot drift apart. */
const stroke = {
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: STROKE,
  fill: 'none',
} as const;

/* ------------------------------------------------------------------ signs */

// Perimeter of the triangle below, summed so the outline can be drawn on.
// Written out rather than measured: `getTotalLength` has no counterpart in
// `react-native-svg`, and the shape is fixed.
//
// 16.4 × 14.4 on centre (12, 11.8) — the widest box of the seven, and the one
// whose centre is deliberately not 12. A triangle's mass sits along its base,
// so a shape centred on its bounding box reads as hanging low; lifting it 0.2
// puts the *visual* centre on 12 where the others' geometric one already is.
const TRIANGLE = 'M12 4.6 L20.2 19.0 L3.8 19.0 Z';
const TRIANGLE_LENGTH = 2 * Math.hypot(8.2, 14.4) + 16.4;

export function SignsIcon({ size = 26, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 760 });

  // The outline draws across the first 65% of the run; the mark inside arrives
  // in the last 35%. Sequencing them rather than playing both at once is what
  // makes it read as a sign being *read* rather than as two things fading in.
  const outline = useAnimatedProps(() => ({
    strokeDashoffset:
      TRIANGLE_LENGTH *
      (1 - interpolate(progress.value, [0, 0.65], [0, 1], Extrapolation.CLAMP)),
  }));

  const mark = useAnimatedProps(() => ({
    opacity: interpolate(progress.value, [0.55, 0.9], [0, 1], Extrapolation.CLAMP),
  }));

  const dot = useAnimatedProps(() => ({
    // Overshoots to 1.35 and settles, so the mark lands rather than appears.
    r: interpolate(progress.value, [0.6, 0.85, 1], [0, 1.35, 1.05], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <AnimatedPath
        animatedProps={outline}
        d={TRIANGLE}
        stroke={color}
        strokeDasharray={TRIANGLE_LENGTH}
        {...stroke}
      />
      <AnimatedLine
        animatedProps={mark}
        stroke={color}
        x1={12}
        x2={12}
        y1={9.8}
        y2={14.0}
        {...stroke}
      />
      <AnimatedCircle animatedProps={dot} cx={12} cy={16.6} fill={color} />
    </Svg>
  );
}

/* --------------------------------------------------------------- priority */

/**
 * The slip road, as a cubic. Kept as loose control points rather than a path
 * string because the travelling vehicle has to be positioned *on* it, and
 * evaluating the curve is only possible from the points.
 */
/**
 * Where the main carriageway runs. The slip road has to merge *onto* it, so
 * `SLIP.p3.x` is this value and the two cannot drift apart.
 *
 * Left of centre rather than on it: the glyph's width is the arrow at one edge
 * and the foot of the slip road at the other, so putting the road itself on 12
 * pushed the whole icon 1.9 units right of centre — which is what it used to do.
 */
const ROAD_X = 8.5;

/** 13.4 × 14.4 on centre (12, 12). */
const SLIP = {
  p0: { x: 18.7, y: 19.2 },
  p1: { x: 18.7, y: 14.2 },
  p2: { x: ROAD_X, y: 13.2 },
  p3: { x: ROAD_X, y: 10.0 },
} as const;

const SLIP_PATH = `M${SLIP.p0.x} ${SLIP.p0.y} C${SLIP.p1.x} ${SLIP.p1.y} ${SLIP.p2.x} ${SLIP.p2.y} ${SLIP.p3.x} ${SLIP.p3.y}`;

export function PriorityIcon({
  size = 26,
  color,
  trigger,
  delayMs,
}: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 900 });

  // The vehicle joining from the slip road. `cx`/`cy` are evaluated from the
  // same cubic the road is drawn from, so the dot cannot drift off the line if
  // the geometry is ever adjusted.
  const vehicle = useAnimatedProps(() => {
    'worklet';
    const t = interpolate(progress.value, [0.15, 0.85], [0, 1], Extrapolation.CLAMP);
    const u = 1 - t;
    const cx =
      u * u * u * SLIP.p0.x +
      3 * u * u * t * SLIP.p1.x +
      3 * u * t * t * SLIP.p2.x +
      t * t * t * SLIP.p3.x;
    const cy =
      u * u * u * SLIP.p0.y +
      3 * u * u * t * SLIP.p1.y +
      3 * u * t * t * SLIP.p2.y +
      t * t * t * SLIP.p3.y;
    return {
      cx,
      cy,
      // Fades as it merges: once it is on the main carriageway it is no longer
      // the thing being illustrated, and a dot left sitting on the junction at
      // rest reads as a fault rather than as a vehicle.
      opacity: interpolate(progress.value, [0.7, 0.95], [1, 0], Extrapolation.CLAMP),
    };
  });

  const arrow = useAnimatedProps(() => ({
    opacity: interpolate(progress.value, [0.55, 0.85], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      {/* Main carriageway. */}
      <Path d={`M${ROAD_X} 19.2 V4.8`} stroke={color} {...stroke} />
      {/* Slip road, drawn lighter so the priority road is the one that reads. */}
      <Path d={SLIP_PATH} opacity={0.55} stroke={color} {...stroke} />
      <AnimatedPath
        animatedProps={arrow}
        d={`M${ROAD_X - 3.2} 8.0 L${ROAD_X} 4.8 L${ROAD_X + 3.2} 8.0`}
        stroke={color}
        {...stroke}
      />
      <AnimatedCircle animatedProps={vehicle} fill={color} r={1.9} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ rules */

/**
 * The clause lines, as `[y, from, to]`, in the order they are written.
 *
 * Sit inside the page below the folded corner, which ends at y 9.2.
 */
const CLAUSES: readonly (readonly [number, number, number])[] = [
  [12.4, 7.8, 16.0],
  [15.0, 7.8, 16.0],
  [17.6, 7.8, 13.6],
];

function Clause({
  index,
  y,
  from,
  to,
  color,
  progress,
  rtl,
}: {
  index: number;
  y: number;
  from: number;
  to: number;
  color: string;
  progress: ReturnType<typeof useIconPlayback>;
  rtl: boolean;
}) {
  const length = to - from;
  // Each line starts where the previous one is a third of the way through, so
  // the three read as one continuous act of writing rather than three events.
  const start = 0.3 + index * 0.2;

  const animated = useAnimatedProps(() => {
    const drawn = interpolate(
      progress.value,
      [start, start + 0.28],
      [0, 1],
      Extrapolation.CLAMP,
    );
    // The sign of the offset is which end the dash is anchored to, and that is
    // the end the line appears to be written *from*. Arabic and Sorani are
    // written right to left, so the anchor flips with the script — a detail
    // that is invisible until you watch it in the wrong language, where the
    // text writes itself backwards.
    return { strokeDashoffset: (rtl ? -1 : 1) * length * (1 - drawn) };
  });

  return (
    <AnimatedLine
      animatedProps={animated}
      opacity={0.75}
      stroke={color}
      strokeDasharray={length}
      x1={from}
      x2={to}
      y1={y}
      y2={y}
      {...stroke}
      strokeWidth={1.5}
    />
  );
}

export function RulesIcon({ size = 26, color, trigger, delayMs }: AnimatedIconProps) {
  const { isRTL } = useTheme();
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 900 });

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      {/* 13.4 × 15.2 on centre (11.9, 12). It was 18 tall — the only glyph
          here that ran the full height of the viewBox, which made it loom
          over its neighbours in the grid. */}
      <Path
        d="M7.2 4.4 H13.8 L18.6 9.2 V17.6 A2 2 0 0 1 16.6 19.6 H7.2 A2 2 0 0 1 5.2 17.6 V6.4 A2 2 0 0 1 7.2 4.4 Z"
        stroke={color}
        {...stroke}
      />
      <Path d="M13.8 4.4 V9.2 H18.6" stroke={color} {...stroke} />
      {CLAUSES.map(([y, from, to], index) => (
        <Clause
          color={color}
          from={from}
          index={index}
          key={y}
          progress={progress}
          rtl={isRTL}
          to={to}
          y={y}
        />
      ))}
    </Svg>
  );
}

/* -------------------------------------------------------------- dashboard */

/**
 * 15.8 × 11.85 on centre (12, 12.03).
 *
 * The arc runs 240°, so it reaches its full radius sideways but only `r/2`
 * below the hub — the box is therefore `2r` wide by `1.5r` tall and cannot be
 * made square without distorting the dial. `cy` is set so the *drawn* extent
 * centres on 12 (`cy - r/4`), which is not the same as putting the hub there.
 */
const DIAL = { cx: 12, cy: 14, r: 7.9, needle: 5.6 } as const;
/** The dial spans 240°, from 210° round to −30°. */
const DIAL_FROM = 210;
const DIAL_SWEEP = 240;

function dialPoint(angleDeg: number, radius: number) {
  'worklet';
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: DIAL.cx + radius * Math.cos(rad),
    // Negated: SVG's y axis runs down, so a positive angle has to move *up*.
    y: DIAL.cy - radius * Math.sin(rad),
  };
}

const DIAL_START = dialPoint(DIAL_FROM, DIAL.r);
const DIAL_END = dialPoint(DIAL_FROM - DIAL_SWEEP, DIAL.r);

export function DashboardIcon({
  size = 26,
  color,
  trigger,
  delayMs,
}: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 950 });

  const needle = useAnimatedProps(() => {
    'worklet';
    // Sweeps to 85% of the dial and falls back to 65%. This is the ignition
    // self-test every instrument cluster performs, and it is the reason the
    // icon reads as an instrument rather than as a gauge illustration — a
    // needle that eases straight to its resting value looks like a slider.
    const fraction = interpolate(
      progress.value,
      [0, 0.62, 1],
      [0, 0.85, 0.65],
      Extrapolation.CLAMP,
    );
    const tip = dialPoint(DIAL_FROM - DIAL_SWEEP * fraction, DIAL.needle);
    return { x2: tip.x, y2: tip.y };
  });

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <Path
        d={`M${DIAL_START.x.toFixed(2)} ${DIAL_START.y.toFixed(2)} A${DIAL.r} ${DIAL.r} 0 1 1 ${DIAL_END.x.toFixed(2)} ${DIAL_END.y.toFixed(2)}`}
        stroke={color}
        {...stroke}
      />
      <AnimatedLine
        animatedProps={needle}
        stroke={color}
        x1={DIAL.cx}
        y1={DIAL.cy}
        {...stroke}
      />
      <Circle cx={DIAL.cx} cy={DIAL.cy} fill={color} r={1.5} />
    </Svg>
  );
}

/* ------------------------------------------------------------- violations */

/** 15.2 × 15.2 on centre (12, 12) — the reference the others were sized to. */
const BAN_RADIUS = 7.6;
// The strike-through, at 45° across the prohibition circle.
const BAN_INSET = BAN_RADIUS * Math.SQRT1_2;
const BAN_LENGTH = 2 * BAN_RADIUS;

export function ViolationsIcon({
  size = 26,
  color,
  trigger,
  delayMs,
}: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 820 });

  const bar = useAnimatedProps(() => ({
    strokeDashoffset:
      BAN_LENGTH *
      (1 - interpolate(progress.value, [0.25, 0.7], [0, 1], Extrapolation.CLAMP)),
  }));

  // A single alert pulse leaving the mark, once the bar has struck through.
  // One ring rather than a repeating pair: this sits in a list beside four
  // other icons, and a sustained pulse there is an attention claim the section
  // has not earned.
  const pulse = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0.5, 1], [BAN_RADIUS, BAN_RADIUS + 4], Extrapolation.CLAMP),
    opacity: interpolate(progress.value, [0.5, 1], [0.45, 0], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <AnimatedCircle
        animatedProps={pulse}
        cx={12}
        cy={12}
        stroke={color}
        {...stroke}
        strokeWidth={1.4}
      />
      <Circle cx={12} cy={12} r={BAN_RADIUS} stroke={color} {...stroke} />
      <AnimatedLine
        animatedProps={bar}
        stroke={color}
        strokeDasharray={BAN_LENGTH}
        x1={12 - BAN_INSET}
        x2={12 + BAN_INSET}
        y1={12 - BAN_INSET}
        y2={12 + BAN_INSET}
        {...stroke}
      />
    </Svg>
  );
}

/* -------------------------------------------------------------- mechanics */

/**
 * The spanner's jaw: a C of material with a gap facing up and to the right, so
 * the handle can run out of the back of it toward the bottom-left.
 *
 * ## The jaw is off-centre, and the pivot follows it
 *
 * This used to sit on the viewBox centre, because the glyph rotates as a `View`
 * transform and a bare `transform` pivots about the view's own centre — putting
 * the jaw there was the only way to turn the spanner about the fastener it
 * grips rather than swing it bodily through an arc.
 *
 * That solved the rotation and broke the layout. A spanner is one-sided: jaw at
 * one end, handle running out of the other. Pinning the jaw to the centre put
 * the whole *glyph* at 9.8 × 9.8 on centre (9.5, 14.5) — the smallest of the
 * seven by a wide margin and two and a half units adrift, in a grid where it
 * sits directly beside them.
 *
 * `transformOrigin` is what lets both be true: the geometry is laid out so the
 * glyph centres on (12, 12), and the pivot is moved to wherever the jaw
 * actually is. If `transformOrigin` were ever unsupported the fallback is the
 * view centre, which is between the jaw and the handle — the spanner would rock
 * slightly rather than turn about its jaw, which is a degraded animation rather
 * than a broken icon.
 *
 * 12.6 × 12.6 on centre (12, 12). The smallest box here on purpose: the spanner
 * lies on the diagonal, so its true extent is 12.6 × √2 ≈ 17.8 — sized to match
 * the others it would read as considerably the largest.
 */
const JAW = { cx: 15.3, cy: 8.7, r: 3 } as const;

/**
 * The jaw's position as a percentage of the viewBox, for `transformOrigin`.
 * Derived rather than written out, so moving `JAW` moves the pivot with it.
 */
const JAW_ORIGIN = `${(JAW.cx / VIEW_BOX) * 100}% ${(JAW.cy / VIEW_BOX) * 100}%`;
/** Half the gap in the jaw, in degrees, measured off the opening direction. */
const JAW_GAP = 55;
/** Screen-space angle of the opening: up and to the right. */
const JAW_FACING = -45;

function jawPoint(angleDeg: number) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    // Screen space, so y is *not* negated here — unlike `dialPoint` above,
    // which works in the mathematical convention and flips at the end.
    x: JAW.cx + JAW.r * Math.cos(rad),
    y: JAW.cy + JAW.r * Math.sin(rad),
  };
}

const JAW_FROM = jawPoint(JAW_FACING - JAW_GAP);
const JAW_TO = jawPoint(JAW_FACING + JAW_GAP);
/** The back of the jaw, opposite the opening, where the handle joins it. */
const JAW_BACK = jawPoint(JAW_FACING + 180);

export function MechanicsIcon({
  size = 26,
  color,
  trigger,
  delayMs,
}: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 880 });

  const style = useAnimatedStyle(() => ({
    // Pivot on the jaw, which is no longer the view's centre. See `JAW`.
    transformOrigin: JAW_ORIGIN,
    transform: [
      {
        // Swings back, turns through, and overshoots before settling square —
        // the arc a spanner actually travels when a fastener is tightened. It
        // rests at 0°, which is what `progress === 1` has to mean for the
        // reduced-motion path to leave a finished icon rather than a crooked
        // one.
        rotate: `${interpolate(
          progress.value,
          [0, 0.55, 1],
          [-34, 9, 0],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  return (
    <Animated.View style={style}>
      <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
        {/*
          Sweep flag 0 and large-arc 1: the material has to take the long way
          round, through the bottom-left, so the gap is left facing the
          direction `JAW_FACING` names.
        */}
        <Path
          d={`M${JAW_FROM.x.toFixed(2)} ${JAW_FROM.y.toFixed(2)} A${JAW.r} ${JAW.r} 0 1 0 ${JAW_TO.x.toFixed(2)} ${JAW_TO.y.toFixed(2)}`}
          stroke={color}
          {...stroke}
        />
        {/* The handle, thicker than the jaw so it reads as something gripped.
            Its free end is the glyph's bottom-left corner, and together with
            the jaw's top-right it is what puts the box on centre. */}
        <Line
          stroke={color}
          x1={5.7}
          x2={JAW_BACK.x}
          y1={18.3}
          y2={JAW_BACK.y}
          {...stroke}
          strokeWidth={2.2}
        />
      </Svg>
    </Animated.View>
  );
}

/* --------------------------------------------------------------- first aid */

/**
 * The medical cross. Both bars are the same length, so one constant feeds both
 * `strokeDasharray` values and the two cannot drift into drawing at different
 * rates — which reads as the cross being assembled crookedly.
 */
const CROSS_LENGTH = 6;
/** Centred on the case's own middle (12, 13.3), not on the viewBox's. */
const CROSS_UPRIGHT = { x: 12, y1: 10.3, y2: 16.3 } as const;
const CROSS_BAR = { y: 13.3, x1: 9, x2: 15 } as const;

export function FirstAidIcon({
  size = 26,
  color,
  trigger,
  delayMs,
}: AnimatedIconProps) {
  const { isRTL } = useTheme();
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 860 });

  // The case is static and the cross is what moves, on the same reasoning as
  // `RulesIcon`: the container is the noun, the mark inside it is the idea.
  const upright = useAnimatedProps(() => ({
    strokeDashoffset:
      CROSS_LENGTH *
      (1 - interpolate(progress.value, [0.15, 0.55], [0, 1], Extrapolation.CLAMP)),
  }));

  const bar = useAnimatedProps(() => ({
    // Anchored to the reading-start end, so in Arabic and Sorani the bar is
    // struck from the right. Same rule as `Clause` above, and invisible until
    // it is watched in the wrong direction.
    strokeDashoffset:
      (isRTL ? -1 : 1) *
      CROSS_LENGTH *
      (1 - interpolate(progress.value, [0.45, 0.85], [0, 1], Extrapolation.CLAMP)),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      {/* The carrying handle, above the case. 15.4 × 15.6 on centre (12, 12)
          including the handle — the case alone is not the glyph. */}
      <Path
        d="M9.2 6.8 V5.6 A1.4 1.4 0 0 1 10.6 4.2 H13.4 A1.4 1.4 0 0 1 14.8 5.6 V6.8"
        stroke={color}
        {...stroke}
      />
      <Rect
        height={13}
        rx={2.4}
        stroke={color}
        width={15.4}
        x={4.3}
        y={6.8}
        {...stroke}
      />
      <AnimatedLine
        animatedProps={upright}
        stroke={color}
        strokeDasharray={CROSS_LENGTH}
        x1={CROSS_UPRIGHT.x}
        x2={CROSS_UPRIGHT.x}
        y1={CROSS_UPRIGHT.y1}
        y2={CROSS_UPRIGHT.y2}
        {...stroke}
        strokeWidth={2}
      />
      <AnimatedLine
        animatedProps={bar}
        stroke={color}
        strokeDasharray={CROSS_LENGTH}
        x1={CROSS_BAR.x1}
        x2={CROSS_BAR.x2}
        y1={CROSS_BAR.y}
        y2={CROSS_BAR.y}
        {...stroke}
        strokeWidth={2}
      />
    </Svg>
  );
}
