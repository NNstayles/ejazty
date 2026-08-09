-- Make account deletion require a *recent* password authentication, on the
-- server, rather than trusting the client to have asked for one.
--
-- WHY THIS EXISTS
-- `features/auth/reauth.ts` re-checks the current password before
-- `updatePassword`, `updateEmail` and `deleteAccount`. That check is real, but
-- it runs in the app — and the app is not a boundary. The anon key ships inside
-- the bundle by design, so anyone holding a stolen access token can call
-- PostgREST directly:
--
--     POST /rest/v1/rpc/delete_own_account
--     Authorization: Bearer <stolen access token>
--     apikey: <anon key, extracted from the APK>
--
-- `reauthenticate` never runs. Before this migration the function checked only
-- that `auth.uid()` was not null, so that request destroyed the account.
--
-- The docstring on `reauth.ts` claimed protection against exactly this case and
-- did not deliver it. Two of the three operations have a server-side half
-- available as GoTrue configuration (`secure_password_change` and
-- `double_confirm_changes`, both now pinned in `supabase/config.toml`).
-- Deletion has none, because it is this project's own RPC — so its server half
-- has to be written here.
--
-- HOW THE CHECK WORKS
-- `reauthenticate` calls `signInWithPassword`, which mints a new access token
-- whose `amr` claim records that a password was presented, and when. supabase-js
-- resolves the `Authorization` header per request (`accessToken` is a callback,
-- see `SupabaseClient.ts`), so the `.rpc()` immediately afterwards carries that
-- new token. A caller who genuinely re-authenticated therefore arrives with a
-- password entry seconds old. A caller replaying a token does not.
--
-- `amr` is preferred over `iat` because it survives automatic token refresh:
-- `iat` alone would be satisfied by any session refreshed in the last five
-- minutes, which proves nothing about who is holding the phone. `iat` is kept
-- only as a fallback for a project whose JWTs omit `amr`, so that deletion
-- degrades to the weaker check rather than breaking outright.
--
-- HOW TO APPLY
-- Paste into the Supabase dashboard SQL editor and run it, or `supabase db
-- push`. Safe to re-run: `create or replace`.
--
-- HOW TO VERIFY
-- Deleting an account from the app must still work (the client re-authenticates
-- first, so it will). Calling the RPC with a token older than five minutes must
-- fail with 28000, which `authErrorKey` already maps to
-- `auth.errors.sessionExpired`.

-- How recently a password must have been presented. Long enough to cover a slow
-- re-auth round-trip and the user tapping through the confirm dialog behind it;
-- short enough that a token lifted from a device is useless by the time it is
-- replayed.
create or replace function public.delete_own_account()
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  reauth_window constant integer := 300;
  last_password_auth bigint;
  token_issued_at bigint;
begin
  if auth.uid() is null then
    raise exception 'not authenticated' using errcode = '28000';
  end if;

  -- Most recent moment a password was actually presented for this token.
  -- `jsonb_array_elements` over an absent claim would raise, hence the coalesce
  -- to an empty array: a JWT without `amr` must fall through to the `iat`
  -- branch below, not error.
  select max((entry ->> 'timestamp')::bigint)
    into last_password_auth
    from jsonb_array_elements(
           coalesce(auth.jwt() -> 'amr', '[]'::jsonb)
         ) as entry
   where entry ->> 'method' = 'password';

  if last_password_auth is null then
    -- No `amr` password entry. Either the JWT does not carry the claim, or the
    -- session was established some way other than a password (a recovery link,
    -- for instance). Fall back to token age, which `signInWithPassword` also
    -- resets — weaker, because an automatic refresh resets it too, but it still
    -- rejects a token replayed from an earlier capture.
    token_issued_at := (auth.jwt() ->> 'iat')::bigint;

    if token_issued_at is null
       or token_issued_at < extract(epoch from now())::bigint - reauth_window then
      raise exception 'recent reauthentication required'
        using errcode = '28000',
              hint = 'Call reauthenticate() immediately before delete_own_account().';
    end if;
  elsif last_password_auth < extract(epoch from now())::bigint - reauth_window then
    raise exception 'recent reauthentication required'
      using errcode = '28000',
            hint = 'Call reauthenticate() immediately before delete_own_account().';
  end if;

  -- Cascades to identities, sessions and refresh tokens, and from there to
  -- public.profiles and public.exam_attempts.
  delete from auth.users where id = auth.uid();
end;
$$;

-- Unchanged from 20260803125300, restated because `create or replace` does not
-- carry grants forward on a function that is being redefined in a fresh
-- database, and leaving `anon` able to reach it would be a silent regression.
revoke all on function public.delete_own_account() from public, anon;
grant execute on function public.delete_own_account() to authenticated;

-- Re-assert the standing invariants. This migration adds no table and no
-- trigger, so both should still hold; if a table was added by hand since the
-- last push, this is where that surfaces.
select public.assert_expected_triggers();
select public.assert_rls_enabled();
