-- Lets a signed-in user delete their own account, and nobody else's.
--
-- WHY THIS EXISTS
-- The Supabase JS client cannot delete a user. `auth.admin.deleteUser` requires
-- the service-role key, and this is a mobile app: every `EXPO_PUBLIC_` value is
-- inlined into the JS bundle at build time, so shipping that key would hand
-- anyone who unzips the app a credential that bypasses row level security on
-- the whole project.
--
-- Instead the privilege lives here. The function runs as its owner
-- (`security definer`) but deletes only `auth.uid()` — the id baked into the
-- caller's own JWT — so there is no parameter through which one user could name
-- another. `search_path` is pinned to empty so a hostile schema on the caller's
-- path cannot shadow the names used below.
--
-- HOW TO APPLY
-- Paste this into the Supabase dashboard SQL editor and run it, or
--   supabase db push
-- Until it exists, deleting an account fails with PGRST202 and the app shows
-- "account deletion is not set up on the server yet".

create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
begin
  if auth.uid() is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  -- Cascades to identities, sessions and refresh tokens.
  delete from auth.users where id = auth.uid();
end;
$$;

-- Only a signed-in user may call it. `anon` must not reach it at all: without a
-- JWT `auth.uid()` is null and the call would abort anyway, but revoking makes
-- that explicit rather than incidental.
revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;
