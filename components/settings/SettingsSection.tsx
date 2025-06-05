import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { colors } from '@/utils/colors';

interface SettingsSectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsSection = ({ title, children }: SettingsSectionProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.primary }]}>
        {title}
      </Text>
      <View 
        style={[
          styles.content, 
          { 
            backgroundColor: theme.surface,
            borderColor: theme.border,
          }
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
    fontSize: 14,
    fontFamily: 'SF-Pro-Text-Semibold',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  content: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
});

export default SettingsSection;