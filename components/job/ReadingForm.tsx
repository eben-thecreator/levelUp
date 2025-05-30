import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, useColorScheme, TouchableOpacity } from 'react-native';
import { SetupReading } from '@/types';
import Button from '@/components/ui/Button';
import { ChevronDown } from 'lucide-react-native';

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
  
  const validateForm = () => {
    if (!station.trim()) {
      setError('Station name is required');
      return false;
    }
    
    if (!reading.trim()) {
      setError('Reading value is required');
      return false;
    }
    
    // Validate reading is a valid number
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
      // Clear form for next reading
      setStation('');
      setReading('');
      setRemarks('');
      
      // Automatically advance to next typical sight type
      if (type === 'BS') {
        setType('IS');
      } else if (type === 'IS') {
        // Keep IS selected to allow multiple IS readings
      } else if (type === 'FS') {
        setType('BS'); // Reset for next setup
      }
    } else {
      setError(`Cannot add multiple ${type} readings in the same setup`);
    }
  };
  
  const handleSelectType = (selectedType: 'BS' | 'IS' | 'FS') => {
    setType(selectedType);
    setShowTypeSelector(false);
  };
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
        Add Reading
      </Text>
      
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}
      
      <View style={styles.formRow}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Station
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                color: isDark ? '#E6E0E9' : '#1C1B1F',
                backgroundColor: isDark ? '#49454F' : '#FFFFFF',
                borderColor: isDark ? '#79747E' : '#79747E'
              }
            ]}
            value={station}
            onChangeText={setStation}
            placeholder="Enter station name"
            placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
          />
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Reading (m)
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                color: isDark ? '#E6E0E9' : '#1C1B1F',
                backgroundColor: isDark ? '#49454F' : '#FFFFFF',
                borderColor: isDark ? '#79747E' : '#79747E'
              }
            ]}
            value={reading}
            onChangeText={setReading}
            placeholder="0.000"
            placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
            keyboardType="numeric"
          />
        </View>
      </View>
      
      <View style={styles.formRow}>
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Reading Type
          </Text>
          <TouchableOpacity
            style={[
              styles.selector,
              { 
                backgroundColor: isDark ? '#49454F' : '#FFFFFF',
                borderColor: isDark ? '#79747E' : '#79747E'
              }
            ]}
            onPress={() => setShowTypeSelector(!showTypeSelector)}
          >
            <Text style={{ color: isDark ? '#E6E0E9' : '#1C1B1F' }}>
              {type === 'BS' ? 'Backsight' : type === 'IS' ? 'Intermediate Sight' : 'Foresight'}
            </Text>
            <ChevronDown size={20} color={isDark ? '#CAC4D0' : '#79747E'} />
          </TouchableOpacity>
          
          {showTypeSelector && (
            <View 
              style={[
                styles.typeDropdown,
                { 
                  backgroundColor: isDark ? '#2D2C32' : '#FFFFFF',
                  borderColor: isDark ? '#79747E' : '#E6E0E9'
                }
              ]}
            >
              <TouchableOpacity
                style={styles.typeOption}
                onPress={() => handleSelectType('BS')}
              >
                <Text style={{ color: isDark ? '#E6E0E9' : '#1C1B1F' }}>
                  Backsight (BS)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.typeOption}
                onPress={() => handleSelectType('IS')}
              >
                <Text style={{ color: isDark ? '#E6E0E9' : '#1C1B1F' }}>
                  Intermediate Sight (IS)
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.typeOption}
                onPress={() => handleSelectType('FS')}
              >
                <Text style={{ color: isDark ? '#E6E0E9' : '#1C1B1F' }}>
                  Foresight (FS)
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        <View style={styles.fieldContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Remarks (Optional)
          </Text>
          <TextInput
            style={[
              styles.input,
              { 
                color: isDark ? '#E6E0E9' : '#1C1B1F',
                backgroundColor: isDark ? '#49454F' : '#FFFFFF',
                borderColor: isDark ? '#79747E' : '#79747E'
              }
            ]}
            value={remarks}
            onChangeText={setRemarks}
            placeholder="Enter remarks"
            placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
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
    borderTopWidth: 1,
    borderTopColor: '#79747E',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 16,
  },
  formRow: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  fieldContainer: {
    flex: 1,
    marginRight: 8,
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
    fontSize: 16,
  },
  selector: {
    height: 48,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  typeDropdown: {
    position: 'absolute',
    top: 80,
    left: 0,
    right: 8,
    borderWidth: 1,
    borderRadius: 4,
    zIndex: 1000,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  typeOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#CAC4D0',
  },
  errorContainer: {
    backgroundColor: '#F9DEDC',
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
  },
  errorText: {
    color: '#B3261E',
    fontSize: 14,
  },
});

export default ReadingForm;