/**
 * The floating tab bar.
 *
 * A dark pill that hovers over the content rather than a full-width bar welded
 * to the bottom edge. Three things follow from that shape, and all three are the
 * reason this is a custom component instead of `tabBarStyle` on the stock bar:
 *
 * - **It is near-black in both schemes** (`colors.tabBar`). This is the one
 *   place the palette stops tracking the theme, and it is structural: the bar
 *   floats over whatever is scrolling underneath it, so it has to separate from
 *   *content* rather than from the page. A surface-coloured bar passing over a
 *   surface-coloured card separates from nothing.
 * - **The selection is one circle that travels**, not a highlight that fades in
 *   under each icon in turn. A single moving object is what makes the bar read
 *   as a control with a position in it; three independent fades read as three
 *   buttons that happen to light up.
 * - **No labels.** Three destinations on a pill this size, with icons that
 *   animate their own idea (see `tab-icons.tsx`). The names survive for screen
 *   readers through `accessibilityLabel`, which is where they were doing the
 *   real work anyway.
 */

import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import { useCallback } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { PressableScale } from '@/components/ui/pressable-scale';
import { Texture } from '@/components/ui/texture';
import { selectionTap } from '@/lib/haptics';
import { spring, useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';
import { elevation, radius } from '@/theme/tokens';

/**
 * One destination in the navigator's state.
 *
 * A named alias rather than `(typeof state.routes)[number]` written inline. The
 * inline form is a *type* query on a value that is otherwise unused in the
 * handler, which `react-hooks/exhaustive-deps` cannot distinguish from a real
 * read — so it asks for `state` in the dependency array, and adding it would
 * rebuild the handler on every navigation for no reason.
 */
type TabRoute = BottomTabBarProps['state']['routes'][number];

/** Width of one destination's slot. The travelling circle is sized to it. */
const SLOT = 58;
/** Height of the pill itself, excluding the gap below it. */
export const TAB_BAR_HEIGHT = 64;
/** Gap between the pill and the safe-area edge below it. */
const TAB_BAR_GAP = 14;
/** Padding inside the pill, around the row of slots. */
const BAR_PADDING = 6;

/**
 * Bottom padding a scrolling screen needs so the bar never covers its last row.
 *
 * Read by every screen inside `(tabs)` rather than being applied by `Screen`
 * itself, because `Screen` is also used by the auth flow, the language picker
 * and the account detail screen — none of which have a tab bar, and all of which
 * would end up with a hundred points of dead space at the bottom.
 *
 * The safe-area inset is included: the pill sits *above* the home indicator, so
 * the space to clear is the indicator plus the pill plus both gaps.
 */
export function useTabBarClearance(): number {
  const insets = useSafeAreaInsets();
  return TAB_BAR_HEIGHT + TAB_BAR_GAP * 2 + insets.bottom;
}

export function FloatingTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { colors, isRTL } = useTheme();
  const insets = useSafeAreaInsets();
  // Destructured to a plain boolean before the worklet below closes over it:
  // the body of `useDerivedValue` runs on the UI thread, and capturing the
  // whole `Motion` object would ship its methods across the bridge. Same rule
  // as `useFocusDrive` in `tab-icons.tsx`.
  const { reduced } = useMotion();

  const count = state.routes.length;
  const active = state.index;

  /*
    Whether the focused screen has asked for the bar to go away.

    A custom `tabBar` is rendered verbatim by `BottomTabView` — `tabBarStyle` is
    read *inside* the stock `BottomTabBar` and never reaches a replacement — so
    honouring it is this component's job. That is not cosmetic: the exam session
    hides the bar because it is otherwise a way out of a running attempt that
    skips the quit confirmation, leaving the attempt counting down in the
    background to auto-submit itself as a failure.

    Flattened rather than read directly, because `tabBarStyle` is a `StyleProp`
    and may legitimately arrive as an array.

    The cast is narrowing an *animated* style union down to a plain one.
    react-navigation types this option as `WithAnimatedValue<StyleProp<ViewStyle>>`
    so the stock bar can drive its own hide/show animation through it, which
    makes `display` unreadable on the union. Nothing in this app passes an
    animated value here — the only writer is the exam stack, with a literal —
    and a plain object is what `flatten` gets.
  */
  const focusedOptions = descriptors[state.routes[active].key]?.options;
  const hidden =
    StyleSheet.flatten(focusedOptions?.tabBarStyle as StyleProp<ViewStyle>)
      ?.display === 'none';

  /*
    The travelling circle's offset, in points from the row's *start* edge.

    `translateX` is a physical transform — Yoga's `direction` mirrors layout but
    never touches a transform — so under RTL the row has already been flipped
    and slot 0 sits at the right. Negating the offset is what makes the circle
    travel toward slot 1 rather than off the end of the bar. This is the same
    class of detail as `Chevron` and `Gradient`: mirroring the box does not turn
    the thing that moves through it.
  */
  const offset = useDerivedValue<number>(
    () => {
      const target = active * SLOT * (isRTL ? -1 : 1);
      return reduced ? target : withSpring(target, spring.gentle);
    },
    [active, isRTL, reduced],
  );

  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: offset.value }],
  }));

  /*
    Deliberately the same three steps the stock `BottomTabBar` performs, because
    a replacement tab bar inherits its whole contract:

    - **`emit` first.** A listener may `preventDefault`, and navigating before
      asking is how a tab press escapes a screen that meant to intercept it.
    - **Dispatch with `target: state.key`.** A bare `navigation.navigate(name)`
      is resolved by walking *up* the navigator tree until something answers to
      that name, so it would find an ancestor's route of the same name before
      this navigator's. Scoping it to this state is what keeps a tab press a tab
      press.
    - **Emit `tabLongPress` too.** Nothing listens for it today, but it is part
      of the interface screens are entitled to expect from a tab bar, and its
      absence is the kind of gap that is only discovered by whoever needs it.
  */
  const press = useCallback(
    (route: TabRoute, focused: boolean) => {
      const event = navigation.emit({
        type: 'tabPress',
        target: route.key,
        canPreventDefault: true,
      });
      if (focused || event.defaultPrevented) return;
      selectionTap();
      navigation.dispatch({
        ...CommonActions.navigate(route.name, route.params),
        target: state.key,
      });
    },
    [navigation, state.key],
  );

  const longPress = useCallback(
    (route: TabRoute) => {
      navigation.emit({ type: 'tabLongPress', target: route.key });
    },
    [navigation],
  );

  // After every hook, never before one: an early return above `useDerivedValue`
  // would change the hook count between renders the moment the exam session
  // opens.
  if (hidden) return null;

  return (
    <View
      pointerEvents="box-none"
      style={[styles.dock, { paddingBottom: insets.bottom + TAB_BAR_GAP }]}>
      <View
        style={[
          styles.bar,
          { backgroundColor: colors.tabBar },
          elevation(colors.shadow, 3),
        ]}>
        {/*
          The bar's own finish, at reduced strength. Same reasoning as the
          screen background: a large area of one exact colour reads as absence.
          Weaker here because the bar is small and busy, and texture at full
          strength competes with the glyphs sitting on it.
        */}
        <View pointerEvents="none" style={styles.texture}>
          {/*
            An explicit light mark rather than the themed default. This bar is
            near-black in both schemes, and `Texture`'s default mark is
            `colors.text` — which in light mode is a near-black dot on a
            near-black bar. See the note on that prop.
          */}
          <Texture color="#FFFFFF" intensity={1.2} variant="dots" />
        </View>

        <View style={[styles.row, { width: SLOT * count }]}>
          <Animated.View
            pointerEvents="none"
            style={[
              styles.indicator,
              { backgroundColor: colors.primary },
              indicatorStyle,
            ]}
          />

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const focused = index === active;
            const icon = options.tabBarIcon;

            return (
              <PressableScale
                accessibilityLabel={options.title ?? route.name}
                accessibilityRole="tab"
                accessibilityState={{ selected: focused }}
                key={route.key}
                onLongPress={() => longPress(route)}
                onPress={() => press(route, focused)}
                scaleTo={0.9}
                style={styles.slot}>
                {icon
                  ? icon({
                      focused,
                      // The glyph on the filled circle has to clear it, so the
                      // focused colour is `onPrimary` rather than the brand —
                      // brand-on-brand is invisible.
                      color: focused ? colors.onPrimary : colors.tabBarMuted,
                      size: 24,
                    })
                  : null}
              </PressableScale>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dock: {
    position: 'absolute',
    // Full-bleed, so the pill can centre itself in the screen rather than in
    // whichever half the reading direction starts from. Both physical edges
    // pinned together is direction-neutral — the exception `Screen`'s wash
    // documents.
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
  },
  bar: {
    flexDirection: 'row',
    padding: BAR_PADDING,
    height: TAB_BAR_HEIGHT,
    alignItems: 'center',
    borderRadius: radius.pill,
    overflow: 'hidden',
  },
  texture: { ...StyleSheet.absoluteFillObject },
  row: { flexDirection: 'row', alignItems: 'center' },
  indicator: {
    position: 'absolute',
    // `start`, not `left`: the row mirrors under RTL and the circle's resting
    // position has to mirror with it. The travel is handled by the transform
    // above, which does not.
    start: 0,
    width: SLOT,
    height: TAB_BAR_HEIGHT - BAR_PADDING * 2,
    borderRadius: radius.pill,
  },
  slot: {
    width: SLOT,
    height: TAB_BAR_HEIGHT - BAR_PADDING * 2,
    alignItems: 'center',
    justifyContent: 'center',
    // Lifts the glyphs above the travelling circle, which is an absolutely
    // positioned sibling declared before them. Paint order alone would do it on
    // iOS; `zIndex` is what makes it explicit on both. Deliberately *not*
    // `elevation` — that would give every slot its own Android drop shadow to
    // solve a stacking problem.
    zIndex: 1,
  },
});
