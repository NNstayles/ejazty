import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/theme/theme-provider';
import { radius } from '@/theme/tokens';
import { Text } from './text';

/**
 * The initial drawn when there is no picture.
 *
 * `Array.from` rather than `slice(0, 1)`, and this is not pedantry: a `string`
 * index is a UTF-16 code unit, so slicing one character off a name beginning
 * with an astral codepoint — an emoji, some extended scripts — yields half a
 * surrogate pair, which renders as the replacement glyph. Iterating the string
 * yields whole codepoints.
 *
 * `toUpperCase` is a no-op for Arabic and Sorani, which have no letter case;
 * that is correct rather than something to branch on.
 */
function initialOf(name: string): string {
  const first = Array.from(name.trim())[0];
  return first ? first.toUpperCase() : '?';
}

/**
 * A user's picture, or their initial on a tinted disc.
 *
 * ## The fallback is the normal state, not an error state
 *
 * Most accounts will never set a picture, and a guest cannot meaningfully have
 * one, so the initial has to look like a finished design rather than like a
 * missing image. It gets the brand tint and the display face, which is why this
 * is a component at all: the settings screen and the Learn hero had grown two
 * copies of that circle with different type in them.
 *
 * ## `expo-image`, and the ring
 *
 * `expo-image` is already a dependency and brings the memory/disk cache that
 * matters here — the hero re-renders on every tab focus, and `Image` from React
 * Native would re-decode the file each time. `recyclingKey` is the URI so a
 * changed picture cannot be served from the cache of the old one; `avatar.ts`
 * also mints a fresh filename per change, which is belt and braces on the same
 * failure.
 *
 * The ring is drawn as a border on a wrapper rather than on the image itself, so
 * it does not eat into the picture — `borderWidth` on an `Image` insets the
 * content, which crops a face by a couple of points at every size.
 */
export function Avatar({
  uri,
  name,
  size = 48,
  /** A brand ring around the disc, for the one place it is the subject. */
  ring = false,
}: {
  uri: string | null;
  /** Used for the initial when there is no picture. */
  name: string;
  size?: number;
  ring?: boolean;
}) {
  const { colors, typography } = useTheme();
  const border = ring ? Math.max(2, Math.round(size * 0.045)) : 0;
  // The disc inside the ring, so the ring sits outside the picture rather than
  // over it.
  const inner = size - border * 2;

  /*
    The initial is sized to the disc, so its line height has to be sized with
    it. An explicit `lineHeight` is a clamp rather than a hint — see
    `typographyFor` — so overriding `fontSize` alone leaves the glyph in the
    variant's box and cuts the top off it. At the 96pt hero size that is a 38pt
    letter in a 33pt Latin box.

    The ratio is taken from the resolved variant rather than being a constant,
    which is what carries the Arabic leading floor through: the same disc is a
    38/51 box in Arabic and a 38/51 one in Latin only because both are derived
    from the scale the theme already picked for the active script.
  */
  const glyphSize = Math.round(size * 0.4);
  const glyphLeading = typography.title.lineHeight / typography.title.fontSize;

  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: radius.pill,
          borderWidth: border,
          borderColor: ring ? colors.primary : 'transparent',
          backgroundColor: colors.primarySoft,
        },
      ]}>
      {uri ? (
        <Image
          contentFit="cover"
          recyclingKey={uri}
          source={{ uri }}
          style={{ width: inner, height: inner, borderRadius: radius.pill }}
          // Cross-fades rather than popping in. Short: this is a small element
          // that is usually cached, and a long fade on a cached hit reads as the
          // screen being slow.
          transition={160}
        />
      ) : (
        <Text
          center
          style={{
            color: colors.primary,
            fontSize: glyphSize,
            lineHeight: Math.ceil(glyphSize * glyphLeading),
          }}
          variant="title">
          {initialOf(name)}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});
