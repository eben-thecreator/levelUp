import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, useColorScheme, TouchableOpacity, Animated } from 'react-native';
import { SetupReading } from '@/types';
import Button from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react-native';
import { colors } from '@/utils/colors';

interface ReadingFormProps {
  onAddReading: (reading: SetupReading) => boolean;
}

const ReadingForm = ({ onAddReading }: ReadingFormProps) => {
  const [station, setStation] = useState('');
  const [reading, setReading] = useState('');
  const [type, setType] = useState<'BS' | 'IS' | 'FS'>('BS');
  const [remarks, setRemarks] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;
  
  const dropdownAnimation = React.useRef(new Animated.Value(0)).current;
  
  React.useEffect(() => {
    Animated.spring(dropdownAnimation, {
      toValue: showTypeSelector ? 1 : 0,
      useNativeDriver: true,
      damping: 20,
      stiffness: 300,
    }).start();
  }, [showTypeSelector]);
  
  const validateForm = () => {
    if (!station.trim()) {
      setError('Station name is required');
      return false;
    }
    
    if (!reading.trim()) {
      setError('Reading value is required');
      return false;
    }
    
    const readingValue = parseFloat(reading);
    if (isNaN(readingValue)) {
      setError('Reading must be a valid number');
      return false;
    }
    
    return true;
  };
  
  const handleAddReading = () => {
    setError(null);
    
    if (!validateForm()) {
      return;
    }
    
    const newReading: SetupReading = {
      id: Date.now().toString(),
      station,
      reading: parseFloat(reading),
      type,
      remarks: remarks.trim(),
    };
    
    const success = onAddReading(newReading);
    if (success) {
      setStation('');
      setReading('');
      setRemarks('');
      
      if (type === 'BS') {
        setType('IS');
      } else if (type === 'IS') {
        // Keep IS selected
      } else if (type === 'FS') {
        setType('BS');
      }
    } else {
      setError(`Cannot add multiple ${type} readings in the same setup`);
    }
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Add Reading
      </Text>
      
      {error && (
        <View style={[styles.errorContainer, { backgroundColor: isDark ? '#3B1415' : '#FFE5E5' }]}>
          <Text style={[styles.errorText, { color: theme.tint.red }]}>{error}</Text>
        </View>
      )}
      
      <View style={styles.formRow}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.secondaryText }]}>
            Station
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                color: theme.text,
                backgroundColor: theme.secondaryBackground,
                borderColor: theme.separator,
              }
            ]}
            value={station}
            onChangeText={setStation}
            placeholder="Enter station name"
            placeholderTextColor={theme.secondaryText}
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.secondaryText }]}>
            Reading (m)
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                color: theme.text,
                backgroundColor: theme.secondaryBackground,
                borderColor: theme.separator,
              }
            ]}
            value={reading}
            onChangeText={setReading}
            placeholder="0.000"
            placeholderTextColor={theme.secondaryText}
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <View style={styles.formRow}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.secondaryText }]}>
            Reading Type
          </Text>
          <TouchableOpacity
            style={[
              styles.selector,
              { 
                backgroundColor: theme.secondaryBackground,
                borderColor: theme.separator,
              }
            ]}
            onPress={() => setShowTypeSelector(!showTypeSelector)}
          >
            <Text style={{ color: theme.text, fontFamily: 'SF-Pro-Text-Regular' }}>
              {type === 'BS' ? 'Backsight' : type === 'IS' ? 'Intermediate Sight' : 'Foresight'}
            </Text>
            <Animated.View
              style={{
                transform: [{
                  rotate: dropdownAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '180deg'],
                  }),
                }],
              }}
            >
              <ChevronDown size={20} color={theme.secondaryText} />
            </Animated.View>
          </TouchableOpacity>
          
          {showTypeSelector && (
            <Animated.View 
              style={[
                styles.typeDropdown,
                { 
                  backgroundColor: theme.groupedBackground,
                  borderColor: theme.separator,
                  opacity: dropdownAnimation,
                  transform: [{
                    translateY: dropdownAnimation.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-20, 0],
                    }),
                  }],
                }
              ]}
            >
              {['BS', 'IS', 'FS'].map((t) => (
                <TouchableOpacity
                  key={t}
                  style={[
                    styles.typeOption,
                    { borderBottomColor: theme.separator }
                  ]}
                  onPress={() => {
                    setType(t as 'BS' | 'IS' | 'FS');
                    setShowTypeSelector(false);
                  }}
                >
                  <Text style={{ color: theme.text, fontFamily: 'SF-Pro-Text-Regular' }}>
                    {t === 'BS' ? 'Backsight' : t === 'IS' ? 'Intermediate Sight' : 'Foresight'}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: theme.secondaryText }]}>
            Remarks (Optional)
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                color: theme.text,
                backgroundColor: theme.secondaryBackground,
                borderColor: theme.separator,
              }
            ]}
            value={remarks}
            onChangeText={setRemarks}
            placeholder="Enter remarks"
            placeholderTextColor={theme.secondaryText}
          />
        </View>
      </View>
      
      <Button
        title="Add Reading"
        onPress={handleAddReading}
        primary
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    padding: 16,
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Display-Semibold',
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 12,
  },
  fieldContainer: {
    flex: 1,
  },
  label: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 8,
  },
  input: {
    height: 44,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 12,
    fontSize: 17,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  selector: {
    height: 44,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeDropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 0,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  typeOption: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  errorContainer: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
  },
});

export default ReadingForm;