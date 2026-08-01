import 'react-native-url-polyfill/auto';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * `EXPO_PUBLIC_` variables are inlined at build time by the Expo bundler. The
 * anon key is designed to be public — row level security on the Supabase side,
 * not secrecy of this key, is what protects your data.
 */
const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

/**
 * Null until credentials are supplied, so the app can boot and be explored
 * before a Supabase project exists. Callers must handle the null case.
 */
export const supabase: SupabaseClient | null = isSupabaseConfigured
  ? createClient(url!, anonKey!, {
      auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        // There is no URL bar to parse a session out of in a native app.
        detectSessionInUrl: false,
      },
    })
  : null;
