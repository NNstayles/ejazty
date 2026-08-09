/**
 * Ejazty design tokens.
 *
 * Two semantic palettes (light / dark) sharing one token shape, so every screen
 * can read `colors.x` without branching on the active mode.
 */

import { Platform, type TextStyle } from 'react-native';

import type { Script } from '@/i18n';

/**
 * Raw brand ramp — the single source of colour for the whole app.
 *
 * Every accent, tile, badge and icon resolves to a step on this ramp, to one of
 * the neutrals derived from it, or to a `tints` entry below. The exceptions are
 * deliberate and are documented where they live: `success`/`danger`/`warning`
 * still carry their conventional hues, because they encode *meaning* a learner
 * is being taught (a wrong answer, a red dashboard lamp) rather than decoration.
 *
 * ## The ramp is a soft violet, and the step that moved is not 600 alone
 *
 * This was an electric indigo (`600` at `#312afd`, hue ~242°, near-maximum
 * chroma). It is now a softer violet centred on `#6C5CE7` — the reference
 * design's own primary — which is a small hue shift and a large *chroma* one.
 * That is the whole difference between the old palette and this one: the pastel
 * card tints below only read as a system when the accent they sit beside is in
 * the same register.
 *
 * **The luminance profile was preserved on purpose, and one gradient moved to
 * keep it.** `600` carries `onPrimary` white at **4.86:1** — through AA, but
 * down from the old 7.29 — and `500` is only 3.43, which is *not* enough for
 * body copy. So the light `brand` gradient now runs **600→800** rather than the
 * old 500→700; both ends clear AA (4.86 and 8.39), and the ramp keeps a light
 * end for tints and washes where nothing is read on top. If a future accent
 * reaches for `500` as a text background, that is the number to check first.
 */
export const brand = {
  50: '#F5F3FF',
  100: '#EDE9FE',
  200: '#DED8FD',
  300: '#C4B5FD',
  400: '#A78BFA',
  500: '#8B79F2',
  600: '#6C5CE7',
  700: '#5A48D6',
  800: '#4A39B0',
  900: '#3B2E8C',
  950: '#251E5C',
} as const;

export type ColorTokens = {
  /** Screen background. */
  background: string;
  /** Raised surface: cards, list rows, sheets. */
  surface: string;
  /** Surface one step above `surface` (nested cards, pressed states). */
  surfaceAlt: string;
  /** Hairline dividers and card outlines. */
  border: string;
  /** Primary body copy. */
  text: string;
  /** Supporting copy, captions, metadata. */
  textMuted: string;
  /** Disabled / placeholder copy. */
  textFaint: string;
  /** Brand action colour. */
  primary: string;
  /** Pressed/active brand colour. */
  primaryPressed: string;
  /** Tinted brand background for chips and soft callouts. */
  primarySoft: string;
  /** Copy that sits on top of `primary`. */
  onPrimary: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  /** Neutral informational accent (section tiles, provenance notices). */
  info: string;
  infoSoft: string;
  /**
   * Dark backing plate for artwork drawn as a light glyph on black — the
   * dashboard tell-tales.
   *
   * Identical in both schemes on purpose: it is a property of the *artwork*,
   * not of the theme, so a light-mode plate would make the glyphs vanish.
   */
  artworkPlate: string;
  /**
   * The floating tab bar's own plate, and the copy that sits on it.
   *
   * A near-black bar in *both* schemes, which is the one place this palette
   * stops tracking the theme. That is taken from the reference design and it is
   * load-bearing rather than stylistic: the bar floats over scrolling content,
   * so it needs to separate from whatever is passing underneath it, and a
   * surface-coloured bar over a surface-coloured card separates from nothing.
   * It lifts slightly in dark mode so it does not merge into the background.
   */
  tabBar: string;
  /** Inactive glyph and label on `tabBar`. Active ones use `onPrimary`. */
  tabBarMuted: string;
  /** Shadow colour (iOS) — Android uses elevation. */
  shadow: string;
};

