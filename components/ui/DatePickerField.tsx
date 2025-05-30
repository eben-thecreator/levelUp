import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, useColorScheme } from 'react-native';
import { Calendar } from 'lucide-react-native';
import { formatDate } from '@/utils/formatters';

interface DatePickerFieldProps {
  label: string;
  value: Date;
  onChange: (date: Date) => void;
}

const DatePickerField = ({ label, value, onChange }: DatePickerFieldProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Date picker would be implemented with platform-specific code
  // For web, we'd use a date input
  // For native, we'd use DateTimePicker from @react-native-community/datetimepicker
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
        {label}
      </Text>
      <Pressable
        style={[
          styles.input,
          { 
            backgroundColor: isDark ? '#49454F' : '#FFFFFF',
            borderColor: isDark ? '#79747E' : '#79747E'
          }
        ]}
        onPress={() => {
          // Would open date picker here
        }}
      >
        <Text style={[styles.dateText, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          {formatDate(value.toISOString())}
        </Text>
        <Calendar size={20} color={isDark ? '#CAC4D0' : '#79747E'} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 16,
  },
});

export default DatePickerField;