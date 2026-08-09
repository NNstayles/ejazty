/**
 * Haptic feedback, wrapped so it can never break a screen.
 *
 * Every call here is fire-and-forget and swallows its own failure, for the same
 * reason `setRemindersEnabled` must never reject: the call sites are UI event
 * handlers that invoke these with `void`, so a rejection escapes as an
 * unhandled rejection with a stack pointing into the taptic engine rather than
 * anything the screen can show.
 *
 * There is more than one way for these to fail, and none of them is exotic:
 * `expo-haptics` has no web implementation, Android routes through the vibrator
 * service which a device can lack or a user can disable system-wide, and iOS
 * silently declines in Low Power Mode. Haptics are a garnish — a missing one is
 * not worth a single line of user-visible error.
 *
 * ## The vocabulary is small on purpose
 *
 * Five call sites, each meaning something different, and nothing that means
 * "buzz here because a thing happened". A pattern the user cannot distinguish
 * from the previous one is not feedback, it is vibration; and a phone that
 * taps at everything trains people to turn the setting off, which loses the
 * three taps that were actually carrying information.
 */

import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';

// Checked once rather than per tap: this is called on every answer selection.
const SUPPORTED = Platform.OS === 'ios' || Platform.OS === 'android';

/**
 * The user's preference, mirrored into module state by `PreferencesProvider`.
 *
 * A plain module variable rather than a hook, and it has to be: `selectionTap`
 * is called synchronously from event handlers deep inside the exam runner and
 * from `FloatingTabBar`, none of which are the right place to subscribe to a
 * context — and one of them is a component that must not re-render on a
 * preference change it does not otherwise care about.
 *
 * It defaults to **on**, which matters for the frames before preferences have
 * been read: the alternative is a silent first tap on every cold start, and a
 * feature that is off until proven on feels broken rather than considerate.
 */
let hapticsEnabled = true;

/** Called by `PreferencesProvider` on load and on every change. */
export function configureHaptics(enabled: boolean): void {
  hapticsEnabled = enabled;
}

/** Exposed for the tests, which have no provider to read the flag back through. */
export function hapticsAreEnabled(): boolean {
  return hapticsEnabled;
}

function fire(run: () => Promise<void>): void {
  if (!SUPPORTED || !hapticsEnabled) return;
  void run().catch(() => {});
}

/**
 * A light tick for a selection — choosing an answer, toggling an option.
 *
 * `selectionAsync`, not `impactAsync(Light)`. They feel similar in isolation and
 * are not the same thing: selection feedback is the platform's own idiom for a
 * value changing under the finger (`UISelectionFeedbackGenerator` on iOS,
 * `CLOCK_TICK` on Android), it is tuned to survive being fired repeatedly as a
 * user moves through options, and an impact is a *collision* — heavier than a
 * tab change warrants and heavier than the rest of the OS uses for one.
 */
export function selectionTap(): void {
  fire(() => Haptics.selectionAsync());
}

/**
 * The tap that lands with an answer in the exam runner.
 *
 * **`revealing` is not a style choice — it is the whole rule.** Only `open`
 * practice shows whether the answer was right as it lands; in a timed mock the
 * result is deliberately withheld until submission, and that is what makes the
 * score mean anything. A haptic that distinguished correct from wrong would
 * hand the answer back through the learner's fingers on every question of every
 * graded paper, turning a mock into an open-book exercise — and it would do so
 * silently, since nothing on screen would have changed.
 *
 * So the distinction is *only* drawn where the screen has already drawn it. In
 * a revealing mode it earns its keep: the learner can drill without watching
 * the card, which is exactly how the mode is used.
 */
export function answerFeedback(revealing: boolean, correct: boolean): void {
  if (!revealing) {
    selectionTap();
    return;
  }
  fire(() =>
    correct
      ? Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      : // `Warning`, not `Error`. Error is reserved for a failed paper, and a
        // full failure pattern on every wrong answer of a two-hundred-question
        // practice run is a scolding rather than information.
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning),
  );
}

/**
 * The thump that lands with a graded result.
 *
 * `Success` and `Error` rather than a plain impact: they are distinct patterns,
 * so a learner who has felt both once can tell a pass from a fail before the
 * number has finished counting up.
 */
export function resultFeedback(passed: boolean): void {
  fire(() =>
    Haptics.notificationAsync(
      passed
        ? Haptics.NotificationFeedbackType.Success
        : Haptics.NotificationFeedbackType.Error,
    ),
  );
}

/**
 * The daily goal being met.
 *
 * The one unprompted haptic in the app — every other one answers a touch. It is
 * warranted because the moment is genuinely invisible otherwise: the ring is on
 * the Learn tab and the learner is looking at an exam question when it fills.
 * It fires once per day, on the crossing, for the same reason the streak
 * increments there and not on every answer past it.
 */
export function goalReachedFeedback(): void {
  fire(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success));
}

/**
 * A heavier knock in front of something irreversible — signing out, quitting a
 * running attempt, deleting an account.
 *
 * Deliberately unlike `selectionTap`: these are the presses where feeling the
 * difference between "I chose a theme" and "I ended my attempt" is worth
 * something, and they are rare enough that a heavier pattern does not become
 * background noise.
 */
export function warningFeedback(): void {
  fire(() => Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning));
}