/**
 * Neutrals are tinted toward the brand hue rather than being pure greys.
 *
 * A true-neutral grey next to a saturated indigo reads as two unrelated
 * systems; carrying a little of the hue through the backgrounds, borders and
 * body copy is most of what separates an expensive-looking surface from a
 * default one. `text` is a near-black indigo, not `#111`, for the same reason.
 */
export const palettes: Record<'light' | 'dark', ColorTokens> = {
  light: {
    background: '#F4F3FA',
    surface: '#FFFFFF',
    surfaceAlt: '#F0EFF8',
    border: '#E5E3F1',
    text: '#16142B',
    textMuted: '#5D5980',
    textFaint: '#9793B4',
    primary: brand[600],
    primaryPressed: brand[700],
    primarySoft: brand[50],
    onPrimary: '#FFFFFF',
    success: '#0B9C6C',
    successSoft: '#E6F7F0',
    danger: '#D92D4E',
    dangerSoft: '#FDEBEF',
    warning: '#B4761C',
    warningSoft: '#FBF3E4',
    // `info` is the brand itself. It used to be an unrelated blue, which put a
    // second cool hue a few degrees off the primary into the same screens —
    // the single most obvious thing making the palette look accidental.
    info: brand[600],
    infoSoft: brand[50],
    artworkPlate: '#0A0918',
    tabBar: '#211F2E',
    tabBarMuted: '#8F8BA8',
    // A brand-tinted shadow rather than a neutral one: black shadows over a
    // tinted background read as grey haze.
    shadow: brand[950],
  },
  dark: {
    background: '#0A0918',
    surface: '#141227',
    surfaceAlt: '#1D1A36',
    border: '#2B2749',
    text: '#F3F1FA',
    textMuted: '#A6A2C6',
    textFaint: '#726E95',
    // The 600 that carries the light theme is far too dark to sit on a dark
    // surface, so the ramp is read from the other end.
    primary: brand[400],
    primaryPressed: brand[300],
    primarySoft: '#221E42',
    onPrimary: brand[950],
    success: '#34C98D',
    successSoft: '#0C2E22',
    danger: '#F0708E',
    dangerSoft: '#331824',
    warning: '#E0B04A',
    warningSoft: '#2E2614',
    info: brand[300],
    infoSoft: '#1C1846',
    artworkPlate: '#0A0918',
    // Lifted off the background rather than matching the light theme's plate:
    // `#211F2E` on `#0A0918` would read as a bar that had lost its edges.
    tabBar: '#221F38',
    tabBarMuted: '#8F8BAE',
    shadow: '#000000',
  },
};

/** The four pastel card fills. */
export type TintName = 'lavender' | 'periwinkle' | 'blush' | 'mint';

export type TintTokens = Record<
  TintName,
  {
    /** The card's fill. */
    fill: string;
    /** Copy and glyphs drawn on that fill. Clears 4.5:1 against it in both schemes. */
    ink: string;
  }
>;

/**
 * Pastel card tints.
 *
 * ## This is a deliberate widening of the one-palette rule, not a drift out of it
 *
 * The rule used to read "do not introduce a colour that is not on the ramp",
 * and it was the right rule for what the app was then: tiles that ran four
 * unrelated hues, two of them sharing `danger`, so colour identified nothing the
 * glyph did not. What replaced it was a monochrome brand tile, which is
 * disciplined and also flat — a screen of eight identical indigo squares.
 *
 * These four are the middle answer, and three properties keep them a system
 * rather than a return to the old mess:
 *
 * - **They are card *fills*, never accents, glyph colours or text colours.** A
 *   tint is a surface an entire card sits on. `primary` is still the only
 *   colour an action is drawn in, so nothing here competes for "this is the
 *   thing to press".
 * - **They carry their own ink.** A tinted surface changes the contrast every
 *   piece of copy on it is read against, which is exactly why `Card`'s accent
 *   is a 3pt rule rather than a tinted background. Pairing each fill with a
 *   checked ink is what makes a tinted card safe: every pair below clears 4.5:1
 *   in its own scheme (light 6.8 / 7.2 / 5.5 / 5.4, dark 8.9–9.2).
 * - **The set is closed and named.** Four entries, assigned to sections from one
 *   table. A fifth means editing this file and checking a contrast ratio, which
 *   is the friction that stopped the old palette accumulating hues.
 *
 * Dark mode is not the light fills darkened: at these lightnesses that produces
 * mud. Each is a deep, low-chroma version of the same hue carrying light ink,
 * the same reversal `gradients` documents below.
 */
