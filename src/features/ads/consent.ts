import { privacyOptionsRequired } from './policy';
import { usable } from './interstitial';

/**
 * The way back into the ad-consent form, after the first launch.
 *
 * `initialiseAds` gathers consent once, at start-up, through
 * `AdsConsent.gatherConsent`. That covers the *first* answer and nothing after
 * it — so a learner in the EEA or UK who accepted personalised adverts on day
 * one had no way to change their mind, in an app whose own privacy policy
 * lists withdrawing that consent as a right it honours for everybody. This
 * module is that button's other half.
 *
 * ## The contract is the ads layer's, with one deliberate inversion
 *
 * Everything here resolves and nothing rejects, exactly as `interstitial.ts`
 * documents. The inversion is which way the *absence* of an answer falls.
 *
 * An interstitial fails **open**: when in doubt, skip the ad and let the
 * learner through, because the cost of being wrong is a lost impression and the
 * cost of the alternative is a learner locked out of an exam. A consent control
 * has the opposite asymmetry. Showing a row that opens nothing is a dead tap;
 * *hiding* one that was required takes away a control the user is entitled to.
 * Neither is free, so the row is hidden on an unknown answer — see
 * `privacyOptionsRequired` for why that is the right default — and the screen
 * re-asks on every focus rather than once at mount, so the window in which the
 * SDK has not yet settled closes on its own instead of lasting the session.
 *
 * ## Why `getConsentInfo` rather than `requestInfoUpdate`
 *
 * `getConsentInfo` reports the last known session's answer from local state.
 * `requestInfoUpdate` goes to Google's consent server. This runs on every focus
 * of the settings screen, so it must not be a network call — and the value it
 * reads only changes as a result of the form below, which updates that same
 * local state when it closes.
 */

/**
 * Whether to offer the consent control on this device, right now.
 *
 * False in Expo Go and on web (no native module), false outside the EEA and UK
 * (`NOT_REQUIRED`), and false before `initialiseAds` has settled (`UNKNOWN`).
 */
export async function privacyOptionsAvailable(): Promise<boolean> {
  const mod = usable();
  if (!mod) return false;
  try {
    const info = await mod.AdsConsent.getConsentInfo();
    return privacyOptionsRequired(info.privacyOptionsRequirementStatus);
  } catch {
    // Never asked, or the SDK is not started. Both mean there is nothing
    // behind the control yet, and both are re-checked on the next focus.
    return false;
  }
}

/**
 * Presents the consent form again, and reports whether it was shown.
 *
 * The boolean is for the screen's benefit rather than the caller's logic:
 * nothing in the app branches on the *answer*, because the SDK holds the
 * result itself and every placement already reads it. What the screen needs to
 * know is whether the tap did anything at all, so a form that could not be
 * presented can say so instead of looking like a control that ignores presses.
 *
 * Consent is not re-gathered afterwards and must not be. The UMP SDK writes the
 * new choice to the same local state every ad request consults, so a learner
 * who withdraws consent stops getting personalised ads from the next request
 * onward without anything here having to notice.
 */
export async function showPrivacyOptions(): Promise<boolean> {
  const mod = usable();
  if (!mod) return false;
  try {
    await mod.AdsConsent.showPrivacyOptionsForm();
    return true;
  } catch {
    return false;
  }
}
