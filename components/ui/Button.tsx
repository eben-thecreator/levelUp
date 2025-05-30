import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: React.ReactNode;
  primary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const Button = ({ 
  title, 
  onPress, 
  icon, 
  primary, 
  danger, 
  disabled, 
  style, 
  textStyle 
}: ButtonProps) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary && styles.primaryButton,
        danger && styles.dangerButton,
        disabled && styles.disabledButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text 
        style={[
          styles.text,
          primary && styles.primaryText,
          danger && styles.dangerText,
          disabled && styles.disabledText,
          textStyle,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#79747E',
    backgroundColor: 'transparent',
  },
  primaryButton: {
    backgroundColor: '#6750A4',
    borderColor: '#6750A4',
  },
  dangerButton: {
    backgroundColor: 'transparent',
    borderColor: '#B3261E',
  },
  disabledButton: {
    backgroundColor: '#E6E0E9',
    borderColor: '#E6E0E9',
    opacity: 0.5,
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6750A4',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  dangerText: {
    color: '#B3261E',
  },
  disabledText: {
    color: '#79747E',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default Button;