# Supabase security checklist

Some of this project's security posture lives in code and is reviewable here.
The rest used to live in **dashboard settings that no file in this repository
could assert** — an unset toggle looks identical to a set one from the outside.

**Most of that is now `supabase/config.toml`.** Password policy, secure email
change, secure password change, the mail throttle and the rate limits are
version-controlled, diffable, and reproducible after a restore. What genuinely
cannot be expressed as config is called out explicitly below, and there is
exactly one such item left: the leaked-password (HIBP) check.

Work through this before any public release, and again after any project
restore or migration to a new Supabase project.

---

## 0. The threat model, in one paragraph

This is a mobile app with **no server of its own**. `EXPO_PUBLIC_` values are
inlined into the JS bundle at build time, so the anon/publishable key is
extractable from any APK or IPA by unzipping it. That is by design and is not a
leak — but it means **"only our app calls this" is never true**. Anyone can talk
to PostgREST and GoTrue directly with a key they extracted in thirty seconds.

Every guarantee therefore has to hold at the database or at GoTrue. Client-side
route gating (`(tabs)/_layout.tsx`) is UX, not a boundary.

---

## 1. Apply the migrations, in order

```bash
supabase db push
```

Or paste each into the dashboard SQL editor, in filename order:

| Migration | What it establishes |
| --- | --- |
| `20260803125300_delete_own_account.sql` | `security definer` RPC deleting only `auth.uid()`. Without it, account deletion fails `PGRST202`. |
| `20260803140000_user_progress.sql` | `profiles` + `exam_attempts`, RLS enabled, owner-only policies, `on_auth_user_created` trigger. |
| `20260803160000_harden_exam_attempts.sql` | Cross-column integrity: `passed = (percent >= 80)`, `taken_at` not future, `user_id default auth.uid()`. |
| `20260803170000_bound_user_input.sql` | Size bounds: `display_name` ≤ 80, `client_id` 1–64, 2000 attempts/user. |
| `20260803180000_defensive_display_name.sql` | Truncates `full_name` in `handle_new_user`, so an over-long name cannot abort account creation. |
| `20260803190000_assert_rls_invariant.sql` | `assert_rls_enabled()`, and calls it — the push **fails** if any public table lacks RLS or policies. |
| `20260804120000_tighten_user_data.sql` | `percent` must match `correct`/`total`; no blank `display_name` or `client_id`; `assert_expected_triggers()`, and calls both assertions. |
| `20260804130000_require_recent_reauth.sql` | `delete_own_account()` now requires a **recent password authentication** (`amr`, falling back to `iat`), so a stolen token replayed straight at PostgREST cannot destroy an account. |
| `20260804140000_bound_user_metadata.sql` | Bounds `auth.users.raw_user_meta_data` — the one client-writable store that cannot take a CHECK. Adds the `bound_user_metadata` trigger to `assert_expected_triggers()`. |
| `20260806090000_pass_threshold_60.sql` | Moves the server-side pass rule to `passed = (percent >= 60)` and admits the `open` mode. **Re-grades history** — see the migration's own note. Without it every attempt scoring 60–79 is rejected and stops syncing, silently. |
| `20260807120000_widen_rls_invariant.sql` | Widens `assert_rls_enabled()` from `relkind = 'r'` to every relation PostgREST exposes — partitioned tables, and **views without `security_invoker`**, which read through RLS on their base tables. See §2. |
| `20260808130000_question_stats.sql` | `question_stats` — one row per question per user, RLS enabled, owner-only policies, cross-column CHECKs tying `last_correct` to the counters, and a 2000-row quota trigger. |
| `20260808140000_admit_drill_mode.sql` | Admits the `drill` exam format to `exam_attempts_mode_check`. Without it every drill attempt is rejected and, because the push is one batch upsert, takes every *other* attempt travelling with it — silently. |
| `20260808150000_restore_metadata_trigger_assert.sql` | Puts `bound_user_metadata` back into `assert_expected_triggers()`, which `20260808130000` dropped in passing. See the warning below. |

