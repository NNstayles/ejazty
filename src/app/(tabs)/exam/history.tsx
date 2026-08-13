import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { PressableScale } from '@/components/ui/pressable-scale';
import { StatTile } from '@/components/ui/stat-tile';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { type ExamMode } from '@/features/exam/engine';
import { useExamSession } from '@/features/exam/exam-session';
import {
  filterByMode,
  modesPresent,
  summariseAttempts,
  type HistoryFilter,
} from '@/features/exam/history-summary';
import type { ExamAttemptRecord } from '@/features/progress/attempts';
import { relativeDayKey } from '@/lib/dates';
import { selectionTap } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

/**
 * Every attempt the learner has sat, not just the five the exam home shows.
 *
 * ## Why this screen exists
 *
 * `exam_attempts` is capped at 2000 rows per account by the quota trigger, and
 * a learner practising daily genuinely accumulates hundreds. All of them were
 * stored, synced and merged — and only the newest five were ever reachable.
 * Everything below them was data the app collected and then hid.
 *
 * ## What it deliberately does not do
 *
 * **A row is not tappable, and cannot be.** Per-question detail is not stored:
 * `question_stats` aggregates one row per *question* rather than one per
 * answer, which is the decision that bounds that table by the size of the bank
 * instead of by how much the learner practises (see `question-stats.ts`). The
 * accepted cost, written down there, is exactly this — an individual past
 * attempt cannot be reconstructed question by question. So the rows carry
 * everything that exists about an attempt and stop there, rather than offering
 * a chevron that would open a screen with nothing on it.
 *
 * The summary above the list reflects the **current filter**, not the whole
 * history: the question a learner brings to a per-format filter is "how am I
 * doing at full mocks", and answering it with the overall figure would make
 * the chips look broken.
 */

/**
 * Mode → title key.
 *
 * A third copy of this table (the exam home and the result screen each have
 * one) and deliberately not hoisted into a shared module: the other two are
 * embedded in larger `Record`s that also carry icons and tints, so factoring
 * this out would mean either exporting a fragment of those or building an
 * indirection over three literals. It is a total `Record`, so a new mode is a
 * compile error here as well as there.
 */
const MODE_TITLE_KEYS: Record<ExamMode, string> = {
  quick: 'exam.quick',
  medium: 'exam.medium',
  full: 'exam.full',
  open: 'exam.open',
  drill: 'exam.drill',
};

/**
 * One attempt.
 *
 * Memoised because the chip row is state on this screen: changing the filter
 * re-renders the screen, and without this every mounted row re-renders with it
 * to produce the identical output.
 */
