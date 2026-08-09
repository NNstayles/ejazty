import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { directionFor, isRTL, scriptOf, type Script } from '@/i18n';
import { usePreferences } from '@/preferences/preferences-provider';
import {
  gradients,
  palettes,
  tints,
  typographyFor,
  type ColorTokens,
  type GradientTokens,
  type TintTokens,
  type TypographyScale,
} from './tokens';

type ThemeValue = {
  /** The mode actually being rendered, after resolving `system`. */
  scheme: 'light' | 'dark';
  colors: ColorTokens;
  /**
   * Gradient stops for the active scheme.
   *
   * Alongside `colors` rather than imported, for the same reason: the dark
   * ramp is not the light one darkened — it is read from the opposite end so
   * `onPrimary` stays legible — so a component that imported `gradients`
   * directly would have to branch on the scheme itself, which is the branch
   * this provider exists to remove.
   */
  gradients: GradientTokens;
  /**
   * The four pastel card fills, each with the ink checked against it.
   *
   * Here for the same reason `gradients` is: the dark set is not the light set
   * darkened, so a component importing `tints` directly would have to branch on
   * the scheme — the branch this provider exists to remove. Always take the
   * `ink` from the same entry as the `fill`; that pairing is what makes a
   * tinted surface safe to put copy on.
   */
  tints: TintTokens;
  isDark: boolean;
  /**
   * Type scale for the active language's writing system.
   *
   * Lives here rather than being imported directly because line height is not a
   * constant: an explicit one clamps the glyphs, and Arabic script needs more
   * room than Latin or it renders clipped. Resolved once for the whole tree —
   * see `typographyFor`.
   */
  typography: TypographyScale;
  /**
   * Writing system of the active language.
   *
   * Already resolved here to pick the type scale, and exposed because it is not
   * only a typography question: anything the app *enumerates* in letters —
   * the A/B/C markers on exam choices — has to be drawn from the script the
   * reader is using, and `isRTL` is the wrong signal for that (direction and
   * script are separate properties; see `Script` in `@/i18n`).
   */
  script: Script;
  /**
   * Whether the active language reads right-to-left.
   *
   * Carried here rather than read from `I18nManager` because the native flag
   * only changes on a full relaunch — that is what made switching to Arabic
   * demand a restart before the text would align. Resolved from the language
   * instead, it is correct on the next frame.
   */
  isRTL: boolean;
  /**
   * `textAlign` for a `<Text>`: the side the language starts from.
   *
   * Reads as `'left'` in Arabic and Sorani, which is correct and not a typo.
   * React Native resolves `textAlign` on a `<Text>` against the node's inherited
   * Yoga direction and swaps left/right when that direction is RTL, so `'left'`
   * *is* the start edge in both directions. See `PARAGRAPH_ALIGN` in `@/i18n`
   * for the two source references.
   */
  paragraphAlign: 'left' | 'right';
  /**
   * `textAlign` for a `<TextInput>`, which is a different value from the one
   * above and must not be swapped for it.
   *
   * React Native attaches a layout direction to text attributes only for
   * `<Text>`, so an input receives no logical resolution and needs the physical
   * side. This is the field `Field` and the Learn search box read.
   */
  inputAlign: 'left' | 'right';
  /**
   * `writingDirection` for text runs, which is a different job from `textAlign`.
   *
   * Alignment picks the side a line sits on. Direction is what *orders* a mixed
   * run — an Arabic sentence containing a Latin word, a number, or a `%` — and
   * without it those fragments reorder wrongly inside an otherwise correct
   * line. Every `Text` and every `TextInput` in the app sets both, from here,
   * so the two can never disagree.
   */
  writingDirection: 'ltr' | 'rtl';
  /**
   * Yoga layout direction, applied once at the root of the tree.
   *
   * This is the half `textAlign` never covered. Aligning text moves the *words*
   * to the right side; it does nothing to a `flexDirection: 'row'`, so an
   * Arabic list row kept its icon on the left and its chevron on the right —
   * reading order and layout order pointing opposite ways on the same card.
   *
   * `direction` is Yoga's own property and inherits down the tree, so setting
   * it at the root mirrors every row, `flex-start`, `marginStart` and
   * `paddingStart` beneath it on the next frame. It is emphatically **not**
   * `I18nManager.forceRTL`: that is a process-wide native flag needing a
   * relaunch, which is exactly what this app removed and must not reinstate
   * (see `applyDirection`, and the test that pins it).
   */
  direction: 'ltr' | 'rtl';
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { themeMode, language } = usePreferences();
  const systemScheme = useColorScheme();

  const value = useMemo<ThemeValue>(() => {
    // `useColorScheme` can report null or 'unspecified'; anything that is not
    // explicitly dark falls back to light.
    const fromSystem: 'light' | 'dark' =
      systemScheme === 'dark' ? 'dark' : 'light';
    const scheme: 'light' | 'dark' =
      themeMode === 'system' ? fromSystem : themeMode;
    const script = scriptOf(language);
    return {
      scheme,
      colors: palettes[scheme],
      gradients: gradients[scheme],
      tints: tints[scheme],
      isDark: scheme === 'dark',
      typography: typographyFor(script),
      script,
      isRTL: isRTL(language),
      // All three from one resolver rather than three ternaries on the same
      // boolean: they are separate jobs decided by a single fact, and a screen
      // where one of them disagrees with the other two is the "almost
      // mirrored" state that reads as broken. See `directionFor`.
      ...directionFor(language),
    };
  }, [themeMode, systemScheme, language]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <AppThemeProvider>');
  }
  return ctx;
}
