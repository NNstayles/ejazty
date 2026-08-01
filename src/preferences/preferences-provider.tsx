import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import {
  applyDirection,
  detectDeviceLanguage,
  initI18n,
  type LanguageCode,
} from '@/i18n';
import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';

export type ThemeMode = 'light' | 'dark' | 'system';

type PreferencesValue = {
  /** False until persisted preferences have been read; gates the splash. */
  ready: boolean;
  language: LanguageCode;
  themeMode: ThemeMode;
  notificationsEnabled: boolean;
  /** True once the user has picked a language on first launch. */
  onboarded: boolean;
  /** Set when a language change needs a full app restart to mirror layout. */
  pendingRestart: boolean;
  setLanguage: (code: LanguageCode) => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const PreferencesContext = createContext<PreferencesValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);
  const [onboarded, setOnboarded] = useState(false);
  const [pendingRestart, setPendingRestart] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [storedLanguage, storedTheme, storedOnboarded, storedNotifications] =
        await Promise.all([
          readJSON<LanguageCode | null>(StorageKeys.language, null),
          readJSON<ThemeMode>(StorageKeys.themeMode, 'system'),
          readJSON<boolean>(StorageKeys.onboarded, false),
          readJSON<boolean>(StorageKeys.notificationsEnabled, false),
        ]);
      if (cancelled) return;

      const resolved = storedLanguage ?? detectDeviceLanguage();
      initI18n(resolved);
      // Align native direction on cold start. A mismatch here is corrected by
      // the OS on the next launch, so no restart prompt is needed.
      applyDirection(resolved);

      setLanguageState(resolved);
      setThemeModeState(storedTheme);
      setOnboarded(storedOnboarded);
      setNotificationsEnabledState(storedNotifications);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = useCallback(async (code: LanguageCode) => {
    setLanguageState(code);
    initI18n(code);
    const { needsRestart } = applyDirection(code);
    if (needsRestart) setPendingRestart(true);
    await writeJSON(StorageKeys.language, code);
    // Queued reminders carry baked-in text, so they must be rebuilt in the
    // newly selected language.
    const { rescheduleForLanguageChange } = await import('@/features/notifications');
    await rescheduleForLanguageChange(code);
  }, []);

  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await writeJSON(StorageKeys.themeMode, mode);
  }, []);

  const setNotificationsEnabled = useCallback(
    async (enabled: boolean) => {
      setNotificationsEnabledState(enabled);
      await writeJSON(StorageKeys.notificationsEnabled, enabled);
      const { setRemindersEnabled } = await import('@/features/notifications');
      await setRemindersEnabled(enabled, language);
    },
    [language],
  );

  const completeOnboarding = useCallback(async () => {
    setOnboarded(true);
    await writeJSON(StorageKeys.onboarded, true);
  }, []);

  const value = useMemo<PreferencesValue>(
    () => ({
      ready,
      language,
      themeMode,
      notificationsEnabled,
      onboarded,
      pendingRestart,
      setLanguage,
      setThemeMode,
      setNotificationsEnabled,
      completeOnboarding,
    }),
    [
      ready,
      language,
      themeMode,
      notificationsEnabled,
      onboarded,
      pendingRestart,
      setLanguage,
      setThemeMode,
      setNotificationsEnabled,
      completeOnboarding,
    ],
  );

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
}

export function usePreferences(): PreferencesValue {
  const ctx = useContext(PreferencesContext);
  if (!ctx) {
    throw new Error('usePreferences must be used inside <PreferencesProvider>');
  }
  return ctx;
}
