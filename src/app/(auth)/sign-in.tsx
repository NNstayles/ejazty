import { Image } from 'expo-image';
import { Link, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput, View } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Notice } from '@/components/ui/notice';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Screen } from '@/components/ui/surfaces';
import { SocialSignIn } from '@/components/ui/social-sign-in';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import { authErrorKey } from '@/features/auth/errors';
import { isValidEmail } from '@/features/auth/validation';
import { LANGUAGES, type LanguageCode } from '@/i18n';
import { selectionTap, warningFeedback } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';
import { usePreferences } from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

/**
 * The first screen of the app, and the one most likely to be the last.
 *
 * Everything here that looks like decoration is answering a specific way this
 * screen used to fail. The notes are per-block rather than one list at the top,
 * because the failures are unrelated to each other.
 */
export default function SignInScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const { colors } = useTheme();
  const motion = useMotion();
  const { language, setLanguage } = usePreferences();
  const { signIn, continueAsGuest, configured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  /*
    Per-field rather than one shared line.

    A single error under the form has to be written vaguely enough to cover
    both fields, so it says "wrong email or password" and points at neither.
    Anything the client can decide by itself — a malformed address, an empty
    box — belongs against the box that is wrong. `formError` keeps what only
    the server can answer, which genuinely is about the pair.
  */
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /*
    So the keyboard's own Next key moves to the password box and Go submits.

    Without it the return key does nothing, and the only way down the form is
    to dismiss the keyboard, aim at the next field and bring it back up — on
    the two-field form that stands between a user and the app.
  */
  const passwordRef = useRef<TextInput>(null);

  /*
    The address the last successful sign-in used.

    Only the address, and only from *this* device's own last success — the
    password is left to the platform keychain, which is the one place it
    belongs. Someone returning to the app has almost always typed this exact
    string before, and asking again is the kind of small friction that reads as
    the app not remembering them.
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
    setPasswordError(null);
    setFormError(null);

    // Trimmed before it is judged, not after. A leading space picked up from a
    // paste or an autocorrect suggestion otherwise fails `isValidEmail` and
    // renders as "enter a valid email address" over an address that is plainly
    // valid — with the space invisible.
    const address = email.trim();
    if (!address) {
      setEmailError(t('auth.emailRequired'));
      return;
    }
    if (!isValidEmail(address)) {
      setEmailError(t('auth.invalidEmail'));
      return;
    }
    // Deliberately only a presence check. The strength rules never run on
    // sign-in — an existing account may hold a password those rules would now
    // reject, and refusing to let them in would be locking someone out of
    // their own account to protect them. See `password-strength.ts`.
    if (!password) {
      setPasswordError(t('auth.passwordRequired'));
      return;
    }
    if (!configured) {
      setFormError(t('auth.notConfigured'));
      return;
    }

    setBusy(true);
    try {
      await signIn(address, password);
      // Written only on success, so a typo is never the address offered back.
      await writeJSON(StorageKeys.lastEmail, address);
      router.replace('/learn');
    } catch (e) {
      // The one place a wrong password is reported, and it stays deliberately
      // vague about which half was wrong: naming the email would turn this
      // screen into an oracle for which addresses have accounts, the same
      // reason `requestPasswordReset` resolves either way.
      setFormError(t(authErrorKey(e)));
      warningFeedback();
    } finally {
      setBusy(false);
    }
  };

  const guest = async () => {
    await continueAsGuest();
    router.replace('/learn');
  };

  const chooseLanguage = (code: LanguageCode) => {
    if (code === language) return;
    selectionTap();
    void setLanguage(code);
  };

  return (
    <Screen contentStyle={styles.content} wash="heroWash">
      {/*
        The language switcher, before anything else on the screen.

        The picker runs once on first launch and never again, so a user who
        tapped the wrong row — or a second person on a shared phone — had no
        way back to it: the only route to Settings is *through* this screen.
        Three short buttons rather than the full picker, because the choice is
        already made and this is a correction.

        Each option is written in its own language and script. A row reading
        "Arabic" is no use to the person who needs it.
      */}
      <View style={styles.languageRow}>
        {LANGUAGES.map((entry) => {
          const active = entry.code === language;
          return (
            <PressableScale
              accessibilityRole="radio"
              accessibilityState={{ selected: active }}
              key={entry.code}
              onPress={() => chooseLanguage(entry.code)}
              scaleTo={0.94}
              style={[
                styles.languageChip,
                {
                  backgroundColor: active ? colors.primarySoft : 'transparent',
                  borderColor: active ? colors.primary : colors.border,
                },
              ]}>
              <Text
                style={{ color: active ? colors.primary : colors.textMuted }}
                variant="caption">
                {entry.nativeName}
              </Text>
            </PressableScale>
          );
        })}
      </View>

      <Animated.View entering={motion.entrance(0)} style={styles.header}>
        {/*
          A mark, because the screen opened on a heading floating in space.

          It is the app's own icon, at the one size where it is allowed to be
          the subject. This replaced a brand-gradient square carrying an
          Ionicons `car-sport` glyph — a stand-in from before the app had a
          logo. Showing the real icon is what ties this screen to the thing
          the user actually tapped to get here.

          The source is `app-mark.png`, a 180px downscale of the 1024px
          `assets/images/icon.png`, NOT the icon itself. The icon is just over
          1 MB, which is a megabyte of bundle spent on a 60pt square — the same
          trade `assets/exam/` documents at much larger scale. 180px is 3x the
          drawn size, so it stays sharp on every screen this app supports.

          There is no gradient behind it. The icon is opaque (`icon.png` is
          PNG colour type 2, no alpha) and fills the mark edge to edge, so a
          layer underneath would never be seen.
        */}
        <Image
          contentFit="cover"
          source={require('@/assets/images/app-mark.png')}
          style={styles.mark}
        />
        <Text variant="display">{t('auth.signInTitle')}</Text>
        <Text variant="body" tone="textMuted">
          {t('auth.signInSubtitle')}
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
            // Cleared as soon as the field is touched. An error that outlives
            // the correction trains people to ignore it.
            if (emailError) setEmailError(null);
            if (formError) setFormError(null);
          }}
          onSubmitEditing={() => passwordRef.current?.focus()}
          returnKeyType="next"
          // Distinct from `autoComplete` and both are needed: `autoComplete` is
          // what Android's autofill service reads, `textContentType` is what
          // iOS offers a keychain entry against. A field carrying only one of
          // them gets filled on one platform.
          textContentType="emailAddress"
          value={email}
        />
        <Field
          autoCapitalize="none"
          autoComplete="current-password"
          autoCorrect={false}
          error={passwordError}
          label={t('auth.password')}
          onChangeText={(next) => {
            setPassword(next);
            if (passwordError) setPasswordError(null);
            if (formError) setFormError(null);
          }}
          onSubmitEditing={() => void submit()}
          ref={passwordRef}
          // `current-password`, never `new-password`: the wrong one prompts iOS
          // to offer to *generate* a password on a sign-in form.
          returnKeyType="go"
          revealLabels={{
            show: t('auth.showPassword'),
            hide: t('auth.hidePassword'),
          }}
          revealable
          secureTextEntry
          textContentType="password"
          value={password}
        />

        {formError ? <Notice tone="danger">{formError}</Notice> : null}

        <Button
          // Disabled on empty fields rather than validating them on tap: the
          // button is the affordance, and one that submits an empty form to be
          // told it is empty is a round trip through an error message for
          // something the screen already knew.
          disabled={!email.trim() || !password}
          label={t('auth.signIn')}
          loading={busy}
          onPress={() => void submit()}
        />
        <Link href="/forgot-password" style={styles.forgot}>
          <Text tone="primary" variant="caption">
            {t('auth.forgotPassword')}
          </Text>
        </Link>

        {/*
          Below the password form rather than above it.

          The order is a claim about which is the primary path, and for this
          app it is the password: an account made with Google cannot sync
          history to a device where the user then signs in with a password, so
          leading with the providers would push people onto a path that is
          harder to recover. They are offered, not pushed.
        */}
        {configured ? <SocialSignIn onDone={() => router.replace('/learn')} /> : null}
      </Animated.View>

      {/*
        Said up front rather than on submit.

        `configured` is false when the build has no Supabase credentials, which
        is a state of the *app*, not of anything the user typed. Making them
        fill in a form and press a button to be told the form could never have
        worked is the wrong order.
      */}
      {!configured ? (
        <Notice tone="warning">{t('auth.notConfigured')}</Notice>
      ) : null}

      <Animated.View entering={motion.entrance(2)} style={styles.footer}>
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
      </Animated.View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.xl, paddingTop: spacing.lg },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  languageChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: StyleSheet.hairlineWidth,
  },
  header: { gap: spacing.xs, alignItems: 'flex-start' },
  mark: {
    width: 60,
    height: 60,
    borderRadius: radius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    // Clips the icon to the corner radius, the same reason `Button` needs it.
    // `icon.png` is a full-bleed square, so without this the mark renders with
    // hard 90-degree corners against every other rounded surface on the screen.
    overflow: 'hidden',
    marginBottom: spacing.sm,
  },
  form: { gap: spacing.md },
  forgot: { alignSelf: 'center' },
  footer: { gap: spacing.sm },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
});
