import Ionicons from '@expo/vector-icons/Ionicons';
import { Stack, useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, StyleSheet, TextInput, View } from 'react-native';

import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Field } from '@/components/ui/field';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { Notice } from '@/components/ui/notice';
import { PressableScale } from '@/components/ui/pressable-scale';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import { authErrorKey } from '@/features/auth/errors';
import { providerList } from '@/features/auth/identities';
import { passwordProblemKey } from '@/features/auth/password-strength';
import {
  isValidEmail,
  MAX_NAME_LENGTH,
  nameErrorKey,
} from '@/features/auth/validation';
import { useAvatar } from '@/features/profile/avatar-provider';
import { warningFeedback } from '@/lib/haptics';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

/** Small caps label grouping the card below it, matching the settings screen. */
function GroupLabel({ children }: { children: string }) {
  return (
    <Text style={styles.groupLabel} tone="textMuted" variant="overline">
      {children.toUpperCase()}
    </Text>
  );
}

/**
 * Inline result line for one section.
 *
 * Each section reports on its own rather than sharing a single banner: with one
 * shared line, saving your name would clear the "check your inbox" notice the
 * email section had just put up.
 *
 * Drawn as a `Notice` rather than a bare coloured caption, matching the auth
 * flow. Several of these are the entire outcome of an irreversible or
 * mail-gated operation — `emailChangeRequested` is a two-inbox instruction, not
 * a field hint — and as plain captions they differed from each other only by
 * hue, which is the one channel a colour-blind reader does not get.
 */
function Result({ error, notice }: { error?: string | null; notice?: string | null }) {
  if (error) return <Notice tone="danger">{error}</Notice>;
  if (notice) return <Notice tone="success">{notice}</Notice>;
  return null;
}

/**
 * Reveal-toggle labels, built once per render of the screen that uses them.
 *
 * Every password box on this screen is revealable and they all need the same
 * pair of accessibility strings, so this keeps seven identical inline objects
 * out of the tree.
 *
 * ## Why every one of them reveals
 *
 * This screen carries more password fields than the rest of the app combined,
 * and the cost of a typo here is higher than anywhere else in two different
 * ways. A mistyped *current* password consumes one of only five attempts before
 * `reauthenticate`'s local backoff locks the account owner out of their own
 * account screen for a minute — and it is charged against the person who is
 * already signed in and demonstrably legitimate. A mistyped *new* password is
 * worse: it is accepted, saved, and only discovered on the next sign-in.
 */
function revealLabelsFrom(t: (key: string) => string) {
  return { show: t('auth.showPassword'), hide: t('auth.hidePassword') };
}

/** Per-section transient state: one request, one error, one success notice. */
type SectionState = { busy: boolean; error: string | null; notice: string | null };
const IDLE: SectionState = { busy: false, error: null, notice: null };

/**
 * The profile picture, with its own picker and its own state.
 *
 * ## It is offered to guests too, and that is the point of the `null` owner
 *
 * A guest has no account to manage, so the rest of this screen is replaced by a
 * notice for them — but a picture is device-local (see
 * `features/profile/avatar.ts`), so there is nothing about it a guest cannot
 * have. Making it reachable only when signed in would also leave the adoption
 * rule in `avatar.ts` unreachable: `ownerId: null` exists precisely so that
 * someone who personalises the app as a guest and *then* registers keeps what
 * they set, which is the same courtesy `clearAccountAttemptCache` extends to
 * their practice history.
 *
 * Own component rather than inline, because both branches of this screen render
 * it and a copy in each is how the two drift.
 */
