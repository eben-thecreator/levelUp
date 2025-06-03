import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Platform, useColorScheme, Animated } from 'react-native';
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
  const [pressAnim] = useState(new Animated.Value(1));
  
  const handlePressIn = () => {
    Animated.spring(pressAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(pressAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isDark ? '#98989F' : '#8E8E93' }]}>
        {label}
      </Text>
      <Animated.View style={{ transform: [{ scale: pressAnim }] }}>
        <Pressable
          style={[
            styles.input,
            { 
              backgroundColor: isDark ? '#1C1C1E' : '#FFFFFF',
              borderColor: isDark ? '#38383A' : '#C6C6C8'
            }
          ]}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={() => {
            // Would open date picker here
          }}
        >
          <Text style={[styles.dateText, { color: isDark ? '#FFFFFF' : '#000000' }]}>
            {formatDate(value.toISOString())}
          </Text>
          <Calendar size={20} color={isDark ? '#98989F' : '#8E8E93'} />
        </Pressable>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
  },
});

export default DatePickerField;