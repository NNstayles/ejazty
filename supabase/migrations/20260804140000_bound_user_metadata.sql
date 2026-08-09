-- Bound `auth.users.raw_user_meta_data`, the last client-writable store with no
-- ceiling on it.
--
-- WHY THIS EXISTS
-- `20260803170000_bound_user_input.sql` bounded every client-writable column in
-- the `public` schema — `display_name` at 80, `client_id` at 64, attempts at
-- 2000 per user. It could not bound the one store that does not live there.
--
-- `updateUser({ data: { full_name } })` writes straight into
-- `auth.users.raw_user_meta_data`, which is unbounded `jsonb` with no CHECK
-- available to it (it is GoTrue's table, not ours). The app only ever writes one
-- key and bounds it at `MAX_NAME_LENGTH`, but the app is not the only caller:
-- the anon key ships inside the bundle by design, so one throwaway signup is
-- enough to script GoTrue directly and PUT megabytes of arbitrary JSON, or ten
-- thousand keys, into a row that passes every policy in the project.
--
-- Like the bounding migration, this is not access control — the row belongs to
-- the caller and nothing is disclosed. It is an availability and billing bound,
-- and it closes the gap that migration explicitly left open.
--
-- WHY A TRIGGER RATHER THAN A CHECK
-- `auth.users` is managed by GoTrue. Adding a CHECK constraint to it risks a
-- future GoTrue migration failing against a constraint it knows nothing about,
-- which would break auth outright. A BEFORE trigger is the reversible option:
-- dropping it restores stock behaviour exactly.
--
-- THE FAILURE MODE THIS IS SHAPED AROUND
-- The obvious implementation — validate `raw_user_meta_data` on every write —
-- is a lockout waiting to happen. GoTrue writes to `auth.users` constantly for
-- reasons that have nothing to do with metadata (`last_sign_in_at` on every
-- single sign-in, confirmation and recovery timestamps). If the check fired on
-- those, any account already holding an oversized blob would be unable to
-- *sign in*, permanently, with no way to fix it from the client. So the check
-- runs only when the metadata is actually changing. See the `tg_op` guard.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: `create or replace` plus a guarded trigger.

-- ---------------------------------------------------------------------------
-- Repair before constraining
-- ---------------------------------------------------------------------------
-- Same precedent as every migration before this one. Only `full_name` is
-- repaired, and only by truncation: it is the one key this project understands,
-- and 80 characters of it is still recognisably the name the user chose.
--
-- An oversized *blob* is deliberately left alone rather than rewritten. Nothing
-- legitimate can produce one — the app writes a single key — so anything that
-- large is forged, and silently deleting JSON whose meaning we do not know is
-- the wrong trade. The `tg_op` guard below means such a row keeps working; its
-- owner simply cannot make it worse without first bringing it under the bound.
update auth.users
   set raw_user_meta_data =
         jsonb_set(
           raw_user_meta_data,
           '{full_name}',
           to_jsonb(left(raw_user_meta_data ->> 'full_name', 80))
         )
 where raw_user_meta_data ? 'full_name'
   and length(raw_user_meta_data ->> 'full_name') > 80;

-- ---------------------------------------------------------------------------
-- The bound
-- ---------------------------------------------------------------------------
-- `security definer` so it can rewrite the row regardless of the caller, and
-- `search_path` pinned to empty so a hostile object on the caller's path cannot
-- shadow the names used below — the same treatment every other definer function
-- in this project gets.
--
-- Not revoked from `anon`/`authenticated` the way `assert_rls_enabled()` is,
-- and for a different reason rather than an oversight: this returns `trigger`,
-- and PostgREST cannot invoke a trigger-returning function at all. The same is
-- true of `handle_new_user` and `enforce_attempt_quota`, which is why neither of
-- those carries a revoke either.
create or replace function public.bound_user_metadata()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  -- 4 KB. The app writes one key holding at most 80 characters, so this is
  -- three orders of magnitude of headroom for anything legitimate while still
  -- making bulk storage abuse pointless.
  max_bytes  constant integer := 4096;
  -- Generous for a store whose only legitimate key is `full_name`, but a real
  -- ceiling on using the row as a key-value dump.
  max_keys   constant integer := 32;
  -- Matches MAX_NAME_LENGTH in `src/features/auth/validation.ts` and the
  -- `profiles_display_name_length` CHECK. Four sites now agree; raising one
  -- means raising all four.
  max_name   constant integer := 80;
  meta jsonb;
  name_value text;
begin
  meta := new.raw_user_meta_data;

  if meta is null then
    return new;
  end if;

  -- Only police an actual change. Nested rather than `and`-ed with the `tg_op`
  -- test because SQL's AND is not guaranteed to short-circuit, and `OLD` is
  -- unassigned during an INSERT — touching it there raises.
  if tg_op = 'UPDATE' then
    if meta is not distinct from old.raw_user_meta_data then
      return new;
    end if;
  end if;

  if jsonb_typeof(meta) <> 'object' then
    raise exception 'user_metadata must be a JSON object, got %', jsonb_typeof(meta)
      using errcode = '23514';
  end if;

  -- Truncated, not rejected. This is the lesson of
  -- 20260803180000_defensive_display_name.sql: rejecting an over-long name
  -- inside the `auth.users` write aborts the whole transaction, and the client
  -- sees an unexplained failure that retrying cannot fix.
  name_value := meta ->> 'full_name';
  if name_value is not null and length(name_value) > max_name then
    meta := jsonb_set(meta, '{full_name}', to_jsonb(left(name_value, max_name)));
  end if;

  -- Rejected rather than truncated, unlike the name above: there is no
  -- meaningful way to "shorten" arbitrary JSON, and nothing this app does can
  -- reach either bound. 23514 is check_violation, which `authErrorKey` already
  -- maps to `auth.errors.valueTooLong` rather than to the generic message.
  if (select count(*) from jsonb_object_keys(meta)) > max_keys then
    raise exception 'user_metadata carries too many keys (limit %)', max_keys
      using errcode = '23514',
            hint = 'This app writes a single key, full_name.';
  end if;

  if length(meta::text) > max_bytes then
    raise exception 'user_metadata is too large: % bytes (limit %)',
                    length(meta::text), max_bytes
      using errcode = '23514',
            hint = 'This app writes a single key, full_name.';
  end if;

  new.raw_user_meta_data := meta;
  return new;
end;
$$;

-- BEFORE, so the truncation lands in the stored row. It also has to run before
-- `on_auth_user_created` (an AFTER trigger) reads `full_name` out of the same
-- record, which BEFORE guarantees — the two compose rather than racing, and
-- `handle_new_user` keeps its own `left(..., 80)` as belt and braces.
drop trigger if exists bound_user_metadata on auth.users;
create trigger bound_user_metadata
  before insert or update on auth.users
  for each row execute function public.bound_user_metadata();

-- ---------------------------------------------------------------------------
-- Add it to the enforced trigger set
-- ---------------------------------------------------------------------------
-- Same argument 20260804120000 makes for the other three: a trigger carrying
-- behaviour the app assumes is invisible when absent, `create or replace
-- function` on a later migration does not restore a dropped *trigger*, and a
-- backup taken before this migration comes back without it.
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
            ('bound_user_metadata',       'auth.users'::regclass),
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
        'the user_metadata size bound, updated_at maintenance, and the '
        'per-user attempt quota. Re-apply the migration that creates the named '
        'trigger. See supabase/SECURITY.md.';
  end if;
end;
$$;

revoke all on function public.assert_expected_triggers() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Assert the standing invariants
-- ---------------------------------------------------------------------------
select public.assert_expected_triggers();
select public.assert_rls_enabled();
