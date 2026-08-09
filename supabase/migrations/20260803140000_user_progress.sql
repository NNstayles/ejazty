-- User progress: profiles and exam attempts.
--
-- WHAT THIS IS FOR
-- Exam history used to live only in AsyncStorage, so reinstalling the app or
-- switching phones lost every attempt. These two tables give a signed-in user a
-- durable, cross-device record. Study content deliberately stays bundled in the
-- app (`src/content/data/`) — it must work offline and for guests, so it is not
-- modelled here.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db push`.
-- Safe to re-run: every statement is guarded.

-- ---------------------------------------------------------------------------
-- profiles
-- ---------------------------------------------------------------------------
-- One row per user, keyed by the auth user id. `display_name` mirrors
-- `user_metadata.full_name` so the name is queryable from SQL; the auth
-- metadata stays the value the client writes on sign-up.
create table if not exists public.profiles (
  id           uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  -- Last language the account studied in. Device preference stays local; this
  -- is only a record of what the account was last using.
  locale       text check (locale is null or locale in ('ar', 'ckb', 'en')),
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- A profile is private to its owner. No policy grants access to anyone else, so
-- `anon` and other users see nothing at all.
drop policy if exists "profiles are readable by their owner" on public.profiles;
create policy "profiles are readable by their owner"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles are insertable by their owner" on public.profiles;
create policy "profiles are insertable by their owner"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "profiles are updatable by their owner" on public.profiles;
create policy "profiles are updatable by their owner"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- ---------------------------------------------------------------------------
-- exam_attempts
-- ---------------------------------------------------------------------------
-- One row per graded attempt.
--
-- `client_id` is generated on the device and carried in the local cache. It is
-- what makes the push idempotent: an attempt graded offline and pushed later,
-- or pushed twice because a retry overlapped, collapses onto the same row via
-- the unique constraint rather than inflating the learner's history.
create table if not exists public.exam_attempts (
  id               uuid primary key default gen_random_uuid(),
  user_id          uuid not null references auth.users (id) on delete cascade,
  client_id        text not null,
  mode             text not null check (mode in ('quick', 'medium', 'full')),
  correct          integer not null check (correct >= 0),
  total            integer not null check (total > 0),
  -- Stored rather than derived: it is what the learner was shown, and rounding
  -- it again later could disagree with the screen they remember.
  percent          integer not null check (percent between 0 and 100),
  passed           boolean not null,
  duration_seconds integer check (duration_seconds is null or duration_seconds >= 0),
  taken_at         timestamptz not null,
  created_at       timestamptz not null default now(),
  constraint exam_attempts_correct_within_total check (correct <= total),
  constraint exam_attempts_client_id_unique unique (user_id, client_id)
);

-- The history list and the "personal best" tile both read newest-first for one
-- user, which is exactly this index.
create index if not exists exam_attempts_user_taken_at_idx
  on public.exam_attempts (user_id, taken_at desc);

alter table public.exam_attempts enable row level security;

drop policy if exists "attempts are readable by their owner" on public.exam_attempts;
create policy "attempts are readable by their owner"
  on public.exam_attempts for select
  using (auth.uid() = user_id);

drop policy if exists "attempts are insertable by their owner" on public.exam_attempts;
create policy "attempts are insertable by their owner"
  on public.exam_attempts for insert
  with check (auth.uid() = user_id);

-- Update is granted only so the idempotent upsert can land on an existing row.
drop policy if exists "attempts are updatable by their owner" on public.exam_attempts;
create policy "attempts are updatable by their owner"
  on public.exam_attempts for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "attempts are deletable by their owner" on public.exam_attempts;
create policy "attempts are deletable by their owner"
  on public.exam_attempts for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- triggers
-- ---------------------------------------------------------------------------
-- Keeps `updated_at` honest without the client having to remember to set it.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists profiles_touch_updated_at on public.profiles;
create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- Creates the profile row at sign-up, so the app never has to handle a signed-in
-- user who has no profile yet. `security definer` because the trigger fires
-- inside the auth schema's insert, where the caller is not yet `authenticated`.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name')
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill for accounts that existed before this migration.
insert into public.profiles (id, display_name)
select u.id, u.raw_user_meta_data ->> 'full_name'
from auth.users u
on conflict (id) do nothing;
