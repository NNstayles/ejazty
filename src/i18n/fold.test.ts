import { foldForSearch } from './fold';

/**
 * What earns these tests is that every failure here is a *silent* one.
 *
 * A search that folds one side and not the other, or that folds a letter Sorani
 * treats as distinct, returns a screen with no results — which is
 * indistinguishable from a section that genuinely has no match. There is no
 * error, nothing in a log, and no renderer test in this project that could
 * reach the search box. The cases below are the ones that were actually broken
 * in the shipped app, plus the two ways a fix like this goes too far.
 */
describe('foldForSearch', () => {
  it('strips the harakat the notes are written with', () => {
    // The exact pair that made this necessary: the study note titles the
    // roundabout `الدوّار` and every learner types `الدوار`.
    expect(foldForSearch('الدوّار')).toBe(foldForSearch('الدوار'));
    expect(foldForSearch('تقريبًا')).toBe(foldForSearch('تقريبا'));
    expect(foldForSearch('كلًّا')).toBe(foldForSearch('كلا'));
  });

  it('folds the alif forms together', () => {
    const bare = foldForSearch('اشاره');
    expect(foldForSearch('إشارة')).toBe(bare);
    expect(foldForSearch('أشارة')).toBe(bare);
    expect(foldForSearch('آشارة')).toBe(bare);
  });

  it('folds ta marbuta to ha and alif maqsura to ya', () => {
    expect(foldForSearch('سرعة')).toBe(foldForSearch('سرعه'));
    expect(foldForSearch('علي')).toBe(foldForSearch('على'));
  });

  it('folds the Persian kaf and ya a paste can carry in', () => {
    // NFKC leaves these alone — they are genuinely distinct letters in Persian
    // — so a query pasted from a PDF would otherwise never match the app's own
    // Arabic text.
    expect(foldForSearch('یمکن')).toBe(foldForSearch('يمكن'));
  });

  it('folds Arabic-Indic digits to ASCII', () => {
    // The notes print `٦٠ كم/س` and the exam bank prints `60`, so a learner
    // searching for one has to be able to find the other.
    expect(foldForSearch('٦٠')).toBe('60');
    expect(foldForSearch('١٠٠ كم')).toBe(foldForSearch('100 كم'));
  });

  it('leaves the letters Sorani treats as its own alone', () => {
    // The load-bearing half of the rule. `ڕ ڵ ۆ ێ ژ چ گ پ` are distinct letters
    // in Kurdish, not variants of an Arabic one, and folding them would merge
    // words a Kurdish reader knows are different — the failure mode that gets a
    // normaliser reverted rather than tuned.
    const kurdish = 'ڕێگا ڵ ۆ ژ چ گ پ';
    expect(foldForSearch(kurdish)).toBe(kurdish.toLowerCase());
    expect(foldForSearch('ڕێگا')).not.toBe(foldForSearch('ريگا'));
  });

  it('lower-cases and collapses whitespace for Latin', () => {
    expect(foldForSearch('  STOP   Sign ')).toBe('stop sign');
  });

  it('is idempotent', () => {
    // The index is folded once at build time and the query on every keystroke,
    // so folding a folded string has to be a no-op or the two drift apart.
    for (const s of ['الدوّار', 'إشارة المرور', '٦٠ كم/س', 'ڕێگا', 'STOP Sign']) {
      expect(foldForSearch(foldForSearch(s))).toBe(foldForSearch(s));
    }
  });

  it('does not merge words that are genuinely different', () => {
    // Over-folding is the way this becomes worse than no folding at all: a
    // search that returns the wrong card teaches the reader to stop using it.
    expect(foldForSearch('قف')).not.toBe(foldForSearch('قفل'));
    expect(foldForSearch('سير')).not.toBe(foldForSearch('سرير'));
  });
});
