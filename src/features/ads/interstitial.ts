import { Platform, TurboModuleRegistry } from 'react-native';

import {
  adsAvailable,
  mayShowInterstitial,
  resolveAdUnitId,
  type AdPlacement,
} from './policy';

/**
 * The interstitial seam: preload ahead of a transition, show at it, and — the
 * rule everything here is built around — **never stand between the learner and
 * where they were going**.
 *
 * ## Fail open, always
 *
 * Every function exported here resolves. None of them reject, and none of them
 * can block indefinitely. That is the same contract `features/auth/captcha.ts`
 * documents and for a stronger reason: a CAPTCHA that fails closed locks people
 * out of an account, and an ad that fails closed locks them out of the exam
 * they came to sit. Google's fill rate is not 100%, the SDK is absent entirely
 * in Expo Go, and a network can drop between tapping a card and the paper
 * opening. All three have to end with the learner on the next screen.
 *
 * Concretely, an ad is skipped rather than waited on when: the native module is
 * missing, the platform is web, consent has not been given, nothing is
 * preloaded within {@link LOAD_GRACE_MS}, `show()` rejects, or the SDK reports
 * an error instead of opening.
 *
 * ## Why the module is required lazily, and why it is *probed* first
 *
 * `react-native-google-mobile-ads` is a native module and **does not exist in
 * Expo Go**, which is the workflow the SDK 54 pin in CLAUDE.md exists to
 * preserve. A static import would throw at bundle-evaluation time and take the
 * whole app down on launch, turning "ads do not work in Expo Go" into "the app
 * does not start in Expo Go". A guarded `require` caches the failure once and
 * every entry point below degrades to a no-op.
 *
 * A `try`/`catch` around the `require` is **not sufficient on its own**, and
 * this was a live defect: the library's specs call
 * `TurboModuleRegistry.getEnforcing(...)` at module scope, and in development
 * Metro's `guardedLoadModule` reports a module-initialisation throw to LogBox
 * *before* rethrowing it. So the catch below did its job — the app booted and
 * every screen worked — while the learner was shown three red
 * `Invariant Violation: 'RNGoogleMobileAdsModule' could not be found` boxes at
 * launch, one per component that reached this file. Catching an error does not
 * unreport it.
 *
 * The fix is to never take the throwing path. {@link NATIVE_MODULE_NAME} is
 * looked up with `TurboModuleRegistry.get`, which performs the *identical*
 * lookup `getEnforcing` does and returns `null` instead of invoking `invariant`
 * — so on a build without the native module the `require` is simply never
 * reached. The `try`/`catch` stays as the backstop for everything else that can
 * go wrong inside the library's own initialisation.
 *
 * The one thing this does *not* rescue: the exam screens still import this
 * module, so ads simply do not appear under Expo Go. Testing the two placements
 * needs a development build. See CLAUDE.md.
 */

type AdsModule = typeof import('react-native-google-mobile-ads');

/**
 * An interstitial instance.
 *
 * Derived from the factory's return type rather than with `InstanceType`:
 * `InterstitialAd`'s constructor is `protected`, so the class object does not
 * satisfy `new (...args) => any` and `InstanceType` rejects it. The factory is
 * the only way instances are made here anyway.
 */
type Interstitial = ReturnType<AdsModule['InterstitialAd']['createForAdRequest']>;

/**
 * How long a placement will wait for an ad that is still loading.
 *
 * The design is preload-then-show, so at a transition there is normally an ad
 * already in hand and this never elapses. It covers the case where the learner
 * moves faster than the network — tapping a mode card two seconds after the tab
 * opened — where waiting a moment is the difference between an ad and no ad.
 *
 * Deliberately short. Beyond a couple of seconds a learner reads a frozen tap
 * as the app having failed, and the thing they are waiting for is an
 * advertisement.
 */
const LOAD_GRACE_MS = 2500;

/**
 * How long `show()` is given to actually put an ad on screen.
 *
 * This guard applies **only before the ad opens**. Once `OPENED` has fired the
 * ad owns the screen and the wait for `CLOSED` is unbounded, because a timeout
 * firing there would navigate the app underneath a full-screen ad the learner
 * is still looking at — they would dismiss it onto a screen that had already
 * moved on. Before `OPENED`, an SDK that never calls back is just a dead tap,
 * so it is capped.
 */
const OPEN_TIMEOUT_MS = 4000;

let moduleCache: AdsModule | null | undefined;

/**
 * The base TurboModule the library's native side registers.
 *
 * This is the exact name the first spec loaded by the package entry point asks
 * `getEnforcing` for, so its presence is what decides whether requiring the
 * package can succeed. The library registers six further modules (consent,
 * interstitial, rewarded, app-open, native, app) but they all ship in the same
 * native package, so probing one answers for all of them — and this is the one
 * whose absence produced the redbox described above.
 */