All fourteen are re-runnable; every statement is guarded.

> **`assert_expected_triggers()` is redefined by four of these, and each one
> replaces the whole list rather than adding to it.** That is how
> `bound_user_metadata` went missing between `20260804140000` (which added it)
> and `20260808130000` (which added `question_stats_quota` and dropped it on the
> way past) — for four days the assertion built to notice a missing trigger was
> blind to that one. Nothing was exposed, because the trigger itself was still
> installed; what was lost was the alarm.
>
> When the next migration touches a trigger, **copy the current `values` block
> in full rather than retyping it**, and check with:
>
> ```bash
> grep -n "'bound_user_metadata'" supabase/migrations/*.sql
> ```
>
> which should match the migration that creates it and every later redefinition
> of the assertion.

> Note the *third* column that does not exist here: the `20260803160000` row
> says `passed = (percent >= 80)`, which was true when it was written and is no
> longer — `20260806090000` supersedes it. The table lists what each migration
> **established**, not the current state; read the latest migration touching a
> rule for that.

### Note on `20260804140000`

`20260803170000` bounded every client-writable column in `public`. It could not
bound `auth.users.raw_user_meta_data`, because that is GoTrue's table and a
CHECK constraint on it risks a future GoTrue migration failing against something
it knows nothing about — which breaks auth outright. So it is a **BEFORE
trigger**, which is reversible: dropping it restores stock behaviour exactly.

`updateUser({ data })` writes straight into that column, and the anon key ships
in the bundle by design, so one throwaway signup is enough to script GoTrue and
PUT megabytes of arbitrary JSON into a row that passes every policy here. Bounds
are 4 KB total, 32 keys, and `full_name` truncated to 80 (the fourth site that
number now lives at — see `MAX_NAME_LENGTH`).

**The `tg_op` guard is the part to preserve.** The check runs only when the
metadata is actually *changing*. GoTrue writes to `auth.users` on every sign-in
(`last_sign_in_at`), so a version that validated on every write would leave any
account already holding an oversized blob **unable to sign in**, permanently,
with no way to fix it from the client — turning a storage bound into a lockout.

Then push the project configuration, which is new and is described in §4:

```bash
supabase config push        # read the diff — do NOT pass --yes the first time
```

> **Verified applied on 2026-08-04.** `supabase migration list` showed
> `20260803170000`, `20260803180000` and `20260803190000` present locally but
> **missing from the remote database** — so the live project had no size bounds,
> no attempt quota, and no RLS assertion. All are now pushed, and
> `assert_rls_enabled()` plus `assert_expected_triggers()` both returned clean,
> which is the first time §2 has been confirmed against the real database rather
> than inferred from the files. Re-check with `supabase migration list` after any
> restore; a migration existing in this directory proves nothing about the
> project it was written for.

> **`20260803180000` is a bug fix, not hardening.** The bound added by
> `20260803170000` applies to a column `handle_new_user` writes *inside* the
> `auth.users` insert, so before this migration a signup with a name longer than
> 80 characters raised `check_violation`, rolled the registration back, and
> reached the client as a generic "something went wrong" that retrying could
> never fix. The client now bounds the field too (`MAX_NAME_LENGTH`), but the
> anon key ships in the bundle — a signup posted by anything other than this app
> must not be able to trip it either.

---

## 2. Verify RLS actually landed

**This is now enforced, not just documented.**
`20260803190000_assert_rls_invariant.sql` installs `assert_rls_enabled()` and
calls it at the end of the push, so applying the migrations to a project where a
table is missing RLS or has no policies **fails loudly** instead of shipping.
`20260807120000_widen_rls_invariant.sql` widens it to cover every relation
PostgREST actually exposes — see "Views are the gap that was open" below.

Re-run it any time — after restoring a backup, or after adding a table by hand:

