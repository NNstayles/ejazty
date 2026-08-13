import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect, useRouter } from 'expo-router';
import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  DrillIcon,
  FullIcon,
  MediumIcon,
  OpenIcon,
  QuickIcon,
} from '@/components/icons/exam-icons';
import type { AnimatedIconProps } from '@/components/icons/use-playback';
import { Chevron } from '@/components/ui/chevron';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { PressableScale } from '@/components/ui/pressable-scale';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Sparkline } from '@/components/ui/sparkline';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { preloadInterstitial, showInterstitial } from '@/features/ads';
import {
  availableQuestionCount,
  canRunExam,
  EXAM_MODES,
  PASS_THRESHOLD,
  type ExamMode,
} from '@/features/exam/engine';
import { useExamSession } from '@/features/exam/exam-session';
import { relativeDayKey } from '@/lib/dates';
import { useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing, type TintName } from '@/theme/tokens';

/**
 * Icon, title and card tint per mode.
 *
 * The one-line description each card used to carry is gone, at the owner's
 * request. It was restating what the two chips underneath already say — "a
 * longer set to test your consistency" above `25 questions · 5 min` — and four
 * of them stacked turned a list of four choices into a page of prose to read
 * before choosing. The title, the count and the clock are the decision.
 *
 * The icons are drawn rather than taken from Ionicons, so each performs its
 * format: the bolt strikes, the clock runs, the trophy's star lands, and the
 * open format's lemniscate never closes. See `components/icons/exam-icons.tsx`.
 *
 * The tint is positional, not semantic — the same rule the Learn grid follows.
 * Four cards in one indigo read as a wall; what identifies a format is the icon
 * and the two chips.
 */
const MODE_META: Record<
  ExamMode,
  {
    titleKey: string;
    Icon: (props: AnimatedIconProps) => React.ReactElement;
    tint: TintName;
  }
> = {
  quick: { titleKey: 'exam.quick', Icon: QuickIcon, tint: 'lavender' },
  medium: { titleKey: 'exam.medium', Icon: MediumIcon, tint: 'mint' },
  full: { titleKey: 'exam.full', Icon: FullIcon, tint: 'periwinkle' },
  open: { titleKey: 'exam.open', Icon: OpenIcon, tint: 'blush' },
  // Reuses `lavender`, which the closed four-tint set makes unavoidable at five
  // cards. It is placed last so it never sits adjacent to `quick` in the
  // two-column grid, which is the rule the positional scheme actually enforces.
  drill: { titleKey: 'exam.drill', Icon: DrillIcon, tint: 'lavender' },
};

/** How many attempts the trend line plots. */
const TREND_WINDOW = 8;

