import type { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type ViewStyle } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

import { useTheme } from '@/theme/theme-provider';
import { elevation, radius, spacing, type GradientTokens } from '@/theme/tokens';
import { Gradient } from './gradient';
import { Text } from './text';
import { Texture, type TextureVariant } from './texture';

/** Height of the wash behind a screen's hero block. */
const WASH_HEIGHT = 300;

/**
 * Height of the ambient bloom, as a share of the screen.
 *
 * Well past the wash it sits under, because the two are doing different jobs: a
 * wash is a band behind a hero block and wants an edge you can place, while the
 * bloom is the light in the room and wants to run out rather than stop. Ending
 * it at 300pt as well would draw exactly the horizontal seam it exists to avoid.
 */
const BLOOM_HEIGHT = '62%';

export function Screen({
  children,
  scroll = true,
  edges = ['top'],
  contentStyle,
  /**
   * A tinted wash behind the top of the screen, fading into the background.
   *
   * This is the app's main piece of atmosphere and it is opt-in for a reason:
   * it works because it appears on the screens that open a section and not on
   * the ones you scroll through. A wash on every screen is wallpaper.
   */
  wash,
  /**
   * The background finish. On by default — see `Texture` for why a flat fill is
   * the thing worth removing. Pass `'none'` only for a screen that is itself
   * one large piece of artwork.
   */
  texture = 'grain',
}: {
  children: ReactNode;
  scroll?: boolean;
  edges?: readonly Edge[];
  contentStyle?: ViewStyle;
  wash?: Extract<keyof GradientTokens, `${string}Wash`>;
  texture?: TextureVariant | 'none';
}) {
  const { colors } = useTheme();
  const body = scroll ? (
    <ScrollView
      /*
        Insets the scroll view by the keyboard rather than letting it cover the
        field being typed into. iOS only — it maps onto UIScrollView's own
        keyboard inset behaviour and is ignored on Android, which already
        resizes the window (`softwareKeyboardLayoutMode` defaults to `resize`).

        Every form in the app goes through this component and none of them
        handled the keyboard at all: the account screen stacks five password
        fields down a long scroll and the delete-account field is the last
        control on it, so on iOS focusing it put the caret behind the keyboard
        with the button that acts on it hidden underneath. The auth screens are
        shorter but fail the same way on a small device in landscape.

        Set here rather than per screen precisely because it is the kind of
        thing a new form would be written without.
      */
      automaticallyAdjustKeyboardInsets
      contentContainerStyle={[styles.scrollContent, contentStyle]}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}>
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.flex, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView
      edges={edges}
      style={[styles.flex, { backgroundColor: colors.background }]}>
      {/*
        Drawn before the body and never wrapped around it: the wash has to sit
        *under* a scrolling list without scrolling with it, and it must not
        intercept touches. Both follow from it being an absolutely positioned
        sibling rather than a container.

        `vertical` rather than the default diagonal — a wash has no emphasis to
        place, it is just the top of the screen being warmer than the bottom,
        and a diagonal one puts a visible corner-to-corner seam behind the
        heading.
      */}
      {/*
        Ambient light, under everything and on every screen.

        Not a second wash, and the difference is the whole reason it can be
        unconditional. A wash is a *statement* — a coloured band that says this
        screen opens something — which is why it is opt-in and why putting one
        everywhere would turn it into wallpaper. This is a fraction of that
        strength and has no edge to notice: it exists so a screen has a light
        source rather than being lit from nowhere. The detail screens carry no
        wash at all, and were the flattest surfaces in the app before it.

        Drawn first, so a screen that *does* opt into a wash simply has the
        stronger statement on top and loses nothing.
      */}
      <Gradient
        direction="vertical"
        pointerEvents="none"
        style={styles.bloom}
        tone="bloom"
      />
      {wash ? (
        <Gradient
          direction="vertical"
          pointerEvents="none"
          style={styles.wash}
          tone={wash}
        />
      ) : null}
      {/*
        Over the wash, not under it. The wash is close to opaque at the top of
        the screen, so a texture beneath it would fade out exactly where the
        heading sits — the part of the screen most worth giving a surface to.
      */}
      {texture === 'none' ? null : <Texture variant={texture} />}
      {body}
    </SafeAreaView>
  );
}

