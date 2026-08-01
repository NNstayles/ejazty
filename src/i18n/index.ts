import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';
import { getLocales } from 'expo-localization';

import ar from './locales/ar';
import ckb from './locales/ckb';
import en from './locales/en';

export type LanguageCode = 'en' | 'ar' | 'ckb';

export type LanguageDescriptor = {
  code: LanguageCode;
  /** Endonym — always rendered in its own script, never translated. */
  nativeName: string;
  englishName: string;
  isRTL: boolean;
};

export const LANGUAGES: readonly LanguageDescriptor[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', isRTL: false },
  { code: 'ar', nativeName: 'العربية', englishName: 'Arabic', isRTL: true },
  {
    code: 'ckb',
    nativeName: 'کوردیی ناوەندی',
    englishName: 'Kurdish (Sorani)',
    isRTL: true,
  },
] as const;

export function describeLanguage(code: LanguageCode): LanguageDescriptor {
  return LANGUAGES.find((l) => l.code === code) ?? LANGUAGES[0];
}

export function isRTL(code: LanguageCode): boolean {
  return describeLanguage(code).isRTL;
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
    void i18n.changeLanguage(language);
    return i18n;
  }
  void i18n.use(initReactI18next).init({
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
 * Native layout mirroring is process-wide and only takes effect after a full
 * reload, so this reports whether a restart is needed and leaves the decision
 * to the caller.
 */
export function applyDirection(language: LanguageCode): { needsRestart: boolean } {
  const shouldBeRTL = isRTL(language);
  I18nManager.allowRTL(true);
  if (I18nManager.isRTL === shouldBeRTL) return { needsRestart: false };
  I18nManager.forceRTL(shouldBeRTL);
  return { needsRestart: true };
}

export default i18n;
