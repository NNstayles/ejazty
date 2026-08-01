import { Image } from 'expo-image';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { SampleBanner } from '@/components/ui/sample-banner';
import { Badge, Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import {
  priorityScenarios,
  rules,
  signs,
  violations,
} from '@/content/registry';
import { pick, type Localized, type SourceRef } from '@/content/schema';
import type { LanguageCode } from '@/i18n';
import { usePreferences } from '@/preferences/preferences-provider';
import { radius, spacing } from '@/theme/tokens';
import type { ImageSourcePropType } from 'react-native';

export type LearnSectionId = 'signs' | 'violations' | 'rules' | 'priority';

/** One item flattened into the shape this screen renders. */
type Entry = {
  id: string;
  title: string;
  image?: ImageSourcePropType;
  verified: boolean;
  source: SourceRef;
  /** Label/value pairs shown in order. */
  blocks: { label: string; value: string }[];
};

const SECTION_TITLE_KEYS: Record<LearnSectionId, string> = {
  signs: 'learn.signs',
  violations: 'learn.violations',
  rules: 'learn.rules',
  priority: 'learn.priority',
};

function buildEntries(
  section: LearnSectionId,
  lang: LanguageCode,
  t: (key: string) => string,
): Entry[] {
  const p = (value: Localized) => pick(value, lang);

  switch (section) {
    case 'signs':
      return signs.map((s) => ({
        id: s.id,
        title: p(s.title),
        image: s.image,
        verified: s.verified,
        source: s.source,
        blocks: [
          { label: t('learn.meaning'), value: p(s.meaning) },
          { label: t('learn.whatToDo'), value: p(s.action) },
        ],
      }));
    case 'violations':
      return violations.map((v) => ({
        id: v.id,
        title: p(v.title),
        verified: v.verified,
        source: v.source,
        blocks: [
          { label: t('learn.meaning'), value: p(v.description) },
          { label: t('learn.penalty'), value: p(v.penalty) },
        ],
      }));
    case 'rules':
      return rules.map((r) => ({
        id: r.id,
        title: p(r.title),
        verified: r.verified,
        source: r.source,
        blocks: [{ label: t('learn.meaning'), value: p(r.body) }],
      }));
    case 'priority':
      return priorityScenarios.map((s) => ({
        id: s.id,
        title: p(s.title),
        image: s.image,
        verified: s.verified,
        source: s.source,
        blocks: [{ label: t('learn.whatToDo'), value: p(s.description) }],
      }));
  }
}

export default function LearnSectionScreen() {
  const { t } = useTranslation();
  const { language } = usePreferences();
  const params = useLocalSearchParams<{ section: string }>();

  const section = (
    ['signs', 'violations', 'rules', 'priority'] as const
  ).includes(params.section as LearnSectionId)
    ? (params.section as LearnSectionId)
    : 'signs';

  const entries = buildEntries(section, language, t);

  return (
    <>
      <Stack.Screen options={{ title: t(SECTION_TITLE_KEYS[section]) }} />
      <Screen edges={[]}>
        <SampleBanner />

        {entries.length === 0 ? (
          <Text tone="textMuted">{t('learn.empty')}</Text>
        ) : (
          entries.map((entry) => (
            <Card key={entry.id} style={styles.card}>
              <View style={styles.titleRow}>
                <Text style={styles.title} variant="heading">
                  {entry.title}
                </Text>
                {!entry.verified ? (
                  <Badge label={t('content.unofficial')} tone="warning" />
                ) : null}
              </View>

              {entry.image ? (
                <Image
                  contentFit="contain"
                  source={entry.image}
                  style={styles.image}
                />
              ) : null}

              {entry.blocks.map((block) => (
                <View key={block.label} style={styles.block}>
                  <Text tone="textMuted" variant="overline">
                    {block.label.toUpperCase()}
                  </Text>
                  <Text variant="body">{block.value}</Text>
                </View>
              ))}

              <Text tone="textFaint" variant="caption">
                {t('learn.source')}: {entry.source.document}
                {entry.source.locator ? ` — ${entry.source.locator}` : ''}
              </Text>
            </Card>
          ))
        )}
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
  },
  title: { flex: 1 },
  image: {
    width: '100%',
    height: 160,
    borderRadius: radius.md,
  },
  block: { gap: spacing.xs },
});
