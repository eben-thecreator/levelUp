import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, useColorScheme } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { formatDate } from '@/utils/formatters';
import { colors } from '@/utils/colors';

interface DatePickerFieldProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

const DatePickerField = ({ label, value, onChange }: DatePickerFieldProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.textSecondary }]}>
        {label}
      </Text>
      <Pressable
        style={({ pressed }) => [
          styles.input,
          { 
            backgroundColor: theme.surface,
            borderColor: pressed ? theme.primary : theme.border,
          }
        ]}
        onPress={() => {
          // Would open date picker here
        }}
      >
        <Text style={[styles.dateText, { color: theme.text }]}>
          {formatDate(value.toISOString())}
        </Text>
        <Calendar 
          size={20} 
          color={theme.textSecondary}
          strokeWidth={1.5}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
      android: {
        elevation: 1,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
      },
    }),
  },
  dateText: {
    fontSize: 16,
    fontFamily: 'SF-Pro-Text-Regular',
  },
});

export default DatePickerField;