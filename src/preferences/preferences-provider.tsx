import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

/**
 * Statically imported, and it has to stay that way.
 *
 * These two were `await import('@/features/notifications')` inside the setters.
 * That is a Metro **async split point**, and Expo Go serves dev bundles with
 * `lazy=true` — so the chunk is not in the bundle the device downloaded, it is
 * fetched over HTTP from the dev server at the moment the user taps. When that
 * request fails, `expo/src/async-require/fetchAsync` rejects with
 * `LoadBundleFromServerRequestError`, and because both setters are invoked as
 * `void setLanguage(…)` / `void toggleNotifications(…)` it surfaces as an
 * unhandled rejection rather than anything the screen can show.
 *
 * The split bought nothing to begin with: `src/app/_layout.tsx` already imports
 * this module at the top level for `configureNotificationHandler` and
 * `refreshReminders`, so it is in the main bundle regardless. All the dynamic
 * form added was a network round-trip — and a way for changing language or
 * flipping a switch to fail — for a module already loaded.
 */
import {
  rescheduleForLanguageChange,
  setReminderFrequency as applyReminderFrequency,
  setRemindersEnabled,
} from '@/features/notifications';
import {
  asReminderFrequency,
  DEFAULT_REMINDER_FREQUENCY,
  type ReminderFrequency,
} from '@/features/notifications/messages';
import { hydrateBookmarks } from '@/features/learn/bookmarks';
import {
  applyDirection,
  detectDeviceLanguage,
  initI18n,
  type LanguageCode,
} from '@/i18n';
import { configureHaptics } from '@/lib/haptics';
import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';

export type ThemeMode = 'light' | 'dark' | 'system';

type PreferencesValue = {
  /** False until persisted preferences have been read; gates the splash. */
  ready: boolean;
  language: LanguageCode;
  themeMode: ThemeMode;
  notificationsEnabled: boolean;
  /** How many reminders a day. Only meaningful while reminders are on. */
  reminderFrequency: ReminderFrequency;
  /** Whether taps and graded results give haptic feedback. */
  hapticsEnabled: boolean;
  /** True once the user has picked a language on first launch. */
  onboarded: boolean;
  setLanguage: (code: LanguageCode) => Promise<void>;
  setThemeMode: (mode: ThemeMode) => Promise<void>;
  setNotificationsEnabled: (enabled: boolean) => Promise<void>;
  setReminderFrequency: (frequency: ReminderFrequency) => Promise<void>;
  setHapticsEnabled: (enabled: boolean) => Promise<void>;
  completeOnboarding: () => Promise<void>;
};

