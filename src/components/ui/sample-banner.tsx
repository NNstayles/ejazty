import { StyleSheet, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { sampleAreas, type SampleArea } from '@/content/registry';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import { Text } from './text';

/**
 * Standing warning that the material in one area is still placeholder text.
 * Renders nothing once that area is fully transcribed from the official
 * source, so shipping the real content removes it automatically.
 */
export function SampleBanner({ area }: { area: SampleArea }) {
  const { t } = useTranslation();
  const { colors } = useTheme();

  if (!sampleAreas[area]) return null;

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.container,
        { backgroundColor: colors.warningSoft, borderColor: colors.warning },
      ]}>
      <Text variant="bodyStrong" style={{ color: colors.warning }}>
        {t('content.sampleTitle')}
      </Text>
      <Text variant="caption" style={{ color: colors.warning }}>
        {t('content.sampleBody')}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    padding: spacing.md,
    gap: spacing.xs,
  },
});
