import { Redirect } from 'expo-router';

import { useAuth } from '@/features/auth/auth-provider';
import { usePreferences } from '@/preferences/preferences-provider';

/**
 * Entry gate for the flow: choose a language, then authenticate, then the tabs.
 */
export default function Index() {
  const { onboarded } = usePreferences();
  const { ready, isAuthenticated } = useAuth();

  if (!onboarded) return <Redirect href="/language" />;
  // Wait for the persisted session before deciding, so a signed-in user is
  // never bounced to the sign-in screen on a cold start.
  if (!ready) return null;
  if (!isAuthenticated) return <Redirect href="/sign-in" />;
  return <Redirect href="/learn" />;
}
