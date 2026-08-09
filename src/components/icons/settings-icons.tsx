/**
 * Animated icons for the settings groups.
 *
 * Same four rules as `section-icons.tsx` and `exam-icons.tsx` — `progress === 1`
 * is the resting state, only numeric props are animated, lengths are written out
 * and rounded up, nothing loops. See the header of either file for why.
 *
 * ## Not every glyph in settings is here, and that is the line
 *
 * These are the icons that *head a card*: one per group, at 20pt, next to a
 * heading, and they play when the screen appears. The small inline glyphs — the
 * tick on a selected option, the chevron on a row, the flame on a streak pill —
 * stay as Ionicons. Animating a 13pt glyph inside a chip does not read as alive,
 * it reads as the screen twitching, and there are a dozen of them on this
 * screen. The rule is: if it labels something, it moves; if it decorates
 * something, it does not.
 */

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path } from 'react-native-svg';

import { useTheme } from '@/theme/theme-provider';
import { useIconPlayback, type AnimatedIconProps } from './use-playback';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);
const AnimatedLine = Animated.createAnimatedComponent(Line);
const AnimatedPath = Animated.createAnimatedComponent(Path);

const VIEW_BOX = 24;

const stroke = {
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.7,
  fill: 'none',
} as const;

/* --------------------------------------------------------------- language */

/** The globe's meridians, as `[d, length]`, drawn outward from the centre. */
const MERIDIANS: readonly (readonly [string, number])[] = [
  ['M12 4.2 C15 7.4 15 16.6 12 19.8', 16],
  ['M12 4.2 C9 7.4 9 16.6 12 19.8', 16],
];

export function LanguageIcon({
  size = 22,
  color,
  trigger,
  delayMs,
}: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 900 });

  // The equator sweeps round first, then the meridians draw down it: a globe
  // being turned rather than a globe being drawn.
  const equator = useAnimatedProps(() => ({
    opacity: interpolate(progress.value, [0.15, 0.45], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <Circle cx={12} cy={12} r={7.8} stroke={color} {...stroke} />
      <AnimatedLine
        animatedProps={equator}
        stroke={color}
        x1={4.2}
        x2={19.8}
        y1={12}
        y2={12}
        {...stroke}
      />
      {MERIDIANS.map(([d, length], index) => (
        <Meridian
          color={color}
          d={d}
          index={index}
          key={d}
          length={length}
          progress={progress}
        />
      ))}
    </Svg>
  );
}

function Meridian({
  d,
  length,
  index,
  color,
  progress,
}: {
  d: string;
  length: number;
  index: number;
  color: string;
  progress: ReturnType<typeof useIconPlayback>;
}) {
  const start = 0.35 + index * 0.2;
  const animated = useAnimatedProps(() => ({
    strokeDashoffset:
      length *
      (1 - interpolate(progress.value, [start, start + 0.4], [0, 1], Extrapolation.CLAMP)),
  }));

  return (
    <AnimatedPath
      animatedProps={animated}
      d={d}
      opacity={0.75}
      stroke={color}
      strokeDasharray={length}
      {...stroke}
      strokeWidth={1.4}
    />
  );
}

/* ------------------------------------------------------------------ theme */

/**
 * A sun whose rays extend, which is also a moon when the scheme is dark.
 *
 * The glyph tracks the *active* scheme rather than being a fixed sun, because
 * the row it labels is the one that changes the scheme — an icon showing the
 * thing you are already looking at is the honest reading, and it is a second
 * confirmation that the setting took.
 */
const RAYS = Array.from({ length: 8 }, (_, i) => {
  const rad = (i * 45 * Math.PI) / 180;
  return {
    key: i,
    cos: Math.cos(rad),
    sin: Math.sin(rad),
  };
});

export function ThemeIcon({ size = 22, color, trigger, delayMs }: AnimatedIconProps) {
  const { isDark } = useTheme();
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 780 });

  const core = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0, 0.6, 1], [1.6, 5.4, 4.6], Extrapolation.CLAMP),
  }));

  if (isDark) {
    return (
      <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
        <MoonPath color={color} progress={progress} />
      </Svg>
    );
  }

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      {RAYS.map((ray, index) => (
        <Ray color={color} index={index} key={ray.key} progress={progress} ray={ray} />
      ))}
      <AnimatedCircle animatedProps={core} cx={12} cy={12} stroke={color} {...stroke} />
    </Svg>
  );
}

