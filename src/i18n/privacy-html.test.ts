import { mkdirSync, writeFileSync } from 'fs';
import path from 'path';

import { SUPPORT_EMAIL } from '../features/support/contact';

import en from './locales/en';
import ar from './locales/ar';
import ckb from './locales/ckb';

/**
 * Builds the three pages under `docs/` that the store listings link to.
 *
 * ## Why they are generated rather than written
 *
 * The app screen (`(tabs)/settings/privacy.tsx`) and the store listing need the
 * *same* policy, and they are read by different people at different times: the
 * screen by a user, the URL by a store reviewer. Two hand-maintained copies of
 * a legal document is the definition of a pair that drifts, and the drift is
 * invisible — nobody diffs a published web page against an app screen. Deriving
 * the pages from the locale files makes them one document with two renderings.
 *
 * Run it deliberately, like the content dump:
 *
 *     BUILD_PRIVACY_HTML=1 npx jest src/i18n/privacy-html.test.ts
 *
 * It is a test rather than a script for the same reason `dump-content.test.ts`
 * is: the locale files are TypeScript with path aliases, so they load under
 * `jest-expo`'s transform and not under plain Node.
 *
 * ## What it writes, and why each one exists
 *
 * - `privacy-policy.html` — the policy. **Both stores require a URL**, and an
 *   in-app screen cannot satisfy that: the listing is read before the app is
 *   installed.
 * - `delete-account.html` — **Google Play requires a separate, publicly
 *   reachable account-deletion URL** for any app that lets users create an
 *   account, and it must be reachable without installing the app or signing in.
 *   In-app deletion exists and is the better route, so the page leads with it
 *   and gives the email route for someone who has already uninstalled.
 * - `index.html` — so the site root is not a 404. A reviewer who trims the URL
 *   back to the domain should find a signpost rather than a GitHub error page,
 *   and it is where an `app-ads.txt` would eventually sit alongside.
 *
 * All three carry every language on one page, so a single URL serves every
 * listing locale.
 *
 * ## Hosting them
 *
 * `docs/` on the repository's **default branch** is what GitHub Pages serves
 * with no build step, which is the cheapest way to get the URLs both stores
 * require from someone who has no website. Note this needs a remote to exist:
 * as of writing the repository has none, so these files are correct and not yet
 * reachable. See CLAUDE.md.
 */
const enabled = process.env.BUILD_PRIVACY_HTML === '1';

/*
  Contact address, from the one module that declares it.

  It used to be a second copy here under a comment asking the reader to keep it
  in step with the privacy screen — which is the very failure this generator was
  written to remove, reproduced inside the generator. Importing it means the
  screen, these three pages and the support row in Settings cannot disagree.
*/
const CONTACT_EMAIL = SUPPORT_EMAIL;

/**
 * The section order, as keys into the `privacy` block.
 *
 * `body` holds the paragraphs and `points` the bulleted items, so the shape of
 * a section is declared once here rather than being implied by the markup —
 * which is what lets a section be added in the locale files and picked up by
 * both renderings without touching either.
 */
const SECTIONS: { title: string; body: string[]; points?: string[] }[] = [
  { title: 'summaryTitle', body: ['summary'] },
  { title: 'controllerTitle', body: ['controllerBody'] },
  {
    title: 'deviceTitle',
    body: ['deviceBody'],
    points: ['devicePhoto', 'deviceGoal', 'devicePrefs', 'deviceLock', 'deviceCache'],
  },
  {
    title: 'accountTitle',
    body: ['accountBody'],
    points: ['accountIdentity', 'accountAttempts', 'accountQuestions'],
  },
  { title: 'accountTitle', body: ['accountHost'] },
  { title: 'guestTitle', body: ['guestBody'] },
  {
    title: 'neverTitle',
    body: ['neverBody'],
    points: [
      'neverLocation',
      'neverContacts',
      'neverIdentifiers',
      'neverBehaviour',
      'neverSell',
    ],
  },
  { title: 'adsTitle', body: ['adsBody', 'adsConsent', 'adsPartners'] },
  { title: 'notificationsTitle', body: ['notificationsBody'] },
  { title: 'photosTitle', body: ['photosBody'] },
  { title: 'analyticsTitle', body: ['analyticsBody'] },
  {
    title: 'basisTitle',
    body: ['basisBody'],
    points: ['basisService', 'basisConsent', 'basisSecurity'],
  },
  { title: 'transferTitle', body: ['transferBody'] },
  { title: 'rightsTitle', body: ['rightsBody'] },
  { title: 'deleteWebTitle', body: ['deleteWebBody'] },
  {
    title: 'legalRightsTitle',
    body: ['legalRightsBody'],
    points: [
      'rightAccess',
      'rightCorrect',
      'rightDelete',
      'rightWithdraw',
      'rightObject',
      'rightComplain',
    ],
  },
  { title: 'retentionTitle', body: ['retentionBody'] },
  { title: 'securityTitle', body: ['securityBody'] },
  { title: 'childrenTitle', body: ['childrenBody'] },
  { title: 'changesTitle', body: ['changesBody'] },
  { title: 'contactTitle', body: ['contactBody'] },
];

