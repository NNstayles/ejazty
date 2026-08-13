/**
 * One Learn card: a catalogue record or a study note.
 *
 * Pulled out of `app/(tabs)/learn/[section].tsx`, where it lived as a local
 * `memo` sharing that screen's StyleSheet. It moved because it is now rendered
 * by three screens — the section list, Saved, and global search — and a card
 * that looks different depending on which list it is in would be the obvious
 * defect. The screen-level styles (the search box, the sticky group header, the
 * empty state) stayed behind; only the card's own came with it.
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Artwork } from '@/components/ui/artwork';
import { Badge, Card } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import type { DashboardColour } from '@/content/schema';
import {
  toggleBookmark,
  useIsBookmarked,
} from '@/features/learn/bookmarks';
import type { Entry } from '@/features/learn/entries';
import { selectionTap } from '@/lib/haptics';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

/** Severity colour for a dashboard tell-tale, by the convention in `schema`. */
export function severityTone(
  colour: DashboardColour,
  colors: ReturnType<typeof useTheme>['colors'],
): string {
  switch (colour) {
    case 'red':
      return colors.danger;
    case 'amber':
      return colors.warning;
    case 'green':
      return colors.success;
    case 'blue':
      return colors.info;
    case 'white':
      return colors.textMuted;
  }
}

/**
 * The save control.
 *
 * Its own component, and that is the whole reason a toggle can sit on a row of
 * a 111-card virtualised list at all: it subscribes to *its own id* through
 * `useIsBookmarked`, so saving a card re-renders one button rather than the
 * card, the list, or the screen holding the list. The alternative — passing
 * `saved` down as a prop — means the screen owns the set, and every tap
 * re-renders every mounted row to change one glyph.
 */
const SaveButton = memo(function SaveButton({
  entry,
  label,
  savedLabel,
}: {
  entry: Entry;
  label: string;
  savedLabel: string;
}) {
  const { colors } = useTheme();
  const saved = useIsBookmarked(entry.id);

  return (
    <Pressable
      accessibilityLabel={saved ? savedLabel : label}
      accessibilityRole="button"
      accessibilityState={{ selected: saved }}
      // The glyph is 20pt in a 24pt box, so the touch area comes from
      // `hitSlop` rather than from padding — padding would widen the row and
      // push the title around. 24 + 12 on each side is 48, over the 44pt both
      // platforms publish as the minimum. It sits at the end of a title row,
      // which is exactly where an undersized target gets missed or hit by
      // accident.
      hitSlop={12}
      onPress={() => {
        selectionTap();
        toggleBookmark(entry.id);
      }}
      style={styles.save}>
      <Ionicons
        color={saved ? colors.primary : colors.textFaint}
        name={saved ? 'bookmark' : 'bookmark-outline'}
        size={20}
      />
    </Pressable>
  );
});

/**
 * Memoised so scrolling only mounts and paints the rows entering the window —
 * the signs section alone is 111 cards, each with its own image.
 */
