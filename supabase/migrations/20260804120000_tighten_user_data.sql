-- Close the last gap between what the client computes and what the table will
-- accept, reject blank text where blank is meaningless, and make the expected
-- triggers an enforced invariant rather than a documented one.
--
-- WHY THIS EXISTS
-- `20260803160000_harden_exam_attempts.sql` restated two of the device's
-- grading rules server-side: `passed = (percent >= 80)` and `taken_at` not
-- future. It left one unstated, and it is the load-bearing one.
--
-- Every existing constraint validates a column against a literal, or `passed`
-- against `percent`. **Nothing checks `percent` against `correct` and `total`.**
-- So this row passes the entire schema today:
--
--     correct = 0, total = 30, percent = 100, passed = true
--
--   correct >= 0             ok
--   total > 0                ok
--   correct <= total         ok
--   percent between 0 and 100  ok
--   passed = (percent >= 80)   ok
--
-- A nought-out-of-thirty attempt, stored and rendered as a perfect score. Row
-- level security means the only history anyone can forge is their own, so this
-- is integrity rather than access control — the same standing as the hardening
-- migration. But `percent` is what the history list, the personal-best tile and
-- `compareAttempt()`'s baseline all read, so a row that lies about it corrupts
-- every comparison drawn against it, not just its own line.
--
-- NO NEW INDEXES, DELIBERATELY
-- Measured on the live project: `exam_attempts_client_id_unique` and
-- `exam_attempts_user_taken_at_idx` are both at 100% usage, `profiles_pkey`
-- likewise. Every query path the app has is already covered. An index that is
-- never scanned still has to be written on every insert, so adding more here
-- would be cost with no reader.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: every statement is guarded.

-- ---------------------------------------------------------------------------
-- Repair before constraining
-- ---------------------------------------------------------------------------
-- `alter table ... add constraint` fails outright on a single violating row,
-- which on a live project leaves the migration half-applied. Same reasoning as
-- 20260803160000 and 20260803170000.
--
-- Which value to trust is the opposite call from the one the hardening
-- migration made. There, `passed` was derived and `percent` was the stored
-- fact, so `passed` was rewritten. Here `correct` and `total` are the raw
-- counts the grader produced and `percent` is derived from them, so `percent`
-- is the one to recompute. Rounding matches `gradeExam`: JavaScript's
-- `Math.round` and Postgres `round(numeric)` both round halves away from zero
-- on positive values, so the two agree at every .5 boundary.
update public.exam_attempts
   set percent = round((correct::numeric / total) * 100)
 where percent <> round((correct::numeric / total) * 100);

-- `passed` is derived from `percent`, so a repaired `percent` can leave the
-- boolean stale. Re-derive it before its own constraint is re-checked.
update public.exam_attempts
   set passed = (percent >= 80)
 where passed <> (percent >= 80);

-- A display name that is blank, or nothing but whitespace, is not a name. It
-- renders as an empty line on the settings screen and sorts oddly in SQL.
-- Nulled rather than deleted: the account is fine, the field simply carries
-- nothing, and null is how "no name" is already spelled in this column.
update public.profiles
   set display_name = null
 where display_name is not null
   and btrim(display_name) = '';

-- Deleted rather than repaired, matching the `client_id` precedent in
-- 20260803170000: this column is the dedupe key for the idempotent upsert, so a
-- blank one is not a recoverable record. `newAttemptId()` cannot produce one.
delete from public.exam_attempts where btrim(client_id) = '';

-- ---------------------------------------------------------------------------
-- The constraint the schema was missing
-- ---------------------------------------------------------------------------
-- `total > 0` is already enforced, so the division cannot raise here.
alter table public.exam_attempts
  drop constraint if exists exam_attempts_percent_matches_score;
alter table public.exam_attempts
  add constraint exam_attempts_percent_matches_score
  check (percent = round((correct::numeric / total) * 100));

-- ---------------------------------------------------------------------------
-- Blank text bounds
-- ---------------------------------------------------------------------------
-- `length between 1 and 64` already rejects the empty string; neither column
-- rejected a value that is only spaces.
alter table public.profiles
  drop constraint if exists profiles_display_name_not_blank;
alter table public.profiles
  add constraint profiles_display_name_not_blank
  check (display_name is null or btrim(display_name) <> '');

alter table public.exam_attempts
  drop constraint if exists exam_attempts_client_id_not_blank;
alter table public.exam_attempts
  add constraint exam_attempts_client_id_not_blank
  check (btrim(client_id) <> '');

-- ---------------------------------------------------------------------------
-- Make the expected triggers an enforced invariant
-- ---------------------------------------------------------------------------
-- Three triggers carry behaviour the app assumes but never checks:
--
--   on_auth_user_created    creates the profile row, so the client never meets
--                           a signed-in user without one.
--   profiles_touch_updated_at   keeps `updated_at` honest.
--   exam_attempts_quota     caps stored attempts per user.
--
-- All three are invisible when absent. A missing `on_auth_user_created` only
-- shows up as a profile that silently never appears; a missing quota trigger
-- shows up as nothing at all until storage is gone. `create or replace function`
-- on a later migration does not recreate a dropped *trigger*, and restoring a
-- backup taken before one was added leaves it off. This is the same argument
-- `assert_rls_enabled()` makes for policies, so it gets the same treatment.
create or replace function public.assert_expected_triggers()
returns void
language plpgsql
set search_path = ''
as $$
declare
  missing text;
begin
  select string_agg(e.name, ', ' order by e.name)
    into missing
    from (values
            ('on_auth_user_created',      'auth.users'::regclass),
            ('profiles_touch_updated_at', 'public.profiles'::regclass),
            ('exam_attempts_quota',       'public.exam_attempts'::regclass)
         ) as e(name, rel)
   where not exists (
     select 1
       from pg_catalog.pg_trigger t
      where t.tgrelid = e.rel
        and t.tgname = e.name
        and not t.tgisinternal
   );

  if missing is not null then
    raise exception 'expected trigger(s) missing: %', missing
      using hint =
        'These carry behaviour the app assumes: profile creation on signup, '
        'updated_at maintenance, and the per-user attempt quota. Re-apply the '
        'migration that creates the named trigger. See supabase/SECURITY.md.';
  end if;
end;
$$;

-- Diagnostic only, and it reads the catalog. Revoked for the same reason
-- `assert_rls_enabled` is: no app client has business enumerating triggers.
revoke all on function public.assert_expected_triggers() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Assert both invariants now
-- ---------------------------------------------------------------------------
-- Re-running the RLS assertion is the point of putting it in a function: this
-- migration adds constraints but no table, so it should still hold — and if a
-- table was added by hand since the last push, this is where that surfaces.
select public.assert_expected_triggers();
select public.assert_rls_enabled();
