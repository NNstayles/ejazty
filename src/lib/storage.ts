import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Every persisted key lives here so storage usage stays greppable and we never
 * collide on ad-hoc string keys.
 */
export const StorageKeys = {
  language: 'ejazty.language',
  themeMode: 'ejazty.themeMode',
  onboarded: 'ejazty.onboarded',
  notificationsEnabled: 'ejazty.notifications.enabled',
  /** Map of `YYYY-MM-DD` -> notification message ids already used that day. */
  notificationHistory: 'ejazty.notifications.history',
  /** What the currently queued reminders were built for; see `refreshReminders`. */
  notificationQueue: 'ejazty.notifications.queue',
  /** How many reminders a day; one of `REMINDER_FREQUENCIES`. */
  reminderFrequency: 'ejazty.notifications.frequency',
  /** Persisted exam attempts, newest first. */
  examHistory: 'ejazty.exam.history',
  /**
   * Per-question performance, keyed by question id. Bounded by the size of the
   * bank rather than by how much the learner practises — see
   * `features/progress/question-stats.ts`.
   */
  questionStats: 'ejazty.exam.questionStats',
  /**
   * The profile picture: a *filename* plus the account it belongs to, never an
   * absolute URI. See `features/profile/avatar.ts` for why the distinction is
   * load-bearing.
   */
  avatar: 'ejazty.profile.avatar',
  /** Whether taps and graded results give haptic feedback. */
  hapticsEnabled: 'ejazty.haptics.enabled',
  /** Daily study goal, in questions answered correctly. */
  studyGoal: 'ejazty.study.goal',
  /** Per-day tally of questions answered correctly, for the goal ring. */
  studyProgress: 'ejazty.study.progress',
  /**
   * Failed re-authentication attempts and the current lockout deadline.
   * Persisted rather than held in module state so force-quitting the app is
   * not a way to reset the counter; see `features/auth/reauth.ts`.
   */
  reauthBackoff: 'ejazty.auth.reauthBackoff',
  /**
   * The address the last successful sign-in used, so the field is filled in on
   * return. Only ever the address — a password belongs in SecureStore behind
   * the platform's own autofill, never here.
   */
  lastEmail: 'ejazty.auth.lastEmail',
  /**
   * Whether the app is locked behind the device's biometrics. Device-local and
   * cleared on sign-out — see `features/auth/biometrics.ts`.
   */
  biometricLock: 'ejazty.auth.biometricLock',
} as const;

export async function readJSON<T>(key: string, fallback: T): Promise<T> {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw == null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    // Corrupt or unparseable entries fall back rather than crashing boot.
    return fallback;
  }
}

export async function writeJSON(key: string, value: unknown): Promise<void> {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Persistence is best-effort; a failed write must not break the UI.
  }
}

export async function remove(key: string): Promise<void> {
  try {
    await AsyncStorage.removeItem(key);
  } catch {
    // ignore
  }
}