```sql
select public.assert_rls_enabled();
```

Success is a silent `void`. A violation raises with the offending table names
and a hint. The function is revoked from `anon` and `authenticated`, so it is a
maintenance tool rather than a PostgREST endpoint that enumerates your schema.

The underlying query is still worth running by eye, because it reports the
*shape* of what is there rather than only whether it is acceptable:

```sql
select c.relname                as table_name,
       c.relrowsecurity         as rls_enabled,
       count(p.polname)         as policies
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
  left join pg_policy p on p.polrelid = c.oid
 where n.nspname = 'public'
   and c.relkind = 'r'
 group by 1, 2
 order by 1;
```

**Expected:**

| table_name | rls_enabled | policies |
| --- | --- | --- |
| `exam_attempts` | `true` | 4 |
| `profiles` | `true` | 3 |

Two failure shapes, both of which look like ordinary bugs rather than security
problems:

- **`rls_enabled = false`** — the table is readable by anyone holding the anon
  key. This is the one that leaks data.
- **`rls_enabled = true`, `policies = 0`** — every query silently returns zero
  rows. Gets misdiagnosed as a broken feature and "fixed" by disabling RLS,
  which converts it into the first case.

Any table appearing here that is not in the list above was created outside the
migrations (usually via the SQL editor) and needs its own policies.

### Views are the gap that was open until 2026-08-07

The original assertion filtered on `c.relkind = 'r'` — **ordinary tables only**.
PostgREST exposes more than that, and the rest was invisible to it. The one that
matters is views: **a view executes with the privileges of its OWNER unless it
was created `with (security_invoker = on)`**, so it reads straight *through* the
row level security on its base tables. Views carry no `relrowsecurity` of their
own, so the old query could not have caught one even if it had selected them.

Three lines in the SQL editor is all it takes:

```sql
create view public.leaderboard as
  select p.display_name, a.percent
    from public.exam_attempts a join public.profiles p on p.id = a.user_id;
```

Every user's name and score, readable by `anon`. `supabase db push` reports
success. Nothing in a code review sees it, because the view is not in this
directory either.

`20260807120000_widen_rls_invariant.sql` closes it. The assertion now covers
`'r'` and `'p'` (tables, partitioned tables) for RLS + policies, and separately
reports any `'v'`, `'m'` or `'f'` in `public` that is not `security_invoker`.
Matviews and foreign tables have no equivalent opt-in and are always reported —
the correct answer for both is to move them out of `public` so PostgREST does
not expose them at all.

Run this by eye alongside the table query above; it should return **no rows**:

```sql
select c.relname,
       c.relkind,     -- v = view, m = matview, f = foreign table
       c.reloptions
  from pg_class c
  join pg_namespace n on n.oid = c.relnamespace
 where n.nspname = 'public'
   and c.relkind in ('v', 'm', 'f')
   and not coalesce(c.reloptions @> array['security_invoker=on'], false);
```

**Mutation-check the assertion after touching it** — one that passes under a
broken state is worse than none:

```sql
create view public.leak as select * from public.exam_attempts;
select public.assert_rls_enabled();   -- must RAISE

drop view public.leak;
create view public.leak with (security_invoker = on)
  as select * from public.exam_attempts;
select public.assert_rls_enabled();   -- must PASS

drop view public.leak;
```

Confirm no policy trusts user-writable identity — this must return **no rows**:

```sql
select polname, pg_get_expr(polqual, polrelid) as using_expr
  from pg_policy
 where pg_get_expr(polqual, polrelid) ilike '%user_metadata%'
    or pg_get_expr(polwithcheck, polrelid) ilike '%user_metadata%';
```

`user_metadata` is writable by the end user (`updateUser({ data })`), so a
policy reading it lets anyone rename their way into someone else's rows. Every
policy here uses `auth.uid()`.

---

## 3. Auth → URL Configuration — now in `config.toml`

