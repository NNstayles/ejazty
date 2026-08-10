import Ionicons from '@expo/vector-icons/Ionicons';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Alert, Linking, StyleSheet, Switch, View } from 'react-native';
import Animated from 'react-native-reanimated';

import {
  BellIcon,
  InfoIcon,
  LanguageIcon,
  ShieldIcon,
  TargetIcon,
  ThemeIcon,
  VibrationIcon,
} from '@/components/icons/settings-icons';
import type { AnimatedIconProps } from '@/components/icons/use-playback';
import { Avatar } from '@/components/ui/avatar';
import { Chevron } from '@/components/ui/chevron';
import { useTabBarClearance } from '@/components/ui/floating-tab-bar';
import { PressableScale } from '@/components/ui/pressable-scale';
import { ProgressRing } from '@/components/ui/progress-ring';
import { Card, Screen } from '@/components/ui/surfaces';
import { Text } from '@/components/ui/text';
import { useAuth } from '@/features/auth/auth-provider';
import {
  available as biometricsAvailable,
  isLockEnabled,
  setLockEnabled,
  type BiometricAvailability,
} from '@/features/auth/biometrics';
import { hasPermission } from '@/features/notifications';
import {
  REMINDER_FREQUENCIES,
  REMINDER_SLOT_HOURS,
} from '@/features/notifications/messages';
import { useAvatar } from '@/features/profile/avatar-provider';
import { GOAL_OPTIONS } from '@/features/progress/goal';
import { useGoal } from '@/features/progress/goal-provider';
import { LANGUAGES, type LanguageCode } from '@/i18n';
import { selectionTap, warningFeedback } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import {
  usePreferences,
  type ThemeMode,
} from '@/preferences/preferences-provider';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';

const THEME_OPTIONS: {
  mode: ThemeMode;
  labelKey: string;
  icon: keyof typeof Ionicons.glyphMap;
}[] = [
  { mode: 'light', labelKey: 'settings.themeLight', icon: 'sunny-outline' },
  { mode: 'dark', labelKey: 'settings.themeDark', icon: 'moon-outline' },
  { mode: 'system', labelKey: 'settings.themeSystem', icon: 'phone-portrait-outline' },
];

/** Small caps label that groups the cards below it. */
function GroupLabel({ children }: { children: string }) {
  return (
    <Text style={styles.groupLabel} tone="textMuted" variant="overline">
      {children.toUpperCase()}
    </Text>
  );
}

/**
 * A card's heading: an animated icon and a title.
 *
 * The icon plays on mount, staggered with its card, so the screen assembles
 * itself rather than arriving finished. `delayMs` is the card's own entrance
 * delay plus a beat, which is what keeps the icon from playing behind a card
 * that has not landed yet.
 */
function CardHeading({
  title,
  Icon,
  delayMs,
}: {
  title: string;
  Icon: (props: AnimatedIconProps) => React.ReactElement;
  delayMs: number;
}) {
  const { colors } = useTheme();
  return (
    <View style={styles.cardHeading}>
      <View style={[styles.headingIcon, { backgroundColor: colors.primarySoft }]}>
        <Icon color={colors.primary} delayMs={delayMs} size={20} />
      </View>
      <Text variant="bodyStrong">{title}</Text>
    </View>
  );
}