function PhotoCard({ name }: { name: string }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const avatar = useAvatar();
  const [state, setState] = useState<SectionState>(IDLE);
  /**
   * Whether the OS refused, and so whether to offer the route into its settings
   * app.
   *
   * Its own flag rather than a comparison of `state.error` against the
   * translated string — that works until someone edits the copy, and then
   * silently stops offering the only fix there is.
   */
  const [denied, setDenied] = useState(false);

  /**
   * Opens the library and stores what comes back.
   *
   * Every branch reports something except `cancelled`, which is the user
   * changing their mind and is not news. `denied` is called out separately from
   * `failed` because the two need different things from the reader: one is
   * fixed in the OS settings app, the other is worth simply retrying.
   */
  const change = async () => {
    setState({ busy: true, error: null, notice: null });
    setDenied(false);
    const outcome = await avatar.choose();

    if (outcome.kind === 'changed') {
      setState({ busy: false, error: null, notice: t('account.photoUpdated') });
      return;
    }
    if (outcome.kind === 'cancelled') {
      setState(IDLE);
      return;
    }

    setDenied(outcome.kind === 'denied');
    setState({
      busy: false,
      error: t(
        outcome.kind === 'denied' ? 'account.photoDenied' : 'account.photoFailed',
      ),
      notice: null,
    });
  };

  const remove = async () => {
    setDenied(false);
    setState({ busy: true, error: null, notice: null });
    await avatar.clear();
    setState({ busy: false, error: null, notice: t('account.photoRemoved') });
  };

  return (
    <Card style={styles.card}>
      <View style={styles.photoRow}>
        <PressableScale
          accessibilityLabel={t('account.photoChange')}
          accessibilityRole="button"
          disabled={avatar.busy}
          onPress={() => void change()}>
          <Avatar name={name} ring size={88} uri={avatar.uri} />
        </PressableScale>

        <View style={styles.photoActions}>
          <Button
            label={avatar.uri ? t('account.photoChange') : t('account.photoAdd')}
            loading={state.busy}
            onPress={() => void change()}
            variant="secondary"
          />
          {avatar.uri ? (
            <PressableScale
              accessibilityRole="button"
              disabled={avatar.busy}
              onPress={() => void remove()}
              style={styles.photoRemove}>
              <Ionicons color={colors.danger} name="trash-outline" size={16} />
              <Text tone="danger" variant="caption">
                {t('account.photoRemove')}
              </Text>
            </PressableScale>
          ) : null}
        </View>
      </View>

      <Text tone="textMuted" variant="caption">
        {t('account.photoNotice')}
      </Text>
      <Result error={state.error} notice={state.notice} />
      {/*
        Only offered when the OS refused. `Linking.openSettings` opens the app's
        own settings page, which is where the photo permission is re-granted —
        nothing in this app can re-ask once it has been denied.
      */}
      {denied ? (
        <PressableScale
          accessibilityRole="button"
          onPress={() => void Linking.openSettings()}>
          <Text tone="primary" variant="caption">
            {t('settings.openSettings')}
          </Text>
        </PressableScale>
      ) : null}
    </Card>
  );
}

