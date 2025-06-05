import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { ClipboardList } from 'lucide-react-native';
import { colors } from '@/utils/colors';

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  
  return (
    <View style={styles.container}>
      <View 
        style={[
          styles.iconContainer,
          { backgroundColor: theme.surface, borderColor: theme.border }
        ]}
      >
        <ClipboardList 
          size={32} 
          color={theme.primary}
          strokeWidth={1.5}
        />
      </View>
      
      <Text style={[styles.title, { color: theme.text }]}>
        {title}
      </Text>
      
      <Text style={[styles.message, { color: theme.textSecondary }]}>
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
    padding: 24,
  },
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Display-Semibold',
    textAlign: 'center',
    marginBottom: 8,
  },
  message: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    maxWidth: 300,
    lineHeight: 24,
  },
});

export default EmptyState;