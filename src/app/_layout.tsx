import '@/global.css';

// expo-router v6 (SDK 54) does not re-export the navigation theme helpers, so
// they come from their own package.
/*
  Imported from the per-weight entry points, not the package roots.

  Each package's `index.js` re-exports every cut it ships, and a `require` of a
  `.ttf` is an asset reference Metro resolves eagerly — so importing from the
  root bundled all sixteen files (~2.9 MB) to use four (~788 kB), shipping ten
  Playfair weights and two naskh ones no screen can reach. The subpath modules
  require exactly one file each.
*/
import { NotoNaskhArabic_600SemiBold } from '@expo-google-fonts/noto-naskh-arabic/600SemiBold';
import { NotoNaskhArabic_700Bold } from '@expo-google-fonts/noto-naskh-arabic/700Bold';
import { PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display/600SemiBold';
import { PlayfairDisplay_700Bold } from '@expo-google-fonts/playfair-display/700Bold';
import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
  type Theme,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import {
  Stack,
  usePathname,
  useRouter,
  type ErrorBoundaryProps,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { AppState, Pressable, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import i18n from '@/i18n';

import { AuthProvider } from '@/features/auth/auth-provider';
import { LockGate } from '@/features/auth/lock-gate';
import {
  configureNotificationHandler,
  refreshReminders,
} from '@/features/notifications';
import {
  destinationFrom,
  mayNavigateFrom,
} from '@/features/notifications/routing';
import { AvatarProvider } from '@/features/profile/avatar-provider';
import { GoalProvider } from '@/features/progress/goal-provider';
import { duration } from '@/lib/motion';
import {
  PreferencesProvider,
  usePreferences,
} from '@/preferences/preferences-provider';
import { AppThemeProvider, useTheme } from '@/theme/theme-provider';

// Both return promises. Unhandled, a rejection here surfaces as a redbox in
// development and an unhandled-rejection warning in production, for two calls
// whose failure the app can carry on without.
void SplashScreen.preventAutoHideAsync().catch(() => {});
configureNotificationHandler();

/**
 * Last resort for a render error that escapes every screen.
 *
 * Exported from the root layout, so it stands between a crash and the blank
 * white screen the user would otherwise be left holding in a release build.
 *
 * It deliberately depends on nothing: no theme context, no `useTranslation`,
 * no design-system components. The providers are inside the boundary, so
 * whatever broke may well be one of them, and a crash screen that needs the
 * broken thing to render is not a crash screen. Translations are read straight
 * off the i18n singleton behind a try/catch and fall back to English.
 */
export function ErrorBoundary({ error, retry }: ErrorBoundaryProps) {
  const translate = (key: string, fallback: string) => {
    try {
      const value = i18n.t(key);
      return typeof value === 'string' && value !== key ? value : fallback;
    } catch {
      return fallback;
    }
  };

  return (
    <View style={crashStyles.container}>
      <Text style={crashStyles.title}>
        {translate('common.error', 'Something went wrong')}
      </Text>
      {/*
        Development only. `error.message` is the one path by which raw error
        text could still reach a screen — `features/auth/errors.ts` exists to
        keep it off — and in a release build it is both untranslated English
        and able to carry internal detail out of a rethrown error. Release
        builds get a stable, translated line instead; the message itself
        belongs in a crash reporter, not in the UI.
      */}
      <Text style={crashStyles.detail}>
        {__DEV__
          ? error.message
          : translate('common.errorDetail', 'Please restart the app.')}
      </Text>
      <Pressable
        accessibilityRole="button"
        onPress={() => void retry()}
        style={crashStyles.button}>
        <Text style={crashStyles.buttonLabel}>
          {translate('common.retry', 'Try again')}
        </Text>
      </Pressable>
    </View>
  );
}

// Plain values rather than theme tokens: reading the theme would mean reaching
// through the very providers this screen exists to survive. They are copied
// from the dark palette in `theme/tokens.ts` — this screen is always dark — so
// a crash still looks like the app. Update both together.
//
// No `fontFamily` either, and for the same reason: a font that failed to load
// is one of the things that could have brought us here.
const crashStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    padding: 24,
    backgroundColor: '#0A0918',
  },
  title: {
    color: '#F3F1FA',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  detail: { color: '#A6A2C6', fontSize: 14, textAlign: 'center' },
  button: {
    marginTop: 8,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 999,
    backgroundColor: '#A78BFA',
  },
  buttonLabel: { color: '#251E5C', fontSize: 15, fontWeight: '600' },
});

export default function RootLayout() {
  return (
    /*
      Outermost, and required rather than decorative: gesture-handler's
      detectors only work under this view, and expo-router does not provide one
      — the tab-swipe gesture in `(tabs)/_layout.tsx` silently does nothing
      without it, on Android in particular.

      It must sit above `SafeAreaProvider` so it covers the whole window
      including the insets; nesting it lower would leave the status-bar and
      home-indicator strips outside the gesture root.
    */
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaProvider>
        <PreferencesProvider>
          <AppThemeProvider>
            <AuthProvider>
              {/*
                Inside `AuthProvider`, and it has to be: the picture is scoped
                to the signed-in account, so this provider reads `user.id` to
                decide whose picture it is allowed to show. See `avatar.ts`.
              */}
              <AvatarProvider>
                {/*
                  Above the tabs, because the exam runner writes to it and the
                  Learn hero reads it — they are in different tabs, and the
                  whole point of the ring is that it has moved when you come
                  back.
                */}
                <GoalProvider>
                  {/*
                    Outside the navigator rather than a screen inside it,
                    because a route can be navigated past and this has to hold
                    whatever the app is already showing — a deep link, a
                    reminder tap, a cold start into the exam tab. See
                    `features/auth/lock-gate.tsx`.
                  */}
                  <LockGate>
                    <RootNavigator />
                  </LockGate>
                </GoalProvider>
              </AvatarProvider>
            </AuthProvider>
          </AppThemeProvider>
        </PreferencesProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

function RootNavigator() {
  const { ready, language, notificationsEnabled } = usePreferences();
  const { colors, isDark, direction } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  /**
   * Identifiers of reminder taps already acted on.
   *
   * Survives the effect's own teardown, which is the point: the launch response
   * is re-delivered on every read, so the dedupe cannot live inside the effect
   * that reads it.
   */
  const handledResponses = useRef(new Set<string>());

  /*
    The headline serif, in both scripts. Loading is gated on below so no screen
    paints in the system sans and then reflows into the serif a frame later.

    `fontsError` is part of the gate, not just logged: `useFonts` leaves
    `loaded` false forever when a file fails to decode, so gating on `loaded`
    alone would trade a wrong-looking headline for a permanently blank app.
    Falling through on error drops the headings to the system font, which is
    the same outcome as never having added the serif.
  */
  const [fontsLoaded, fontsError] = useFonts({
    PlayfairDisplay_600SemiBold,
    PlayfairDisplay_700Bold,
    NotoNaskhArabic_600SemiBold,
    NotoNaskhArabic_700Bold,
  });
  const fontsSettled = fontsLoaded || fontsError !== null;

  useEffect(() => {
    // A failure to hide is not worth an unhandled rejection: the splash is
    // dismissed by the OS regardless once the first frame is up.
    if (ready && fontsSettled) void SplashScreen.hideAsync().catch(() => {});
  }, [ready, fontsSettled]);

  // Top up the rolling reminder queue whenever the app comes to the foreground,
  // so the horizon keeps advancing without a server.
  useEffect(() => {
    if (!ready || !notificationsEnabled) return;
    void refreshReminders(language);
    const sub = AppState.addEventListener('change', (state) => {
      if (state === 'active') void refreshReminders(language);
    });
    return () => sub.remove();
  }, [ready, notificationsEnabled, language]);

  /*
    Read through a ref rather than depended on, so a tab change does not tear
    down and re-register the notification listener below on every navigation.
  */
  const pathnameRef = useRef(pathname);
  pathnameRef.current = pathname;

  /**
   * Takes a tapped reminder to the tab it advertised.
   *
   * Without this a reminder was a nudge that led nowhere: tapping "Try the Full
   * Mock Exam" brought the app to the foreground on whatever screen it had been
   * left on — often settings, or the Learn section the reader had been in three
   * days earlier. The copy makes a specific promise and nothing was keeping it.
   *
   * Two arrivals, and both are needed. A tap while the app is merely
   * backgrounded fires the listener; a tap that *launches* the app from cold has
   * already happened before any listener exists, and is only recoverable from
   * `getLastNotificationResponseAsync`. That call keeps returning the same
   * launch response for the life of the process, so it is guarded by identifier
   * — otherwise every remount of this component would navigate again, and the
   * reader would find themselves yanked back to the exam tab minutes later.
   */
  useEffect(() => {
    if (!ready) return;
    let cancelled = false;

    const handle = (response: Notifications.NotificationResponse | null) => {
      if (cancelled || !response) return;
      const id = response.notification.request.identifier;
      if (handledResponses.current.has(id)) return;
      handledResponses.current.add(id);

      const destination = destinationFrom(response.notification);
      if (!destination) return;
      // Never out of a running attempt. The session screen has no tab bar for
      // exactly this reason — any exit that skips the quit confirmation leaves
      // the attempt counting down to an auto-submitted failure — and a
      // notification is the one exit the learner did not choose.
      if (!mayNavigateFrom(pathnameRef.current)) return;

      // `navigate`, not `push`: these are tab roots, and pushing stacks a
      // second copy of a screen the reader may already be looking at.
      router.navigate(destination);
    };

    void Notifications.getLastNotificationResponseAsync()
      .then(handle)
      .catch(() => {
        // Restricted in Expo Go, which is this project's documented device
        // workflow. A reminder that cannot report how it was opened is worth
        // losing; an unhandled rejection at start-up is not.
      });

    const sub = Notifications.addNotificationResponseReceivedListener(handle);
    return () => {
      cancelled = true;
      sub.remove();
    };
  }, [ready, router]);

  if (!ready || !fontsSettled) return null;

  const navTheme: Theme = {
    ...(isDark ? DarkTheme : DefaultTheme),
    colors: {
      ...(isDark ? DarkTheme : DefaultTheme).colors,
      background: colors.background,
      card: colors.surface,
      text: colors.text,
      border: colors.border,
      primary: colors.primary,
    },
  };

  return (
    <ThemeProvider value={navTheme}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      {/*
        One `direction` at the root mirrors the entire tree. Yoga inherits it,
        so every row, `flex-start` and `*Start` edge beneath this view flips on
        the frame the language changes — no relaunch, and no native flag.

        Keyed on direction so the tree remounts on a language switch. Yoga
        caches measured layout per node, and flipping the axis on a live tree
        leaves rows that were measured under the old direction sitting at their
        old offsets until something else invalidates them.
      */}
      <View key={direction} style={[styles.root, { direction }]}>
        {/*
          A cross-fade between the app's top-level destinations.

          These are not a hierarchy — the language picker, the auth flow and the
          tabs replace one another rather than stacking — so a side push would
          claim a "back" that does not exist, and the default platform push did
          exactly that on the hop from sign-in into the app. A fade says
          "somewhere else" without implying a way to return, and it is also the
          one transition that needs no mirroring for Arabic and Sorani.
        */}
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'fade',
            // On the app's own duration scale rather than the platform
            // default, which is what every other animation here uses. A
            // cross-fade between top-level destinations is a slower beat than
            // a push inside a section, so it takes `slow` rather than `base`.
            animationDuration: duration.slow,
            // Nothing behind a top-level destination should keep rendering
            // while it is covered. The hop from the auth flow into the tabs is
            // the expensive one — the tab navigator mounts three screens, and
            // the sign-in form re-rendering underneath buys nothing.
            freezeOnBlur: true,
          }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="language" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({ root: { flex: 1 } });
