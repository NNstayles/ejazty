import type { Session } from '@supabase/supabase-js';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { readJSON, remove, StorageKeys, writeJSON } from '@/lib/storage';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const GUEST_KEY = 'ejazty.auth.guest';

export type AuthUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

type AuthValue = {
  /** False until the persisted session has been restored. */
  ready: boolean;
  user: AuthUser | null;
  /** True when browsing without an account. */
  isGuest: boolean;
  /** True when the user may enter the tabs (signed in or explicitly a guest). */
  isAuthenticated: boolean;
  configured: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  continueAsGuest: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

function toUser(session: Session | null): AuthUser | null {
  if (!session?.user) return null;
  const meta = session.user.user_metadata as { full_name?: string } | null;
  return {
    id: session.user.id,
    email: session.user.email ?? null,
    displayName: meta?.full_name ?? null,
  };
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isGuest, setIsGuest] = useState(false);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const guest = await readJSON<boolean>(GUEST_KEY, false);
      if (!cancelled) setIsGuest(guest);

      if (!supabase) {
        if (!cancelled) setReady(true);
        return;
      }
      const { data } = await supabase.auth.getSession();
      if (cancelled) return;
      setUser(toUser(data.session));
      setReady(true);
    })();

    // Keeps React state aligned with token refreshes and sign-outs that happen
    // outside of the explicit calls below.
    const subscription = supabase?.auth.onAuthStateChange((_event, session) => {
      setUser(toUser(session));
    });

    return () => {
      cancelled = true;
      subscription?.data.subscription.unsubscribe();
    };
  }, []);

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) throw new Error('NOT_CONFIGURED');
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });
    if (error) throw error;
    await remove(GUEST_KEY);
    setIsGuest(false);
  }, []);

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      if (!supabase) throw new Error('NOT_CONFIGURED');
      const { error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: { data: { full_name: name.trim() } },
      });
      if (error) throw error;
      await remove(GUEST_KEY);
      setIsGuest(false);
    },
    [],
  );

  const signOut = useCallback(async () => {
    await supabase?.auth.signOut();
    await remove(GUEST_KEY);
    setUser(null);
    setIsGuest(false);
  }, []);

  const continueAsGuest = useCallback(async () => {
    await writeJSON(GUEST_KEY, true);
    setIsGuest(true);
  }, []);

  const value = useMemo<AuthValue>(
    () => ({
      ready,
      user,
      isGuest,
      isAuthenticated: Boolean(user) || isGuest,
      configured: isSupabaseConfigured,
      signIn,
      signUp,
      signOut,
      continueAsGuest,
    }),
    [ready, user, isGuest, signIn, signUp, signOut, continueAsGuest],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside <AuthProvider>');
  return ctx;
}

/** Referenced so the storage key stays greppable alongside the others. */
export const AuthStorageKeys = { guest: GUEST_KEY, ...StorageKeys };
