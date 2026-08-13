/**
 * The cards the learner has saved, newest first.
 *
 * Reached from the Learn home. It is a pushed screen rather than a tab because
 * it is empty until somebody saves something, and a permanently-visible tab
 * that is usually empty teaches people to ignore it.
 *
 * ## Rows do not disappear under the finger
 *
 * The saved order is snapshotted on focus rather than subscribed to live. The
 * live version is the obvious one and it is worse: unsaving a card from this
 * screen would remove its own row mid-tap, so an accidental press deletes
 * something with no way back — the card is gone, and finding it again means
 * remembering which of seven sections it was in, which is the exact problem
 * saving it was meant to solve.
 *
 * Holding the snapshot means the row stays put with its bookmark switched off,
 * one tap from being restored, and the list settles the next time the screen is
 * focused. `useFocusEffect` is what makes that "next time" arrive: saving a card
 * in a section and coming back here has to show it.
 */

import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { EntryCard } from '@/components/learn/entry-card';
import { ArtworkViewer } from '@/components/ui/artwork-viewer';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import {
  bookmarkIds,
  resolveBookmarks,
} from '@/features/learn/bookmarks';
import {
  entriesById,
  type Entry,
  type LocatedEntry,
} from '@/features/learn/entries';
import { SECTION_TITLE_KEYS } from '@/features/learn/sections';
import { useMotion } from '@/lib/motion';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

/** How many rows get an entering animation. Matches the section list. */
const FIRST_SCREEN = 8;

export default function SavedScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const motion = useMotion();
  const router = useRouter();
  const { language } = usePreferences();
  const clearance = useTabBarClearance();
  const [viewing, setViewing] = useState<Entry | null>(null);

  /** See the note at the top of the file: snapshotted, not subscribed. */
  const [order, setOrder] = useState<readonly string[]>(bookmarkIds);
  useFocusEffect(
    useCallback(() => {
      setOrder(bookmarkIds());
    }, []),
  );

  // Same rule the section list follows: the entrance belongs to the screen
  // arriving, and a cell animating in under a moving finger reads as the list
  // struggling rather than as polish.
  const settled = useRef(false);
  const handleScrollBeginDrag = useCallback(() => {
    settled.current = true;
  }, []);

  /**
   * Resolved against the shipped bundle, and **not built at all when nothing is
   * saved**.
   *
   * `entriesById` is seven `buildGroups` calls the first time it runs — 111
   * sign records, 94 tell-tales and 159 notes, each folded through
   * `foldForSearch`. Calling it unconditionally would make the most common
   * state of this screen, the empty one a reader meets before they have saved
   * anything, the single most expensive thing it does. The guard is inside the
   * memo rather than around the hook because hooks cannot be conditional.
   */
  const saved = useMemo(
    () => (order.length === 0 ? [] : resolveBookmarks(order, entriesById(language, t))),
    [order, language, t],
  );

  const unofficialLabel = t('content.unofficial');
  const saveLabel = t('learn.save');
  const savedLabel = t('learn.saved');

  const listContentStyle = useMemo(
    // No `gap`: the row spacing lives inside the measured cell, or the frame
    // table estimates every unmeasured row short and the list jumps when they
    // mount. Third list in the app to carry this rule — see the Learn section
    // list for the full account.
    () => [styles.listContent, { paddingBottom: clearance }],
    [clearance],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: LocatedEntry; index: number }) => (
      <Animated.View
        entering={
          !settled.current && index < FIRST_SCREEN
            ? motion.entrance(index)
            : undefined
        }
        style={styles.cell}>
        {/*
          The section a card came from, above the card. On a section list this
          would be noise — the navigation bar already says it — but here the
          list is drawn from all seven at once, so it is the only thing telling
          a reader whether the sign they saved was a warning or an instruction.
          It links, because the reason to note which section a card is in is
          usually to go and read the rest of it.
        */}
        <PressableScale
          accessibilityRole="button"
          onPress={() => router.push(`/learn/${item.section}`)}
          scaleTo={0.99}
          style={styles.crumb}>
          <Text tone="textFaint" variant="overline">
            {t(SECTION_TITLE_KEYS[item.section]).toUpperCase()}
          </Text>
          <Ionicons color={colors.textFaint} name="arrow-forward" size={11} />
        </PressableScale>

        <EntryCard
          entry={item.entry}
          onOpenArtwork={setViewing}
          saveLabel={saveLabel}
          savedLabel={savedLabel}
          severityLabel={
            item.entry.colour ? t(`learn.severity.${item.entry.colour}`) : null
          }
          unofficialLabel={unofficialLabel}
        />
      </Animated.View>
    ),
    [colors.textFaint, motion, router, saveLabel, savedLabel, t, unofficialLabel],
  );

  return (
    <>
      <Stack.Screen options={{ title: t('learn.savedTitle') }} />
      <Screen edges={[]} scroll={false}>
        <FlatList
          ListEmptyComponent={
            /*
              Its own screen rather than an empty list under a count reading
              zero. This is the state a learner meets *first* — nothing is saved
              until they save it — so it has to explain the feature rather than
              report a lack of it.
            */
            <Animated.View entering={motion.appear()} style={styles.empty}>
              <View
                style={[styles.emptyIcon, { backgroundColor: colors.surfaceAlt }]}>
                <Ionicons
                  color={colors.textFaint}
                  name="bookmark-outline"
                  size={28}
                />
              </View>
              <Text center variant="heading">
                {t('learn.savedEmptyTitle')}
              </Text>
              <Text center tone="textMuted">
                {t('learn.savedEmptyBody')}
              </Text>
            </Animated.View>
          }
          ListHeaderComponent={
            saved.length > 0 ? (
              /*
                The cost of keeping this device-local, stated rather than left
                to be discovered — the same commitment the profile picture makes
                on the account screen. See `features/learn/bookmarks.ts`.
              */
              <Text style={styles.notice} tone="textFaint" variant="caption">
                {t('learn.savedNotice')}
              </Text>
            ) : null
          }
          contentContainerStyle={listContentStyle}
          data={saved}
          initialNumToRender={6}
          keyExtractor={keyExtractor}
          onScrollBeginDrag={handleScrollBeginDrag}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          windowSize={9}
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

const keyExtractor = (located: LocatedEntry) => located.entry.id;

const styles = StyleSheet.create({
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  /** The row gap, inside the measured cell. See `listContent`. */
  cell: { marginBottom: spacing.lg, gap: spacing.xs },
  crumb: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    // Pressable, so it needs a target rather than the height of an 11pt line.
    paddingVertical: spacing.xs,
    alignSelf: 'flex-start',
  },
  notice: { marginBottom: spacing.lg },
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
