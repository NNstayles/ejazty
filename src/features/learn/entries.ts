/**
 * Flattens the content bundle into the cards the Learn tab renders.
 *
 * This lives outside `app/(tabs)/learn/` so it can be tested, for the same
 * reason `sections.ts` does: the screen imports `expo-router` and `expo-image`,
 * this project has no renderer tests, and the guarantees that matter here are
 * exactly the ones a reader notices and a test suite otherwise cannot reach —
 * that no two cards in a section read the same, in any of the three languages,
 * and that no record is shown in two sections at once.
 *
 * Both of those were broken before this module existed. See `entries.test.ts`
 * for the measurements.
 *
 * ## What a card is now
 *
 * Two kinds, and no third:
 *
 * - **Catalogue cards** — a sign or a dashboard tell-tale. Artwork, a title and
 *   labelled blocks, because the label is doing work there: "What it means" and
 *   "What you must do" are different things and a reader looks up one of them.
 * - **Study notes** — a heading, a paragraph and a short list of facts. No
 *   labels, because prose with an overline above it reads as a form.
 *
 * There used to be a third kind: an exam question rendered as QUESTION /
 * ANSWER / WHY. It is gone. The Learn tab was ~430 multiple-choice questions
 * with their answers printed underneath, which reads as a quiz that has given
 * itself away rather than as something to study, and it forced a whole module
 * (`study-cards.ts`) to exist purely to stop 69 cards all titling themselves
 * "What does this sign mean?". The bank is untouched — `examPool()` still draws
 * on every one of those questions.
 */

import {
  dashboardLights,
  markingsAndLights,
  roadSigns,
  studyNotesFor,
} from '@/content/registry';
import {
  pick,
  type DashboardColour,
  type Localized,
  type Sourced,
  type StudyNote,
} from '@/content/schema';
import type { LanguageCode } from '@/i18n';
import { foldForSearch } from '@/i18n/fold';
import type { ImageSourcePropType } from 'react-native';
import {
  groupTitleKey,
  SECTION_GROUPS,
  SECTION_IDS,
  type LearnSectionId,
} from './sections';

/** Looks up a translation. Kept structural so the screen can pass i18next's. */
export type Translate = (key: string, vars?: Record<string, unknown>) => string;

/** One item flattened into the shape the Learn screen renders. */
export type Entry = {
  id: string;
  title: string;
  image?: ImageSourcePropType;
  /** False for anything the app must not present as ministry material. */
  official: boolean;
  /** Only dashboard entries carry a severity colour. */
  colour?: DashboardColour;
  /** A study note's paragraph, shown under the title with no label. */
  body?: string;
  /** A study note's facts, shown as a bulleted list. */
  points?: string[];
  /** Label/value pairs shown in order. Catalogue cards only. */
  blocks: { label: string; value: string }[];
  /**
   * Folded haystack for the search box.
   *
   * Folded rather than merely lower-cased, and the query has to be folded the
   * same way before it is compared — see `foldForSearch`. In Arabic the two are
   * not the same thing: the notes are written with harakat and the reader types
   * without them, so a raw `includes` fails on words that are spelled
   * identically apart from a vowel mark nobody can see.
   */
  search: string;
};

/** One heading plus the cards under it, as `SectionList` wants them. */
export type EntryGroup = { key: string; title: string; data: Entry[] };

/**
 * Whether a record may be shown as official ministry material.
 *
 * `verified` alone is not the test — a record also has to claim a government
 * authority. Nothing shipping today is `authority: 'reference'`, so no card
 * currently badges UNOFFICIAL; the check stays as the guarantee that anything
 * added later as reference material cannot borrow the manual's authority.
 */
export function isOfficial(record: Sourced): boolean {
  return record.verified && record.source.authority !== 'reference';
}

/**
 * Built groups, keyed by the translator that produced them and then by section
 * and language.
 *
 * The work this avoids is not trivial and it happens at the worst moment. A
 * section screen calls `buildGroups` while it is mounting — that is, during the
 * push animation — and the signs section alone flattens 111 catalogue records,
 * picking three localised fields off each and folding the joined result through
 * `foldForSearch`, which is an NFKC normalisation plus five regex passes over
 * the whole string. None of it depends on anything that changes: the content
 * bundle is a static import, so for a given section and language the answer is
 * always the same array.
 *
 * Keyed on `t` through a `WeakMap` rather than on section and language alone.
 * react-i18next hands back a stable `t` per language, so in the app this is one
 * bucket that never grows — but `entries.test.ts` calls this with several
 * different translators for the same section, and a cache that ignored `t`
 * would hand the second call the first one's headings. The weak key also means
 * a translator that goes out of scope takes its bucket with it.
 *
 * Callers must treat the result as frozen. Nothing mutates it today: the
 * section screen filters into fresh objects, and `SectionList` only reads.
 */