const NATIVE_MODULE_NAME = 'RNGoogleMobileAdsModule';

/** The native module, or null wherever it does not exist. Resolved once. */
function ads(): AdsModule | null {
  if (moduleCache !== undefined) return moduleCache;

  // Cached as absent up front so every early return below is already correct.
  moduleCache = null;
  try {
    // Non-throwing probe. See the note on NATIVE_MODULE_NAME: `getEnforcing`
    // would raise an Invariant Violation that LogBox reports even when it is
    // caught, which is the whole reason this check exists.
    if (TurboModuleRegistry.get(NATIVE_MODULE_NAME) == null) return null;
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    moduleCache = require('react-native-google-mobile-ads') as AdsModule;
  } catch {
    moduleCache = null;
  }
  return moduleCache;
}

/**
 * Whether ads can run here at all: native module present, platform supported.
 *
 * Exported for `consent.ts`, which needs the same guarded probe and must not
 * repeat it — a second copy is a second place for the "never take the throwing
 * path" rule above to be got wrong, and getting it wrong there produces the
 * identical launch-time redbox this file exists to have fixed. It is shared
 * within the ads feature and deliberately not re-exported from `index.ts`.
 */
export function usable(): AdsModule | null {
  if (!adsAvailable(Platform.OS)) return null;
  return ads();
}

/**
 * Ask iOS for App Tracking Transparency authorisation, once, before the SDK
 * starts.
 *
 * ## Why this is not optional
 *
 * `app.json` declares `userTrackingUsageDescription`, which injects
 * `NSUserTrackingUsageDescription` into the Info.plist. Declaring that string
 * and then never prompting is the worst of both worlds: iOS treats the IDFA as
 * denied, so every iOS impression is served non-personalised at a materially
 * lower rate, *and* the app ships a purpose string for a permission it never
 * asks for, which is the kind of inconsistency an App Review pass picks up.
 *
 * ## Ordering
 *
 * After UMP consent and before `initialize()`, which is the order Google's own
 * iOS guide sets out: the consent flow may itself present the ATT explainer
 * screen, so asking first would put the system prompt in front of the
 * explanation written for it. Initialising last means the SDK reads a settled
 * tracking status rather than one that changes underneath it — which is also
 * what `delayAppMeasurementInit` in the plugin block is for.
 *
 * ## Nothing branches on the answer
 *
 * A refusal is not a reason to skip ads; it is a reason to serve
 * non-personalised ones, which the SDK handles by itself. This resolves the
 * same way whether the user allowed, denied, or was never asked.
 *
 * Android never prompts — `requestTrackingPermissionsAsync` resolves granted
 * there — so the platform check is about avoiding pointless work rather than
 * correctness. The lazy `require` is the same rule the rest of this file
 * follows: `expo-tracking-transparency` resolves its native module with
 * `requireNativeModule` at module scope, which throws exactly like the ads
 * specs do, and this file must never be able to fail at import.
 */
async function requestTrackingPermission(): Promise<void> {
  if (Platform.OS !== 'ios') return;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const tracking = require('expo-tracking-transparency') as {
      requestTrackingPermissionsAsync: () => Promise<{ status: string }>;
    };
    await tracking.requestTrackingPermissionsAsync();
  } catch {
    // Not linked, or the prompt could not be presented. Ads still run; they
    // are simply non-personalised, which is the same outcome as a refusal.
  }
}

type Slot = {
  ad: Interstitial | null;
  /** True between `load()` and the LOADED/ERROR that answers it. */
  loading: boolean;
  /** Callers parked on the in-flight load, resolved with whether it landed. */
  waiters: ((loaded: boolean) => void)[];
};

const slots = new Map<AdPlacement, Slot>();

function slotFor(placement: AdPlacement): Slot {
  let slot = slots.get(placement);
  if (!slot) {
    slot = { ad: null, loading: false, waiters: [] };
    slots.set(placement, slot);
  }
  return slot;
}

function settleWaiters(slot: Slot, loaded: boolean): void {
  const waiting = slot.waiters;
  slot.waiters = [];
  for (const resolve of waiting) resolve(loaded);
}

/**
 * Whether the SDK has been initialised and consent permits a request.
 *
 * Requesting before `initialize()` resolves is not an error but it wastes the
 * request, so the placements simply do nothing until this flips. It starts
 * false and is set by {@link initialiseAds}.
 */
let ready = false;

