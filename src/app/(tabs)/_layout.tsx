import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { useTranslation } from 'react-i18next';

import { useTheme } from '@/theme/theme-provider';

export default function TabsLayout() {
  const { t } = useTranslation();
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textFaint,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}>
      <Tabs.Screen
        name="learn"
        options={{
          title: t('tabs.learn'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="book-outline" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="exam"
        options={{
          title: t('tabs.exam'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="checkmark-done-outline" size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t('tabs.settings'),
          tabBarIcon: ({ color, size }) => (
            <Ionicons color={color} name="settings-outline" size={size} />
          ),
        }}
      />
    </Tabs>
  );
}
