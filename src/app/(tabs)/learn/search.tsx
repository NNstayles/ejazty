/**
 * Search across every Learn section at once.
 *
 * The gap this closes: search was per-section, so looking up "roundabout" meant
 * first guessing which of seven lists it was in — and the answer is genuinely
 * not obvious, since a roundabout is a priority rule, a sign, and a marking. A
 * reader who guessed wrong got an empty state that looks exactly like the app
 * not having the material at all.
 *
 * The per-section box stays. It is the right tool once you are *in* a section
 * and know roughly where you are; this is the one for when you do not.
 *
 * ## Why matches are grouped by section rather than listed flat
 *
 * A flat list of 40 hits across five sections reads as one undifferentiated
 * pile, and the reader's next question is always the same one — which of these
 * is the *rule* and which is the sign. Grouping answers it before they ask, and
 * the group heading is the link into the section, so a search that turns out to
 * be about the wrong thing is one tap from the right list.
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SectionList, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { EntryCard } from '@/components/learn/entry-card';
import { SearchField } from '@/components/learn/search-field';
import { ArtworkViewer } from '@/components/ui/artwork-viewer';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { searchEntries, type Entry } from '@/features/learn/entries';
import {
  SECTION_IDS,
  SECTION_TITLE_KEYS,
  type LearnSectionId,
} from '@/features/learn/sections';
import { useMotion } from '@/lib/motion';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

type ResultGroup = { section: LearnSectionId; data: Entry[] };

/** How many rows get an entering animation. Matches the section list. */
const FIRST_SCREEN = 8;

