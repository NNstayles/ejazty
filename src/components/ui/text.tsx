import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import type { ColorTokens, TypographyVariant } from '@/theme/tokens';

export type TextProps = RNTextProps & {
  variant?: TypographyVariant;
  /** Semantic colour token; defaults to primary body text. */
  tone?: keyof Pick<
    ColorTokens,
    'text' | 'textMuted' | 'textFaint' | 'primary' | 'onPrimary' | 'success' | 'danger' | 'warning' | 'info'
  >;
  center?: boolean;
};

/** Hoisted so the centred branch is not a fresh object per render. */
const CENTER = { textAlign: 'center' } as const;

/**
 * Resolved colour/alignment styles, keyed by the three values that decide them.
 *
 * Cached for the same reason `elevation` is, and it matters more here: `Text` is
 * the most instantiated component in the app by a wide margin — a Learn section
 * card carries six of them and a dozen cards are mounted at once — and it was
 * allocating a fresh object on every render of every one. The identity is worth
 * as much as the allocation: React Native diffs styles by reference first, so a
 * new object each time means the whole style is re-flattened and re-sent even
 * when nothing about it has changed.
 *
 * The key space is tiny and closed. Nine tones times two alignments times two
 * directions is an upper bound of 36 entries, and a real session sees three or
 * four: alignment and direction are fixed by the language, so only the tone
 * varies while a screen is open.
 */
const toneStyles = new Map<string, object>();

function toneStyle(
  color: string,
  textAlign: 'left' | 'right',
  writingDirection: 'ltr' | 'rtl',
): object {
  const key = `${color}|${textAlign}|${writingDirection}`;
  const cached = toneStyles.get(key);
  if (cached) return cached;
  const style = { color, textAlign, writingDirection };
  toneStyles.set(key, style);
  return style;
}

export function Text({
  variant = 'body',
  tone = 'text',
  center,
  style,
  ...rest
}: TextProps) {
  // Both come from the theme rather than the module, and for the same kind of
  // reason: neither is a constant. Line height is script-dependent — an explicit
  // one clamps rather than grows, so Arabic read off the Latin scale renders
  // clipped. Alignment is language-dependent, and reading it from the theme is
  // what makes switching to Arabic take effect on the next frame instead of the
  // next launch.
  const { colors, typography, paragraphAlign, writingDirection } = useTheme();
  return (
    <RNText
      style={[
        typography[variant],
        // `writingDirection` as well as the alignment: alignment picks the side
        // a line sits on, direction is what orders a mixed run — an Arabic
        // sentence containing a number or a Latin word reorders wrongly without
        // it.
        //
        // `paragraphAlign`, *not* the input alignment: React Native resolves
        // `textAlign` on a `<Text>` against the inherited Yoga direction and
        // swaps left/right under RTL, which a `<TextInput>` does not get. The
        // two used to be one theme value, and the swap turned it into a real
        // left edge on every paragraph in Arabic while the boxes around them
        // mirrored correctly. See `PARAGRAPH_ALIGN` in `@/i18n`.
        //
        // `center` still wins over the alignment, and an explicit `style` from
        // the caller still wins over everything.
        toneStyle(colors[tone], paragraphAlign, writingDirection),
        center && CENTER,
        style,
      ]}
      {...rest}
    />
  );
}
