import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Notice } from '@/components/ui/notice';
import { Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import { authErrorKey } from '@/features/auth/errors';
import { isValidEmail } from '@/features/auth/validation';
import { warningFeedback } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import { readJSON, StorageKeys } from '@/lib/storage';
import { spacing } from '@/theme/tokens';

export default function ForgotPasswordScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const motion = useMotion();
  const { requestPasswordReset, configured } = useAuth();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /*
    Prefilled from the last successful sign-in on this device, exactly as the
    sign-in screen prefills itself.

    This is the screen where it helps most. Someone arrives here *because* they
    could not get in, which means the address is the one thing on the form they
    do still know — and the reset mail goes to whatever is typed here, so an
    address entered from memory with a typo produces the app's most confusing
    possible outcome: a success notice, worded "if an account exists", and no
    mail ever arriving.
  */
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const stored = await readJSON<string | null>(StorageKeys.lastEmail, null);
      // Never clobbers something already typed: this resolves a frame or two
      // after mount, and a fast typist can beat it to the field.
      if (!cancelled && stored) setEmail((current) => current || stored);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const submit = async () => {
    setEmailError(null);
    setFormError(null);
    setNotice(null);

    // Trimmed before it is judged, matching every other address field in the
    // flow — a leading space from a paste is invisible and fails the pattern.
    const address = email.trim();
    if (!address) {
      setEmailError(t('auth.emailRequired'));
      return;
    }
    if (!isValidEmail(address)) {
      setEmailError(t('auth.invalidEmail'));
      return;
    }
    if (!configured) {
      setFormError(t('auth.notConfigured'));
      return;
    }

    setBusy(true);
    try {
      await requestPasswordReset(address);
      // Worded as "if an account exists" on purpose: Supabase resolves
      // successfully for an unregistered address too, and confirming which
      // addresses have accounts would make this screen an enumeration oracle.
      setNotice(t('auth.resetLinkSent'));
    } catch (e) {
      setFormError(t(authErrorKey(e)));
      warningFeedback();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen contentStyle={styles.content} wash="heroWash">
      <Animated.View entering={motion.entrance(0)} style={styles.header}>
        <Text variant="display">{t('auth.forgotTitle')}</Text>
        <Text variant="body" tone="textMuted">
          {t('auth.forgotSubtitle')}
        </Text>
      </Animated.View>

      <Animated.View entering={motion.entrance(1)} style={styles.form}>
        <Field
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          error={emailError}
          inputMode="email"
          keyboardType="email-address"
          label={t('auth.email')}
          onChangeText={(next) => {
            setEmail(next);
            if (emailError) setEmailError(null);
            if (formError) setFormError(null);
            // The success notice goes too. It names the address the mail went
            // to; leaving it up while a *different* address is typed underneath
            // is the notice describing something that did not happen.
            if (notice) setNotice(null);
          }}
          // The only field on the screen, so the return key submits rather than
          // advancing to something that is not there.
          onSubmitEditing={() => void submit()}
          returnKeyType="go"
          textContentType="emailAddress"
          value={email}
        />

        {formError ? <Notice tone="danger">{formError}</Notice> : null}
        {/*
          The whole outcome of this screen, so it is a block rather than the
          bare green caption it used to be — that read as a field hint, under a
          button, on the one screen where nothing else happens to confirm the
          mail was sent.
        */}
        {notice ? <Notice tone="success">{notice}</Notice> : null}

        <Button
          disabled={!email.trim()}
          label={t('auth.sendResetLink')}
          loading={busy}
          onPress={() => void submit()}
        />
      </Animated.View>

      {!configured ? (
        <Notice tone="warning">{t('auth.notConfigured')}</Notice>
      ) : null}

      <Animated.View entering={motion.entrance(2)}>
        <Button
          label={t('auth.backToSignIn')}
          onPress={() => router.replace('/sign-in')}
          variant="ghost"
        />
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingTop: spacing.xxl },
  header: { gap: spacing.xs },
  form: { gap: spacing.md },
});
