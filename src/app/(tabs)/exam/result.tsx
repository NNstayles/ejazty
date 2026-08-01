import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { pick } from '@/content/schema';
import { PASS_THRESHOLD } from '@/features/exam/engine';
import { useExamSession } from '@/features/exam/exam-session';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

export default function ExamResultScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { language } = usePreferences();
  const router = useRouter();
  const { result, mode, start, reset } = useExamSession();
  const [reviewing, setReviewing] = useState(false);

  if (!result) return null;

  const accent = result.passed ? colors.success : colors.danger;
  const accentSoft = result.passed ? colors.successSoft : colors.dangerSoft;

  const retake = () => {
    if (!mode) return;
    start(mode);
    router.replace('/exam/session');
  };

  const leave = () => {
    reset();
    router.replace('/exam');
  };

  return (
    <Screen edges={['top']}>
      <Card style={[styles.hero, { borderColor: accent }]}>
        <View style={[styles.badge, { backgroundColor: accentSoft }]}>
          <Ionicons
            color={accent}
            name={result.passed ? 'checkmark-circle' : 'close-circle'}
            size={40}
          />
        </View>

        <Text center style={{ color: accent }} variant="display">
          {result.percent}%
        </Text>
        <Text center style={{ color: accent }} variant="heading">
          {result.passed ? t('result.passed') : t('result.failed')}
        </Text>
        <Text center tone="textMuted" variant="caption">
          {result.passed ? t('result.passedMessage') : t('result.failedMessage')}
        </Text>
        <Text center tone="textFaint" variant="caption">
          {t('result.passMark', { percent: Math.round(PASS_THRESHOLD * 100) })}
        </Text>
      </Card>

      <View style={styles.stats}>
        <Stat
          label={t('result.correct')}
          tone={colors.success}
          value={result.correct}
        />
        <Stat label={t('result.wrong')} tone={colors.danger} value={result.wrong} />
        <Stat
          label={t('result.skipped')}
          tone={colors.textMuted}
          value={result.skipped}
        />
      </View>

      <View style={styles.actions}>
        <Button
          label={reviewing ? t('common.close') : t('result.review')}
          onPress={() => setReviewing((v) => !v)}
          variant="secondary"
        />
        <Button label={t('result.retake')} onPress={retake} />
        <Button
          label={t('result.backToExams')}
          onPress={leave}
          variant="ghost"
        />
      </View>

      {reviewing
        ? result.graded.map((item, position) => {
            const correctChoice = item.question.choices.find(
              (c) => c.id === item.question.correctChoiceId,
            );
            const chosen = item.question.choices.find(
              (c) => c.id === item.selectedChoiceId,
            );

            return (
              <Card key={item.question.id} style={styles.reviewCard}>
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

                <Text variant="bodyStrong">
                  {pick(item.question.prompt, language)}
                </Text>

                {!item.correct ? (
                  <View style={styles.reviewLine}>
                    <Text tone="textMuted" variant="overline">
                      {t('result.yourAnswer').toUpperCase()}
                    </Text>
                    <Text tone="danger" variant="body">
                      {chosen
                        ? pick(chosen.text, language)
                        : t('result.noAnswer')}
                    </Text>
                  </View>
                ) : null}

                <View style={styles.reviewLine}>
                  <Text tone="textMuted" variant="overline">
                    {t('result.correctAnswer').toUpperCase()}
                  </Text>
                  <Text tone="success" variant="body">
                    {correctChoice ? pick(correctChoice.text, language) : '—'}
                  </Text>
                </View>

                <View style={styles.reviewLine}>
                  <Text tone="textMuted" variant="overline">
                    {t('result.explanation').toUpperCase()}
                  </Text>
                  <Text tone="textMuted" variant="body">
                    {pick(item.question.explanation, language)}
                  </Text>
                </View>
              </Card>
            );
          })
        : null}
    </Screen>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.stat,
        { backgroundColor: colors.surface, borderColor: colors.border },
      ]}>
      <Text style={{ color: tone }} variant="title">
        {value}
      </Text>
      <Text tone="textMuted" variant="caption">
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: spacing.xs,
    borderWidth: 1.5,
  },
  badge: {
    width: 72,
    height: 72,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  stats: { flexDirection: 'row', gap: spacing.sm },
  stat: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.lg,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  actions: { gap: spacing.sm },
  reviewCard: { gap: spacing.sm },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  reviewLine: { gap: 2 },
});
