/**
 * Which ad unit a placement asks for, and — the load-bearing half — whether it
 * is allowed to be a *real* one.
 *
 * This module is deliberately pure: no `react-native-google-mobile-ads` import,
 * no `Platform`, no `__DEV__`. Both of those arrive as arguments. That is what
 * makes the one rule here reachable from the test suite at all, since the
 * native module does not exist under `jest-expo` (or under Expo Go — see
 * `interstitial.ts`).
 *
 * ## The rule this exists to hold
 *
 * **A development build must never request a production ad unit.** Google
 * counts impressions and clicks from a developer poking at their own app as
 * *invalid traffic*, and the penalty is not a warning — it is the AdMob account
 * being limited or disabled, taking the app's whole revenue with it. Nothing on
 * screen distinguishes a test ad from a real one at a glance (the test creative
 * says "Test Ad" in a small banner, which is easy to miss and easy to stop
 * looking for), so this fails **silently and expensively**: the app works
 * perfectly, and the bill arrives weeks later as a suspension email.
 *
 * That is exactly the shape of failure the rest of this project puts behind a
 * pure function with a test on it — the owner boundary in `attempts.ts`, the
 * answered-only rule in `question-stats.ts`, the leak guard in `haptics.ts`.
 *
 * The rule is asserted in **both** directions in `policy.test.ts`, because only
 * one of them is visible: a dev build that showed real ads looks fine, and a
 * production build stuck on test ads looks fine too while earning nothing.
 */

/**
 * Where an interstitial is shown.
 *
 * Two, both at a transition the learner has already chosen to make — which is
 * the placement AdMob's own policy asks for, and the reason neither of these
 * interrupts a screen mid-read. `preExam` fires on the tap that starts a paper;
 * `preResult` fires once the paper is graded and before its score is revealed.
 *
 * Kept as separate units rather than one shared unit so the two can be measured
 * apart in the AdMob console — they will not perform the same, and a single
 * blended figure cannot tell you which one to drop if either annoys people.
 */
export const AD_PLACEMENTS = ['preExam', 'preResult'] as const;

export type AdPlacement = (typeof AD_PLACEMENTS)[number];

/**
 * Google's published test interstitial units.
 *
 * Hardcoded rather than read from the library's `TestIds`, so this module stays
 * importable without the native package. They are the same values — `TestIds`
 * is a plain constant table — and they are public, documented, and always
 * serve a filled test creative, which is what makes them usable as the
 * unconditional development answer below.
 *
 * @see https://developers.google.com/admob/android/test-ads
 */
export const TEST_INTERSTITIAL_UNIT_IDS = {
  android: 'ca-app-pub-3940256099942544/1033173712',
  ios: 'ca-app-pub-3940256099942544/4411468910',
} as const;

/**
 * The project's own interstitial units, per placement and platform.
 *
 * ## These are placeholders and earn nothing
 *
 * Every value below is still Google's *sample* unit. They serve a real-looking
 * test creative and generate **no revenue whatsoever**. Replace all four with
 * the units created in the AdMob console for `com.ejazty.app`, and replace the
 * two app IDs in `app.json`'s `react-native-google-mobile-ads` plugin block at
 * the same time — the app ID and the unit IDs come from the same AdMob app and
 * a mismatched pair serves nothing.
 *
 * Until they are replaced, a production build shows test ads: harmless, honest,
 * and worth zero. `policy.test.ts` deliberately does **not** assert that these
 * differ from the test units, because a test that failed until the owner
 * pasted in live credentials would be a test that gets deleted.
 */
export const INTERSTITIAL_UNIT_IDS: Record<
  AdPlacement,
  { android: string; ios: string }
> = {
  preExam: {
    android: 'ca-app-pub-3940256099942544/1033173712',
    ios: 'ca-app-pub-3940256099942544/4411468910',
  },
  preResult: {
    android: 'ca-app-pub-3940256099942544/1033173712',
    ios: 'ca-app-pub-3940256099942544/4411468910',
  },
};

/**
 * The shortest gap allowed between two interstitials actually being shown.
 *
 * Two per paper is the design and it is fine for a mock exam, where the pair
 * straddles a 3-to-15 minute sitting. The case it does not cover is **open
 * practice**, which draws the whole bank and can be finished from the question
 * navigator at any point: start it, answer one question, finish, and both
 * placements fire inside a minute. Back-to-back quick exams are the same shape
 * from the other direction — a `preResult` followed seconds later by the
 * `preExam` of the next paper.
 *
 * That pattern is what AdMob's policy on ad frequency is written about, and the
 * penalty for tripping it is the account, not the placement. A minute is a
 * deliberately unambitious floor: it costs a legitimate impression only in the
 * sitting that took under sixty seconds end to end, and in that sitting the
 * second ad is precisely the one a reviewer would object to.
 */
export const MIN_INTERSTITIAL_GAP_MS = 60_000;

/**
 * Whether enough time has passed since the last interstitial closed.
 *
 * Pure, and takes both the clock and the last stamp as arguments for the reason
 * everything else in this file does: the alternative is a rule that can only be
 * exercised by sitting two exams a minute apart on a development build.
 *
 * **A backwards clock counts as eligible.** `Date.now()` is wall time and can
 * jump — a manual change, an NTP correction, a device crossing a timezone with
 * a badly-behaved OS — which leaves a stamp sitting in the future. Answering
 * "no" there would suppress every ad until real time caught up, potentially for
 * hours. Failing open matches the contract the rest of the ads layer is built
 * to: a missed cap costs one impression's worth of politeness, a stuck cap
 * costs all of them.
 */
export function mayShowInterstitial(options: {
  /** When the previous interstitial closed, or null if none has been shown. */
  lastShownAt: number | null;
  now: number;
}): boolean {
  const { lastShownAt, now } = options;
  if (lastShownAt === null) return true;
  const elapsed = now - lastShownAt;
  if (elapsed < 0) return true;
  return elapsed >= MIN_INTERSTITIAL_GAP_MS;
}

/** The platforms that can serve an ad. Web is not one — see `adsAvailable`. */
export type AdPlatform = 'android' | 'ios';

/**
 * The unit id to request for a placement.
 *
 * `isDev` is passed rather than read from `__DEV__` so the dangerous branch is
 * testable. It maps to `__DEV__` at the one call site, which is true in Expo Go
 * and in every development build, and false in `preview` and `production` EAS
 * builds.
 *
 * Note what this means for a **`preview` build**: `__DEV__` is false there, so
 * it requests production units. Testing ads on an internal-distribution build
 * therefore needs the device registered as a test device in the AdMob console,
 * or you are generating invalid traffic against your own account. There is no
 * way to infer "this is an internal tester" from inside the app, which is why
 * that one is a console setting rather than another branch here.
 */
export function resolveAdUnitId(
  placement: AdPlacement,
  options: { isDev: boolean; platform: AdPlatform },
): string {
  if (options.isDev) return TEST_INTERSTITIAL_UNIT_IDS[options.platform];
  return INTERSTITIAL_UNIT_IDS[placement][options.platform];
}

/**
 * Whether this platform can show an ad at all.
 *
 * `npm run web` is a development convenience in this project (EAS builds iOS
 * and Android only), and the Google Mobile Ads native module has no web
 * implementation — so the seam answers "no" rather than letting a call reach a
 * module that is not there. Same shape as `persistSession: !isWeb` in
 * `lib/supabase.ts`: the web target is not supported, and it says so once in a
 * pure function instead of failing somewhere further in.
 */
export function adsAvailable(platform: string): platform is AdPlatform {
  return platform === 'android' || platform === 'ios';
}