Redirect URLs live in `auth.additional_redirect_urls`, and the list is
**exactly one entry**:

```toml
additional_redirect_urls = [
  "ejazty://reset-password",
]
```

### An `exp://` entry here is an account-takeover path. Do not add one.

This list used to carry `exp://192.168.1.225:8081/--/reset-password` so recovery
could be tested under Expo Go. **The 2026-08-07 security review found that and
it was removed.** Understand why before adding it back, because the reasoning is
not obvious and PKCE does *not* cover it:

1. The anon key is extractable from any APK, so **anyone** can call
   `resetPasswordForEmail(victim, { redirectTo: <any allow-listed URL> })`.
   Their supabase-js client mints and stores the PKCE `code_verifier`.
2. The mail reaches the **victim's** inbox — correctly — but the link inside it
   points at `192.168.1.225:8081`.
3. Anyone able to answer on that address (same LAN, or that IP later reassigned)
   receives the one-time `?code=` the moment the victim taps it.
4. They exchange it using the verifier from step 1. **The account is theirs.**

PKCE normally makes an intercepted code inert because the interceptor lacks the
verifier. Here the interceptor is also the *initiator*, so they hold it. The
allow-list is the only control that stops this.

### Testing recovery under Expo Go without reopening the hole

`Linking.createURL('/reset-password')` resolves to `exp://<lan-ip>:8081/--/…`
under Expo Go, which no longer matches — so the mail falls back to `site_url`
and never reaches the app. **That is the intended, safe default.** Pick one:

| | Approach | Trade |
| --- | --- | --- |
| **a** | A **separate Supabase project** for development, with the `exp://` form allow-listed there | Best. Nothing dev-only ever exists in the live project. |
| **b** | Add it in the **dashboard**, test, remove in the same sitting | Never commit it. This is the one that goes wrong — it is a manual step that has to be undone, and forgetting is how it got here. |
| **c** | Test on a **development or preview build** | Produces `ejazty://reset-password`, which matches. |

Prefer (a) or (c).

### `site_url` is a dead link, deliberately

It is `http://localhost:3000`. There is no website; this is only the fallback
used when a `redirectTo` misses the allow-list, and nothing serves localhost on
a phone.

**Leave it that way.** The obvious "fix" — pointing it at
`ejazty://reset-password` so the fallback at least opens the app — is the wrong
trade for the reason above: a custom scheme is not exclusive, Android lets any
installed app register `ejazty://`, and `site_url` is both the catch-all
redirect *and* the default for any future email template. That is a broad hijack
surface bought for testing convenience. A URL that resolves to nothing hands
nothing to anybody.

The real fix, once a domain exists, is a verified App Link / Universal Link — an
`https` URL the OS proves belongs to this app. That is the only form worth
putting here.

> The app pins `flowType: 'pkce'` (`src/lib/supabase.ts`). Recovery and sign-up
> confirmation links therefore arrive as `?code=`, **not** as
> `#access_token=&refresh_token=`. Do not switch the project back to implicit:
> a custom scheme is not exclusive on Android, so under implicit a hostile app
> registering `ejazty://` reads a live session out of the link. `recovery.ts`
> still parses both shapes defensively, and `redeemableLink()` refuses to *act*
> on the implicit shape — but only PKCE makes interception inert.

---

## 4. Account-security settings — now `supabase/config.toml`, except one

These used to be three dashboard toggles that no file could assert. They are now
**pinned in `supabase/config.toml`** and applied with `supabase config push`:

| Setting | Key | Closes |
| --- | --- | --- |
| Minimum password length 8 | `auth.minimum_password_length` | §4.3 |
| Secure email change | `auth.email.double_confirm_changes` | §4.2 |
| Secure password change | `auth.email.secure_password_change` | §4.2 |
| Per-user mail throttle | `auth.email.max_frequency` | §4.1 / §5 |
| Rate limits | `[auth.rate_limit]` | §5 |

