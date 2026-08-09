import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/theme-provider';
import { spacing } from '@/theme/tokens';
import { Chevron } from './chevron';
import { PressableScale } from './pressable-scale';
import { Text } from './text';

/**
 * The stack header, drawn in JS rather than by the platform.
 *
 * ## Why the native header had to go
 *
 * It was the last thing in the app that would not mirror. Everything else takes
 * its direction from the one `direction: rtl` at the root of the tree, which
 * Yoga inherits — but a native header is a `UINavigationBar` or an Android
 * `Toolbar`, laid out by the platform, and the platform reads
 * `I18nManager.isRTL`. This app deliberately keeps that flag false (see
 * `applyDirection`), because the alternative is a relaunch every time the
 * language changes. So the header kept its back button on the left and its
 * title left-aligned while the entire screen beneath it ran right-to-left, and
 * pushing a detail screen slid it in from the left *toward* a back button that
 * was already there. That is precisely the "almost right" state that reads as
 * broken rather than as unfinished.
 *
 * Rendered in JS, it is an ordinary row: it mirrors for free with everything
 * else, on the frame the language changes, with no native flag involved.
 *
 * ## Three things it has to do that the native one did for us
 *
 * - **The status bar inset.** `NativeStackView` renders a custom header without
 *   any top padding, so the inset is applied here. The screens under this
 *   header must not also claim the top edge — see `edges` on `Screen`.
 * - **The back glyph.** `Chevron` with `points="back"`, so it points the way
 *   the reader came in either direction rather than always pointing left.
 * - **A balanced title.** The trailing spacer is the same width as the back
 *   button so the centred title is actually centred, rather than sitting off to
 *   one side by half a touch target.
 */
export function ScreenHeader({
  title,
  onBack,
}: {
  title: string;
  /** Omitted on a root screen, which leaves the title centred on its own. */
  onBack?: () => void;
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: colors.background, paddingTop: insets.top },
      ]}>
      <View style={styles.row}>
        {onBack ? (
          <PressableScale
            accessibilityLabel={t('common.back')}
            accessibilityRole="button"
            // Larger than the glyph: the chevron is 26pt inside a 44pt target,
            // which is the smallest thing anyone should have to hit at the very
            // top of a one-handed reach.
            hitSlop={spacing.sm}
            onPress={onBack}
            scaleTo={0.9}
            style={styles.action}>
            <Chevron points="back" size={26} tone="text" />
          </PressableScale>
        ) : (
          <View style={styles.action} />
        )}
        {/*
          `center` rather than the theme's alignment: this is a centred title in
          both directions, and the balancing spacer opposite the back button is
          what makes the centre the real centre.
        */}
        <Text center numberOfLines={1} style={styles.title} variant="heading">
          {title}
        </Text>
        <View style={styles.action} />
      </View>
    </View>
  );
}

/** Width of the back button and of the spacer that balances it. */
const ACTION_SIZE = 44;

const styles = StyleSheet.create({
  header: { width: '100%' },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: ACTION_SIZE + spacing.sm,
    paddingHorizontal: spacing.sm,
  },
  action: {
    width: ACTION_SIZE,
    height: ACTION_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1 },
});
