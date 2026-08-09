import { Platform } from 'react-native';

import { adsAvailable, resolveAdUnitId, type AdPlacement } from './policy';

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
 * ## Why the module is required lazily
 *
 * `react-native-google-mobile-ads` is a native module and **does not exist in
 * Expo Go**, which is the workflow the SDK 54 pin in CLAUDE.md exists to
 * preserve. A static import would throw at bundle-evaluation time and take the
 * whole app down on launch, turning "ads do not work in Expo Go" into "the app
 * does not start in Expo Go". A guarded `require` caches the failure once and
 * every entry point below degrades to a no-op.
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

/** The native module, or null wherever it does not exist. Resolved once. */
function ads(): AdsModule | null {
  if (moduleCache !== undefined) return moduleCache;
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    moduleCache = require('react-native-google-mobile-ads') as AdsModule;
  } catch {
    moduleCache = null;
  }
  return moduleCache;
}

/** Whether ads can run here at all: native module present, platform supported. */
function usable(): AdsModule | null {
  if (!adsAvailable(Platform.OS)) return null;
  return ads();
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

  const platform = Platform.OS as 'android' | 'ios';
  const unitId = resolveAdUnitId(placement, { isDev: __DEV__, platform });

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

/** Put a loaded ad on screen and resolve once it is gone. Never rejects. */
function present(mod: AdsModule, slot: Slot): Promise<void> {
  const ad = slot.ad;
  if (!ad) return Promise.resolve();

  // Consumed either way: an `InterstitialAd` is single-use, so the slot is
  // cleared before showing rather than after. If anything below goes wrong the
  // placement is simply skipped and the next preload mints a fresh one.
  slot.ad = null;

  return new Promise<void>((resolve) => {
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
      resolve();
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

  if (!slot.ad?.loaded) {
    // Nothing in hand. Start one so the *next* transition has an ad even if
    // this one goes without, then give the in-flight load a brief moment.
    preloadInterstitial(placement);
    const loaded = await waitForLoad(slot, options.waitMs ?? LOAD_GRACE_MS);
    if (!loaded) return;
  }

  await present(mod, slot);

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