const groupCache = new WeakMap<Translate, Map<string, EntryGroup[]>>();

export function buildGroups(
  section: LearnSectionId,
  lang: LanguageCode,
  t: Translate,
): EntryGroup[] {
  let byKey = groupCache.get(t);
  if (!byKey) {
    byKey = new Map();
    groupCache.set(t, byKey);
  }
  const key = `${section}:${lang}`;
  const hit = byKey.get(key);
  if (hit) return hit;

  const built = computeGroups(section, lang, t);
  byKey.set(key, built);
  return built;
}

/**
 * An entry plus the section it lives in.
 *
 * Every screen outside a section list needs the second half: Saved and global
 * search both draw cards from anywhere in the app, and a card with no idea
 * which section it came from cannot be labelled or linked back to.
 */
export type LocatedEntry = { entry: Entry; section: LearnSectionId };

/** Built flat indexes, keyed the same way `buildGroups` is. See `allEntries`. */
const flatCache = new WeakMap<Translate, Map<string, LocatedEntry[]>>();

/**
 * Every card in the app, in section order, each tagged with its section.
 *
 * This is what Saved and global search are built on, and it is the *only* place
 * the app flattens across sections. Both features need the same thing — an
 * entry looked up by id, or matched against a query, without caring which of
 * the seven lists it came from — and building it once means they cannot
 * disagree about what a card is.
 *
 * It is genuinely expensive the first time: seven `buildGroups` calls, which
 * between them flatten 111 sign records, 94 tell-tales and 159 notes, and fold
 * each one through `foldForSearch`. So it is cached exactly as `buildGroups` is,
 * on the same `WeakMap` keyed by the translator — and, importantly, it is built
 * *out of* `buildGroups`, so a reader who has already opened a section pays only
 * for the six they have not. The first call still costs, which is why the
 * screens that use it are pushed rather than being tabs: the work happens under
 * a navigation animation, not during a tab switch.
 *
 * Callers must treat the result as frozen, for the same reason `buildGroups`
 * says so: the arrays are shared with the section screens.
 */
export function allEntries(lang: LanguageCode, t: Translate): LocatedEntry[] {
  let byKey = flatCache.get(t);
  if (!byKey) {
    byKey = new Map();
    flatCache.set(t, byKey);
  }
  const hit = byKey.get(lang);
  if (hit) return hit;

  const built = SECTION_IDS.flatMap((section) =>
    buildGroups(section, lang, t).flatMap((group) =>
      group.data.map((entry) => ({ entry, section })),
    ),
  );
  byKey.set(lang, built);
  return built;
}

/**
 * The same index keyed by entry id, for resolving a saved list.
 *
 * Cached alongside the flat list rather than rebuilt per render: the Saved
 * screen resolves its ids on every change to the saved order, and rebuilding a
 * ~470-entry `Map` to answer a handful of lookups is the kind of cost that only
 * shows up on the oldest device anyone runs this on.
 */
const byIdCache = new WeakMap<Translate, Map<string, Map<string, LocatedEntry>>>();

export function entriesById(
  lang: LanguageCode,
  t: Translate,
): ReadonlyMap<string, LocatedEntry> {
  let byKey = byIdCache.get(t);
  if (!byKey) {
    byKey = new Map();
    byIdCache.set(t, byKey);
  }
  const hit = byKey.get(lang);
  if (hit) return hit;

  const built = new Map(
    allEntries(lang, t).map((located) => [located.entry.id, located]),
  );
  byKey.set(lang, built);
  return built;
}

/**
 * Cards matching a search query, across every section.
 *
 * The query is folded here and the haystack was folded when the entry was
 * built, which is the rule `foldForSearch` documents: folding one side only
 * moves the mismatch rather than removing it. An empty query answers *nothing*
 * rather than everything — a global search box has no useful "show me all 470
 * cards" state, and rendering one would make the screen look like it ignored
 * what was typed.
 */
