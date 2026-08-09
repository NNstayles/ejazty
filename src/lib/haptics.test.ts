/**
 * Tests for the haptics wrapper.
 *
 * Two rules here are worth a native mock, and both are invisible in the way
 * this project cares about:
 *
 *  - **`answerFeedback` must not distinguish correct from wrong outside a
 *    revealing mode.** A timed mock withholds the result until submission —
 *    that withholding is what makes the score mean anything — and a haptic
 *    that told the learner's fingers what the screen would not turns every
 *    graded paper into an open-book exercise. Nothing on screen changes, so
 *    the only way to notice by hand is to sit a mock, on a device, paying
 *    attention to a vibration you are not expecting to be informative.
 *  - **Nothing fires while the preference is off.** A settings switch that
 *    silently does nothing is the classic version of this bug, and the reverse
 *    — a switch that turns the feature off and leaves one call site tapping —
 *    is worse, because the user concludes the app ignores them.
 *
 * The assertions are about *which* pattern reaches the native module, not about
 * a call sequence: the patterns are the vocabulary, and two call sites playing
 * the same one is the failure mode the vocabulary exists to prevent.
 */

import * as Haptics from 'expo-haptics';

import {
  answerFeedback,
  configureHaptics,
  goalReachedFeedback,
  resultFeedback,
  selectionTap,
  warningFeedback,
} from './haptics';

jest.mock('expo-haptics', () => ({
  selectionAsync: jest.fn(() => Promise.resolve()),
  impactAsync: jest.fn(() => Promise.resolve()),
  notificationAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: 'light', Medium: 'medium', Heavy: 'heavy' },
  NotificationFeedbackType: {
    Success: 'success',
    Warning: 'warning',
    Error: 'error',
  },
}));

const selectionAsync = Haptics.selectionAsync as jest.Mock;
const impactAsync = Haptics.impactAsync as jest.Mock;
const notificationAsync = Haptics.notificationAsync as jest.Mock;

/** Every native call made since the last reset, as `pattern` strings. */
function played(): string[] {
  return [
    ...selectionAsync.mock.calls.map(() => 'selection'),
    ...impactAsync.mock.calls.map((c: unknown[]) => `impact:${String(c[0])}`),
    ...notificationAsync.mock.calls.map((c: unknown[]) => `notify:${String(c[0])}`),
  ];
}

beforeEach(() => {
  jest.clearAllMocks();
  configureHaptics(true);
});

describe('the vocabulary', () => {
  /*
    Selection feedback is the platform's own idiom for a value changing under
    the finger, and it is not interchangeable with a light impact: an impact is
    a collision, it is heavier than a tab change warrants, and it is not tuned
    to be fired repeatedly as someone moves through a list of options.
  */
  it('uses selection feedback for a selection', () => {
    selectionTap();
    expect(played()).toEqual(['selection']);
  });

  it('tells a pass from a fail', () => {
    resultFeedback(true);
    expect(played()).toEqual(['notify:success']);

    jest.clearAllMocks();
    resultFeedback(false);
    expect(played()).toEqual(['notify:error']);
  });

  it('marks the goal being met', () => {
    goalReachedFeedback();
    expect(played()).toEqual(['notify:success']);
  });

  // Not `selectionTap`: the whole point of the heavier pattern is that ending
  // an attempt does not feel like choosing a theme.
  it('knocks harder in front of something irreversible', () => {
    warningFeedback();
    expect(played()).not.toEqual(['selection']);
    expect(played()).toEqual(['notify:warning']);
  });
});

describe('answerFeedback', () => {
  /*
    The load-bearing pair. In a revealing mode the screen has already said
    whether the answer was right, so the haptic may too — and it earns its keep,
    because it lets someone drill without watching the card.
  */
  it('distinguishes correct from wrong where the answer is revealed', () => {
    answerFeedback(true, true);
    const right = played();

    jest.clearAllMocks();
    answerFeedback(true, false);
    const wrong = played();

    expect(right).not.toEqual(wrong);
    expect(right).toEqual(['impact:light']);
    expect(wrong).toEqual(['notify:warning']);
  });

  /*
    And the half that matters. A timed mock withholds the result on purpose;
    a haptic that leaked it would hand the answer back on every question of
    every graded paper, silently.

    Asserted as identity between the two branches rather than against a
    specific pattern, because *any* difference is the bug — a version that gave
    a slightly heavier tap for a wrong answer would pass a test that only
    checked "selection was used" while still leaking.
  */
  it('gives nothing away in a mode that does not reveal the answer', () => {
    answerFeedback(false, true);
    const right = played();

    jest.clearAllMocks();
    answerFeedback(false, false);
    const wrong = played();

    expect(right).toEqual(wrong);
    expect(right).toEqual(['selection']);
  });
});

describe('the preference', () => {
  /*
    Mutation-checked in both directions by construction: a `fire` that ignored
    the flag fails the first, and one that never fired fails every test above.
  */
  it('silences every pattern when haptics are off', () => {
    configureHaptics(false);

    selectionTap();
    answerFeedback(true, true);
    answerFeedback(true, false);
    answerFeedback(false, true);
    resultFeedback(true);
    resultFeedback(false);
    goalReachedFeedback();
    warningFeedback();

    expect(played()).toEqual([]);
  });

  it('comes back on', () => {
    configureHaptics(false);
    selectionTap();
    configureHaptics(true);
    selectionTap();

    expect(played()).toEqual(['selection']);
  });
});
