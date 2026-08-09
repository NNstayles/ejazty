import { useEffect, useId, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
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
  Path,
  Stop,
} from 'react-native-svg';

import { Text } from '@/components/ui/text';
import { duration, easing, useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { spacing } from '@/theme/tokens';

const AnimatedPath = Animated.createAnimatedComponent(Path);

/** Plot height in points. The labels sit outside it. */
const HEIGHT = 78;
/**
 * Inset from every edge of the plot.
 *
 * Wide enough for the largest dot's radius plus its ring, so the newest
 * attempt is never drawn half-clipped by the edge it happens to land on.
 */
const PAD = 8;

type Point = { x: number; y: number };

/**
 * Polyline length, summed segment by segment.
 *
 * Exact for a polyline, which is what this draws — `getTotalLength` is a DOM
 * API with no counterpart in `react-native-svg`, so a curve would have to be
 * approximated. It is used as the `strokeDasharray` so the line can be drawn
 * on rather than faded in.
 */
function polylineLength(points: Point[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i += 1) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y);
  }
  return total;
}

/**
 * Recent attempt scores as a trend line.
 *
 * ## What it is for
 *
 * The exam home already lists the last five attempts as rows of numbers, which
 * answers "what did I score" but not "am I getting better" — the question a
 * learner actually opens the app with. A five-row table makes that a reading
 * exercise; a line makes it pre-attentive.
 *
 * ## Two things it does not do
 *
 * **It does not scale to the data.** The y-axis is pinned to 0–100 rather than
 * to the range of the scores present. An auto-scaled axis would render a run of
 * 61, 62, 63 as a dramatic climb and a run of 88, 90, 89 as noise, which is a
 * chart lying about the thing it was drawn to show. The pass mark is also only
 * meaningful against a fixed axis.
 *
 * **It does not mix modes.** The caller passes the series; `compareAttempt`'s
 * rule applies here too — a 10-question warm-up beside a 30-question mock is
 * two different tests, and joining them with a line asserts a trend that does
 * not exist.
 *
 * ## Why it measures itself instead of stretching a viewBox
 *
 * This used to lay out in a fixed 100-unit viewBox stretched to the card with
 * `preserveAspectRatio="none"`, which needs no measurement pass and is wrong
 * for anything round. A non-uniform scale distorts *geometry*, not just
 * strokes: on a 340pt card the horizontal scale is ~3.4x and the vertical is
 * 1x, so `r={2.5}` drew the newest attempt as an 8.5×2.5pt ellipse — a squashed
 * blob that reads as a rendering fault. `vectorEffect="non-scaling-stroke"`
 * does not help, because it exempts the stroke width and nothing else.
 *
 * Measuring once with `onLayout` and computing the geometry in real points
 * makes every dot round, lets the stroke declare its own width honestly, and is
 * what lets the pass-mark label be positioned against the same scale the plot
 * uses rather than against a second, hand-kept copy of it.
 */
