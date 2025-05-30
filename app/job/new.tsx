import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView, Pressable, useColorScheme } from 'react-native';
import { router } from 'expo-router';
import { ChevronDown } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import { createSurvey } from '@/utils/storage';
import Card from '@/components/ui/Card';
import DatePickerField from '@/components/ui/DatePickerField';
import LoopTypeSelector from '@/components/job/LoopTypeSelector';

export default function NewJobScreen() {
  const [title, setTitle] = useState('');
  const [surveyor, setSurveyor] = useState('');
  const [instrument, setInstrument] = useState('');
  const [date, setDate] = useState(new Date());
  const [loopType, setLoopType] = useState<'open' | 'closed'>('closed');
  const [startRL, setStartRL] = useState('');
  const [closeRL, setCloseRL] = useState('');
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const handleCreateSurvey = async () => {
    if (!title || !surveyor || !startRL) {
      // Show validation error
      return;
    }
    
    const newSurvey = {
      id: Date.now().toString(),
      title,
      surveyor,
      instrument,
      date: date.toISOString(),
      loopType,
      startRL: parseFloat(startRL),
      closeRL: loopType === 'closed' ? parseFloat(closeRL) : undefined,
      setups: [],
      createdAt: new Date().toISOString(),
    };
    
    await createSurvey(newSurvey);
    router.push(`/job/${newSurvey.id}`);
  };
  
  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
    >
      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          Survey Information
        </Text>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Survey Title *
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
            value={title}
            onChangeText={setTitle}
            placeholder="Enter survey title"
            placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Surveyor Name *
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
            value={surveyor}
            onChangeText={setSurveyor}
            placeholder="Enter surveyor name"
            placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
          />
        </View>
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Instrument Type
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
            value={instrument}
            onChangeText={setInstrument}
            placeholder="Enter instrument type"
            placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
          />
        </View>
        
        <DatePickerField
          label="Survey Date"
          value={date}
          onChange={setDate}
        />
      </Card>
      
      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          Survey Parameters
        </Text>
        
        <LoopTypeSelector
          value={loopType}
          onChange={setLoopType}
        />
        
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Starting Benchmark RL (m) *
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
            value={startRL}
            onChangeText={setStartRL}
            placeholder="Enter starting elevation"
            placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
            keyboardType="numeric"
          />
        </View>
        
        {loopType === 'closed' && (
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Closing Benchmark RL (m) *
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
              value={closeRL}
              onChangeText={setCloseRL}
              placeholder="Enter closing elevation"
              placeholderTextColor={isDark ? '#CAC4D0' : '#79747E'}
              keyboardType="numeric"
            />
          </View>
        )}
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Create Survey"
          onPress={handleCreateSurvey}
          primary
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  card: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  inputContainer: {
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
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
});