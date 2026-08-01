import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { SampleBanner } from '@/components/ui/sample-banner';
import { Badge, Card, Screen, SectionHeader } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import {
  availableQuestionCount,
  canRunExam,
  EXAM_MODES,
  PASS_THRESHOLD,
  type ExamMode,
} from '@/features/exam/engine';
import { useExamSession } from '@/features/exam/exam-session';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

const MODE_META: Record<
  ExamMode,
  { titleKey: string; descKey: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  quick: { titleKey: 'exam.quick', descKey: 'exam.quickDesc', icon: 'flash-outline' },
  medium: { titleKey: 'exam.medium', descKey: 'exam.mediumDesc', icon: 'timer-outline' },
  full: { titleKey: 'exam.full', descKey: 'exam.fullDesc', icon: 'trophy-outline' },
};

export default function ExamHome() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { start, history } = useExamSession();

  const poolSize = availableQuestionCount();

  const begin = (mode: ExamMode) => {
    start(mode);
    router.push('/exam/session');
  };

  return (
    <Screen>
      <SectionHeader title={t('exam.title')} subtitle={t('exam.subtitle')} />
      <SampleBanner area="questions" />

      <View style={styles.list}>
        {(Object.keys(EXAM_MODES) as ExamMode[]).map((mode) => {
          const config = EXAM_MODES[mode];
          const meta = MODE_META[mode];
          const runnable = canRunExam(mode);

          return (
            <PressableScale
              accessibilityRole="button"
              disabled={!runnable}
              key={mode}
              onPress={() => begin(mode)}>
              <Card style={styles.card}>
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.iconWrap,
                      { backgroundColor: colors.primarySoft },
                    ]}>
                    <Ionicons color={colors.primary} name={meta.icon} size={22} />
                  </View>
                  <View style={styles.cardBody}>
                    <Text variant="heading">{t(meta.titleKey)}</Text>
                    <Text tone="textMuted" variant="caption">
                      {t(meta.descKey)}
                    </Text>
                  </View>
                  <Ionicons
                    color={colors.textFaint}
                    name="chevron-forward"
                    size={20}
                  />
                </View>

                <View style={styles.metaRow}>
                  <Badge
                    label={t('exam.questions', { count: config.questionCount })}
                    tone="primary"
                  />
                  <Badge
                    label={
                      config.timeLimitMinutes === null
                        ? t('exam.noTimer')
                        : t('exam.minutes', { count: config.timeLimitMinutes })
                    }
                    tone="info"
                  />
                </View>

                {!runnable ? (
                  <Text tone="warning" variant="caption">
                    {t('exam.notEnough')}
                  </Text>
                ) : null}
              </Card>
            </PressableScale>
          );
        })}
      </View>

      <Card style={styles.infoCard}>
        <Text variant="bodyStrong">
          {t('result.passMark', { percent: Math.round(PASS_THRESHOLD * 100) })}
        </Text>
        <Text tone="textMuted" variant="caption">
          {t('exam.questions', { count: poolSize })}
        </Text>
      </Card>

      {history.length > 0 ? (
        <Card style={styles.infoCard}>
          <Text variant="bodyStrong">{t('result.title')}</Text>
          {history.slice(0, 5).map((attempt) => (
            <View key={attempt.at} style={styles.historyRow}>
              <Text tone="textMuted" variant="caption">
                {t(MODE_META[attempt.mode].titleKey)}
              </Text>
              <Text
                tone={attempt.passed ? 'success' : 'danger'}
                variant="bodyStrong">
                {attempt.percent}%
              </Text>
            </View>
          ))}
        </Card>
      ) : null}
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: { gap: spacing.md },
  card: { gap: spacing.md },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardBody: { flex: 1, gap: 2 },
  metaRow: { flexDirection: 'row', gap: spacing.sm },
  infoCard: { gap: spacing.sm },
  historyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