export function Sparkline({
  /** Percentages, oldest first. */
  values,
  /** Pass mark as a percentage, drawn as a reference line. */
  threshold,
  accent,
  /** Label for the pass-mark rule, e.g. "60%". Hidden when omitted. */
  thresholdLabel,
}: {
  values: number[];
  threshold: number;
  accent: string;
  thresholdLabel?: string;
}) {
  const { colors, isRTL } = useTheme();
  const motion = useMotion();
  const progress = useSharedValue(motion.reduced ? 1 : 0);
  const [width, setWidth] = useState(0);

  /*
    Per-instance, for the same reason `Texture` derives its pattern id this way:
    SVG paint references resolve by document id, so a hardcoded one is a
    collision waiting for the second instance to mount. That is not
    hypothetical here — the exam home and the result screen live in one stack,
    so the home stays mounted underneath while a result is showing, and a second
    trend card anywhere would silently paint with the first one's gradient.

    `useId` contains colons, which are not valid inside a `url(#…)` reference.
  */
  const fillId = `spark${useId().replace(/[^a-zA-Z0-9]/g, '')}`;

  // A single point is not a trend, and a line through it is a horizontal rule
  // that implies one. The caller renders nothing rather than this.
  const usable = values.length >= 2;

  /*
    Keyed on the values themselves, not on `values.length`.

    The series is the last eight attempts in one mode, so once a learner has
    eight the length stops changing and every subsequent attempt would have
    redrawn the line without animating it — the one moment the animation is
    actually worth playing. Joining is cheap at this size and is a real
    dependency rather than a proxy for one.
  */
  const seriesKey = values.join(',');

  useEffect(() => {
    if (motion.reduced) {
      progress.value = 1;
      return;
    }
    progress.value = 0;
    progress.value = withTiming(1, {
      duration: duration.deliberate,
      easing: easing.decelerate,
    });
  }, [seriesKey, motion.reduced, progress]);

  const innerH = HEIGHT - PAD * 2;

  // In Arabic and Sorani the axis runs right to left, because time does. A
  // chart is a sentence about a sequence, and leaving it LTR under mirrored
  // text puts the newest attempt at the start of the line.
  const xFor = (i: number) => {
    const t = usable ? i / (values.length - 1) : 0;
    return PAD + (isRTL ? 1 - t : t) * Math.max(0, width - PAD * 2);
  };
  const yFor = (v: number) =>
    PAD + (1 - Math.min(100, Math.max(0, v)) / 100) * innerH;

  const points: Point[] = values.map((v, i) => ({ x: xFor(i), y: yFor(v) }));
  const line = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');

  // Closed back along the baseline so the area under the line can be filled.
  const area =
    `${line} L${points[points.length - 1]?.x.toFixed(2)} ${HEIGHT - PAD}` +
    ` L${points[0]?.x.toFixed(2)} ${HEIGHT - PAD} Z`;

  const length = polylineLength(points);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: length * (1 - progress.value),
  }));

  const onLayout = (event: LayoutChangeEvent) => {
    const next = event.nativeEvent.layout.width;
    // Only on a real change: `onLayout` fires on every re-layout, and setting
    // state unconditionally from it is a render loop waiting for a rounding
    // difference to start it.
    setWidth((current) => (Math.abs(current - next) > 0.5 ? next : current));
  };

  const thresholdY = yFor(threshold);

  // After every hook, never before. A single point is not a trend, and the
  // caller renders nothing rather than a fixed-height empty box where a chart
  // was expected.
  if (!usable) return null;

  return (
    <View onLayout={onLayout} style={styles.wrap}>
      {/* Rendered only once measured. Drawing at width 0 first would collapse
          every point onto one x and animate the line out of a spike. */}
      {width > 0 ? (
        <>
          <Svg height={HEIGHT} width={width}>
            <Defs>
              <LinearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
                <Stop offset="0" stopColor={accent} stopOpacity={0.2} />
                <Stop offset="1" stopColor={accent} stopOpacity={0} />
              </LinearGradient>
            </Defs>

            {/*
              The pass mark. Dashed and drawn under the series, so it reads as
              the rule the line is being measured against rather than as a
              second series.
            */}
            <Line
              stroke={colors.border}
              strokeDasharray="3 3"
              strokeWidth={1}
              x1={PAD}
              x2={width - PAD}
              y1={thresholdY}
              y2={thresholdY}
            />

            <Path d={area} fill={`url(#${fillId})`} />

            <AnimatedPath
              animatedProps={animatedProps}
              d={line}
              fill="none"
              stroke={accent}
              strokeDasharray={length}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />

            {/*
              A dot per attempt, coloured by its own verdict.

              This is the part that turns a shape into a reading. The line says
              which way the run is going; the dots say which of those attempts
              would actually have passed — and that is a judgement the app
              already makes in exactly these two colours on the result screen,
              so it costs no new vocabulary. Without them the reader has to
              measure each point against the dashed rule by eye.

              The newest is drawn larger and ringed in the surface colour so the
              eye lands on where the run *ended*, which is the one point a
              learner is looking for.
            */}
            {points.map((p, i) => {
              const passed = values[i] >= threshold;
              const newest = i === points.length - 1;
              return (
                <Circle
                  cx={p.x}
                  cy={p.y}
                  fill={passed ? colors.success : colors.danger}
                  key={`${p.x}-${p.y}-${i}`}
                  r={newest ? 4 : 2.5}
                  stroke={colors.surface}
                  strokeWidth={newest ? 2 : 1.5}
                />
              );
            })}
          </Svg>

          {/*
            The pass mark's value, as real text rather than as an SVG `<Text>`.

            Two reasons it is not inside the plot: the app's Arabic line-height
            floor lives in `Text` and an SVG text node would bypass it, and the
            label has to sit on the reading-end side, which `end` gives for free
            in both directions where an SVG x coordinate would need mirroring by
            hand.
          */}
          {thresholdLabel ? (
            <View
              pointerEvents="none"
              style={[
                styles.thresholdLabel,
                { backgroundColor: colors.surface, top: thresholdY - 9 },
              ]}>
              <Text tone="textFaint" variant="overline">
                {thresholdLabel}
              </Text>
            </View>
          ) : null}
        </>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '100%', height: HEIGHT },
  thresholdLabel: {
    position: 'absolute',
    // Physical edges are a bug everywhere else in this app; `end` is the
    // logical one and resolves to the left in Arabic and Sorani.
    end: 0,
    paddingHorizontal: spacing.xs,
    borderRadius: 4,
  },
});