export default function SettingsScreen() {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const motion = useMotion();
  const router = useRouter();
  const { user, isGuest, signOut } = useAuth();
  const { uri: avatarUri } = useAvatar();
  const goal = useGoal();
  const clearance = useTabBarClearance();
  const {
    language,
    setLanguage,
    themeMode,
    setThemeMode,
    notificationsEnabled,
    setNotificationsEnabled,
    reminderFrequency,
    setReminderFrequency,
    hapticsEnabled,
    setHapticsEnabled,
  } = usePreferences();

  const [permissionBlocked, setPermissionBlocked] = useState(false);

  /*
    The biometric lock.

    Held here rather than in `PreferencesProvider` because it is not a
    preference in the same sense: the stored value is only meaningful alongside
    what the *device* can currently do, and enrolment can be removed from under
    it at any time by the OS. Reading both together on mount is what stops the
    screen offering a switch that cannot work — the same failure the reminders
    toggle documents, where a switch showing ON with nothing behind it survives
    every restart.
  */
  const [biometrics, setBiometrics] = useState<BiometricAvailability>({
    usable: false,
    kind: 'none',
  });
  const [lockOn, setLockOn] = useState(false);
  const [lockBusy, setLockBusy] = useState(false);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [found, enabled] = await Promise.all([
        biometricsAvailable(),
        isLockEnabled(),
      ]);
      if (cancelled) return;
      setBiometrics(found);
      setLockOn(enabled);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  /*
    Persists the **effective** state, not the requested one.

    `setLockEnabled` runs the OS prompt and returns what was actually stored —
    false when the prompt was declined, or when the device turned out to have
    nothing enrolled. Storing the request instead is how a lock ends up showing
    ON with nothing behind it, which is the exact failure `setRemindersEnabled`
    exists to avoid, applied to the switch that guards the account screen.
  */
  const toggleLock = async (next: boolean) => {
    setLockBusy(true);
    try {
      const effective = await setLockEnabled(next, t('auth.unlockPrompt'));
      setLockOn(effective);
      if (effective !== next) warningFeedback();
    } finally {
      setLockBusy(false);
    }
  };

  /*
    The hours the chosen frequency fires at, as `07:00 · 17:00`.

    Built from `REMINDER_SLOT_HOURS` rather than written into the copy, so the
    screen cannot end up advertising a schedule the scheduler does not keep —
    which is what a hardcoded "every 5 hours" string was already doing for
    anyone who would have picked a lower frequency.

    Latin digits, matching every other interpolated number in the app. In RTL
    the run reverses, which puts the first slot on the right — the correct
    reading order rather than a bug.
  */
  const reminderTimes = REMINDER_SLOT_HOURS[reminderFrequency]
    .map((hour) => `${String(hour).padStart(2, '0')}:00`)
    .join(' · ');

  // Re-check on mount: the user may have revoked permission in the OS since
  // the toggle was last flipped.
  //
  // It deliberately does **not** clear the notice when reminders are off, and
  // that is the whole subtlety here. Declining the OS prompt makes
  // `setRemindersEnabled` report false, which the provider persists — so the
  // switch snaps back to off, this effect re-runs with `notificationsEnabled`
  // already false, and a version that cleared on that branch would wipe the
  // notice explaining why it snapped back. The user would be left with a switch
  // that refuses to stay on and nothing saying why. Turning reminders off by
  // hand is handled in `toggleNotifications`, which knows it was deliberate.
  useEffect(() => {
    if (!notificationsEnabled) return;
    // Guarded like every other async effect here. `hasPermission` crosses the
    // native bridge, so toggling off and on again before it settles lets an
    // older answer land after a newer one and leave the notice contradicting
    // the switch beside it.
    let cancelled = false;
    void hasPermission().then((granted) => {
      if (!cancelled) setPermissionBlocked(!granted);
    });
    return () => {
      cancelled = true;
    };
  }, [notificationsEnabled]);

  const toggleNotifications = async (value: boolean) => {
    await setNotificationsEnabled(value);
    // Asking for reminders is the only case where a permission answer is worth
    // reporting; switching them off is the user's own decision and clears it.
    setPermissionBlocked(value ? !(await hasPermission()) : false);
  };

  const confirmSignOut = () => {
    // Not `selectionTap`: signing out ends a session and, for a guest who then
    // registers, is the moment their local history changes hands. It should not
    // feel like picking a theme.
    warningFeedback();
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

  // Same ladder the Learn tab greets by, so one account is not "Sara" on one
  // screen and "—" on another. `??` alone was not enough: an account whose
  // `user_metadata.full_name` is absent or blank — one created by another
  // client, or a name saved as whitespace — has a non-null `displayName` of ''
  // or a null one, and both fell through to the dash while the email that would
  // have named them sat unused one line below.
  const displayName =
    user?.displayName?.trim() ||
    user?.email?.split('@')[0] ||
    (isGuest ? t('auth.guest') : '-');
  const subtitle = user?.email ?? t('auth.continueAsGuest');

  /*
    Whether the biometric-lock card is on screen, and therefore what stagger
    index the About card below it takes.

    The two used to both be `entrance(7)`. `motion.entrance` turns an index into
    a delay, so on any device that can run the lock — which is every real phone,
    the card being hidden mainly in Expo Go — the last two cards were handed the
    same delay and landed on top of each other, ending a sequence that had
    stepped cleanly through the six above them. It reads as the animation
    giving up one card early rather than as a deliberate pair.

    Derived rather than hardcoded to 8, because the card really is conditional:
    a guest, or a device with nothing enrolled, genuinely has seven cards and
    the About card is genuinely the eighth position only sometimes.
  */
  const showLock = biometrics.usable && Boolean(user);

  return (
    <Screen contentStyle={{ paddingBottom: clearance }} wash="heroWash">
      <Text variant="display">{t('settings.title')}</Text>

      <GroupLabel>{t('settings.account')}</GroupLabel>

      {/*
        The account hero. The whole block is the control that opens the account
        screen, rather than a static row with a separate "manage" button under
        it — the picture, the name and the address are all things you change
        there, so the row that shows them is the obvious place to press.
      */}
      <Animated.View entering={motion.entrance(0)}>
        <PressableScale
          accessibilityHint={t('account.manageDesc')}
          accessibilityLabel={displayName}
          accessibilityRole="button"
          onPress={() => router.push('/settings/account')}
          scaleTo={0.985}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <Avatar name={displayName} ring size={56} uri={avatarUri} />
              <View style={styles.rowBody}>
                <Text numberOfLines={1} variant="heading">
                  {displayName}
                </Text>
                <Text numberOfLines={1} tone="textMuted" variant="caption">
                  {subtitle}
                </Text>
                <View
                  style={[styles.editPill, { backgroundColor: colors.primarySoft }]}>
                  <Ionicons color={colors.primary} name="camera-outline" size={11} />
                  <Text style={{ color: colors.primary }} variant="overline">
                    {t('account.photoEdit')}
                  </Text>
                </View>
              </View>
              <Chevron />
            </View>
          </Card>
        </PressableScale>
      </Animated.View>

      <Animated.View entering={motion.entrance(1)}>
        <Card style={styles.card}>
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
      </Animated.View>

      <GroupLabel>{t('settings.study')}</GroupLabel>

      {/*
        The daily goal.

        It lives in settings because it is a setting, and it shows today's
        progress beside the picker because a target with no reading against it
        is a number you set once and never think about again.
      */}
      <Animated.View entering={motion.entrance(2)}>
        <Card style={styles.card}>
          <CardHeading
            Icon={TargetIcon}
            delayMs={260}
            title={t('goal.title')}
          />
          <View style={styles.goalRow}>
            <ProgressRing
              accent={colors.primary}
              fraction={goal.fraction}
              size={72}
              thickness={7}>
              <Text variant="bodyStrong">{goal.correct}</Text>
            </ProgressRing>
            <View style={styles.rowBody}>
              <Text tone="textMuted" variant="caption">
                {t('goal.progress', { correct: goal.correct, goal: goal.goal })}
              </Text>
              {goal.streak > 0 ? (
                <View style={styles.goalStreak}>
                  <Ionicons color={colors.warning} name="flame" size={13} />
                  <Text tone="textMuted" variant="caption">
                    {t('goal.streak', { count: goal.streak })}
                  </Text>
                </View>
              ) : (
                <Text tone="textFaint" variant="caption">
                  {t('goal.streakNone')}
                </Text>
              )}
            </View>
          </View>

          <View style={[styles.segment, { backgroundColor: colors.surfaceAlt }]}>
            {GOAL_OPTIONS.map((option) => {
              const active = option === goal.goal;
              return (
                <PressableScale
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  key={option}
                  onPress={() => {
                    selectionTap();
                    void goal.setGoal(option);
                  }}
                  scaleTo={0.94}
                  style={[
                    styles.segmentItem,
                    active && { backgroundColor: colors.surface },
                  ]}>
                  <Text
                    center
                    style={{ color: active ? colors.primary : colors.textMuted }}
                    variant="bodyStrong">
                    {option}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
          <Text tone="textFaint" variant="caption">
            {t('goal.hint')}
          </Text>
        </Card>
      </Animated.View>

      <GroupLabel>{t('settings.app')}</GroupLabel>

      <Animated.View entering={motion.entrance(3)}>
        <Card style={styles.card}>
          <CardHeading
            Icon={LanguageIcon}
            delayMs={320}
            title={t('settings.language')}
          />
          <View style={styles.options}>
            {LANGUAGES.map((entry) => (
              <OptionRow
                active={entry.code === language}
                key={entry.code}
                onPress={() => {
                  selectionTap();
                  void setLanguage(entry.code as LanguageCode);
                }}
                subtitle={entry.englishName}
                title={entry.nativeName}
              />
            ))}
          </View>
          {/*
            No restart notice. Direction used to ride on `I18nManager.forceRTL`,
            which only lands on a full relaunch, so the screen had to admit the
            switch was not really finished. The theme resolves direction from the
            active language now and every `Text` aligns against it, so the change
            is done by the time this card re-renders.
          */}
        </Card>
      </Animated.View>

      <Animated.View entering={motion.entrance(4)}>
        <Card style={styles.card}>
          <CardHeading Icon={ThemeIcon} delayMs={360} title={t('settings.theme')} />
          {/* Segmented rather than stacked: three short, mutually exclusive
              options read faster side by side. */}
          <View style={[styles.segment, { backgroundColor: colors.surfaceAlt }]}>
            {THEME_OPTIONS.map((option) => {
              const active = option.mode === themeMode;
              return (
                <PressableScale
                  accessibilityRole="radio"
                  accessibilityState={{ selected: active }}
                  key={option.mode}
                  onPress={() => {
                    selectionTap();
                    void setThemeMode(option.mode);
                  }}
                  scaleTo={0.96}
                  style={[
                    styles.segmentItem,
                    active && { backgroundColor: colors.surface },
                  ]}>
                  <Ionicons
                    color={active ? colors.primary : colors.textMuted}
                    name={option.icon}
                    size={18}
                  />
                  <Text
                    center
                    style={{ color: active ? colors.text : colors.textMuted }}
                    variant="caption">
                    {t(option.labelKey)}
                  </Text>
                </PressableScale>
              );
            })}
          </View>
        </Card>
      </Animated.View>

      <Animated.View entering={motion.entrance(5)}>
        <Card style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.headingIcon, { backgroundColor: colors.primarySoft }]}>
              <BellIcon color={colors.primary} delayMs={400} size={20} />
            </View>
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

          {/*
            How often, and when — shown only while reminders are on, because
            both are answers to a question nobody is asking with the switch off,
            and a disabled control that still occupies a third of the card is
            just clutter.

            The times matter as much as the count. Before this the switch was a
            black box: four notifications a day would start arriving and the
            only thing the app had said about it was "a nudge during the day".
            Someone deciding whether to leave this on needs to know it will go
            off at 22:00.
          */}
          {notificationsEnabled ? (
            <View style={styles.reminderPlan}>
              <Text tone="textMuted" variant="overline">
                {t('settings.reminderFrequency').toUpperCase()}
              </Text>
              <View style={[styles.segment, { backgroundColor: colors.surfaceAlt }]}>
                {REMINDER_FREQUENCIES.map((option) => {
                  const active = option === reminderFrequency;
                  return (
                    <PressableScale
                      accessibilityRole="radio"
                      accessibilityState={{ selected: active }}
                      key={option}
                      onPress={() => {
                        selectionTap();
                        void setReminderFrequency(option);
                      }}
                      scaleTo={0.94}
                      style={[
                        styles.segmentItem,
                        active && { backgroundColor: colors.surface },
                      ]}>
                      <Text
                        center
                        style={{ color: active ? colors.primary : colors.textMuted }}
                        variant="bodyStrong">
                        {t('settings.reminderPerDay', { count: option })}
                      </Text>
                    </PressableScale>
                  );
                })}
              </View>
              <Text tone="textFaint" variant="caption">
                {t('settings.reminderTimes', { times: reminderTimes })}
              </Text>
              {/*
                Stated here rather than left to be discovered. The schedule
                above is otherwise read as a promise, and an evening reminder
                that does not arrive because the learner already studied looks
                like the feature is broken instead of like it is being polite.
              */}
              <Text tone="textFaint" variant="caption">
                {t('settings.reminderGoalNote')}
              </Text>
            </View>
          ) : null}

          {permissionBlocked ? (
            <View style={[styles.notice, { backgroundColor: colors.warningSoft }]}>
              <Ionicons color={colors.warning} name="alert-circle-outline" size={16} />
              <View style={styles.noticeBody}>
                <Text style={{ color: colors.warning }} variant="caption">
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
            </View>
          ) : null}
        </Card>
      </Animated.View>

      {/*
        Haptics. A real preference rather than a filler switch: the app taps on
        every answer selected, every option chosen and every tab change, and
        that is exactly the kind of thing a person either likes or finds
        intrusive. It is also the one setting here that costs battery.
      */}
      <Animated.View entering={motion.entrance(6)}>
        <Card style={styles.card}>
          <View style={styles.row}>
            <View style={[styles.headingIcon, { backgroundColor: colors.primarySoft }]}>
              {/*
                Animated like every other card icon on this screen. It was the
                one static glyph among seven, which is the sort of gap that
                reads as an unfinished screen rather than as a deliberate
                exception — and the icon has an obvious thing to do.
              */}
              <VibrationIcon color={colors.primary} delayMs={420} size={20} />
            </View>
            <View style={styles.rowBody}>
              <Text variant="bodyStrong">{t('settings.haptics')}</Text>
              <Text tone="textMuted" variant="caption">
                {t('settings.hapticsDesc')}
              </Text>
            </View>
            <Switch
              onValueChange={(v) => {
                // Fired before the write, and only when switching *on*: the tap
                // is the demonstration of what the switch does, and firing it
                // while turning haptics off would be the setting ignoring
                // itself at the exact moment it was asked not to.
                if (v) selectionTap();
                void setHapticsEnabled(v);
              }}
              thumbColor={colors.surface}
              trackColor={{ false: colors.border, true: colors.primary }}
              value={hapticsEnabled}
            />
          </View>
        </Card>
      </Animated.View>

      {/*
        The biometric lock, shown only where the device can actually run it.

        Hidden rather than disabled, and that is the opposite of the usual rule
        — a control you cannot use should normally still be visible so you know
        it exists. It does not apply here because the reason is never anything
        the user can act on from this screen: no sensor, nothing enrolled, or a
        build (Expo Go on iOS) where Face ID is unavailable. A permanently greyed
        row would be a promise the app cannot keep on that phone.

        Guests never see it either. There is no account to protect and no
        password to fall back to, so a guest who enabled it and then lost their
        fingerprint would have locked themselves out of purely local data with
        no sign-out to recover through.
      */}
      {showLock ? (
        <Animated.View entering={motion.entrance(7)}>
          <Card style={styles.card}>
            <View style={styles.row}>
              <View
                style={[styles.headingIcon, { backgroundColor: colors.primarySoft }]}>
                <Ionicons
                  color={colors.primary}
                  name={
                    biometrics.kind === 'face'
                      ? 'scan-outline'
                      : 'finger-print-outline'
                  }
                  size={20}
                />
              </View>
              <View style={styles.rowBody}>
                <Text variant="bodyStrong">{t('settings.biometricLock')}</Text>
                <Text tone="textMuted" variant="caption">
                  {t('settings.biometricLockDesc')}
                </Text>
              </View>
              <Switch
                // Disabled only while the OS prompt is up. Without it a second
                // tap queues a second prompt behind the first, and the two
                // resolve in an order neither the user nor the switch can
                // predict.
                disabled={lockBusy}
                onValueChange={(v) => void toggleLock(v)}
                thumbColor={colors.surface}
                trackColor={{ false: colors.border, true: colors.primary }}
                value={lockOn}
              />
            </View>
          </Card>
        </Animated.View>
      ) : null}

      <GroupLabel>{t('settings.about')}</GroupLabel>
      <Animated.View entering={motion.entrance(showLock ? 8 : 7)}>
        <Card style={styles.card}>
          <CardHeading Icon={InfoIcon} delayMs={440} title={t('settings.about')} />
          <View style={styles.row}>
            {/*
              `styles.fill`, not `styles.rowBody`: the latter is a container style
              carrying a `gap`, which means nothing on a `Text` and only read as
              equivalent because both happen to set `flex: 1`.
            */}
            <Text style={styles.fill} tone="textMuted" variant="caption">
              {t('settings.version')}
            </Text>
            <Text tone="textMuted" variant="caption">
              {Constants.expoConfig?.version ?? '1.0.0'}
            </Text>
          </View>
          {/*
            The policy is a screen rather than a link because there is no site to
            host it on, and because both stores want it reachable from inside the
            app. It sits in About rather than under its own group label: it is a
            document you read once, not a setting you come here to change.
          */}
          <PressableScale
            accessibilityHint={t('settings.privacyDesc')}
            accessibilityLabel={t('settings.privacy')}
            accessibilityRole="button"
            onPress={() => {
              selectionTap();
              router.push('/settings/privacy');
            }}
            scaleTo={0.985}>
            <View style={styles.row}>
              <View style={styles.rowBody}>
                <Text variant="body">{t('settings.privacy')}</Text>
                <Text tone="textFaint" variant="caption">
                  {t('settings.privacyDesc')}
                </Text>
              </View>
              <Chevron />
            </View>
          </PressableScale>

          <View style={[styles.sourceNote, { backgroundColor: colors.surfaceAlt }]}>
            <ShieldIcon color={colors.textMuted} delayMs={480} size={18} />
            <Text style={styles.fill} tone="textMuted" variant="caption">
              {t('settings.sourceNote')}
            </Text>
          </View>
        </Card>
      </Animated.View>
    </Screen>
  );
}

function OptionRow({
  title,
  subtitle,
  active,
  onPress,
}: {
  title: string;
  subtitle?: string;
  active: boolean;
  onPress: () => void;
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
      <View style={styles.rowBody}>
        <Text variant="body">{title}</Text>
        {subtitle ? (
          <Text tone="textFaint" variant="caption">
            {subtitle}
          </Text>
        ) : null}
      </View>
      {active ? (
        <Ionicons color={colors.primary} name="checkmark-circle" size={20} />
      ) : null}
    </PressableScale>
  );
}

const styles = StyleSheet.create({
  groupLabel: { marginTop: spacing.sm, marginBottom: -spacing.sm },
  card: { gap: spacing.md },
  cardHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  headingIcon: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  rowBody: { flex: 1, gap: 2 },
  /** Takes the remaining width without implying a stacked container. */
  fill: { flex: 1 },
  editPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    marginTop: 2,
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
  goalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.lg,
  },
  goalStreak: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  reminderPlan: { gap: spacing.sm },
  options: { gap: spacing.sm },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    padding: spacing.md,
    borderRadius: radius.md,
    borderWidth: 1.5,
  },
  segment: {
    flexDirection: 'row',
    gap: spacing.xs,
    padding: spacing.xs,
    borderRadius: radius.md,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
    borderRadius: radius.sm,
  },
  notice: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
  },
  noticeBody: { flex: 1, gap: spacing.xs },
  sourceNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    padding: spacing.md,
    borderRadius: radius.md,
  },
});
