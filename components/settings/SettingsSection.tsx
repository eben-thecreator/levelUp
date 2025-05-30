import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
        {title}
      </Text>
      <View 
        style={[
          styles.content, 
          { backgroundColor: isDark ? '#2D2C32' : '#FFFFFF' }
        ]}
      >
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 24,
  },
  title: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  content: {
    borderRadius: 16,
    paddingHorizontal: 16,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
});

export default SettingsSection;