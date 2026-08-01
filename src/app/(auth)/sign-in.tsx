import { Link, useRouter } from 'expo-router';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import { spacing } from '@/theme/tokens';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SignInScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signIn, continueAsGuest, configured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(null);
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError(t('auth.invalidEmail'));
      return;
    }
    if (!configured) {
      setError(t('auth.notConfigured'));
      return;
    }
    setBusy(true);
    try {
      await signIn(email, password);
      router.replace('/learn');
    } catch (e) {
      setError(e instanceof Error ? e.message : t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  const guest = async () => {
    await continueAsGuest();
    router.replace('/learn');
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="display">{t('auth.signInTitle')}</Text>
        <Text variant="body" tone="textMuted">
          {t('auth.signInSubtitle')}
        </Text>
      </View>

      <View style={styles.form}>
        <Field
          autoCapitalize="none"
          autoComplete="email"
          inputMode="email"
          keyboardType="email-address"
          label={t('auth.email')}
          onChangeText={setEmail}
          value={email}
        />
        <Field
          autoCapitalize="none"
          autoComplete="current-password"
          label={t('auth.password')}
          onChangeText={setPassword}
          secureTextEntry
          value={password}
        />
        {error ? (
          <Text tone="danger" variant="caption">
            {error}
          </Text>
        ) : null}
        <Button label={t('auth.signIn')} loading={busy} onPress={() => void submit()} />
      </View>

      <View style={styles.footer}>
        <View style={styles.inline}>
          <Text tone="textMuted" variant="caption">
            {t('auth.noAccount')}
          </Text>
          <Link href="/sign-up">
            <Text tone="primary" variant="caption">
              {t('auth.signUp')}
            </Text>
          </Link>
        </View>
        <Button
          label={t('auth.continueAsGuest')}
          onPress={() => void guest()}
          variant="ghost"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingTop: spacing.xxl },
  header: { gap: spacing.xs },
  form: { gap: spacing.md },
  footer: { gap: spacing.sm },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
});
