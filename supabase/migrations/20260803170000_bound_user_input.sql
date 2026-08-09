-- Bounds on the client-supplied text columns, and a per-user cap on attempts.
--
-- WHY THIS EXISTS
-- Row level security confines every write to the caller's own rows, and the
-- hardening migration before this one restated the grading rules. Neither
-- bounds *size*: `display_name` and `client_id` are unbounded `text`, and
-- nothing limits how many attempt rows one account may insert. "Your own rows"
-- is still an unlimited number of unlimited-length strings.
--
-- That matters because the anon key ships inside the app bundle by design — it
-- is a mobile app, so `EXPO_PUBLIC_` values are extractable from any APK. One
-- throwaway signup is enough to script PostgREST directly and insert rows that
-- pass every policy and every CHECK constraint, until the project's storage
-- quota is gone. This is not access control (nothing is disclosed, no account
-- is compromised); it is an availability and billing bound.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: every statement is guarded.

-- ---------------------------------------------------------------------------
-- Repair before constraining
-- ---------------------------------------------------------------------------
-- `alter table ... add constraint` fails outright on a single violating row,
-- which on a live project leaves the migration half-applied. Same reasoning as
-- 20260803160000_harden_exam_attempts.sql.
--
-- A display name is truncated rather than nulled: the user chose it, and the
-- first 80 characters are still recognisably theirs.
update public.profiles
   set display_name = left(display_name, 80)
 where length(display_name) > 80;

-- ---------------------------------------------------------------------------
-- Length bounds
-- ---------------------------------------------------------------------------
-- `display_name` is user-written (`updateUser({ data: { full_name } })`),
-- mirrored here by `syncProfile` and by the `handle_new_user` trigger, and
-- rendered on the settings screen. 80 is generous for a person's name.
alter table public.profiles
  drop constraint if exists profiles_display_name_length;
alter table public.profiles
  add constraint profiles_display_name_length
  check (display_name is null or length(display_name) <= 80);

-- `client_id` is minted on the device by `newAttemptId()`
-- (`<base36 ms>-<8 chars>`, ~17 chars) or by `legacyId()`
-- (`legacy-<mode>-<ISO 8601>`, ~40 chars). 64 clears both comfortably.
--
-- Deleted rather than truncated, unlike the name above: `client_id` is the
-- dedupe key for the idempotent upsert, so a truncated one is not a repaired
-- record — it is a different record that would collide with a real attempt.
-- Nothing legitimate can exceed this bound, so anything that does is forged.
delete from public.exam_attempts where length(client_id) > 64;

alter table public.exam_attempts
  drop constraint if exists exam_attempts_client_id_length;
alter table public.exam_attempts
  add constraint exam_attempts_client_id_length
  check (length(client_id) between 1 and 64);

-- ---------------------------------------------------------------------------
-- Per-user attempt quota
-- ---------------------------------------------------------------------------
-- CACHE_LIMIT in features/progress/attempts.ts keeps 50 attempts on the device;
-- the remote table deliberately keeps every one, so this ceiling has to sit far
-- above any real learner's history. At four mock exams a day it is over a year
-- of daily practice.
--
-- BEFORE INSERT only. The push is an upsert on (user_id, client_id), and an
-- upsert landing on an existing row fires the UPDATE path, not this one — so
-- re-syncing a device at the cap keeps working instead of erroring.
--
-- `security definer` so the count sees every row regardless of the caller's
-- policies; `search_path` pinned to empty so a hostile object on the caller's
-- path cannot shadow the names below.
create or replace function public.enforce_attempt_quota()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*)
        from public.exam_attempts
       where user_id = new.user_id) >= 2000 then
    -- 54000 is program_limit_exceeded. `authErrorKey` maps it to its own
    -- message so this does not surface as the generic "something went wrong".
    raise exception 'attempt quota exceeded for user %', new.user_id
      using errcode = '54000';
  end if;
  return new;
end;
$$;

drop trigger if exists exam_attempts_quota on public.exam_attempts;
create trigger exam_attempts_quota
  before insert on public.exam_attempts
  for each row execute function public.enforce_attempt_quota();
