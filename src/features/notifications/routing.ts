/**
 * Where a tapped reminder should take the reader.
 *
 * ## Why this is a module rather than three lines in the listener
 *
 * Same reason `features/auth/recovery.ts` is one: the value being read comes
 * from *outside the app* and cannot be trusted to have the shape it should.
 * A notification payload survives across builds — a reminder queued three days
 * ago by a previous version is still sitting in the OS queue — and on Android
 * any app may post to a channel, so `data.destination` is an arbitrary value
 * arriving from elsewhere that is about to be handed to the router.
 *
 * Feeding that straight into `router.navigate` is how a tap ends up on a route
 * that does not exist (expo-router throws on an unmatched href) or, worse, on
 * one the reader has no business reaching. Validating against the known set is
 * the whole job, and it is the half that is worth a test: the listener around
 * it is React wiring with no rule in it, while *this* has a rule and no way to
 * reach it by hand — a stale payload only appears on an upgrade over a queue
 * that was already scheduled.
 *
 * It is pure and imports nothing from expo-notifications or expo-router, so the
 * tests need neither a native module nor a navigator.
 */

import { isImmersiveRoute } from '@/features/navigation/tabs';
import {
  REMINDER_DESTINATIONS,
  type ReminderDestination,
} from './messages';

/** The destinations this app will act on. Derived, so the two cannot drift. */
const VALID_DESTINATIONS = new Set<string>(Object.values(REMINDER_DESTINATIONS));

/**
 * The shape we care about, structurally.
 *
 * Typed against the payload rather than against expo-notifications' response
 * class on purpose — every field is optional because every one of them is
 * absent in some real case, and stating that here is what forces the checks
 * below to exist.
 */
export type NotificationLike = {
  request?: {
    content?: {
      data?: unknown;
    } | null;
  } | null;
} | null;

/**
 * Reads a validated destination out of a notification, or null.
 *
 * Null means "open the app and change nothing", which is the correct answer for
 * every unrecognised case: a notification this build did not schedule, one whose
 * payload names a route that has since been removed, or no notification at all.
 * Navigating somewhere arbitrary would be worse than the behaviour this
 * replaced.
 */
export function destinationFrom(notification: NotificationLike): ReminderDestination | null {
  const data = notification?.request?.content?.data;
  if (typeof data !== 'object' || data === null) return null;

  const destination = (data as Record<string, unknown>).destination;
  if (typeof destination !== 'string') return null;

  return VALID_DESTINATIONS.has(destination)
    ? (destination as ReminderDestination)
    : null;
}

/**
 * Whether a reminder tap may navigate away from `pathname`.
 *
 * Delegates to `isImmersiveRoute` rather than keeping its own list, because the
 * tab-swipe gesture needs the identical rule and for the identical reason: the
 * exam session and result screens own the whole display and have no tab bar,
 * deliberately, because leaving a running attempt by any route that skips the
 * quit confirmation abandons it — the provider above keeps counting down and
 * auto-submits it into the history as a failure. A notification tap and a
 * sideways swipe are both exactly such a route, and both are ones the learner
 * did not choose. Two copies of that list would drift, and the copy that fell
 * behind would silently start discarding papers.
 */
export function mayNavigateFrom(pathname: string): boolean {
  return !isImmersiveRoute(pathname);
}
