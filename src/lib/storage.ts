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
  /** Persisted exam attempts, newest first. */
  examHistory: 'ejazty.exam.history',
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
