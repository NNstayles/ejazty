import { ActivityIndicator, StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { radius, spacing, typography } from '@/theme/tokens';
import { PressableScale } from './pressable-scale';
import { Text } from './text';

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
    primary: { background: colors.primary, border: colors.primary, label: colors.onPrimary },
    secondary: { background: colors.surface, border: colors.border, label: colors.text },
    ghost: { background: 'transparent', border: 'transparent', label: colors.primary },
    danger: { background: colors.dangerSoft, border: colors.dangerSoft, label: colors.danger },
  };
  const tone = surface[variant];

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
      ]}>
      <View style={styles.inner}>
        {loading ? (
          <ActivityIndicator color={tone.label} size="small" />
        ) : (
          <>
            {icon}
            <Text style={[typography.bodyStrong, { color: tone.label }]}>{label}</Text>
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
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
});
