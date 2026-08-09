/**
 * Animated icons for the four exam formats.
 *
 * Built to the same four rules as `section-icons.tsx`, and they are repeated
 * here because they are what makes this directory safe to extend:
 *
 * - **`progress === 1` is the resting state**, not the end of a flourish. This
 *   is what makes reduced motion a one-line answer (start at 1, never move) and
 *   it is the classic bug when it is backwards — the icon plays beautifully and
 *   then rests half-drawn.
 * - **Only numeric SVG props are animated** (`strokeDashoffset`, `opacity`, `r`,
 *   endpoint coordinates). No `d` strings built in worklets, no animated
 *   transforms on `G`.
 * - **Path lengths are written out, not measured.** `getTotalLength` has no
 *   counterpart in `react-native-svg`. Every constant below is summed from the
 *   geometry and deliberately rounded *up*: a `strokeDasharray` longer than the
 *   path it draws finishes the stroke slightly early, which is invisible, while
 *   one that is too short leaves the dash pattern repeating and the path renders
 *   with permanent gaps in it.
 * - **These play once, on mount and on press.** Nothing here loops.
 *
 * Each icon performs the idea of its format rather than depicting it: the bolt
 * strikes, the clock's hand sweeps out the time it gives you, the trophy's star
 * lands, and the open format's lemniscate draws itself without ever closing.
 */

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path } from 'react-native-svg';

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

/* ------------------------------------------------------------------ quick */

const BOLT = 'M13.5 3 L6.5 13.4 H11.2 L10.5 21 L17.5 10.6 H12.8 Z';
/** Summed from the six segments above (~49.7), rounded up. */
const BOLT_LENGTH = 51;

export function QuickIcon({ size = 24, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 720 });

  const outline = useAnimatedProps(() => ({
    strokeDashoffset:
      BOLT_LENGTH *
      (1 - interpolate(progress.value, [0, 0.72], [0, 1], Extrapolation.CLAMP)),
  }));

  // A single spark leaving the tip once the bolt has struck. It is gone by
  // `progress === 1`, so the resting icon is the bolt alone — a spark left
  // sitting on the glyph reads as a stray dot rather than as energy.
  const spark = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0.6, 1], [1.2, 4.4], Extrapolation.CLAMP),
    opacity: interpolate(progress.value, [0.6, 1], [0.5, 0], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <AnimatedCircle
        animatedProps={spark}
        cx={10.8}
        cy={17}
        stroke={color}
        {...stroke}
        strokeWidth={1.3}
      />
      <AnimatedPath
        animatedProps={outline}
        d={BOLT}
        stroke={color}
        strokeDasharray={BOLT_LENGTH}
        {...stroke}
      />
    </Svg>
  );
}

/* ----------------------------------------------------------------- medium */

const CLOCK = { cx: 12, cy: 13.6, r: 7.5, hand: 4.6 } as const;

/**
 * A point on the clock face, twelve o'clock at zero, running clockwise.
 *
 * Screen space rather than the mathematical convention — a clock's hand moves
 * *with* the y axis on the right-hand side, so nothing is negated here. Compare
 * `dialPoint` in `section-icons.tsx`, which works the other way round and flips
 * at the end; the two exist side by side and getting them confused sends a
 * needle backwards.
 */
function clockPoint(minutes: number, radius: number) {
  'worklet';
  const rad = ((minutes / 60) * 360 - 90) * (Math.PI / 180);
  return {
    x: CLOCK.cx + radius * Math.cos(rad),
    y: CLOCK.cy + radius * Math.sin(rad),
  };
}

export function MediumIcon({ size = 24, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 880 });

  const hand = useAnimatedProps(() => {
    'worklet';
    // Sweeps a quarter of the face and stops. It rests at 15 minutes rather
    // than back at twelve, because a hand resting at twelve is a clock that has
    // stopped — the format's whole idea is that it is *running*.
    const minutes = interpolate(progress.value, [0.1, 1], [0, 15], Extrapolation.CLAMP);
    const tip = clockPoint(minutes, CLOCK.hand);
    return { x2: tip.x, y2: tip.y };
  });

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      {/* The crown, above the case. */}
      <Path d="M9.6 3.2 H14.4" stroke={color} {...stroke} />
      <Path d="M12 3.2 V6.1" stroke={color} {...stroke} />
      <Circle cx={CLOCK.cx} cy={CLOCK.cy} r={CLOCK.r} stroke={color} {...stroke} />
      <AnimatedLine
        animatedProps={hand}
        stroke={color}
        x1={CLOCK.cx}
        y1={CLOCK.cy}
        {...stroke}
      />
      <Circle cx={CLOCK.cx} cy={CLOCK.cy} fill={color} r={1.3} />
    </Svg>
  );
}

