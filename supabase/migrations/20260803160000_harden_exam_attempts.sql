-- Hardening for `exam_attempts`: state the grading rules the device applies,
-- and stop the client naming its own `user_id`.
--
-- WHY THIS EXISTS
-- Attempts are graded entirely on the device (`features/exam/engine.ts`) and
-- inserted verbatim. The original constraints validate each column alone —
-- `percent between 0 and 100`, `correct <= total` — but never against each
-- other, so a row could claim `percent: 100, passed: true` for an exam nobody
-- sat, or carry a `taken_at` years in the future.
--
-- Row level security already confines every write to the caller's own rows, so
-- this is not an access-control fix: the only history anyone can forge is their
-- own. It is an integrity fix. A future `taken_at` sorts to the top of the
-- newest-first history list and poisons the baseline `compareAttempt()` scores
-- against, which is a visible bug rather than a hypothetical one.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: every statement is guarded.

-- ---------------------------------------------------------------------------
-- Repair any row that predates these rules
-- ---------------------------------------------------------------------------
-- The `alter table ... add constraint` below fails outright if a single
-- existing row violates it, which on a live project means the migration stops
-- half-applied. `passed` is derived, so the stored `percent` is the value to
-- trust; a future `taken_at` is clamped to now rather than deleted, because the
-- attempt itself did happen.
update public.exam_attempts
   set passed = (percent >= 80)
 where passed <> (percent >= 80);

update public.exam_attempts
   set taken_at = now()
 where taken_at > now() + interval '1 day';

-- ---------------------------------------------------------------------------
-- Constraints
-- ---------------------------------------------------------------------------
-- `passed` is graded on the device, so the database restates the rule instead
-- of taking the client's boolean on trust.
--
-- 80 is PASS_THRESHOLD in `src/features/exam/engine.ts`, which in turn matches
-- the answer the official bank gives for `q-pass-mark` (س ٢٤). Those are now
-- three coupled sites: changing the threshold means changing this constraint,
-- the constant, and that answer together. `engine.ts` carries the same note.
alter table public.exam_attempts
  drop constraint if exists exam_attempts_passed_matches_percent;
alter table public.exam_attempts
  add constraint exam_attempts_passed_matches_percent
  check (passed = (percent >= 80));

-- A future timestamp would sort above every real attempt in the newest-first
-- history. The day of slack absorbs device clock skew and timezone drift
-- without admitting anything deliberate.
alter table public.exam_attempts
  drop constraint if exists exam_attempts_taken_at_not_future;
alter table public.exam_attempts
  add constraint exam_attempts_taken_at_not_future
  check (taken_at <= now() + interval '1 day');

-- ---------------------------------------------------------------------------
-- user_id defaults to the caller
-- ---------------------------------------------------------------------------
-- The client sends `user_id` in the payload (`toRow` in
-- features/progress/attempts.ts). The `with check (auth.uid() = user_id)`
-- policy already rejects any other value, so this is defence in depth rather
-- than a fix: it means a row inserted *without* the column still lands on the
-- right owner instead of failing a not-null violation, and it removes the
-- client's say in the matter entirely for any future caller that omits it.
alter table public.exam_attempts
  alter column user_id set default auth.uid();

-- Same reasoning for the profile row.
alter table public.profiles
  alter column id set default auth.uid();
