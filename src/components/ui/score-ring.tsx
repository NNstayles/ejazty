import { useEffect, useId } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  RadialGradient,
  Stop,
} from 'react-native-svg';

import { Text } from '@/components/ui/text';
import { duration, easing, useMotion } from '@/lib/motion';
import { useCountUp } from '@/lib/use-count-up';
import { useTheme } from '@/theme/theme-provider';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

/**
 * The canvas is larger than the ring so the halo has somewhere to fall off to.
 *
 * A glow clipped by its own viewport is the thing that makes it read as a
 * second ring rather than as light: the falloff gets cut mid-fade and leaves a
 * hard circular edge exactly where there should be nothing.
 */
const SIZE = 208;
const STROKE = 13;
const RADIUS = 78;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

/** A point on the ring, with twelve o'clock as zero. */
function ringPoint(percent: number, radius: number) {
  const angle = (percent / 100) * 2 * Math.PI - Math.PI / 2;
  return {
    x: SIZE / 2 + radius * Math.cos(angle),
    y: SIZE / 2 + radius * Math.sin(angle),
  };
}

/**
 * The graded score, as a ring that fills to the percentage.
 *
 * `accent` is passed in rather than derived: pass and fail are the two states
 * where this app's palette keeps a conventional hue, and the caller already
 * knows which one applies.
 *
 * ## The pass mark is a tick outside the track, not a cut through it
 *
 * A bare percentage answers "what did I score" and leaves "was that enough" to
 * be worked out against a number printed further down the screen. Marking the
 * threshold makes it a glance instead: the arc either reaches past the tick or
 * stops short of it.
 *
 * The first version of this drew the mark *across* the ring in the surface
 * colour, on the reasoning that a gap stays visible whether the arc has covered
 * it or not. It does — and it also reads as a scratch in the graphic rather
 * than as a scale marker, because a break in a continuous stroke is damage. A
 * short tick set outside the track in a muted neutral is unambiguous: it is
 * obviously an annotation *on* the dial rather than a fault *in* it.
 *
 * ## The halo is a radial falloff, not a wide stroke
 *
 * Same class of mistake, and worth recording because the wrong version looks
 * plausible in code. A "glow" drawn as a thicker stroke at low opacity is not a
 * glow: SVG strokes have hard edges, so what renders is a second concentric
 * band with two crisp boundaries — visibly a ring someone forgot to remove. A
 * real glow needs the opacity to fall off with distance, which is a radial
 * gradient. The stops share one colour and vary only in `stopOpacity`, so
 * nothing interpolates toward black and the palette rule still holds.
 *
 * ## Why the stroke is a gradient
 *
 * A 13pt band of one flat colour is the largest area of pure saturation on any
 * screen in the app, and at that size it reads as a plastic chip. Sweeping the
 * accent's own opacity along the arc gives the band a light source without
 * introducing a second hue. The range is deliberately narrow — a wide one makes
 * the start of the arc look faded rather than lit, which is how a gradient ends
 * up reading as a rendering error.
 */