/* ------------------------------------------------------------------- full */

export function FullIcon({ size = 24, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 820 });

  // The cup is the noun and the star is the idea, so the cup is static and the
  // star lands in it — the same division `RulesIcon` and `FirstAidIcon` make.
  const star = useAnimatedProps(() => ({
    r: interpolate(
      progress.value,
      [0.35, 0.72, 1],
      // Overshoots and settles, so the mark lands rather than appears.
      [0, 2.5, 1.9],
      Extrapolation.CLAMP,
    ),
    opacity: interpolate(progress.value, [0.35, 0.55], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      {/* The bowl. */}
      <Path
        d="M7 4 H17 V9.6 A5 5 0 0 1 7 9.6 Z"
        stroke={color}
        {...stroke}
      />
      {/* The two handles, drawn lighter so the bowl is what reads. */}
      <Path d="M7 5.4 H4.6 V7.4 A2.8 2.8 0 0 0 7 10.1" opacity={0.6} stroke={color} {...stroke} />
      <Path d="M17 5.4 H19.4 V7.4 A2.8 2.8 0 0 1 17 10.1" opacity={0.6} stroke={color} {...stroke} />
      {/* Stem and base. */}
      <Path d="M12 14.6 V17.4" stroke={color} {...stroke} />
      <Path d="M8.4 20.4 H15.6 A1 1 0 0 0 14.8 17.4 H9.2 A1 1 0 0 0 8.4 20.4 Z" stroke={color} {...stroke} />
      <AnimatedCircle animatedProps={star} cx={12} cy={8.4} fill={color} />
    </Svg>
  );
}

/* ------------------------------------------------------------------- open */

/**
 * A lemniscate as two cubic loops meeting at the centre.
 *
 * Drawn as one continuous path rather than two circles, because the whole point
 * is a stroke that never reaches an end — which is exactly what the format is:
 * the entire eligible bank, untimed, finished whenever you decide.
 */
const INFINITY =
  'M12 12 C10 9.4 8 8.6 6.4 9.8 C4.6 11.1 4.6 12.9 6.4 14.2 C8 15.4 10 14.6 12 12 C14 9.4 16 8.6 17.6 9.8 C19.4 11.1 19.4 12.9 17.6 14.2 C16 15.4 14 14.6 12 12 Z';
/** Two loops of roughly 20.6 each (Ramanujan on a 3.8 × 2.7 ellipse), rounded well up. */
const INFINITY_LENGTH = 46;

export function OpenIcon({ size = 24, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 1000 });

  const draw = useAnimatedProps(() => ({
    strokeDashoffset: INFINITY_LENGTH * (1 - progress.value),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <AnimatedPath
        animatedProps={draw}
        d={INFINITY}
        stroke={color}
        strokeDasharray={INFINITY_LENGTH}
        {...stroke}
        strokeWidth={1.9}
      />
    </Svg>
  );
}

/* ------------------------------------------------------------------ drill */

/**
 * The mistake drill: the questions this learner keeps getting wrong.
 *
 * A target whose rings settle inward and then take a hit in the centre — the
 * format's idea is *aim*, not volume. The rings are drawn as animated `r`
 * rather than as a scaling transform, per the numeric-props-only rule: an
 * animated transform on a `G` is markedly more fragile across platforms.
 */
export function DrillIcon({ size = 24, color, trigger, delayMs }: AnimatedIconProps) {
  const progress = useIconPlayback(trigger, { delayMs, durationMs: 860 });

  // Each ring converges on its resting radius from slightly wide, so the target
  // reads as being sighted rather than as simply appearing.
  const outer = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0, 0.45], [11.5, 8.6], Extrapolation.CLAMP),
    opacity: interpolate(progress.value, [0, 0.3], [0, 1], Extrapolation.CLAMP),
  }));

  const inner = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0.2, 0.65], [7.5, 4.9], Extrapolation.CLAMP),
    opacity: interpolate(progress.value, [0.2, 0.45], [0, 1], Extrapolation.CLAMP),
  }));

  // The hit lands last and stays: `progress === 1` is the resting state, so the
  // icon at rest is a target with a mark in it, not an empty one.
  const hit = useAnimatedProps(() => ({
    r: interpolate(progress.value, [0.6, 0.85, 1], [0, 2.6, 1.9], Extrapolation.CLAMP),
    opacity: interpolate(progress.value, [0.6, 0.72], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <AnimatedCircle animatedProps={outer} cx={12} cy={12} stroke={color} {...stroke} />
      <AnimatedCircle animatedProps={inner} cx={12} cy={12} stroke={color} {...stroke} />
      <AnimatedCircle animatedProps={hit} cx={12} cy={12} fill={color} />
    </Svg>
  );
}
