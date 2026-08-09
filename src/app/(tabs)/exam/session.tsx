import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, BackHandler, StyleSheet, View } from 'react-native';
import Animated, {
  FadeInLeft,
  FadeInRight,
  useAnimatedStyle,
  useDerivedValue,
  withRepeat,
  withSequence,
  withTiming,
} from 'react-native-reanimated';

import { Artwork } from '@/components/ui/artwork';
import { ArtworkViewer } from '@/components/ui/artwork-viewer';
import { Button } from '@/components/ui/button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { ProgressBar } from '@/components/ui/progress-bar';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { pick } from '@/content/schema';
import { choiceMarker } from '@/features/exam/choice-markers';
import { EXAM_MODES } from '@/features/exam/engine';
import { useExamClock, useExamSession } from '@/features/exam/exam-session';
import { QuestionNavigator } from '@/features/exam/question-navigator';
import { answerFeedback, warningFeedback } from '@/lib/haptics';
import { duration, easing, useMotion } from '@/lib/motion';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${`${s}`.padStart(2, '0')}`;
}

/**
 * One answer option.
 *
 * Memoised because selecting an answer re-renders the runner, and without this
 * every option repaints — each one an animated Pressable with its own spring —
 * when only two of them actually changed appearance.
 */
const Choice = memo(function Choice({
  label,
  text,
  active,
  questionId,
  choiceId,
  onSelect,
  reveal = null,
  revealsAnswer,
  isCorrect,
  locked = false,
}: {
  label: string;
  text: string;
  active: boolean;
  questionId: string;
  choiceId: string;
  /** Stable across renders; the ids are passed back so it can stay that way. */
  onSelect: (questionId: string, choiceId: string) => void;
  /**
   * Open practice only: marks this row as the right answer or as the wrong one
   * the learner picked. Null everywhere else, because revealing the answer in a
   * timed paper would change what the score measures.
   */
  reveal?: 'correct' | 'wrong' | null;
  /**
   * Whether the *mode* reveals answers, which is not the same question as
   * `reveal`: that one is null until the question has been answered, and the
   * haptic has to be chosen at the moment of the press. See `answerFeedback`.
   */
  revealsAnswer: boolean;
  /** Whether this row is the right answer. Only ever felt in a revealing mode. */
  isCorrect: boolean;
  /** True once the question has been answered in a revealing mode. */
  locked?: boolean;
}) {
  const { colors } = useTheme();
  const motion = useMotion();
  const ms = motion.ms(duration.fast);

  // Resolved here, on the JS thread, so the worklets below close over plain
  // strings rather than the theme object. Capturing `colors` inside a worklet
  // typechecks and then fails on device — see the note in CLAUDE.md.
  const accent =
    reveal === 'correct'
      ? colors.success
      : reveal === 'wrong'
        ? colors.danger
        : colors.primary;
  const accentSoft =
    reveal === 'correct'
      ? colors.successSoft
      : reveal === 'wrong'
        ? colors.dangerSoft
        : colors.primarySoft;
  const restingBorder = colors.border;

  // The correct row lights up even when it is not the one that was tapped, so
  // open practice shows the answer rather than only marking the mistake.
  const lit = active || reveal === 'correct';

  const drive = useDerivedValue<number>(
    () => withTiming(lit ? 1 : 0, { duration: ms, easing: easing.standard }),
    [lit, ms],
  );

  // Only the fill's opacity is animated, never a colour interpolated to or from
  // `transparent`. `transparent` is `#00000000`, so interpolating toward it
  // takes the colour channels toward black as well as the alpha — a selected
  // option would darken to a grey-black smear on its way out. Animating a
  // solid layer's opacity is the same effect with none of that.
  const fillStyle = useAnimatedStyle(() => ({ opacity: drive.value }));

  const markerFillStyle = useAnimatedStyle(() => ({
    opacity: drive.value,
    // A single half-cycle of overshoot: the marker swells as it fills and
    // settles back at rest, so a tap has a physical consequence rather than a
    // colour change. `sin(π·t)` is zero at both ends, so the resting size is
    // identical whether the option is selected or not.
    transform: [{ scale: 1 + Math.sin(drive.value * Math.PI) * 0.14 }],
  }));

  const borderStyle = useAnimatedStyle(() => ({
    borderColor: drive.value > 0.5 ? accent : restingBorder,
  }));

  return (
    <PressableScale
      accessibilityRole="radio"
      accessibilityState={{ selected: active, disabled: locked }}
      // Locked once answered in a revealing mode: the feedback is only
      // meaningful against the answer actually given, and letting the learner
      // keep tapping after seeing the result turns it into a guessing game.
      //
      // Locked, but not faded. These rows stop being controls at this point and
      // become the answer the mode exists to show — the default disabled dim
      // was drawing the revealed correct answer, its tick and its text at half
      // opacity on the one screen whose whole job is to be read. See
      // `dimWhenDisabled`.
      dimWhenDisabled={false}
      disabled={locked}
      onPress={() => {
        // Before the state update, so the tick lands with the touch rather than
        // after the row has finished repainting.
        //
        // `answerFeedback` is what decides whether the tap may differ for a
        // right and a wrong answer — it may only where the screen is about to
        // say so anyway. A distinguishable tap in a timed mock would hand the
        // answer back through the learner's fingers on every question.
        answerFeedback(revealsAnswer, isCorrect);
        onSelect(questionId, choiceId);
      }}
      style={[styles.choice, { backgroundColor: colors.surface }]}>
      <Animated.View
        pointerEvents="none"
        style={[styles.choiceFill, { backgroundColor: accentSoft }, fillStyle]}
      />
      <Animated.View
        pointerEvents="none"
        style={[styles.choiceBorder, borderStyle]}
      />

      <View style={[styles.marker, { borderColor: lit ? accent : colors.border }]}>
        <Animated.View
          style={[styles.markerFill, { backgroundColor: accent }, markerFillStyle]}
        />
        <Text
          style={{ color: lit ? colors.onPrimary : colors.textMuted }}
          variant="caption">
          {label}
        </Text>
      </View>
      <Text style={styles.choiceText} variant="body">
        {text}
      </Text>
      {reveal ? (
        <Ionicons
          color={accent}
          name={reveal === 'correct' ? 'checkmark-circle' : 'close-circle'}
          size={20}
        />
      ) : null}
    </PressableScale>
  );
});