/**
 * The `accountHost` paragraph belongs to the account section but is rendered
 * after its bullet list, so it appears above as a second entry under the same
 * title. Collapsing consecutive duplicates keeps one heading on the page.
 */
function escape(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * The policy block, widened to plain strings.
 *
 * `en.privacy` infers *literal* types (`title: "Privacy policy"`), while the
 * translations are declared against `TranslationShape` and are plain `string`.
 * Typing the renderer against `typeof en.privacy` therefore accepts English and
 * rejects the two languages the page exists to serve. The keys are what matter
 * here, and they are already guaranteed by `TranslationShape`.
 */
type Privacy = Record<string, string>;

function renderLanguage(
  p: Privacy,
  opts: { code: string; label: string; dir: 'ltr' | 'rtl' },
): string {
  const parts: string[] = [];
  parts.push(`<section id="${opts.code}" dir="${opts.dir}" lang="${opts.code}">`);
  parts.push(`<h2>${escape(p.title)} — ${escape(opts.label)}</h2>`);
  parts.push(`<p class="updated">${escape(p.updated)}</p>`);
  parts.push(`<p>${escape(p.intro)}</p>`);

  let lastTitle = '';
  for (const section of SECTIONS) {
    const title = p[section.title];
    if (title !== lastTitle) {
      parts.push(`<h3>${escape(title)}</h3>`);
      lastTitle = title;
    }
    for (const key of section.body) {
      parts.push(`<p>${escape(p[key])}</p>`);
    }
    if (section.points) {
      parts.push('<ul>');
      for (const key of section.points) {
        parts.push(`<li>${escape(p[key])}</li>`);
      }
      parts.push('</ul>');
    }
  }

  parts.push(
    `<p class="contact"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`,
  );
  parts.push('</section>');
  return parts.join('\n');
}

/** The three languages, in the order they appear on every page. */
const LANGUAGES = [
  { privacy: en.privacy as Privacy, code: 'en', label: 'English', dir: 'ltr' as const },
  { privacy: ar.privacy as Privacy, code: 'ar', label: 'العربية', dir: 'rtl' as const },
  { privacy: ckb.privacy as Privacy, code: 'ckb', label: 'کوردی', dir: 'rtl' as const },
];

/**
 * One stylesheet and one document shell for all three pages.
 *
 * Shared so the deletion page cannot end up looking like a different site from
 * the policy it is linked from — a store reviewer following one to the other is
 * checking that they belong to the same app.
 */
function page(options: { title: string; heading: string; body: string }): string {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${escape(options.title)}</title>
<style>
  :root { color-scheme: light dark; --fg:#16151f; --muted:#5a5870; --bg:#ffffff; --rule:#e4e2ee; --link:#6C5CE7; }
  @media (prefers-color-scheme: dark) {
    :root { --fg:#f2f1f8; --muted:#a6a3bb; --bg:#0f0e17; --rule:#2a2838; --link:#a99bf5; }
  }
  * { box-sizing: border-box; }
  body {
    margin: 0 auto; padding: 2rem 1.25rem 5rem; max-width: 44rem; background: var(--bg); color: var(--fg);
    font: 16px/1.65 system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  }
  h1 { font-size: 1.7rem; margin: 0 0 .25rem; }
  h2 { font-size: 1.3rem; margin: 2.5rem 0 .5rem; }
  h3 { font-size: 1.02rem; margin: 1.75rem 0 .4rem; }
  p { margin: .6rem 0; }
  ul { margin: .5rem 0; padding-inline-start: 1.35rem; }
  li { margin: .3rem 0; }
  a { color: var(--link); }
  hr { border: 0; border-top: 1px solid var(--rule); margin: 3rem 0; }
  .updated, .tagline { color: var(--muted); font-size: .9rem; }
  .contact { font-weight: 600; }
  nav { margin: 1rem 0 0; display: flex; gap: 1rem; flex-wrap: wrap; }
  section[dir="rtl"] { text-align: right; }
</style>
</head>
<body>
<h1>${escape(options.heading)}</h1>
${options.body}
</body>
</html>
`;
}

/** The `#en` / `#ar` / `#ckb` jump links every page carries. */
function languageNav(): string {
  const links = LANGUAGES.map(
    (l) => `<a href="#${l.code}">${escape(l.label)}</a>`,
  ).join('\n  ');
  return `<nav>\n  ${links}\n</nav>`;
}

/**
 * The account-deletion page, per language.
 *
 * Leads with the in-app route because it is instant and self-service, then
 * gives the email route — which is the one this page has to exist for, since
 * Play requires the process to be reachable by someone who has already
 * uninstalled the app.
 */
function renderDeletion(
  p: Privacy,
  opts: { code: string; label: string; dir: 'ltr' | 'rtl' },
): string {
  return [
    `<section id="${opts.code}" dir="${opts.dir}" lang="${opts.code}">`,
    `<h2>${escape(p.deleteWebTitle)} — ${escape(opts.label)}</h2>`,
    `<h3>${escape(p.rightsTitle)}</h3>`,
    `<p>${escape(p.rightsBody)}</p>`,
    `<h3>${escape(p.deleteWebTitle)}</h3>`,
    `<p>${escape(p.deleteWebBody)}</p>`,
    `<p class="contact"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`,
    `<h3>${escape(p.retentionTitle)}</h3>`,
    `<p>${escape(p.retentionBody)}</p>`,
    `<p><a href="./privacy-policy.html">${escape(p.title)}</a></p>`,
    '</section>',
  ].join('\n');
}

/** The site root: what the app is, and the two pages the stores link to. */
function renderIndex(
  p: Privacy,
  opts: { code: string; label: string; dir: 'ltr' | 'rtl' },
): string {
  return [
    `<section id="${opts.code}" dir="${opts.dir}" lang="${opts.code}">`,
    `<h2>${escape(opts.label)}</h2>`,
    `<p>${escape(p.intro)}</p>`,
    '<ul>',
    `<li><a href="./privacy-policy.html">${escape(p.title)}</a></li>`,
    `<li><a href="./delete-account.html">${escape(p.deleteWebTitle)}</a></li>`,
    '</ul>',
    `<p class="contact"><a href="mailto:${CONTACT_EMAIL}">${CONTACT_EMAIL}</a></p>`,
    '</section>',
  ].join('\n');
}

(enabled ? it : it.skip)('builds the hostable policy and deletion pages', () => {
  const out = path.join(__dirname, '../../docs');
  mkdirSync(out, { recursive: true });

  const write = (name: string, html: string) =>
    writeFileSync(path.join(out, name), html, 'utf-8');

  const join = (render: (p: Privacy, o: (typeof LANGUAGES)[number]) => string) =>
    LANGUAGES.map((l) => render(l.privacy, l)).join('\n<hr />\n');

  write(
    'privacy-policy.html',
    page({
      title: `${en.common.appName} — ${en.privacy.title}`,
      heading: en.common.appName,
      body: [
        `<p class="tagline">${escape(en.privacy.title)}</p>`,
        languageNav(),
        '<hr />',
        join(renderLanguage),
      ].join('\n'),
    }),
  );

  write(
    'delete-account.html',
    page({
      title: `${en.common.appName} — ${en.privacy.deleteWebTitle}`,
      heading: en.common.appName,
      body: [
        `<p class="tagline">${escape(en.privacy.deleteWebTitle)}</p>`,
        languageNav(),
        '<hr />',
        join(renderDeletion),
      ].join('\n'),
    }),
  );

  write(
    'index.html',
    page({
      title: en.common.appName,
      heading: en.common.appName,
      body: [languageNav(), '<hr />', join(renderIndex)].join('\n'),
    }),
  );
});
