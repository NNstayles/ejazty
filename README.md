# Ejazty — إجازتي — ئیجازەتی

A study and mock-exam app for the Iraqi theoretical driving licence exam, in
Arabic, Kurdish (Sorani) and English.

Expo SDK 54 · React Native 0.81.5 · expo-router v6 · TypeScript

Minimum supported OS: **iOS 16.0** and **Android 8.0 (API 26)**, set in
`app.json` via `expo-build-properties`.

---

## Running it

```bash
npm start          # dev server + QR code (scan with Expo Go)
npm run android    # requires Android Studio + SDK
npm run ios        # requires macOS
npm run web        # browser
npm test           # jest
npm run typecheck  # tsc --noEmit
npm run lint
```

SDK 54 is pinned deliberately — Expo Go is versioned per SDK, so bumping it
breaks device testing until a matching client ships.

---

## Content status

No placeholder content ships any more. `examPool()` still filters on
`verified: true`, which stays as the guarantee that anything added later
without it cannot reach a graded attempt.

| Area               | Status | Source                                 |
| ------------------ | ------ | -------------------------------------- |
| Traffic signs      | ✅ 111 records + original artwork | العلامات المرورية (MoI, General Traffic Directorate) |
| Road markings      | ✅ included in the 111 | same manual, pp. 24–26 |
| Traffic lights     | ✅ included in the 111 | same manual, pp. 27–28 |
| Exam questions     | ⚠️ 26 transcribed (pages 1–3) + one derived per sign | دليل الأسئلة والأجوبة — pages 4–50 not yet transcribed |
| Rules / violations / priority | ⚠️ 14 / 14 / 11, general road-code material | conventions common to every road code, not transcribed from the manual |
| Dashboard lights   | ⚠️ 94 records, artwork not ours | a published car-symbol guide, not a ministry publication |

Two caveats worth reading before release:

- **`authority: 'federal-moi'` is not by itself evidence something came from the
  manual.** The dashboard set and everything in `data/general/` carry that label
  by product decision so the UNOFFICIAL badge stops appearing. Each file has a
  provenance note at the top saying what the material actually is; check that,
  not the label.
- **The dashboard artwork in `assets/dashboard/` is a third party's property**
  and carries their watermark. Replace it with original artwork before shipping
  — relabelling the authority did not change who owns the icons.

### Adding the remaining material

Records live under `src/content/data/official/`. Each needs a real `SourceRef`
(`authority`, `document`, `locator`) and `verified: true`. Add them to the
bundle in `data/official/index.ts`; nothing outside `src/content/` changes.
`examPool()` only ever returns `verified: true` questions, so anything added
without it cannot reach a graded attempt.

`validateBundle()` runs on every dev boot **and as a test** (`npm test`), so a
malformed record fails the suite rather than only warning in a console. It
reports duplicate ids, questions
with the wrong number of choices, and questions whose `correctChoiceId` matches
no choice.

### A note on the translations

Arabic is transcribed **verbatim** from the ministry publications. English and
Kurdish Sorani are translations of that Arabic and are **not** part of the
official source. Have a fluent speaker review them before release.

---

## Architecture

```
src/
  app/                      expo-router routes
    index.tsx               gate: language -> auth -> tabs
    language.tsx            first-run language picker
    (auth)/                 sign-in, sign-up
    (tabs)/
      learn/                section grid + [section] detail
      exam/                 mode picker, session runner, result
      settings/             preferences (index) + account management
  content/                  schema, registry, datasets  <- the pluggable seam
  features/
    auth/                   Supabase-backed AuthProvider, validation, errors
    exam/                   engine (draw, grade) + session store
    progress/               attempt cache + Supabase sync
    notifications/          reminder scheduling
supabase/migrations/        profiles, exam_attempts, delete_own_account
  i18n/                     en / ar / ckb + RTL handling
  preferences/              language, theme, notification prefs
  theme/                    design tokens + light/dark provider
  components/ui/            Text, Button, Field, Card, PressableScale...
```

### Exam rules

Defined in `src/features/exam/engine.ts`:

| Mode   | Questions | Time limit |
| ------ | --------- | ---------- |
| Quick  | 10        | 3 min      |
| Medium | 20        | 10 min     |
| Full   | 30        | 30 min     |

- Pass mark is **80%** (`PASS_THRESHOLD`). This comes from the official bank
  itself, which asks the pass mark as a question and marks 80% correct.
- Every question is multiple choice with **one correct option**. The official
  bank uses **three** options throughout; four is permitted by the type and by
  `validateBundle()` for any future material that needs it.
- Exams draw from the `signs`, `rules` and `priority` topics (`EXAM_TOPICS`).
- **At most half an attempt may be auto-derived sign-identification questions**
  (`MAX_DERIVED_SHARE`). There are 111 of those against 26 transcribed, so a
  uniform draw made a "full mock" mostly sign cards. It is a ceiling, not a
  quota: derived questions still cover any shortfall the transcribed bank
  cannot fill, so a full paper is never short.