export function searchEntries(
  query: string,
  lang: LanguageCode,
  t: Translate,
): LocatedEntry[] {
  const folded = foldForSearch(query);
  if (!folded) return [];
  return allEntries(lang, t).filter((located) =>
    located.entry.search.includes(folded),
  );
}

function computeGroups(
  section: LearnSectionId,
  lang: LanguageCode,
  t: Translate,
): EntryGroup[] {
  const p = (value: Localized) => pick(value, lang);
  const withSearch = (entry: Omit<Entry, 'search'>): Entry => ({
    ...entry,
    search: foldForSearch(
      [
        entry.title,
        entry.body ?? '',
        ...(entry.points ?? []),
        ...entry.blocks.map((b) => b.value),
      ].join(' '),
    ),
  });

  const fromSign = (s: (typeof roadSigns)[number]) =>
    withSearch({
      id: s.id,
      title: p(s.title),
      image: s.image,
      official: isOfficial(s),
      blocks: [
        { label: t('learn.meaning'), value: p(s.meaning) },
        ...(s.action ? [{ label: t('learn.whatToDo'), value: p(s.action) }] : []),
      ],
    });

  const fromNote = (n: StudyNote) =>
    withSearch({
      id: n.id,
      title: p(n.title),
      image: n.image,
      official: isOfficial(n),
      body: p(n.body),
      points: n.points?.map(p),
      blocks: [],
    });

  const group = (key: string, data: Entry[]): EntryGroup[] =>
    data.length > 0 ? [{ key, title: t(groupTitleKey(key)), data }] : [];

  const signsOfCategory = (category: string) =>
    roadSigns.filter((s) => s.category === category).map(fromSign);

  /**
   * The section's own catalogue cards, keyed by the group they belong to.
   *
   * Only two sections have any: signs owns the 111-record sign catalogue, and
   * rules owns the markings and light signals. Everything else in the app is a
   * study note, so this map is empty for five of the seven sections.
   *
   * The road-priority section deliberately lists no sign cards. Every priority
   * sign is also a road sign and every priority light is also a traffic light,
   * so listing them here put sixteen records on screen twice — once in their
   * own catalogue and once under this section. The catalogue owns them.
   */
  const catalogue: Partial<Record<string, Entry[]>> =
    section === 'signs'
      ? {
          regulatory: signsOfCategory('regulatory'),
          warning: signsOfCategory('warning'),
          informative: signsOfCategory('informative'),
        }
      : section === 'rules'
        ? {
            markings: markingsAndLights
              .filter((s) => s.category === 'roadmarking')
              .map(fromSign),
            lights: markingsAndLights
              .filter((s) => s.category === 'trafficlight')
              .map(fromSign),
          }
        : section === 'dashboard'
          ? Object.fromEntries(
              // Grouped by what the lamp's colour *means* rather than by where it
              // sits in the file: red demands stopping and green is a
              // confirmation that something is switched on, and a reader looking
              // up a lamp that has just lit is looking for that distinction.
              SECTION_GROUPS.dashboard.map((colour) => [
                colour,
                dashboardLights
                  .filter((d) => d.colour === colour)
                  .map((d) =>
                    withSearch({
                      id: d.id,
                      title: p(d.title),
                      image: d.image,
                      official: isOfficial(d),
                      colour: d.colour,
                      blocks: [
                        { label: t('learn.meaning'), value: p(d.meaning) },
                        ...(d.action
                          ? [{ label: t('learn.whatToDo'), value: p(d.action) }]
                          : []),
                      ],
                    }),
                  ),
              ]),
            )
          : {};

  // Notes are bucketed by their declared group rather than filtered per group,
  // so a note naming a group the section does not declare disappears from the
  // screen instead of landing somewhere arbitrary — and `entries.test.ts` fails
  // when one does, which is the only way anyone would find out.
  const notes = new Map<string, Entry[]>();
  for (const note of studyNotesFor(section)) {
    const bucket = notes.get(note.group);
    if (bucket) bucket.push(fromNote(note));
    else notes.set(note.group, [fromNote(note)]);
  }

  // Walked in `SECTION_GROUPS` order rather than in data order, so the display
  // sequence is stated in one place and a group added to the data without being
  // declared there is caught rather than appended silently.
  return SECTION_GROUPS[section].flatMap((key) =>
    group(key, [...(catalogue[key] ?? []), ...(notes.get(key) ?? [])]),
  );
}
