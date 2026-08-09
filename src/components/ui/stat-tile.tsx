import { StyleSheet, View } from 'react-native';

import { useCountUp } from '@/lib/use-count-up';
import { useTheme } from '@/theme/theme-provider';
import { elevation, radius, spacing } from '@/theme/tokens';
import { Text } from './text';

/**
 * One figure with its label, as a tile.
 *
 * Extracted because the exam home and the result screen had grown two
 * near-identical copies with different padding, and a stat row that does not
 * line up between two screens of the same app is the kind of thing nobody can
 * name but everybody sees.
 *
 * ## The number counts up, and the unit does not
 *
 * `value` is the figure and `suffix` is its unit, kept apart so the animation
 * has a number to animate. Passing `"84%"` as one string would either animate
 * nothing or require parsing the digits back out of it. The suffix is rendered
 * inline at the same size, so `84` `%` still reads as one token.
 *
 * ## The accent bar carries the meaning, not the number's colour
 *
 * When a tile has a semantic accent — a pass green, a fail red — it goes on a
 * short rule above the figure rather than into the figure itself. Coloured text
 * at 24pt against a tinted surface is the first thing to fail a contrast check,
 * and the accent is decoration on a number that is already legible.
 */
export function StatTile({
  value,
  suffix,
  label,
  accent,
  /** Renders without the count-up, for a figure that is not a score. */
  animateValue = true,
}: {
  value: number;
  suffix?: string;
  label: string;
  accent?: string;
  animateValue?: boolean;
}) {
  const { colors } = useTheme();
  const counted = useCountUp(value);
  const shown = animateValue ? counted : value;

  return (
    <View
      style={[
        styles.tile,
        { backgroundColor: colors.surface, borderColor: colors.border },
        elevation(colors.shadow, 1),
      ]}>
      {accent ? (
        <View style={[styles.accent, { backgroundColor: accent }]} />
      ) : null}
      <Text center variant="title">
        {shown}
        {suffix ?? ''}
      </Text>
      <Text center numberOfLines={2} tone="textMuted" variant="caption">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  accent: {
    width: 18,
    height: 3,
    borderRadius: radius.pill,
    marginBottom: spacing.xs,
  },
});
