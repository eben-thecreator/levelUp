import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { ClipboardList } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={styles.container}>
      <ClipboardList 
        size={64} 
        color={isDark ? '#79747E' : '#CAC4D0'} 
        strokeWidth={1.5}
      />
      <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  message: {
    fontSize: 14,
    textAlign: 'center',
    maxWidth: 250,
  },
});

export default EmptyState;