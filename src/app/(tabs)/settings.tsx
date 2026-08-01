import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, StyleSheet, Switch, View } from 'react-native';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Card, Screen, SectionHeader } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import { hasPermission } from '@/features/notifications';
import { LANGUAGES, type LanguageCode } from '@/i18n';
import {
  usePreferences,
  type ThemeMode,
} from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

const THEME_OPTIONS: { mode: ThemeMode; labelKey: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { mode: 'light', labelKey: 'settings.themeLight', icon: 'sunny-outline' },
  { mode: 'dark', labelKey: 'settings.themeDark', icon: 'moon-outline' },
  { mode: 'system', labelKey: 'settings.themeSystem', icon: 'phone-portrait-outline' },
];

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { user, isGuest, signOut } = useAuth();
  const {
    language,
    setLanguage,
    themeMode,
    setThemeMode,
    notificationsEnabled,
    setNotificationsEnabled,
    pendingRestart,
  } = usePreferences();

  const [permissionBlocked, setPermissionBlocked] = useState(false);

  // Re-check on mount: the user may have revoked permission in the OS since
  // the toggle was last flipped.
  useEffect(() => {
    if (!notificationsEnabled) {
      setPermissionBlocked(false);
      return;
    }
    void hasPermission().then((granted) => setPermissionBlocked(!granted));
  }, [notificationsEnabled]);

  const toggleNotifications = async (value: boolean) => {
    await setNotificationsEnabled(value);
    if (value) setPermissionBlocked(!(await hasPermission()));
  };

  const confirmSignOut = () => {
    Alert.alert(t('auth.signOut'), '', [
      { text: t('common.cancel'), style: 'cancel' },
      {
        text: t('auth.signOut'),
        style: 'destructive',
        onPress: async () => {
          await signOut();
          router.replace('/sign-in');
        },
      },
    ]);
  };

  return (
    <Screen>
      <SectionHeader title={t('settings.title')} />

      {/* Account */}
      <Text tone="textMuted" variant="overline">
        {t('settings.account').toUpperCase()}
      </Text>
      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={[styles.avatar, { backgroundColor: colors.primarySoft }]}>
            <Ionicons color={colors.primary} name="person-outline" size={20} />
          </View>
          <View style={styles.rowBody}>
            <Text variant="bodyStrong">
              {user?.displayName ?? (isGuest ? t('auth.guest') : '—')}
            </Text>
            <Text tone="textMuted" variant="caption">
              {user?.email ?? t('auth.continueAsGuest')}
            </Text>
          </View>
        </View>
        <PressableScale
          accessibilityRole="button"
          onPress={confirmSignOut}
          style={[styles.signOut, { borderColor: colors.border }]}>
          <Ionicons color={colors.danger} name="log-out-outline" size={18} />
          <Text tone="danger" variant="bodyStrong">
            {t('auth.signOut')}
          </Text>
        </PressableScale>
      </Card>

      {/* App */}
      <Text tone="textMuted" variant="overline">
        {t('settings.app').toUpperCase()}
      </Text>

      <Card style={styles.card}>
        <Text variant="bodyStrong">{t('settings.language')}</Text>
        <View style={styles.options}>
          {LANGUAGES.map((entry) => (
            <OptionRow
              active={entry.code === language}
              key={entry.code}
              onPress={() => void setLanguage(entry.code as LanguageCode)}
              subtitle={entry.englishName}
              title={entry.nativeName}
            />
          ))}
        </View>
        {pendingRestart ? (
          <Text tone="warning" variant="caption">
            {t('common.done')} — restart the app to finish switching the layout
            direction.
          </Text>
        ) : null}
      </Card>

      <Card style={styles.card}>
        <Text variant="bodyStrong">{t('settings.theme')}</Text>
        <View style={styles.options}>
          {THEME_OPTIONS.map((option) => (
            <OptionRow
              active={option.mode === themeMode}
              icon={option.icon}
              key={option.mode}
              onPress={() => void setThemeMode(option.mode)}
              title={t(option.labelKey)}
            />
          ))}
        </View>
      </Card>

      <Card style={styles.card}>
        <View style={styles.row}>
          <View style={styles.rowBody}>
            <Text variant="bodyStrong">{t('settings.notifications')}</Text>
            <Text tone="textMuted" variant="caption">
              {t('settings.notificationsDesc')}
            </Text>
          </View>
          <Switch
            onValueChange={(v) => void toggleNotifications(v)}
            thumbColor={colors.surface}
            trackColor={{ false: colors.border, true: colors.primary }}
            value={notificationsEnabled}
          />
        </View>
        {permissionBlocked ? (
          <View style={styles.blocked}>
            <Text tone="warning" variant="caption">
              {t('settings.notificationsBlocked')}
            </Text>
            <PressableScale
              accessibilityRole="button"
              onPress={() => void Linking.openSettings()}>
              <Text tone="primary" variant="caption">
                {t('settings.openSettings')}
              </Text>
            </PressableScale>
          </View>
        ) : null}
      </Card>

      <Card style={styles.card}>
        <View style={styles.row}>
          <Text tone="textMuted" variant="caption">
            {t('settings.version')}
          </Text>
          <Text tone="textMuted" variant="caption">
            {Constants.expoConfig?.version ?? '1.0.0'}
          </Text>
        </View>
      </Card>
    </Screen>
  );
}

function OptionRow({
  title,
  subtitle,
  active,
  onPress,
  icon,
}: {
  title: string;
  subtitle?: string;
  active: boolean;
  onPress: () => void;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  const { colors } = useTheme();
  return (
    <PressableScale
      accessibilityRole="radio"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      scaleTo={0.98}
      style={[
        styles.option,
        {
          backgroundColor: active ? colors.primarySoft : colors.surfaceAlt,
          borderColor: active ? colors.primary : 'transparent',
        },
      ]}>
      {icon ? (
        <Ionicons
          color={active ? colors.primary : colors.textMuted}
          name={icon}
          size={18}
        />
      ) : null}
      <View style={styles.rowBody}>
        <Text variant="body">{title}</Text>
        {subtitle ? (
          <Text tone="textFaint" variant="caption">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {active ? (
        <Ionicons color={colors.primary} name="checkmark" size={18} />
      ) : null}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  card: { gap: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowBody: { flex: 1, gap: 2 },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  signOut: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
  },
  options: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  blocked: { gap: spacing.xs },
});
