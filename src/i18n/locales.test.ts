import { REMINDER_MESSAGE_IDS } from '@/features/notifications/messages';
import en from './locales/en';
import ar from './locales/ar';
import ckb from './locales/ckb';

/**
 * Locale-file invariants that the type system cannot reach.
 *
 * `ar.ts` and `ckb.ts` are declared as `TranslationShape`, so a *missing* key is
 * already a compile error. What that cannot see is a key that is present and
 * **empty**, which is how `notifications.items.stopSign.body` shipped blank in
 * all three languages — one reminder of thirteen, rendering title-only at one of
 * four daily slots, in a feature that cannot be exercised in Expo Go at all.
 */

type Node = { [k: string]: string | Node };

function flatten(node: Node, prefix = '', out: Record<string, string> = {}) {
  for (const [k, v] of Object.entries(node)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else flatten(v, key, out);
  }
  return out;
}

const LOCALES = {
  en: flatten(en as unknown as Node),
  ar: flatten(ar as unknown as Node),
  ckb: flatten(ckb as unknown as Node),
};

/**
 * The one string deliberately empty in every language: an unparseable timestamp
 * renders as nothing rather than as the word "unknown". See `relativeDayKey`.
 */
const INTENTIONALLY_EMPTY = new Set(['time.unknown']);

describe('locale files', () => {
  it.each(Object.keys(LOCALES))('has no accidentally empty string in %s', (locale) => {
    const empty = Object.entries(LOCALES[locale as keyof typeof LOCALES])
      .filter(([key, value]) => value.trim() === '' && !INTENTIONALLY_EMPTY.has(key))
      .map(([key]) => key);

    expect(empty).toEqual([]);
  });

  /**
   * Pinned separately from the blanket check above because a reminder is the one
   * piece of copy the app hands to the OS rather than drawing itself: it cannot
   * be seen in Expo Go, and a blank half renders as a truncated-looking
   * notification rather than as an obvious defect.
   */
  it.each(Object.keys(LOCALES))('gives every reminder a title and a body in %s', (locale) => {
    const strings = LOCALES[locale as keyof typeof LOCALES];

    for (const id of REMINDER_MESSAGE_IDS) {
      expect(strings[`notifications.items.${id}.title`]?.trim()).toBeTruthy();
      expect(strings[`notifications.items.${id}.body`]?.trim()).toBeTruthy();
    }
  });
});