export default function AccountScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const router = useRouter();
  // Called before the guest early-return below, like every other hook here.
  const clearance = useTabBarClearance();
  const {
    user,
    isGuest,
    configured,
    updateName,
    updateEmail,
    updatePassword,
    deleteAccount,
    requestPasswordReset,
  } = useAuth();

  const [name, setName] = useState(user?.displayName ?? '');
  const [newEmail, setNewEmail] = useState('');
  // Each sensitive section collects the current password separately rather than
  // sharing one field. They are independent operations with their own busy and
  // error state, and a shared field would leave the password sitting in the
  // form after an unrelated section used it.
  const [emailPassword, setEmailPassword] = useState('');
  const [deletePassword, setDeletePassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [profile, setProfile] = useState<SectionState>(IDLE);
  const [email, setEmail] = useState<SectionState>(IDLE);
  const [password, setPassword] = useState<SectionState>(IDLE);
  const [danger, setDanger] = useState<SectionState>(IDLE);
  /**
   * The "send me a password link" action, which two places on this screen
   * share.
   *
   * Its own state rather than folded into `password`, for the reason every
   * other section here has its own: the provider-account card sits *above* the
   * password card and the two are answered separately, so a shared line would
   * put the outcome of one under the heading of the other.
   */
  const [recovery, setRecovery] = useState<SectionState>(IDLE);

  /*
    Keyboard chains, one per card rather than one down the screen.

    Each card is an independent operation, so Next must move within the card it
    was pressed in and the last field of a card submits it. A single chain
    threaded through all seven boxes would walk someone from "change email"
    into the password card and then into the delete field, which is a route
    from a routine edit to an irreversible one with no step in between.
  */
  const emailPasswordRef = useRef<TextInput>(null);
  const newPasswordRef = useRef<TextInput>(null);
  const confirmPasswordRef = useRef<TextInput>(null);

  const reveal = revealLabelsFrom(t);

  const header = <Stack.Screen options={{ title: t('account.title') }} />;

  // A guest has no account to manage, and an unconfigured build has no server
  // to manage it on. Both get an explanation instead of forms that cannot work.
  if (isGuest || !user || !configured) {
    return (
      <>
        {header}
        {/*
          `edges={[]}`: `ScreenHeader` already applies the top inset, and
          claiming it here as well would push the first card down by the height
          of the status bar a second time.
        */}
        <Screen contentStyle={{ paddingBottom: clearance }} edges={[]}>
          {/*
            Offered even here. The picture is device-local and needs no account,
            and a guest who sets one keeps it when they register — see the note
            on `PhotoCard`.
          */}
          <GroupLabel>{t('account.photoSection')}</GroupLabel>
          <PhotoCard name={t('auth.guest')} />

          <Card style={styles.card}>
            <Ionicons color={colors.textMuted} name="person-outline" size={24} />
            <Text tone="textMuted" variant="body">
              {configured ? t('account.guestNotice') : t('auth.notConfigured')}
            </Text>
            {configured ? (
              <Button
                label={t('auth.signUp')}
                onPress={() => router.replace('/sign-up')}
              />
            ) : null}
          </Card>
        </Screen>
      </>
    );
  }

  const saveName = async () => {
    const trimmed = name.trim();
    // Bounded as well as required: `syncProfile` mirrors this into
    // `profiles.display_name` (max 80) fire-and-forget, so an over-long name
    // would save to `user_metadata`, fail the mirror silently, and leave the
    // two copies disagreeing with nothing on screen to say so.
    const nameProblem = nameErrorKey(trimmed);
    if (nameProblem) {
      setProfile({ busy: false, error: t(nameProblem), notice: null });
      return;
    }
    setProfile({ busy: true, error: null, notice: null });
    try {
      await updateName(trimmed);
      setProfile({ busy: false, error: null, notice: t('account.nameUpdated') });
    } catch (e) {
      setProfile({ busy: false, error: t(authErrorKey(e)), notice: null });
    }
  };

  const changeEmail = async () => {
    if (!isValidEmail(newEmail)) {
      setEmail({ busy: false, error: t('auth.invalidEmail'), notice: null });
      return;
    }
    // Checked here so an empty field reports itself, rather than going up as an
    // empty password and coming back as "wrong email or password" — which reads
    // as the *new* address being rejected.
    if (emailPassword.length === 0) {
      setEmail({ busy: false, error: t('account.currentPasswordRequired'), notice: null });
      return;
    }
    setEmail({ busy: true, error: null, notice: null });
    try {
      await updateEmail(emailPassword, newEmail);
      setNewEmail('');
      // Cleared on success for the same reason the password section clears its
      // fields: not left sitting in a form behind an unlocked screen.
      setEmailPassword('');
      setEmail({
        busy: false,
        error: null,
        notice: t('account.emailChangeRequested'),
      });
    } catch (e) {
      setEmail({ busy: false, error: t(authErrorKey(e)), notice: null });
    }
  };

  const changePassword = async () => {
    // Checked first because it is the first field on the card, and for the same
    // reason the email and delete sections check theirs: an empty box would
    // otherwise go up to `reauthenticate` as an empty password and come back as
    // "wrong email or password" — which on *this* card reads as the new
    // password being rejected rather than the current one being blank.
    if (currentPassword.length === 0) {
      setPassword({
        busy: false,
        error: t('account.currentPasswordRequired'),
        notice: null,
      });
      return;
    }
    // The signed-in account's own name and address are the context here, so a
    // new password built out of either is rejected the same way sign-up rejects
    // it. Without this the two screens would disagree about what is acceptable.
    const passwordProblem = passwordProblemKey(newPassword, {
      email: user.email,
      name: user.displayName,
    });
    if (passwordProblem) {
      setPassword({ busy: false, error: t(passwordProblem), notice: null });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassword({
        busy: false,
        error: t('account.passwordMismatch'),
        notice: null,
      });
      return;
    }
    setPassword({ busy: true, error: null, notice: null });
    try {
      await updatePassword(currentPassword, newPassword);
      // Cleared on success so the new password is not left sitting in three
      // form fields behind an unlocked screen.
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setPassword({
        busy: false,
        error: null,
        notice: t('account.passwordUpdated'),
      });
    } catch (e) {
      setPassword({ busy: false, error: t(authErrorKey(e)), notice: null });
    }
  };

  /**
   * Sends a password link to the account's own address.
   *
   * ## Why this is the answer for a provider-only account
   *
   * An account created with Apple or Google has no password, so
   * `reauthenticate()` fails for every value it could be given — which closes
   * the email, password and delete sections permanently, and leaves such a user
   * with no route to deleting their own account at all.
   *
   * The fix reuses the flow that already exists rather than inventing a second
   * way to set a password. `resetPasswordForEmail` → deep link →
   * `(auth)/reset-password` is built, tested (`recovery.test.ts`), and its
   * GoTrue semantics are the ordinary forgot-password ones. Once the user comes
   * back through it the account has a password, `signInWithPassword` works, and
   * every existing gate applies unchanged — including the `amr` freshness check
   * inside `delete_own_account()`, which an OAuth session could never satisfy.
   *
   * Deliberately *not* a "set a password here" form on this screen. That would
   * mean calling `updateUser({ password })` with no proof of identity beyond a
   * live session, which is exactly the borrowed-unlocked-phone hole
   * `reauthenticate` exists to close — and it would be a new auth path with no
   * test behind it, added in the same change that was meant to harden one.
   *
   * ## Offered to accounts that have a password too
   *
   * Worded as recovery there. Somebody who has forgotten their current password
   * would otherwise have to sign out to reach the forgot-password screen, which
   * is a poor trade on a screen full of fields asking for it — and it means a
   * wrong `hasPassword` reading still leaves a working route rather than a dead
   * end. Same reasoning as `authConfig` failing open.
   */
  const sendPasswordLink = async () => {
    if (!user.email) {
      setRecovery({ busy: false, error: t('auth.errors.generic'), notice: null });
      return;
    }
    setRecovery({ busy: true, error: null, notice: null });
    try {
      await requestPasswordReset(user.email);
      // The same "if an account exists" wording the forgot-password screen
      // uses. Not caution for its own sake here — this address is known to
      // exist — but the two screens saying different things about the same
      // call is how one of them later gets 'corrected' into an oracle.
      setRecovery({ busy: false, error: null, notice: t('account.passwordLinkSent') });
    } catch (e) {
      setRecovery({ busy: false, error: t(authErrorKey(e)), notice: null });
    }
  };

  const confirmDelete = () => {
    // Validated before the dialog, not inside it: the alert is the last thing
    // between the user and an irreversible delete, and it should not be
    // dismissed only to report a field they could have fixed first.
    if (deletePassword.length === 0) {
      setDanger({
        busy: false,
        error: t('account.currentPasswordRequired'),
        notice: null,
      });
      return;
    }

    // Only once the field check has passed, so the knock marks the dialog that
    // is actually about to appear rather than a validation error.
    warningFeedback();
    Alert.alert(
      t('account.deleteConfirmTitle'),
      t('account.deleteConfirmMessage'),
      [
        { text: t('common.cancel'), style: 'cancel' },
        {
          text: t('account.deleteConfirmAction'),
          style: 'destructive',
          onPress: async () => {
            setDanger({ busy: true, error: null, notice: null });
            try {
              await deleteAccount(deletePassword);
              // Cleared before navigating: if the delete succeeded but the
              // replace is slow, the password should not be sitting in a live
              // form on screen.
              setDeletePassword('');
              // The account is gone, so there is nothing behind this screen to
              // return to. Replace rather than push.
              router.replace('/sign-in');
            } catch (e) {
              setDanger({ busy: false, error: t(authErrorKey(e)), notice: null });
            }
          },
        },
      ],
    );
  };

  return (
    <>
      {header}
      {/* See the note on the guest branch above: the header owns the top inset. */}
      <Screen contentStyle={{ paddingBottom: clearance }} edges={[]}>
        {/*
          The picture, first — it is the thing on this screen you can see, and
          the greeting on the Learn tab is what sends most people here.

          It is stored on this device only (see `features/profile/avatar.ts` for
          why), which the caption says outright rather than leaving the user to
          discover on their next phone.
        */}
        <GroupLabel>{t('account.photoSection')}</GroupLabel>
        <PhotoCard name={user.displayName?.trim() || user.email || '?'} />

        <GroupLabel>{t('account.profileSection')}</GroupLabel>
        <Card style={styles.card}>
          <Field
            autoComplete="name"
            label={t('account.displayName')}
            maxLength={MAX_NAME_LENGTH}
            onChangeText={setName}
            // The only field on its card, so the return key saves rather than
            // advancing into the email card below.
            onSubmitEditing={() => void saveName()}
            returnKeyType="done"
            textContentType="name"
            value={name}
          />
          <Result error={profile.error} notice={profile.notice} />
          <Button
            label={t('account.saveName')}
            loading={profile.busy}
            onPress={() => void saveName()}
          />
        </Card>

        {/*
          Only for an account with no password — one made with Apple or Google.
          It sits here, after the name card and before the three that need a
          password, because that is exactly the boundary it describes: the
          profile card above keeps working, everything below it does not.

          The forms below are still rendered rather than hidden. Hiding them
          would make `hasPassword` an authorisation decision, which it is not
          and must not become — it is derived from the session, and a wrong
          reading would then remove a working feature instead of adding an
          explanation next to it. See `features/auth/identities.ts`.
        */}
        {!user.hasPassword ? (
          <>
            <GroupLabel>{t('account.passwordSection')}</GroupLabel>
            <Card style={styles.card}>
              <View style={styles.dangerHeader}>
                <Ionicons
                  color={colors.warning}
                  name="key-outline"
                  size={20}
                />
                <Text style={styles.dangerText} variant="bodyStrong">
                  {user.providers.length > 0
                    ? t('account.noPasswordTitle', {
                        providers: providerList(
                          user.providers,
                          t('account.providerAnd'),
                        ),
                      })
                    : t('account.noPasswordTitleGeneric')}
                </Text>
              </View>
              <Text tone="textMuted" variant="caption">
                {t('account.noPasswordBody')}
              </Text>
              <Result error={recovery.error} notice={recovery.notice} />
              <Button
                label={t('account.setPassword')}
                loading={recovery.busy}
                onPress={() => void sendPasswordLink()}
              />
            </Card>
          </>
        ) : null}

        <GroupLabel>{t('account.emailSection')}</GroupLabel>
        <Card style={styles.card}>
          <View style={styles.readonlyRow}>
            <Text tone="textMuted" variant="caption">
              {t('account.currentEmail')}
            </Text>
            <Text variant="bodyStrong">{user.email ?? '-'}</Text>
          </View>
          <Field
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            inputMode="email"
            keyboardType="email-address"
            label={t('account.newEmail')}
            onChangeText={setNewEmail}
            onSubmitEditing={() => emailPasswordRef.current?.focus()}
            returnKeyType="next"
            textContentType="emailAddress"
            value={newEmail}
          />
          <Field
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect={false}
            label={t('account.currentPassword')}
            onChangeText={setEmailPassword}
            onSubmitEditing={() => void changeEmail()}
            ref={emailPasswordRef}
            returnKeyType="go"
            revealLabels={reveal}
            revealable
            secureTextEntry
            textContentType="password"
            value={emailPassword}
          />
          <Text tone="textMuted" variant="caption">
            {t('account.emailReauthNotice')}
          </Text>
          <Result error={email.error} notice={email.notice} />
          <Button
            label={t('account.changeEmail')}
            loading={email.busy}
            onPress={() => void changeEmail()}
            variant="secondary"
          />
        </Card>

        <GroupLabel>{t('account.passwordSection')}</GroupLabel>
        <Card style={styles.card}>
          <Field
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect={false}
            label={t('account.currentPassword')}
            onChangeText={setCurrentPassword}
            onSubmitEditing={() => newPasswordRef.current?.focus()}
            returnKeyType="next"
            revealLabels={reveal}
            revealable
            secureTextEntry
            textContentType="password"
            value={currentPassword}
          />
          <Field
            autoCapitalize="none"
            autoComplete="new-password"
            autoCorrect={false}
            label={t('account.newPassword')}
            onChangeText={setNewPassword}
            onSubmitEditing={() => confirmPasswordRef.current?.focus()}
            ref={newPasswordRef}
            returnKeyType="next"
            revealLabels={reveal}
            revealable
            secureTextEntry
            textContentType="newPassword"
            value={newPassword}
          />
          <Field
            autoCapitalize="none"
            autoComplete="new-password"
            autoCorrect={false}
            label={t('account.confirmPassword')}
            onChangeText={setConfirmPassword}
            onSubmitEditing={() => void changePassword()}
            ref={confirmPasswordRef}
            returnKeyType="go"
            revealLabels={reveal}
            revealable
            secureTextEntry
            textContentType="newPassword"
            value={confirmPassword}
          />
          {/*
            The same rule statement sign-up and the reset screen carry, so the
            three places a password is *chosen* agree on what is being asked
            for. `passwordProblemKey` is shared between them, so a hint here
            that differed from theirs would be describing the same check.
          */}
          <Text tone="textFaint" variant="caption">
            {t('auth.passwordHint')}
          </Text>
          <Result error={password.error} notice={password.notice} />
          <Button
            label={t('account.changePassword')}
            loading={password.busy}
            onPress={() => void changePassword()}
            variant="secondary"
          />
          {/*
            The escape hatch, and it is offered here to *every* account rather
            than only to the provider-only ones above.

            Two reasons. Someone who has forgotten the password this card keeps
            asking for would otherwise have to sign out to reach the
            forgot-password screen — signing out of an account you cannot get
            back into, from the screen where you went to fix that. And it means
            a wrong `hasPassword` reading leaves a working route rather than a
            dead end, which is what lets that flag stay an affordance instead of
            becoming a gate.

            Rendered only when the card above is not already showing the same
            action, so the two are never on screen at once saying it twice.
          */}
          {user.hasPassword ? (
            <>
              <PressableScale
                accessibilityRole="button"
                disabled={recovery.busy}
                onPress={() => void sendPasswordLink()}>
                <Text tone="primary" variant="caption">
                  {t('account.forgotCurrentPassword')}
                </Text>
              </PressableScale>
              <Result error={recovery.error} notice={recovery.notice} />
            </>
          ) : null}
        </Card>

        <GroupLabel>{t('account.dangerSection')}</GroupLabel>
        <Card style={[styles.card, { borderColor: colors.danger }]}>
          <View style={styles.dangerHeader}>
            <Ionicons color={colors.danger} name="warning-outline" size={20} />
            <Text style={styles.dangerText} tone="textMuted" variant="caption">
              {t('account.deleteWarning')}
            </Text>
          </View>
          <Field
            autoCapitalize="none"
            autoComplete="current-password"
            autoCorrect={false}
            label={t('account.currentPassword')}
            onChangeText={setDeletePassword}
            // Deliberately no `onSubmitEditing`. Every other field on this
            // screen submits its card from the return key; this one does not,
            // because the action behind it is irreversible and the keyboard's
            // Go key is the easiest control on the screen to hit by accident.
            // The confirmation dialog is still there, but a delete flow should
            // not *start* from a keystroke that means "next" everywhere else.
            returnKeyType="done"
            revealLabels={reveal}
            revealable
            secureTextEntry
            textContentType="password"
            value={deletePassword}
          />
          <Text tone="textMuted" variant="caption">
            {t('account.deleteReauthNotice')}
          </Text>
          <Result error={danger.error} notice={danger.notice} />
          <Button
            label={t('account.deleteAccount')}
            loading={danger.busy}
            onPress={confirmDelete}
            variant="danger"
          />
        </Card>
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  groupLabel: { marginTop: spacing.sm, marginBottom: -spacing.sm },
  card: { gap: spacing.md },
  photoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  photoActions: { flex: 1, gap: spacing.sm },
  photoRemove: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    borderRadius: radius.md,
  },
  readonlyRow: { gap: 2 },
  dangerHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
  },
  dangerText: { flex: 1 },
});
