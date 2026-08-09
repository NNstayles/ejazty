import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { memo, useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, StyleSheet, TextInput, View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { Artwork } from '@/components/ui/artwork';
import { ArtworkViewer } from '@/components/ui/artwork-viewer';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { Badge, Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import type { DashboardColour } from '@/content/schema';
import {
  buildGroups,
  type Entry,
  type EntryGroup,
} from '@/features/learn/entries';
import {
  isLearnSectionId,
  SECTION_TITLE_KEYS,
  type LearnSectionId,
} from '@/features/learn/sections';
import { foldForSearch } from '@/i18n/fold';
import { duration as motionDuration, easing, useMotion } from '@/lib/motion';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

/** Severity colour for a dashboard tell-tale, by the convention in `schema`. */
function severityTone(
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
 * Memoised so scrolling only mounts and paints the rows entering the window —
 * the signs section alone is 111 cards, each with its own image.
 */
const EntryCard = memo(function EntryCard({
  entry,
  unofficialLabel,
  severityLabel,
  onOpenArtwork,
}: {
  entry: Entry;
  unofficialLabel: string;
  severityLabel: string | null;
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

/**
 * The section search box.
 *
 * Pulled out of the screen body so its focus state does not live on the screen:
 * a `useState` up there would re-render the whole `FlatList` header — and on
 * the signs section that is a 111-row list — every time the keyboard opened.
 *
 * The focus ring is animated rather than switched because this is the one
 * control on the screen, and a border that snaps between two colours is the
 * detail that makes a form feel like a form rather than an app.
 */
function SearchField({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
}) {
  const { colors, inputAlign, writingDirection } = useTheme();
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
        { backgroundColor: colors.surface, shadowColor: colors.primary, shadowRadius: 10 },
        ringStyle,
      ]}>
      <Ionicons
        color={focused ? colors.primary : colors.textFaint}
        name="search"
        size={18}
      />
      <TextInput
        autoCorrect={false}
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
        style={[
          styles.searchInput,
          { color: colors.text, textAlign: inputAlign, writingDirection },
        ]}
        value={value}
      />
    </Animated.View>
  );
}

export default function LearnSectionScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const motion = useMotion();
  const { language } = usePreferences();
  const clearance = useTabBarClearance();
  const params = useLocalSearchParams<{ section: string }>();
  const [query, setQuery] = useState('');
  /** The entry whose artwork is open, or null. One per screen — see `EntryCard`. */
  const [viewing, setViewing] = useState<Entry | null>(null);

  /**
   * Set the moment the reader first drags the list.
   *
   * An entrance animation belongs to the screen arriving. Once the list has
   * been touched, a cell mounting is just virtualisation doing its job, and
   * animating it reads as the list stuttering. A ref rather than state because
   * nothing needs to re-render when it flips: the only reader is `renderItem`,
   * which the list already calls again for every cell it mounts.
   */
  const settled = useRef(false);

  // Bound to a local first: the type guard narrows the value it is handed, and
  // narrowing `params.section ?? ''` inline leaves `params.section` itself
  // still `string | undefined` at the point it is read back.
  const requested = params.section ?? '';
  const section: LearnSectionId = isLearnSectionId(requested)
    ? requested
    : 'signs';

  const groups = useMemo(
    () => buildGroups(section, language, t),
    [section, language, t],
  );

  const filtered = useMemo(() => {
    // Folded exactly as `Entry.search` was, or the two sides never meet: an
    // Arabic reader types `الدوار` and the note is written `الدوّار`. See
    // `i18n/fold.ts` for what that folding covers and why one-sided folding
    // moves the bug rather than fixing it.
    const q = foldForSearch(query);
    if (!q) return groups;
    // Empty groups are dropped rather than left as a heading with nothing
    // under it — a sticky "Warning signs" bar over a gap reads as a failed
    // load rather than as a search that matched elsewhere.
    return groups
      .map((g) => ({ ...g, data: g.data.filter((e) => e.search.includes(q)) }))
      .filter((g) => g.data.length > 0);
  }, [groups, query]);

  const unofficialLabel = t('content.unofficial');

  // A single group gets no heading: the only thing it could say is what the
  // navigation bar directly above it already says.
  const showHeadings = filtered.length > 1;

  /**
   * Running index across groups, so the entrance stagger counts rows as the
   * reader sees them rather than restarting at zero in each group — which
   * would replay the whole animation partway down the first screen.
   *
   * A `Map` keyed by the group object rather than a parallel array indexed by
   * position. The array form made `renderItem` call `filtered.indexOf(group)`
   * on **every row it mounts**, which is a linear scan of the sections run
   * inside the one function a virtualised list calls most — and it grows with
   * the section rather than staying constant. Rules declares eleven groups.
   */
  const groupOffsets = useMemo(() => {
    const offsets = new Map<EntryGroup, number>();
    let total = 0;
    for (const g of filtered) {
      offsets.set(g, total);
      total += g.data.length;
    }
    return offsets;
  }, [filtered]);

  // Stable, so handing it to the list does not give `SectionList` a new prop
  // identity on every render of this screen.
  const handleScrollBeginDrag = useCallback(() => {
    settled.current = true;
  }, []);

  /*
    The tab bar floats over this list rather than sitting under it, so the
    clearance has to be padded in explicitly or the last card is permanently
    half-covered. `styles.listContent` still carries the padding; only the
    bottom is overridden.

    It carries **no `gap`**, and must not be given one — that is what produced
    the road-priority scroll jump. `VirtualizedList` estimates an unmeasured
    cell's offset from measured cell *heights*, and a container gap is not part
    of any cell's height, so every unmeasured row was estimated one gap short
    and the list lurched when they mounted and reported their real positions.
    The row spacing lives in `styles.cell` instead. See `cell` and `search`.

    Memoised because it was an array literal in the JSX, so every render of this
    screen — including every keystroke in the search box — handed the list a new
    `contentContainerStyle` identity for a value that only depends on the safe
    area inset.
  */
  const listContentStyle = useMemo(
    () => [styles.listContent, { paddingBottom: clearance }],
    [clearance],
  );

  const renderItem = useCallback(
    ({
      item,
      index,
      section: group,
    }: {
      item: Entry;
      index: number;
      section: EntryGroup;
    }) => {
      const card = (
        <EntryCard
          entry={item}
          onOpenArtwork={setViewing}
          severityLabel={item.colour ? t(`learn.severity.${item.colour}`) : null}
          unofficialLabel={unofficialLabel}
        />
      );

      const position = (groupOffsets.get(group) ?? 0) + index;

      // Two bounds, and both are needed.
      //
      // `FIRST_SCREEN` stops rows far down the list sliding in under a moving
      // finger, which reads as the list struggling to keep up rather than as
      // polish. It does nothing for the rows above it, though: those replay
      // their whole staggered entrance every time virtualisation unmounts them
      // and the reader scrolls back up.
      //
      // That is what made road priority stutter. Its `pictures` group is 24
      // cards carrying a 160pt diagram plus a paragraph, so one flick pushes
      // rows 0 to 7 out of a seven-viewport window; coming back up remounted
      // them and re-ran the fade. `settled` closes it by scope rather than by
      // position: after the first drag, nothing on this screen animates in.
      //
      // **The wrapper is unconditional, and only `entering` is switched off.**
      // Returning a bare card in one case and a wrapped one in the other put a
      // *different element type* at the same position, so the first re-render
      // after `settled` flipped tore down the whole subtree and built it again
      // — dropping the mounted `Image` and re-attaching it, which is a card
      // going blank and repainting at the exact moment the reader starts to
      // drag. Reanimated reads `entering` once, at mount, so an `undefined`
      // here is genuinely no animation rather than a suppressed one.
      const animate = !settled.current && position < FIRST_SCREEN;
      return (
        <Animated.View
          entering={animate ? motion.entrance(position) : undefined}
          style={styles.cell}>
          {card}
        </Animated.View>
      );
    },
    [t, unofficialLabel, motion, groupOffsets],
  );

  const renderSectionHeader = useCallback(
    ({ section: group }: { section: EntryGroup }) => {
      if (!showHeadings) return null;
      return (
        <View style={[styles.groupHeader, { backgroundColor: colors.background }]}>
          <Text tone="textMuted" variant="overline">
            {group.title.toUpperCase()}
          </Text>
          <Text tone="textFaint" variant="overline">
            {group.data.length}
          </Text>
        </View>
      );
    },
    [colors.background, showHeadings],
  );

  return (
    <>
      <Stack.Screen options={{ title: t(SECTION_TITLE_KEYS[section]) }} />
      <Screen edges={[]} scroll={false}>
        <SectionList
          ListEmptyComponent={
            /*
              Fades in rather than appearing outright. Every other thing on this
              screen has an entrance, so the empty state was the one element that
              snapped into place — and it arrives at the worst moment for that,
              mid-typing, replacing a list that was there a keystroke ago.

              Safe to animate despite sitting in a component rebuilt on every
              keystroke: React reconciles this by element type, and the type
              never changes, so the subtree updates rather than remounting.
              Reanimated reads `entering` once at mount, so the fade plays when
              the empty state first appears and not again on each letter typed.
              `motion.appear` is undefined under reduced motion, which is
              genuinely no animation rather than a suppressed one.
            */
            <Animated.View entering={motion.appear()} style={styles.empty}>
              <View
                style={[styles.emptyIcon, { backgroundColor: colors.surfaceAlt }]}>
                <Ionicons
                  color={colors.textFaint}
                  name={query ? 'search-outline' : 'file-tray-outline'}
                  size={28}
                />
              </View>
              {/*
                Clamped, because the query is interpolated into the message and
                nothing bounds what can be typed or pasted into the box. A long
                paste otherwise renders as a wall of text that pushes the icon
                off screen and leaves no clue that this is the empty state.
              */}
              <Text center numberOfLines={3} tone="textMuted">
                {query ? t('learn.noMatches', { query }) : t('learn.empty')}
              </Text>
            </Animated.View>
          }
          ListHeaderComponent={
            <SearchField
              onChange={setQuery}
              placeholder={t('learn.searchPlaceholder')}
              value={query}
            />
          }
          // The search box is this list's header, so with the keyboard up the
          // matches it produced are what sits behind it. Same iOS-only inset
          // the `Screen` scroll view takes; this list is its own scrollable and
          // does not inherit it.
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={listContentStyle}
          initialNumToRender={5}
          keyExtractor={keyExtractor}
          keyboardShouldPersistTaps="handled"
          /*
            The cure for the road-priority scroll jump, where the container-`gap`
            fix and `windowSize` below were only mitigations.

            `VirtualizedList` estimates an unmeasured cell's offset as
            `index * averageCellLength`, averaged over the cells it has actually
            measured — and this section's rows are not one size. `order` and
            `scenarios` are 13 text-only cards; `pictures` is 24 cards carrying a
            160pt diagram on top of the same text, so roughly twice as tall.
            Scrolling into the pictures group means every cell ahead is guessed
            using an average the short cards above have dragged down, so each is
            guessed short and the error compounds with the index. When those
            cells mount and report their real heights, the content grows under a
            contentOffset that did not move — which the reader sees as the list
            jumping, and then as it *drifting*, because each correction pulls new
            cells into the window whose measurement corrects it again.

            That is why the report is "two lanes merging where the broken line
            stops" specifically: it is row 26 of 37, deep enough into the tall
            group for the accumulated error to have exceeded a whole row.

            This does not make the estimates right — it makes them harmless. The
            native side records the offset of the first visible cell before a
            content-size change and restores it afterwards, so a correction above
            the viewport no longer moves what is under the reader's eye.

            `minIndexForVisible: 0` counts from the first *data* row:
            `VirtualizedList` adds one itself to skip `ListHeaderComponent`, so
            the search box is never chosen as the anchor. That also disposes of
            the documented caveat about reordering content — the only thing that
            reorders this list is the search filter, and the box you type into is
            the list's own header, so it has to be on screen for a query to
            change at all.
          */
          maintainVisibleContentPosition={KEEP_VISIBLE_ROW_STILL}
          /*
            Back down from seven-per-thirty-milliseconds, because the thing
            that setting was compensating for is gone.

            These two are a throughput cap, and the previous values raised it
            to outrun the decode of road priority's artwork — which at the time
            was a megapixel PNG per card, up to 2.8 MB, and slow enough that a
            flick outran the list and rendered as blank space. That artwork is
            now JPEG capped at 1000px on the long edge (48.4 MB across the set
            down to 10.8 MB), so the decode no longer sets the pace.

            The cap is not free in the other direction. A batch is rendered and
            committed in one go, and a road-priority row is a 160pt diagram
            plus a paragraph plus a bulleted list — seven of those in a single
            commit is a long frame, and long frames during a fling are what a
            reader feels as the list lurching rather than as it filling. Five
            per fifty milliseconds is still comfortably ahead of a JPEG decode
            and halves the worst-case commit. `windowSize` is untouched: it is
            what bounds how much stays mounted, and that was never the problem.
          */
          maxToRenderPerBatch={5}
          onScrollBeginDrag={handleScrollBeginDrag}
          // `removeClippedSubviews` is deliberately off. It detaches the native
          // views of cells that are mounted but outside the viewport, and its
          // documented failure mode is exactly the symptom this screen had:
          // content going missing during a scroll. The tall cards in road
          // priority and the 111 images in the signs catalogue are the worst
          // case for it, and it buys little here because `windowSize` already
          // bounds how much is mounted at once and `EntryCard` is memoised.
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          sections={filtered}
          showsVerticalScrollIndicator={false}
          // The heading stays put while its own group scrolls under it, which
          // is the whole reason to group a 181-card list: it answers "where am
          // I" without the reader having to scroll back up to find out.
          stickySectionHeadersEnabled
          updateCellsBatchingPeriod={50}
          /*
            Raised from 7, and for a different reason than the one the earlier
            note here dismissed it for.

            That note was right that `windowSize` was not what caused blank
            cells during a fling — that was the PNG decode, and it is gone. This
            is the *other* failure, the one the container-`gap` fix was aimed at
            and did not fully close: the frame table.

            `VirtualizedList` estimates an unmeasured cell's offset as
            `index * averageCellLength`, and that average is taken over the
            cells it has actually measured. Road priority is three groups whose
            rows are not the same size — `order` and `scenarios` are text-only
            cards, `pictures` is 23 cards each carrying a 160pt diagram on top
            of the same text, so roughly twice the height. Scrolling into the
            pictures group means every cell ahead is estimated using an average
            that the short cards above have dragged down, so each one is guessed
            short, the error accumulates with the index, and when those cells
            finally mount and report their real heights the list corrects its
            content offset in one step. That correction is the jump, and it
            appears partway *into* the pictures group rather than at its start
            because that is where the accumulated error first exceeds a row.

            A larger window measures further ahead of the viewport, so fewer
            cells are guessed at and each correction is smaller. It is a
            mitigation and not a cure, and on its own it was not enough — the
            jump was still reported at row 26 of road priority. The cure is
            `maintainVisibleContentPosition` above, which absorbs the correction
            instead of shrinking it. (`getItemLayout` would be the other cure and
            is not available here: it must return exact heights, and the body
            text reflows differently in all three languages.)

            Kept at 13 regardless. It is doing separate work now — fewer and
            smaller corrections still means less for the anchor to absorb — and
            lowering it in the same change that fixed the jump would leave two
            variables moving at once.

            The cost is real but bounded, and much cheaper than when this was
            last tuned: more cells stay mounted, and the artwork behind them is
            now a ~40 KB JPEG rather than a megabyte-plus PNG.
          */
          windowSize={13}
        />
      </Screen>

      {viewing?.image ? (
        <ArtworkViewer
          onClose={() => setViewing(null)}
          plate={viewing.colour !== undefined}
          source={viewing.image}
          title={viewing.title}
        />
      ) : null}
    </>
  );
}

const keyExtractor = (entry: Entry) => entry.id;

/** How many rows get an entering animation. See `renderItem`. */
const FIRST_SCREEN = 8;

/**
 * Anchors the first visible row against the frame table's corrections. See the
 * prop on the `SectionList` for what it is fixing.
 *
 * Module scope rather than an object literal in the JSX, so the list is not
 * handed a new identity for an unchanging value on every keystroke in the
 * search box — this one crosses to the native scroll view.
 */
const KEEP_VISIBLE_ROW_STILL = { minIndexForVisible: 0 } as const;

const styles = StyleSheet.create({
  /*
    No `gap` here, deliberately, and this is the fix for the road-priority
    scroll jump rather than a style preference.

    `VirtualizedList` keeps a frame table of cell offsets built from each
    cell's own `onLayout`. For a cell it has never measured it *approximates*,
    and the approximation is `index * averageCellLength` — an average taken
    over measured cell **heights**. A `gap` on the content container is not
    part of any cell's height: it is space the flex container inserts between
    them. So every unmeasured row was estimated 16pt short, the error
    compounding with the row index — roughly 600pt across this section's 38
    rows — and the moment those cells mounted and reported their real
    positions the list corrected its content offset in one step. That
    correction is the jump.

    It is worst here for the reason road priority is worst at everything else:
    its rows are the tallest in the app (a 160pt diagram plus a paragraph plus
    a bulleted list), so the fewest are measured at any moment and the most are
    being guessed at.

    Removing the `gap` was necessary and not sufficient: it took away one fixed
    16pt of error per row, but the rows in this section genuinely differ in
    height, so the estimate stayed wrong and the jump came back further down.
    `maintainVisibleContentPosition` on the list is what closes it.

    The spacing is now carried *inside* the cells — `cell` below and the
    header's own padding — where `onLayout` reports it and the frame table is
    therefore right. Same rule applies to any virtualised list in this app;
    the exam result screen had it too.
  */
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  /** The row gap, moved into the measured cell. See `listContent`. */
  cell: { marginBottom: spacing.lg },
  search: {
    // Was the content container's `gap`; see `listContent` for why it moved.
    marginBottom: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  searchInput: { flex: 1, paddingVertical: spacing.md, fontSize: 16 },
  empty: {
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.xxl,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    // Asymmetric, and both halves are carrying the row gap that used to come
    // from the content container — 8 above (the card before it contributes its
    // own 16 through `cell`) and 24 below, which is what the gap gave. Keeping
    // it as padding rather than margin also widens the opaque plate that pins
    // over the content, so more of the card passing underneath is covered.
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    // A sticky header must be opaque across the full width or cards show
    // through beside it as it pins. The negative margins pull the plate out
    // past the list's own horizontal padding, and the matching padding puts
    // the text back where it was.
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
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
