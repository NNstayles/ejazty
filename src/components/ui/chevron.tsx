import Ionicons from '@expo/vector-icons/Ionicons';

import { useTheme } from '@/theme/theme-provider';

/**
 * Which way along the reading order the chevron points.
 *
 * Both are reading-order words rather than compass ones: `forward` is "deeper
 * in", `back` is "the way you came". Which glyph draws that is a question about
 * the language, not about the component.
 */
export type ChevronPoints = 'forward' | 'back';

/**
 * The directional chevron on a navigable row or a back button.
 *
 * Exists because layout mirroring and glyph direction are two separate
 * problems, and fixing only the first is what makes an RTL screen look
 * *almost* right. The root `direction` moves this icon to the correct edge of
 * the card, but a chevron is a picture of an arrow: `chevron-forward` still
 * points right after the row has flipped, so it ends up on the left edge of an
 * Arabic card pointing back the way the user came.
 *
 * The truth table is one line — a chevron points right when travelling forward
 * in an LTR language *or* backward in an RTL one, which is exactly `points ===
 * 'forward'` disagreeing with `isRTL`.
 */
export function Chevron({
  size = 20,
  points = 'forward',
  tone = 'textFaint',
  color,
}: {
  size?: number;
  points?: ChevronPoints;
  /** Semantic colour token. A back button wants full-strength `text`. */
  tone?: 'text' | 'textMuted' | 'textFaint' | 'primary';
  /**
   * An explicit colour, winning over `tone`.
   *
   * For the one case a token cannot answer: a card drawn on one of the pastel
   * `tints` carries its own checked ink, and that colour is deliberately not in
   * `ColorTokens` — it is only safe against the fill it is paired with. Reading
   * `textFaint` there would put a neutral tuned for `surface` onto a coloured
   * background, which is exactly the contrast mistake the tint pairs exist to
   * prevent.
   */
  color?: string;
}) {
  const { colors, isRTL } = useTheme();
  const pointsRight = (points === 'forward') !== isRTL;
  return (
    <Ionicons
      color={color ?? colors[tone]}
      name={pointsRight ? 'chevron-forward' : 'chevron-back'}
      size={size}
    />
  );
}
