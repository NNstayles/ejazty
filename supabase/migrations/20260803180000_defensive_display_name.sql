-- Stop an over-long display name from aborting account creation.
--
-- WHY THIS EXISTS
-- `20260803170000_bound_user_input.sql` bounded `profiles.display_name` at 80
-- characters. That bound is right, but it was added to a column that
-- `handle_new_user` writes *inside the `auth.users` insert*: the trigger copies
-- `raw_user_meta_data ->> 'full_name'` straight across, so a name longer than
-- the CHECK raises `check_violation` from within that insert and rolls the whole
-- registration back.
--
-- What the user sees is GoTrue returning `unexpected_failure`, which
-- `authErrorKey` maps to the generic "something went wrong". Retrying with the
-- same name fails identically and forever. Anyone whose name — or pasted
-- clipboard content — exceeds 80 characters simply cannot create an account,
-- and nothing on screen explains why.
--
-- The client now bounds the field (`MAX_NAME_LENGTH` in
-- `src/features/auth/validation.ts`, plus `maxLength` on both inputs), which
-- fixes it for this app. This migration fixes it for *every* client: the anon
-- key ships in the bundle, so PostgREST and GoTrue can be driven directly, and
-- a signup posted by anything other than this app must not be able to trip a
-- constraint that aborts the transaction.
--
-- The name is truncated rather than rejected. The alternative — dropping it to
-- null — loses information the user supplied, and refusing the signup outright
-- is the behaviour being fixed. `left()` keeps the first 80 characters, which
-- is what the repair statement in the bounding migration already chose for
-- existing rows.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: `create or replace`.

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    -- Bounded to match `profiles_display_name_length`. Without the truncation
    -- this insert can raise 23514 and take the whole `auth.users` insert with
    -- it, which surfaces to the client as an unexplained signup failure.
    left(new.raw_user_meta_data ->> 'full_name', 80)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;
