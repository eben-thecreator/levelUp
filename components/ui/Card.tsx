import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, useColorScheme } from 'react-native';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Card = ({ children, style }: CardProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <View 
      style={[
        styles.card, 
        { 
          backgroundColor: isDark ? '#2D2C32' : '#FFFFFF',
          shadowColor: isDark ? '#000' : '#000',
        },
        style
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
});

export default Card;