export const tints: Record<'light' | 'dark', TintTokens> = {
  light: {
    lavender: { fill: '#EBE5FB', ink: brand[800] },
    periwinkle: { fill: '#DFE3FB', ink: '#2F3E9E' },
    blush: { fill: '#FBE3EC', ink: '#A43159' },
    mint: { fill: '#DDEFE5', ink: '#1D6B4C' },
  },
  dark: {
    lavender: { fill: '#221E42', ink: '#C9BEFB' },
    periwinkle: { fill: '#1C2145', ink: '#B9C3FA' },
    blush: { fill: '#3A1E2C', ink: '#F5B8CD' },
    mint: { fill: '#14322A', ink: '#92DFBB' },
  },
};

/**
 * Gradient stops, by scheme.
 *
 * ## Why these are tokens rather than inline arrays
 *
 * A gradient is two or three colour decisions at once, which is exactly the
 * kind of thing that drifts when it is written at the call site — one screen
 * ends up running 600→500 and the next 700→500, and nobody notices because
 * neither looks wrong alone. Every stop below is a step on `brand` or a
 * semantic token already in the palette, so the whole gradient system is the
 * same palette seen at an angle.
 *
 * ## The zero-alpha stops are load-bearing
 *
 * The `…Wash` gradients fade into the screen background, and the fade stop is
 * written as **the background colour at zero alpha** (`#F7F8FC00`) rather than
 * as `transparent`. They are not interchangeable: `transparent` is
 * `#00000000`, and a gradient interpolating toward it interpolates toward
 * *black* in the colour channels as well as in alpha — which on Android
 * produces a visible grey-to-black bruise through the middle of the fade. A
 * background-coloured stop at zero alpha interpolates only in alpha, which is
 * what a fade is supposed to be. **Do not simplify these to `transparent`.**
 *
 * ## Contrast is checked at both stops, not just the average
 *
 * `brand` carries `onPrimary` copy along its whole length, so both ends have to
 * clear it. In dark mode that is what keeps the ramp read from the *light* end
 * (300→400, carrying near-black `onPrimary`) instead of mirroring the light
 * theme's 500→700, which would have put near-black text on a mid indigo at
 * roughly 2.7:1.
 */
export type GradientTokens = {
  /** Primary actions and brand chips. Copy on top is `onPrimary`. */
  brand: readonly [string, string];
  /** Full-bleed brand plate for hero headers. Copy on top is always light. */
  brandDeep: readonly [string, string, string];
  /** Brand wash fading into the background, behind a screen's hero block. */
  heroWash: readonly [string, string];
  /** Pass and fail washes, for the graded-result surface. */
  successWash: readonly [string, string];
  dangerWash: readonly [string, string];
  /**
   * A near-invisible sheen across a raised card, so a large flat fill reads as
   * a lit surface rather than as absence.
   *
   * **Both stops are the same colour at different alphas, and they have to be.**
   * A stop interpolating toward `transparent` takes its colour channels toward
   * black as well as its alpha, which Android renders as a grey bruise through
   * the fade — the same rule the `…Wash` tokens follow. Keeping one colour and
   * moving only the alpha means the only thing that changes across the sweep is
   * how much of it there is.
   *
   * Being translucent rather than opaque is also what lets this sit on a card
   * whose fill the caller has replaced: the Learn grid draws its tiles on
   * `tints`, and an opaque `surface → surfaceAlt` sheen would paint the tint
   * out.
   *
   * The two schemes run in opposite directions for one reason — the light is
   * always above. In light mode that means shading the bottom of the card with
   * the shadow neutral; in dark mode a shadow on a near-black card is invisible,
   * so the same story is told by lifting the top with white.
   */
  sheen: readonly [string, string];
  /**
   * Ambient light behind every screen, fading out well down the page.
   *
   * Distinct from the `…Wash` tokens and much weaker. A wash is opt-in and says
   * *this screen opens something* — putting one everywhere turns it into
   * wallpaper. This is the opposite job: it is never noticed on its own, and it
   * exists so a screen has a light source rather than being uniformly lit from
   * nowhere. The detail screens carry no wash at all, and were the flattest
   * surfaces in the app before this existed.
   */
  bloom: readonly [string, string];
  /**
   * The hero card's fill: lavender into blush.
   *
   * The one gradient that crosses hues, and the reference design's signature
   * surface. Nothing is read on it at body size — the hero card draws its own
   * copy on an opaque inner panel — so this pair is chosen for the sweep rather
   * than for contrast, which is why it is a *card fill* token and not something
   * `Button` may reach for.
   */
  tintHero: readonly [string, string];
};