/**
 * Isolated from the runner so the once-a-second tick repaints the pill alone
 * rather than the question card and every choice row.
 */
/** Below this many seconds the clock starts beating. */
const LOW_TIME_SECONDS = 30;

function ExamClock() {
  const { colors } = useTheme();
  const motion = useMotion();
  const secondsLeft = useExamClock();

  const lowTime = secondsLeft !== null && secondsLeft <= LOW_TIME_SECONDS;

  /**
   * A slow pulse under the last thirty seconds.
   *
   * This is the one looping animation in the app, and it earns the exception
   * the rest of the icon set is written to avoid: it is bounded (it can only
   * run for thirty seconds), it stops on its own, and the thing it signals —
   * that time is nearly up — is genuinely urgent in a way nothing else in the
   * app is. It is a scale rather than a colour flash because the pill has
   * *already* gone red, and stacking a second colour signal on that would say
   * nothing new.
   */
  const beat = useDerivedValue<number>(() => {
    if (!lowTime || motion.reduced) return 1;
    return withRepeat(
      withSequence(
        withTiming(1.07, { duration: 380, easing: easing.standard }),
        withTiming(1, { duration: 620, easing: easing.standard }),
      ),
      -1,
      false,
    );
  }, [lowTime, motion.reduced]);

  const beatStyle = useAnimatedStyle(() => ({
    transform: [{ scale: beat.value }],
  }));

  // Rendered after the hooks, never before: an early return above them would
  // make the hook order depend on whether the mode is timed.
  if (secondsLeft === null) return <View style={styles.iconButton} />;

  return (
    <Animated.View
      style={[
        styles.timer,
        { backgroundColor: lowTime ? colors.dangerSoft : colors.surfaceAlt },
        beatStyle,
      ]}>
      <Text tone={lowTime ? 'danger' : 'textMuted'} variant="bodyStrong">
        {formatClock(secondsLeft)}
      </Text>
    </Animated.View>
  );
}

