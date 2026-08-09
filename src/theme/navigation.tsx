/**
 * Shared screen options for the native stacks under `(tabs)`.
 *
 * The three stack layouts (learn, exam, settings) had the same options copied
 * into each, which is how a header ends up themed in two screens and default in
 * the third. Reading them from one hook is also what lets the mirrored header
 * below reach every stack at once.
 */

import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import { useMemo } from 'react';

import { ScreenHeader } from '@/components/ui/screen-header';
import { duration, useMotion } from '@/lib/motion';
import { useTheme } from './theme-provider';

export function useStackScreenOptions(): NativeStackNavigationOptions {
  const { colors, isRTL } = useTheme();
  const motion = useMotion();
  const reduced = motion.reduced;

  return useMemo(
    () => ({
      contentStyle: { backgroundColor: colors.background },
      /*
        Stops the screen underneath rendering while it is covered.

        The tab navigator has had this since the Learn tab was found repainting
        its 111-row list behind the exam runner once a second with the clock.
        The same argument applies one level down and was simply missed: pushing
        a Learn section over the Learn index leaves the index mounted, so every
        frame of the push animation is competing with a list that is still
        laying itself out behind it. That contention is what a slide reads as
        when it stutters — the animation itself is on the UI thread and cheap.
      */
      freezeOnBlur: true,
      /*
        A JS header in place of the platform one, and this is the change that
        finally carried the mirroring all the way to the top of the screen.

        A native header is laid out by the platform — a `UINavigationBar`, an
        Android `Toolbar` — and the platform takes its direction from
        `I18nManager.isRTL`, which this app deliberately keeps false so that
        switching language does not need a relaunch. The result was a header
        that stayed left-to-right over a screen that had mirrored: the back
        button on the left, the title left-aligned on Android, while the content
        below it and the tab bar beneath that both ran right-to-left. The
        detail screen even slid in from the left *toward* the back button.

        `ScreenHeader` is an ordinary row in the same tree, so it inherits the
        root's `direction` like everything else and flips on the frame the
        language changes. See that component for the three things it has to do
        itself because the platform is no longer doing them (the status-bar
        inset, the back glyph, the balanced title).

        `NativeStackView` sets `headerShown: false` natively whenever a custom
        `header` is supplied, so there is no second bar underneath this one.
      */
      header: ({ options, navigation, back }) => (
        <ScreenHeader
          onBack={back ? navigation.goBack : undefined}
          // Empty rather than react-navigation's `route.name` fallback. Both
          // screens with a header set their title from inside the screen body,
          // which lands a frame after the header first paints — and the route
          // name for the Learn detail screen is the literal `[section]`. A
          // blank title for one frame is a title arriving; `[section]` is a
          // bug on screen.
          title={options.title ?? ''}
        />
      ),
      /*
        Push a detail screen in from the side the language *ends* on, so it
        arrives from the direction the reader is travelling: right-to-left in
        English, left-to-right in Arabic and Sorani.

        The native stack cannot infer this either, and for the same reason as
        the header above.

        Collapsed to a cross-fade under reduced motion, for the reason the tab
        navigator collapses `shift` to `none`: a horizontal slide is exactly the
        category the OS setting exists to suppress. `fade` rather than `none`
        because a stack push *does* change context in a way a tab change does
        not — the destination is a new screen with a back button, and cutting
        to it with nothing in between reads as a glitch.
      */
      animation: reduced ? 'fade' : isRTL ? 'slide_from_left' : 'slide_from_right',
      /*
        Android's native stack defaults to a noticeably slower push than iOS's,
        which is what made the same navigation feel heavier on one platform than
        the other. Naming it here puts the stack on the app's own duration scale
        alongside every other animation, instead of inheriting a platform
        default nothing else in the app matches. Ignored by iOS, which uses the
        system push — so this narrows the gap rather than widening it.
      */
      animationDuration: motion.ms(duration.slow),
    }),
    [colors, isRTL, reduced, motion],
  );
}