/**
 * Fetch an ad for a placement, if one is not already in hand or on its way.
 *
 * Safe to call repeatedly — the `loading`/`ad` guards make extra calls free,
 * which is what lets the exam tab preload on every mount without tracking
 * whether it already has.
 */
export function preloadInterstitial(placement: AdPlacement): void {
  const mod = usable();
  if (!mod || !ready) return;

  const slot = slotFor(placement);
  if (slot.loading || slot.ad?.loaded) return;

  // Re-narrowed through the type guard rather than cast.
  //
  // `usable()` above has already established this — it returns null unless
  // `adsAvailable(Platform.OS)` passed — so this branch is unreachable today.
  // The cast it replaces was still the wrong shape: it is a claim the compiler
  // stops checking, and what it would hide is silent rather than loud. On web
  // `INTERSTITIAL_UNIT_IDS[placement]` has no matching key, so `unitId` would
  // be `undefined` and the request would go out to the SDK with no unit at
  // all. A guard costs one branch and keeps the narrowing honest if the order
  // of the checks above is ever rearranged.
  if (!adsAvailable(Platform.OS)) return;
  const unitId = resolveAdUnitId(placement, {
    isDev: __DEV__,
    platform: Platform.OS,
  });

  let ad: Interstitial;
  try {
    ad = mod.InterstitialAd.createForAdRequest(unitId);
  } catch {
    return;
  }

  slot.ad = ad;
  slot.loading = true;

  // Both listeners tear the pair down, so a slot never accumulates handlers
  // across the many loads one session performs.
  const done = (loaded: boolean) => {
    slot.loading = false;
    if (!loaded) slot.ad = null;
    settleWaiters(slot, loaded);
  };

  try {
    const offLoaded = ad.addAdEventListener(mod.AdEventType.LOADED, () => {
      offLoaded();
      offError();
      done(true);
    });
    const offError = ad.addAdEventListener(mod.AdEventType.ERROR, () => {
      offLoaded();
      offError();
      // No fill, no network, a misconfigured unit id — all the same to the
      // learner, who must never find out. The next placement will try again.
      done(false);
    });
    ad.load();
  } catch {
    done(false);
  }
}

/** Wait up to `ms` for an in-flight load, resolving false if it does not land. */
function waitForLoad(slot: Slot, ms: number): Promise<boolean> {
  if (slot.ad?.loaded) return Promise.resolve(true);
  if (!slot.loading) return Promise.resolve(false);

  return new Promise<boolean>((resolve) => {
    let settled = false;
    const finish = (loaded: boolean) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      resolve(loaded);
    };
    const timer = setTimeout(() => finish(false), ms);
    slot.waiters.push(finish);
  });
}

/**
 * When the last interstitial *closed*, or null if none has been shown.
 *
 * Written only on a real open-then-close, never when a placement was skipped
 * for want of fill — starting the cooldown on a no-fill would let a bad network
 * moment suppress the next genuine chance to show one. Measured from the close
 * rather than the open, so the gap {@link mayShowInterstitial} enforces is time
 * the learner spent in the app rather than time spent watching.
 *
 * Module state rather than storage, deliberately: this bounds how often one
 * *sitting* is interrupted, and a force-quit ends the sitting. Persisting it
 * would also make the first paper after every launch depend on when the
 * previous launch ended, which is a rule nobody could reason about. Contrast
 * the re-auth backoff in `features/auth/reauth.ts`, which is persisted for the
 * opposite reason — there, a force-quit clearing the counter is the bypass.
 */
let lastShownAt: number | null = null;

/**
 * Put a loaded ad on screen and resolve once it is gone. Never rejects.
 *
 * Resolves **true only if the ad actually opened**, which is what the caller
 * needs in order to decide whether the frequency cap should start running.
 */
function present(mod: AdsModule, slot: Slot): Promise<boolean> {
  const ad = slot.ad;
  if (!ad) return Promise.resolve(false);

  // Consumed either way: an `InterstitialAd` is single-use, so the slot is
  // cleared before showing rather than after. If anything below goes wrong the
  // placement is simply skipped and the next preload mints a fresh one.
  slot.ad = null;

  return new Promise<boolean>((resolve) => {
    let settled = false;
    let opened = false;

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      try {
        ad.removeAllListeners();
      } catch {
        // Nothing to do — we are already leaving.
      }
      resolve(opened);
    };

    // Only guards the gap before the ad appears; see OPEN_TIMEOUT_MS.
    const timer = setTimeout(() => {
      if (!opened) finish();
    }, OPEN_TIMEOUT_MS);

    try {
      ad.addAdEventListener(mod.AdEventType.OPENED, () => {
        opened = true;
        clearTimeout(timer);
      });
      ad.addAdEventListener(mod.AdEventType.CLOSED, finish);
      ad.addAdEventListener(mod.AdEventType.ERROR, finish);
      void ad.show().catch(finish);
    } catch {
      finish();
    }
  });
}