export function ScoreRing({
  percent,
  accent,
  label,
  /** Pass mark, notched into the track. Omit to draw a plain ring. */
  thresholdPercent,
}: {
  percent: number;
  accent: string;
  label: string;
  thresholdPercent?: number;
}) {
  const { colors } = useTheme();
  // Honours the OS "reduce motion" switch. A score sweeping up from zero is
  // exactly the kind of motion that setting exists to suppress, and the screen
  // has to remain readable — so it snaps to the final value instead of being
  // skipped or left at zero.
  const motion = useMotion();
  const animate = !motion.reduced;

  /*
    Per-instance ids, for the reason `Texture` documents: SVG paint references
    resolve by document id, so two rings mounted at once with hardcoded ids
    would silently share one gradient. Cheap insurance — the two live on the
    same `<Svg>` and are only ever read a few lines below.
  */
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  const arcId = `arc${uid}`;
  const glowId = `glow${uid}`;

  const progress = useSharedValue(animate ? 0 : 1);
  const shown = useCountUp(percent);

  useEffect(() => {
    if (!animate) {
      progress.value = 1;
      return;
    }
    progress.value = withTiming(1, {
      duration: duration.deliberate,
      easing: easing.decelerate,
    });
  }, [animate, percent, progress]);

  const arcProps = useAnimatedProps(() => ({
    strokeDashoffset:
      CIRCUMFERENCE - CIRCUMFERENCE * (percent / 100) * progress.value,
  }));

  // The halo comes up with the fill, so the ring looks lit from within rather
  // than outlined. Kept well under a quarter opacity: a glow that competes with
  // the arc turns a precise figure into a soft one.
  const glowProps = useAnimatedProps(() => ({ opacity: progress.value * 0.9 }));

  // The tick sits in the gap between the track and the edge of the canvas.
  const tickInner =
    thresholdPercent === undefined
      ? null
      : ringPoint(thresholdPercent, RADIUS + STROKE / 2 + 4);
  const tickOuter =
    thresholdPercent === undefined
      ? null
      : ringPoint(thresholdPercent, RADIUS + STROKE / 2 + 11);

  return (
    <View style={styles.wrap}>
      <Svg height={SIZE} width={SIZE}>
        <Defs>
          <LinearGradient id={arcId} x1="0" x2="1" y1="0" y2="1">
            <Stop offset="0" stopColor={accent} stopOpacity={0.75} />
            <Stop offset="1" stopColor={accent} stopOpacity={1} />
          </LinearGradient>

          {/*
            Zero at the centre, brightest just outside the track, zero again at
            the edge of the canvas. Both ends fade to nothing, which is what
            stops the halo showing an edge of its own — the failure of the
            wide-stroke version this replaced.
          */}
          <RadialGradient cx="50%" cy="50%" id={glowId} r="50%">
            <Stop offset="0.62" stopColor={accent} stopOpacity={0} />
            <Stop offset="0.80" stopColor={accent} stopOpacity={0.26} />
            <Stop offset="1" stopColor={accent} stopOpacity={0} />
          </RadialGradient>
        </Defs>

        <AnimatedCircle
          animatedProps={glowProps}
          cx={SIZE / 2}
          cy={SIZE / 2}
          fill={`url(#${glowId})`}
          r={SIZE / 2}
        />

        {/* Track. */}
        <Circle
          cx={SIZE / 2}
          cy={SIZE / 2}
          fill="none"
          r={RADIUS}
          stroke={colors.surfaceAlt}
          strokeWidth={STROKE}
        />

        {/*
          Rotated so the arc starts at twelve o'clock instead of three. Applied
          to the element rather than the parent `View`: rotating the container
          would take the centred label with it.
        */}
        <AnimatedCircle
          animatedProps={arcProps}
          cx={SIZE / 2}
          cy={SIZE / 2}
          fill="none"
          origin={`${SIZE / 2}, ${SIZE / 2}`}
          r={RADIUS}
          rotation={-90}
          stroke={`url(#${arcId})`}
          strokeDasharray={CIRCUMFERENCE}
          strokeLinecap="round"
          strokeWidth={STROKE}
        />

        {tickOuter && tickInner ? (
          <Line
            stroke={colors.textFaint}
            strokeLinecap="round"
            strokeWidth={2.5}
            x1={tickInner.x}
            x2={tickOuter.x}
            y1={tickInner.y}
            y2={tickOuter.y}
          />
        ) : null}
      </Svg>

      <View pointerEvents="none" style={styles.center}>
        <Text center style={{ color: accent }} variant="display">
          {shown}%
        </Text>
        <Text center style={{ color: accent }} variant="heading">
          {label}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  center: { ...StyleSheet.absoluteFillObject, alignItems: 'center', justifyContent: 'center' },
});
