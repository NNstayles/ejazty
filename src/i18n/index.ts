// `use` is aliased away from a `use*` name so it is not mistaken for a hook.
import i18n, { changeLanguage, use as registerPlugin } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import { getLocales } from 'expo-localization';

import ar from './locales/ar';
import ckb from './locales/ckb';
import en from './locales/en';

export type LanguageCode = 'en' | 'ar' | 'ckb';

/**
 * Writing system, which is a separate question from direction.
 *
 * It happens to line up with `isRTL` for the three languages shipped today, but
 * the two are not the same property and must not be conflated: direction decides
 * layout mirroring, script decides *font metrics* — how much vertical room a
 * line of text actually needs. See `typographyFor` in `theme/tokens.ts`.
 */
export type Script = 'latin' | 'arabic';

export type LanguageDescriptor = {
  code: LanguageCode;
  /** Endonym — always rendered in its own script, never translated. */
  nativeName: string;
  englishName: string;
  isRTL: boolean;
  script: Script;
};

export const LANGUAGES: readonly LanguageDescriptor[] = [
  {
    code: 'en',
    nativeName: 'English',
    englishName: 'English',
    isRTL: false,
    script: 'latin',
  },
  {
    code: 'ar',
    nativeName: 'العربية',
    englishName: 'Arabic',
    isRTL: true,
    script: 'arabic',
  },
  {
    code: 'ckb',
    nativeName: 'کوردیی ناوەندی',
    englishName: 'Kurdish (Sorani)',
    isRTL: true,
    // Sorani is written in a Perso-Arabic alphabet, so it carries the same font
    // metrics as Arabic even though it does not use harakat.
    script: 'arabic',
  },
] as const;

