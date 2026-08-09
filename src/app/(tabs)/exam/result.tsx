import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { FlatList, StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Artwork } from '@/components/ui/artwork';
import { ArtworkViewer } from '@/components/ui/artwork-viewer';
import { Button } from '@/components/ui/button';
import { Chevron } from '@/components/ui/chevron';
import { PressableScale } from '@/components/ui/pressable-scale';
import { ProgressBar } from '@/components/ui/progress-bar';
import { ScoreRing } from '@/components/ui/score-ring';
import { StatTile } from '@/components/ui/stat-tile';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { resultFeedback } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import { pick, type QuestionTopic } from '@/content/schema';
import type { LanguageCode } from '@/i18n';
import {
  breakdownByTopic,
  isBreakdownUseful,
  type TopicBreakdown,
} from '@/features/exam/breakdown';
import {
  PASS_THRESHOLD,
  type AttemptComparison,
  type ExamMode,
  type GradedAnswer,
} from '@/features/exam/engine';
import { useExamSession } from '@/features/exam/exam-session';
import { SECTION_TITLE_KEYS } from '@/features/learn/sections';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

const MODE_TITLE_KEYS: Record<ExamMode, string> = {
  quick: 'exam.quick',
  medium: 'exam.medium',
  full: 'exam.full',
  open: 'exam.open',
  drill: 'exam.drill',
};

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${`${s}`.padStart(2, '0')}`;
}

/**
 * Attempt-over-attempt feedback. Comparisons are always against the previous
 * attempt in the same mode, so the wording names the mode explicitly — a
 * 10-question warm-up and a 30-question mock are not the same score.
 */
function ProgressCard({
  comparison,
  modeLabel,
}: {
  comparison: AttemptComparison;
  modeLabel: string;
}) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  const { delta, trend, previousPercent, previousBest, recentAverage } = comparison;

  const tone =
    trend === 'up' ? colors.success : trend === 'down' ? colors.danger : colors.textMuted;
  const icon =
    trend === 'up' ? 'trending-up' : trend === 'down' ? 'trending-down' : 'remove';

  let headline = t('result.firstAttempt');
  if (delta !== null) {
    const points = Math.abs(delta);
    headline =
      trend === 'up'
        ? t('result.improved', { points, mode: modeLabel })
        : trend === 'down'
          ? t('result.declined', { points, mode: modeLabel })
          : t('result.unchanged', { mode: modeLabel });
  }

  return (
    <Card style={styles.progressCard}>
      <View style={styles.progressHeader}>
        <Text variant="bodyStrong">{t('result.progress')}</Text>
        <Text tone="textFaint" variant="caption">
          {t('result.attemptNumber', { number: comparison.attemptNumber })}
        </Text>
      </View>

      <View style={styles.trendRow}>
        {delta !== null ? (
          <Ionicons color={tone} name={icon} size={20} />
        ) : (
          <Ionicons color={tone} name="flag-outline" size={20} />
        )}
        <Text style={[styles.trendText, { color: tone }]} variant="bodyStrong">
          {headline}
        </Text>
      </View>

      {comparison.isPersonalBest ? (
        <View style={[styles.bestPill, { backgroundColor: colors.successSoft }]}>
          <Ionicons color={colors.success} name="trophy" size={14} />
          <Text style={{ color: colors.success }} variant="caption">
            {t('result.personalBest')}
          </Text>
        </View>
      ) : null}

      <View style={styles.metaGrid}>
        {previousPercent !== null ? (
          <MetaLine
            label={t('result.attemptNumber', { number: comparison.attemptNumber - 1 })}
            value={`${previousPercent}%`}
          />
        ) : null}
        {recentAverage !== null ? (
          <MetaLine label={t('result.recentAverage', { percent: recentAverage })} />
        ) : null}
        {previousBest !== null && !comparison.isPersonalBest ? (
          <MetaLine label={t('result.previousBest', { percent: previousBest })} />
        ) : null}
      </View>
    </Card>
  );
}

function MetaLine({ label, value }: { label: string; value?: string }) {
  return (
    <View style={styles.metaLine}>
      <Text style={styles.metaLabel} tone="textMuted" variant="caption">
        {label}
      </Text>
      {value ? (
        <Text tone="textMuted" variant="caption">
          {value}
        </Text>
      ) : null}
    </View>
  );
}

/**
 * Where the marks went, by topic, and a way straight into the section that
 * teaches the weakest one.
 *
 * The screen could already say how much a learner lost and could not say where.
 * "30 of 45" is a number to feel bad about; "Traffic signs 14/15 · Road
 * priority 4/12" is an instruction, and the row is the instruction — tapping it
 * opens that Learn section.
 *
 * The ordering and the omission of untested topics are `breakdown.ts`'s job and
 * are pinned there; both are invisible from here, because a wrong order and a
 * spurious 0% row both render perfectly plausible lists.
 */
function BreakdownCard({ rows }: { rows: TopicBreakdown[] }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <Card style={styles.breakdownCard}>
      <View>
        <Text variant="bodyStrong">{t('result.breakdown')}</Text>
        <Text tone="textFaint" variant="caption">
          {t('result.breakdownHint')}
        </Text>
      </View>

      {rows.map((row) => {
        // A topic id is a Learn section id — `LearnSectionId` aliases
        // `NoteTopic`, and `QuestionTopic` is a subset of it — so the route is
        // the topic and `sections.test.ts` is what keeps that true.
        const label = t(SECTION_TITLE_KEYS[row.topic]);
        // Only the tones the app already uses for a verdict. The threshold is
        // the pass mark, so a topic row reads the same way the ring does rather
        // than inventing a second scale for the same judgement.
        const tone =
          row.percent >= PASS_THRESHOLD * 100 ? colors.success : colors.danger;

        return (
          <PressableScale
            accessibilityHint={t('result.breakdownHint')}
            accessibilityLabel={`${label}: ${row.correct}/${row.total}`}
            accessibilityRole="button"
            key={row.topic}
            onPress={() => router.push(`/learn/${row.topic}`)}
            scaleTo={0.99}>
            <View style={styles.breakdownRow}>
              <View style={styles.breakdownText}>
                <View style={styles.breakdownLabel}>
                  <Text style={styles.breakdownName} numberOfLines={1} variant="body">
                    {label}
                  </Text>
                  <Text style={{ color: tone }} variant="bodyStrong">
                    {t('result.topicScore', {
                      correct: row.correct,
                      total: row.total,
                    })}
                  </Text>
                </View>
                <ProgressBar color={tone} height={5} value={row.correct / row.total} />
              </View>
              <Chevron />
            </View>
          </PressableScale>
        );
      })}
    </Card>
  );
}

/** Which questions the review list is showing. */
type ReviewFilter = 'wrong' | 'all';

/** One graded question, plus the number it had in the paper. */
type ReviewItem = { item: GradedAnswer; position: number };

/**
 * One question in the review list.
 *
 * Memoised because the list is virtualised now and the screen re-renders on
 * every filter change and every artwork open — without this, toggling All / To
 * review repaints every mounted card and its image.
 */
const ReviewCard = memo(function ReviewCard({
  item,
  position,
  language,
  onZoom,
  onStudy,
  labels,
}: {
  item: GradedAnswer;
  position: number;
  language: LanguageCode;
  onZoom: (item: GradedAnswer) => void;
  onStudy: (topic: QuestionTopic) => void;
  /** Pre-resolved strings, so `t` is not called once per mounted card. */
  labels: {
    yourAnswer: string;
    correctAnswer: string;
    noAnswer: string;
    explanation: string;
    study: string;
  };
}) {
  const { colors } = useTheme();

  const correctChoice = item.question.choices.find(
    (c) => c.id === item.question.correctChoiceId,
  );
  const chosen = item.question.choices.find((c) => c.id === item.selectedChoiceId);

  return (
    /*
      Accented by outcome. On a list where most rows look alike, the rule down
      the leading edge is what lets a learner find the ones they got wrong by
      scrolling rather than by reading each card's tick.
    */
    <Card
      accent={item.correct ? colors.success : colors.danger}
      style={styles.reviewCard}
      // A row in the virtualised review list, which open practice can run to
      // several hundred entries. See `Card`.
      texture={false}>
      <View style={styles.reviewHeader}>
        <Text tone="textFaint" variant="overline">
          {position + 1}
        </Text>
        <Ionicons
          color={item.correct ? colors.success : colors.danger}
          name={item.correct ? 'checkmark-circle' : 'close-circle'}
          size={20}
        />
      </View>

      <Text variant="bodyStrong">{pick(item.question.prompt, language)}</Text>

      {/*
        A third of the bank is picture questions, and their stems carry no
        information without the picture — "Who has right of way in this
        picture?" reviewed without it is a card that cannot be learned from.

        Tappable for the same reason it is in the session runner and the Learn
        catalogue: the engine-bay photographs and the junction diagrams turn on
        detail a 150pt thumbnail cannot carry, and the review is exactly where
        a learner has a reason to look closely.
      */}
      {/*
        No cross-fade: the review is a `FlatList`, so this is the many-images-
        on-a-moving-screen case rather than the single-image-on-a-still-one
        case. It used to fade per cell, which is the bug the Learn list had
        already had removed.
      */}
      {item.question.image ? (
        <Artwork
          label={pick(item.question.prompt, language)}
          onPress={() => onZoom(item)}
          recyclingKey={item.question.id}
          source={item.question.image}
        />
      ) : null}

      {!item.correct ? (
        <View style={styles.reviewLine}>
          <Text tone="textMuted" variant="overline">
            {labels.yourAnswer}
          </Text>
          <Text tone="danger" variant="body">
            {chosen ? pick(chosen.text, language) : labels.noAnswer}
          </Text>
        </View>
      ) : null}

      <View style={styles.reviewLine}>
        <Text tone="textMuted" variant="overline">
          {labels.correctAnswer}
        </Text>
        <Text tone="success" variant="body">
          {correctChoice ? pick(correctChoice.text, language) : '-'}
        </Text>
      </View>

      <View style={styles.reviewLine}>
        <Text tone="textMuted" variant="overline">
          {labels.explanation}
        </Text>
        <Text tone="textMuted" variant="body">
          {pick(item.question.explanation, language)}
        </Text>
      </View>

      {/*
        A way from this mistake to the material that explains it, on the cards
        where there is something to fix.

        The breakdown card above already links per topic, but it answers a
        different question: it says which subject to revise *overall*, and a
        learner reading one wrong answer at a time wants the section for the
        one in front of them. It is omitted on a correct answer, where the link
        would be an invitation to go and re-read something already known.

        A topic id is a Learn section id — `LearnSectionId` aliases `NoteTopic`
        and `QuestionTopic` is a subset of it — which `sections.test.ts` keeps
        true, so the route needs no mapping table.
      */}
      {!item.correct ? (
        <PressableScale
          accessibilityRole="button"
          onPress={() => onStudy(item.question.topic)}
          scaleTo={0.98}
          style={[styles.studyLink, { backgroundColor: colors.surfaceAlt }]}>
          <Ionicons color={colors.primary} name="book-outline" size={14} />
          <Text style={[styles.studyLabel, { color: colors.primary }]} variant="caption">
            {labels.study}
          </Text>
          <Chevron />
        </PressableScale>
      ) : null}
    </Card>
  );
});

export default function ExamResultScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { language } = usePreferences();
  const router = useRouter();
  const { result, comparison, mode, start, reset } = useExamSession();
  const motion = useMotion();
  const [reviewing, setReviewing] = useState(false);
  /*
    Defaults to the mistakes. A review that opens on all 45 questions makes the
    learner scroll past the ones they already know to find the ones they do
    not, which is the opposite of what they opened it for. `all` is one tap
    away and stays available for a paper they passed cleanly.
  */
  const [filter, setFilter] = useState<ReviewFilter>('wrong');
  /** The question whose artwork is open, or null. One per screen. */
  const [zooming, setZooming] = useState<GradedAnswer | null>(null);

  /**
   * Set the moment the reader first drags the list.
   *
   * Same rule as the Learn section list: an entrance animation belongs to the
   * screen arriving, and once the list has been touched a cell mounting is just
   * virtualisation doing its job. Animating those reads as the list stuttering.
   */
  const settled = useRef(false);
  const handleScrollBeginDrag = useCallback(() => {
    settled.current = true;
  }, []);

  const breakdown = useMemo(
    () => breakdownByTopic(result?.graded ?? []),
    [result?.graded],
  );

  const reviewed = useMemo<ReviewItem[]>(() => {
    const graded = result?.graded ?? [];
    // Positions are captured before filtering, so a card keeps the number it
    // had in the paper. Renumbering the wrong answers 1..n would make the
    // review disagree with the session the learner just sat.
    const numbered = graded.map((item, position) => ({ item, position }));
    return filter === 'all' ? numbered : numbered.filter((g) => !g.item.correct);
  }, [result?.graded, filter]);

  /*
    Fires once per graded attempt, keyed on `passed` so a retake that lands on
    the same verdict still thumps. Guarded on `result` rather than placed after
    the early return below, because a hook cannot sit behind a conditional.
  */
  const passed = result?.passed;
  useEffect(() => {
    if (passed === undefined) return;
    resultFeedback(passed);
  }, [passed]);

  const reviewLabels = useMemo(
    () => ({
      yourAnswer: t('result.yourAnswer').toUpperCase(),
      correctAnswer: t('result.correctAnswer').toUpperCase(),
      noAnswer: t('result.noAnswer'),
      explanation: t('result.explanation').toUpperCase(),
      study: t('result.studyThis'),
    }),
    [t],
  );

  const openStudy = useCallback(
    (topic: QuestionTopic) => router.push(`/learn/${topic}`),
    [router],
  );

  const renderReview = useCallback(
    ({ item, index }: { item: ReviewItem; index: number }) => {
      const card = (
        <ReviewCard
          item={item.item}
          labels={reviewLabels}
          language={language}
          onStudy={openStudy}
          onZoom={setZooming}
          position={item.position}
        />
      );
      // Staggered by the card's place in the *rendered* list, not by its number
      // in the paper: filtering to the wrong answers can leave question 41
      // first on screen, and staggering by 41 puts its entrance at the cap —
      // the list would appear to hesitate before drawing anything.
      //
      // The wrapper is unconditional and only `entering` is switched off, for
      // the reason `learn/[section].tsx` documents: returning a bare card in
      // one case and a wrapped one in the other puts a *different element
      // type* at the same position, so the first re-render after `settled`
      // flips tears the subtree down and builds it again — dropping the
      // mounted `Image` and re-attaching it, which reads as the card going
      // blank and repainting at the moment the reader starts to drag.
      const animate = !settled.current && index < FIRST_SCREEN;
      return (
        <Animated.View
          entering={animate ? motion.entrance(index) : undefined}
          style={styles.cell}>
          {card}
        </Animated.View>
      );
    },
    [language, motion, openStudy, reviewLabels],
  );

  if (!result) return null;

  const accent = result.passed ? colors.success : colors.danger;
  const modeLabel = t(MODE_TITLE_KEYS[result.mode]);

  const retake = () => {
    if (!mode) return;
    start(mode);
    router.replace('/exam/session');
  };

  const leave = () => {
    reset();
    // `replace` would swap this screen for a *second* copy of the exam home,
    // leaving two of them stacked — hardware back would then land on an
    // identical screen and look like it had done nothing. Pop back to the one
    // already underneath instead.
    if (router.canGoBack()) router.back();
    else router.replace('/exam');
  };

  const header = (
    <View style={styles.header}>
      {/*
        The ring sits on the screen's own wash rather than inside a card.

        It was previously boxed in a `Card` with a 1.5pt border in the verdict
        colour, which was two mistakes at once: a saturated rectangle drawn
        around a circle fights the circle for the eye, and it made the verdict
        *ring* the second place the colour appeared rather than the first. The
        wash behind the screen already carries pass-or-fail at full scale, so
        the hero needs nothing but room.
      */}
      <View style={styles.hero}>
        <ScoreRing
          accent={accent}
          label={result.passed ? t('result.passed') : t('result.failed')}
          percent={result.percent}
          // The ring can now show where the bar was, so the pass mark printed
          // below it is a caption on the graphic rather than the only place
          // the threshold appears.
          thresholdPercent={Math.round(PASS_THRESHOLD * 100)}
        />
        <Text center tone="textMuted" variant="caption">
          {result.passed ? t('result.passedMessage') : t('result.failedMessage')}
        </Text>
        <Text center tone="textFaint" variant="caption">
          {t('result.passMark', { percent: Math.round(PASS_THRESHOLD * 100) })}
          {' · '}
          {t('result.timeTaken')} {formatDuration(result.durationSeconds)}
        </Text>
      </View>

      {/*
        The supporting detail lands after the ring rather than with it, so the
        score is read first. Delays are past the ring's 900ms fill.
      */}
      {comparison ? (
        <Animated.View entering={motion.appear(900)}>
          <ProgressCard comparison={comparison} modeLabel={modeLabel} />
        </Animated.View>
      ) : null}

      <Animated.View
        entering={motion.appear(comparison ? 990 : 900)}
        style={styles.stats}>
        <StatTile accent={colors.success} label={t('result.correct')} value={result.correct} />
        <StatTile accent={colors.danger} label={t('result.wrong')} value={result.wrong} />
        <StatTile
          accent={colors.textFaint}
          label={t('result.skipped')}
          value={result.skipped}
        />
      </Animated.View>

      {isBreakdownUseful(breakdown) ? (
        <Animated.View entering={motion.appear(comparison ? 1080 : 990)}>
          <BreakdownCard rows={breakdown} />
        </Animated.View>
      ) : null}

      <View style={styles.actions}>
        <Button
          label={reviewing ? t('common.close') : t('result.review')}
          onPress={() => setReviewing((v) => !v)}
          variant="secondary"
        />
        <Button label={t('result.retake')} onPress={retake} />
        <Button label={t('result.backToExams')} onPress={leave} variant="ghost" />
      </View>

      {/*
        The filter is only offered where it changes anything. On a paper with no
        mistakes there is one list, and a control whose two options produce the
        same screen is a control that teaches the user to distrust controls.
      */}
      {reviewing && result.wrong + result.skipped > 0 ? (
        <View style={[styles.segments, { backgroundColor: colors.surfaceAlt }]}>
          {(['wrong', 'all'] as const).map((option) => {
            const active = filter === option;
            return (
              <PressableScale
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
                key={option}
                onPress={() => setFilter(option)}
                scaleTo={0.98}
                style={[
                  styles.segment,
                  active && { backgroundColor: colors.surface },
                ]}>
                <Text
                  center
                  tone={active ? 'text' : 'textMuted'}
                  variant={active ? 'bodyStrong' : 'body'}>
                  {option === 'wrong'
                    ? t('result.reviewWrong', {
                        count: result.wrong + result.skipped,
                      })
                    : t('result.reviewAll', { count: result.total })}
                </Text>
              </PressableScale>
            );
          })}
        </View>
      ) : null}

      {reviewing && reviewed.length === 0 ? (
        <Card>
          <Text center tone="textMuted" variant="body">
            {t('result.reviewNothingWrong')}
          </Text>
        </Card>
      ) : null}
    </View>
  );

  return (
    /*
      The tab bar stays hidden through the result screen, so the bottom inset is
      this screen's to handle.

      The wash is the verdict, at the scale of the whole screen: a pass and a
      fail should not be told apart only by reading a word inside a ring.

      A `FlatList` with everything above it as the header, rather than the
      `ScrollView` this screen used to be. The review list was rendered with
      `.map()`, so every card mounted at once — 45 of them with images on a full
      mock, and now that open practice can be finished at all, potentially
      several hundred. Virtualising it is what makes that safe; the header is
      unchanged content, just handed to the list instead of stacked above it.
    */
    <Screen
      edges={['top', 'bottom']}
      scroll={false}
      wash={result.passed ? 'successWash' : 'dangerWash'}>
      <FlatList
        ListHeaderComponent={header}
        contentContainerStyle={styles.listContent}
        data={reviewing ? reviewed : EMPTY}
        initialNumToRender={4}
        keyExtractor={keyExtractor}
        /*
          The same anchor the Learn section list carries, for the same defect and
          for a worse case of it.

          `VirtualizedList` estimates an unmeasured cell's offset as
          `index * averageCellLength`, averaged over the cells it has measured —
          and these rows are two different sizes, because a third of the bank is
          picture questions and a review card draws the artwork at a fixed 160pt
          while a text-only card does not. So every row ahead is guessed using an
          average the text-only cards have dragged down, the error compounds with
          the index, and when those cells mount and report their real heights the
          content grows under a contentOffset that did not move. That is the jump
          reported in road priority, arriving here from the same mechanism.

          Worse here for two reasons the Learn list does not have. This header is
          tall — a score ring, a topic breakdown and a segmented control — so the
          list reaches its first measurement later; and a finished open practice
          can be several hundred questions rather than 37, which is where an
          error that compounds with the index does its real damage.

          `minIndexForVisible: 0` counts from the first *data* row —
          `VirtualizedList` adds one itself to skip `ListHeaderComponent` — so
          the anchor is a review card and never the header.
        */
        maintainVisibleContentPosition={KEEP_VISIBLE_ROW_STILL}
        maxToRenderPerBatch={4}
        onScrollBeginDrag={handleScrollBeginDrag}
        renderItem={renderReview}
        showsVerticalScrollIndicator={false}
        windowSize={7}
      />

      {zooming?.question.image ? (
        <ArtworkViewer
          onClose={() => setZooming(null)}
          source={zooming.question.image}
          title={pick(zooming.question.prompt, language)}
        />
      ) : null}
    </Screen>
  );
}

/** Stable identity, so the list is not handed a new empty array each render. */
const EMPTY: ReviewItem[] = [];

/**
 * Anchors the first visible review card against the frame table's corrections.
 * See the prop on the `FlatList` for what it is fixing.
 *
 * Module scope so the value keeps one identity across renders — it crosses to
 * the native scroll view, and this screen re-renders on every filter change.
 */
const KEEP_VISIBLE_ROW_STILL = { minIndexForVisible: 0 } as const;

const keyExtractor = (entry: ReviewItem) => entry.item.question.id;

/** How many review cards get an entering animation. See `renderReview`. */
const FIRST_SCREEN = 6;

const styles = StyleSheet.create({
  // Replaces `Screen`'s own scroll padding, which the list does not get now
  // that the screen is `scroll={false}`.
  listContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  /*
    The row gap, carried inside the cell rather than by the content container.

    A `gap` there is invisible to `VirtualizedList`'s frame table — it
    approximates an unmeasured cell's offset from the average of measured cell
    *heights*, and container gap is not part of any of them, so the estimate
    runs short by one gap per row and the list jumps when the real positions
    arrive. Finishing an open practice can review several hundred cards here,
    which is exactly the length at which that error stops being subtle. See the
    same note in `learn/[section].tsx`.
  */
  cell: { marginBottom: spacing.lg },
  // The header's own children keep the same rhythm the scrolling version had,
  // so handing them to the list changed nothing about how the screen reads.
  // This gap is safe where the content container's was not: it is inside a
  // single cell, so `onLayout` reports it.
  header: { gap: spacing.lg, marginBottom: spacing.lg },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  progressCard: { gap: spacing.sm },
  progressHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trendRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  trendText: { flex: 1 },
  bestPill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  metaGrid: { gap: 2 },
  metaLine: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  metaLabel: { flex: 1 },
  stats: { flexDirection: 'row', gap: spacing.sm },
  breakdownCard: { gap: spacing.md },
  breakdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  breakdownText: { flex: 1, gap: spacing.xs },
  breakdownLabel: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  // Shrinks rather than pushing the score off the row: "Vehicle & maintenance"
  // is long in English and longer in Arabic, and the figure is the part that
  // must never be the thing that truncates.
  breakdownName: { flexShrink: 1 },
  actions: { gap: spacing.sm },
  segments: {
    flexDirection: 'row',
    gap: spacing.xs,
    padding: spacing.xs,
    borderRadius: radius.md,
  },
  segment: {
    flex: 1,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.sm,
    borderRadius: radius.sm,
  },
  reviewCard: { gap: spacing.sm },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewLine: { gap: 2 },
  // Same affordance as the Learn cards and the session runner, in the same
  // trailing corner, so a tappable picture looks the same everywhere.
  studyLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    borderRadius: radius.sm,
  },
  studyLabel: { flex: 1 },
});