export const gradients: Record<'light' | 'dark', GradientTokens> = {
  light: {
    // 600→800, not the old 500→700. The ramp softened (see `brand`), and `500`
    // now carries white at only 3.43:1 — under AA for the `onPrimary` copy this
    // gradient exists to sit behind. Both stops here clear it: 4.86 and 8.39.
    brand: [brand[600], brand[800]],
    brandDeep: [brand[800], brand[700], brand[600]],
    heroWash: [brand[100], '#F4F3FA00'],
    successWash: ['#E6F7F0', '#F4F3FA00'],
    dangerWash: ['#FDEBEF', '#F4F3FA00'],
    // The light is above, so a card in this scheme is shaded toward its foot
    // with the shadow neutral rather than lit at its head. 7% of `brand[950]`
    // over white is about one step of the neutral ramp — the same amount the
    // opaque `surface → surfaceAlt` version carried, without painting over a
    // tinted fill.
    sheen: ['#251E5C00', '#251E5C12'],
    bloom: ['#EBE7FA', '#F4F3FA00'],
    tintHero: ['#E9E2FB', '#FBE3EC'],
  },
  dark: {
    // Read from the light end of the ramp, not mirrored from the light theme —
    // `onPrimary` is near-black in this scheme. See the note above.
    brand: [brand[300], brand[400]],
    brandDeep: [brand[900], brand[800], brand[700]],
    heroWash: ['#221E42', '#0A091800'],
    successWash: ['#0C2E22', '#0A091800'],
    dangerWash: ['#331824', '#0A091800'],
    // Reversed, and not because dark is light upside down. The light is still
    // above — but a shadow laid on a near-black card is invisible, so the same
    // fact is stated by lifting the head of the card with white instead.
    sheen: ['#FFFFFF0D', '#FFFFFF00'],
    bloom: ['#171338', '#0A091800'],
    tintHero: ['#221E42', '#3A1E2C'],
  },
};

/** 4pt spacing scale. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

/**
 * Corner radii, tightened one step from the original scale.
 *
 * Heavily rounded corners read as friendly and consumer-grade; drawing them
 * back toward the square is most of what reads as "considered" without
 * changing a single colour. Not squared off entirely — `pill` stays for
 * genuine pills (badges, count chips), where a soft rectangle would just look
 * like a mistake.
 */
export const radius = {
  sm: 6,
  md: 10,
  lg: 13,
  xl: 20,
  pill: 999,
} as const;

/**
 * Display faces, by writing system.
 *
 * The headline scale is a serif; body copy stays on the system sans, which is
 * the usual pairing and keeps long study lists legible at 13–16pt.
 *
 * **There are two families because there has to be.** Playfair Display carries
 * no Arabic glyphs at all, and `display`/`title`/`heading` are not decorative
 * here — sign titles in the Learn list render at `heading`. Setting one Latin
 * face globally would drop every Arabic and Sorani headline to an undefined
 * fallback: tofu on Android, a silent substitution on iOS. Noto Naskh Arabic is
 * the serif counterpart and covers the extended Perso-Arabic letters Sorani
 * needs (ڕ ڵ ۆ ێ گ چ پ ژ).
 *
 * The weight is baked into the family name, so these variants set
 * `fontWeight: 'normal'`. Naming a weighted family *and* a numeric weight makes
 * Android look for a bold cut of a family that is already the bold cut, and it
 * either synthesises a smeared double-bold or drops back to the default face.
 */
