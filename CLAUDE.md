# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Project

**Ejazty** — a study and mock-exam app for the Iraqi theoretical driving licence exam, in Arabic, Kurdish (Sorani) and English. Expo SDK 54 · React Native 0.81.5 · expo-router v6 · TypeScript.

Routes live under `src/app/`, not a top-level `app/`. The `@/*` path alias maps to `./src/*`, and `@/assets/*` to `./assets/*`.

## Commands

```bash
npm start                          # dev server
npm run android | ios | web
npm run typecheck                  # tsc --noEmit
npm run lint                       # expo lint
npx expo-doctor                    # dependency/config health, 18 checks
npx expo export --platform ios     # bundles the full module graph — catches
                                   # unresolved imports that tsc misses
npx expo install --fix             # realign deps to the SDK manifest
npx expo start --tunnel            # when a device can't reach the LAN IP
```

**There is no test framework configured.** Verification is `npm run typecheck`, then `npx expo export` to prove the module graph resolves, then `npx expo-doctor`. If you add tests, `src/features/exam/engine.ts` is pure and the obvious first target (`gradeExam`, `buildExam`).

**Typed routes are generated, not committed.** `.expo/types/router.d.ts` and `expo-env.d.ts` are produced by running the dev server. A fresh clone will fail `typecheck` on route strings and CSS-module imports until `npm start` has run once. If route types look stale after changing the router version, delete `.expo/types` and restart the server.

## SDK 54 is pinned deliberately

Expo Go is versioned per SDK — a client only loads projects on its exact SDK. The target device runs the SDK 54 client, so upgrading the SDK breaks device testing until a matching Expo Go ships. Do not bump `expo` casually.

Consequence to remember: **expo-router v6 does not re-export the React Navigation theme helpers.** `DarkTheme`, `DefaultTheme`, `ThemeProvider` and `Theme` come from `@react-navigation/native` (an explicit dependency). They only moved into `expo-router` in v7.

## Content layer — the central abstraction

`src/content/` is the seam between the app and the official ministry material. Screens and the exam engine read **only** from `registry.ts`; nothing imports files under `data/` directly.

- `schema.ts` — every content type extends `Sourced`, so `id`, a `SourceRef` (authority, document, locator) and a `verified` boolean are mandatory. An unsourced record is meant to be impossible to add without noticing. `validateBundle()` runs on dev boot and reports duplicate ids, bad choice counts, and questions whose `correctChoiceId` matches no choice.
- `registry.ts` — merges bundles (highest-trust first), then exposes derived views: `roadSigns`, `markingsAndLights`, `prioritySigns`, and `examPool()`.
- `data/official/` — transcribed ministry content. `data/sample.ts` — placeholder for areas not yet transcribed.

Two invariants worth preserving:

1. **`examPool()` excludes unverified questions the moment any verified question exists.** Until then it serves the sample set so the exam flow stays testable. A real attempt is never scored against placeholder material.
2. **Placeholder status is tracked per area** (`sampleAreas`), not globally, because signs are fully transcribed while the question bank is not. `<SampleBanner area="…" />` renders only for areas still on placeholder data. A single global flag would wrongly clear the warning on the Exam tab.

### Content status

Signs are done: 111 records with original artwork under `assets/signs/`, covering regulatory, warning, informative, road markings and traffic lights. **Exam questions, violations and traffic-rule text are still placeholder.**

The official question bank (`دليل الأسئلة والأجوبة`, 431 questions) has not been transcribed. Its PDF text layer is unusable — the font encoding mis-maps ~75 codepoints and is not 1:1 (ligatures split across glyphs), so deriving a remap table silently corrupts answers. The working method is to render pages to images and read them, while detecting the correct answer programmatically: the correct option carries FontAwesome glyph `` in colour `#dc3545`, distractors carry ``.

**Arabic is verbatim from the source; English and Sorani are unreviewed translations.** Do not present them as official.

## Exam engine

`features/exam/engine.ts` is pure (draw, shuffle, grade). `features/exam/exam-session.tsx` holds attempt state and is mounted in the exam **stack layout**, so an in-progress attempt survives navigation between the runner and the result screen.

- `PASS_THRESHOLD = 0.8` — from the official bank itself, which asks the pass mark as a question and marks 80% correct. It is not 60%.
- Questions carry **3 or 4 choices** (the official bank uses 3 throughout), one correct, enforced by `ChoiceSet` and `validateBundle`.
- Exams draw only from the `signs` and `priority` topics.
- Questions and choices reshuffle per attempt; timed modes auto-submit at zero.

The countdown reads `latest.current` (a ref refreshed each render) so the timer never closes over stale answers when auto-submitting.

## i18n and RTL

`src/i18n/locales/en.ts` is the **typed source of truth**. `ar.ts` and `ckb.ts` are declared as `TranslationShape`, so a missing or misspelled key is a compile error rather than a silent runtime fallback. Add keys to `en.ts` first.

Arabic and Sorani are both RTL. Layout mirroring goes through `I18nManager.forceRTL`, which is process-wide and **only takes effect after a full app restart**. `applyDirection()` returns `{ needsRestart }`; Settings surfaces a notice rather than pretending the switch was instant.

## Provider order

`src/app/_layout.tsx` nests providers in a required order: `SafeAreaProvider` → `PreferencesProvider` → `AppThemeProvider` → `AuthProvider`. Theme resolves `light | dark | system` from preferences, so it must sit inside it. Rendering is gated on `preferences.ready` so persisted language/theme apply before first paint.

`src/app/index.tsx` is the routing gate: language picker → auth → tabs. It waits for `auth.ready` before deciding, so a signed-in user is not bounced to sign-in on a cold start.

## Notifications

`features/notifications/` schedules **local** reminders — no push server. Four a day at `REMINDER_HOURS` with ±25 min jitter, queued three days ahead and topped up on every foreground.

Two things that constrain edits:

- **Reminder text is baked in at schedule time**, so changing language must cancel and re-queue everything (`rescheduleForLanguageChange`).
- **No message repeats within a calendar day.** A day's four messages are drawn by shuffling the 13-message list and slicing, and the draw is persisted per date so a mid-day reschedule reuses it rather than risking a collision.

Reminders cannot be verified in Expo Go — `expo-notifications` is restricted there. A development build is required.

## Auth

Supabase, via `EXPO_PUBLIC_SUPABASE_URL` / `EXPO_PUBLIC_SUPABASE_ANON_KEY` in `.env` (gitignored; inlined at build time, so restart the dev server after editing).

`supabase` is **null when unconfigured** — every caller must handle that, and the app is designed to boot and be explorable without it. A guest path (`continueAsGuest`) exists for that reason. Sign-up assumes Supabase's default email-confirmation flow, so it shows a "check your email" notice instead of routing into the tabs.

Exam history is on-device only (`AsyncStorage`); nothing syncs to Supabase yet.
