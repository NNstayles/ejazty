/**
 * Ejazty design tokens.
 *
 * Two semantic palettes (light / dark) sharing one token shape, so every screen
 * can read `colors.x` without branching on the active mode.
 */

import { Platform } from 'react-native';

/** Raw brand ramp. Green reads as "go / pass" and carries the motivating tone. */
const brand = {
  50: '#E7F8F0',
  100: '#C3EEDC',
  200: '#8FDDBE',
  300: '#57C89D',
  400: '#2AB07F',
  500: '#0E9F6E',
  600: '#0A8259',
  700: '#086847',
  800: '#064E36',
  900: '#043826',
} as const;

export type ColorTokens = {
  /** Screen background. */
  background: string;
  /** Raised surface: cards, list rows, sheets. */
  surface: string;
  /** Surface one step above `surface` (nested cards, pressed states). */
  surfaceAlt: string;
  /** Hairline dividers and card outlines. */
  border: string;
  /** Primary body copy. */
  text: string;
  /** Supporting copy, captions, metadata. */
  textMuted: string;
  /** Disabled / placeholder copy. */
  textFaint: string;
  /** Brand action colour. */
  primary: string;
  /** Pressed/active brand colour. */
  primaryPressed: string;
  /** Tinted brand background for chips and soft callouts. */
  primarySoft: string;
  /** Copy that sits on top of `primary`. */
  onPrimary: string;
  success: string;
  successSoft: string;
  danger: string;
  dangerSoft: string;
  warning: string;
  warningSoft: string;
  /** Colour for the "sample content" provenance banner. */
  info: string;
  infoSoft: string;
  /** Shadow colour (iOS) — Android uses elevation. */
  shadow: string;
};

export const palettes: Record<'light' | 'dark', ColorTokens> = {
  light: {
    background: '#F6F7F9',
    surface: '#FFFFFF',
    surfaceAlt: '#F0F2F5',
    border: '#E3E6EA',
    text: '#11181C',
    textMuted: '#5B6570',
    textFaint: '#98A1AB',
    primary: brand[500],
    primaryPressed: brand[600],
    primarySoft: brand[50],
    onPrimary: '#FFFFFF',
    success: '#0E9F6E',
    successSoft: '#E7F8F0',
    danger: '#D64545',
    dangerSoft: '#FCECEC',
    warning: '#B7791F',
    warningSoft: '#FDF6E3',
    info: '#2C6EBB',
    infoSoft: '#EAF2FC',
    shadow: '#0B1620',
  },
  dark: {
    background: '#0E1114',
    surface: '#171B1F',
    surfaceAlt: '#1F252A',
    border: '#2A3138',
    text: '#F2F4F6',
    textMuted: '#A2ACB6',
    textFaint: '#6B7681',
    primary: brand[400],
    primaryPressed: brand[300],
    primarySoft: '#0E2A20',
    onPrimary: '#04120C',
    success: brand[400],
    successSoft: '#0E2A20',
    danger: '#F27979',
    dangerSoft: '#2E1717',
    warning: '#E3B341',
    warningSoft: '#2B2312',
    info: '#6FA8E8',
    infoSoft: '#132436',
    shadow: '#000000',
  },
};

/** 4pt spacing scale. */
export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 48,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  pill: 999,
} as const;

export const typography = {
  display: { fontSize: 32, lineHeight: 38, fontWeight: '700' },
  title: { fontSize: 24, lineHeight: 30, fontWeight: '700' },
  heading: { fontSize: 19, lineHeight: 25, fontWeight: '600' },
  body: { fontSize: 16, lineHeight: 24, fontWeight: '400' },
  bodyStrong: { fontSize: 16, lineHeight: 24, fontWeight: '600' },
  caption: { fontSize: 13, lineHeight: 18, fontWeight: '400' },
  overline: { fontSize: 11, lineHeight: 14, fontWeight: '700' },
} as const;

export type TypographyVariant = keyof typeof typography;

/**
 * Card elevation. iOS gets a soft shadow, Android uses the native elevation
 * channel, web falls back to a box-shadow.
 */
export const elevation = (color: string, level: 1 | 2 = 1) =>
  Platform.select({
    ios: {
      shadowColor: color,
      shadowOpacity: level === 1 ? 0.06 : 0.12,
      shadowRadius: level === 1 ? 8 : 16,
      shadowOffset: { width: 0, height: level === 1 ? 2 : 6 },
    },
    android: { elevation: level === 1 ? 2 : 6 },
    default: {
      boxShadow:
        level === 1
          ? `0 2px 8px ${color}14`
          : `0 6px 16px ${color}1F`,
    },
  }) as object;
