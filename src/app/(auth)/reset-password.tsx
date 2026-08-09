import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, StyleSheet, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Notice } from '@/components/ui/notice';
import { Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import { authErrorKey } from '@/features/auth/errors';
import { parseRecoveryLink } from '@/features/auth/recovery';
import { passwordProblemKey } from '@/features/auth/password-strength';
import { warningFeedback } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { spacing } from '@/theme/tokens';

/**
 * Landing screen for the recovery link in the reset mail.
 *
 * `redeeming` covers the window where the link is being turned into a session —
 * the form must not be usable before that, because `updateUser` would have
 * nothing to act on.
 */
type Phase = 'redeeming' | 'ready' | 'invalid' | 'done';

/**
 * How long to wait for the deep link before giving up on it.
 *
 * `getInitialURL()` resolves in milliseconds when there is a URL to resolve, so
 * this only ever elapses when there was never going to be one. Generous anyway:
 * the cost of waiting a moment too long is a spinner, and the cost of giving up
 * too early is telling someone with a perfectly good link to request another.
 */
const LINK_WAIT_MS = 8000;

export default function ResetPasswordScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  const motion = useMotion();
  const { redeemRecoveryLink, resetPassword } = useAuth();

  // Covers both entry paths: the URL the app was cold-started with, and one
  // delivered while it was already running.
  const url = Linking.useURL();

  const [phase, setPhase] = useState<Phase>('redeeming');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  // Per-field, matching the rest of the flow. "The two new passwords do not
  // match" belongs against the confirm box, not in a shared line under both —
  // it is the only field the reader has to change to fix it.
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  // So the return key walks the two boxes and submits from the second.
  const confirmRef = useRef<TextInput>(null);

  // A recovery code is single-use: exchanging it twice fails and would flip a
  // working screen to "invalid". `Linking.useURL` re-fires on re-mount, so the
  // guard has to outlive a render rather than live in state.
  const redeemed = useRef(false);

  // `useURL` starts at null and is only ever filled by `getInitialURL()` or a
  // later `url` event — so on a launch with neither, it stays null forever and
  // `redeeming` has no exit. That leaves this screen spinning with no error and
  // no way back, which is the one outcome worse than saying the link is bad.
  //
  // Self-correcting rather than final: a URL arriving after the deadline still
  // runs the effect below, and a valid one still redeems into `ready`. All this
  // does is put a floor under the wait.
  useEffect(() => {
    const timer = setTimeout(() => {
      setPhase((current) => (current === 'redeeming' ? 'invalid' : current));
    }, LINK_WAIT_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (url == null || redeemed.current) return;
    const link = parseRecoveryLink(url);
    if (!link) {
      // No recovery parameters at all — someone reached this route directly
      // rather than through a link.
      setPhase('invalid');
      setError(t('auth.resetLinkInvalid'));
      return;
    }

    redeemed.current = true;
    let cancelled = false;

    (async () => {
      try {
        await redeemRecoveryLink(link);
        if (!cancelled) setPhase('ready');
      } catch (e) {
        if (cancelled) return;
        setPhase('invalid');
        setError(t(authErrorKey(e)));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [url, redeemRecoveryLink, t]);

  const submit = async () => {
    setPasswordError(null);
    setConfirmError(null);
    setError(null);
    // No context passed: this screen is reached from a mail link and never knows
    // whose account it is. The name and address checks simply do not apply here,
    // which is why the parameter is optional rather than required.
    const passwordProblem = passwordProblemKey(password);
    if (passwordProblem) {
      setPasswordError(t(passwordProblem));
      return;
    }
    if (password !== confirm) {
      setConfirmError(t('account.passwordMismatch'));
      return;
    }
    setBusy(true);
    try {
      await resetPassword(password);
      // Cleared so the new password is not left sitting in two form fields
      // behind an unlocked screen, matching the account screen's behaviour.
      setPassword('');
      setConfirm('');
      setPhase('done');
    } catch (e) {
      setError(t(authErrorKey(e)));
      warningFeedback();
    } finally {
      setBusy(false);
    }
  };

  if (phase === 'redeeming') {
    return (
      <Screen contentStyle={styles.centered}>
        <ActivityIndicator color={colors.primary} />
        <Text center tone="textMuted" variant="body">
          {t('auth.resetChecking')}
        </Text>
      </Screen>
    );
  }

  if (phase === 'invalid') {
    return (
      <Screen contentStyle={styles.content} wash="heroWash">
        <Animated.View entering={motion.entrance(0)} style={styles.header}>
          <Text variant="display">{t('auth.resetTitle')}</Text>
        </Animated.View>
        {/*
          A block rather than a red paragraph under the heading. This is a dead
          end being explained — the link cannot be salvaged and the only way on
          is one of the two buttons — so it should read as a stated outcome
          rather than as a validation complaint about a form that is not there.
        */}
        <Animated.View entering={motion.entrance(1)} style={styles.form}>
          <Notice tone="danger">{error ?? t('auth.resetLinkInvalid')}</Notice>
          <Button
            label={t('auth.requestNewLink')}
            onPress={() => router.replace('/forgot-password')}
          />
          <Button
            label={t('auth.backToSignIn')}
            onPress={() => router.replace('/sign-in')}
            variant="ghost"
          />
        </Animated.View>
      </Screen>
    );
  }

  if (phase === 'done') {
    return (
      <Screen contentStyle={styles.content} wash="heroWash">
        <Animated.View entering={motion.entrance(0)} style={styles.header}>
          <Text variant="display">{t('auth.resetTitle')}</Text>
        </Animated.View>
        <Animated.View entering={motion.entrance(1)} style={styles.form}>
          <Notice tone="success">{t('auth.resetDone')}</Notice>
          {/* Redeeming the link signed the user in, so there is somewhere to go. */}
          <Button
            label={t('common.continue')}
            onPress={() => router.replace('/learn')}
          />
        </Animated.View>
      </Screen>
    );
  }

  return (
    <Screen contentStyle={styles.content} wash="heroWash">
      <Animated.View entering={motion.entrance(0)} style={styles.header}>
        <Text variant="display">{t('auth.resetTitle')}</Text>
        <Text tone="textMuted" variant="body">
          {t('auth.resetSubtitle')}
        </Text>
      </Animated.View>

      <Animated.View entering={motion.entrance(1)} style={styles.form}>
        <Field
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect={false}
          error={passwordError}
          label={t('account.newPassword')}
          onChangeText={(next) => {
            setPassword(next);
            if (passwordError) setPasswordError(null);
            // The match error is about the *pair*, so editing either half
            // invalidates it — leaving it under the confirm box while the first
            // box changes underneath is the error describing a stale comparison.
            if (confirmError) setConfirmError(null);
            if (error) setError(null);
          }}
          onSubmitEditing={() => confirmRef.current?.focus()}
          returnKeyType="next"
          /*
            Revealable, on both boxes.

            This screen is the end of a recovery: the reader is here because
            they could not remember the old password, they are inventing a new
            one on a phone keyboard, and they have to type it twice. Without a
            reveal, a consistent typo across both boxes passes the match check
            and locks them out again with a password they do not know — the
            exact failure they opened the mail to escape.
          */
          revealLabels={{
            show: t('auth.showPassword'),
            hide: t('auth.hidePassword'),
          }}
          revealable
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />
        <Field
          autoCapitalize="none"
          autoComplete="new-password"
          autoCorrect={false}
          error={confirmError}
          label={t('account.confirmPassword')}
          onChangeText={(next) => {
            setConfirm(next);
            if (confirmError) setConfirmError(null);
            if (error) setError(null);
          }}
          onSubmitEditing={() => void submit()}
          ref={confirmRef}
          returnKeyType="go"
          revealLabels={{
            show: t('auth.showPassword'),
            hide: t('auth.hidePassword'),
          }}
          revealable
          secureTextEntry
          textContentType="newPassword"
          value={confirm}
        />
        {!passwordError ? (
          <Text tone="textFaint" variant="caption">
            {t('auth.passwordHint')}
          </Text>
        ) : null}

        {error ? <Notice tone="danger">{error}</Notice> : null}

        <Button
          disabled={!password || !confirm}
          label={t('auth.resetSave')}
          loading={busy}
          onPress={() => void submit()}
        />
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingTop: spacing.xxl },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.md,
  },
  header: { gap: spacing.xs },
  form: { gap: spacing.md },
});
