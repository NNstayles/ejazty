import { useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { LANGUAGES, type LanguageCode } from '@/i18n';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

export default function LanguageScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const { language, setLanguage } = usePreferences();
  const [selected, setSelected] = useState<LanguageCode>(language);
  const [busy, setBusy] = useState(false);

  const choose = async (code: LanguageCode) => {
    setSelected(code);
    // Applied immediately so the rest of this screen switches language as the
    // user taps, making the choice self-evident.
    await setLanguage(code);
  };

  const confirm = () => {
    setBusy(true);
    // `completeOnboarding` is **not** called here any more; the tour on the
    // next screen writes it at the end of the flow. So an app killed between
    // the two resumes here rather than skipping the one screen that explains
    // what the app does — and nothing is lost by resuming, because the chosen
    // language is persisted and applied the moment it is tapped, above.
    //
    // `replace` rather than `push`: there is nothing to go back to, and a back
    // gesture onto a language picker that has already taken effect is a control
    // that appears to undo something and does not.
    router.replace('/onboarding');
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="display">{t('common.appName')}</Text>
        <Text variant="body" tone="textMuted">
          {t('onboarding.tagline')}
        </Text>
      </View>

      <View style={styles.prompt}>
        <Text variant="heading">{t('onboarding.chooseLanguage')}</Text>
        <Text variant="caption" tone="textMuted">
          {t('onboarding.chooseLanguageSubtitle')}
        </Text>
      </View>

      <View style={styles.options}>
        {LANGUAGES.map((entry) => {
          const active = entry.code === selected;
          return (
            <PressableScale
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              key={entry.code}
              onPress={() => void choose(entry.code)}
              style={[
                styles.option,
                {
                  backgroundColor: active ? colors.primarySoft : colors.surface,
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}>
              <View style={styles.optionText}>
                <Text variant="bodyStrong">{entry.nativeName}</Text>
                <Text variant="caption" tone="textMuted">
                  {entry.englishName}
                </Text>
              </View>
              <View
                style={[
                  styles.radio,
                  {
                    borderColor: active ? colors.primary : colors.border,
                    backgroundColor: active ? colors.primary : 'transparent',
                  },
                ]}
              />
            </PressableScale>
          );
        })}
      </View>

      <Button label={t('common.continue')} loading={busy} onPress={confirm} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingTop: spacing.xxl },
  header: { gap: spacing.xs },
  prompt: { gap: spacing.xs },
  options: { gap: spacing.md },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    padding: spacing.lg,
    borderRadius: radius.lg,
    borderWidth: 1.5,
  },
  optionText: { gap: 2 },
  radio: {
    width: 22,
    height: 22,
    borderRadius: radius.pill,
    borderWidth: 2,
  },
});
