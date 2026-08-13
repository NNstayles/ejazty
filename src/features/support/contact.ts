/**
 * The way a learner reaches a human.
 *
 * ## Why this exists at all
 *
 * The address was already published — at the foot of the privacy policy, which
 * is a document someone opens once and never again. So in practice the app had
 * no route for the two things it most needs to hear about.
 *
 * The first is content. The Arabic question bank is verbatim from the ministry
 * publication, but **the English and Sorani are unreviewed translations** (see
 * CLAUDE.md), and there are ~470 records of them. A learner reading in Kurdish
 * is the only person positioned to notice that a rendering is wrong, and until
 * now the app gave them nowhere to say so. The second is everything a device
 * does that a test cannot reach — the whole class of failure this project keeps
 * writing pure modules to bound.
 *
 * ## Why the address lives here
 *
 * It used to be a named constant in *three* files — the privacy screen, the
 * page generator, and nothing to hold them together but a comment asking the
 * reader to keep them in step. That is the same pair-that-drifts argument the
 * generator itself is built on, applied one level down and left unresolved.
 * One exported constant, imported by all three, removes the drift rather than
 * documenting it.
 *
 * It stays a constant rather than a locale string for the reason the privacy
 * screen already gave: it is the same in every language, and a contact address
 * that differed between translations would be worse than none.
 */

/**
 * The published support address.
 *
 * Must match the address given on both store listings. Imported by
 * `(tabs)/settings/privacy.tsx` and by `i18n/privacy-html.test.ts`, which is
 * what keeps the screen, the hosted pages and this route on one value.
 */
export const SUPPORT_EMAIL = 'nazarnawras1@gmail.com';

/**
 * What the app knows about itself, and nothing about who is using it.
 *
 * Deliberately four fields. A report saying "the app crashed" is not actionable
 * and a learner cannot be expected to know their OS version, so *some* context
 * has to travel with it — but this is a project that went to the trouble of
 * writing out what it never collects, so the set stays to what is needed to
 * reproduce a fault: no user id, no email, no score, nothing from an attempt.
 *
 * The user sees all of it before sending, under a separator, in a draft they
 * can edit or delete. That is the point of composing a mail rather than posting
 * a report.
 */
export type SupportContext = {
  /** App version, from the manifest. */
  version: string;
  /** `ios` | `android` | `web`. */
  platform: string;
  /** OS version, as the platform reports it. */
  osVersion: string;
  /** The language the app is being read in. */
  language: string;
};

/**
 * Builds the `mailto:` URL for a support draft.
 *
 * ## The rule this is tested for
 *
 * **Every interpolated value is percent-encoded.** A `mailto:` is a URL, so its
 * query is delimited by `&` and `=` — and the body is free text the learner
 * writes, in three scripts, with newlines in it. Unencoded, a body containing
 * `&` is *silently truncated* at that character, and a newline either breaks
 * the URL or is dropped. Both failures produce a mail that opens perfectly and
 * arrives missing the half that mattered, which is exactly the shape of defect
 * this codebase writes pure modules to catch.
 *
 * Arabic and Kurdish make it non-optional rather than merely careful: those
 * scripts are entirely outside the URL character set, so an unencoded subject
 * is not a truncation risk but a guaranteed one.
 *
 * `encodeURIComponent` is the right primitive here — it encodes `&`, `=`, `?`,
 * `#`, `/` and every non-ASCII codepoint, and leaves only characters a mail
 * client is happy to receive literally.
 *
 * @param subject Localised subject line, already carrying the app name.
 * @param intro Localised sentence introducing the diagnostic block.
 * @param context What to append under the separator.
 */
export function supportMailto(
  subject: string,
  intro: string,
  context: SupportContext,
): string {
  /*
    The blank lines at the top are the draft's cursor position: the learner
    should land in an empty space to type into, not on top of the diagnostics.
    The separator is what tells them where their own message ends.
  */
  const body = [
    '',
    '',
    '---',
    intro,
    `App: ${context.version}`,
    `Platform: ${context.platform} ${context.osVersion}`,
    `Language: ${context.language}`,
  ].join('\n');

  const query = `subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  return `mailto:${SUPPORT_EMAIL}?${query}`;
}
