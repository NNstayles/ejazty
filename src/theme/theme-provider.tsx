import { createContext, useContext, useMemo, type ReactNode } from 'react';
import { useColorScheme } from 'react-native';

import { usePreferences } from '@/preferences/preferences-provider';
import { palettes, type ColorTokens } from './tokens';

type ThemeValue = {
  /** The mode actually being rendered, after resolving `system`. */
  scheme: 'light' | 'dark';
  colors: ColorTokens;
  isDark: boolean;
};

const ThemeContext = createContext<ThemeValue | null>(null);

export function AppThemeProvider({ children }: { children: ReactNode }) {
  const { themeMode } = usePreferences();
  const systemScheme = useColorScheme();

  const value = useMemo<ThemeValue>(() => {
    // `useColorScheme` can report null or 'unspecified'; anything that is not
    // explicitly dark falls back to light.
    const fromSystem: 'light' | 'dark' =
      systemScheme === 'dark' ? 'dark' : 'light';
    const scheme: 'light' | 'dark' =
      themeMode === 'system' ? fromSystem : themeMode;
    return { scheme, colors: palettes[scheme], isDark: scheme === 'dark' };
  }, [themeMode, systemScheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside <AppThemeProvider>');
  }
  return ctx;
}