- Questions and their choices are reshuffled per attempt, so answer position is
  never memorisable.
- Timed modes auto-submit at zero. Remaining time is derived from a fixed
  deadline, so it does not drift and does not pause while backgrounded.

The quick/medium time limits are a judgement call, not an official figure — the
3-minute quick exam matches the "10 questions. 3 minutes." reminder copy. Change
them in `EXAM_MODES`.

---

## Supabase auth

1. Create a project at [supabase.com](https://supabase.com).
2. Copy `.env.example` to `.env` and fill in `EXPO_PUBLIC_SUPABASE_URL` and
   `EXPO_PUBLIC_SUPABASE_ANON_KEY`.
3. Restart the dev server — env vars are inlined at build time, not hot-reloaded.

Until those are set, `isSupabaseConfigured` is false: the app still boots and the
sign-in screen explains what is missing. The **"Explore without an account"**
button is a guest path so the app is usable before Supabase exists — remove
`continueAsGuest` from `src/features/auth/auth-provider.tsx` and the button from
`sign-in.tsx` if you want sign-in to be mandatory.

Sign-up branches on whether Supabase returned a session: with email confirmation
on (the default) it shows a "check your email" notice; with it off the user is
already signed in and is routed to the tabs.

### Database

Apply everything in `supabase/migrations/` (`supabase db push`, or paste into
the dashboard SQL editor). Two migrations:

- **`user_progress`** — `profiles` and `exam_attempts`, both with row-level
  security restricting every operation to `auth.uid()`. A trigger creates the
  profile row at sign-up, so the app never meets a signed-in user without one.
- **`delete_own_account`** — a `security definer` function that deletes only
  `auth.uid()`. Account deletion cannot be done from the client: it needs the
  service-role key, and `EXPO_PUBLIC_` values are inlined into the bundle, so
  shipping that key would hand every installer a credential that bypasses RLS.
  **Until this is applied, deleting an account fails with `PGRST202`** and the
  app shows a specific "not set up on the server" message.

Study content deliberately stays bundled in the app — it must work offline and
for guests, and a graded attempt must never depend on a network call. Only user
data lives in the database.

Sync is **local first, push after**: an attempt is cached and rendered before
the network is touched, so a failed push costs the learner nothing. The cache
records its owner, which is what stops one person's history being shown to the
next account signed in on the same phone.

---

## Notifications

`src/features/notifications/` schedules **local** reminders — no push server,
works offline.

- **Four per day**, every five hours, at 07:00 / 12:00 / 17:00 / 22:00 local
  time (`REMINDER_HOURS`), each jittered by up to ±25 minutes so they don't feel
  mechanical.
- Those four slots are exactly five hours apart, with the overnight gap
  absorbing the rest of the day — waking hours only, so nobody is woken at 02:00.
- **No message repeats within the same day.** A day's four messages are drawn by
  shuffling the 13-message list and slicing, and the draw is persisted per date
  so a mid-day reschedule reuses it.
- All 13 messages are translated into all three languages
  (`notifications.items.*` in each locale file). Changing language re-queues
  pending reminders so text always matches the current language.
- Queued three days ahead and topped up on every app foreground.

**Testing caveat:** in SDK 53+, expo-notifications has reduced functionality in
Expo Go on Android. Use a development build (`npx expo run:android`) to verify
reminders properly.

---

## Languages and RTL

Arabic and Sorani are both right-to-left. Native layout mirroring goes through
`I18nManager.forceRTL`, which is process-wide and **only takes effect after a
full app restart**. `applyDirection()` reports whether a restart is needed and
Settings surfaces a notice. Adding `expo-updates` would let you call
`reloadAsync()` and remove the manual restart.

`src/i18n/locales/en.ts` is the source of truth for the translation shape; `ar`
and `ckb` are typed against it, so a missing key is a compile error rather than
a silent fallback.

> The Arabic and Sorani strings were written without a native reviewer. Have a
> fluent speaker proofread `ar.ts` and `ckb.ts` before release — particularly
> the reminder copy, which is idiomatic and hard to translate literally.

---

## Known gaps

- **Pages 4–50 of the question bank are not transcribed** — 26 questions of a
  much larger bank. The PDF text layer is unusable (the font encoding mis-maps
  ~75 codepoints and is not 1:1), so pages have to be rendered to images and
  read; see CLAUDE.md for the method.
- **Dashboard artwork is a third party's** and must be replaced before release.
- **Rules, violations and priority scenarios are general road-code material,**
  not transcribed Iraqi text. Penalties are described in kind, never as figures
   — a wrong fine printed with authority is worse than no fine.
- **English and Sorani are unreviewed translations.** Arabic is verbatim from
  the source. Have a fluent speaker proofread before release.
- Violation and rule records have no images; the schema has an optional `image`
  field and the UI renders it when present.
- No renderer/component tests — the suite covers pure logic and data only.
- Reminders cannot be verified in Expo Go; a development build is required.
