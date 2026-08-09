/**
 * Line height is a clamp, not a hint.
 *
 * React Native applies an explicit `lineHeight` by rewriting the font's ascent
 * and descent to fit it — `CustomLineHeightSpan` on Android, the paragraph
 * style on iOS. A script whose natural line box is taller than the number given
 * does not get a taller box; its glyphs get **cut off**.
 *
 * Latin sits near 1.2x and had room under the shipped scale. Arabic does not:
 * harakat stack above the base letters and push the natural ascent to roughly
 * 1.75x, so under `body`'s 1.5x the tops of those lines were sliced. It reached
 * a user as two signs whose Arabic meaning rendered clipped in the Learn list
 * while the same records were fine in English and Kurdish — `sign-flammable-load`
 * (fathatan, in `نظرًا`) and `sign-crossroads-ahead` (kasra + shadda, in
 * `التخطِّي`).
 *
 * None of this is visible from a test that only renders Latin, and none of it is
 * visible to a reviewer reading a diff that lowers a line height by two points.
 * Hence the floor is asserted here rather than trusted to review.
 */

import { applyDirection, isRTL, scriptOf, type LanguageCode } from '@/i18n';
import { I18nManager } from 'react-native';
import {
  typography,
  typographyFor,
  type TypographyVariant,
} from './tokens';

const VARIANTS = Object.keys(typography) as TypographyVariant[];

/** The measured natural ascent+descent of Arabic script carrying harakat. */
const ARABIC_MINIMUM = 1.75;

describe('typographyFor', () => {
  it('gives every Arabic variant room for harakat', () => {
    const scale = typographyFor('arabic');

    for (const variant of VARIANTS) {
      const { fontSize, lineHeight } = scale[variant];
      expect({
        variant,
        ratio: Number((lineHeight / fontSize).toFixed(3)),
      }).toEqual({
        variant,
        ratio: expect.any(Number),
      });
      // The assertion that matters: no variant may clamp below the natural box.
      expect(lineHeight).toBeGreaterThanOrEqual(fontSize * ARABIC_MINIMUM);
    }
  });

  it('leaves the Latin scale exactly as designed', () => {
    // The fix must not redesign English. If this fails, the Arabic floor has
    // leaked into the base scale.
    expect(typographyFor('latin')).toEqual(typography);
  });

  it('covers every variant, so a new one cannot ship unscaled', () => {
    expect(Object.keys(typographyFor('arabic')).sort()).toEqual(
      [...VARIANTS].sort(),
    );
  });

  it('never shrinks a variant that was already generous', () => {
    const latin = typographyFor('latin');
    const arabic = typographyFor('arabic');
    for (const variant of VARIANTS) {
      expect(arabic[variant].lineHeight).toBeGreaterThanOrEqual(
        latin[variant].lineHeight,
      );
      // Only leading changes — size and weight are the design's, not ours.
      expect(arabic[variant].fontSize).toBe(latin[variant].fontSize);
      expect(arabic[variant].fontWeight).toBe(latin[variant].fontWeight);
    }
  });
});

/**
 * The headline serif, and the two ways it breaks silently.
 *
 * Playfair Display carries no Arabic glyphs. `heading` is not decorative here —
 * sign titles in the Learn list render at it — so a Latin face reaching the
 * Arabic scale turns every sign title into tofu on Android and an undeclared
 * substitution on iOS, in two of the app's three languages. Nothing in an
 * English-only render shows it.
 *
 * The leading floor is the same clamp bug as the Arabic one above, arriving
 * from the Latin side for the first time: the scale was built for a system sans
 * sitting near 1.2em, and Playfair declares 1.333em. Both numbers below were
 * read out of the shipped `.ttf` (`head.unitsPerEm`, `hhea` ascent/descent/gap),
 * not off a specimen.
 */
