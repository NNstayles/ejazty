/**
 * The app's advertising surface, in one place.
 *
 * Two interstitials, both at a transition the learner chose to make: one on the
 * tap that starts a paper, one after it is graded and before the score is
 * revealed. Everything about how they behave when they fail — which is often,
 * since fill is never 100% — lives in `interstitial.ts`, and the rule about
 * which ad unit a build is allowed to request lives in `policy.ts`.
 *
 * Screens import from here rather than from either file directly, the same way
 * they read content only through `content/registry.ts`.
 */
export { AD_PLACEMENTS, type AdPlacement } from './policy';
export {
  initialiseAds,
  preloadInterstitial,
  showInterstitial,
} from './interstitial';
