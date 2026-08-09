import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { elevation, radius, spacing } from '@/theme/tokens';
import { Gradient } from './gradient';
import { PressableScale } from './pressable-scale';
import { Text } from './text';
import { Texture } from './texture';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';

export type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  disabled?: boolean;
  loading?: boolean;
  /** Renders full-width; the default in stacked forms. */
  block?: boolean;
  icon?: React.ReactNode;
};

/**
 * The app's action.
 *
 * ## The primary variant is a gradient, and the others deliberately are not
 *
 * There is exactly one primary action on a screen, and the gradient plus the
 * lift is what says so. Giving the secondary variant the same treatment — the
 * obvious "make it all look nicer" move — is what produces a screen where three
 * buttons compete and none of them reads as the answer. Secondary stays a flat
 * outlined surface, ghost stays type on nothing.
 *
 * The gradient is an absolutely-positioned layer rather than a wrapper, so the
 * `PressableScale` above it still owns the layout, the press transform and the
 * hit target. Wrapping the content in the gradient instead would put a view
 * with its own intrinsic sizing between the pressable and its children, which
 * is how a button ends up with a hit area that no longer matches what is drawn.
 */
export function Button({
  label,
  onPress,
  variant = 'primary',
  disabled,
  loading,
  block = true,
  icon,
}: ButtonProps) {
  const { colors } = useTheme();

  const surface: Record<Variant, { background: string; border: string; label: string }> = {
    // Sits under the gradient layer as the fallback fill: if the gradient ever
    // fails to draw, the button is still a brand-coloured button with legible
    // copy rather than a transparent hole.
    primary: { background: colors.primary, border: colors.primary, label: colors.onPrimary },
    secondary: { background: colors.surface, border: colors.border, label: colors.text },
    ghost: { background: 'transparent', border: 'transparent', label: colors.primary },
    danger: { background: colors.dangerSoft, border: colors.dangerSoft, label: colors.danger },
  };
  const tone = surface[variant];
  const isPrimary = variant === 'primary';

  return (
    <PressableScale
      accessibilityRole="button"
      accessibilityLabel={label}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.base,
        {
          backgroundColor: tone.background,
          borderColor: tone.border,
          alignSelf: block ? 'stretch' : 'flex-start',
        },
        // Only the primary lifts. An elevated secondary is a second thing
        // claiming to be the answer.
        isPrimary && !disabled ? elevation(colors.shadow, 2) : null,
      ]}>
      {isPrimary ? (
        <>
          <Gradient
            direction="diagonal"
            pointerEvents="none"
            style={styles.fill}
            tone="brand"
          />
          {/*
            The mark is `onPrimary`, not the theme default.

            Everything else in the app textures a *themed* surface, where the
            default violet mark darkens a light ground and lightens a dark one.
            This one sits on the brand gradient in both schemes, so the default
            would paint violet onto violet and render nothing — the same trap
            the floating tab bar documents, arriving from the other side.
            `onPrimary` is the colour the label is already drawn in, so it is
            guaranteed to read against whatever the gradient is doing.
          */}
          <Texture color={colors.onPrimary} intensity={0.8} variant="dots" />
        </>
      ) : null}

      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator color={tone.label} size="small" />
        ) : (
          <>
            {icon}
            {/*
              `variant`, not a `typography.bodyStrong` style override. Passing
              the scale as a style put the Latin line height back on top of the
              script-aware one `Text` resolves, which is how an Arabic button
              label would end up clipped while every other Arabic string was fixed.
            */}
            <Text style={{ color: tone.label }} variant="bodyStrong">
              {label}
            </Text>
          </>
        )}
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  base: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    // Clips the gradient layer to the corner radius. Without it the gradient
    // draws a square behind the rounded border on Android.
    overflow: 'hidden',
  },
  fill: StyleSheet.absoluteFillObject,
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
