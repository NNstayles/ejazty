import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { typography, type TypographyVariant } from '@/theme/tokens';
import type { ColorTokens } from '@/theme/tokens';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  /** Semantic colour token; defaults to primary body text. */
  tone?: keyof Pick<
    ColorTokens,
    'text' | 'textMuted' | 'textFaint' | 'primary' | 'onPrimary' | 'success' | 'danger' | 'warning' | 'info'
  >;
  center?: boolean;
};

export function Text({
  variant = 'body',
  tone = 'text',
  center,
  style,
  ...rest
}: TextProps) {
  const { colors } = useTheme();
  return (
    <RNText
      style={[
        typography[variant],
        { color: colors[tone] },
        center && { textAlign: 'center' },
        style,
      ]}
      {...rest}
    />
  );
}
