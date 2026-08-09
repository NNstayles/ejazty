/**
 * Text folding for search.
 *
 * The Learn tab's search box matched raw lower-cased text, which works in
 * English and quietly fails in the two languages most of the app is written
 * for. Three separate reasons, all invisible to whoever wrote the note:
 *
 * - **Harakat.** The study notes are written with short vowels where they help
 *   a learner read — `الدوّار`, `تقريبًا`, `كلًّا` — and nobody types them into a
 *   search box. `الدوار` and `الدوّار` are the same word with a `ّ` between two
 *   letters, so `String.includes` says no.
 * - **Letters with more than one spelling.** `أ إ آ ا` are one letter for the
 *   purpose of finding a word; so are `ة`/`ه` and `ى`/`ي`. A reader who types
 *   `اشاره` will not find `إشارة`, and has no way to know why.
 * - **Presentation forms.** Text pasted from a PDF (which is where the
 *   transcriptions came from) can carry Arabic ligatures and Persian `ک`/`ی`
 *   where the app uses `ك`/`ي`. NFKC folds the first; the map below folds the
 *   second, which NFKC leaves alone because they are genuinely distinct letters
 *   in Persian and Sorani.
 *
 * Sorani gets the same treatment for the shared letters and keeps its own:
 * `ڕ ڵ ۆ ێ ژ چ گ پ` are distinct letters in Kurdish, not variants, so folding
 * them would merge words that a Kurdish reader knows are different.
 *
 * Applied to **both sides** — the indexed text and the query — or it does
 * nothing: folding only one side moves the mismatch rather than removing it.
 *
 * Pure and tested, because every failure here is silent. A search that returns
 * nothing looks like a section with no match rather than like a broken index,
 * and this project has no renderer tests to catch it from the screen.
 */

/**
 * Combining marks stripped before matching.
 *
 * `ً-ْ` is the tanwin/harakat/sukun run, `ٓ-ٕ` the hamza and
 * madda marks that sit above or below an alif, `ٰ` the superscript alif,
 * and `ـ` is tatweel — a stretching character that is decoration, not a
 * letter. `ۖ-ۭ` covers the Quranic annotation marks, which are not
 * used in this content but cost nothing to fold and would otherwise be a
 * paste away from breaking a search.
 */
const MARKS = /[ً-ٰٕۖ-ۭـ]/g;

/** Letters with more than one spelling of the same sound. */
const LETTER_FOLDS: Record<string, string> = {
  // Alif, in all its hamza and madda forms.
  'آ': 'ا', // آ
  'أ': 'ا', // أ
  'إ': 'ا', // إ
  'ٱ': 'ا', // ٱ
  // Ta marbuta reads as ha at the end of a word and is typed either way.
  'ة': 'ه', // ة
  // Alif maqsura vs ya.
  'ى': 'ي', // ى
  // Persian/Sorani forms of kaf and ya. Distinct letters in those alphabets,
  // but a search must find `يمكن` when the query carries `ی` from a paste.
  'ک': 'ك', // ک
  'ی': 'ي', // ی
  // Hamza seats fold to the bare hamza rather than to alif: `مسؤول`/`مسئول` is a
  // spelling difference, and folding the seat away keeps both findable.
  'ؤ': 'ء', // ؤ
  'ئ': 'ء', // ئ
};

const LETTERS = new RegExp(`[${Object.keys(LETTER_FOLDS).join('')}]`, 'g');

/**
 * Arabic-Indic digits folded to ASCII.
 *
 * The notes print figures as `٦٠` and the exam bank prints them as `60`, so a
 * learner reading one and searching for the other finds nothing. Folding to
 * ASCII makes both queries reach both texts.
 */
const DIGITS: Record<string, string> = {
  '٠': '0', '١': '1', '٢': '2', '٣': '3', '٤': '4',
  '٥': '5', '٦': '6', '٧': '7', '٨': '8', '٩': '9',
  '۰': '0', '۱': '1', '۲': '2', '۳': '3', '۴': '4',
  '۵': '5', '۶': '6', '۷': '7', '۸': '8', '۹': '9',
};

const DIGIT_RE = new RegExp(`[${Object.keys(DIGITS).join('')}]`, 'g');

/**
 * Folds a string into the form both the index and a query are compared in.
 *
 * Idempotent — folding an already-folded string returns it unchanged — which is
 * what lets the result be cached on an entry and compared against a query
 * folded fresh on every keystroke.
 */
export function foldForSearch(input: string): string {
  return input
    .normalize('NFKC')
    .replace(MARKS, '')
    .replace(LETTERS, (c) => LETTER_FOLDS[c])
    .replace(DIGIT_RE, (c) => DIGITS[c])
    .toLowerCase()
    // Collapsed last, so a mark sitting between two spaces does not leave a
    // double gap behind that stops a two-word query matching.
    .replace(/\s+/g, ' ')
    .trim();
}
