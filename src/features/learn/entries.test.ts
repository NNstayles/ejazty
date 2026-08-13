import i18n, { initI18n, LANGUAGES, type LanguageCode } from '@/i18n';
import { foldForSearch } from '@/i18n/fold';
import { studyNotes } from '@/content/registry';
import {
  allEntries,
  buildGroups,
  entriesById,
  searchEntries,
} from './entries';
import { SECTION_GROUPS, SECTION_IDS, type LearnSectionId } from './sections';

/**
 * What the Learn tab must not do again.
 *
 * The rules here were broken in the shipped app, and all of them are the kind a
 * test suite is the only practical way to hold. Measured before the first fix,
 * in English:
 *
 * - **181 cards in the signs section, 106 distinct headings.** 69 read "What
 *   does this sign mean?" and 7 "What does this marking mean?", because a study
 *   card was an exam question titled by its stem and the ministry bank reuses
 *   one stem across a whole run of picture questions. Road priority was 29 of
 *   79. A reader scrolling that reports it as the app showing duplicates.
 * - **16 records rendered in two sections at once** — every priority sign in
 *   both Traffic signs and Road priority, every priority light in both Rules
 *   and Road priority.
 *
 * Neither is visible to a reviewer reading a diff, and neither is visible in
 * manual testing without scrolling several hundred cards in three languages and
 * keeping a tally. The counts are also language-dependent, which is the part
 * most likely to be missed by hand: the last four collisions in English were on
 * "No entry" and "No u-turn", in Arabic on "مستشفى" and "محطة وقود", and in
 * Sorani on a different pair again.
 *
 * The Learn tab is study notes now rather than exam questions, which removes
 * the *mechanism* that produced those collisions — a note is titled by hand.
 * The assertions stay because the failure they catch has not gone anywhere: two
 * notes written months apart can say the same thing, and the writer of the
 * second one is exactly the person who will not notice.
 */