const displayFace = {
  latin: { bold: 'PlayfairDisplay_700Bold', semi: 'PlayfairDisplay_600SemiBold' },
  arabic: { bold: 'NotoNaskhArabic_700Bold', semi: 'NotoNaskhArabic_600SemiBold' },
} as const;

/**
 * Minimum leading for the Latin serif, as a multiple of font size.
 *
 * Read from the shipped font rather than guessed: Playfair Display declares an
 * ascent + descent + gap of **1.333em**, where the system sans this scale was
 * built for sits near 1.2. Since `lineHeight` is a clamp (see below), keeping
 * the old numbers would have clipped every English headline the moment the
 * serif was switched on — `display` was at 1.19, `title` 1.25, `heading` 1.32,
 * all under the new box.
 */
const LATIN_SERIF_LEADING = 1.34;

export const typography = {
  display: {
    fontSize: 32,
    lineHeight: Math.ceil(32 * LATIN_SERIF_LEADING),
    fontWeight: 'normal',
    fontFamily: displayFace.latin.bold,
  },
  title: {
    fontSize: 24,
    lineHeight: Math.ceil(24 * LATIN_SERIF_LEADING),
    fontWeight: 'normal',
    fontFamily: displayFace.latin.bold,
  },
  heading: {
    fontSize: 19,
    lineHeight: Math.ceil(19 * LATIN_SERIF_LEADING),
    fontWeight: 'normal',
    fontFamily: displayFace.latin.semi,
  },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: '700' },
} as const;

export type TypographyVariant = keyof typeof typography;

/**
 * `fontWeight` is taken from `TextStyle` rather than widened to `string`: the
 * literals in `typography` are what make it assignable to a React Native style,
 * and a `string` here would fail at every call site.
 */
export type TypographyScale = Record<
  TypographyVariant,
  {
    fontSize: number;
    lineHeight: number;
    fontWeight: TextStyle['fontWeight'];
    /** Absent on body variants, which stay on the system sans. */
    fontFamily?: string;
  }
>;

/** The Latin display faces, as a union, so the map below cannot miss one. */
type LatinFace = (typeof displayFace.latin)[keyof typeof displayFace.latin];

/**
 * Latin display face → its Arabic-script counterpart at the same weight.
 *
 * Typed as a total `Record` deliberately: adding a third Latin display face
 * without giving it an Arabic equivalent is then a compile error rather than a
 * headline that renders as tofu in two of the app's three languages.
 */
const arabicFace: Record<LatinFace, string> = {
  [displayFace.latin.bold]: displayFace.arabic.bold,
  [displayFace.latin.semi]: displayFace.arabic.semi,
};

/**
 * Minimum leading for Arabic-script text, as a multiple of font size.
 *
 * ## Why this is not a taste setting
 *
 * An explicit `lineHeight` is a *clamp*, not a hint. On Android React Native
 * applies it through `CustomLineHeightSpan`, which rewrites the font's ascent
 * and descent to fit the number given; iOS does the equivalent through the
 * paragraph style. When a script's natural line box is taller than that number,
 * the glyphs are **cut off** rather than the box growing to fit.
 *
 * Latin sits near 1.2x, so the scale above (body is 1.5x) has room to spare.
 * Arabic does not: the base letters already run taller, and harakat — the
 * fathatan in `نظرًا`, the kasra and shadda in `التخطِّي` — stack *above* them,
 * pushing the natural ascent to roughly 1.75x. Under a 1.5x clamp the tops of
 * those lines were sliced off, which is precisely how this was found: two signs
 * whose Arabic text carries harakat rendered clipped in the Learn list while the
 * same records were fine in English and Kurdish.
 *
 * Sorani is covered too, and deliberately. It is the same script with the same
 * metrics; it escaped only because none of its shipped strings happen to use
 * harakat, which is luck rather than safety. Narrowing this to Arabic alone
 * would leave the identical bug armed for the next Kurdish string that does.
 *
 * Re-checked when the headline serif was introduced: Noto Naskh Arabic declares
 * an ascent + descent + gap of **1.703em**, so this floor already clears the new
 * face and did not need moving. Read it out of the shipped `.ttf` again — not
 * off a specimen page — if the family is ever swapped.
 */