export default function ExamSessionScreen() {
  const { t } = useTranslation();
  const { colors, isRTL, script } = useTheme();
  const motion = useMotion();
  const { language } = usePreferences();
  const router = useRouter();

  const {
    status,
    mode,
    questions,
    answers,
    index,
    answeredCount,
    answer,
    goTo,
    next,
    previous,
    submit,
    reset,
  } = useExamSession();

  /** True while the whole-paper grid is open. */
  const [navigating, setNavigating] = useState(false);
  /** True while the question's artwork is open full-width. */
  const [zooming, setZooming] = useState(false);

  // The timer can finish the attempt on its own, so navigation to the result
  // screen is driven by status rather than by the submit handler.
  useEffect(() => {
    if (status === 'finished') router.replace('/exam/result');
  }, [status, router]);

  /**
   * Which way the question card should travel in.
   *
   * Derived from the index rather than set inside `next`/`previous`, because
   * those are not the only things that move it: the runner can be reset, and a
   * direction set by a handler would then be stale. `useRef` rather than state
   * — this is read during the render that reacts to the index change, and
   * storing it in state would need a second render to apply.
   */
  const previousIndex = useRef(index);
  const goingForward = index >= previousIndex.current;
  previousIndex.current = index;

  // `FadeInRight` enters *from* the right. Forward means the next card arrives
  // from the side the text runs toward, which is the right in English and the
  // left in Arabic — so the pair is chosen from the language, exactly as the
  // chevron glyph is.
  const forwardFrom = isRTL ? FadeInLeft : FadeInRight;
  const backFrom = isRTL ? FadeInRight : FadeInLeft;
  const enteringSide = goingForward ? forwardFrom : backFrom;

  const confirmQuit = useCallback(() => {
    // A heavier knock than the tap on a choice, because this is the one control
    // on the screen that can cost the learner the paper they are sitting.
    warningFeedback();
    Alert.alert(t('exam.quitTitle'), t('exam.quitMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('exam.quitConfirm'),
        style: 'destructive',
        // Tear the attempt down before leaving. The provider outlives this
        // screen, so an abandoned attempt would otherwise keep counting down
        // and auto-submit itself into the history as a failed result.
        // Pops back to the exam home already under this screen rather than
        // stacking a second copy of it — see the same note on the result
        // screen's `leave`.
        onPress: () => {
          reset();
          if (router.canGoBack()) router.back();
          else router.replace('/exam');
        },
      },
    ]);
  }, [t, reset, router]);

  // Android's hardware back is the other way out that skips the confirmation —
  // `gestureEnabled: false` only covers the iOS swipe. Route it through the
  // same dialog so an attempt is never abandoned silently.
  useEffect(() => {
    if (status !== 'running') return;
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      confirmQuit();
      return true;
    });
    return () => sub.remove();
  }, [status, confirmQuit]);

  if (status !== 'running' || questions.length === 0) return null;

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;
  // Open practice draws the whole bank and is meant to be stopped when the
  // learner has had enough, so it may be finished from the navigator at any
  // point — see `questionsToGrade`. A timed paper of fixed length may not:
  // finishing early there is submitting, and that has its own button.
  const openEnded = mode !== null && EXAM_MODES[mode].questionCount === null;
  // Whether the mode reveals answers at all, which the choice rows need at
  // *press* time to pick their haptic — `revealing` below is already false then,
  // because nothing has been answered yet.
  const modeReveals = mode !== null && EXAM_MODES[mode].immediateFeedback;
  // Reveal only once this question has actually been answered, and only in a
  // mode that asked for it.
  const revealing = modeReveals && selected !== undefined;
  const answeredCorrectly = selected === question.correctChoiceId;

  const confirmSubmit = () => {
    const unanswered = questions.length - answeredCount;
    // Not warned about in open practice: leaving most of a several-hundred
    // question bank untouched is the normal way to use it, and those questions
    // are not marked against the learner anyway.
    if (unanswered > 0 && !openEnded) {
      Alert.alert(
        t('exam.submit'),
        t('exam.unanswered', { count: unanswered }),
        [
          { text: t('common.cancel'), style: 'cancel' },
          { text: t('exam.finish'), onPress: submit },
        ],
      );
      return;
    }
    submit();
  };

  return (
    // The tab bar is hidden for the duration of an attempt, so this screen owns
    // the bottom inset itself.
    <Screen edges={['top', 'bottom']} scroll>
      <View style={styles.topBar}>
        <PressableScale
          accessibilityLabel={t('exam.quitConfirm')}
          accessibilityRole="button"
          onPress={confirmQuit}
          style={styles.iconButton}>
          <Ionicons color={colors.textMuted} name="close" size={24} />
        </PressableScale>

        {/*
          The position readout doubles as the way into the whole-paper grid.

          It is the obvious place for it — it is already the thing on screen
          that says where you are in the paper — and it avoids adding a fifth
          control to a bar that has to stay legible with a clock beating in it.
          The grid icon is what marks it as pressable; a bare line of text that
          happens to respond to a tap is a control nobody finds.
        */}
        <PressableScale
          accessibilityHint={t('exam.navigatorHint')}
          accessibilityRole="button"
          onPress={() => setNavigating(true)}
          scaleTo={0.95}
          style={[styles.progressPill, { backgroundColor: colors.surfaceAlt }]}>
          <Ionicons color={colors.textMuted} name="grid-outline" size={14} />
          <Text tone="textMuted" variant="caption">
            {t('exam.questionProgress', {
              current: index + 1,
              total: questions.length,
            })}
          </Text>
        </PressableScale>

        <ExamClock />
      </View>

      <ProgressBar
        accessibilityLabel={t('exam.questionProgress', {
          current: index + 1,
          total: questions.length,
        })}
        value={(index + 1) / questions.length}
      />

      {/*
        Keyed on the question, so moving between questions unmounts one card and
        mounts the next — which is what gives Reanimated an entering animation
        to play. Keying on the *index* would keep the same element mounted and
        merely change its text, and nothing would move.

        The card and its choices are one animated block rather than two: they
        are a single unit of content, and sliding them independently reads as
        the screen coming apart.
      */}
      <Animated.View
        entering={motion.reduced ? undefined : enteringSide.duration(duration.base)}
        key={question.id}
        style={styles.questionBlock}>
        <Card style={styles.questionCard}>
          {/*
            Tappable, exactly as the Learn catalogue's artwork is.

            A third of the bank is picture questions, and several families of
            them turn on detail that a 180pt card cannot carry: the six
            engine-bay photographs ask which *indicated* part is which, and the
            right-of-way diagrams have to be read for which car is where. The
            learner could open those pictures in the Learn tab and not in the
            exam, which is the wrong way round — the exam is where getting it
            right counts.
          */}
          {/*
            `fade` is on here and off in the two lists: this is a single image
            arriving on a screen that is holding still, which is the case a
            cross-fade is for.
          */}
          {question.image ? (
            <Artwork
              fade
              label={pick(question.prompt, language)}
              onPress={() => setZooming(true)}
              recyclingKey={question.id}
              source={question.image}
            />
          ) : null}
          <Text variant="heading">{pick(question.prompt, language)}</Text>
        </Card>

        <View style={styles.choices}>
          {question.choices.map((choice, position) => (
            <Choice
              active={selected === choice.id}
              choiceId={choice.id}
              key={choice.id}
              // Drawn from the reader's own writing system, not from the Latin
              // alphabet: an Arabic paper enumerates أ ب ج د. See
              // `features/exam/choice-markers.ts`.
              isCorrect={choice.id === question.correctChoiceId}
              label={choiceMarker(script, position)}
              locked={revealing}
              onSelect={answer}
              questionId={question.id}
              reveal={
                !revealing
                  ? null
                  : choice.id === question.correctChoiceId
                    ? 'correct'
                    : choice.id === selected
                      ? 'wrong'
                      : null
              }
              revealsAnswer={modeReveals}
              text={pick(choice.text, language)}
            />
          ))}
        </View>

        {/* Open practice explains itself as it goes; that is what makes it
            practice rather than a shorter exam. */}
        {revealing ? (
          <Animated.View entering={motion.appear(0)}>
            <Card
              style={[
                styles.feedbackCard,
                {
                  backgroundColor: answeredCorrectly
                    ? colors.successSoft
                    : colors.dangerSoft,
                },
              ]}>
              <Text
                tone={answeredCorrectly ? 'success' : 'danger'}
                variant="bodyStrong">
                {t(answeredCorrectly ? 'exam.openCorrect' : 'exam.openWrong')}
              </Text>
              <Text variant="body">{pick(question.explanation, language)}</Text>
            </Card>
          </Animated.View>
        ) : null}
      </Animated.View>

      <View style={styles.actions}>
        {index > 0 ? (
          <View style={styles.action}>
            <Button
              label={t('common.back')}
              onPress={previous}
              variant="secondary"
            />
          </View>
        ) : null}
        <View style={styles.action}>
          {isLast ? (
            <Button
              // The same guard the navigator's finish button carries, and it
              // needs to be in both places. `finalise` refuses to grade an
              // empty open attempt — `questionsToGrade` returns nothing, and a
              // zero-length attempt grades 0% and fails the `total > 0` CHECK
              // on `exam_attempts`. The navigator was disabled behind that;
              // this button was not, so the last card of an open practice with
              // nothing answered had a Submit that silently did nothing. It is
              // reachable in two taps, because the navigator jumps to any
              // question including the last one.
              disabled={openEnded && answeredCount === 0}
              label={t('exam.submit')}
              onPress={confirmSubmit}
            />
          ) : (
            <Button label={t('common.next')} onPress={next} />
          )}
        </View>
      </View>

      {navigating ? (
        <QuestionNavigator
          answers={answers}
          canFinishEarly={openEnded}
          index={index}
          onClose={() => setNavigating(false)}
          onFinish={() => {
            // Closed first, so the sheet is not still mounted over the result
            // screen the status change navigates to.
            setNavigating(false);
            submit();
          }}
          onJump={(target) => {
            setNavigating(false);
            goTo(target);
          }}
          questions={questions}
          revealing={mode !== null && EXAM_MODES[mode].immediateFeedback}
        />
      ) : null}

      {zooming && question.image ? (
        <ArtworkViewer
          onClose={() => setZooming(false)}
          source={question.image}
          title={pick(question.prompt, language)}
        />
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timer: {
    minWidth: 64,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    alignItems: 'center',
  },
  progressPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  questionBlock: { gap: spacing.lg },
  questionCard: { gap: spacing.md },
  // Same affordance the Learn cards carry, in the same corner: small and
  // low-contrast, because it has to be findable without competing with the
  // picture that is the thing being read.
  choices: { gap: spacing.sm },
  feedbackCard: { gap: spacing.xs },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.md,
    // The border lives on its own absolutely-positioned layer so its colour can
    // animate without the 1.5pt inset shifting the row's contents when it does.
    overflow: 'hidden',
  },
  choiceFill: StyleSheet.absoluteFillObject,
  choiceBorder: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  marker: {
    width: 28,
    height: 28,
    borderRadius: radius.pill,
    borderWidth: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  markerFill: StyleSheet.absoluteFillObject,
  choiceText: { flex: 1 },
  actions: { flexDirection: 'row', gap: spacing.md },
  action: { flex: 1 },
});
