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
const MIN_PASSWORD_LENGTH = 8;

export default function SignUpScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { signUp, configured } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const submit = async () => {
    setError(null);
    setNotice(null);
    if (!name.trim()) {
      setError(t('auth.nameRequired'));
      return;
    }
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError(t('auth.invalidEmail'));
      return;
    }
    if (password.length < MIN_PASSWORD_LENGTH) {
      setError(t('auth.passwordTooShort'));
      return;
    }
    if (!configured) {
      setError(t('auth.notConfigured'));
      return;
    }
    setBusy(true);
    try {
      await signUp(name, email, password);
      // With email confirmation enabled (the Supabase default) there is no
      // session yet, so we point the user at their inbox rather than the tabs.
      setNotice(t('auth.checkEmail'));
    } catch (e) {
      setError(e instanceof Error ? e.message : t('common.error'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen contentStyle={styles.content}>
      <View style={styles.header}>
        <Text variant="display">{t('auth.signUpTitle')}</Text>
        <Text variant="body" tone="textMuted">
          {t('auth.signUpSubtitle')}
        </Text>
      </View>

      <View style={styles.form}>
        <Field
          autoComplete="name"
          label={t('auth.fullName')}
          onChangeText={setName}
          value={name}
        />
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
          autoComplete="new-password"
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
        {notice ? (
          <Text tone="success" variant="caption">
            {notice}
          </Text>
        ) : null}
        <Button label={t('auth.signUp')} loading={busy} onPress={() => void submit()} />
      </View>

      <View style={styles.inline}>
        <Text tone="textMuted" variant="caption">
          {t('auth.haveAccount')}
        </Text>
        <Link href="/sign-in" replace>
          <Text tone="primary" variant="caption">
            {t('auth.signIn')}
          </Text>
        </Link>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingTop: spacing.xxl },
  header: { gap: spacing.xs },
  form: { gap: spacing.md },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
});
