/**
 * The direction rules, which are the ones nobody can see going wrong.
 *
 * This project has no renderer tests, and every failure pinned here is
 * invisible until someone opens the app in Arabic and looks at it — which is
 * exactly how the app shipped with a header that stayed left-to-right over a
 * screen that had mirrored. Making the resolution a pure function
 * (`directionFor`) is what lets it be asserted at all.
 *
 * The rule these tests exist to protect is not "Arabic is right-to-left" — that
 * one is obvious and nobody breaks it. It is that the **properties stay in
 * step**. They do four different jobs (`direction` moves the boxes,
 * `paragraphAlign` picks the side of a `<Text>`, `inputAlign` does the same for
 * a `<TextInput>`, `writingDirection` orders a mixed run), and a screen where
 * one of them disagrees with the rest is the "almost mirrored" state that reads
 * as broken rather than as unfinished.
 *
 * The alignment pair is two fields rather than one because React Native
 * resolves them differently — logically for a `<Text>`, physically for an input
 * — and a single value serving both is how the app shipped with its search box
 * correctly on the right and every paragraph beside it hard against the left.
 */

import {
  directionFor,
  isRTL,
  LANGUAGES,
  scriptOf,
  type LanguageCode,
} from './index';

const ALL: LanguageCode[] = ['en', 'ar', 'ckb'];

describe('directionFor', () => {
  it.each<[LanguageCode, 'ltr' | 'rtl']>([
    ['en', 'ltr'],
    ['ar', 'rtl'],
    // Sorani is written in a Perso-Arabic alphabet and reads right to left. It
    // is a separate entry rather than a fallthrough because it is a separate
    // language, and a table that only knew about Arabic would leave every
    // Kurdish screen unmirrored.
    ['ckb', 'rtl'],
  ])('resolves %s as %s', (code, direction) => {
    expect(directionFor(code).direction).toBe(direction);
  });

  it('keeps direction and writing direction in step for every language', () => {
    // The original invariant. Each of these used to be derived separately at
    // its own call site — `Text` computed `writingDirection` from the
    // alignment, the provider computed `direction` from `isRTL` — and the
    // failure mode is never a total absence of mirroring, it is one property
    // lagging: rows that flip while paragraphs stay left-aligned, or aligned
    // text whose numbers and Latin words come out in the wrong order.
    for (const code of ALL) {
      const { direction, writingDirection } = directionFor(code);
      const rtl = isRTL(code);

      expect(direction).toBe(rtl ? 'rtl' : 'ltr');
      expect(writingDirection).toBe(rtl ? 'rtl' : 'ltr');
      // Stated as its own assertion rather than implied by the two above: this
      // is the sentence the rule is actually about.
      expect(writingDirection).toBe(direction);
    }
  });

  it('aligns a paragraph from the start edge in every language', () => {
    /*
      The one rule here that looks wrong and is not, so it is asserted with the
      reason attached rather than left to be "fixed" by the next reader.

      React Native resolves `textAlign` on a `<Text>` against the node's
      inherited Yoga direction and swaps left/right when that direction is RTL —
      iOS in `RCTAttributedTextUtils.mm`, Android in
      `ReactBaseTextShadowNode.getTextAlign()`. This app sets `direction: 'rtl'`
      once at the root, so the swap runs on every `<Text>` in Arabic and Sorani,
      and `'left'` is what reaches the screen as the right edge.

      Pinning it as a constant across all three languages is the point: making
      this track the language is precisely the regression — it renders every
      paragraph in the app against the *left* edge of a correctly mirrored
      screen, which is how this was shipped.
    */
    for (const code of ALL) {
      expect(directionFor(code).paragraphAlign).toBe('left');
    }
  });

  it('gives a text input the physical side, not the logical one', () => {
    /*
      The mirror image, and the assertion that makes the pair above safe to
      read. A `<TextInput>` gets none of that resolution: React Native attaches
      a layout direction to text attributes only in `ParagraphShadowNode`, which
      backs `<Text>`, and in none of the TextInput shadow nodes. So an input
      handed the paragraph value would really align left in Arabic, putting the
      caret and the placeholder on the wrong end of the box.

      Both directions are asserted. Collapsing this to the paragraph constant is
      the mutation that matters, and only the RTL half would catch it.
    */
    expect(directionFor('en').inputAlign).toBe('left');
    expect(directionFor('ar').inputAlign).toBe('right');
    expect(directionFor('ckb').inputAlign).toBe('right');
  });

  it('disagrees with itself exactly when the language is right-to-left', () => {
    // The relationship between the two, stated once. They are the same value in
    // English and opposite values in Arabic and Sorani, and a change that made
    // them agree everywhere would break one of the two screens they serve
    // without touching the other — which is the state this whole file exists to
    // keep the app out of.
    for (const code of ALL) {
      const { paragraphAlign, inputAlign } = directionFor(code);
      expect(paragraphAlign === inputAlign).toBe(!isRTL(code));
    }
  });

  it('resolves a direction for every language the picker offers', () => {
    // A language added to `LANGUAGES` without reaching this resolver would fall
    // through `describeLanguage` to English and draw left-to-right — silently,
    // because nothing throws and the screen still renders.
    for (const entry of LANGUAGES) {
      const resolved = directionFor(entry.code);
      expect(resolved.direction).toBe(entry.isRTL ? 'rtl' : 'ltr');
    }
  });

  it('does not conflate direction with script', () => {
    // The two line up for all three languages shipped today, which is precisely
    // why it is worth pinning that they are read from different fields. They
    // are different questions — direction decides mirroring, script decides
    // font metrics and the answer markers on an exam card — and a future
    // language separates them (Persian is RTL and Perso-Arabic; Maltese is LTR
    // and Latin; Urdu in Roman script would be Latin and LTR).
    expect(scriptOf('en')).toBe('latin');
    expect(scriptOf('ar')).toBe('arabic');
    expect(scriptOf('ckb')).toBe('arabic');
  });
});
