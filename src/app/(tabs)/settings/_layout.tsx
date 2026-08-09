import { Stack } from 'expo-router';

import { useStackScreenOptions } from '@/theme/navigation';

export default function SettingsLayout() {
  return (
    <Stack screenOptions={useStackScreenOptions()}>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
