/**
 * The letters that label the answer options on a question card.
 *
 * ## Why this is not `String.fromCharCode(65 + position)`
 *
 * That is what it used to be, and it put a hard-coded Latin `A` `B` `C` inside
 * an Arabic question card — the same class of thing as a chevron that keeps
 * pointing right after the row it sits in has mirrored. Everything around the
 * marker had been localised and the one glyph that enumerates the answers had
 * not. Arabic and Sorani enumerate with the abjad sequence أ ب ج د, which is
 * what a learner meets on the real paper.
 *
 * ## Keyed by script, not by language
 *
 * Sorani is a different language from Arabic and shares its alphabet, so the
 * property that actually decides the answer is the writing system. Keying by
 * language would mean restating the same four letters for every Perso-Arabic
 * language added later, and getting one of them wrong.
 *
 * The `Record` is total over `Script`, so adding a writing system without
 * giving it markers is a compile error rather than a card full of blanks.
 */

import { MAX_CHOICES_PER_QUESTION } from '@/content/schema';
import type { Script } from '@/i18n';

export const CHOICE_MARKERS: Record<Script, readonly string[]> = {
  latin: ['A', 'B', 'C', 'D'],
  arabic: ['أ', 'ب', 'ج', 'د'],
};

/**
 * The marker for the option at `position`, counting from zero.
 *
 * Falls back to the ordinal rather than to nothing. A question carrying more
 * choices than the table covers is already a schema violation
 * (`MAX_CHOICES_PER_QUESTION`), but an unanswerable card with a blank marker is
 * a worse way to find that out than a card reading `5`.
 */
export function choiceMarker(script: Script, position: number): string {
  return CHOICE_MARKERS[script][position] ?? `${position + 1}`;
}

/** Re-exported so the coupling to the schema bound is greppable from here. */
export { MAX_CHOICES_PER_QUESTION };