> ### ⚠️ `config push` applies immediately. It does not prompt.
>
> **A `--yes` flag is listed in the global flags, which makes it look like there
> is a confirmation step. There is not.** `supabase config push` prints its diff
> *as it applies it*. Redirecting stdin does not stop it either.
>
> And it sends a **whole configuration, not a patch** — any key the file omits
> goes up at the CLI's default. On 2026-08-04 that combination silently:
>
> - switched **TOTP MFA off** (`[auth.mfa.totp]` was not in the file)
> - shortened **`otp_length` from 8 to 6**
> - overwrote the real `exp://` dev redirect URL with a guessed one
>
> All three were restored, and all three are now stated explicitly below so the
> same omission cannot repeat. But the lesson generalises: **a key absent from
> `config.toml` is not "leave it alone", it is "reset it to the CLI default".**
>
> Before editing this file, run `supabase config push` once with no changes and
> confirm it reports `Remote Auth config is up to date`. That proves the file
> matches reality. Then make one change at a time and read each diff.

**Two things still need a human.** `[ ] Enable leaked-password protection`
(§4.3) has no config key at all. CAPTCHA (§4.1) has a key, but taking it means
taking a native module.

### Why the client-side re-auth is not the answer on its own

> **Client-side rate limiting on the gate.** `reauthenticate` now allows five
> wrong passwords before a one-minute lockout, persisted so a force-quit does
> not clear it. That is a client control, and normally worth nothing — but the
> attacker it faces is the one holding an unlocked phone and driving the app's
> own UI. `auth.rate_limit.sign_in_sign_ups` is **per IP and shared with real
> sign-ins**, so it cannot be tightened for this screen without throttling
> ordinary people on a shared network, and GoTrue has no per-account lockout at
> all. Without it the account screen accepted ~30 guesses every five minutes,
> indefinitely, in front of an irreversible delete. It does nothing against
> someone scripting GoTrue directly — but that caller never runs this function,
> so the two controls cover different attackers rather than duplicating.

`features/auth/reauth.ts` re-checks the current password before a password
change, an email change and account deletion. That check is real, and it closes
the borrowed-unlocked-phone case, which is the common one.

**It runs in the client, and the client is not a boundary.** The anon key ships
in the bundle, so an attacker holding a stolen access token posts straight to
GoTrue or PostgREST and never executes it. Every one of the three operations
therefore needs a server half, and all three now have one:

| Operation | Client half | Server half |
| --- | --- | --- |
| Change password | `reauthenticate()` | `secure_password_change` |
| Change email | `reauthenticate()` | `double_confirm_changes` |
| Delete account | `reauthenticate()` | `amr` freshness check inside `delete_own_account()` |

Neither half substitutes for the other. The docstring on `reauth.ts` used to
claim the broader protection; it now says which half it is.

### 4.1 CAPTCHA — deferred, as an accepted risk

**Decision, 2026-08-04: not enabling it. Reaffirmed 2026-08-07 (security
review), with custom SMTP chosen as the interim control instead — see §6.**

Every CAPTCHA widget is a native module, so taking one means taking a
development build and giving up Expo Go — the workflow SDK 54 is pinned
specifically to preserve. That cost is real and the residual risk is bounded, so
the trade was taken deliberately rather than by omission.

What bounds it in the meantime, all now pinned in `config.toml`:

- `auth.email.max_frequency = "1m0s"` — one mail per address per minute
- `[auth.rate_limit]` — per-IP caps on sign-ups, sign-ins and verifications
- `auth.rate_limit.email_sent` — project-wide hourly ceiling
- **custom SMTP (§6)** — replaces the low built-in ceiling with one too large to
  drain in an afternoon. This is the control the 2026-08-07 review chose in
  preference to CAPTCHA, because it needs no native module and no dev build.

#### Do not "harden" this by lowering `email_sent`

