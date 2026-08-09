/**
 * The reminder-tap rule.
 *
 * Both halves fail *open* when they break, which is what earns the tests: a
 * `destinationFrom` that stopped validating would still return the right answer
 * for every notification this build schedules — the payloads are correct — and
 * would only misbehave on the one input nobody can produce by hand, a
 * notification queued by a previous build and tapped after an upgrade. A
 * `mayNavigateFrom` that always said yes would look identical everywhere except
 * mid-attempt, where it silently throws away a paper the learner is twenty
 * questions into.
 */

import {
  REMINDER_DESTINATIONS,
  REMINDER_MESSAGE_IDS,
} from './messages';
import { destinationFrom, mayNavigateFrom } from './routing';

/** Builds the shape expo-notifications hands the listener. */
function notification(data: unknown) {
  return { request: { content: { data } } };
}

describe('destinationFrom', () => {
  it('reads the destination a reminder was scheduled with', () => {
    expect(destinationFrom(notification({ destination: '/exam' }))).toBe('/exam');
    expect(destinationFrom(notification({ destination: '/learn' }))).toBe('/learn');
  });

  it('accepts every destination the message table can produce', () => {
    // The table is what schedules the payload, so anything it names must be
    // something this reads back. Deriving one from the other in the source is
    // what makes that true; this is the check that it stayed true.
    for (const id of REMINDER_MESSAGE_IDS) {
      const scheduled = REMINDER_DESTINATIONS[id];
      expect(destinationFrom(notification({ destination: scheduled }))).toBe(scheduled);
    }
  });

  it('refuses a route this build does not know', () => {
    // The case that actually happens: a reminder sits in the OS queue for up to
    // three days, so a tap can be handled by a build in which that route has
    // been renamed or removed. expo-router throws on an unmatched href, so
    // forwarding this unchecked turns a stale notification into a crash.
    expect(destinationFrom(notification({ destination: '/settings/account' }))).toBeNull();
    expect(destinationFrom(notification({ destination: '/exam/session' }))).toBeNull();
    expect(destinationFrom(notification({ destination: 'https://example.com' }))).toBeNull();
  });

  it('returns null for a payload with nothing usable in it', () => {
    expect(destinationFrom(null)).toBeNull();
    expect(destinationFrom({})).toBeNull();
    expect(destinationFrom({ request: null })).toBeNull();
    expect(destinationFrom({ request: { content: null } })).toBeNull();
    expect(destinationFrom(notification(undefined))).toBeNull();
    expect(destinationFrom(notification({}))).toBeNull();
  });

  it('refuses a destination that is not a string', () => {
    // Android lets any app post to a channel, so the payload is not necessarily
    // one this app wrote. A non-string reaching the router is a crash.
    expect(destinationFrom(notification({ destination: 42 }))).toBeNull();
    expect(destinationFrom(notification({ destination: null }))).toBeNull();
    expect(destinationFrom(notification({ destination: ['/exam'] }))).toBeNull();
    expect(destinationFrom(notification({ destination: { toString: () => '/exam' } }))).toBeNull();
  });
});

describe('mayNavigateFrom', () => {
  it('allows a tap from anywhere ordinary', () => {
    expect(mayNavigateFrom('/learn')).toBe(true);
    expect(mayNavigateFrom('/exam')).toBe(true);
    expect(mayNavigateFrom('/learn/signs')).toBe(true);
    expect(mayNavigateFrom('/settings')).toBe(true);
    expect(mayNavigateFrom('/settings/account')).toBe(true);
  });

  it('refuses to leave a running attempt', () => {
    // The load-bearing one. Leaving the session by any route that skips the
    // quit confirmation abandons the attempt: the provider outlives the screen,
    // keeps counting down, and auto-submits it into the history as a failure.
    expect(mayNavigateFrom('/exam/session')).toBe(false);
  });

  it('refuses to leave the result screen', () => {
    // Less severe — the attempt is already graded — but the result is the only
    // place the review of it exists, and a tap that replaced it would leave the
    // learner no way back to the paper they just sat.
    expect(mayNavigateFrom('/exam/result')).toBe(false);
  });

  it('does not confuse the exam home with the screens under it', () => {
    // `/exam` is a prefix of `/exam/session`, so a rule written the other way
    // round would block every tap from the exam tab — the destination most
    // reminders name.
    expect(mayNavigateFrom('/exam')).toBe(true);
  });
});
