// The per-family entry point, never the package root. `@expo/vector-icons`'s
// index re-exports every family it ships and each one is a `require` of a
// `.ttf`, which Metro resolves eagerly — so a root import bundles ~20 icon
// fonts to use one. Same rule, and the same reason, as the per-weight font
// imports in `app/_layout.tsx`.
import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import { PressableScale } from './pressable-scale';

/**
 * A piece of question or catalogue artwork, at thumbnail size, tappable to
 * open full-width.
 *
 * ## Why this is one component and not three call sites
 *
 * The same picture appears in three places — the Learn catalogue, the exam
 * runner and the result review — and it used to be written out separately in
 * each, which is how it ended up drawn at **three different heights** (160,
 * 180 and 150). Nothing chose those numbers against each other; they drifted,
 * and the comments left behind describe each other's sizes ("a 180pt card",
 * "a 150pt thumbnail") as though they were fixed points. A learner meeting the
 * same right-of-way diagram in the exam and then again in the review sees it
 * resize for no reason.
 *
 * Two substantive fixes came with the merge, both of which had been made in
 * one copy and not the others:
 *
 * - **The opaque plate is now everywhere.** Only the Learn copy had it. These
 *   are scanned photographs, so a cell that mounts mid-scroll has a decode to
 *   finish before it can paint; without a plate that gap is a white hole
 *   punched in the card, and with one it is a picture that has not arrived
 *   yet. The exam runner and the review are exactly where a white flash costs
 *   the most, and they were the two without it.
 * - **The cross-fade is opt-in, and off inside a list.** A fade is worth
 *   having when a single image arrives on a still screen, and costs legibility
 *   when twelve do on a moving one — so the runner (one image, still screen)
 *   asks for it and the two virtualised lists do not. The review list was
 *   running a fade per cell despite being a `FlatList`, which is the bug the
 *   Learn list had already had removed.
 *
 * ## `contentFit="contain"`, and why the box is fixed
 *
 * The artwork is not one shape: measured across the 142 exam scans and 111
 * signs, it runs from about 0.36 (a tall pedestrian-crossing plate) to 1.96 (a
 * wide junction diagram), clustering near square. `contain` inside a fixed box
 * is what makes a list of them scan — every card's text starts at the same
 * offset — and it centres each picture in the space it does not fill, which is
 * the only position that is correct for both a tall plate and a wide diagram.
 * Sizing each card to its own image instead would ripple the text down the
 * page and give the frame table a different height per row, which is the other
 * half of the scroll-jump problem documented in `learn/[section].tsx`.
 */

/**
 * The one height, in points.
 *
 * 160 is the value the largest list was tuned at — the Learn catalogue is 111
 * rows and is where a wrong height is felt most — and it sits between the two
 * numbers it replaces. Anything taller pushes a picture question's stem off a
 * small screen; anything shorter and the junction diagrams stop being readable
 * without opening them.
 */
export const ARTWORK_HEIGHT = 160;

export function Artwork({
  source,
  label,
  onPress,
  recyclingKey,
  /**
   * Cross-fade the image in as it decodes.
   *
   * Leave this off inside a virtualised list — see the note above. It is for a
   * single image arriving on a screen that is holding still.
   */
  fade = false,
}: {
  source: ImageSourcePropType;
  /** Accessible name — the sign's title, or the question's stem. */
  label: string;
  onPress: () => void;
  /**
   * Identity of the thing being drawn, so a recycled row never shows the
   * previous item's picture under this item's caption.
   */
  recyclingKey: string;
  fade?: boolean;
}) {
  const { colors } = useTheme();

  return (
    <PressableScale
      accessibilityLabel={label}
      accessibilityRole="imagebutton"
      onPress={onPress}>
      <Image
        cachePolicy="memory-disk"
        contentFit="contain"
        recyclingKey={recyclingKey}
        source={source}
        style={[styles.image, { backgroundColor: colors.surfaceAlt }]}
        transition={fade ? 120 : undefined}
      />
      {/*
        An affordance, because a tappable image with no chrome is a feature
        nobody finds. Small, low-contrast and in the trailing corner — it has to
        be discoverable without competing with the artwork, which is the thing
        being studied.

        `end` rather than `right`, so it sits in the trailing corner in all
        three languages rather than pinning itself to the Latin one.
      */}
      <View style={[styles.zoomHint, { backgroundColor: colors.surfaceAlt }]}>
        <Ionicons color={colors.textMuted} name="expand-outline" size={14} />
      </View>
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: ARTWORK_HEIGHT,
    borderRadius: radius.md,
  },
  zoomHint: {
    position: 'absolute',
    bottom: spacing.sm,
    end: spacing.sm,
    width: 26,
    height: 26,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