The 2026-08-07 review initially recommended halving it, then withdrew the
recommendation. Recording why, because the instinct is a natural one and it is
wrong: **both `email_sent` and the built-in ceiling are per-hour budgets**, so a
lower number does not shorten the window in which recovery is denied. It makes
the budget *cheaper for a script to exhaust* (15 requests instead of 30) while
also throttling real users sooner. Raise it to match the provider once custom
SMTP is live; do not lower it.

#### What the deferral actually leaves open

Stated plainly so it is not understated: the rate limits are **per IP**, so a
*distributed* attacker defeats them, and nothing else distinguishes a script
from the app. That is the residual exposure being accepted.

**Revisit when any of these happens** — do not wait for a review to ask:

- A public release. "Anyone can extract the anon key" stops being theoretical
  the moment the app is on a store listing.
- The first time a development build is needed for another reason. The blocking
  cost disappears and this becomes a one-file change.
- The first sign of scripted signups in the auth logs.
- The move to Pro — turn on leaked-password protection at the same time (§4.3).
  The two are the same afternoon's work.

A commented `[auth.captcha]` block is ready in `config.toml`; it needs a provider
secret and a widget. Without it, `POST /auth/v1/signup` and `POST
/auth/v1/recover` remain open to anyone holding the extracted anon key. The two
realistic abuses:

1. **Email quota exhaustion** — scripted signups and resets burn the project's
   send allowance, after which *legitimate users cannot reset their passwords*.
   A denial of service against your own recovery flow.
2. **Sender reputation damage** — mass unsolicited recovery mail generates spam
   complaints and can get a custom sending domain blocklisted, which is slow
   and expensive to undo.

Once enabled, GoTrue rejects requests without a `captchaToken` and the client
must send one.

**The client-side plumbing is already in place.** `src/features/auth/captcha.ts`
is the seam, and all **four** unauthenticated GoTrue call sites in
`auth-provider.tsx` already ask it for a token and spread the result:

| Call site | Action |
| --- | --- |
| `signIn` | `'signin'` |
| `signUp` | `'signup'` |
| `requestPasswordReset` | `'recover'` |
| `reauthenticate` — used by `updatePassword`, `updateEmail` and `deleteAccount` | `'signin'` |

That fourth one is the easy one to miss: it goes to the same
`/token?grant_type=password` endpoint as sign-in, so without a token *changing
your password* would fail with `captcha_failed` while signing in worked.

Until a provider is registered, `captchaTokenFor` resolves to `undefined` and
nothing is attached — exactly the behaviour that came before. So **the remaining
work is one file**:

1. Add a CAPTCHA component (`@hcaptcha/react-native-hcaptcha` or the Turnstile
   equivalent). This is the real cost of the change: it is a **native module**,
   so it needs a **development build and will not run in Expo Go** — which this
   project pins SDK 54 specifically to keep working. Weigh that deliberately.
2. Register it once during start-up:

   ```ts
   import { setCaptchaProvider } from '@/features/auth/captcha';

   setCaptchaProvider(async (action) => showChallenge(action));
   ```

Every call site is then covered at once. `authErrorKey` already maps
`captcha_failed` to `auth.errors.captchaFailed`, so a misconfiguration between
the dashboard and the app reads as "this app needs updating" rather than as
"wrong email or password".

**The seam fails open on purpose.** A provider that throws, or never settles
(10s cap), yields no token and the request still goes up — because *GoTrue* is
the authority on whether that is acceptable. Failing closed would lock every
user out of a correctly configured project the moment a third-party widget
failed to load.

### 4.2 Secure email change — ✅ pinned in `config.toml`

`auth.email.double_confirm_changes = true`, plus
`auth.email.secure_password_change = true` alongside it.

*(Dashboard equivalent, if you apply by hand: Authentication → Providers →
Email → Secure email change.)*

With it off, only the *new* address confirms a change.

This is the server half of the account-takeover defence; `updateEmail` in
`auth-provider.tsx` is the client half, and **neither substitutes for the
other**:

- The client now re-authenticates before starting the change, which stops it
  being initiated from an unlocked phone.
- This toggle makes the **old** address confirm too, which stops the change
  completing if a session was taken some other way — a stolen refresh token, a
  restored backup, a session left signed in on a shared device.

With both off, the path is short and complete: change the address to one you
control, confirm from your own inbox, then run a password reset. The account is
yours and the real owner has no way back in, because the address the recovery
mail would go to is no longer theirs.

### 4.3 Password policy — half pinned, half still a dashboard toggle

**Authentication → Policies.**

- [x] **Minimum length 8** — now `auth.minimum_password_length = 8` in
      `config.toml`, matching `MIN_PASSWORD_LENGTH` in
      `src/features/auth/validation.ts`.
- [x] **Guessability check** — implemented in the client, see below.
- [ ] **"Prevent use of leaked passwords" (HIBP)** — **blocked: it is a Pro-plan
      feature and this project is not on Pro.** There is no `config.toml` key for
      it either. Tick it the day the project upgrades; it composes with the
      client-side check rather than replacing it, and it is the only version that
      cannot be bypassed.

The length item mattered more than it looked. The client enforces 8 and the
tests pin it, but **GoTrue's own default is 6** — so until it was pinned the
client's minimum was advisory, and anything posting straight to
`/auth/v1/signup` with the extracted anon key could register a six-character
password this app would never have accepted.

### What stands in for HIBP meanwhile

`src/features/auth/password-strength.ts`, called from sign-up, password change
and password reset. It is what NIST SP 800-63B §5.1.1.2 actually prescribes — a
comparison against known-common values, which the standard explicitly permits to
be a curated list rather than a full breach corpus. It covers:

- a bundled base list, matched after stripping padding and undoing leet
  substitutions, so one entry covers `password` / `password1` / `P@ssw0rd123!`
- structural rules a list can never cover: all-digit (dates, phone numbers,
  ID numbers), single-character, repeated units, sequential and keyboard walks
- context-specific words — the user's own display name and email local part,
  and the app's own vocabulary — which NIST names explicitly
- region-specific entries a generic English list would miss entirely

**Why client-side is acceptable here when it was not for `reauth.ts`:** the
threat is credential stuffing, which succeeds because a *real user* chose a
breached password — and a real user chooses it through this app. Someone
bypassing the app to register a weak password at GoTrue only weakens their own
throwaway account.

The deliberate rejection was a client-side call to HIBP's k-anonymity range API.
It would have added a third-party network dependency to an app that talks to
nothing but Supabase, plus an app-store privacy disclosure, to catch a long tail
of passwords no real user picks. Cost outweighed the gain; revisit only if the
project stays off Pro *and* evidence of stuffing appears.

Character-class requirements (`auth.password_requirements`) are deliberately
left empty: they push people toward `Password1!` — which satisfies every such
rule and is in every cracking dictionary — and are discouraged by NIST SP
800-63B. Length plus a guessability check is the pair that works.

`authErrorKey` already maps `weak_password` to `auth.errors.weakPassword`, so
both rejections surface in the user's own language rather than as English from
Supabase.

---

## 5. Rate limits — ✅ pinned in `config.toml`

Defaults are permissive for a public app whose key is extractable. The
`[auth.rate_limit]` block now states every one of them, so a dashboard change
shows up here as a diff rather than as nothing at all.

> **This mattered more than CAPTCHA, and cost nothing.** Enabling CAPTCHA means
> taking a native module and therefore a development build — a real decision
> with a real cost, and one this project pins SDK 54 specifically to avoid
> forcing. These numbers bound the same abuse with no build, no client code and
> no new dependency.

The single most valuable line is not in that block at all — it is
`auth.email.max_frequency = "60s"` under `[auth.email]`. The stock template
ships `"1s"`, which lets one address burn the project's hourly send allowance in
under a minute, after which *legitimate users cannot reset their passwords*.

