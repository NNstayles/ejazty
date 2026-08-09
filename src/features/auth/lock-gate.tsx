import Ionicons from '@expo/vector-icons/Ionicons';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AppState, StyleSheet, View } from 'react-native';

import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useTheme } from '@/theme/theme-provider';
import { radius, spacing } from '@/theme/tokens';
import { useAuth } from './auth-provider';
import { isLockEnabled, prompt } from './biometrics';

/**
 * The biometric lock, drawn over the whole app.
 *
 * ## Why an overlay rather than a route
 *
 * A route can be navigated past. This has to hold whatever the app was already
 * showing — a deep link, a reminder tap, a cold start straight into the exam
 * tab — so it is a sibling of the navigator that covers it, not a screen inside
 * it. The tree underneath stays mounted, which is also what makes unlocking
 * return the user exactly where they were rather than to the top of the app.
 *
 * ## When it locks
 *
 * On mount, and again whenever the app comes back from the background. Not on
 * every `AppState` change: iOS emits `inactive` for the notification shade, the
 * app switcher and an incoming call, and locking on those means a prompt for
 * glancing at a notification. Only a real `background` → `active` round trip
 * counts.
 *
 * ## Two properties that keep it from being a trap
 *
 * - **Sign-out is always offered.** Biometrics stop working: a cut finger, a
 *   face the sensor no longer accepts, an OS update that clears enrolment. The
 *   escape hatch drops the session and returns to a password, which is the one
 *   credential the user can always recover through email. Without it this
 *   screen is a way to permanently lose an account from the device holding it.
 * - **A guest is never locked.** There is no session to protect and no password
 *   to fall back to, so the escape hatch would not be one.
 */
export function LockGate({ children }: { children: React.ReactNode }) {
  const { t } = useTranslation();
  const { colors } = useTheme();
  const { user, ready, signOut } = useAuth();

  const [locked, setLocked] = useState(false);
  const [checking, setChecking] = useState(false);

  /*
    Guards against a second prompt being queued behind the first.

    `unlock` is reachable from two places at once — the button and the automatic
    attempt on lock — and the OS answers a duplicate prompt with an immediate
    failure, which would read as the unlock refusing the user's face.
  */
  const prompting = useRef(false);

  const unlock = useCallback(async () => {
    if (prompting.current) return;
    prompting.current = true;
    setChecking(true);
    try {
      if (await prompt(t('auth.unlockPrompt'))) setLocked(false);
    } finally {
      prompting.current = false;
      setChecking(false);
    }
  }, [t]);

  // Locks on first mount once auth has settled. Waiting for `ready` matters:
  // before it, `user` is null and this would decide "guest, no lock" for
  // someone who is signed in.
  useEffect(() => {
    if (!ready || !user) return;
    let cancelled = false;
    void (async () => {
      const on = await isLockEnabled();
      if (!cancelled && on) setLocked(true);
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, user]);

  // Re-locks on a genuine return from the background. The listener is only
  // attached for a signed-in user, so a guest never pays for it.
  useEffect(() => {
    if (!ready || !user) return;
    let previous = AppState.currentState;
    const sub = AppState.addEventListener('change', (next) => {
      const returned = previous.match(/inactive|background/) && next === 'active';
      previous = next;
      if (!returned) return;
      void (async () => {
        if (await isLockEnabled()) setLocked(true);
      })();
    });
    return () => sub.remove();
  }, [ready, user]);

  // Prompts as soon as the cover goes up, so the ordinary case is one glance
  // rather than a screen with a button on it.
  useEffect(() => {
    if (locked) void unlock();
  }, [locked, unlock]);

  return (
    <View style={styles.root}>
      {children}
      {locked ? (
        /*
          `pointerEvents` is left at the default so this absorbs every touch —
          that is the point of a cover. It is drawn opaque for the same reason:
          the exam history and the profile picture underneath are exactly what
          the lock exists to keep off a borrowed phone, and a translucent
          scrim would leave them readable.
        */
        <View style={[styles.cover, { backgroundColor: colors.background }]}>
          <View style={[styles.mark, { backgroundColor: colors.primarySoft }]}>
            <Ionicons color={colors.primary} name="lock-closed" size={34} />
          </View>
          <Text center variant="title">
            {t('auth.lockedTitle')}
          </Text>
          <Text center tone="textMuted" variant="body">
            {t('auth.lockedSubtitle')}
          </Text>
          <View style={styles.actions}>
            <Button
              label={t('auth.unlock')}
              loading={checking}
              onPress={() => void unlock()}
            />
            {/*
              The escape hatch. Ghost rather than hidden behind a "having
              trouble?" disclosure: someone whose biometrics have stopped
              working is already stuck, and making the way out discoverable
              only by tapping around is how a lock becomes a lost account.
            */}
            <Button
              label={t('auth.signOut')}
              onPress={() => void signOut()}
              variant="ghost"
            />
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  cover: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    padding: spacing.xl,
  },
  mark: {
    width: 78,
    height: 78,
    borderRadius: radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  actions: { alignSelf: 'stretch', gap: spacing.sm, marginTop: spacing.xl },
});