const AttemptRow = memo(function AttemptRow({
  attempt,
  modeLabel,
}: {
  attempt: ExamAttemptRecord;
  modeLabel: string;
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const day = relativeDayKey(attempt.at);
  const tone = attempt.passed ? colors.success : colors.danger;

  return (
    // The accent rule carries the verdict at the scale of the whole row, so a
    // reader scanning the list sees the shape of their run without reading a
    // single percentage. Same reasoning as the dot on the exam home's card,
    // one step louder because this list is long.
    <Card accent={tone} style={styles.row} texture={false}>
      <View style={styles.rowText}>
        <Text numberOfLines={1} variant="bodyStrong">
          {modeLabel}
        </Text>
        <View style={styles.rowMeta}>
          <Text tone="textFaint" variant="overline">
            {t(day.key, { count: day.count })}
          </Text>
          <Text tone="textFaint" variant="overline">
            ·
          </Text>
          <Text tone="textFaint" variant="overline">
            {attempt.correct}/{attempt.total}
          </Text>
        </View>
      </View>

      <View style={styles.rowScore}>
        <Text style={{ color: tone }} variant="bodyStrong">
          {attempt.percent}%
        </Text>
        <Text style={{ color: tone }} variant="overline">
          {t(attempt.passed ? 'history.passed' : 'history.failed').toUpperCase()}
        </Text>
      </View>
    </Card>
  );
});

/** One filter chip. */
function FilterChip({
  label,
  active,
  onPress,
}: {
  label: string;
  active: boolean;
  onPress: () => void;
}) {
  const { colors } = useTheme();
  return (
    <PressableScale
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      scaleTo={0.94}
      style={[
        styles.chip,
        {
          backgroundColor: active ? colors.primarySoft : colors.surface,
          borderColor: active ? colors.primary : colors.border,
        },
      ]}>
      <Text
        style={{ color: active ? colors.primary : colors.textMuted }}
        variant="caption">
        {label}
      </Text>
    </PressableScale>
  );
}

export default function ExamHistoryScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const motion = useMotion();
  const router = useRouter();
  const { history } = useExamSession();
  const clearance = useTabBarClearance();

  const [filter, setFilter] = useState<HistoryFilter>('all');

  // One memo over the whole derivation rather than three: `history` is the only
  // input to any of it, and the chip row changing `filter` must not re-walk a
  // list that can run to two thousand rows.
  const modes = useMemo(() => modesPresent(history), [history]);
  const shown = useMemo(() => filterByMode(history, filter), [history, filter]);
  const summary = useMemo(() => summariseAttempts(shown), [shown]);

  const choose = useCallback((next: HistoryFilter) => {
    selectionTap();
    setFilter(next);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: ExamAttemptRecord }) => (
      <AttemptRow attempt={item} modeLabel={t(MODE_TITLE_KEYS[item.mode])} />
    ),
    [t],
  );

  /*
    The never-sat case, which is its own screen rather than an empty list.

    Reachable on a brand-new install: the exam home's history card is hidden
    when there is nothing in it, but this route can still be deep-linked or
    reached by going back to it after a sign-out cleared the cache. An empty
    `FlatList` under a summary reading 0% would say the learner had failed
    everything rather than sat nothing.
  */
  if (history.length === 0) {
    return (
      <>
        <Stack.Screen options={{ title: t('history.title') }} />
        <Screen contentStyle={{ paddingBottom: clearance }} edges={[]}>
          <View style={styles.empty}>
            <View style={[styles.emptyIcon, { backgroundColor: colors.primarySoft }]}>
              <Ionicons color={colors.primary} name="time-outline" size={30} />
            </View>
            <Text center variant="heading">
              {t('history.emptyTitle')}
            </Text>
            <Text center tone="textMuted" variant="body">
              {t('history.emptyBody')}
            </Text>
            <Button
              label={t('history.startAction')}
              onPress={() => router.replace('/exam')}
              variant="secondary"
            />
          </View>
        </Screen>
      </>
    );
  }

  const header = (
    <Animated.View entering={motion.appear(0)} style={styles.header}>
      {/*
        Hidden when the filter selects nothing, rather than drawn as three
        zeroes.

        `summariseAttempts` deliberately answers 0 and null on an empty set so
        it can never produce `NaN` — but 0% pass rate and a best of 0 are
        *scores*, and printing them over a list with nothing in it says the
        learner failed everything rather than that this format has no results.
        The tiles are the wrong shape for "nothing here"; the sentence below
        the list is the right one.

        Unreachable through the chips today, since `modesPresent` only offers a
        mode that has attempts. It is reachable if `history` changes while the
        screen is open — a sync landing, a sign-out clearing the cache — which
        is exactly the case worth rendering correctly rather than asserting
        against.
      */}
      {summary.total > 0 ? (
        <>
          <View style={styles.tiles}>
            <StatTile
              accent={summary.passRate >= 50 ? colors.success : colors.warning}
              animateValue={false}
              label={t('history.passRate')}
              suffix="%"
              value={summary.passRate}
            />
            {/*
              `best` and `average` cannot be null inside this branch — a
              non-empty set always has both — but the fallback stays rather
              than a non-null assertion, which would put a crash between a
              learner and their own results to save a character.
            */}
            <StatTile
              animateValue={false}
              label={t('history.best')}
              suffix="%"
              value={summary.best ?? 0}
            />
            <StatTile
              animateValue={false}
              label={t('history.average')}
              suffix="%"
              value={summary.average ?? 0}
            />
          </View>

          {/*
            Two whole clauses joined by a separator, rather than a number
            rendered beside a translated word. `·` is script-neutral and the
            row mirrors with the rest of the tree, so the two halves land in
            reading order in all three languages.
          */}
          <Text tone="textMuted" variant="caption">
            {t('history.attempts', { count: summary.total })}
            {' · '}
            {t('history.passedCount', { count: summary.passed })}
          </Text>
        </>
      ) : null}

      {/*
        The chip row is omitted at one mode: a filter offering "All" and the
        only thing there is filters nothing, and a control that cannot change
        the screen is worse than no control.
      */}
      {modes.length > 1 ? (
        <View style={styles.chips}>
          <FilterChip
            active={filter === 'all'}
            label={t('history.filterAll')}
            onPress={() => choose('all')}
          />
          {modes.map((mode) => (
            <FilterChip
              active={filter === mode}
              key={mode}
              label={t(MODE_TITLE_KEYS[mode])}
              onPress={() => choose(mode)}
            />
          ))}
        </View>
      ) : null}
    </Animated.View>
  );

  return (
    <>
      <Stack.Screen options={{ title: t('history.title') }} />
      {/*
        `edges={[]}`: `ScreenHeader` already applies the top inset — claiming it
        here as well pushes the summary down by a second status bar.

        `scroll={false}` because the `FlatList` below does the scrolling. A
        virtualised list is not an optimisation here but a requirement: the
        quota trigger permits 2000 attempts per account, and mounting two
        thousand cards at once is the difference between a screen and a crash.
      */}
      <Screen edges={[]} scroll={false}>
        <FlatList
          ListEmptyComponent={
            <Text center tone="textMuted" variant="body">
              {t('history.filterEmpty')}
            </Text>
          }
          ListHeaderComponent={header}
          contentContainerStyle={[
            styles.listContent,
            { paddingBottom: clearance + spacing.xxxl },
          ]}
          data={shown}
          initialNumToRender={10}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          windowSize={9}
        />
      </Screen>
    </>
  );
}

const keyExtractor = (attempt: ExamAttemptRecord) => attempt.id;

const styles = StyleSheet.create({
  // Replaces `Screen`'s own scroll padding, which the list does not get now
  // that the screen is `scroll={false}`.
  listContent: { padding: spacing.lg },
  header: { gap: spacing.md, marginBottom: spacing.lg },
  tiles: { flexDirection: 'row', gap: spacing.sm },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  /*
    The row gap lives inside the measured cell, never on the content container.

    `VirtualizedList` builds its frame table from each cell's own `onLayout` and
    approximates an unmeasured cell as `index * averageCellLength` — an average
    over cell *heights*, which container `gap` is not part of. The estimate then
    runs one gap short per row, the error compounds with the index, and the list
    corrects its offset in one visible jump when those cells finally mount. This
    is the road-priority scroll jump, and the same note is on the two other
    lists in the app.
  */
  row: {
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
  },
  rowText: { flex: 1, gap: 2 },
  rowMeta: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  // `flex-end` is a logical edge and mirrors with the row, so the score sits on
  // the trailing side in all three languages.
  rowScore: { alignItems: 'flex-end', gap: 2 },
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