export const EntryCard = memo(function EntryCard({
  entry,
  unofficialLabel,
  severityLabel,
  saveLabel,
  savedLabel,
  onOpenArtwork,
}: {
  entry: Entry;
  unofficialLabel: string;
  severityLabel: string | null;
  saveLabel: string;
  savedLabel: string;
  /**
   * Opens the enlarged view.
   *
   * The open state lives on the screen rather than on each card: with a
   * hundred-odd cards mounted, a `useState` per card is a hundred pieces of
   * state to hold exactly one boolean between them, and two cards could open at
   * once during a recycle.
   */
  onOpenArtwork: (entry: Entry) => void;
}) {
  const { colors } = useTheme();

  // Dashboard tell-tales are drawn on a dark backing plate, the way they are
  // lit on a real instrument cluster — which is also what keeps a white or
  // amber glyph legible in light mode.
  const isTile = entry.colour !== undefined;
  // Resolved on demand rather than as a map built per card: only dashboard
  // entries carry a severity at all, and this component mounts ninety-odd
  // times in one scroll.
  const severityColour = entry.colour ? severityTone(entry.colour, colors) : null;

  return (
    // No surface texture: this card is a row in a virtualised list that runs to
    // 111 entries, so the SVG would be re-mounted on every pass through the
    // section. See `Card`.
    <Card style={styles.card} texture={false}>
      <View style={styles.titleRow}>
        {/*
          The tell-tale, as the publisher's own artwork — see `LICENSE-gofar.md`
          for the grant that allows it. This replaced a set of hand-drawn SVG
          glyphs that existed only because the artwork could not be licensed at
          the time; they were deleted once it could.

          `contentFit="contain"` rather than `cover`, and it is load-bearing
          rather than a default: every icon is square today, so the two agree —
          but `cover` crops whatever does not fit, so the day a wider tile is
          added it would lose its own edges silently. `contain` fits it into the
          plate instead. The normalise step writes every icon onto one 200px
          square canvas, so they already share a size and a position; this is
          the second half of that guarantee, held at render time.

          The plate stays behind it. The artwork carries its own black ground,
          but it is padded to a square while the plate is rounded, so the plate
          is what fills the corners the icon's own ground does not reach.

          `severityColour` is no longer applied to the glyph — the artwork is
          already coloured, and tinting it would overwrite the very distinction
          the section teaches. It still colours the severity label below.

          Not tappable, unchanged: the zoom exists for the scanned exam
          photographs, where detail is genuinely lost at list size. A 200px icon
          shown at 56pt has nothing further to reveal.
        */}
        {isTile && entry.image ? (
          <View style={[styles.tile, { backgroundColor: colors.artworkPlate }]}>
            <Image
              cachePolicy="memory-disk"
              contentFit="contain"
              recyclingKey={entry.id}
              source={entry.image}
              style={styles.tileImage}
            />
          </View>
        ) : null}

        <View style={styles.titleText}>
          <Text variant="heading">{entry.title}</Text>
          {severityLabel && severityColour ? (
            <Text style={{ color: severityColour }} variant="overline">
              {severityLabel.toUpperCase()}
            </Text>
          ) : null}
        </View>

        {!entry.official ? (
          <Badge label={unofficialLabel} tone="warning" />
        ) : null}

        <SaveButton entry={entry} label={saveLabel} savedLabel={savedLabel} />
      </View>

      {/*
        No cross-fade: this is a virtualised list, so a flick through the
        section would otherwise be a dozen independent fades happening under a
        moving finger. See `Artwork` for the plate and the shared height.
      */}
      {entry.image && !isTile ? (
        <Artwork
          label={entry.title}
          onPress={() => onOpenArtwork(entry)}
          recyclingKey={entry.id}
          source={entry.image}
        />
      ) : null}

      {/*
        A study note's paragraph carries no label. The catalogue cards below it
        do, because "What it means" and "What you must do" are different things
        a reader looks up separately — but an overline over ordinary prose reads
        as a form rather than as something to read.
      */}
      {entry.body ? <Text variant="body">{entry.body}</Text> : null}

      {entry.points?.length ? (
        <View style={styles.points}>
          {entry.points.map((point, position) => (
            // The row inherits `direction` from the root, so the marker sits on
            // the reading-start side in all three languages without a physical
            // edge anywhere in here.
            //
            // Keyed by position rather than by the text. A note's points are a
            // fixed list that is never reordered or filtered, so the index is
            // stable — and two points that happen to read the same in one of
            // the three languages would otherwise collide, which React resolves
            // by dropping one of them silently.
            <View key={`${entry.id}-${position}`} style={styles.point}>
              <View
                style={[styles.bullet, { backgroundColor: colors.primary }]}
              />
              <Text style={styles.pointText} variant="body">
                {point}
              </Text>
            </View>
          ))}
        </View>
      ) : null}

      {entry.blocks.map((block) => (
        <View key={block.label} style={styles.block}>
          <Text tone="textMuted" variant="overline">
            {block.label.toUpperCase()}
          </Text>
          <Text variant="body">{block.value}</Text>
        </View>
      ))}
    </Card>
  );
});

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  titleText: { flex: 1, gap: 2 },
  tile: {
    width: 56,
    height: 56,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  tileImage: { width: '100%', height: '100%' },
  // Sized so the glyph is optically centred against the title beside it; the
  // touch area comes from `hitSlop` rather than from padding, which would push
  // the title's own width around.
  save: { width: 24, alignItems: 'center', justifyContent: 'center' },
  block: { gap: spacing.xs },
  points: { gap: spacing.sm },
  point: {
    flexDirection: 'row',
    gap: spacing.sm,
    // Start-aligned rather than centred: a point that wraps to three lines
    // would otherwise float its bullet down beside the middle of the run.
    alignItems: 'flex-start',
  },
  bullet: {
    width: 5,
    height: 5,
    borderRadius: radius.pill,
    // Nudged down to sit on the first line's optical centre. A bullet aligned
    // to the top of the text box reads as sitting above the line it belongs to.
    marginTop: 9,
  },
  pointText: { flex: 1 },
});