describe('display serif', () => {
  /** Playfair Display's declared ascent + descent + line gap, in ems. */
  const PLAYFAIR_BOX = 1.333;
  /** Noto Naskh Arabic's, for comparison against the Arabic floor. */
  const NOTO_NASKH_BOX = 1.703;

  const latin = typographyFor('latin');
  const arabic = typographyFor('arabic');
  const serifVariants = VARIANTS.filter((v) => latin[v].fontFamily);

  it('puts a serif on the headline variants and nothing else', () => {
    // Body copy stays on the system sans: a serif at 13pt in a hundred-row
    // study list is a legibility cost, not a luxury one.
    expect(serifVariants.sort()).toEqual(['display', 'heading', 'title']);
    for (const variant of ['body', 'bodyStrong', 'caption', 'overline'] as const) {
      expect(latin[variant].fontFamily).toBeUndefined();
      expect(arabic[variant].fontFamily).toBeUndefined();
    }
  });

  it('never lets a Latin face reach the Arabic scale', () => {
    // The tofu regression. If a display face is added to `typography` without an
    // entry in `arabicFace`, this is what says so.
    for (const variant of serifVariants) {
      expect(arabic[variant].fontFamily).toBeDefined();
      expect(arabic[variant].fontFamily).not.toBe(latin[variant].fontFamily);
      expect(arabic[variant].fontFamily).not.toMatch(/Playfair/);
      expect(latin[variant].fontFamily).not.toMatch(/Naskh/);
    }
  });

  it('gives every Latin serif variant room for its own line box', () => {
    for (const variant of serifVariants) {
      const { fontSize, lineHeight } = latin[variant];
      expect(lineHeight).toBeGreaterThanOrEqual(fontSize * PLAYFAIR_BOX);
    }
  });

  it('keeps the Arabic floor above the naskh face it now carries', () => {
    // 1.75 was measured against the system Arabic font. It still clears Noto
    // Naskh's 1.703 box, which is why introducing the serif did not move it —
    // if the family is ever swapped for a taller one, this fails first.
    expect(ARABIC_MINIMUM).toBeGreaterThanOrEqual(NOTO_NASKH_BOX);
    for (const variant of serifVariants) {
      const { fontSize, lineHeight } = arabic[variant];
      expect(lineHeight).toBeGreaterThanOrEqual(fontSize * NOTO_NASKH_BOX);
    }
  });

  it('states no numeric weight alongside a weighted family', () => {
    // `PlayfairDisplay_700Bold` is already the bold cut. Naming a weight too
    // makes Android hunt for a bold-of-a-bold and either synthesise a smeared
    // face or fall back to the default one.
    for (const variant of serifVariants) {
      expect(latin[variant].fontWeight).toBe('normal');
      expect(arabic[variant].fontWeight).toBe('normal');
    }
  });
});

describe('scriptOf', () => {
  it.each<[LanguageCode, string]>([
    ['en', 'latin'],
    ['ar', 'arabic'],
    // Sorani is Perso-Arabic. It renders correctly today only because none of
    // its shipped strings use harakat, which is luck rather than safety — if
    // this ever returns 'latin', the next Kurdish string that does will clip.
    ['ckb', 'arabic'],
  ])('maps %s to %s', (code, script) => {
    expect(scriptOf(code)).toBe(script);
  });

  it('resolves a script for every language the picker offers', () => {
    // A language added to LANGUAGES without a script would fall through to the
    // Latin scale and clip silently.
    const codes: LanguageCode[] = ['en', 'ar', 'ckb'];
    for (const code of codes) {
      expect(['latin', 'arabic']).toContain(scriptOf(code));
    }
  });
});

/**
 * Direction is applied per render, not per launch.
 *
 * It used to ride on `I18nManager.forceRTL`, which is process-wide and only
 * lands on a full relaunch — so switching to Arabic put up a "restart the app"
 * notice and left the text left-aligned until you did. The theme resolves
 * direction from the active language instead, which is what lets the notice go
 * away honestly rather than just being hidden.
 */
describe('direction', () => {
  it.each<[LanguageCode, boolean]>([
    ['en', false],
    ['ar', true],
    ['ckb', true],
  ])('reports %s as rtl=%s', (code, rtl) => {
    expect(isRTL(code)).toBe(rtl);
  });

  it('never turns on the native RTL flag, whatever the language', () => {
    // The regression this guards: reinstating `forceRTL` re-introduces a
    // direction that only takes effect on relaunch, so the app would once again
    // draw one direction while the native flag claimed another — and the
    // restart notice this replaced is gone, so nothing would say so.
    const force = jest.spyOn(I18nManager, 'forceRTL').mockImplementation(() => {});
    const allow = jest.spyOn(I18nManager, 'allowRTL').mockImplementation(() => {});
    try {
      for (const code of ['en', 'ar', 'ckb'] as LanguageCode[]) {
        applyDirection(code);
      }
      expect(allow).toHaveBeenCalledWith(false);
      expect(force).not.toHaveBeenCalledWith(true);
    } finally {
      force.mockRestore();
      allow.mockRestore();
    }
  });

  it('returns nothing, so no caller can revive a restart prompt', () => {
    expect(applyDirection('ar')).toBeUndefined();
  });
});
