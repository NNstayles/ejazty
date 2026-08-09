import { Stack } from 'expo-router';

import { ExamSessionProvider } from '@/features/exam/exam-session';
import { useStackScreenOptions } from '@/theme/navigation';

export default function ExamLayout() {
  const screenOptions = useStackScreenOptions();
  return (
    // The provider sits above the stack so an in-progress attempt survives
    // navigation between the runner and the result screen.
    <ExamSessionProvider>
      <Stack screenOptions={screenOptions}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/*
          Both of these rise from the bottom rather than sliding in from the
          side, and the departure from the app's usual push is deliberate.

          A side push means "deeper into this section, and here is the way
          back". These two are neither: the session takes over the whole
          display, hides the tab bar and disables the back gesture, and the
          result is the thing it hands you at the end. Rising from the bottom is
          the platform's own idiom for entering a mode you have to finish
          rather than a page you can wander out of, and it matches what the
          screen then does — there is no back button, only Submit and Quit.

          It also side-steps the direction question the side animations carry:
          `slide_from_bottom` has no horizontal component, so unlike the
          `slide_from_left`/`right` pair in `useStackScreenOptions` it does not
          need mirroring for Arabic and Sorani.
        */}
        <Stack.Screen
          name="session"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_bottom',
          }}
        />
        <Stack.Screen
          name="result"
          options={{
            headerShown: false,
            gestureEnabled: false,
            animation: 'slide_from_bottom',
          }}
        />
      </Stack>
    </ExamSessionProvider>
  );
}
