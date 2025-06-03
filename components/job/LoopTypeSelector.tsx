import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme, Animated } from 'react-native';
import { colors } from '@/utils/colors';

interface LoopTypeSelectorProps {
  value: 'open' | 'closed';
  onChange: (value: 'open' | 'closed') => void;
}

const LoopTypeSelector = ({ value, onChange }: LoopTypeSelectorProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;
  const [animation] = React.useState(new Animated.Value(value === 'closed' ? 0 : 1));
  
  React.useEffect(() => {
    Animated.spring(animation, {
      toValue: value === 'closed' ? 0 : 1,
      useNativeDriver: false,
      damping: 20,
      stiffness: 300,
    }).start();
  }, [value]);
  
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.secondaryText }]}>
        Loop Type
      </Text>
      
      <View style={[styles.buttonContainer, { backgroundColor: theme.secondaryBackground }]}>
        <Animated.View 
          style={[
            styles.selector,
            {
              backgroundColor: theme.primary,
              transform: [{
                translateX: animation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 150],
                }),
              }],
            },
          ]} 
        />
        
        <Pressable
          style={styles.button}
          onPress={() => onChange('closed')}
        >
          <Text 
            style={[
              styles.buttonText,
              { color: value === 'closed' ? '#FFFFFF' : theme.secondaryText }
            ]}
          >
            Closed Loop
          </Text>
        </Pressable>
        
        <Pressable
          style={styles.button}
          onPress={() => onChange('open')}
        >
          <Text 
            style={[
              styles.buttonText,
              { color: value === 'open' ? '#FFFFFF' : theme.secondaryText }
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
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: 32,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  selector: {
    position: 'absolute',
    width: '50%',
    height: '100%',
    borderRadius: 8,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  buttonText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
  },
});

export default LoopTypeSelector;