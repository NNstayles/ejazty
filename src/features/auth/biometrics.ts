/**
 * Biometric app lock.
 *
 * ## What this is, and what it deliberately is not
 *
 * It is **not** a way to sign in. Supabase keeps a long-lived refresh token in
 * SecureStore and refreshes it automatically, so a returning user is already
 * signed in — there is no credential for a fingerprint to stand in for, and the
 * version that stored the password behind biometrics to "log in with Face ID"
 * would be strictly worse security than the session that already exists.
 *
 * What it is: a lock over a session that is already live. The threat it answers
 * is the one this app actually has — a phone handed to someone else. The
 * account screen can change the password, change the address and delete the
 * account outright, and `reauthenticate` guards those individually; this guards
 * the exam history and the profile picture, which nothing else does.
 *
 * ## Three rules, and each is a way to lock someone out of their own app
 *
 * 1. **Enabling proves the prompt works first.** Persisting the preference and
 *    then discovering the device has no enrolled biometric is how a user ends
 *    up at a lock screen their face cannot open. The prompt is run *before* the
 *    write, and a decline leaves the setting off.
 * 2. **It never rejects.** Same guarantee `setRemindersEnabled` documents, and
 *    for the same reason: every call here is a native call, the settings screen
 *    invokes it with `void`, and a rejection would both skip the correction and
 *    escape unhandled. It fails closed to "off", which is truthful and
 *    recoverable.
 * 3. **A lock must have a way out.** Biometrics stop working — a cut finger, a
 *    face the sensor stops recognising, an OS update that clears enrolment. The
 *    lock screen therefore always offers sign-out, which drops the session and
 *    returns to a password. Without that, the lock is a way to permanently
 *    destroy access to an account from the device holding it.
 *
 * ## Expo Go
 *
 * Android fingerprint and iOS Touch ID work there; **iOS Face ID does not** and
 * needs a development build. That asymmetry is why `available()` reports what it
 * found rather than a bare boolean — a screen offering "Unlock with Face ID" on
 * a build that cannot run Face ID is worse than not offering it.
 */

import * as LocalAuthentication from 'expo-local-authentication';

import { readJSON, StorageKeys, writeJSON } from '@/lib/storage';

/** What the device can actually do, as opposed to what it claims to support. */
export type BiometricAvailability = {
  /** True only when there is a sensor *and* something enrolled against it. */
  usable: boolean;
  /** Drives which name and glyph the screen shows. */
  kind: 'face' | 'fingerprint' | 'iris' | 'none';
};

const UNAVAILABLE: BiometricAvailability = { usable: false, kind: 'none' };

/**
 * What the device offers.
 *
 * Hardware and enrolment are separate questions and both have to be yes:
 * a phone with a fingerprint reader that has never had a fingerprint registered
 * reports `hasHardwareAsync() === true` and cannot authenticate anybody.
 */
export async function available(): Promise<BiometricAvailability> {
  try {
    const [hardware, enrolled] = await Promise.all([
      LocalAuthentication.hasHardwareAsync(),
      LocalAuthentication.isEnrolledAsync(),
    ]);
    if (!hardware || !enrolled) return UNAVAILABLE;

    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    // Ordered by what the user would call it rather than by the enum: a phone
    // reporting both face and fingerprint is a phone whose owner thinks of it
    // as a face phone.
    const kind = types.includes(
      LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION,
    )
      ? 'face'
      : types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)
        ? 'fingerprint'
        : types.includes(LocalAuthentication.AuthenticationType.IRIS)
          ? 'iris'
          : 'none';

    // A sensor of no recognised kind is one no screen can name, so it is not
    // offered — the same reasoning as the Expo Go note above.
    return kind === 'none' ? UNAVAILABLE : { usable: true, kind };
  } catch {
    // Restricted or absent native module: treated as no biometrics at all
    // rather than allowed to reject. See rule 2.
    return UNAVAILABLE;
  }
}

/** Whether the user has turned the lock on. */
export async function isLockEnabled(): Promise<boolean> {
  return readJSON<boolean>(StorageKeys.biometricLock, false);
}

/**
 * Runs the OS prompt.
 *
 * `disableDeviceFallback` is false on purpose, so the passcode is accepted when
 * the biometric fails. That is not a weakening: the device passcode is what
 * protects everything else on the phone, and refusing it would leave a user
 * whose fingerprint is wet with nothing but sign-out.
 */
export async function prompt(promptMessage: string): Promise<boolean> {
  try {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage,
      disableDeviceFallback: false,
    });
    return result.success;
  } catch {
    return false;
  }
}

/**
 * Turns the lock on or off, and returns the state that was actually stored.
 *
 * The caller must persist **this** value rather than what it asked for — the
 * same contract `setRemindersEnabled` has, arrived at from the same failure: a
 * switch saved as ON with nothing behind it claims a protection that does not
 * exist, and here it would claim it about the user's account.
 *
 * Turning it *off* deliberately requires the prompt too. Otherwise anyone
 * holding the unlocked phone can simply switch the lock off from the settings
 * screen, which makes it decorative.
 */
export async function setLockEnabled(
  enabled: boolean,
  promptMessage: string,
): Promise<boolean> {
  try {
    if (enabled) {
      const { usable } = await available();
      if (!usable) return false;
    }

    // Both directions are gated. On the way in this proves the lock can be
    // opened before it is applied; on the way out it proves the person
    // removing it is the person it was protecting.
    const passed = await prompt(promptMessage);
    if (!passed) return await isLockEnabled();

    await writeJSON(StorageKeys.biometricLock, enabled);
    return enabled;
  } catch {
    // Never rejects. Falls back to whatever is actually stored rather than to
    // a guess, so a failure here cannot silently drop an existing lock.
    try {
      return await isLockEnabled();
    } catch {
      return false;
    }
  }
}

/**
 * Clears the preference.
 *
 * Called on sign-out and on account deletion. A lock is a property of the
 * session it protects: leaving it set would greet the *next* account on this
 * phone with a biometric prompt belonging to the previous one, and — since
 * enrolment is per device, not per account — that prompt would be one they
 * could pass, which is the wrong answer in both directions.
 */
export async function clearLock(): Promise<void> {
  await writeJSON(StorageKeys.biometricLock, false);
}