function Ray({
  ray,
  index,
  color,
  progress,
}: {
  ray: { cos: number; sin: number };
  index: number;
  color: string;
  progress: ReturnType<typeof useIconPlayback>;
}) {
  const start = 0.35 + index * 0.035;

  const animated = useAnimatedProps(() => {
    'worklet';
    // Each ray extends outward from the sun's edge, one after the next.
    const extend = interpolate(
      progress.value,
      [start, start + 0.3],
      [0, 1],
      Extrapolation.CLAMP,
    );
    const from = 6.8;
    const to = from + 2.6 * extend;
    return {
      x1: 12 + from * ray.cos,
      y1: 12 - from * ray.sin,
      x2: 12 + to * ray.cos,
      y2: 12 - to * ray.sin,
    };
  });

  return <AnimatedLine animatedProps={animated} stroke={color} {...stroke} strokeWidth={1.6} />;
}

const MOON = 'M20 14.4 A8.4 8.4 0 1 1 9.8 4.1 A6.6 6.6 0 0 0 20 14.4 Z';
/** The crescent's outline: a major arc plus a minor one, summed and rounded up. */
const MOON_LENGTH = 44;

function MoonPath({
  color,
  progress,
}: {
  color: string;
  progress: ReturnType<typeof useIconPlayback>;
}) {
  const animated = useAnimatedProps(() => ({
    strokeDashoffset: MOON_LENGTH * (1 - progress.value),
  }));

  return (
    <AnimatedPath
      animatedProps={animated}
      d={MOON}
      stroke={color}
      strokeDasharray={MOON_LENGTH}
      {...stroke}
    />
  );
}

/* ---------------------------------------------------------- notifications */

