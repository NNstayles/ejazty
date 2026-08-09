import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Redirect, Tabs, usePathname, useRouter } from 'expo-router';
import { useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { runOnJS } from 'react-native-reanimated';

import {
  ExamTabIcon,
  LearnTabIcon,
  SettingsTabIcon,
} from '@/components/icons/tab-icons';
import { FloatingTabBar } from '@/components/ui/floating-tab-bar';
import { useAuth } from '@/features/auth/auth-provider';
import { IMMERSIVE_EXAM_ROUTES, swipeTarget } from '@/features/navigation/tabs';
import { selectionTap } from '@/lib/haptics';
import { useMotion } from '@/lib/motion';
import { useTheme } from '@/theme/theme-provider';

// Screens inside the exam stack that own the whole display. Imported rather
// than restated: hiding the tab bar and refusing a swipe are the two halves of
// the same rule, and they used to be two lists that could disagree. See
// `IMMERSIVE_EXAM_ROUTES`.
const FULLSCREEN_EXAM_ROUTES: readonly string[] = IMMERSIVE_EXAM_ROUTES;

/**
 * How far the finger must travel before a swipe counts as a tab change.
 *
 * Generous on purpose. The alternative failure is worse than a swipe that does
 * not register: these screens are long vertical scrolls, and a tab change
 * triggered by a slightly diagonal flick is a reader losing their place in a
 * 111-row list they were halfway down.
 */
const SWIPE_DISTANCE = 60;

/** A fast flick counts even when it is short. */
const SWIPE_VELOCITY = 500;

export default function TabsLayout() {
  const { t } = useTranslation();
  const { ready, isAuthenticated } = useAuth();
  const motion = useMotion();
  const router = useRouter();
  const pathname = usePathname();
  const { isRTL } = useTheme();

  /**
   * Resolves a finished swipe and moves, on the JS thread.
   *
   * **Everything this needs is closed over, and only a number crosses from the
   * worklet.** That is not a style choice. Reanimated serialises the arguments
   * handed to a `runOnJS` call, and a *function* passed that way does not
   * survive it — it arrives on the other side as a plain object, and calling it
   * throws `go is not a function (it is Object)` at the end of every swipe.
   * Only the callable in the `runOnJS(fn)` position itself is preserved. So the
   * pathname, the direction and the router all stay on this side, where they
   * are ordinary values.
   */
  const completeSwipe = useCallback(
    (translationX: number) => {
      const target = swipeTarget(pathname, translationX, isRTL);
      if (!target) return;
      selectionTap();
      // `navigate`, not `push`: these are tab roots. Pushing would stack a
      // second copy of a tab the reader is arriving at.
      router.navigate(target);
    },
    [pathname, isRTL, router],
  );

  /**
   * Sideways swiping between the three tabs.
   *
   * Three settings carry this, and each is about *not* firing:
   *
   * - `activeOffsetX` means the gesture only takes over once the finger has
   *   committed horizontally. Without it the detector claims the touch
   *   immediately and every vertical scroll in the app stops working.
   * - `failOffsetY` gives the gesture up entirely once the finger has moved
   *   vertically, so a scroll that drifts sideways stays a scroll.
   * - The decision itself lives in `swipeTarget`, which mirrors for Arabic and
   *   Sorani and refuses to leave a running attempt. See `features/navigation`.
   *
   * `onEnd` rather than `onUpdate`: a tab change is discrete, and acting
   * mid-gesture would fire it while the finger is still deciding.
   */
  const swipe = useMemo(
    () =>
      Gesture.Pan()
        .activeOffsetX([-24, 24])
        .failOffsetY([-20, 20])
        .onEnd((event) => {
          'worklet';
          const far = Math.abs(event.translationX) > SWIPE_DISTANCE;
          const fast = Math.abs(event.velocityX) > SWIPE_VELOCITY;
          if (!far && !fast) return;

          // A number, and nothing else. See `completeSwipe`.
          runOnJS(completeSwipe)(event.translationX);
        }),
    [completeSwipe],
  );

  // Gated here rather than only at `/`: the index route is the entry gate, but
  // it is not on the path of a deep link. `ejazty://learn` mounts this
  // navigator directly, so without this check the scheme registered in
  // app.json is a way around the gate — and any screen added under (tabs)
  // later would inherit no protection at all. Default-deny belongs at the
  // group, not at one route.
  //
  // Waits for `ready` for the same reason index.tsx does: deciding before the
  // persisted session is restored reads as signed-out and bounces a signed-in
  // user to the sign-in screen on a cold start.
  if (!ready) return null;
  if (!isAuthenticated) return <Redirect href="/sign-in" />;

  return (
    <GestureDetector gesture={swipe}>
      {/*
        An `Animated.View` because the detector needs a single animated child to
        attach to, and a plain `View` makes gesture-handler wrap one anyway.
      */}
      <Animated.View style={styles.fill}>
        <Tabs
          screenOptions={{
            headerShown: false,
            // Stops a backgrounded tab re-rendering on every state change in a
            // provider above it — the Learn tab holds a 111-row list, and it was
            // repainting behind the exam runner once a second with the clock.
            freezeOnBlur: true,
            /*
              Tabs used to cut between screens with nothing in between, which is
              the one place in the app a change of context happened with no
              motion at all. `shift` slides the outgoing and incoming scenes a
              short distance in the direction of travel, so a tab change reads
              as moving along a row rather than as the screen being replaced —
              the same idea the travelling circle in the bar expresses, and the
              same one the swipe gesture above now drives directly.

              Collapsed to `none` under reduced motion. This is a *sliding*
              scene transition, which is exactly the category the OS setting
              exists to suppress, and unlike an entrance animation there is
              nothing to lose by removing it: the destination is identical
              either way.
            */
            animation: motion.reduced ? 'none' : 'shift',
          }}
          /*
            A custom bar rather than the platform one. It floats over the
            content instead of sitting under it, which is what the whole layout
            is built around — see `FloatingTabBar` for the three consequences of
            that shape.

            Being an ordinary row in this tree is also what makes it mirror: the
            app carries direction itself rather than through `I18nManager` (see
            the i18n notes in CLAUDE.md), so anything the *platform* lays out
            stays left-to-right over a screen that has flipped. The stock tab
            bar was in that category; this one is not.
          */
          tabBar={(props) => <FloatingTabBar {...props} />}>
          <Tabs.Screen
            name="learn"
            options={{
              title: t('tabs.learn'),
              tabBarIcon: ({ color, focused }) => (
                <LearnTabIcon color={color} focused={focused} size={24} />
              ),
            }}
          />
          <Tabs.Screen
            name="exam"
            options={({ route }) => {
              // The tab bar is a way out of a running attempt that skips the quit
              // confirmation entirely: the session provider lives above this
              // navigator, so an abandoned attempt keeps counting down in the
              // background and auto-submits itself into history as a failure.
              // Hiding the bar leaves the in-screen close button as the only exit.
              //
              // `tabBarStyle` stays the signal, but `FloatingTabBar` is what acts on
              // it: react-navigation renders a custom `tabBar` verbatim and reads
              // this option only inside its own stock bar. See the note there.
              const focused = getFocusedRouteNameFromRoute(route) ?? 'index';
              const fullscreen = FULLSCREEN_EXAM_ROUTES.includes(focused);

              return {
                title: t('tabs.exam'),
                tabBarStyle: fullscreen
                  ? { display: 'none' as const }
                  : undefined,
                tabBarIcon: ({ color, focused: isFocused }) => (
                  <ExamTabIcon color={color} focused={isFocused} size={24} />
                ),
              };
            }}
          />
          <Tabs.Screen
            name="settings"
            options={{
              title: t('tabs.settings'),
              tabBarIcon: ({ color, focused }) => (
                <SettingsTabIcon color={color} focused={focused} size={24} />
              ),
            }}
          />
        </Tabs>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({ fill: { flex: 1 } });
