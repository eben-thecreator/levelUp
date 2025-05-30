import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';

interface LoopTypeSelectorProps {
  value: 'open' | 'closed';
  onChange: (value: 'open' | 'closed') => void;
}

const LoopTypeSelector = ({ value, onChange }: LoopTypeSelectorProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
        Loop Type
      </Text>
      
      <View style={styles.buttonContainer}>
        <Pressable
          style={[
            styles.button,
            styles.leftButton,
            value === 'closed' && styles.activeButton,
            { 
              backgroundColor: value === 'closed' 
                ? (isDark ? '#D0BCFF' : '#EBE4FD') 
                : (isDark ? '#49454F' : '#F7F2FA')
            }
          ]}
          onPress={() => onChange('closed')}
        >
          <Text 
            style={[
              styles.buttonText,
              value === 'closed' && styles.activeButtonText,
              { 
                color: value === 'closed' 
                  ? (isDark ? '#381E72' : '#381E72') 
                  : (isDark ? '#CAC4D0' : '#49454F')
              }
            ]}
          >
            Closed Loop
          </Text>
        </Pressable>
        
        <Pressable
          style={[
            styles.button,
            styles.rightButton,
            value === 'open' && styles.activeButton,
            { 
              backgroundColor: value === 'open' 
                ? (isDark ? '#D0BCFF' : '#EBE4FD') 
                : (isDark ? '#49454F' : '#F7F2FA')
            }
          ]}
          onPress={() => onChange('open')}
        >
          <Text 
            style={[
              styles.buttonText,
              value === 'open' && styles.activeButtonText,
              { 
                color: value === 'open' 
                  ? (isDark ? '#381E72' : '#381E72') 
                  : (isDark ? '#CAC4D0' : '#49454F')
              }
            ]}
          >
            Open Loop
          </Text>
        </Pressable>
      </View>
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
  buttonContainer: {
    flexDirection: 'row',
    height: 40,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftButton: {
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
  },
  rightButton: {
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  activeButton: {
    borderWidth: 0,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  activeButtonText: {
    fontWeight: '600',
  },
});

export default LoopTypeSelector;