export default function ExamHome() {
  const { t } = useTranslation();
  const { colors, tints } = useTheme();
  const motion = useMotion();
  const router = useRouter();
  const { start, history, weakCount } = useExamSession();
  const clearance = useTabBarClearance();

  // A press counter per mode, so tapping the same card twice replays its icon
  // twice. Same reasoning as the Learn grid — a boolean can only change once.
  const [plays, setPlays] = useState<Record<string, number>>({});
  const replay = useCallback((id: string) => {
    setPlays((current) => ({ ...current, [id]: (current[id] ?? 0) + 1 }));
  }, []);

  const poolSize = availableQuestionCount();
  const passMark = Math.round(PASS_THRESHOLD * 100);

  /**
   * Everything this screen derives from the attempt history, in one pass.
   *
   * ## Why this is memoised and consolidated
   *
   * It used to be eleven separate traversals written out in sequence — a
   * `map` for the best score, a `filter` for the passes, a `filter` per mode
   * *twice over* inside the `trendMode` reduce (four modes, so eight scans, and
   * the incumbent's count recomputed from scratch at every step), then another
   * `filter` for the series itself. None of it was memoised, so all eleven ran
   * on **every render** — and this screen re-renders on every card tap, because
   * the `plays` counter that replays a mode icon is state up here.
   *
   * `history` is not a small array to do that to: `exam_attempts` is capped at
   * 2000 rows per user by the quota trigger, and a learner who practises daily
   * genuinely accumulates hundreds. The work is also entirely redundant —
   * nothing it reads changes when `plays` does.
   *
   * One pass now, behind a `useMemo` keyed on `history`, which is the only
   * input. The mode tallies are counted into a record as that pass goes, so
   * picking the best-attended mode is a walk over four counters rather than
   * eight array scans.
   *
   * `Math.max` is folded in the loop rather than called as `Math.max(...arr)`:
   * spreading an array into a call passes one argument per element, which is a
   * stack-depth question rather than a style one once the array is allowed to
   * reach the thousands.
   */
  const stats = useMemo(() => {
    let best: number | null = null;
    let passed = 0;
    const byMode: Record<string, number> = {};

    for (const attempt of history) {
      if (best === null || attempt.percent > best) best = attempt.percent;
      if (attempt.passed) passed += 1;
      byMode[attempt.mode] = (byMode[attempt.mode] ?? 0) + 1;
    }

    /**
     * The trend line plots one mode, and it is the best-attended one.
     *
     * `compareAttempt`'s rule that a 15-question warm-up is not comparable to a
     * 45-question mock applies just as much to a line joining them, and the
     * mode with the most attempts is where a trend actually exists.
     */
    let trendMode: ExamMode | null = null;
    let bestCount = 0;
    for (const mode of Object.keys(EXAM_MODES) as ExamMode[]) {
      const count = byMode[mode] ?? 0;
      if (count > bestCount) {
        bestCount = count;
        trendMode = mode;
      }
    }

    /**
     * Reversed into chronological order: `history` is newest-first, so plotting
     * it as it comes draws every learner's progress backwards.
     */
    const trend: number[] = [];
    if (trendMode) {
      for (const attempt of history) {
        if (attempt.mode !== trendMode) continue;
        trend.push(attempt.percent);
        if (trend.length === TREND_WINDOW) break;
      }
      trend.reverse();
    }

    return {
      best,
      passed,
      trendMode,
      passRate: history.length > 0 ? Math.round((passed / history.length) * 100) : 0,
      lastFive: history.slice(0, 5),
      trend,
      // Measured across the plotted window rather than against the single
      // previous attempt: the card is answering "am I getting better", and one
      // bad morning in the middle of a rising run should not turn it red.
      delta: trend.length >= 2 ? trend[trend.length - 1] - trend[0] : 0,
      trendBest: trend.length > 0 ? Math.max(...trend) : null,
    };
  }, [history]);

  const { best, passed, passRate, lastFive, trend, delta, trendBest, trendMode } =
    stats;
  const trendTone =
    delta > 0 ? colors.success : delta < 0 ? colors.danger : colors.textMuted;

  /**
   * Whether this screen is the one on show.
   *
   * Read after the `await` in `begin` below. Between the tap and the ad
   * appearing there is a short window in which no ad is up yet and this screen
   * is still live and swipeable — so a learner can tap a mode card, change
   * their mind, swipe to Learn, and be dragged into an exam a second later by a
   * promise resolving behind them. The tab-swipe gesture already refuses to
   * leave a *running* attempt (`features/navigation/tabs.ts`); this is the same
   * rule one moment earlier, before the attempt exists.
   */
  const focused = useRef(true);

  /*
    Keep an interstitial warm for the tap that starts a paper.

    On focus rather than on mount, so it retries: the tab stays mounted for the
    life of the app, and a preload attempted before the ads SDK finished
    initialising is a no-op that would never be tried again. Coming back to this
    tab is also exactly when the next one is wanted, since `showInterstitial`
    consumes the ad it shows.
  */
  useFocusEffect(
    useCallback(() => {
      focused.current = true;
      preloadInterstitial('preExam');
      return () => {
        focused.current = false;
      };
    }, []),
  );

  /**
   * True while an ad is on screen and the paper has not been started yet.
   *
   * A ref rather than state because nothing renders from it — the exam home is
   * still fully drawn behind the ad, so a second mode card is tappable, and
   * without this guard two taps would show two ads and then start two papers,
   * the second `start()` throwing away the first draw.
   */
  const starting = useRef(false);

  /**
   * Show the pre-exam ad, then start the paper.
   *
   * **The ad has to come before `start`, not after.** `start` stamps
   * `deadline.current = Date.now() + limit` (see `exam-session.tsx`), so an
   * interstitial shown after it runs the clock while the learner is watching an
   * advertisement — fifteen seconds off a three-minute quick exam, silently,
   * with the paper already scored against a timer they never saw start.
   *
   * `showInterstitial` resolves whether or not an ad appeared, and the two
   * lines after it are deliberately unconditional: there is no failure to
   * branch on, and a version that only started the exam "if the ad showed"
   * would strand every learner Google had no fill for.
   */
  const begin = useCallback(
    async (mode: ExamMode) => {
      if (starting.current) return;
      starting.current = true;
      try {
        await showInterstitial('preExam');
        // The learner may have left while the ad was being fetched. Starting
        // here would stamp a deadline and push a paper onto a tab they are no
        // longer looking at — see `focused`.
        if (!focused.current) return;
        start(mode);
        router.push('/exam/session');
      } finally {
        starting.current = false;
      }
    },
    [start, router],
  );

  return (
    <Screen contentStyle={{ paddingBottom: clearance }} wash="heroWash">
      <View style={styles.hero}>
        <Text variant="display">{t('exam.title')}</Text>
        <Text tone="textMuted" variant="body">
          {t('exam.subtitle')}
        </Text>
      </View>

      {/*
        The readiness card, which opens the tab on something personal rather
        than on a list of buttons.

        Two states, and the empty one is not a placeholder: before any attempt
        exists there is no rate to draw, so the ring shows the *pass mark* — the
        bar to clear — and the legend describes the exam rather than the
        learner. A ring at 0% on a first visit reads as a failure the learner
        has not had a chance to earn.
      */}
      <Animated.View entering={motion.appear(60)}>
        <Card style={styles.readyCard}>
          <ProgressRing
            accent={
              history.length === 0
                ? colors.primary
                : passRate >= 50
                  ? colors.success
                  : colors.warning
            }
            fraction={history.length === 0 ? PASS_THRESHOLD : passRate / 100}
            size={110}>
            <Text variant="title">
              {history.length === 0 ? passMark : passRate}%
            </Text>
            <Text tone="textFaint" variant="overline">
              {t(history.length === 0 ? 'exam.passMarkLabel' : 'exam.passRate')}
            </Text>
          </ProgressRing>

          <View style={styles.legend}>
            {history.length === 0 ? (
              <>
                <LegendRow
                  color={colors.primary}
                  label={t('exam.poolLabel')}
                  value={`${poolSize}`}
                />
                <LegendRow
                  color={colors.textFaint}
                  label={t('exam.passMarkLabel')}
                  value={`${passMark}%`}
                />
                <Text tone="textMuted" variant="caption">
                  {t('exam.readyEmpty')}
                </Text>
              </>
            ) : (
              <>
                <LegendRow
                  color={colors.success}
                  label={t('exam.passedLabel')}
                  value={`${passed}`}
                />
                <LegendRow
                  color={colors.danger}
                  label={t('exam.failedLabel')}
                  value={`${history.length - passed}`}
                />
                <LegendRow
                  color={colors.primary}
                  label={t('result.personalBest')}
                  value={`${best}%`}
                />
              </>
            )}
          </View>
        </Card>
      </Animated.View>

      {trend.length >= 2 ? (
        <Animated.View entering={motion.appear(120)}>
          <Card style={styles.trendCard}>
            <View style={styles.trendHeader}>
              <Text variant="bodyStrong">{t('exam.trendTitle')}</Text>
              <Text tone="textMuted" variant="caption">
                {t(MODE_META[trendMode as ExamMode].titleKey)}
              </Text>
            </View>

            {/*
              The line is the brand accent and the *dots* carry the verdict, so
              the two signals do not compete. Colouring the whole line green or
              red said the same thing twice at lower resolution — a run that
              fell from 90 to 75 is a decline that still passed every time, and
              a single red line cannot say that.
            */}
            <Sparkline
              accent={colors.primary}
              threshold={passMark}
              thresholdLabel={`${passMark}%`}
              values={trend}
            />

            <View style={styles.trendFooter}>
              <View style={[styles.deltaPill, { backgroundColor: colors.surfaceAlt }]}>
                <Ionicons
                  color={trendTone}
                  name={
                    delta > 0 ? 'trending-up' : delta < 0 ? 'trending-down' : 'remove'
                  }
                  size={14}
                />
                <Text style={{ color: trendTone }} variant="caption">
                  {delta === 0
                    ? t('exam.trendFlat')
                    : t(delta > 0 ? 'exam.trendUp' : 'exam.trendDown', {
                        count: Math.abs(delta),
                      })}
                </Text>
              </View>
              <Text style={styles.trendCaption} tone="textFaint" variant="caption">
                {t('exam.trendCaption', { count: trend.length })}
                {trendBest !== null
                  ? ` · ${t('exam.trendBest', { percent: trendBest })}`
                  : ''}
              </Text>
            </View>
          </Card>
        </Animated.View>
      ) : null}

      <Text style={styles.gridLabel} tone="textMuted" variant="overline">
        {t('exam.formatsLabel').toUpperCase()}
      </Text>

      <View style={styles.grid}>
        {(Object.keys(EXAM_MODES) as ExamMode[]).map((mode, index) => {
          const config = EXAM_MODES[mode];
          const meta = MODE_META[mode];
          const { Icon } = meta;
          const tint = tints[meta.tint];
          const runnable = canRunExam(mode, weakCount);
          // The drill is bounded by the learner's own mistakes rather than by
          // the bank, so its chip advertises what it will actually draw. A card
          // promising "20 questions" when only six have been got wrong is a
          // card that lies about the session it is about to start.
          const drawCount =
            mode === 'drill'
              ? Math.min(weakCount, config.questionCount ?? weakCount)
              : config.questionCount;

          return (
            <Animated.View
              entering={motion.entrance(index)}
              key={mode}
              style={styles.gridItem}>
              <PressableScale
                accessibilityRole="button"
                disabled={!runnable}
                onPress={() => {
                  replay(mode);
                  // `begin` awaits the interstitial and never rejects, so
                  // `void` here discards a promise that cannot fail rather
                  // than swallowing one that can.
                  void begin(mode);
                }}
                style={styles.gridPress}>
                <Card
                  style={[
                    styles.card,
                    { backgroundColor: tint.fill, borderColor: 'transparent' },
                  ]}>
                  <View style={[styles.iconWrap, { backgroundColor: colors.surface }]}>
                    <Icon
                      color={tint.ink}
                      delayMs={index * 90 + 120}
                      size={24}
                      trigger={plays[mode] ?? 0}
                    />
                  </View>

                  <Text
                    numberOfLines={2}
                    style={{ color: tint.ink }}
                    variant="heading">
                    {t(meta.titleKey)}
                  </Text>

                  <View style={styles.metaRow}>
                    <Chip
                      icon="help-circle-outline"
                      ink={tint.ink}
                      label={
                        // Open has no fixed length, so it advertises the whole
                        // eligible bank rather than a count it does not have.
                        drawCount === null
                          ? t('exam.allQuestions', { count: poolSize })
                          : t('exam.questions', { count: drawCount })
                      }
                    />
                    <Chip
                      icon="time-outline"
                      ink={tint.ink}
                      label={
                        config.timeLimitMinutes === null
                          ? t('exam.noTimer')
                          : t('exam.minutes', { count: config.timeLimitMinutes })
                      }
                    />
                  </View>

                  {!runnable ? (
                    <Text
                      style={[styles.notEnough, { color: tint.ink }]}
                      variant="caption">
                      {/*
                        The drill is unavailable for a different reason from
                        every other card, and saying "not enough questions in
                        the bank" would be false as well as unhelpful: the bank
                        is full, the learner simply has no mistakes on record
                        yet. The message has to name the thing they can do.
                      */}
                      {t(mode === 'drill' ? 'exam.drillEmpty' : 'exam.notEnough')}
                    </Text>
                  ) : (
                    <View style={styles.cardFooter}>
                      <Text style={{ color: tint.ink }} variant="overline">
                        {t('exam.startAction').toUpperCase()}
                      </Text>
                      <Chevron color={tint.ink} size={16} />
                    </View>
                  )}
                </Card>
              </PressableScale>
            </Animated.View>
          );
        })}
      </View>

      {lastFive.length > 0 ? (
        <Card style={styles.infoCard}>
          {/*
            The card lists five; the quota trigger permits two thousand. Until
            the history screen existed everything past the fifth row was
            collected, synced, merged — and unreachable. The affordance is
            shown whenever there is any history at all rather than only past
            five rows, because that screen carries the summary and the
            per-format filter, which this card does not.
          */}
          <View style={styles.historyHeader}>
            <Text variant="bodyStrong">{t('result.history')}</Text>
            <PressableScale
              accessibilityRole="button"
              hitSlop={spacing.sm}
              onPress={() => router.push('/exam/history')}
              scaleTo={0.94}>
              <View style={styles.seeAll}>
                <Text tone="primary" variant="caption">
                  {t('history.seeAll')}
                </Text>
                <Chevron color={colors.primary} size={14} />
              </View>
            </PressableScale>
          </View>
          {lastFive.map((attempt) => {
            const day = relativeDayKey(attempt.at);
            return (
              <View key={attempt.id} style={styles.historyRow}>
                <View
                  style={[
                    styles.dot,
                    {
                      backgroundColor: attempt.passed ? colors.success : colors.danger,
                    },
                  ]}
                />
                <View style={styles.historyText}>
                  <Text numberOfLines={1} tone="textMuted" variant="caption">
                    {t(MODE_META[attempt.mode].titleKey)}
                  </Text>
                  {/*
                    When an attempt was sat, which the list could not say before.
                    Two rows reading 55% and 78% mean something different if
                    they are a week apart than if they are the same afternoon,
                    and the history is the only place that context exists.
                  */}
                  <Text tone="textFaint" variant="overline">
                    {t(day.key, { count: day.count })}
                  </Text>
                </View>
                <Text tone="textFaint" variant="caption">
                  {attempt.correct}/{attempt.total}
                </Text>
                <Text
                  tone={attempt.passed ? 'success' : 'danger'}
                  variant="bodyStrong">
                  {attempt.percent}%
                </Text>
              </View>
            );
          })}
        </Card>
      ) : null}
    </Screen>
  );
}

