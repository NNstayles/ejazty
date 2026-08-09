import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, type LayoutChangeEvent } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import { duration, easing, useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { radius } from '@/theme/tokens';
import { Gradient } from './gradient';

/**
 * A determinate progress track.
 *
 * ## Why the width is measured rather than expressed as a percentage
 *
 * The obvious implementation animates `width: '42%'`, and the obvious
 * alternative animates `scaleX` on a full-width fill. Both have a catch that
 * this component exists to avoid:
 *
 * - A percentage has to be built as a *string* inside the worklet, which is
 *   allocation on the UI thread every frame and, on Android, a layout pass per
 *   frame rather than a transform.
 * - `scaleX` needs a `transformOrigin` at the leading edge, which is the left
 *   in English and the **right** in Arabic — a mirror the component would have
 *   to track itself, and would get wrong exactly once.
 *
 * Measuring the track once and animating a plain number sidesteps both. The
 * fill is a normal laid-out child, so Yoga's inherited `direction: rtl` puts it
 * against the correct edge with no code here at all — the same reason the rest
 * of the app's rows mirror for free.
 *
 * ## The rounded fill is clipped, not rounded
 *
 * The fill carries the track's own radius and the track clips it. Rounding the
 * fill independently makes the leading edge a visible lozenge that detaches
 * from the track at low values, and squares off the trailing edge against the
 * track's own curve.
 */
export function ProgressBar({
  /** Progress in the range 0–1. Values outside it are clamped. */
  value,
  /** Track thickness. */
  height = 6,
  /** Solid fill colour. Omit to use the brand gradient. */
  color,
  accessibilityLabel,
}: {
  value: number;
  height?: number;
  color?: string;
  accessibilityLabel?: string;
}) {
  const { colors } = useTheme();
  const motion = useMotion();
  const [trackWidth, setTrackWidth] = useState(0);

  const clamped = Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0));
  const fill = useSharedValue(0);

  const onLayout = useCallback((event: LayoutChangeEvent) => {
    setTrackWidth(event.nativeEvent.layout.width);
  }, []);

  useEffect(() => {
    const target = trackWidth * clamped;
    // Before the track has been measured there is nothing to animate *to*, and
    // easing from 0 to the first real value once the measurement lands would
    // make every mount play a fill the user did not ask for. Snap on the first
    // pass, animate on every one after it.
    if (fill.value === 0 && target > 0 && trackWidth > 0) {
      fill.value = target;
      return;
    }
    fill.value = withTiming(
      target,
      { duration: motion.ms(duration.base), easing: easing.standard },
    );
  }, [clamped, trackWidth, fill, motion]);

  const fillStyle = useAnimatedStyle(() => ({ width: fill.value }));

  return (
    <View
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(clamped * 100) }}
      onLayout={onLayout}
      style={[
        styles.track,
        { height, borderRadius: radius.pill, backgroundColor: colors.surfaceAlt },
      ]}>
      <Animated.View style={[styles.fill, fillStyle]}>
        {color ? (
          <View style={[styles.fill, { backgroundColor: color }]} />
        ) : (
          <Gradient direction="horizontal" style={styles.fill} tone="brand" />
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: { overflow: 'hidden', width: '100%' },
  fill: { height: '100%' },
});