export function BellIcon({ size = 22, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 900 });

  // A damped swing about the bell's mount rather than a rotation about the
  // glyph's centre, which is why the pivot is set explicitly: a bell rotating
  // about its middle looks like it is tumbling.
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(
          progress.value,
          [0, 0.28, 0.52, 0.74, 1],
          [0, 13, -9, 4, 0],
          Extrapolation.CLAMP,
        )}deg`,
      },
    ],
  }));

  return (
    <Animated.View style={style}>
      <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
        <Path
          d="M6.4 17.2 A1 1 0 0 1 5.9 15.4 C6.8 14.7 7.2 13.8 7.2 12.6 V10.6 A4.8 4.8 0 0 1 16.8 10.6 V12.6 C16.8 13.8 17.2 14.7 18.1 15.4 A1 1 0 0 1 17.6 17.2 Z"
          stroke={color}
          {...stroke}
        />
        <Path d="M10.2 20 A2 2 0 0 0 13.8 20" stroke={color} {...stroke} />
        <Path d="M12 4.2 V5.8" stroke={color} {...stroke} />
      </Svg>
    </Animated.View>
  );
}

/* ------------------------------------------------------------------- goal */

export function TargetIcon({ size = 22, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 860 });

  // The rings are static and the shot is what moves: an arrow flying in along
  // its own axis and landing dead centre.
  const arrow = useAnimatedProps(() => {
    'worklet';
    const travel = interpolate(progress.value, [0.2, 0.8], [0, 1], Extrapolation.CLAMP);
    // Comes in from the upper right, ending at the bullseye.
    const from = { x: 21.5, y: 2.5 };
    const to = { x: 12, y: 12 };
    return {
      x1: from.x - (from.x - to.x) * travel * 0.55,
      y1: from.y + (to.y - from.y) * travel * 0.55,
      x2: from.x - (from.x - to.x) * travel,
      y2: from.y + (to.y - from.y) * travel,
      opacity: interpolate(progress.value, [0.2, 0.3], [0, 1], Extrapolation.CLAMP),
    };
  });

  const hit = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0.75, 1], [0, 1.7], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <Circle cx={12} cy={12} r={8.2} stroke={color} {...stroke} />
      <Circle cx={12} cy={12} opacity={0.7} r={5} stroke={color} {...stroke} />
      <AnimatedLine animatedProps={arrow} stroke={color} {...stroke} strokeWidth={1.9} />
      <AnimatedCircle animatedProps={hit} cx={12} cy={12} fill={color} />
    </Svg>
  );
}

/* ---------------------------------------------------------------- haptics */

const PHONE =
  'M11 4.4 H13 A1.6 1.6 0 0 1 14.6 6 V18 A1.6 1.6 0 0 1 13 19.6 H11 A1.6 1.6 0 0 1 9.4 18 V6 A1.6 1.6 0 0 1 11 4.4 Z';

/**
 * The waves, as `[d, length, ring]`. Mirrored pairs, inner ring first.
 *
 * Lengths are `r · 2·asin(chord / 2r)`, written out because `getTotalLength`
 * has no counterpart in `react-native-svg`.
 */
const WAVES: readonly (readonly [string, number, number])[] = [
  ['M16.6 9.6 A4.2 4.2 0 0 1 16.6 14.4', 5.2, 0],
  ['M7.4 9.6 A4.2 4.2 0 0 0 7.4 14.4', 5.2, 0],
  ['M19.1 7.6 A7.2 7.2 0 0 1 19.1 16.4', 9.6, 1],
  ['M4.9 7.6 A7.2 7.2 0 0 0 4.9 16.4', 9.6, 1],
];

export function VibrationIcon({ size = 22, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 900 });

  /*
    A short buzz that damps out, which is the thing the setting actually does —
    a phone that simply sat there with waves beside it would be a picture of a
    phone. It ends at exactly zero, so `progress === 1` is the centred resting
    glyph rather than the end of a flourish.

    `translateX` is a physical transform and Yoga never mirrors one, but this
    oscillation is symmetric about zero, so unlike the tab bar's travelling
    circle there is nothing here for RTL to get wrong.
  */
  const style = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: interpolate(
          progress.value,
          [0, 0.16, 0.32, 0.48, 0.64, 0.8, 1],
          [0, 1.1, -1.1, 0.7, -0.6, 0.25, 0],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  return (
    <Animated.View style={style}>
      <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
        <Path d={PHONE} stroke={color} {...stroke} />
        {WAVES.map(([d, length, ring]) => (
          <Wave
            color={color}
            d={d}
            key={d}
            length={length}
            progress={progress}
            ring={ring}
          />
        ))}
      </Svg>
    </Animated.View>
  );
}

function Wave({
  d,
  length,
  ring,
  color,
  progress,
}: {
  d: string;
  length: number;
  ring: number;
  color: string;
  progress: ReturnType<typeof useIconPlayback>;
}) {
  // Outward: the inner pair draws first, then the outer, so the buzz reads as
  // travelling away from the phone rather than as four arcs appearing at once.
  const start = 0.3 + ring * 0.22;
  const animated = useAnimatedProps(() => ({
    strokeDashoffset:
      length *
      (1 - interpolate(progress.value, [start, start + 0.34], [0, 1], Extrapolation.CLAMP)),
  }));

  return (
    <AnimatedPath
      animatedProps={animated}
      d={d}
      opacity={ring === 0 ? 0.85 : 0.55}
      stroke={color}
      strokeDasharray={length}
      {...stroke}
      strokeWidth={1.5}
    />
  );
}

/* ------------------------------------------------------------------ about */

const INFO_STEM_LENGTH = 5.4;

export function InfoIcon({ size = 22, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 760 });

  const stem = useAnimatedProps(() => ({
    strokeDashoffset:
      INFO_STEM_LENGTH *
      (1 - interpolate(progress.value, [0.3, 0.75], [0, 1], Extrapolation.CLAMP)),
  }));

  const dot = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0.62, 0.86, 1], [0, 1.5, 1.15], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <Circle cx={12} cy={12} r={8.2} stroke={color} {...stroke} />
      <AnimatedLine
        animatedProps={stem}
        stroke={color}
        strokeDasharray={INFO_STEM_LENGTH}
        x1={12}
        x2={12}
        y1={16.2}
        y2={10.8}
        {...stroke}
        strokeWidth={1.9}
      />
      <AnimatedCircle animatedProps={dot} cx={12} cy={8.1} fill={color} />
    </Svg>
  );
}

/* ------------------------------------------------------------------ reset */

export function ShieldIcon({ size = 22, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 840 });

  const tick = useAnimatedProps(() => ({
    strokeDashoffset:
      TICK_LENGTH *
      (1 - interpolate(progress.value, [0.35, 0.8], [0, 1], Extrapolation.CLAMP)),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <Path
        d="M12 3.2 L19 6 V12 C19 16.4 16 19.6 12 20.8 C8 19.6 5 16.4 5 12 V6 Z"
        stroke={color}
        {...stroke}
      />
      <AnimatedPath
        animatedProps={tick}
        d={TICK}
        stroke={color}
        strokeDasharray={TICK_LENGTH}
        {...stroke}
        strokeWidth={1.9}
      />
    </Svg>
  );
}

const TICK = 'M9 12.2 L11.2 14.4 L15.2 9.8';
const TICK_LENGTH = Math.hypot(2.2, 2.2) + Math.hypot(4, 4.6) + 0.5;
