/**
 * Animated icons for the three tabs.
 *
 * ## These animate differently from the section icons, on purpose
 *
 * `section-icons.tsx` uses `useIconPlayback`: a one-shot 0→1 that plays and
 * rests. That is right for something you tapped once. A tab icon is not an
 * event, it is a **state** — this tab is the one you are on — so these are
 * driven by a value that tracks `focused` in both directions and can be
 * interrupted halfway. Tapping away from a tab has to reverse the animation,
 * not replay it, and a one-shot driver cannot express that.
 *
 * The state each icon settles into is also what distinguishes it while focused,
 * so the animation is carrying information rather than decorating a colour
 * change: the book gains a bookmark, the clipboard gains its tick, the gear
 * turns. Someone with reduced motion on still sees all three, they just arrive
 * without travelling.
 */

import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
  type DerivedValue,
} from 'react-native-reanimated';
import Svg, { Circle, Line, Path, Rect } from 'react-native-svg';

import { duration, easing, spring, useMotion } from '@/lib/motion';

const AnimatedPath = Animated.createAnimatedComponent(Path);
const AnimatedRect = Animated.createAnimatedComponent(Rect);

const VIEW_BOX = 24;

const stroke = {
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.7,
  fill: 'none',
} as const;

export type TabIconProps = {
  focused: boolean;
  color: string;
  size?: number;
};

/**
 * A 0→1 value tracking focus, reversible mid-flight.
 *
 * `useDerivedValue` rather than a `useEffect` writing to a shared value: the
 * transition is then a pure function of the prop, so a tab tapped twice in
 * quick succession cannot leave the icon in a state that disagrees with which
 * tab is actually selected — the failure an effect-driven version produces
 * when its two writes land out of order.
 *
 * Note that the duration is resolved on the JS side and captured as a plain
 * number. The body of `useDerivedValue` is a worklet running on the UI thread,
 * and calling `motion.ms()` from inside it would mean shipping a closure over
 * the whole `Motion` object across the bridge — which fails at runtime rather
 * than at compile time, and only on device.
 */
function useFocusDrive(focused: boolean): DerivedValue<number> {
  const motion = useMotion();
  const ms = motion.ms(duration.base);

  return useDerivedValue<number>(
    () => withTiming(focused ? 1 : 0, { duration: ms, easing: easing.standard }),
    [focused, ms],
  );
}

/* ------------------------------------------------------------------ learn */

export function LearnTabIcon({ focused, color, size = 24 }: TabIconProps) {
  const drive = useFocusDrive(focused);

  // The ribbon drops out of the top edge of the page rather than fading in, so
  // it reads as a bookmark being placed in the book that is open.
  const ribbon = useAnimatedProps(() => ({
    height: interpolate(drive.value, [0, 1], [0, 6.6], Extrapolation.CLAMP),
    opacity: interpolate(drive.value, [0, 0.15], [0, 1], Extrapolation.CLAMP),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      <Path
        d="M12 7 C10 5.4 7.2 4.8 4.6 5 V17.8 C7.2 17.6 10 18.2 12 19.8"
        stroke={color}
        {...stroke}
      />
      <Path
        d="M12 7 C14 5.4 16.8 4.8 19.4 5 V17.8 C16.8 17.6 14 18.2 12 19.8"
        stroke={color}
        {...stroke}
      />
      <Path d="M12 7 V19.8" opacity={0.5} stroke={color} {...stroke} />
      <AnimatedRect
        animatedProps={ribbon}
        fill={color}
        rx={0.7}
        width={2.6}
        x={15.4}
        y={5.1}
      />
    </Svg>
  );
}

/* ------------------------------------------------------------------- exam */

const TICK = 'M8.9 13.3 L11.2 15.7 L15.5 10.5';
// Summed rather than measured, as elsewhere in this directory.
const TICK_LENGTH = Math.hypot(2.3, 2.4) + Math.hypot(4.3, 5.2);

export function ExamTabIcon({ focused, color, size = 24 }: TabIconProps) {
  const drive = useFocusDrive(focused);

  const tick = useAnimatedProps(() => ({
    strokeDashoffset: TICK_LENGTH * (1 - drive.value),
  }));

  return (
    <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
      {/*
        The board is drawn with gaps where the clip sits rather than as a
        closed rectangle behind it, so the two shapes read as one object
        instead of a rectangle with a sticker on top.
      */}
      <Path
        d="M9 4.6 H7.4 A2 2 0 0 0 5.4 6.6 V19 A2 2 0 0 0 7.4 21 H16.6 A2 2 0 0 0 18.6 19 V6.6 A2 2 0 0 0 16.6 4.6 H15"
        stroke={color}
        {...stroke}
      />
      <Rect
        height={3.6}
        rx={1.2}
        stroke={color}
        width={7}
        x={8.5}
        y={2.7}
        {...stroke}
      />
      <AnimatedPath
        animatedProps={tick}
        d={TICK}
        stroke={color}
        strokeDasharray={TICK_LENGTH}
        {...stroke}
        strokeWidth={2}
      />
    </Svg>
  );
}

/* --------------------------------------------------------------- settings */

/** Eight spokes at 45°, drawn from the cog body outward. */
const SPOKES = Array.from({ length: 8 }, (_, i) => {
  const rad = (i * 45 * Math.PI) / 180;
  const cos = Math.cos(rad);
  const sin = Math.sin(rad);
  return {
    key: i,
    x1: 12 + 5.6 * cos,
    y1: 12 - 5.6 * sin,
    x2: 12 + 7.9 * cos,
    y2: 12 - 7.9 * sin,
  };
});

export function SettingsTabIcon({ focused, color, size = 24 }: TabIconProps) {
  // Destructured to a plain boolean before the worklet closes over it, for the
  // reason given on `useFocusDrive`.
  const { reduced } = useMotion();

  // A spring rather than a timing, and the one place in the icon set that uses
  // one: a cog has mass, and easing it to a stop makes it look drawn rather
  // than turned. It is also why this is a `View` transform instead of an
  // animated SVG prop — the whole glyph rotates about its own centre, which is
  // exactly what a view transform does and what an SVG `G` rotation needs an
  // explicit origin to fake.
  const angle = useDerivedValue<number>(
    () =>
      reduced ? (focused ? 45 : 0) : withSpring(focused ? 45 : 0, spring.gentle),
    [focused, reduced],
  );

  const style = useAnimatedStyle(() => ({
    transform: [{ rotate: `${angle.value}deg` }],
  }));

  return (
    <Animated.View style={style}>
      <Svg height={size} viewBox={`0 0 ${VIEW_BOX} ${VIEW_BOX}`} width={size}>
        {SPOKES.map((s) => (
          <Line
            key={s.key}
            stroke={color}
            x1={s.x1}
            x2={s.x2}
            y1={s.y1}
            y2={s.y2}
            {...stroke}
            strokeWidth={1.9}
          />
        ))}
        <Circle cx={12} cy={12} r={5.6} stroke={color} {...stroke} />
        <Circle cx={12} cy={12} r={2.3} stroke={color} {...stroke} />
      </Svg>
    </Animated.View>
  );
}
