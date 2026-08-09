import { relativeDayKey } from './dates';

/**
 * The boundary this exists for is midnight, not 24 hours.
 *
 * An attempt sat at 23:00 and read at 01:00 the next morning is "yesterday" to
 * the person who sat it, and elapsed-milliseconds arithmetic calls it "today"
 * for another twenty-two hours. That is a wrong answer in exactly the case a
 * reader notices, and it is invisible by hand — reproducing it means opening
 * the app in a two-hour window after midnight.
 */
describe('relativeDayKey', () => {
  const at = (y: number, m: number, d: number, h = 12, min = 0) =>
    new Date(y, m - 1, d, h, min).toISOString();

  it('reads the same calendar day as today', () => {
    const now = new Date(2026, 7, 7, 9, 0);
    expect(relativeDayKey(at(2026, 8, 7, 1), now)).toEqual({
      key: 'time.today',
      count: 0,
    });
  });

  it('crosses to yesterday at midnight, not at 24 hours', () => {
    // Two hours apart, one calendar day apart. Elapsed-time arithmetic gets
    // this wrong and looks completely correct while doing it.
    const now = new Date(2026, 7, 7, 1, 0);
    expect(relativeDayKey(at(2026, 8, 6, 23), now)).toEqual({
      key: 'time.yesterday',
      count: 1,
    });
  });

  it('counts days, then weeks, then months, then years', () => {
    const now = new Date(2026, 7, 7, 12, 0);
    expect(relativeDayKey(at(2026, 8, 4), now)).toEqual({
      key: 'time.daysAgo',
      count: 3,
    });
    expect(relativeDayKey(at(2026, 7, 24), now)).toEqual({
      key: 'time.weeksAgo',
      count: 2,
    });
    expect(relativeDayKey(at(2026, 5, 7), now)).toEqual({
      key: 'time.monthsAgo',
      count: 3,
    });
    expect(relativeDayKey(at(2024, 8, 7), now)).toEqual({
      key: 'time.yearsAgo',
      count: 2,
    });
  });

  it('treats a future timestamp as the most recent thing that happened', () => {
    // A wrong device clock or a forged row. `attempts.ts` already refuses to
    // push one more than a day ahead; what reaches the screen must still render
    // as something rather than as a negative count of days.
    const now = new Date(2026, 7, 7, 12, 0);
    expect(relativeDayKey(at(2026, 8, 20), now)).toEqual({
      key: 'time.today',
      count: 0,
    });
  });

  it('says nothing rather than something false for an unparseable date', () => {
    const now = new Date(2026, 7, 7, 12, 0);
    expect(relativeDayKey('not-a-date', now)).toEqual({
      key: 'time.unknown',
      count: 0,
    });
  });
});
