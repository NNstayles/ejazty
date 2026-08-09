import { Image } from 'expo-image';
import { Modal, Pressable, StyleSheet, View } from 'react-native';
import Animated, { FadeIn, FadeOut, ZoomIn } from 'react-native-reanimated';
import type { ImageSourcePropType } from 'react-native';

import { duration, easing, useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import { Text } from './text';

/**
 * A single piece of artwork, shown large.
 *
 * ## Why this exists
 *
 * The Learn list draws a sign at 160pt tall inside a card that also carries a
 * title and two blocks of text. That is the right size for scanning a list of a
 * hundred and eleven of them, and the wrong size for the thing the learner is
 * actually being tested on — the exam asks you to identify a sign, and some of
 * them differ only in the pictogram inside the same red triangle. Being able to
 * open one full-width is study value, not decoration.
 *
 * ## The dark plate is passed in, not inferred
 *
 * Dashboard tell-tales are light glyphs drawn on black and need `artworkPlate`
 * behind them; road signs are full-colour and must sit on the plain surface.
 * The caller already knows which kind it is holding — inferring it here would
 * mean re-deriving `entry.colour` from something this component cannot see.
 */
export function ArtworkViewer({
  source,
  title,
  onClose,
  /** Draws the dark backing plate, for artwork that is a light glyph on black. */
  plate = false,
}: {
  source: ImageSourcePropType;
  title: string;
  onClose: () => void;
  plate?: boolean;
}) {
  const { colors, direction } = useTheme();
  const motion = useMotion();

  return (
    <Modal
      animationType="none"
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      visible>
      {/*
        `animationType="none"` on the Modal, with the motion done in Reanimated
        instead. The built-in slide and fade are not reduce-motion aware and
        cannot be sequenced with anything, so a screen that respects the setting
        everywhere else would announce itself with an unskippable slide.
      */}
      {/*
        `direction` is repeated here, and it is the one place in the app that
        has to say it twice.

        Everything else inherits the single `direction: rtl` set on the root
        view in `app/_layout.tsx` — Yoga passes it down the whole tree. A
        `Modal` is the exception: React Native hosts its children on a *separate
        root*, so the modal's subtree starts from the platform default rather
        than from anything above it in the React tree. Without this line the
        enlarged artwork is the only surface in the app still laid out
        left-to-right in Arabic and Sorani.
      */}
      <Animated.View
        entering={motion.reduced ? undefined : FadeIn.duration(180)}
        exiting={motion.reduced ? undefined : FadeOut.duration(140)}
        style={[styles.backdrop, { direction }]}>
        {/*
          The backdrop is the dismiss target. `Pressable` rather than a
          touchable wrapper around the card, so tapping the artwork itself does
          not close it — people pinch and prod at an enlarged image, and having
          that dismiss the thing they are inspecting is maddening.
        */}
        <Pressable
          accessibilityLabel={title}
          accessibilityRole="button"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          // A plain timed zoom, deliberately **not** `.springify()`. A spring
          // overshoots past its target and settles back, and on a piece of
          // artwork the user opened in order to look at it closely, that reads
          // as the image wobbling rather than as physics. Springs belong on
          // things being *moved*; this is something being *presented*.
          entering={
            motion.reduced
              ? undefined
              : ZoomIn.duration(duration.fast).easing(easing.decelerate)
          }
          pointerEvents="box-none"
          style={styles.stage}>
          <View
            style={[
              styles.frame,
              { backgroundColor: plate ? colors.artworkPlate : colors.surface },
            ]}>
            <Image
              cachePolicy="memory-disk"
              contentFit="contain"
              source={source}
              style={styles.image}
            />
          </View>
          <Text center style={styles.caption} variant="heading">
            {title}
          </Text>
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    // Deliberately a literal rather than a token: this is a scrim over whatever
    // happens to be behind it, not a surface in either palette, and it has to
    // be the same darkness in both schemes to do its job.
    backgroundColor: 'rgba(6, 7, 20, 0.82)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  stage: { width: '100%', gap: spacing.lg },
  frame: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: radius.xl,
    padding: spacing.xl,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  caption: { color: '#FFFFFF' },
});
