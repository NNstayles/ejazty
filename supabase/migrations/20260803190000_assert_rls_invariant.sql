-- Make "every public table has RLS and at least one policy" an enforced
-- invariant instead of a manual checklist item.
--
-- WHY THIS EXISTS
-- This app has no server. RLS is not one layer of the defence, it is the whole
-- of it: the anon key is inlined into the app bundle by design, so anyone can
-- talk to PostgREST directly with a key extracted from the APK. A public table
-- without RLS is readable by all of them.
--
-- The migrations state that intent correctly, but stating it is not the same as
-- it being true of the live database. Two things break the link, and both are
-- ordinary rather than exotic:
--
--   1. A table created in the dashboard SQL editor. The editor does not enable
--      RLS for you, and such a table never appears in this directory at all.
--   2. RLS switched off to "fix" a table that returns no rows. A table with RLS
--      enabled and zero policies silently returns empty results for every query,
--      which reads as a broken feature; the intuitive fix converts a
--      no-data bug into a full public read.
--
-- Neither failure looks like a security problem from the outside, which is why
-- this is worth asserting mechanically. `supabase/SECURITY.md` §2 has carried
-- the diagnostic query since the beginning — this makes running it non-optional
-- by failing `supabase db push` outright.
--
-- Extension-owned tables are excluded: an extension installed into `public`
-- (PostGIS, pg_cron and friends) brings its own tables that are not ours to
-- police, and failing on them would train whoever hits it to delete this file.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: `create or replace`, and the assertion at the bottom
-- is read-only.

create or replace function public.assert_rls_enabled()
returns void
language plpgsql
set search_path = ''
as $$
declare
  offenders text;
begin
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
         and c.relkind = 'r'
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
end;
$$;

-- Diagnostic only, and it reads the catalog — there is no reason for an app
-- client to call it. `anon` and `authenticated` are revoked explicitly so this
-- cannot become an accidental schema-enumeration endpoint over PostgREST.
revoke all on function public.assert_rls_enabled() from public, anon, authenticated;

-- Run it now. This is what makes the invariant real: applying the migrations to
-- a project where a table was added by hand without policies fails here, loudly,
-- instead of shipping.
select public.assert_rls_enabled();
