/**
 * The biometric lock, and specifically the three ways it can lock someone out
 * of their own account.
 *
 * Nothing here is reachable by hand without two phones — one with an enrolled
 * face and one without — and the failures are all silent in the direction that
 * matters: a lock stored as ON with nothing behind it looks exactly like a lock
 * that works, right up until the moment somebody else picks the phone up.
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';

import {
  available,
  clearLock,
  isLockEnabled,
  prompt,
  setLockEnabled,
} from './biometrics';
import { StorageKeys } from '@/lib/storage';

// The package's own mock, as the other storage-backed suites use.
jest.mock('@react-native-async-storage/async-storage', () =>
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('expo-local-authentication', () => ({
  hasHardwareAsync: jest.fn(),
  isEnrolledAsync: jest.fn(),
  supportedAuthenticationTypesAsync: jest.fn(),
  authenticateAsync: jest.fn(),
  AuthenticationType: { FINGERPRINT: 1, FACIAL_RECOGNITION: 2, IRIS: 3 },
}));

const mocked = LocalAuthentication as jest.Mocked<typeof LocalAuthentication>;

/** A device with a working, enrolled face sensor. */
function deviceWithFace() {
  mocked.hasHardwareAsync.mockResolvedValue(true);
  mocked.isEnrolledAsync.mockResolvedValue(true);
  mocked.supportedAuthenticationTypesAsync.mockResolvedValue([
    LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
  ]);
}

beforeEach(async () => {
  jest.clearAllMocks();
  await AsyncStorage.clear();
});

describe('available', () => {
  it('needs hardware and an enrolled biometric, not just hardware', async () => {
    // The case that matters: a phone with a fingerprint reader nobody has ever
    // registered a finger against. `hasHardwareAsync` says yes and the prompt
    // can never succeed, so offering the lock strands the user.
    mocked.hasHardwareAsync.mockResolvedValue(true);
    mocked.isEnrolledAsync.mockResolvedValue(false);

    expect(await available()).toEqual({ usable: false, kind: 'none' });
    // Cheap assertion with a point: it must not go on to ask what kind of
    // sensor an unusable device has.
    expect(mocked.supportedAuthenticationTypesAsync).not.toHaveBeenCalled();
  });

  it('names the sensor, so a screen can say what it is asking for', async () => {
    deviceWithFace();
    expect(await available()).toEqual({ usable: true, kind: 'face' });
  });

  it('prefers face over fingerprint when the device offers both', async () => {
    mocked.hasHardwareAsync.mockResolvedValue(true);
    mocked.isEnrolledAsync.mockResolvedValue(true);
    mocked.supportedAuthenticationTypesAsync.mockResolvedValue([
      LocalAuthentication.AuthenticationType.FINGERPRINT,
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    ]);
    expect((await available()).kind).toBe('face');
  });

  it('reports nothing rather than throwing where the module is restricted', async () => {
    // The ordinary path in Expo Go, which is the workflow the SDK pin exists to
    // preserve — not an exotic one.
    mocked.hasHardwareAsync.mockRejectedValue(new Error('restricted'));
    await expect(available()).resolves.toEqual({ usable: false, kind: 'none' });
  });
});

describe('setLockEnabled', () => {
  it('refuses to turn on where there is nothing to unlock with', async () => {
    mocked.hasHardwareAsync.mockResolvedValue(false);
    mocked.isEnrolledAsync.mockResolvedValue(false);

    expect(await setLockEnabled(true, 'Unlock')).toBe(false);
    expect(await isLockEnabled()).toBe(false);
    // The load-bearing half: it must not even show a prompt it knows cannot
    // pass, let alone store the preference behind one.
    expect(mocked.authenticateAsync).not.toHaveBeenCalled();
  });

  it('proves the prompt passes before it stores the lock', async () => {
    deviceWithFace();
    mocked.authenticateAsync.mockResolvedValue({
      success: false,
      error: 'user_cancel',
    } as never);

    expect(await setLockEnabled(true, 'Unlock')).toBe(false);
    // This is the assertion that stops the lock-yourself-out bug: a declined
    // prompt must leave the setting exactly as it was.
    expect(await isLockEnabled()).toBe(false);
  });

  it('stores the lock once the prompt passes', async () => {
    deviceWithFace();
    mocked.authenticateAsync.mockResolvedValue({ success: true } as never);

    expect(await setLockEnabled(true, 'Unlock')).toBe(true);
    expect(await isLockEnabled()).toBe(true);
  });

  it('requires the prompt to turn the lock OFF as well', async () => {
    // Otherwise the lock is decorative: whoever is holding the unlocked phone
    // walks to the settings screen and switches it off.
    await AsyncStorage.setItem(StorageKeys.biometricLock, 'true');
    deviceWithFace();
    mocked.authenticateAsync.mockResolvedValue({
      success: false,
      error: 'authentication_failed',
    } as never);

    expect(await setLockEnabled(false, 'Unlock')).toBe(true);
    expect(await isLockEnabled()).toBe(true);
  });

  it('never rejects, and keeps the stored lock when the native call throws', async () => {
    // The settings screen calls this with `void`, so a rejection escapes
    // unhandled *and* skips the correction — the same pair of failures
    // `setRemindersEnabled` documents.
    await AsyncStorage.setItem(StorageKeys.biometricLock, 'true');
    deviceWithFace();
    mocked.authenticateAsync.mockRejectedValue(new Error('no such module'));

    await expect(setLockEnabled(false, 'Unlock')).resolves.toBe(true);
    // Falls back to what is actually stored rather than to a guess, so a
    // transient native failure cannot silently drop an existing lock.
    expect(await isLockEnabled()).toBe(true);
  });
});

describe('prompt', () => {
  it('allows the device passcode as a fallback', async () => {
    mocked.authenticateAsync.mockResolvedValue({ success: true } as never);
    await prompt('Unlock');
    // A wet finger must not be the end of the road. The passcode is what
    // protects the rest of the phone; refusing it here would leave sign-out as
    // the only way back in.
    expect(mocked.authenticateAsync).toHaveBeenCalledWith(
      expect.objectContaining({ disableDeviceFallback: false }),
    );
  });

  it('reports a failed prompt as false rather than throwing', async () => {
    mocked.authenticateAsync.mockRejectedValue(new Error('lockout'));
    await expect(prompt('Unlock')).resolves.toBe(false);
  });
});

describe('clearLock', () => {
  it('drops the lock, so it does not greet the next account on this phone', async () => {
    // Enrolment is per device, not per account — so a lock left behind by the
    // previous user is one the *new* user can pass, which is the wrong answer
    // in both directions at once.
    await AsyncStorage.setItem(StorageKeys.biometricLock, 'true');
    await clearLock();
    expect(await isLockEnabled()).toBe(false);
  });
});
