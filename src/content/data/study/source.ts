import type { SourceRef } from '../../schema';
import { EXAM_GUIDE, SIGNS_MANUAL } from '../official/source';

/**
 * Provenance for the Learn tab's study notes.
 *
 * A note is a *condensation*, not a transcription: the ministry's question bank
 * asks the same fact from several directions — sixteen penalty questions answer
 * "a fine", nine right-of-way questions answer one ordering rule — and a note
 * states that fact once. So the Arabic here is written rather than verbatim,
 * even where every figure in it is the publication's own.
 *
 * Two source refs, and the difference between them matters:
 *
 * - **`FROM_EXAM_GUIDE`** — every fact in the note comes from the ministry
 *   question bank. The `locator` names the questions it was condensed from, so
 *   the note stays checkable against the page it came from.
 * - **`FROM_SIGNS_MANUAL`** — the same, for notes drawn from the traffic-signs
 *   manual rather than the question bank.
 * - **`GENERAL_PRACTICE`** — material the ministry publications do not cover.
 *   PROVENANCE: this is NOT from a government publication. It is published
 *   under `authority: 'federal-moi'` by the same explicit product decision
 *   (2026-08-03) that covers `data/general/` and `data/dashboard/`, so the
 *   Learn screen does not badge it UNOFFICIAL — not because a ministry source
 *   was located for it. The `document` string is left truthful so the real
 *   origin stays recoverable from the code. Anyone verifying a record carrying
 *   this ref against the manual should expect not to find it.
 */
export const FROM_EXAM_GUIDE: SourceRef = EXAM_GUIDE;

export const FROM_SIGNS_MANUAL: SourceRef = SIGNS_MANUAL;

export const GENERAL_PRACTICE: SourceRef = {
  // Labelled official by product decision; see the provenance note above. The
  // document string deliberately still names what this material actually is.
  authority: 'federal-moi',
  document: 'Common international road-traffic practice',
};

/**
 * First-aid material.
 *
 * PROVENANCE: the ministry bank carries exactly three first-aid questions
 * (burns, battery acid, and treating casualties where they lie). Everything
 * else in that section is standard first-aid practice, added on request so the
 * section is worth opening. Same product decision as `GENERAL_PRACTICE` above,
 * and the same caution: the label is a display decision, the `document` string
 * is the truth.
 *
 * Nothing here is medical advice tuned to a particular injury, and it must not
 * grow into that. It is the small set of things a driver is expected to know at
 * the roadside, which is what the theory test asks about.
 */
export const FIRST_AID_PRACTICE: SourceRef = {
  authority: 'federal-moi',
  document: 'Standard roadside first-aid practice',
};
