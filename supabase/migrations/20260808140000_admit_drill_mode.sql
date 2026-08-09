-- Admits the `drill` exam format.
--
-- Required by the client change in the same release. `EXAM_MODES` gained a
-- fifth format — the mistake drill, which draws the questions this learner has
-- personally got wrong from `question_stats` — and `mode` is whitelisted by
-- `exam_attempts_mode_check`, so without this every drill attempt is graded and
-- cached on the device and then rejected by the database.
--
-- The symptom would be silent, which is why this is its own migration rather
-- than folded into a later one. `pushAttempt` ignores failures by design, and
-- `syncAttempts` pushes as **one batch upsert** which Postgres fails as a unit,
-- so a single `drill` row would reject every *other* attempt travelling with
-- it. The learner would see a full history locally and nothing would ever reach
-- the server again.
--
-- `isPushable` mirrors this whitelist client-side but derives it from
-- `Object.keys(EXAM_MODES)`, so it admitted `drill` the moment the mode was
-- declared. That is what makes this migration the only thing standing between
-- the new format and a silent sync outage — the client-side guard cannot catch
-- it.

-- ---------------------------------------------------------------------------
-- Widen the format whitelist.
--
-- Dropped and re-added rather than altered: Postgres has no in-place edit for a
-- CHECK. No repair pass is needed because the new whitelist is a strict
-- superset of the old one, so no existing row can violate it — unlike the
-- pass-mark change in `20260806090000`, which had to re-grade history first.
-- ---------------------------------------------------------------------------
alter table public.exam_attempts
  drop constraint if exists exam_attempts_mode_check;

alter table public.exam_attempts
  add constraint exam_attempts_mode_check
  check (mode in ('quick', 'medium', 'full', 'open', 'drill'));

-- ---------------------------------------------------------------------------
-- Re-assert the invariants the earlier migrations installed.
-- ---------------------------------------------------------------------------
select public.assert_rls_enabled();
select public.assert_expected_triggers();
