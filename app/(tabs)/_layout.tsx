import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';
import { Home, FileText, Settings } from 'lucide-react-native';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#6750A4',
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#908D99' : '#79747E',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1C1B1F' : '#FFFFFF',
        },
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1C1B1F' : '#FFFFFF',
        },
        headerTitleStyle: {
          color: colorScheme === 'dark' ? '#E6E0E9' : '#1C1B1F',
          fontWeight: '600',
        }
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Surveys',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color, size }) => <FileText size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => <Settings size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}