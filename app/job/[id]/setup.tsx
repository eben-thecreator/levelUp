import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getSurvey, updateSurvey } from '@/utils/storage';
import { Survey, SetupReading, InstrumentSetup } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import ReadingForm from '@/components/job/ReadingForm';
import ReadingList from '@/components/job/ReadingList';
import { processSetupData } from '@/utils/computation';
import SetupSummary from '@/components/job/SetupSummary';

export default function SetupScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [setupIndex, setSetupIndex] = useState<number>(0);
  const [readings, setReadings] = useState<SetupReading[]>([]);
  const [currentSetup, setCurrentSetup] = useState<InstrumentSetup | null>(null);
  const [computedData, setComputedData] = useState<any>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  useEffect(() => {
    const loadSurvey = async () => {
      if (id) {
        const data = await getSurvey(id);
        setSurvey(data);
        
        // Determine setup index (new or existing)
        const setupIdx = data.setups?.length || 0;
        setSetupIndex(setupIdx);
        
        // If continuing an existing setup, load the readings
        if (setupIdx > 0 && data.setups && data.setups[setupIdx - 1]) {
          const prevSetup = data.setups[setupIdx - 1];
          setCurrentSetup(prevSetup);
        }
      }
    };
    
    loadSurvey();
  }, [id]);
  
  useEffect(() => {
    if (readings.length > 0) {
      // Compute HI, RLs whenever readings change
      const prevRL = getStartingRL();
      const computed = processSetupData(readings, prevRL);
      setComputedData(computed);
    } else {
      setComputedData(null);
    }
  }, [readings]);
  
  const getStartingRL = () => {
    if (!survey) return 0;
    
    // For first setup, use the survey starting RL
    if (setupIndex === 0) {
      return survey.startRL;
    }
    
    // For subsequent setups, use the previous setup's last FS RL
    if (survey.setups && survey.setups[setupIndex - 1]) {
      const prevSetup = survey.setups[setupIndex - 1];
      const fsReading = prevSetup.readings.find(r => r.type === 'FS');
      if (fsReading && fsReading.computedRL !== undefined) {
        return fsReading.computedRL;
      }
    }
    
    return survey.startRL;
  };
  
  const handleAddReading = (reading: SetupReading) => {
    // Validate
    if (reading.type === 'BS' && readings.some(r => r.type === 'BS')) {
      // Only one BS allowed per setup
      return false;
    }
    
    if (reading.type === 'FS' && readings.some(r => r.type === 'FS')) {
      // Only one FS allowed per setup
      return false;
    }
    
    // Add reading
    setReadings([...readings, reading]);
    return true;
  };
  
  const handleDeleteReading = (index: number) => {
    const newReadings = [...readings];
    newReadings.splice(index, 1);
    setReadings(newReadings);
  };
  
  const handleSaveSetup = async () => {
    if (!survey || !id || readings.length < 2 || !computedData) return;
    
    // Validate - must have at least one BS and one FS
    const hasBS = readings.some(r => r.type === 'BS');
    const hasFS = readings.some(r => r.type === 'FS');
    
    if (!hasBS || !hasFS) {
      // Show error - must have BS and FS
      return;
    }
    
    // Prepare setup data with computed values
    const setupData: InstrumentSetup = {
      id: Date.now().toString(),
      setupIndex,
      HI: computedData.HI,
      readings: readings.map(r => ({
        ...r,
        computedRL: computedData.RLs[readings.indexOf(r)],
      })),
    };
    
    // Update survey
    const updatedSetups = [...(survey.setups || []), setupData];
    const updatedSurvey = { ...survey, setups: updatedSetups };
    
    await updateSurvey(id, updatedSurvey);
    router.push(`/job/${id}`);
  };
  
  if (!survey) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: isDark ? '#E6E0E9' : '#1C1B1F' }}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.scrollView} contentContainerStyle={styles.content}>
        <Card style={styles.card}>
          <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Setup #{setupIndex + 1}
          </Text>
          <Text style={[styles.subtitle, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Starting RL: {getStartingRL().toFixed(3)} m
          </Text>
          
          {readings.length > 0 && (
            <ReadingList 
              readings={readings}
              computedData={computedData}
              onDelete={handleDeleteReading}
            />
          )}
          
          <ReadingForm onAddReading={handleAddReading} />
        </Card>
        
        {computedData && readings.some(r => r.type === 'BS') && (
          <SetupSummary 
            readings={readings}
            computedData={computedData}
            startingRL={getStartingRL()}
          />
        )}
        
        <View style={styles.buttonContainer}>
          <Button
            title="Save Setup"
            onPress={handleSaveSetup}
            primary
            disabled={readings.length < 2 || !readings.some(r => r.type === 'BS') || !readings.some(r => r.type === 'FS')}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 16,
    paddingBottom: 32,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 24,
  },
});