import Ionicons from '@expo/vector-icons/Ionicons';
import { useState, type Ref } from 'react';
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import { Text } from './text';

export type FieldProps = TextInputProps & {
  label: string;
  error?: string | null;
  /**
   * Forwarded to the inner `TextInput`, so a form can move focus along itself.
   *
   * A plain prop rather than `forwardRef`: React 19 passes `ref` through like
   * any other prop, and the wrapper this component now draws means the ref a
   * caller wants is never the outermost element anyway.
   */
  ref?: Ref<TextInput>;
  /**
   * Shows an eye button that reveals what has been typed.
   *
   * Only meaningful with `secureTextEntry`, and off by default so a field does
   * not gain one by accident. It exists because the alternative is what every
   * password field without one produces: a person who cannot tell a typo from a
   * wrong password, on a phone keyboard, retrying until they are rate-limited.
   *
   * The reveal is **not** persisted and resets whenever the field remounts —
   * a password left visible on a screen the user has walked away from is the
   * failure this control is one step away from causing.
   */
  revealable?: boolean;
  /** Reveal-toggle labels, so this component needs no translator of its own. */
  revealLabels?: { show: string; hide: string };
};

export function Field({
  label,
  error,
  style,
  ref,
  revealable = false,
  revealLabels,
  ...rest
}: FieldProps) {
  // A `TextInput` clamps its own glyphs the same way a `Text` does, so typed
  // Arabic needs the script-aware scale — and the same alignment, or the caret
  // sits on the left while the letters run right.
  //
  // `writingDirection` matters here for a reason it does not on a static label:
  // what gets typed into these boxes is routinely mixed. A display name in
  // Arabic, an email address in Latin and a password of both go through the
  // same component, and without the direction the caret jumps to the wrong end
  // of the run as soon as the script changes mid-field.
  //
  // `inputAlign` rather than the alignment a `<Text>` takes: React Native gives
  // a `<Text>` a logical `textAlign` that it swaps under RTL, and gives an input
  // nothing of the kind, so an input needs the physical side. See `@/i18n`.
  const { colors, typography, inputAlign, writingDirection } = useTheme();
  const [focused, setFocused] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const borderColor = error
    ? colors.danger
    : focused
      ? colors.primary
      : colors.border;

  // Only when the caller asked *and* the field is actually a secure one. A
  // reveal button on an email box would be a control that does nothing.
  const showToggle = revealable && rest.secureTextEntry === true;

  return (
    <View style={styles.wrapper}>
      <Text variant="caption" tone="textMuted">
        {label}
      </Text>
      {/*
        The border moved from the input to this row so the reveal button can sit
        inside it. The input keeps its own padding and grows; nothing else in
        the box has an intrinsic width, so a field with no adornment lays out
        exactly as it did before.
      */}
      <View
        style={[
          styles.box,
          { backgroundColor: colors.surface, borderColor },
        ]}>
        <TextInput
          accessibilityLabel={label}
          onBlur={() => setFocused(false)}
          onFocus={() => setFocused(true)}
          placeholderTextColor={colors.textFaint}
          ref={ref}
          style={[
            styles.input,
            typography.body,
            {
              color: colors.text,
              textAlign: inputAlign,
              writingDirection,
            },
            style,
          ]}
          {...rest}
          // After the spread, so revealing genuinely overrides the caller's
          // `secureTextEntry` rather than being overwritten by it.
          secureTextEntry={rest.secureTextEntry === true && !revealed}
        />
        {showToggle ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              revealed ? revealLabels?.hide : revealLabels?.show
            }
            // The glyph is 20pt inside a 44pt box: the icon has to stay small
            // enough not to compete with the caret, and the target has to stay
            // big enough to hit, which are not the same measurement.
            hitSlop={spacing.sm}
            onPress={() => setRevealed((on) => !on)}
            style={styles.reveal}>
            <Ionicons
              color={focused ? colors.primary : colors.textFaint}
              name={revealed ? 'eye-off-outline' : 'eye-outline'}
              size={20}
            />
          </Pressable>
        ) : null}
      </View>
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
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: 1.5,
    // The input carries the horizontal padding on its leading side; this keeps
    // the reveal button off the trailing edge by the same amount.
    paddingEnd: spacing.xs,
  },
  input: {
    flex: 1,
    // Vertical padding rather than the box's `minHeight` alone, so a value long
    // enough to wrap grows the field instead of being clipped by it.
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
  },
  reveal: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
