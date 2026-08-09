/**
 * The answer markers on a question card.
 *
 * Worth a suite rather than being obvious-by-inspection for one reason: the
 * table is coupled to `MAX_CHOICES_PER_QUESTION`, and that coupling is
 * invisible. Raising the schema bound to five is a one-line change in a
 * different file that would leave every fifth option labelled `5` in a list of
 * letters, and nothing else in the project would notice.
 */

import type { Script } from '@/i18n';
import {
  CHOICE_MARKERS,
  choiceMarker,
  MAX_CHOICES_PER_QUESTION,
} from './choice-markers';

const SCRIPTS: Script[] = ['latin', 'arabic'];

describe('choiceMarker', () => {
  it('covers every choice a question is allowed to carry', () => {
    // The coupling this suite exists for. If `MAX_CHOICES_PER_QUESTION` moves,
    // this fails and names the file to extend.
    for (const script of SCRIPTS) {
      expect(CHOICE_MARKERS[script].length).toBeGreaterThanOrEqual(
        MAX_CHOICES_PER_QUESTION,
      );
    }
  });

  it('labels an Arabic paper with the abjad sequence, not with A B C', () => {
    // The bug this replaced: `String.fromCharCode(65 + position)`, which put
    // Latin letters inside an Arabic question card on an otherwise fully
    // localised screen.
    expect(choiceMarker('arabic', 0)).toBe('أ');
    expect(choiceMarker('arabic', 1)).toBe('ب');
    expect(choiceMarker('arabic', 2)).toBe('ج');
  });

  it('leaves the Latin paper on A B C', () => {
    expect(choiceMarker('latin', 0)).toBe('A');
    expect(choiceMarker('latin', 1)).toBe('B');
    expect(choiceMarker('latin', 2)).toBe('C');
  });

  it('gives each option a distinct marker', () => {
    // Two options sharing a letter makes a question ambiguous to talk about and
    // is the kind of typo that survives review in a script the reviewer does
    // not read.
    for (const script of SCRIPTS) {
      const used = CHOICE_MARKERS[script].slice(0, MAX_CHOICES_PER_QUESTION);
      expect(new Set(used).size).toBe(used.length);
    }
  });

  it('falls back to the ordinal past the end of the table', () => {
    // Unreachable while the schema holds, which is the point: if it ever is
    // reached, a card reading `5` is a far better way to find out than a card
    // with a blank circle where the marker should be.
    for (const script of SCRIPTS) {
      expect(choiceMarker(script, 9)).toBe('10');
    }
  });
});