/** One line of the readiness card's legend: a swatch, a name and a figure. */
function LegendRow({
  color,
  label,
  value,
}: {
  color: string;
  label: string;
  value: string;
}) {
  return (
    <View style={styles.legendRow}>
      <View style={[styles.swatch, { backgroundColor: color }]} />
      <Text numberOfLines={1} style={styles.legendLabel} tone="textMuted" variant="caption">
        {label}
      </Text>
      <Text variant="bodyStrong">{value}</Text>
    </View>
  );
}

function Chip({
  label,
  icon,
  ink,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  /**
   * The tint's checked ink. Passed in rather than read from the theme, because
   * these chips sit on a coloured card and `textMuted` is only checked against
   * `surface` — see the note on `tints`.
   */
  ink: string;
}) {
  const { colors } = useTheme();
  return (
    <View style={[styles.chip, { backgroundColor: colors.surface }]}>
      <Ionicons color={ink} name={icon} size={12} />
      <Text style={{ color: ink }} variant="overline">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: { gap: spacing.xs },
  readyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  legend: { flex: 1, gap: spacing.sm },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  legendLabel: { flex: 1 },
  swatch: { width: 9, height: 9, borderRadius: radius.pill },
  trendCard: { gap: spacing.sm },
  trendHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  trendFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  deltaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
  },
  // Shrinks rather than pushing the delta pill off the row. `space-between` on
  // the footer puts it at the trailing edge, which mirrors on its own — no
  // `textAlign` here, which would be a physical edge in a file where every
  // other one is logical.
  trendCaption: { flexShrink: 1 },
  gridLabel: { marginBottom: -spacing.sm },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.md },
  // Two to a row, with a lone last card spanning. See the note on the Learn
  // grid, which uses the same rule for the same reason.
  gridItem: { flexGrow: 1, flexBasis: '46%' },
  gridPress: { flex: 1 },
  card: { flex: 1, gap: spacing.sm, minHeight: 196 },
  iconWrap: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  metaRow: { flex: 1, gap: spacing.xs, alignItems: 'flex-start' },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  notEnough: { opacity: 0.8 },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  infoCard: { gap: spacing.sm },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  seeAll: { flexDirection: 'row', alignItems: 'center', gap: spacing.xs },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  historyText: { flex: 1 },
  dot: { width: 8, height: 8, borderRadius: radius.pill },
});
