import Ionicons from '@expo/vector-icons/Ionicons';
import * as AppleAuthentication from 'expo-apple-authentication';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';

import { authErrorKey } from '@/features/auth/errors';
import {
  appleSignInAvailable,
  signInWithApple,
  signInWithProvider,
} from '@/features/auth/oauth';
import { warningFeedback } from '@/lib/haptics';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import { PressableScale } from './pressable-scale';
import { Text } from './text';

/**
 * Apple and Google sign-in, shared by the sign-in and sign-up screens.
 *
 * One component rather than two copies because the two screens must not drift:
 * a provider offered on one and not the other reads as a bug, and an account
 * created with Google that cannot then be signed into with Google is worse
 * than one.
 *
 * ## The Apple button is theirs, not ours
 *
 * `AppleAuthentication.AppleAuthenticationButton` renders Apple's own control
 * — their wording, their mark, their corner radius. It is deliberately not
 * restyled to match the app: the Human Interface Guidelines require the
 * supplied button, App Store review checks for it, and a hand-drawn imitation
 * is a rejection. Everything around it is the app's, which is the arrangement
 * Apple asks for.
 *
 * It is also **iOS only**, and that is not a limitation to work around: Apple
 * requires the native button where it is available, and offering a web-based
 * "Sign in with Apple" on Android alongside it is a different flow with
 * different credentials. Android users get Google.
 */
export function SocialSignIn({
  onDone,
  disabled,
}: {
  /** Called after a provider hands back a session. */
  onDone: () => void;
  disabled?: boolean;
}) {
  const { t } = useTranslation();
  const { colors, isDark } = useTheme();

  const [appleReady, setAppleReady] = useState(false);
  const [busy, setBusy] = useState<null | 'apple' | 'google'>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const ok = await appleSignInAvailable();
      if (!cancelled) setAppleReady(ok);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const run = async (which: 'apple' | 'google') => {
    setError(null);
    setBusy(which);
    try {
      if (which === 'apple') await signInWithApple();
      else await signInWithProvider('google');
      onDone();
    } catch (e) {
      // Backing out of the sheet is not a failure and must not be reported as
      // one. Apple raises `ERR_REQUEST_CANCELED`; the browser flow raises the
      // `oauth_cancelled` this project defines. Both mean the user changed
      // their mind, which needs no message at all.
      const code = (e as { code?: string } | null)?.code;
      if (code === 'ERR_REQUEST_CANCELED' || code === 'oauth_cancelled') return;
      setError(t(authErrorKey(e)));
      warningFeedback();
    } finally {
      setBusy(null);
    }
  };

  return (
    <View style={styles.root}>
      <View style={styles.divider}>
        <View style={[styles.rule, { backgroundColor: colors.border }]} />
        <Text tone="textFaint" variant="caption">
          {t('auth.orContinueWith')}
        </Text>
        <View style={[styles.rule, { backgroundColor: colors.border }]} />
      </View>

      {appleReady ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonStyle={
            // Follows the app's scheme rather than being fixed: Apple's own
            // guidance is that the button contrasts with its background, and a
            // black button on the near-black dark surface does not. Read from
            // `isDark` rather than by comparing a background hex, which is a
            // string one palette edit away from being wrong.
            isDark
              ? AppleAuthentication.AppleAuthenticationButtonStyle.WHITE
              : AppleAuthentication.AppleAuthenticationButtonStyle.BLACK
          }
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          cornerRadius={radius.md}
          onPress={() => void run('apple')}
          style={styles.apple}
        />
      ) : null}

      <PressableScale
        accessibilityRole="button"
        disabled={disabled || busy !== null}
        onPress={() => void run('google')}
        style={[
          styles.button,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}>
        <Ionicons color={colors.text} name="logo-google" size={18} />
        <Text variant="bodyStrong">
          {busy === 'google' ? t('auth.signingIn') : t('auth.continueWithGoogle')}
        </Text>
      </PressableScale>

      {error ? (
        <Text center tone="danger" variant="caption">
          {error}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { gap: spacing.md },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rule: { flex: 1, height: StyleSheet.hairlineWidth },
  // Apple's button sizes itself from the frame it is given, so the height is
  // set here to match the app's controls rather than left to its default.
  apple: { height: 52, width: '100%' },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 52,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: spacing.lg,
  },
});
