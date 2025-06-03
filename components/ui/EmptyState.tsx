import React from 'react';
import { View, Text, StyleSheet, useColorScheme, Animated } from 'react-native';
import { ClipboardList } from 'lucide-react-native';

interface EmptyStateProps {
  title: string;
  message: string;
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const bounceAnim = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);
  
  return (
    <View style={styles.container}>
      <Animated.View
        style={{
          transform: [{
            translateY: bounceAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -10],
            }),
          }],
        }}
      >
        <ClipboardList 
          size={64} 
          color={isDark ? '#98989F' : '#8E8E93'} 
          strokeWidth={1.5}
        />
      </Animated.View>
      <Text style={[styles.title, { color: isDark ? '#FFFFFF' : '#000000' }]}>
        {title}
      </Text>
      <Text style={[styles.message, { color: isDark ? '#98989F' : '#8E8E93' }]}>
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
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  message: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    textAlign: 'center',
    maxWidth: 250,
    lineHeight: 20,
  },
});

export default EmptyState;