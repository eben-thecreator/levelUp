import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, StyleProp, ViewStyle, TextStyle, Platform } from 'react-native';
import { colors } from '@/utils/colors';
import { useColorScheme } from 'react-native';

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
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'dark' ? colors.dark : colors.light;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary && {
          backgroundColor: theme.primary,
          borderColor: theme.primary,
        },
        danger && {
          backgroundColor: 'transparent',
          borderColor: theme.error,
        },
        disabled && {
          backgroundColor: theme.surface,
          borderColor: theme.border,
          opacity: 0.5,
        },
        style,
      ]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {icon && <View style={styles.iconContainer}>{icon}</View>}
      <Text 
        style={[
          styles.text,
          {
            color: primary 
              ? theme.background 
              : danger 
                ? theme.error 
                : theme.primary,
          },
          disabled && {
            color: theme.textSecondary,
          },
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
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 1,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
    }),
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
  iconContainer: {
    marginRight: 8,
  },
});

export default Button