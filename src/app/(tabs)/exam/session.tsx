import Ionicons from '@expo/vector-icons/Ionicons';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { pick } from '@/content/schema';
import { useExamSession } from '@/features/exam/exam-session';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

function formatClock(totalSeconds: number): string {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}:${`${s}`.padStart(2, '0')}`;
}

export default function ExamSessionScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { language } = usePreferences();
  const router = useRouter();

  const {
    status,
    questions,
    answers,
    index,
    secondsLeft,
    answeredCount,
    answer,
    next,
    previous,
    submit,
  } = useExamSession();

  // The timer can finish the attempt on its own, so navigation to the result
  // screen is driven by status rather than by the submit handler.
  useEffect(() => {
    if (status === 'finished') router.replace('/exam/result');
  }, [status, router]);

  if (status !== 'running' || questions.length === 0) return null;

  const question = questions[index];
  const selected = answers[question.id];
  const isLast = index === questions.length - 1;
  const lowTime = secondsLeft !== null && secondsLeft <= 30;

  const confirmQuit = () => {
    Alert.alert(t('exam.quitTitle'), t('exam.quitMessage'), [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('exam.quitConfirm'),
        style: 'destructive',
        onPress: () => router.replace('/exam'),
      },
    ]);
  };

  const confirmSubmit = () => {
    const unanswered = questions.length - answeredCount;
    if (unanswered > 0) {
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
    <Screen edges={['top']} scroll>
      <View style={styles.topBar}>
        <PressableScale
          accessibilityLabel={t('exam.quitConfirm')}
          accessibilityRole="button"
          onPress={confirmQuit}
          style={styles.iconButton}>
          <Ionicons color={colors.textMuted} name="close" size={24} />
        </PressableScale>

        <Text tone="textMuted" variant="caption">
          {t('exam.questionProgress', {
            current: index + 1,
            total: questions.length,
          })}
        </Text>

        {secondsLeft !== null ? (
          <View
            style={[
              styles.timer,
              { backgroundColor: lowTime ? colors.dangerSoft : colors.surfaceAlt },
            ]}>
            <Text
              tone={lowTime ? 'danger' : 'textMuted'}
              variant="bodyStrong">
              {formatClock(secondsLeft)}
            </Text>
          </View>
        ) : (
          <View style={styles.iconButton} />
        )}
      </View>

      <View style={[styles.track, { backgroundColor: colors.surfaceAlt }]}>
        <View
          style={[
            styles.fill,
            {
              backgroundColor: colors.primary,
              width: `${((index + 1) / questions.length) * 100}%`,
            },
          ]}
        />
      </View>

      <Card style={styles.questionCard}>
        {question.image ? (
          <Image
            contentFit="contain"
            source={question.image}
            style={styles.image}
          />
        ) : null}
        <Text variant="heading">{pick(question.prompt, language)}</Text>
      </Card>

      <View style={styles.choices}>
        {question.choices.map((choice, position) => {
          const active = selected === choice.id;
          return (
            <PressableScale
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              key={choice.id}
              onPress={() => answer(question.id, choice.id)}
              style={[
                styles.choice,
                {
                  backgroundColor: active ? colors.primarySoft : colors.surface,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}>
              <View
                style={[
                  styles.marker,
                  {
                    backgroundColor: active ? colors.primary : 'transparent',
                    borderColor: active ? colors.primary : colors.border,
                  },
                ]}>
                <Text
                  style={{ color: active ? colors.onPrimary : colors.textMuted }}
                  variant="caption">
                  {String.fromCharCode(65 + position)}
                </Text>
              </View>
              <Text style={styles.choiceText} variant="body">
                {pick(choice.text, language)}
              </Text>
            </PressableScale>
          );
        })}
      </View>

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
            <Button label={t('exam.submit')} onPress={confirmSubmit} />
          ) : (
            <Button label={t('common.next')} onPress={next} />
          )}
        </View>
      </View>
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
  track: {
    height: 6,
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.pill },
  questionCard: { gap: spacing.md },
  image: { width: '100%', height: 180, borderRadius: radius.md },
  choices: { gap: spacing.sm },
  choice: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.lg,
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
  },
  choiceText: { flex: 1 },
  actions: { flexDirection: 'row', gap: spacing.md },
  action: { flex: 1 },
});
