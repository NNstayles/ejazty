import type { SourceRef } from '../../schema';

/**
 * Dashboard tell-tales.
 *
 * PROVENANCE — READ BEFORE TRUSTING THE LABEL BELOW. The Iraqi theory manual
 * does not cover dashboard lights at all; this section comes from the published
 * car-symbol reference named in `document`/`url`. It is published under
 * `authority: 'federal-moi'` by an explicit product decision (2026-08-03), so
 * the Learn screen stops badging it UNOFFICIAL — not because ministry material
 * for it exists. The document and URL are left intact so the real origin stays
 * recoverable. This bundle exports no questions, so `examPool()` cannot draw on
 * it whatever the authority says.
 *
 * Where the source text was plainly wrong — it repeats the engine-coolant
 * description for the transmission-temperature lamp, and describes the
 * "airbag deactivated" lamp as a rear-spoiler fault — the entry has been
 * corrected against the symbol itself rather than transcribed.
 *
 * NOTE ON ARTWORK: the icons in `assets/dashboard/` carry GoFar's wordmark and
 * remain their property. They are used by written permission granted on
 * 2026-08-08 — see `LICENSE-gofar.md` at the repo root, which is also where the
 * rule against cropping the wordmark lives. This supersedes the instruction
 * that used to sit here to replace them with original artwork before release.
 */
export const DASHBOARD_GUIDE: SourceRef = {
  // Labelled official by product decision; see the provenance note above.
  authority: 'federal-moi',
  document: 'Car Dashboard Warning Lights & Symbols Guide',
  url: 'https://www.gofar.co/car-dashboard-warning-lights/',
};
