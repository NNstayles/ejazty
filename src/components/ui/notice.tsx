import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import { Text } from './text';

/**
 * A short inline message about the thing directly above it.
 *
 * ## Why this is a component rather than four copies of a `<Text tone="danger">`
 *
 * The sign-in screen already drew one of these by hand — a soft-tinted row with
 * a glyph and a wrapping caption — and it is the only auth screen that did. The
 * other three reported everything as a bare coloured caption, which fails in two
 * ways that are easy to miss in a diff:
 *
 * - **A bare line has no weight.** `resetLinkSent` is the entire outcome of the
 *   forgot-password screen and it rendered as one dim green sentence under a
 *   button, indistinguishable from a field hint. The tinted block is what makes
 *   a result read as a result.
 * - **Colour was carrying the meaning on its own.** Success and failure differed
 *   only by hue, which is exactly the distinction a colour-blind reader does not
 *   get. The glyph is not decoration here; it is the redundant channel.
 *
 * Four screens in one flow drew this three different ways, so a user moving from
 * sign-in to sign-up to forgot-password watched the same class of message change
 * shape twice.
 *
 * The `tone` names a semantic token rather than a colour, so it resolves through
 * the theme in both schemes — and each pairs a `…Soft` fill with its own checked
 * foreground, which is the rule `tints` documents for any surface that is not
 * `surface`.
 */
export type NoticeTone = 'danger' | 'success' | 'warning' | 'info';

const GLYPH: Record<NoticeTone, keyof typeof Ionicons.glyphMap> = {
  danger: 'alert-circle',
  success: 'checkmark-circle',
  warning: 'construct-outline',
  info: 'information-circle-outline',
};

export function Notice({
  tone,
  children,
}: {
  tone: NoticeTone;
  children: string;
}) {
  const { colors } = useTheme();
  const fill = {
    danger: colors.dangerSoft,
    success: colors.successSoft,
    warning: colors.warningSoft,
    info: colors.infoSoft,
  }[tone];
  const ink = colors[tone];

  return (
    <View
      /*
        `accessible` groups the glyph and the sentence into one node, so the
        message is read as a message rather than as an unlabelled image
        followed by a stray caption.

        `accessibilityLiveRegion` announces it without the reader having to go
        looking, which matters because these appear *after* a submit — focus is
        still on the button. It is **Android-only**; iOS has no declarative
        equivalent and would need an explicit
        `AccessibilityInfo.announceForAccessibility` call. Grouping and the
        `alert` role are what both platforms get, so the message is at least
        coherent when reached on iOS rather than announced automatically.
      */
      accessible
      accessibilityLiveRegion={tone === 'danger' ? 'assertive' : 'polite'}
      accessibilityRole="alert"
      style={[styles.notice, { backgroundColor: fill }]}>
      <Ionicons color={ink} name={GLYPH[tone]} size={16} />
      {/*
        `flex: 1` is load-bearing: a row lays its children out at their
        intrinsic width, so without it a long message runs off the end of the
        card instead of breaking onto a second line.

        `tone` rather than an explicit colour: all four names here are semantic
        text tokens, so the caption resolves through the same theme the fill
        does instead of restating a colour the theme already knows.
      */}
      <Text style={styles.text} tone={tone} variant="caption">
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    flexDirection: 'row',
    // `flex-start`, so the glyph stays beside the *first* line of a message
    // that wraps rather than floating to the middle of the block.
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  text: { flex: 1 },
});
