-- Per-question performance, so the app can answer "which questions do I keep
-- getting wrong?" — the one thing the attempt history could never say.
--
-- `exam_attempts` stores aggregates only (`percent`, `correct`, `total`), so a
-- learner's mistakes existed solely in memory during the result screen and were
-- discarded on reset. That made the most useful study feature in an exam app
-- impossible: drilling the questions you personally fail.
--
-- ## Why this is one row per question and not one row per answer
--
-- The obvious shape is a row per (attempt, question), which preserves full
-- history. It is also **unbounded in a way this project explicitly guards
-- against**. `open` practice draws the entire bank — 541 questions — and
-- `enforce_attempt_quota` permits 2000 attempts per user, so the ceiling is on
-- the order of a million rows for one account. The anon key ships in the app
-- bundle by design (it is the premise the whole RLS model rests on), so one
-- throwaway signup is enough to script PostgREST directly and mint them; see
-- `20260803170000_bound_user_input.sql`, which exists for exactly this reason.
--
-- Aggregating per question bounds the table by the size of the bank instead:
-- 541 rows per user today, and the quota below caps it regardless. It answers
-- both features it was built for — the mistake drill and weak-topic trends —
-- without keeping data whose only use is forensic.
--
-- The accepted cost, stated rather than buried: you cannot reconstruct an
-- individual past attempt question by question. `exam_attempts` still holds
-- what that attempt scored, and the result screen still shows the full paper
-- while it is on screen.
--
-- ## The upsert contract
--
-- The client sends the *merged* counters, not deltas — `seen` and `correct` are
-- absolute values it computed from the device cache, and the upsert overwrites.
-- An increment done in SQL (`seen = question_stats.seen + 1`) would be wrong
-- here: the same attempt can be pushed twice (a retry overlapping a sync, or an
-- attempt graded offline going up late), and an increment would double-count it
-- where an overwrite is idempotent. This mirrors how `exam_attempts` dedupes on
-- `(user_id, client_id)` rather than trusting the push to happen once.

-- ---------------------------------------------------------------------------
-- question_stats
-- ---------------------------------------------------------------------------
create table if not exists public.question_stats (
  user_id      uuid not null references auth.users (id) on delete cascade
                 default auth.uid(),
  -- The content-layer id (`q-pass-mark`, `qp-priority-picture-a`). Text rather
  -- than a foreign key because the question bank ships inside the app, not in
  -- the database — see the note on the content/user-data split in CLAUDE.md.
  question_id  text not null,
  topic        text not null,
  seen         integer not null,
  correct      integer not null,
  -- The most recent verdict, kept separately from the ratio because the drill
  -- reads "got this wrong last time" while the trend reads the ratio. Deriving
  -- one from the other is not possible: 3/4 does not say which one missed.
  last_correct boolean not null,
  last_seen_at timestamptz not null,
  updated_at   timestamptz not null default now(),

  primary key (user_id, question_id),

  constraint question_stats_seen_positive
    check (seen > 0),
  -- `correct <= seen` is the cross-column rule that the individual bounds miss,
  -- and it is the same class of gap `20260804120000` closed for `exam_attempts`:
  -- without it, `seen = 1, correct = 99` satisfies the whole schema and renders
  -- as a mastered question the learner has never got right.
  constraint question_stats_correct_within_seen
    check (correct >= 0 and correct <= seen),
  -- `last_correct` must agree with the counters at the two points where the
  -- counters determine it. A question never answered correctly cannot have been
  -- correct last time, and one never answered wrongly cannot have been wrong.
  constraint question_stats_last_correct_agrees
    check ((correct > 0 or last_correct = false)
       and (correct < seen or last_correct = true)),
  constraint question_stats_question_id_length
    check (length(question_id) between 1 and 64),
  constraint question_stats_question_id_not_blank
    check (btrim(question_id) <> ''),
  -- Whitelisted rather than free text, so a drill cannot be filtered by a topic
  -- that does not exist and silently return nothing. Matches `QuestionTopic`.
  constraint question_stats_topic_check
    check (topic in ('signs', 'rules', 'priority', 'mechanics', 'firstaid')),
  -- Same 24-hour clock-skew slack as `exam_attempts_taken_at_not_future`. A
  -- future timestamp sorts above every real row and poisons "recently missed".
  constraint question_stats_last_seen_not_future
    check (last_seen_at <= now() + interval '1 day')
);

-- No secondary index, deliberately, matching the note in CLAUDE.md. Every query
-- the app makes is "all rows for one user", which the primary key's leading
-- `user_id` already serves, and the result set is bounded by the bank at ~541
-- rows — small enough that filtering `last_correct` in the client costs nothing.
-- An index nothing reads is still written on every upsert.

alter table public.question_stats enable row level security;

drop policy if exists "question stats are readable by their owner" on public.question_stats;
create policy "question stats are readable by their owner"
  on public.question_stats for select
  using (auth.uid() = user_id);

drop policy if exists "question stats are insertable by their owner" on public.question_stats;
create policy "question stats are insertable by their owner"
  on public.question_stats for insert
  with check (auth.uid() = user_id);

-- Update is granted only so the idempotent upsert can land on an existing row,
-- exactly as for `exam_attempts`.
drop policy if exists "question stats are updatable by their owner" on public.question_stats;
create policy "question stats are updatable by their owner"
  on public.question_stats for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "question stats are deletable by their owner" on public.question_stats;
create policy "question stats are deletable by their owner"
  on public.question_stats for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- Quota
-- ---------------------------------------------------------------------------
-- The bank is 541 questions, so a legitimate user cannot approach this. It
-- bounds the case the RLS policies cannot: rows that are genuinely the caller's
-- own, in unlimited number, with arbitrary `question_id` values that need not
-- correspond to any question that exists.
--
-- `before insert` only — the push is an upsert keyed on `(user_id,
-- question_id)`, and one landing on an existing row takes the UPDATE path, so a
-- user at the cap can still re-sync a device. Same reasoning as
-- `enforce_attempt_quota`.
create or replace function public.enforce_question_stats_quota()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (select count(*)
        from public.question_stats
       where user_id = new.user_id) >= 2000 then
    -- 54000 is program_limit_exceeded, which `authErrorKey` already maps to its
    -- own message rather than the generic "something went wrong".
    raise exception 'question stats quota exceeded for user %', new.user_id
      using errcode = '54000';
  end if;
  return new;
end;
$$;

drop trigger if exists question_stats_quota on public.question_stats;
create trigger question_stats_quota
  before insert on public.question_stats
  for each row execute function public.enforce_question_stats_quota();

-- ---------------------------------------------------------------------------
-- Register the new trigger with the invariant assertion
-- ---------------------------------------------------------------------------
-- `create or replace function` on a later migration does not restore a dropped
-- *trigger*, and a backup predating one comes back without it — which is why
-- this list exists at all. A quota trigger that silently vanished would be
-- invisible until a bill arrived.
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
            ('exam_attempts_quota',       'public.exam_attempts'::regclass),
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
        'updated_at maintenance, and the per-user attempt and question-stat '
        'quotas. Re-apply the migration that creates the named trigger. '
        'See supabase/SECURITY.md.';
  end if;
end;
$$;

revoke all on function public.assert_expected_triggers() from public, anon, authenticated;
revoke all on function public.enforce_question_stats_quota() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Assert both invariants now
-- ---------------------------------------------------------------------------
-- The RLS assertion is the one that matters here: this migration adds a table,
-- which is exactly the event it exists to police.
select public.assert_expected_triggers();
select public.assert_rls_enabled();
