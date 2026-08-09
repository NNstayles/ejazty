-- Moves the server-side pass rule from 80% to 60%, and admits the new `open`
-- exam format.
--
-- Both halves are required by the client change in the same release:
--
--   * `PASS_THRESHOLD` in `features/exam/engine.ts` is now 0.6. The existing
--     CHECK restates the *old* rule (`passed = (percent >= 80)`), so without
--     this migration every attempt scoring 60-79 is graded `passed = true` on
--     the device and then rejected by the database. `pushAttempt` ignores
--     failures by design — a failed push must not cost the learner anything —
--     so the symptom would be silent: attempts keep appearing locally and
--     simply never sync, forever.
--
--   * `EXAM_MODES` gained `open`, and `mode` is whitelisted. An open attempt
--     would fail the same way.
--
-- Note this is an app-policy change, not a correction to the ministry's mark,
-- which is still 80%. See the note on `PASS_THRESHOLD`.

-- ---------------------------------------------------------------------------
-- 1. Repair before constraining.
--
-- `add constraint` validates every existing row and fails outright on a single
-- violation, which would leave this migration half-applied. Rows scoring 60-79
-- currently carry `passed = false`, which the new rule contradicts.
--
-- The honest consequence, stated rather than buried: this RE-GRADES history.
-- An attempt at 65% was correctly reported as a fail under the old mark and
-- will read as a pass afterwards. That is unavoidable if the invariant is to
-- hold at all — the alternative is dropping the constraint and allowing forged
-- rows to claim a pass they did not earn, which is a worse trade.
-- ---------------------------------------------------------------------------
update public.exam_attempts
   set passed = (percent >= 60)
 where passed is distinct from (percent >= 60);

alter table public.exam_attempts
  drop constraint if exists exam_attempts_passed_matches_percent;

alter table public.exam_attempts
  add constraint exam_attempts_passed_matches_percent
  check (passed = (percent >= 60));

-- ---------------------------------------------------------------------------
-- 2. Admit the `open` format.
--
-- Dropped and re-added rather than altered: Postgres has no in-place edit for a
-- CHECK. No repair pass is needed here because the new whitelist is a strict
-- superset of the old one, so no existing row can violate it.
-- ---------------------------------------------------------------------------
alter table public.exam_attempts
  drop constraint if exists exam_attempts_mode_check;

alter table public.exam_attempts
  add constraint exam_attempts_mode_check
  check (mode in ('quick', 'medium', 'full', 'open'));

-- ---------------------------------------------------------------------------
-- 3. Re-assert the invariants the earlier migrations installed.
--
-- Both assertions are cheap and run at the end of every push; calling them here
-- means a migration that silently dropped RLS or a trigger fails loudly now
-- rather than at the next security review.
-- ---------------------------------------------------------------------------
select public.assert_rls_enabled();
select public.assert_expected_triggers();
