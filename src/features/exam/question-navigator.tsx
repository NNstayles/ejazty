import Ionicons from '@expo/vector-icons/Ionicons';
import { useTranslation } from 'react-i18next';
import {
  FlatList,
  Modal,
  Pressable,
  StyleSheet,
  View,
  type ListRenderItemInfo,
} from 'react-native';
import Animated, { FadeIn, FadeInDown, FadeOut } from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Text } from '@/components/ui/text';
import { Texture } from '@/components/ui/texture';
import { useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import type { AnswerMap, ExamQuestion } from './engine';

const COLUMNS = 6;

/** What a cell knows about its question. Derived once per open, not per cell. */
type CellState = 'current' | 'correct' | 'wrong' | 'answered' | 'blank';

/**
 * A grid of every question in the attempt, and the way out of an open practice.
 *
 * ## The two problems it solves
 *
 * **A 45-question mock could only be walked one question at a time.** Back and
 * Next were the whole navigation, so a learner who wanted to revisit question 6
 * before submitting had to press Back thirty-nine times — and nothing on the
 * screen said which questions they had left blank until the submit dialog
 * counted them. The dialog gave a number and no way to act on it.
 *
 * **Open practice had no ending.** It draws the entire eligible bank — several
 * hundred questions — untimed. `Next` reaches `Submit` only on the last card,
 * so in practice the only exit was Quit, which throws the attempt away. A study
 * mode you cannot finish is a study mode whose results never exist.
 *
 * Both are the same missing control: a view of the whole paper with somewhere
 * to go from it. The finish action lives here rather than in the action row
 * because it belongs next to the count of what is still blank — that count is
 * the thing a learner needs in order to decide.
 *
 * ## Why the cells report correctness in open practice only
 *
 * In `open` the answer is already revealed on the card as it is answered, so a
 * green or red cell tells the learner nothing they were not told a moment ago,
 * and it makes the grid a map of what to go back and re-read. In a timed mock
 * it would be a live scoreboard the real exam does not give you, which changes
 * what the score measures — the same reason `immediateFeedback` is false there.
 */
export function QuestionNavigator({
  questions,
  answers,
  index,
  /** True when the mode reveals answers as it goes, i.e. open practice. */
  revealing,
  /** True when the attempt has no fixed length and may be finished early. */
  canFinishEarly,
  onJump,
  onFinish,
  onClose,
}: {
  questions: ExamQuestion[];
  answers: AnswerMap;
  index: number;
  revealing: boolean;
  canFinishEarly: boolean;
  onJump: (index: number) => void;
  onFinish: () => void;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const { colors, direction } = useTheme();
  const motion = useMotion();

  const answered = questions.filter((q) => answers[q.id] !== undefined).length;

  const stateFor = (question: ExamQuestion, position: number): CellState => {
    if (position === index) return 'current';
    const selected = answers[question.id];
    if (selected === undefined) return 'blank';
    if (!revealing) return 'answered';
    return selected === question.correctChoiceId ? 'correct' : 'wrong';
  };

  const paint = (state: CellState) => {
    switch (state) {
      case 'current':
        return { bg: colors.primary, fg: colors.onPrimary, border: colors.primary };
      case 'correct':
        return { bg: colors.successSoft, fg: colors.success, border: colors.success };
      case 'wrong':
        return { bg: colors.dangerSoft, fg: colors.danger, border: colors.danger };
      case 'answered':
        return { bg: colors.primarySoft, fg: colors.primary, border: colors.primary };
      case 'blank':
        return { bg: colors.surfaceAlt, fg: colors.textFaint, border: colors.border };
    }
  };

  /*
    Padded out to a whole number of rows with nulls.

    The cells are `flex: 1` with a square aspect ratio, and `numColumns` lays a
    short final row out across the full width — so a paper of 15 questions ends
    with three cells three times the size of every other one. Invisible fillers
    are the exact fix; a percentage `maxWidth` only approximates it once the
    row gap is taken into account.
  */
  const remainder = questions.length % COLUMNS;
  const cells: (ExamQuestion | null)[] =
    remainder === 0
      ? questions
      : [...questions, ...Array<null>(COLUMNS - remainder).fill(null)];

  const renderCell = ({ item, index: position }: ListRenderItemInfo<ExamQuestion | null>) => {
    if (item === null) return <View style={styles.cellFiller} />;
    const state = stateFor(item, position);
    const { bg, fg, border } = paint(state);
    return (
      <PressableScale
        accessibilityLabel={t('exam.questionNumber', { number: position + 1 })}
        accessibilityRole="button"
        accessibilityState={{ selected: state === 'current' }}
        onPress={() => onJump(position)}
        scaleTo={0.9}
        style={[styles.cell, { backgroundColor: bg, borderColor: border }]}>
        <Text style={{ color: fg }} variant="caption">
          {position + 1}
        </Text>
      </PressableScale>
    );
  };

  return (
    <Modal animationType="none" onRequestClose={onClose} statusBarTranslucent transparent visible>
      {/*
        `direction` is re-applied here for the same reason `ArtworkViewer` does
        it: React Native hosts a modal's children on a separate root, so the
        subtree starts from the platform default rather than inheriting the
        `direction: rtl` set once on the root view. Without it this sheet is the
        only surface in the app still laid out left-to-right in Arabic.
      */}
      <Animated.View
        entering={motion.reduced ? undefined : FadeIn.duration(160)}
        exiting={motion.reduced ? undefined : FadeOut.duration(120)}
        style={[styles.backdrop, { direction }]}>
        <Pressable
          accessibilityLabel={t('common.close')}
          accessibilityRole="button"
          onPress={onClose}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View
          entering={motion.reduced ? undefined : FadeInDown.duration(220)}
          style={[styles.sheet, { backgroundColor: colors.surface }]}>
          {/*
            The sheet is the largest single fill in the app after a screen
            background, so it is the surface a flat colour reads worst on. It
            takes the same finish for the same reason.
          */}
          <Texture intensity={0.7} variant="dots" />
          <View style={styles.header}>
            <View style={styles.headerText}>
              <Text variant="heading">{t('exam.navigatorTitle')}</Text>
              <Text tone="textMuted" variant="caption">
                {t('exam.answeredCount', {
                  answered,
                  total: questions.length,
                })}
              </Text>
            </View>
            <PressableScale
              accessibilityLabel={t('common.close')}
              accessibilityRole="button"
              onPress={onClose}
              style={styles.closeButton}>
              <Ionicons color={colors.textMuted} name="close" size={22} />
            </PressableScale>
          </View>

          <ProgressBar value={questions.length === 0 ? 0 : answered / questions.length} />

          {/*
            A `FlatList` rather than a wrapped `View`, because open practice
            draws the whole bank: several hundred cells mounted at once is a
            visible stall on opening the sheet, and virtualisation costs nothing
            for the 15 a quick exam has.
          */}
          <FlatList
            contentContainerStyle={styles.gridContent}
            columnWrapperStyle={styles.gridRow}
            data={cells}
            initialNumToRender={48}
            keyExtractor={(q, position) => q?.id ?? `filler-${position}`}
            numColumns={COLUMNS}
            renderItem={renderCell}
            showsVerticalScrollIndicator={false}
            style={styles.grid}
          />

          {canFinishEarly ? (
            <Button
              // Disabled with nothing answered rather than hidden: a control
              // that appears once you have done enough is a control nobody
              // knows exists. Grading an empty attempt is also the one case
              // `questionsToGrade` cannot produce a result for.
              disabled={answered === 0}
              label={t('exam.finishNow')}
              onPress={onFinish}
            />
          ) : null}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    // Matches `ArtworkViewer`: a scrim over whatever is behind it rather than a
    // surface in either palette, so it is the same darkness in both schemes.
    backgroundColor: 'rgba(6, 7, 20, 0.72)',
    justifyContent: 'flex-end',
  },
  sheet: {
    // Capped rather than sized to the content: open practice has hundreds of
    // cells and a sheet that grows with them would cover the whole screen.
    maxHeight: '76%',
    borderTopStartRadius: radius.xl,
    borderTopEndRadius: radius.xl,
    // Clips the texture layer to the rounded top corners. Without it the
    // pattern draws a square behind them on Android — the same reason `Button`
    // clips its gradient.
    overflow: 'hidden',
    padding: spacing.lg,
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headerText: { flex: 1, gap: 2 },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  grid: { flexGrow: 0 },
  // No vertical `gap` on the content container: it is space the flex container
  // inserts *between* cells, so it is absent from every cell's `onLayout` and
  // therefore from the frame table `VirtualizedList` extrapolates unmeasured
  // offsets from. Open practice fills this grid with several hundred cells,
  // which is where an error of one gap per row stops being invisible. The row
  // gap is carried by `gridRow` instead, inside the measured cell.
  gridContent: { paddingBottom: spacing.xs },
  // `gap` here is horizontal, between the cells of one row, and `marginBottom`
  // is the vertical rhythm — both inside the cell the list measures.
  gridRow: { gap: spacing.sm, marginBottom: spacing.sm },
  cell: {
    flex: 1,
    aspectRatio: 1,
    borderRadius: radius.sm,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  /** Holds the last row's width open. See the padding note in `renderCell`. */
  cellFiller: { flex: 1, aspectRatio: 1 },
});
