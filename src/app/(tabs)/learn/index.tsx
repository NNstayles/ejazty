import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { SampleBanner } from '@/components/ui/sample-banner';
import { Card, Screen, SectionHeader } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import {
  priorityScenarios,
  rules,
  signs,
  violations,
} from '@/content/registry';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import type { LearnSectionId } from './[section]';

type SectionCard = {
  id: LearnSectionId;
  titleKey: string;
  descKey: string;
  icon: keyof typeof Ionicons.glyphMap;
  count: number;
};

export default function LearnHome() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();

  const sections: SectionCard[] = [
    {
      id: 'signs',
      titleKey: 'learn.signs',
      descKey: 'learn.signsDesc',
      icon: 'warning-outline',
      count: signs.length,
    },
    {
      id: 'violations',
      titleKey: 'learn.violations',
      descKey: 'learn.violationsDesc',
      icon: 'alert-circle-outline',
      count: violations.length,
    },
    {
      id: 'rules',
      titleKey: 'learn.rules',
      descKey: 'learn.rulesDesc',
      icon: 'document-text-outline',
      count: rules.length,
    },
    {
      id: 'priority',
      titleKey: 'learn.priority',
      descKey: 'learn.priorityDesc',
      icon: 'git-merge-outline',
      count: priorityScenarios.length,
    },
  ];

  return (
    <Screen>
      <SectionHeader title={t('learn.title')} subtitle={t('learn.subtitle')} />
      <SampleBanner />

      <View style={styles.grid}>
        {sections.map((section) => (
          <PressableScale
            accessibilityRole="button"
            key={section.id}
            onPress={() => router.push(`/learn/${section.id}`)}>
            <Card style={styles.card}>
              <View
                style={[styles.iconWrap, { backgroundColor: colors.primarySoft }]}>
                <Ionicons color={colors.primary} name={section.icon} size={22} />
              </View>
              <View style={styles.cardBody}>
                <Text variant="heading">{t(section.titleKey)}</Text>
                <Text tone="textMuted" variant="caption">
                  {t(section.descKey)}
                </Text>
                <Text tone="textFaint" variant="caption">
                  {t('learn.itemsCount', { count: section.count })}
                </Text>
              </View>
              <Ionicons
                color={colors.textFaint}
                name="chevron-forward"
                size={20}
              />
            </Card>
          </PressableScale>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  grid: { gap: spacing.md },
  card: {
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
});
