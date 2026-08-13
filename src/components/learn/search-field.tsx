/**
 * The Learn search box.
 *
 * Shared by the section list and by global search, so the two cannot drift into
 * looking like different controls for the same job.
 *
 * Its focus state lives in here rather than on the screen: a `useState` up
 * there would re-render the whole list — and on the signs section that is a
 * 111-row list — every time the keyboard opened.
 *
 * The focus ring is animated rather than switched because this is usually the
 * only control on the screen, and a border that snaps between two colours is
 * the detail that makes a form feel like a form rather than an app.
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { duration as motionDuration, easing, useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

export function SearchField({
  value,
  onChange,
  placeholder,
  autoFocus = false,
  clearLabel,
  style,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  /** Only the global search screen sets this; see the note at its call site. */
  autoFocus?: boolean;
  /** Omitted on the section box, which has a list under it to fall back to. */
  clearLabel?: string;
  style?: View['props']['style'];
}) {
  const { colors, inputAlign, typography, writingDirection } = useTheme();
  const motion = useMotion();
  const [focused, setFocused] = useState(false);
  const ms = motion.ms(motionDuration.fast);

  const drive = useDerivedValue<number>(
    () => withTiming(focused ? 1 : 0, { duration: ms, easing: easing.standard }),
    [focused, ms],
  );

  const ringStyle = useAnimatedStyle(() => ({
    borderColor: drive.value > 0.5 ? colors.primary : colors.border,
    // A ring rather than a thicker border: growing `borderWidth` on focus
    // shifts every child by the difference, so the icon and the caret jump
    // sideways as the keyboard opens.
    shadowOpacity: drive.value * 0.18,
  }));

  return (
    <Animated.View
      style={[
        styles.search,
        {
          backgroundColor: colors.surface,
          shadowColor: colors.primary,
          shadowRadius: 10,
        },
        ringStyle,
        style,
      ]}>
      <Ionicons
        color={focused ? colors.primary : colors.textFaint}
        name="search"
        size={18}
      />
      <TextInput
        autoCorrect={false}
        autoFocus={autoFocus}
        onBlur={() => setFocused(false)}
        onChangeText={onChange}
        onFocus={() => setFocused(true)}
        placeholder={placeholder}
        placeholderTextColor={colors.textFaint}
        // A bare `TextInput` rather than `Field`, so it does not inherit that
        // component's label and border chrome — but the alignment and the
        // writing direction still have to come from the theme, or a search for
        // an Arabic sign title types backwards into a left-aligned box.
        //
        // `inputAlign` is the input's own value: an input gets none of the
        // logical left/right resolution React Native applies to a `<Text>`.
        // `typography.body` rather than a bare `fontSize`, and it is the same
        // rule `Field` follows. An explicit `lineHeight` is a *clamp* in React
        // Native, so a hardcoded size carries the Latin line box: Arabic
        // harakat stack above the letter and get sliced off, which is the
        // defect `typographyFor`'s 1.75 floor exists to prevent. It also
        // brought the family with it — this was the one input in the app
        // rendering in the system sans while everything around it used the
        // resolved scale.
        style={[
          styles.searchInput,
          typography.body,
          { color: colors.text, textAlign: inputAlign, writingDirection },
        ]}
        value={value}
      />
      {/*
        Shown only once something has been typed, and only where the caller
        asked for it. On the global search screen the box is the entire screen
        until a query matches, so clearing it by holding backspace is the only
        way back — on the section list there is always a list underneath, which
        is why that call site leaves it off.
      */}
      {clearLabel && value.length > 0 ? (
        <Pressable
          accessibilityLabel={clearLabel}
          accessibilityRole="button"
          hitSlop={12}
          onPress={() => onChange('')}>
          <Ionicons color={colors.textFaint} name="close-circle" size={18} />
        </Pressable>
      ) : null}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  // No `fontSize` here: the size, the family and the script-aware line height
  // all arrive from `typography.body` at the call site.
  searchInput: { flex: 1, paddingVertical: spacing.md },
});