export function Card({
  children,
  style,
  padded = true,
  /**
   * A hairline of colour along the leading edge.
   *
   * For a card whose *category* matters at a glance — a passed attempt, a red
   * dashboard tell-tale. It is a 3pt rule rather than a tinted card background
   * because a tinted surface changes the contrast every piece of copy on the
   * card is read against, and there is no accent that stays safe for body text
   * in both schemes.
   */
  accent,
  /** Lift. Level 2 is for something that should read as detached from the page. */
  level = 1,
  /**
   * The card's surface finish. On by default, for the reason `Texture`
   * documents: a flat fill reads as absence rather than as material, and a card
   * is the surface a reader spends the most time looking at.
   *
   * ## It is a sheen now, not a pattern, and that is a performance change
   *
   * This used to render a `Texture` — an SVG surface carrying its own `Defs`
   * and `Pattern` — *per card*. One screen is a dozen of those: eight on
   * settings, seven tiles on the Learn home, plus the screen's own. An SVG view
   * is markedly more expensive to mount than a gradient, and the cards paying
   * for it are exactly the ones a virtualised list mounts and discards while
   * the reader's finger is moving.
   *
   * A single `LinearGradient` is one native view and says the thing that
   * actually needed saying. A raised card is not made of paper with grain in
   * it; it is a plane catching the light, and one soft sweep across it reads as
   * material more convincingly than a dot field ever did. The screen behind it
   * keeps the grain, so the two surfaces are still told apart by their finish —
   * which is what the old `intensity` below 1 was for.
   *
   * **`false` still turns it off for a virtualised list row.** Cheap is not
   * free, the Learn section list runs to 181 rows and open practice can review
   * several hundred, and those cards are mostly artwork anyway.
   */
  texture = true,
}: {
  children: ReactNode;
  style?: ViewStyle | ViewStyle[];
  padded?: boolean;
  accent?: string;
  level?: 1 | 2;
  texture?: boolean;
}) {
  const { colors } = useTheme();
  return (
    <View
      style={[
        styles.card,
        padded && { padding: spacing.lg },
        { backgroundColor: colors.surface, borderColor: colors.border },
        elevation(colors.shadow, level),
        style,
      ]}>
      {/*
        Under the children and over the fill, clipped to the rounded corner by
        the `overflow: 'hidden'` the accent rule already needs.

        Translucent rather than opaque, which is what lets it sit on a card
        whose fill the caller has replaced — the Learn grid draws its tiles on
        `tints`, and an opaque sheen would paint the tint out. See the `sheen`
        token for why both of its stops are one colour at two alphas.
      */}
      {texture ? (
        <Gradient
          direction="vertical"
          pointerEvents="none"
          style={StyleSheet.absoluteFill}
          tone="sheen"
        />
      ) : null}
      {/*
        Absolutely positioned rather than a laid-out sibling, and this is
        load-bearing: callers pass layout through `style` — `flexDirection:
        'row'` on a card holding an icon, a body and a chevron — and that style
        has to land on the same element as the children or their arrangement
        changes. Wrapping the children to make room for a rule would silently
        restack every row card in the app.

        `start`, not `left`, so the rule follows the reading direction under the
        root's `direction: rtl` rather than staying pinned to the left edge in
        Arabic.
      */}
      {accent ? (
        <View
          pointerEvents="none"
          style={[styles.accentBar, { backgroundColor: accent }]}
        />
      ) : null}
      {children}
    </View>
  );
}

export function Badge({
  label,
  tone = 'info',
}: {
  label: string;
  tone?: 'info' | 'success' | 'danger' | 'warning' | 'primary';
}) {
  const { colors } = useTheme();
  const map = {
    info: { bg: colors.infoSoft, fg: colors.info },
    success: { bg: colors.successSoft, fg: colors.success },
    danger: { bg: colors.dangerSoft, fg: colors.danger },
    warning: { bg: colors.warningSoft, fg: colors.warning },
    primary: { bg: colors.primarySoft, fg: colors.primary },
  }[tone];

  return (
    <View style={[styles.badge, { backgroundColor: map.bg }]}>
      <Text variant="overline" style={{ color: map.fg }}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  wash: {
    position: 'absolute',
    top: 0,
    // The only physical edges left in `src/`, and deliberately so: pinning both
    // sides makes this full-bleed, which is direction-neutral. Everything with
    // an actual leading or trailing edge uses `start`/`end` so it mirrors under
    // the root's `direction` — see the note on `accentBar` below.
    left: 0,
    right: 0,
    height: WASH_HEIGHT,
  },
  bloom: {
    position: 'absolute',
    top: 0,
    // Full-bleed, so direction-neutral — the exception the wash above documents.
    left: 0,
    right: 0,
    height: BLOOM_HEIGHT,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
    gap: spacing.lg,
  },
  card: {
    borderRadius: radius.lg,
    borderWidth: StyleSheet.hairlineWidth,
    // Keeps the accent rule inside the rounded corner.
    overflow: 'hidden',
  },
  accentBar: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    start: 0,
    width: 3,
  },
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: radius.pill,
  },
});
