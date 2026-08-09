import { useEffect, useId, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Circle, Defs, LinearGradient, Stop } from 'react-native-svg';

import { duration, easing, useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * A compact ring that fills to a fraction, with whatever you like in the middle.
 *
 * ## Not the same component as `ScoreRing`, deliberately
 *
 * `ScoreRing` is the result screen's centrepiece: 208pt, a halo, a pass-mark
 * tick, and display-sized copy baked into it. It answers "how did I do" once,
 * as the subject of a screen. This answers "how far along am I" at 64–110pt,
 * several to a screen, inside a card. Generalising one into the other would mean
 * a component with a `halo` flag, a `tick` flag and two type scales — the shape
 * that ends up serving neither call site well.
 *
 * ## The arc is a gradient, and the range is narrow
 *
 * Same reasoning `ScoreRing` records: a flat band of saturated colour at this
 * width reads as a plastic chip, and sweeping the accent's own opacity along the
 * arc gives it a light source without introducing a second hue. `0.75→1` rather
 * than something wider, because a wide range makes the start of the arc look
 * faded rather than lit — which reads as a rendering fault.
 *
 * ## `strokeLinecap` is square below a full turn's worth of stroke
 *
 * A round cap adds half a stroke width at each end. At `ScoreRing`'s size that
 * is invisible; at 64pt with a 7pt stroke it makes a 2% arc render as a visible
 * lozenge, so a ring at "just started" looks like a ring at "nearly a tenth".
 * The cap is therefore round only once the arc is long enough to carry it.
 */
export function ProgressRing({
  /** 0–1. Values outside are clamped by the caller; this draws what it is given. */
  fraction,
  accent,
  size = 96,
  /** Stroke width. Defaults to a tenth of the diameter, which reads well at every size used. */
  thickness,
  children,
}: {
  fraction: number;
  accent: string;
  size?: number;
  thickness?: number;
  children?: ReactNode;
}) {
  const { colors } = useTheme();
  const motion = useMotion();
  const animate = !motion.reduced;

  // Per-instance, for the reason `Texture` documents: SVG paint is resolved by
  // document id, and several of these are on screen at once.
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const arcId = `ring${uid}`;

  const stroke = thickness ?? Math.max(5, Math.round(size * 0.1));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(1, fraction));

  const progress = useSharedValue(animate ? 0 : 1);

  useEffect(() => {
    if (!animate) {
      progress.value = 1;
      return;
    }
    progress.value = withTiming(1, {
      duration: duration.deliberate,
      easing: easing.decelerate,
    });
    // `fraction` is a dependency so the sweep replays when the value changes —
    // answering a question and coming back to the hero should show the ring
    // move, not find it already there.
  }, [animate, fraction, progress]);

  const arcProps = useAnimatedProps(() => ({
    strokeDashoffset: circumference * (1 - clamped * progress.value),
  }));

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      <Svg height={size} width={size}>
        <Defs>
          <LinearGradient id={arcId} x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor={accent} stopOpacity={0.75} />
            <Stop offset="1" stopColor={accent} stopOpacity={1} />
          </LinearGradient>
        </Defs>

        <Circle
          cx={size / 2}
          cy={size / 2}
          fill="none"
          r={radius}
          stroke={colors.surfaceAlt}
          strokeWidth={stroke}
        />

        <AnimatedCircle
          animatedProps={arcProps}
          cx={size / 2}
          cy={size / 2}
          fill="none"
          // Rotated on the element, not the container: rotating the wrapper
          // would take the centred children with it.
          origin={`${size / 2}, ${size / 2}`}
          r={radius}
          rotation={-90}
          stroke={`url(#${arcId})`}
          strokeDasharray={circumference}
          strokeLinecap={clamped * circumference > stroke * 2 ? 'round' : 'butt'}
          strokeWidth={stroke}
        />
      </Svg>

      {children ? (
        <View pointerEvents="none" style={styles.center}>
          {children}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  center: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
