import '@/global.css';

import {
  DarkTheme,
  DefaultTheme,
  Stack,
  ThemeProvider,
  type Theme,
} from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppState } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@/features/auth/auth-provider';
import {
  configureNotificationHandler,
  refreshReminders,
} from '@/features/notifications';
import {
  PreferencesProvider,
  usePreferences,
} from '@/preferences/preferences-provider';
import { AppThemeProvider, useTheme } from '@/theme/theme-provider';

SplashScreen.preventAutoHideAsync();
configureNotificationHandler();

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PreferencesProvider>
        <AppThemeProvider>
          <AuthProvider>
            <RootNavigator />
          </AuthProvider>
        </AppThemeProvider>
      </PreferencesProvider>
    </SafeAreaProvider>
  );
}

function RootNavigator() {
  const { ready, language, notificationsEnabled } = usePreferences();
  const { colors, isDark } = useTheme();

  useEffect(() => {
    if (ready) void SplashScreen.hideAsync();
  }, [ready]);

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

  if (!ready) return null;

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
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="language" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}