If real users start hitting one of these, raise **that** number. Do not raise
all of them, and do not remove the block — an absent block is not "defaults", it
is whatever the dashboard happens to hold.

`authErrorKey` maps both `over_request_rate_limit` and
`over_email_send_rate_limit` to `auth.errors.rateLimited`, so a throttled user
sees "wait a moment" in their own language rather than an English error.

---

## 6. Auth → SMTP — the chosen answer to mail exhaustion

- [ ] **Configure custom SMTP before public release.**

**Promoted from a nice-to-have to the primary interim control by the 2026-08-07
review.** A commented `[auth.email.smtp]` block is ready in `config.toml` with
the full procedure; this section is the why.

### The problem

The anon key is extractable from any APK, so anyone can script
`resetPasswordForEmail` against arbitrary addresses. The cost is not disclosure
— it is the hourly send allowance, and once that is gone **legitimate users
cannot reset their passwords** until the hour rolls over. The built-in Supabase
SMTP service has a deliberately low ceiling (documented as not for production
volume), which is exactly what makes the abuse cheap.

### Why this rather than CAPTCHA

CAPTCHA is the stronger control and remains the eventual answer (§4.1). It is
deferred because every widget is a native module that will not run in Expo Go.
Custom SMTP bounds the same abuse with **no native module, no development build,
and no client change at all**.

It does not make the abuse impossible — a script can still send mail. It removes
the *cliff*: a provider ceiling in the tens of thousands per month cannot be
drained in an afternoon the way a built-in one can, and `max_frequency` still
caps any single address at one mail per minute.

### Steps

1. Pick a transactional provider (Resend, Postmark, SendGrid, SES).
2. **Verify the sending domain and publish SPF + DKIM.** Skipping this is how
   recovery mail lands in spam — which denies password recovery just as
   effectively as exhausting a quota does.
3. Put the password in the environment, **never in `config.toml`** — that file
   is committed. Use `env()` indirection:
   ```bash
   export SUPABASE_SMTP_PASS='...'
   ```
4. Uncomment the `[auth.email.smtp]` block, fill in host/port/user/sender, and
   `supabase config push` **without `--yes`**, reading the diff.
5. Send yourself a real password reset. Confirm it arrives, is not flagged as
   spam, and the link opens the app.
6. **Raise `email_sent` under `[auth.rate_limit]`** to match what the provider
   allows. It is currently sized for the built-in ceiling; leaving it at 30/hour
   after moving to custom SMTP keeps the old bottleneck and wastes the change.

Until this is done the project runs on the built-in service and the abuse stays
cheap. That is the accepted state, not a finished one.

---

## 7. API keys

- [ ] Confirm **only** the publishable/anon key is in `.env` and `eas.json`.
- [ ] Confirm the **service_role / `sb_secret_` key appears nowhere** in the
      repository, in `eas.json`, in `supabase/config.toml`, or in any EAS
      environment variable.

> `config.toml` is committed, so **no secret goes in it literally.** The CLI
> supports `env(VAR_NAME)` indirection, which is how the commented CAPTCHA
> secret is written — copy that form for anything else that needs one.

The service-role key bypasses RLS entirely. Because `EXPO_PUBLIC_` values are
inlined into the bundle, shipping it would hand every installer a credential
with full read/write on the whole project. This is why account deletion goes
through the `delete_own_account` RPC instead of `auth.admin.deleteUser` — the
privilege stays in the database, where the client cannot reach it.

Grep to confirm:

```bash
git grep -nE "service_role|sb_secret_|SUPABASE_SERVICE" -- . ':!supabase/SECURITY.md'
```

Should match only the warning comments in `.env.example` and
`20260803125300_delete_own_account.sql`.

---

## 8. Storage

Not used by this app — study content ships bundled in `src/content/data/` so it
works offline and for guests. If a bucket is ever added, **it is public by
default**: add RLS policies to it in the same commit that creates it.
