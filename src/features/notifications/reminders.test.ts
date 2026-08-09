/**
 * The settings toggle's contract with `PreferencesProvider`.
 *
 * `setRemindersEnabled` returns the *effective* state, and the provider
 * persists whatever comes back rather than what the user asked for. That
 * arrangement exists because a declined OS prompt would otherwise be stored as
 * ON with nothing scheduled behind it — and since a declined prompt often
 * cannot be re-shown, that survived every restart.
 *
 * A rejection defeats the same design by a different route: the provider never
 * reaches its correction or its write, so the switch stays showing ON, and the
 * settings screen invokes the toggle with `void`, so the rejection escapes
 * unhandled on top of that. Every native call reachable from here — the two
 * permission calls, the cancel, the channel write — is restricted or absent in
 * Expo Go, which is this project's documented device-testing workflow, so this
 * is the ordinary path rather than an exotic one.
 *
 * Hence: never rejects, and reports OFF when it could not deliver ON. The
 * switch snapping back is truthful and recoverable; a switch stuck ON is
 * neither.
 */

import * as Notifications from 'expo-notifications';

import { initI18n } from '@/i18n';
import { setRemindersEnabled } from './index';

jest.mock('expo-notifications', () => ({
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  cancelAllScheduledNotificationsAsync: jest.fn(),
  getAllScheduledNotificationsAsync: jest.fn(),
  scheduleNotificationAsync: jest.fn(),
  setNotificationChannelAsync: jest.fn(),
  setNotificationHandler: jest.fn(),
  AndroidImportance: { DEFAULT: 3 },
  SchedulableTriggerInputTypes: { DATE: 'date' },
}));

jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

const mocked = Notifications as jest.Mocked<typeof Notifications>;

/** Everything native resolving normally, with permission already granted. */
function nativeWorks() {
  mocked.getPermissionsAsync.mockResolvedValue({
    granted: true,
    canAskAgain: true,
  } as never);
  mocked.cancelAllScheduledNotificationsAsync.mockResolvedValue(undefined);
  mocked.setNotificationChannelAsync.mockResolvedValue(null as never);
  mocked.scheduleNotificationAsync.mockResolvedValue('id');
  mocked.getAllScheduledNotificationsAsync.mockResolvedValue([]);
}

// Reminder text is baked in at schedule time, so this module reads i18n
// directly. The app has always initialised it first — `PreferencesProvider`
// gates rendering on `ready`, and nothing calls in here before that — but
// i18next throws rather than falling back when it has not been, which would
// otherwise make every "native works" case below fail for the wrong reason.
beforeAll(() => {
  initI18n('en');
});

beforeEach(() => {
  jest.clearAllMocks();
  nativeWorks();
});

describe('setRemindersEnabled', () => {
  it('reports on, and schedules, when permission is granted', async () => {
    await expect(setRemindersEnabled(true, 'en')).resolves.toBe(true);
    expect(mocked.scheduleNotificationAsync).toHaveBeenCalled();
  });

  it('reports off when the OS prompt is declined', async () => {
    mocked.getPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: true,
    } as never);
    mocked.requestPermissionsAsync.mockResolvedValue({ granted: false } as never);

    await expect(setRemindersEnabled(true, 'en')).resolves.toBe(false);
    expect(mocked.scheduleNotificationAsync).not.toHaveBeenCalled();
  });

  it('reports off, rather than rejecting, when reading permission throws', async () => {
    // Expo Go. The switch must land back on OFF, not stay ON with nothing
    // behind it.
    mocked.getPermissionsAsync.mockRejectedValue(new Error('unavailable'));

    await expect(setRemindersEnabled(true, 'en')).resolves.toBe(false);
  });

  it('reports off, rather than rejecting, when the prompt itself throws', async () => {
    mocked.getPermissionsAsync.mockResolvedValue({
      granted: false,
      canAskAgain: true,
    } as never);
    mocked.requestPermissionsAsync.mockRejectedValue(new Error('unavailable'));

    await expect(setRemindersEnabled(true, 'en')).resolves.toBe(false);
  });

  it('reports off, rather than rejecting, when scheduling throws', async () => {
    // Permission is granted, so this gets past the gate and fails on the queue
    // rebuild — the half that touches the most native surface.
    mocked.cancelAllScheduledNotificationsAsync.mockRejectedValue(
      new Error('unavailable'),
    );

    await expect(setRemindersEnabled(true, 'en')).resolves.toBe(false);
  });

  it('reports off, rather than rejecting, when cancelling throws', async () => {
    mocked.cancelAllScheduledNotificationsAsync.mockRejectedValue(
      new Error('unavailable'),
    );

    // Turning reminders *off* must not be the thing that throws, or the stored
    // preference stays ON and the next foreground queues them all over again.
    await expect(setRemindersEnabled(false, 'en')).resolves.toBe(false);
  });
});