/**
 * Show the placement's interstitial, then resolve so the caller can navigate.
 *
 * The caller must navigate **unconditionally** after awaiting this — there is
 * no success/failure to branch on, by design, and a caller that only navigated
 * "if the ad showed" would strand every learner Google had no ad for.
 */
export async function showInterstitial(
  placement: AdPlacement,
  options: {
    /**
     * How long to wait for an ad that is not in hand yet. Defaults to
     * {@link LOAD_GRACE_MS}.
     *
     * The two placements want different answers, because of what is on screen
     * behind them. At `preExam` the exam home is still drawn and holding the
     * tap for a moment reads as the app working, so the grace is worth taking.
     * At `preResult` the session screen has already unmounted its question card
     * — `status` is no longer `running` — so anything spent waiting is spent on
     * a **blank screen**, and the call site passes 0 to go straight through.
     */
    waitMs?: number;
  } = {},
): Promise<void> {
  const mod = usable();
  if (!mod || !ready) return;

  const slot = slotFor(placement);

  // Checked before the load wait, not after: a capped placement must not hold
  // the learner for the grace period on an ad it has already decided to skip.
  if (!mayShowInterstitial({ lastShownAt, now: Date.now() })) {
    // Still worth warming, so the placement after the cap expires has one.
    preloadInterstitial(placement);
    return;
  }

  if (!slot.ad?.loaded) {
    // Nothing in hand. Start one so the *next* transition has an ad even if
    // this one goes without, then give the in-flight load a brief moment.
    preloadInterstitial(placement);
    const loaded = await waitForLoad(slot, options.waitMs ?? LOAD_GRACE_MS);
    if (!loaded) return;
  }

  const shown = await present(mod, slot);
  if (shown) lastShownAt = Date.now();

  // Ready the next one immediately: a learner who sits a paper usually sits
  // another, and a cold slot is the most common reason a placement goes empty.
  preloadInterstitial(placement);
}

/**
 * The single in-flight or completed initialisation, shared by every caller.
 *
 * The root layout's effect double-invokes under StrictMode, and `ready` in
 * preferences can settle more than once — without this the UMP consent form is
 * asked for twice, which on Android is a second native screen appearing over
 * the first. Handing back the *same* promise rather than returning early also
 * means a second caller waits for the real answer instead of racing ahead of an
 * SDK that has not finished starting.
 */
let initialising: Promise<void> | null = null;

/**
 * Initialise the SDK and gather consent. Resolves even when everything fails.
 *
 * Called from the root layout, and idempotent — see {@link initialising}.
 * Consent runs **before** `initialize()` because Google's UMP flow is what
 * decides whether a request may be made at all in the EEA and UK;
 * `canRequestAds` false means no ad is requested rather than a non-personalised
 * one being shown, which is what the form's "reject" option is required to
 * mean.
 *
 * The two halves are wrapped separately so a consent *failure* — an unreachable
 * consent server, a debug geography left set — still leaves a working ad path
 * rather than disabling ads outright. A refusal and a failure are different
 * answers and only the first one switches ads off.
 */
export function initialiseAds(): Promise<void> {
  initialising ??= runInitialise();
  return initialising;
}

async function runInitialise(): Promise<void> {
  const mod = usable();
  if (!mod) return;

  let mayRequest = true;
  try {
    const info = await mod.AdsConsent.gatherConsent();
    mayRequest = info.canRequestAds;
  } catch {
    // Outside the EEA/UK the form never shows and this is a no-op; a failure
    // here is a consent server problem, not a refusal, so it falls through to
    // the SDK's own default rather than silently switching ads off.
  }

  if (!mayRequest) return;

  // iOS only, and deliberately after consent but before `initialize()`. See
  // the note on requestTrackingPermission for the ordering argument.
  await requestTrackingPermission();

  try {
    await mod.default().initialize();
    ready = true;
  } catch {
    // Leaves `ready` false, so every placement stays a no-op.
    return;
  }

  /*
    Warm the first placement the app can reach.

    Initialisation finishes some way after launch — a consent round-trip plus
    the SDK's own start-up — and the exam tab's own preload runs on focus, which
    for a learner who opens the app straight into a mock has *already happened*
    by then and found `ready` false. Without this the first paper of a cold
    start reliably goes without an ad, which is the single most valuable
    impression of the session.

    Only `preExam`: `preResult` is preloaded by the session screen, which cannot
    be reached before this has run.
  */
  preloadInterstitial('preExam');
}
