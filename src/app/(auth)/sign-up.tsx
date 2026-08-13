import { Link, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, TextInput } from 'react-native';
import Animated from 'react-native-reanimated';

import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { Notice } from '@/components/ui/notice';
import { Screen } from '@/components/ui/surfaces';
import { SocialSignIn } from '@/components/ui/social-sign-in';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import { authErrorKey } from '@/features/auth/errors';
import { passwordProblemKey } from '@/features/auth/password-strength';
import {
  isValidEmail,
  MAX_NAME_LENGTH,
  nameErrorKey,
} from '@/features/auth/validation';
import { warningFeedback } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import { StorageKeys, writeJSON } from '@/lib/storage';
import { spacing } from '@/theme/tokens';

/**
 * The account-creation form.
 *
 * This screen and `sign-in` are one flow — a user moves between them in
 * seconds — so everything here that looks like it was copied from that file was
 * copied from it deliberately. It had drifted into being the plainer of the two:
 * one shared error line, no keyboard chain across three fields, no way to see
 * the password being *chosen*, and no wash, so the pair visibly changed
 * character depending on which one you were looking at.
 *
 * The per-block notes below cover only what is specific to creating an account
 * rather than signing into one; `sign-in.tsx` carries the reasoning both share.
 */
export default function SignUpScreen() {
  const { t } = useTranslation();
  const router = useRouter();
  const motion = useMotion();
  const { signUp, configured } = useAuth();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  /*
    Per-field, for the reason `sign-in` sets out at length: a single line under
    the form has to be written vaguely enough to cover every field, so it ends
    up pointing at none of them.

    It matters more here than it does on sign-in, because this form has three
    fields and *two* of them can fail for reasons the client decides by itself —
    a name over 80 characters and a password on the common list are both
    rejected locally, and both were reported by the same sentence at the bottom
    of the form. `formError` keeps only what the server answers.
  */
  const [nameError, setNameError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /*
    So the keyboard's own Next key walks down the form and Go submits.

    A three-field form with no chain is worse than the two-field one this was
    already fixed on: reaching the password box means dismissing the keyboard,
    aiming at a field it was covering, and bringing it back up, twice.
  */
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

  const submit = async () => {
    setNameError(null);
    setEmailError(null);
    setPasswordError(null);
    setFormError(null);
    setNotice(null);

    // Length matters as much as presence: the sign-up trigger copies this into
    // `profiles.display_name`, which is bounded at 80, and a violation aborts
    // the whole account creation rather than just this field.
    const nameProblem = nameErrorKey(name);
    if (nameProblem) {
      setNameError(t(nameProblem));
      return;
    }
    // Trimmed before it is judged, matching sign-in: a leading space from a
    // paste otherwise fails `isValidEmail` and renders as "enter a valid email
    // address" over an address that is plainly valid, with the space invisible.
    const address = email.trim();
    if (!address) {
      setEmailError(t('auth.emailRequired'));
      return;
    }
    if (!isValidEmail(address)) {
      setEmailError(t('auth.invalidEmail'));
      return;
    }
    // Length *and* guessability, from one shared rule. Checked with the name and
    // address to hand, because "context-specific words" — your own name, the
    // local part of your own email — are among the first things an attacker
    // tries and among the first things people reach for.
    const passwordProblem = passwordProblemKey(password, {
      email: address,
      name,
    });
    if (passwordProblem) {
      setPasswordError(t(passwordProblem));
      return;
    }
    if (!configured) {
      setFormError(t('auth.notConfigured'));
      return;
    }

    setBusy(true);
    try {
      const { needsConfirmation } = await signUp(name, address, password);
      // Written on success only, so the sign-in screen offers this address back
      // if the user ever signs out. Same store, same rule as sign-in's own
      // write: a typo is never what gets remembered.
      await writeJSON(StorageKeys.lastEmail, address);
      if (needsConfirmation) {
        // With email confirmation enabled there is no session yet, so point the
        // user at their inbox rather than at the tabs.
        //
        // This project has confirmation *off*
        // (`auth.email.enable_confirmations = false` in supabase/config.toml),
        // so this branch is currently unreachable. It stays because it is one
        // config key from being live again, and the failure it prevents —
        // an account holder signed in but stranded on the sign-up screen — is
        // one this screen has already shipped once.
        setNotice(t('auth.checkEmail'));
        return;
      }
      // Confirmation off: sign-up already returned a session, so the user is
      // signed in. Showing "check your email" here would strand them on this
      // screen with a working account and no way forward.
      router.replace('/learn');
    } catch (e) {
      setFormError(t(authErrorKey(e)));
      // Matches sign-in. A failed submit is worth a knock: the button returns to
      // its resting state either way, and that alone does not say which happened.
      warningFeedback();
    } finally {
      setBusy(false);
    }
  };

  return (
    <Screen contentStyle={styles.content} wash="heroWash">
      <Animated.View entering={motion.entrance(0)} style={styles.header}>
        <Text variant="display">{t('auth.signUpTitle')}</Text>
        <Text variant="body" tone="textMuted">
          {t('auth.signUpSubtitle')}
        </Text>
      </Animated.View>

      <Animated.View entering={motion.entrance(1)} style={styles.form}>
        <Field
          autoComplete="name"
          error={nameError}
          label={t('auth.fullName')}
          maxLength={MAX_NAME_LENGTH}
          onChangeText={(next) => {
            setName(next);
            // Cleared as soon as the field is touched. An error that outlives
            // the correction trains people to ignore it.
            if (nameError) setNameError(null);
            if (formError) setFormError(null);
          }}
          onSubmitEditing={() => emailRef.current?.focus()}
          returnKeyType="next"
          // Distinct from `autoComplete` and both are needed: `autoComplete` is
          // what Android's autofill service reads, `textContentType` is what iOS
          // offers a keychain entry against. A field carrying only one of them
          // gets filled on one platform.
          textContentType="name"
          value={name}
        />
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
          }}
          onSubmitEditing={() => passwordRef.current?.focus()}
          ref={emailRef}
          returnKeyType="next"
          textContentType="emailAddress"
          value={email}
        />
        <Field
          autoCapitalize="none"
          // `new-password`, never `current-password`: the wrong one stops iOS
          // offering to generate and save a strong password on a form whose
          // whole job is choosing one.
          autoComplete="new-password"
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
          returnKeyType="go"
          revealLabels={{
            show: t('auth.showPassword'),
            hide: t('auth.hidePassword'),
          }}
          /*
            Revealable, and this is the screen where it matters most.

            On sign-in a hidden password costs a retry against a password you
            already know. Here it is a password being *invented*, typed once,
            and then used to sign in on another device weeks later — a typo is
            not a retry, it is an account whose password is not the one its
            owner believes they chose.
          */
          revealable
          secureTextEntry
          textContentType="newPassword"
          value={password}
        />
        {/*
          States the rule rather than scoring the password.

          Deliberately not a strength meter, and `password-strength.ts` says why
          under its own heading: a bar rewards `P@ssw0rd1!`, which is in every
          cracking dictionary, and punishes a long passphrase, which is the
          thing actually worth encouraging. The rules there are all of the form
          "this specific password is guessable", so the honest live feedback is
          the requirement up front and the specific objection against the field
          if one applies.
        */}
        {!passwordError ? (
          <Text tone="textFaint" variant="caption">
            {t('auth.passwordHint')}
          </Text>
        ) : null}

        {formError ? <Notice tone="danger">{formError}</Notice> : null}
        {notice ? <Notice tone="success">{notice}</Notice> : null}

        <Button
          // Disabled on empty fields rather than validating them on tap: the
          // button is the affordance, and one that submits an empty form to be
          // told it is empty is a round trip through an error message for
          // something the screen already knew.
          disabled={!name.trim() || !email.trim() || !password}
          label={t('auth.signUp')}
          loading={busy}
          onPress={() => void submit()}
        />

        {/*
          The same component the sign-in screen uses, deliberately. A provider
          offered on one screen and not the other reads as a bug, and an
          account created with Google that cannot then be signed into with
          Google is worse than one.
        */}
        {configured ? (
          <SocialSignIn onDone={() => router.replace('/learn')} />
        ) : null}
      </Animated.View>

      {/*
        Said up front rather than on submit, matching sign-in. `configured` is
        false when the build has no Supabase credentials, which is a state of
        the *app*, not of anything the user typed — and filling in three fields
        to be told the form could never have worked is the wrong order.
      */}
      {!configured ? (
        <Notice tone="warning">{t('auth.notConfigured')}</Notice>
      ) : null}

      <Animated.View entering={motion.entrance(2)} style={styles.inline}>
        <Text tone="textMuted" variant="caption">
          {t('auth.haveAccount')}
        </Text>
        {/*
          Padded so the target clears 44pt. A `Link` renders a text node, whose
          hit rect is otherwise the glyph box of a 13pt caption. See the same
          note on the sign-in screen.
        */}
        <Link
          accessibilityRole="link"
          href="/sign-in"
          replace
          style={styles.inlineLink}>
          <Text tone="primary" variant="caption">
            {t('auth.signIn')}
          </Text>
        </Link>
      </Animated.View>
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
  inlineLink: { paddingVertical: spacing.sm, paddingHorizontal: spacing.xs },
});
