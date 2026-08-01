import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/theme-provider';
import { elevation, radius, spacing } from '@/theme/tokens';
import { Text } from './text';

export function Screen({
  children,
  scroll = true,
  edges = ['top'],
  contentStyle,
}: {
  children: ReactNode;
  scroll?: boolean;
  edges?: readonly Edge[];
  contentStyle?: ViewStyle;
}) {
  const { colors } = useTheme();
  const body = scroll ? (
    <ScrollView
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.flex, { backgroundColor: colors.background }]}>
      {body}
    </SafeAreaView>
  );
}

export function Card({
  children,
  style,
  padded = true,
}: {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  padded?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        padded && { padding: spacing.lg },
        { backgroundColor: colors.surface, borderColor: colors.border },
        elevation(colors.shadow, 1),
        style,
      ]}>
      {children}
    </View>
  );
}

export function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <View style={styles.sectionHeader}>
      <Text variant="title">{title}</Text>
      {subtitle ? (
        <Text variant="body" tone="textMuted">
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

export function Badge({
  label,
  tone = 'info',
}: {
  label: string;
  tone?: 'info' | 'success' | 'danger' | 'warning' | 'primary';
}) {
  const { colors } = useTheme();
  const map = {
    info: { bg: colors.infoSoft, fg: colors.info },
    success: { bg: colors.successSoft, fg: colors.success },
    danger: { bg: colors.dangerSoft, fg: colors.danger },
    warning: { bg: colors.warningSoft, fg: colors.warning },
    primary: { bg: colors.primarySoft, fg: colors.primary },
  }[tone];

  return (
    <View style={[styles.badge, { backgroundColor: map.bg }]}>
      <Text variant="overline" style={{ color: map.fg }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
  },
  sectionHeader: { gap: spacing.xs },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.pill,
  },
});