const ARABIC_LEADING = 1.75;

function scaleForArabic(): TypographyScale {
  const out = {} as TypographyScale;
  for (const key of Object.keys(typography) as TypographyVariant[]) {
    // Widened to the scale's element type: the `as const` literals give each
    // variant its own shape, and the body ones have no `fontFamily` key at all,
    // so the raw union cannot be read from uniformly.
    const base: TypographyScale[TypographyVariant] = typography[key];
    out[key] = {
      ...base,
      // Swap the headline face for the one that can actually draw the script.
      // Body variants carry no family and keep the system sans.
      fontFamily: base.fontFamily
        ? arabicFace[base.fontFamily as LatinFace]
        : undefined,
      // `max`, not a flat multiply: the point is a floor under the clamp, so a
      // variant already given generous leading keeps exactly what it was given.
      //
      // `ceil`, not `round`: rounding is free to go *down* — `heading` is 19pt,
      // and `round(19 * 1.75)` is 33 against a floor of 33.25, which would clamp
      // fractionally under the natural box and clip exactly the glyphs this
      // exists to protect. A floor that rounds below itself is not a floor.
      lineHeight: Math.max(
        base.lineHeight,
        Math.ceil(base.fontSize * ARABIC_LEADING),
      ),
    };
  }
  return out;
}

// Built once at module load. There are two scales for the life of the process,
// and the long study lists render a hundred `Text` nodes at a time — rebuilding
// per render would hand React Native a fresh style identity for every one.
const SCALES: Record<Script, TypographyScale> = {
  latin: typography as TypographyScale,
  arabic: scaleForArabic(),
};

/**
 * The type scale for a writing system.
 *
 * Read it from `useTheme()` rather than calling this directly — the theme
 * provider already knows the active language and resolves it once for the whole
 * tree.
 */
export function typographyFor(script: Script): TypographyScale {
  return SCALES[script];
}

const elevationCache = new Map<string, object>();

/**
 * Card elevation. iOS gets a soft shadow, Android uses the native elevation
 * channel, web falls back to a box-shadow.
 *
 * Results are cached because `Card` calls this on every render and the long
 * study lists mount a hundred cards at a time: a fresh object per card per
 * render is both needless allocation and a new style identity for React Native
 * to diff. There are only two shadow colours and two levels, so the cache is
 * four entries at most.
 */
export const elevation = (color: string, level: 1 | 2 | 3 = 1): object => {
  const key = `${color}:${level}`;
  const cached = elevationCache.get(key);
  if (cached) return cached;

  // Indexed by level rather than nested ternaries: three levels was the point
  // at which the conditional form stopped being readable, and a table makes the
  // ramp between levels something you can see rather than trace.
  const ios = {
    1: { opacity: 0.06, radius: 8, offset: 2 },
    2: { opacity: 0.12, radius: 16, offset: 6 },
    // Level 3 is for something genuinely lifted off the page — a primary
    // action, a floating tab pill. It is a big jump on purpose: an elevation
    // scale whose steps are hard to tell apart is three ways of saying one
    // thing.
    3: { opacity: 0.2, radius: 24, offset: 10 },
  }[level];
  const androidElevation = { 1: 2, 2: 6, 3: 12 }[level];
  const web = {
    1: `0 2px 8px ${color}14`,
    2: `0 6px 16px ${color}1F`,
    3: `0 10px 24px ${color}33`,
  }[level];

  const style = Platform.select({
    ios: {
      shadowColor: color,
      shadowOpacity: ios.opacity,
      shadowRadius: ios.radius,
      shadowOffset: { width: 0, height: ios.offset },
    },
    android: { elevation: androidElevation },
    default: { boxShadow: web },
  }) as object;

  elevationCache.set(key, style);
  return style;
};
