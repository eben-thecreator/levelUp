import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function JobLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#1C1B1F' : '#FFFFFF',
        },
        headerTintColor: isDark ? '#E6E0E9' : '#1C1B1F',
        headerTitleStyle: {
          fontWeight: '600',
        },
        contentStyle: {
          backgroundColor: isDark ? '#1C1B1F' : '#F7F2FA',
        },
      }}
    >
      <Stack.Screen
        name="new"
        options={{
          title: 'New Survey',
          presentation: 'card',
        }}
      />
      <Stack.Screen
        name="[id]/index"
        options={{
          title: 'Survey Details',
        }}
      />
      <Stack.Screen
        name="[id]/setup"
        options={{
          title: 'Instrument Setup',
        }}
      />
      <Stack.Screen
        name="[id]/results"
        options={{
          title: 'Results & Analysis',
        }}
      />
      <Stack.Screen
        name="[id]/export"
        options={{
          title: 'Export & Share',
        }}
      />
    </Stack>
  );
}