const PreferencesContext = createContext<PreferencesValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [language, setLanguageState] = useState<LanguageCode>('en');
  const [themeMode, setThemeModeState] = useState<ThemeMode>('system');
  const [notificationsEnabled, setNotificationsEnabledState] = useState(false);
  const [reminderFrequency, setReminderFrequencyState] = useState<ReminderFrequency>(
    DEFAULT_REMINDER_FREQUENCY,
  );
  // Defaults to on, matching the module default in `lib/haptics.ts`. See the
  // note there on why "off until proven on" is the wrong default for a garnish.
  const [hapticsEnabled, setHapticsEnabledState] = useState(true);
  const [onboarded, setOnboarded] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [
        storedLanguage,
        storedTheme,
        storedOnboarded,
        storedNotifications,
        storedFrequency,
        storedHaptics,
      ] = await Promise.all([
        readJSON<LanguageCode | null>(StorageKeys.language, null),
        readJSON<ThemeMode>(StorageKeys.themeMode, 'system'),
        readJSON<boolean>(StorageKeys.onboarded, false),
        readJSON<boolean>(StorageKeys.notificationsEnabled, false),
        readJSON<unknown>(StorageKeys.reminderFrequency, null),
        readJSON<boolean>(StorageKeys.hapticsEnabled, true),
        // Read here rather than lazily on first subscribe, and awaited with the
        // rest so it lands before `ready` flips. Hydrating later would paint
        // every Learn card unsaved and then flip them a frame afterwards —
        // which on the signs section is a hundred icons changing at once for no
        // reason the reader can see. It resolves into module state rather than
        // into React state, so it is destructured to nothing.
        hydrateBookmarks(),
      ]);
      if (cancelled) return;

      const resolved = storedLanguage ?? detectDeviceLanguage();
      initI18n(resolved);
      // Keeps the native RTL flag out of the way; the app applies direction
      // itself, per render. See `applyDirection`.
      applyDirection(resolved);

      setLanguageState(resolved);
      setThemeModeState(storedTheme);
      setOnboarded(storedOnboarded);
      setNotificationsEnabledState(storedNotifications);
      // Bounded on read rather than trusted: the value reaches
      // `REMINDER_SLOT_HOURS` as a key, and an unrecognised one indexes to
      // undefined and schedules nothing at all.
      setReminderFrequencyState(asReminderFrequency(storedFrequency));
      setHapticsEnabledState(storedHaptics);
      // Mirrored into module state as well as into React state: the call sites
      // are synchronous event handlers that cannot read a context. See
      // `configureHaptics`.
      configureHaptics(storedHaptics);
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const setLanguage = useCallback(async (code: LanguageCode) => {
    setLanguageState(code);
    initI18n(code);
    // No restart notice any more, and none is owed: direction is resolved from
    // `language` by the theme and applied on the next render, so the switch is
    // visible immediately rather than being promised for next launch.
    applyDirection(code);
    await writeJSON(StorageKeys.language, code);
    // Queued reminders carry baked-in text, so they must be rebuilt in the
    // newly selected language.
    await rescheduleForLanguageChange(code);
  }, []);

  const setThemeMode = useCallback(async (mode: ThemeMode) => {
    setThemeModeState(mode);
    await writeJSON(StorageKeys.themeMode, mode);
  }, []);

  const setNotificationsEnabled = useCallback(
    async (enabled: boolean) => {
      // Optimistic, so the switch responds to the tap rather than waiting on the
      // OS permission dialog.
      setNotificationsEnabledState(enabled);

      // `setRemindersEnabled` is the authority, not the requested value: it
      // returns false when the OS permission prompt was declined. Persisting
      // the request instead of the result left the switch stored as ON with
      // nothing scheduled behind it — and because a declined prompt often
      // cannot be re-shown, that state survived every restart, with the toggle
      // claiming reminders were on forever.
      const effective = await setRemindersEnabled(enabled, language);

      if (effective !== enabled) setNotificationsEnabledState(effective);
      await writeJSON(StorageKeys.notificationsEnabled, effective);
    },
    [language],
  );

  const setReminderFrequency = useCallback(
    async (frequency: ReminderFrequency) => {
      // Optimistic, like the notifications switch: the segmented control has to
      // move under the finger, and the re-queue behind it is several native
      // round-trips.
      setReminderFrequencyState(frequency);
      await applyReminderFrequency(frequency, language);
    },
    [language],
  );

  const setHapticsEnabled = useCallback(async (enabled: boolean) => {
    setHapticsEnabledState(enabled);
    configureHaptics(enabled);
    await writeJSON(StorageKeys.hapticsEnabled, enabled);
  }, []);

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
      reminderFrequency,
      hapticsEnabled,
      onboarded,
      setLanguage,
      setThemeMode,
      setNotificationsEnabled,
      setReminderFrequency,
      setHapticsEnabled,
      completeOnboarding,
    }),
    [
      ready,
      language,
      themeMode,
      notificationsEnabled,
      reminderFrequency,
      hapticsEnabled,
      onboarded,
      setLanguage,
      setThemeMode,
      setNotificationsEnabled,
      setReminderFrequency,
      setHapticsEnabled,
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