export function describeLanguage(code: LanguageCode): LanguageDescriptor {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function isRTL(code: LanguageCode): boolean {
  return describeLanguage(code).isRTL;
}

/** Writing system for a language. Drives line height, not layout direction. */
export function scriptOf(code: LanguageCode): Script {
  return describeLanguage(code).script;
}

/**
 * Everything about a language that a style needs in order to point the right
 * way, resolved in one place.
 *
 * ## Why these three travel together
 *
 * They are three different jobs, they are all decided by the same fact, and
 * getting them out of step is what produces a screen that is *almost* mirrored
 * — which reads as broken in a way that being wholly unmirrored does not.
 *
 * - **`direction`** is Yoga's own property. Set once at the root of the tree
 *   (`app/_layout.tsx`) it inherits down and mirrors every `flexDirection:
 *   'row'`, `flex-start`, `marginStart` and `paddingStart` beneath it. This is
 *   what moves the *boxes*.
 * - **`paragraphAlign`** picks the side a line of text sits on inside its box.
 *   Yoga does not do this: mirroring a row does nothing to the paragraph inside
 *   it. It is a `<Text>` value only, and it is *logical* — see the note on
 *   `PARAGRAPH_ALIGN` for why it reads as `left` in Arabic.
 * - **`inputAlign`** is the same job for a `<TextInput>`, and it is a separate
 *   field because React Native resolves the two differently: `<Text>` gets the
 *   logical treatment, an input gets none. One value serving both is what left
 *   the search box correctly on the right while every paragraph beside it ran
 *   to the left.
 * - **`writingDirection`** *orders* a mixed run. An Arabic sentence containing
 *   a Latin word, a number or a `%` reorders wrongly without it, and the caret
 *   in a `TextInput` jumps to the wrong end when the script changes mid-field.
 *
 * Pure and exported so the rule can be tested without a renderer — this project
 * has none, and every one of these failures is invisible until someone opens
 * the app in Arabic and looks at it.
 *
 * It is emphatically **not** `I18nManager`: that flag is process-wide and only
 * lands on a relaunch. See `applyDirection`.
 */
export type TextDirection = {
  direction: 'ltr' | 'rtl';
  paragraphAlign: 'left' | 'right';
  inputAlign: 'left' | 'right';
  writingDirection: 'ltr' | 'rtl';
};

/**
 * The value `<Text>` needs in order to sit on the side the language starts from.
 *
 * ## Why it is `left` in Arabic
 *
 * It looks like a bug and it is the opposite of one. On a `<Text>`, React Native
 * treats `textAlign: 'left' | 'right'` as **logical**, not physical: it resolves
 * them against the node's own Yoga direction and swaps the pair when that
 * direction is RTL. Both platforms do it, in the same shape:
 *
 * - iOS — `RCTAttributedTextUtils.mm`, in the paragraph-style block: under
 *   `LayoutDirection::RightToLeft`, `Right` becomes `Left` and `Left` becomes
 *   `Right` before the alignment reaches the paragraph style.
 * - Android — `ReactBaseTextShadowNode.getTextAlign()`, guarded on
 *   `getLayoutDirection() == YogaDirection.RTL`, swapping `Gravity.RIGHT` and
 *   `Gravity.LEFT`.
 *
 * The direction it resolves against is the *inherited* one, set once on the root
 * view in `app/_layout.tsx`. So this app's two halves were cancelling each
 * other out: the root's `direction: 'rtl'` mirrored every box **and** turned an
 * explicit `textAlign: 'right'` into a real left. Every paragraph in the app
 * rendered against the left edge of a correctly mirrored screen — which is the
 * "almost mirrored" state these rules exist to prevent, arrived at from the one
 * angle nobody expected.
 *
 * `'left'` is therefore *start* in both directions: untouched in LTR, swapped to
 * the right edge in RTL. That is why this is a constant rather than a ternary,
 * and why it must not be "corrected" to track the language.
 *
 * It follows that this value is only right while the node actually inherits the
 * root's direction. That is a feature: alignment and mirroring are then decided
 * by the same fact, so a subtree that loses `direction` gets a left-aligned
 * paragraph *inside* an unmirrored box rather than one of the two silently
 * disagreeing with the other.
 */
const PARAGRAPH_ALIGN = 'left' as const;

export function directionFor(code: LanguageCode): TextDirection {
  return isRTL(code)
    ? {
        direction: 'rtl',
        paragraphAlign: PARAGRAPH_ALIGN,
        // Physical, and deliberately not the value above. `layoutDirection` is
        // attached to text attributes in exactly one place in React Native —
        // `ParagraphShadowNode`, which backs `<Text>` — and in none of the
        // TextInput shadow nodes, so the swap described above never runs for an
        // input. An input handed `'left'` in Arabic really does align left,
        // putting the caret on the wrong end of what the user is typing.
        inputAlign: 'right',
        writingDirection: 'rtl',
      }
    : {
        direction: 'ltr',
        paragraphAlign: PARAGRAPH_ALIGN,
        inputAlign: 'left',
        writingDirection: 'ltr',
      };
}

/** Best-guess language from the device, used only before the user picks one. */
export function detectDeviceLanguage(): LanguageCode {
  const tags = getLocales().map((l) => l.languageTag.toLowerCase());
  for (const tag of tags) {
    if (tag.startsWith('ckb') || tag.startsWith('ku')) return 'ckb';
    if (tag.startsWith('ar')) return 'ar';
    if (tag.startsWith('en')) return 'en';
  }
  return 'en';
}

export const resources = {
  en: { translation: en },
  ar: { translation: ar },
  ckb: { translation: ckb },
} as const;

let initialised = false;

export function initI18n(language: LanguageCode) {
  if (initialised) {
    void changeLanguage(language);
    return i18n;
  }
  void registerPlugin(initReactI18next).init({
    resources,
    lng: language,
    fallbackLng: 'en',
    // React already escapes rendered strings; i18next's own escaping would
    // double-encode apostrophes in the English copy.
    interpolation: { escapeValue: false },
    returnNull: false,
  });
  initialised = true;
  return i18n;
}

/**
 * Keeps the *native* direction flag out of the way, so direction can be applied
 * per render instead of per launch.
 *
 * `I18nManager.forceRTL` is process-wide and only takes effect after a full
 * reload — which is why switching to Arabic used to raise a "restart the app"
 * notice, and why the text stayed left-aligned until you did. The app now
 * carries direction itself: the theme resolves it from the active language and
 * `Text` aligns against it, which applies on the very next frame.
 *
 * So this normalises the native flag to LTR rather than driving it. On a device
 * where an earlier build had already forced RTL, that clears on the next launch
 * and lines the native flag back up with what the app draws; everywhere else it
 * is a no-op. `allowRTL(false)` stops React Native turning it back on by itself
 * when the device locale is Arabic.
 */
export function applyDirection(_language: LanguageCode): void {
  I18nManager.allowRTL(false);
  if (I18nManager.isRTL) I18nManager.forceRTL(false);
}

export default i18n;
