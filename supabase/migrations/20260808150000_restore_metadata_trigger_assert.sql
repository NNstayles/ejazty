-- Restore `bound_user_metadata` to the asserted trigger set.
--
-- WHY THIS EXISTS
-- `assert_expected_triggers()` is redefined by three migrations, and each one
-- replaces the WHOLE `values` list rather than adding to it. That is fine right
-- up until somebody forgets an entry, which is what happened:
--
--   20260804120000  on_auth_user_created, profiles_touch_updated_at,
--                   exam_attempts_quota
--   20260804140000  ... + bound_user_metadata            <- added correctly
--   20260808130000  ... + question_stats_quota,
--                   MINUS bound_user_metadata            <- dropped in passing
--
-- 20260808130000 runs last, so the live function no longer checks for it.
--
-- Nothing is exposed by this on its own: the trigger itself was never dropped,
-- and `auth.users.raw_user_meta_data` is still bounded today. What was lost is
-- the control built specifically to notice if it ever *isn't*. 20260804140000
-- states the case in its own words -- "`create or replace function` on a later
-- migration does not restore a dropped *trigger*, and a backup predating one
-- comes back without it" -- and that is precisely the scenario the assertion
-- was blind to.
--
-- The consequence if it were ever lost unnoticed: `supabase db push` reports
-- success, and `raw_user_meta_data` reverts to unbounded `jsonb`. The anon key
-- ships in the bundle by design, so one throwaway signup is enough to script
-- GoTrue directly and PUT megabytes of arbitrary JSON into a row that passes
-- every policy in the project. That is the availability and billing bound
-- 20260804140000 exists to install.
--
-- A NOTE FOR THE NEXT MIGRATION THAT TOUCHES A TRIGGER
-- This will happen again, because the list is rebuilt from scratch every time.
-- When adding an entry, copy the block below in full and append -- do not
-- retype it from memory, and do not assume the previous definition is the one
-- immediately above in the directory listing. `grep -n "values" on the whole
-- migrations directory` shows every version of this list at once.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: `create or replace`, and the assertion is read-only.
--
-- HOW TO VERIFY IT ACTUALLY CATCHES SOMETHING
-- Mutation-check it, the way the client invariants are checked -- an assertion
-- that passes under a broken state is worse than none:
--
--     drop trigger bound_user_metadata on auth.users;
--     select public.assert_expected_triggers();   -- must RAISE
--     -- then re-apply 20260804140000_bound_user_metadata.sql
--     select public.assert_expected_triggers();   -- must PASS

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
            -- Creates the profile row at signup, so the client never meets a
            -- signed-in user without one. 20260803140000.
            ('on_auth_user_created',      'auth.users'::regclass),
            -- Bounds `raw_user_meta_data` size and key count, and truncates
            -- `full_name` to 80. 20260804140000. THIS IS THE ONE THAT WENT
            -- MISSING FROM THIS LIST -- see the header.
            ('bound_user_metadata',       'auth.users'::regclass),
            -- Keeps `updated_at` honest without the client setting it.
            -- 20260803140000.
            ('profiles_touch_updated_at', 'public.profiles'::regclass),
            -- Caps stored attempts at 2000 per user. 20260803170000.
            ('exam_attempts_quota',       'public.exam_attempts'::regclass),
            -- Caps stored per-question stats at 2000 per user. 20260808130000.
            ('question_stats_quota',      'public.question_stats'::regclass)
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
        'the user_metadata size bound, updated_at maintenance, and the '
        'per-user attempt and question-stat quotas. Re-apply the migration '
        'that creates the named trigger. See supabase/SECURITY.md.';
  end if;
end;
$$;

-- Diagnostic only, and it reads the catalog. Restated because `create or
-- replace` does not carry grants forward on a function redefined in a fresh
-- database, and leaving `anon` able to reach it would make this a
-- schema-enumeration endpoint over PostgREST.
revoke all on function public.assert_expected_triggers() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Assert the standing invariants
-- ---------------------------------------------------------------------------
-- Running the repaired one here is what makes this migration meaningful on
-- application: if `bound_user_metadata` has ALREADY been lost at some point
-- since 20260808130000 removed the check, this is where that surfaces.
select public.assert_expected_triggers();
select public.assert_rls_enabled();