export default function LearnSearchScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const motion = useMotion();
  const router = useRouter();
  const { language } = usePreferences();
  const clearance = useTabBarClearance();
  const [query, setQuery] = useState('');
  const [viewing, setViewing] = useState<Entry | null>(null);

  const settled = useRef(false);
  const handleScrollBeginDrag = useCallback(() => {
    settled.current = true;
  }, []);

  /**
   * Grouped in `SECTION_IDS` order — study order — rather than by how many hits
   * each section produced. A result list that rearranges its own headings as
   * you type is one nobody can build a habit around, and "most hits" is not a
   * relevance ranking anyway: it mostly reports which section is longest.
   */
  const groups = useMemo<ResultGroup[]>(() => {
    const hits = searchEntries(query, language, t);
    if (hits.length === 0) return [];
    const buckets = new Map<LearnSectionId, Entry[]>();
    for (const { entry, section } of hits) {
      const bucket = buckets.get(section);
      if (bucket) bucket.push(entry);
      else buckets.set(section, [entry]);
    }
    return SECTION_IDS.flatMap((section) => {
      const data = buckets.get(section);
      return data ? [{ section, data }] : [];
    });
  }, [query, language, t]);

  const total = useMemo(
    () => groups.reduce((sum, g) => sum + g.data.length, 0),
    [groups],
  );

  const unofficialLabel = t('content.unofficial');
  const saveLabel = t('learn.save');
  const savedLabel = t('learn.saved');

  const listContentStyle = useMemo(
    // No `gap`; the row spacing is inside the cell. See the Learn section list.
    () => [styles.listContent, { paddingBottom: clearance }],
    [clearance],
  );

  const groupOffsets = useMemo(() => {
    const offsets = new Map<ResultGroup, number>();
    let running = 0;
    for (const group of groups) {
      offsets.set(group, running);
      running += group.data.length;
    }
    return offsets;
  }, [groups]);

  const renderItem = useCallback(
    ({
      item,
      index,
      section: group,
    }: {
      item: Entry;
      index: number;
      section: ResultGroup;
    }) => {
      const position = (groupOffsets.get(group) ?? 0) + index;
      return (
        <Animated.View
          entering={
            !settled.current && position < FIRST_SCREEN
              ? motion.entrance(position)
              : undefined
          }
          style={styles.cell}>
          <EntryCard
            entry={item}
            onOpenArtwork={setViewing}
            saveLabel={saveLabel}
            savedLabel={savedLabel}
            severityLabel={
              item.colour ? t(`learn.severity.${item.colour}`) : null
            }
            unofficialLabel={unofficialLabel}
          />
        </Animated.View>
      );
    },
    [groupOffsets, motion, saveLabel, savedLabel, t, unofficialLabel],
  );

  const renderSectionHeader = useCallback(
    ({ section: group }: { section: ResultGroup }) => (
      // The heading is the way into the section, not just a label. A reader who
      // searched the wrong word usually wants the list, not the one card that
      // happened to match.
      <PressableScale
        accessibilityRole="button"
        onPress={() => router.push(`/learn/${group.section}`)}
        scaleTo={0.99}
        style={[styles.groupHeader, { backgroundColor: colors.background }]}>
        <Text tone="textMuted" variant="overline">
          {t(SECTION_TITLE_KEYS[group.section]).toUpperCase()}
        </Text>
        <View style={styles.groupMeta}>
          <Text tone="textFaint" variant="overline">
            {group.data.length}
          </Text>
          <Ionicons color={colors.textFaint} name="arrow-forward" size={12} />
        </View>
      </PressableScale>
    ),
    [colors.background, colors.textFaint, router, t],
  );

  return (
    <>
      <Stack.Screen options={{ title: t('learn.searchTitle') }} />
      <Screen edges={[]} scroll={false}>
        <SectionList
          ListEmptyComponent={
            <Animated.View entering={motion.appear()} style={styles.empty}>
              <View
                style={[styles.emptyIcon, { backgroundColor: colors.surfaceAlt }]}>
                <Ionicons
                  color={colors.textFaint}
                  name="search-outline"
                  size={28}
                />
              </View>
              {/*
                Two states, not one. Before anything is typed the screen has to
                say what it searches — "nothing matches" would be a lie about an
                empty box. Once a query has been typed and missed, the query is
                clamped, because nothing bounds what can be pasted in and a long
                paste otherwise pushes the icon off the screen.
              */}
              <Text center numberOfLines={3} tone="textMuted">
                {query
                  ? t('learn.noMatches', { query })
                  : t('learn.searchPrompt')}
              </Text>
            </Animated.View>
          }
          ListHeaderComponent={
            <View style={styles.header}>
              <SearchField
                // The only auto-focused input in the app, and it is warranted
                // here in a way it is not on the section list: this screen has
                // no other purpose and nothing else to read, so arriving with
                // the keyboard closed costs a tap for nothing.
                autoFocus
                clearLabel={t('common.clear')}
                onChange={setQuery}
                placeholder={t('learn.searchAllPlaceholder')}
                value={query}
              />
              {total > 0 ? (
                <Text tone="textFaint" variant="caption">
                  {t('learn.searchResults', { count: total })}
                </Text>
              ) : null}
            </View>
          }
          automaticallyAdjustKeyboardInsets
          contentContainerStyle={listContentStyle}
          initialNumToRender={5}
          keyExtractor={keyExtractor}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          maxToRenderPerBatch={5}
          onScrollBeginDrag={handleScrollBeginDrag}
          renderItem={renderItem}
          renderSectionHeader={renderSectionHeader}
          sections={groups}
          showsVerticalScrollIndicator={false}
          stickySectionHeadersEnabled
          updateCellsBatchingPeriod={50}
          windowSize={11}
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

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  /** The row gap, inside the measured cell. See `listContent`. */
  cell: { marginBottom: spacing.lg },
  header: { gap: spacing.sm, marginBottom: spacing.lg },
  groupHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xl,
    // A sticky header must be opaque across the full width or cards show
    // through beside it as it pins. The negative margins pull the plate out
    // past the list's own horizontal padding; the matching padding puts the
    // text back where it was.
    marginHorizontal: -spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
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
});
