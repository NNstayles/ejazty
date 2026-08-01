import { useState } from 'react';
import { StyleSheet, TextInput, View, type TextInputProps } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { radius, spacing, typography } from '@/theme/tokens';
import { Text } from './text';

export type FieldProps = TextInputProps & {
  label: string;
  error?: string | null;
};

export function Field({ label, error, style, ...rest }: FieldProps) {
  const { colors } = useTheme();
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? colors.danger
    : focused
      ? colors.primary
      : colors.border;

  return (
    <View style={styles.wrapper}>
      <Text variant="caption" tone="textMuted">
        {label}
      </Text>
      <TextInput
        accessibilityLabel={label}
        onBlur={() => setFocused(false)}
        onFocus={() => setFocused(true)}
        placeholderTextColor={colors.textFaint}
        style={[
          styles.input,
          typography.body,
          {
            backgroundColor: colors.surface,
            borderColor,
            color: colors.text,
          },
          style,
        ]}
        {...rest}
      />
      {error ? (
        <Text variant="caption" tone="danger">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { gap: spacing.xs },
  input: {
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingHorizontal: spacing.md,
  },
});
