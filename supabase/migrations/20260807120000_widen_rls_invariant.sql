-- Widen `assert_rls_enabled()` to every relation PostgREST actually exposes.
--
-- WHY THIS EXISTS
-- `20260803190000_assert_rls_invariant.sql` made "every public table has RLS and
-- at least one policy" a machine-enforced invariant instead of a checklist item,
-- which is the strongest single control in this project. But it filters on
--
--     and c.relkind = 'r'
--
-- and `'r'` is *ordinary tables only*. PostgREST exposes more than that, and the
-- rest of it was invisible to the assertion:
--
--   'v'  VIEWS. This is the one that matters. A view runs with the privileges
--        of its OWNER unless it is created `with (security_invoker = on)`, so a
--        view over `exam_attempts` reads straight THROUGH the row level security
--        on its base table. Views have no `relrowsecurity` of their own, so the
--        old query could not have caught one even if it had selected them.
--   'm'  MATERIALIZED VIEWS. Exposed by PostgREST, and they support no RLS at
--        all — the data is a physical copy sitting in `public`.
--   'p'  PARTITIONED TABLES. Exposed and queryable exactly like `'r'`.
--   'f'  FOREIGN TABLES. Exposed, and RLS on them is a separate opt-in.
--
-- The failure this closes is precisely the one the original migration's own
-- docstring is written against — "a table created in the dashboard SQL editor…
-- never appears in this directory at all" — except one level worse, because a
-- VIEW created that way is invisible to the assertion AND invisible to this
-- repo, and the assertion's green result then actively certifies that nothing is
-- wrong.
--
--     create view public.leaderboard as
--       select p.display_name, a.percent
--         from public.exam_attempts a join public.profiles p on p.id = a.user_id;
--
-- Three lines in the SQL editor publishes every user's score and name to `anon`.
-- `supabase db push` reports success. Nothing in a code review sees it.
--
-- NOTHING IS BROKEN TODAY. There are no views, matviews, partitioned tables or
-- foreign tables in `public`, so this migration is expected to pass on first
-- application and change no behaviour. It is not a fix for a live exposure; it
-- is the assertion covering the case it will be trusted for later. That is the
-- whole point of having one.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: `create or replace`, and the assertion is read-only.
--
-- HOW TO VERIFY IT ACTUALLY CATCHES SOMETHING
-- Mutation-check it the way the test suite checks the client invariants — an
-- assertion that passes under a broken state is worse than none:
--
--     create view public.leak as select * from public.exam_attempts;
--     select public.assert_rls_enabled();   -- must RAISE
--     drop view public.leak;
--     create view public.leak with (security_invoker = on)
--       as select * from public.exam_attempts;
--     select public.assert_rls_enabled();   -- must PASS
--     drop view public.leak;

create or replace function public.assert_rls_enabled()
returns void
language plpgsql
set search_path = ''
as $$
declare
  offenders text;
  exposed   text;
begin
  -- -------------------------------------------------------------------------
  -- Tables, including partitioned ones
  -- -------------------------------------------------------------------------
  -- Unchanged from 20260803190000 except for `relkind in ('r', 'p')`. A
  -- partitioned table is queried through its parent exactly like an ordinary
  -- one, and RLS on it is declared the same way, so there was never a reason
  -- for it to be exempt beyond the original filter being written narrowly.
  select string_agg(
           format('%s (rls=%s, policies=%s)', t.relname, t.relrowsecurity, t.policies),
           ', ' order by t.relname
         )
    into offenders
    from (
      select c.relname,
             c.relrowsecurity,
             count(p.polname) as policies
        from pg_catalog.pg_class c
        join pg_catalog.pg_namespace n on n.oid = c.relnamespace
        left join pg_catalog.pg_policy p on p.polrelid = c.oid
       where n.nspname = 'public'
         and c.relkind in ('r', 'p')
         -- Not ours: an extension installed into `public` manages its own
         -- tables, and this assertion has no business failing on them.
         and not exists (
           select 1
             from pg_catalog.pg_depend d
            where d.objid = c.oid
              and d.classid = 'pg_catalog.pg_class'::regclass
              and d.deptype = 'e'
         )
       group by c.relname, c.relrowsecurity
      having c.relrowsecurity = false
          or count(p.polname) = 0
    ) t;

  if offenders is not null then
    raise exception
      'RLS invariant violated on public table(s): %', offenders
      using hint =
        'Every public table must have row level security enabled AND at least '
        'one policy. RLS with zero policies returns no rows, which gets '
        'misdiagnosed as a bug and "fixed" by disabling RLS — which publishes '
        'the table. See supabase/SECURITY.md section 2.';
  end if;

  -- -------------------------------------------------------------------------
  -- Views, materialized views and foreign tables
  -- -------------------------------------------------------------------------
  -- These carry no `relrowsecurity` of their own, so they cannot be folded into
  -- the query above — the test is a different one. A view is safe only if it
  -- executes as the CALLER (`security_invoker = on`), which makes the base
  -- table's policies apply to whoever is querying. Without that option it
  -- executes as its owner and RLS on the base tables is simply not consulted.
  --
  -- Matviews and foreign tables have no equivalent opt-in, so they are always
  -- reported. That is deliberate rather than lazy: neither can be made safe by a
  -- flag, and the correct answer for both is to move them out of `public` so
  -- PostgREST does not expose them at all.
  --
  -- `reloptions` is null for a relation with no options set, hence the coalesce
  -- — without it `null @> array[...]` is null, not false, and the `not` would
  -- swallow the row instead of flagging it.
  select string_agg(
           format('%s (%s)', c.relname,
                  case c.relkind
                    when 'v' then 'view without security_invoker'
                    when 'm' then 'materialized view — supports no RLS'
                    when 'f' then 'foreign table'
                  end),
           ', ' order by c.relname
         )
    into exposed
    from pg_catalog.pg_class c
    join pg_catalog.pg_namespace n on n.oid = c.relnamespace
   where n.nspname = 'public'
     and c.relkind in ('v', 'm', 'f')
     and not exists (
       select 1
         from pg_catalog.pg_depend d
        where d.objid = c.oid
          and d.classid = 'pg_catalog.pg_class'::regclass
          and d.deptype = 'e'
     )
     and not coalesce(c.reloptions @> array['security_invoker=on'], false);

  if exposed is not null then
    raise exception
      'PostgREST-exposed relation(s) in public bypass row level security: %', exposed
      using hint =
        'A view without `with (security_invoker = on)` executes as its OWNER '
        'and reads through RLS on its base tables; materialized and foreign '
        'tables support no RLS at all. Either recreate the view with '
        'security_invoker, or move the relation into a schema PostgREST does '
        'not expose. See supabase/SECURITY.md section 2.';
  end if;
end;
$$;

-- Diagnostic only, and it reads the catalog — there is no reason for an app
-- client to call it. Restated because `create or replace` does not carry grants
-- forward on a function redefined in a fresh database, and leaving `anon` able
-- to reach it would turn this into a schema-enumeration endpoint.
revoke all on function public.assert_rls_enabled() from public, anon, authenticated;

-- ---------------------------------------------------------------------------
-- Assert the standing invariants
-- ---------------------------------------------------------------------------
-- Both are cheap and run at the end of every push. Running the widened one here
-- is what makes this migration meaningful on application: if a view was added by
-- hand at any point since the project was created, this is where it surfaces.
select public.assert_rls_enabled();
select public.assert_expected_triggers();