describe('learn entries', () => {
  beforeAll(() => {
    // The builder resolves group headings through i18n, so a suite that has not
    // initialised it measures the key strings rather than the rendered ones —
    // and a heading collision test comparing two copies of
    // "learn.groups.regulatory" would pass for the wrong reason.
    initI18n('en');
  });

  const languages = LANGUAGES.map((l) => l.code) as LanguageCode[];

  const groupsFor = (section: LearnSectionId, lang: LanguageCode) => {
    // The group headings come from the active language, not from `lang`, so
    // both have to move together or a heading is rendered in English while the
    // cards under it are in Arabic.
    void i18n.changeLanguage(lang);
    return buildGroups(section, lang, (key, vars) =>
      String(i18n.t(key, vars as never)),
    );
  };

  const key = (s: string) => s.replace(/\s+/g, ' ').trim().toLowerCase();

  it.each(languages)('gives every card a distinct heading in %s', (lang) => {
    for (const section of SECTION_IDS) {
      const cards = groupsFor(section, lang).flatMap((g) => g.data);
      const seen = new Map<string, string[]>();
      for (const card of cards) {
        seen.set(key(card.title), [...(seen.get(key(card.title)) ?? []), card.id]);
      }
      const duplicates = [...seen.entries()]
        .filter(([, ids]) => ids.length > 1)
        // Named in the failure rather than counted, so the message says which
        // cards collided instead of just how many.
        .map(([title, ids]) => `${section}/${lang} "${title}" → ${ids.join(', ')}`);
      expect(duplicates).toEqual([]);
    }
  });

  it.each(languages)('shows no record in two sections in %s', (lang) => {
    const home = new Map<string, LearnSectionId[]>();
    for (const section of SECTION_IDS) {
      for (const card of groupsFor(section, lang).flatMap((g) => g.data)) {
        home.set(card.id, [...(home.get(card.id) ?? []), section]);
      }
    }
    const shared = [...home.entries()]
      .filter(([, sections]) => sections.length > 1)
      .map(([id, sections]) => `${id} → ${sections.join(', ')}`);
    expect(shared).toEqual([]);
  });

  it('renders every study note that ships', () => {
    // The counterpart of the coverage rule in `sections.test.ts`, one level
    // down: that one pins that every *topic* has a section, this one pins that
    // every *note* actually reaches a screen. A note whose `group` is not one
    // its section declares is dropped by `buildGroups` — silently, because a
    // screen cannot show you what it was never handed — and that is a typo away
    // at all times.
    const rendered = new Set(
      SECTION_IDS.flatMap((s) => groupsFor(s, 'en').flatMap((g) => g.data)).map(
        (e) => e.id,
      ),
    );
    const missing = studyNotes
      .filter((n) => !rendered.has(n.id))
      .map((n) => `${n.id} (topic ${n.topic}, group ${n.group})`);
    expect(missing).toEqual([]);
  });

  it('puts every note in a group its section declares', () => {
    // The compile-time version of this would need the group list in the content
    // layer, which would put display order into the data. This is the trade:
    // `group` stays a plain string and the coupling is pinned here instead.
    const wrong = studyNotes
      .filter((n) => !SECTION_GROUPS[n.topic].includes(n.group))
      .map((n) => `${n.id} → "${n.group}" is not a group of ${n.topic}`);
    expect(wrong).toEqual([]);
  });

  it('never emits an empty group', () => {
    // A sticky heading with nothing under it reads as a failed load. Groups are
    // derived from the data, so one drops out entirely when it is empty rather
    // than rendering as a bare bar.
    for (const lang of languages) {
      for (const section of SECTION_IDS) {
        for (const group of groupsFor(section, lang)) {
          expect(group.data.length).toBeGreaterThan(0);
          expect(group.title.trim()).not.toBe('');
          // A missing translation surfaces as the key itself, which would ship
          // "learn.groups.markings" as a visible heading.
          expect(group.title).not.toContain('learn.');
        }
      }
    }
  });

  it('gives every section something to show', () => {
    // A section that renders empty is indistinguishable from one whose material
    // has not been written yet — the screen shows the same empty state for both.
    for (const section of SECTION_IDS) {
      const cards = groupsFor(section, 'en').flatMap((g) => g.data);
      expect([section, cards.length > 0]).toEqual([section, true]);
    }
  });

  it.each(languages)('keeps every card searchable by what is on it in %s', (lang) => {
    // `search` is built from the heading, the body, the points and the blocks.
    // A card whose haystack held only some of those would be unfindable by
    // words printed on it.
    //
    // Both sides are folded, because that is how the screen compares them —
    // asserting against raw text here would pass while the app failed, since
    // the haystack is folded and a raw Arabic title is not.
    for (const section of SECTION_IDS) {
      for (const card of groupsFor(section, lang).flatMap((g) => g.data)) {
        expect(card.search).toContain(foldForSearch(card.title).slice(0, 24));
        if (card.body) {
          expect(card.search).toContain(foldForSearch(card.body).slice(0, 24));
        }
        for (const point of card.points ?? []) {
          expect(card.search).toContain(foldForSearch(point).slice(0, 24));
        }
      }
    }
  });

  it('finds an Arabic card typed without its harakat', () => {
    /*
      The end-to-end version of `fold.test.ts`, and the reason that module
      exists. The study notes are written with short vowels where they help a
      learner read; nobody types them into a search box. Before folding, the
      haystack held `الدوّار` and the query `الدوار` — the same word with one
      invisible mark between two letters — and `String.includes` said no.

      Asserted through `buildGroups` rather than over the raw note, so it covers
      the whole path the screen actually uses: note → entry → `search`.
    */
    const cards = groupsFor('priority', 'ar').flatMap((g) => g.data);
    const unvowelled = foldForSearch('الدوار');
    const hits = cards.filter((c) => c.search.includes(unvowelled));
    expect(hits.length).toBeGreaterThan(0);

    // And the raw form is genuinely absent, so the assertion above is testing
    // the folding rather than passing by accident on a note that happens to
    // spell it without the shadda.
    const raw = cards.filter((c) => c.search.includes('الدوّار'));
    expect(raw).toEqual([]);
  });

  /**
   * The flat index behind Saved and global search.
   *
   * Both screens draw cards from anywhere in the app, so the thing that can go
   * wrong is a *section* silently missing from the flattening — which renders as
   * a search that never finds first aid, or a saved card that vanishes. Nothing
   * on either screen would say so: an absent section looks exactly like a query
   * that matched nothing.
   */
  describe('the flat index', () => {
    const translate = (key: string, vars?: Record<string, unknown>) =>
      String(i18n.t(key, vars as never));

    const flat = (lang: LanguageCode) => {
      void i18n.changeLanguage(lang);
      return allEntries(lang, translate);
    };

    it('holds every card from every section', () => {
      void i18n.changeLanguage('en');
      const perSection = SECTION_IDS.flatMap((section) =>
        buildGroups(section, 'en', translate).flatMap((g) => g.data),
      );
      expect(flat('en')).toHaveLength(perSection.length);
      expect(new Set(flat('en').map((l) => l.section))).toEqual(
        new Set(SECTION_IDS),
      );
    });

    it('tags each card with the section it came from', () => {
      // The tag is what Saved and search label a card with and link back
      // through, so a wrong one sends the reader to a screen the card is not on.
      void i18n.changeLanguage('en');
      for (const section of SECTION_IDS) {
        const ids = new Set(
          buildGroups(section, 'en', translate).flatMap((g) =>
            g.data.map((e) => e.id),
          ),
        );
        for (const located of flat('en')) {
          if (ids.has(located.entry.id)) {
            expect([located.entry.id, located.section]).toEqual([
              located.entry.id,
              section,
            ]);
          }
        }
      }
    });

    it('indexes by id with no id lost to a collision', () => {
      // `entriesById` is a `Map`, so two cards sharing an id would leave one of
      // them permanently unresolvable — a bookmark that saves and then never
      // appears. The no-record-in-two-sections rule above makes this hold; this
      // asserts the index actually inherits it.
      const all = flat('en');
      expect(entriesById('en', translate).size).toBe(all.length);
    });

    /**
     * The gap this feature was built to close. Search used to be per-section,
     * so finding a roundabout meant guessing which of seven lists it was in.
     */
    it('finds a card from a section other than the one searched', () => {
      void i18n.changeLanguage('en');
      const hits = searchEntries('roundabout', 'en', translate);
      expect(hits.length).toBeGreaterThan(0);
      expect(new Set(hits.map((h) => h.section)).size).toBeGreaterThan(1);
    });

    it('folds the query, so Arabic typed without harakat still matches', () => {
      // Same rule as the per-section box, asserted again here because this is a
      // second call site and folding one side only moves the mismatch.
      void i18n.changeLanguage('ar');
      expect(searchEntries('الدوار', 'ar', translate).length).toBeGreaterThan(0);
    });

    /**
     * An empty query answers nothing, not everything. A global box has no
     * useful "here are all 470 cards" state, and returning one would read as a
     * screen that ignored what was typed.
     */
    it.each(['', '   '])('answers nothing for %p', (query) => {
      void i18n.changeLanguage('en');
      expect(searchEntries(query, 'en', translate)).toEqual([]);
    });
  });

  it('renders notes as prose rather than as labelled fields', () => {
    // The whole point of the rewrite. A note carries a body and no blocks; the
    // catalogue cards are the only things with labels, and they are the only
    // things with artwork of their own in the sections that have both.
    const notes = groupsFor('rules', 'en')
      .filter((g) => g.key !== 'markings' && g.key !== 'lights')
      .flatMap((g) => g.data);
    expect(notes.length).toBeGreaterThan(10);
    for (const note of notes) {
      expect([note.id, note.blocks]).toEqual([note.id, []]);
      expect(note.body?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });
});
