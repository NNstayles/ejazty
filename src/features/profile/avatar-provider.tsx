/**
 * The profile picture, shared across the screens that show it.
 *
 * A provider rather than a hook per screen, because three surfaces render the
 * same picture at once — the Learn hero, the settings account row, and the
 * account screen's own editor — and they have to change together. With a hook
 * each, choosing a new picture on the account screen would leave the tab behind
 * it showing the old one until something else remounted it.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { useAuth } from '@/features/auth/auth-provider';
import {
  clearAvatar,
  pickImage,
  readAvatar,
  setAvatar,
  type PickOutcome,
} from '@/features/profile/avatar';

/** What a change attempt did, for the caller to report. */
export type AvatarResult =
  | { kind: 'changed' }
  | { kind: 'cancelled' }
  | { kind: 'denied' }
  | { kind: 'failed' };

type AvatarValue = {
  /** The picture's URI, or null when there is none to show. */
  uri: string | null;
  /** False until the stored picture has been looked up. */
  ready: boolean;
  /** True while the picker is open or a copy is in flight. */
  busy: boolean;
  /** Opens the library and stores what the user picks. Never throws. */
  choose: () => Promise<AvatarResult>;
  /** Removes the picture. Never throws. */
  clear: () => Promise<void>;
};

const AvatarContext = createContext<AvatarValue | null>(null);

export function AvatarProvider({ children }: { children: ReactNode }) {
  // Nested inside `AuthProvider` — see the provider order in `app/_layout.tsx`.
  const { user, isGuest } = useAuth();
  const [uri, setUri] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  /**
   * Who the picture belongs to.
   *
   * `null` for a guest and for the moment before a session is restored, which
   * is the same value `avatar.ts` treats as device-local. A signed-in account
   * uses its own id, so a picture set under one account is never shown under
   * another. See `isVisibleTo`.
   */
  const ownerId = isGuest ? null : (user?.id ?? null);

  useEffect(() => {
    let cancelled = false;
    setReady(false);
    void readAvatar(ownerId).then((found) => {
      if (cancelled) return;
      setUri(found);
      setReady(true);
    });
    return () => {
      cancelled = true;
    };
  }, [ownerId]);

  const choose = useCallback(async (): Promise<AvatarResult> => {
    setBusy(true);
    try {
      const outcome: PickOutcome = await pickImage();
      if (outcome.kind !== 'picked') return { kind: outcome.kind };

      const stored = await setAvatar(ownerId, outcome.uri);
      if (!stored) return { kind: 'failed' };
      setUri(stored);
      return { kind: 'changed' };
    } finally {
      // In a `finally` rather than on each branch: four returns is four chances
      // to leave a spinner running forever on the one path nobody tested.
      setBusy(false);
    }
  }, [ownerId]);

  const clear = useCallback(async () => {
    setBusy(true);
    try {
      await clearAvatar();
      setUri(null);
    } finally {
      setBusy(false);
    }
  }, []);

  const value = useMemo<AvatarValue>(
    () => ({ uri, ready, busy, choose, clear }),
    [uri, ready, busy, choose, clear],
  );

  return <AvatarContext.Provider value={value}>{children}</AvatarContext.Provider>;
}

export function useAvatar(): AvatarValue {
  const ctx = useContext(AvatarContext);
  if (!ctx) throw new Error('useAvatar must be used inside <AvatarProvider>');
  return ctx;
}
