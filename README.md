# Ejazty — إجازتي — ئیجازەتی

A study and mock-exam app for the Iraqi theoretical driving licence exam, in
Arabic, Kurdish (Sorani) and English.

Expo SDK 57 · React Native 0.86 · expo-router · TypeScript

---

## Running it

```bash
npm start          # dev server + QR code (scan with Expo Go)
npm run android    # requires Android Studio + SDK
npm run ios        # requires macOS
npm run web        # browser
npm run typecheck  # tsc --noEmit
```

---

## Content status

Placeholder status is tracked **per area** (`sampleAreas` in
`src/content/registry.ts`), and the warning banner renders only for areas that
are still placeholder. Shipping real content removes it automatically.

| Area               | Status | Source                                 |
| ------------------ | ------ | -------------------------------------- |
| Traffic signs      | ✅ 111 records + original artwork | العلامات المرورية (MoI, General Traffic Directorate) |
| Road markings      | ✅ included in the 111 | same manual, pp. 24–26 |
| Traffic lights     | ✅ included in the 111 | same manual, pp. 27–28 |
| Road priority      | ⚠️ 14 priority signs, no rule text | derived from the signs manual |
| Exam questions     | ❌ placeholder | دليل الأسئلة والأجوبة — 431 questions, not yet transcribed |
| Traffic violations | ❌ placeholder | no source supplied |

**The Exam tab is still placeholder and must not be used to study.**

### Adding the remaining material

Records live under `src/content/data/official/`. Each needs a real `SourceRef`
(`authority`, `document`, `locator`) and `verified: true`. Add them to the
bundle in `data/official/index.ts`; nothing outside `src/content/` changes.
`examPool()` stops serving unverified questions the moment any verified
question exists.

`validateBundle()` runs on every dev boot and reports duplicate ids, questions
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
      settings.tsx          account + app preferences
  content/                  schema, registry, datasets  <- the pluggable seam
  features/
    auth/                   Supabase-backed AuthProvider
    exam/                   engine (draw, grade) + session store
    notifications/          reminder scheduling
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
- Exams draw only from the `signs` and `priority` topics.
- Questions and their choices are reshuffled per attempt, so answer position is
  never memorisable.
- Timed modes auto-submit at zero.

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

Sign-up assumes Supabase's default email-confirmation flow, so it shows a
"check your email" notice rather than dropping the user straight into the tabs.

---

## Notifications

`src/features/notifications/` schedules **local** reminders — no push server,
works offline.

- **Four per day**, the every-six-hours cadence, at 09:00 / 13:00 / 17:00 /
  21:00 local time (`REMINDER_HOURS`), each jittered by up to ±25 minutes so
  they don't feel mechanical.
- Hours are confined to waking time rather than literal 6-hour spacing, to avoid
  a 03:00 notification. For strict spacing use `[0, 6, 12, 18]`.
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

- Content is placeholder (see above).
- Sign, violation and priority records have no images yet; the schema has an
  optional `image` field and the UI renders it when present.
- Exam history is stored on-device only. Syncing it to Supabase would need a
  table plus row-level security.
- No automated tests yet. `src/features/exam/engine.ts` is pure and the obvious
  first target — `gradeExam` and `buildExam` in particular.
