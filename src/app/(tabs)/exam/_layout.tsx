import { Stack } from 'expo-router';

import { ExamSessionProvider } from '@/features/exam/exam-session';
import { useTheme } from '@/theme/theme-provider';

export default function ExamLayout() {
  const { colors } = useTheme();
  return (
    // The provider sits above the stack so an in-progress attempt survives
    // navigation between the runner and the result screen.
    <ExamSessionProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: colors.background },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="session"
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="result"
          options={{ headerShown: false, gestureEnabled: false }}
        />
      </Stack>
    </ExamSessionProvider>
  );
}
