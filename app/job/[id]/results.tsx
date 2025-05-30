import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { getSurvey } from '@/utils/storage';
import { Survey } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileText, Share2 } from 'lucide-react-native';
import { calculateMisclosure, getAdjustedRLs } from '@/utils/computation';
import MisclosurePanel from '@/components/results/MisclosurePanel';
import ElevationChart from '@/components/results/ElevationChart';
import ResultsTable from '@/components/results/ResultsTable';

export default function ResultsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [misclosureData, setMisclosureData] = useState<any>(null);
  const [adjustedRLs, setAdjustedRLs] = useState<any>(null);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  useEffect(() => {
    const loadSurvey = async () => {
      if (id) {
        const data = await getSurvey(id);
        setSurvey(data);
        
        if (data.setups && data.setups.length > 0) {
          if (data.loopType === 'closed' && data.closeRL) {
            // Calculate misclosure for closed loop
            const misclosure = calculateMisclosure(data);
            setMisclosureData(misclosure);
            
            // Calculate adjusted RLs
            const adjusted = getAdjustedRLs(data, misclosure);
            setAdjustedRLs(adjusted);
          } else {
            // For open loop, no misclosure calculation
            setAdjustedRLs({
              stations: [],
              originalRLs: [],
              adjustedRLs: []
            });
          }
        }
      }
    };
    
    loadSurvey();
  }, [id]);
  
  const handleExport = () => {
    if (id) {
      router.push(`/job/${id}/export`);
    }
  };
  
  if (!survey || !survey.setups || survey.setups.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: isDark ? '#E6E0E9' : '#1C1B1F' }}>
          {!survey ? 'Loading...' : 'No data available'}
        </Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.card}>
        <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          {survey.title}
        </Text>
        
        {survey.loopType === 'closed' && misclosureData && (
          <MisclosurePanel 
            misclosureData={misclosureData} 
            survey={survey}
          />
        )}
      </Card>
      
      {adjustedRLs && (
        <Card style={styles.card}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Elevation Profile
          </Text>
          <ElevationChart 
            survey={survey}
            adjustedRLs={adjustedRLs}
          />
        </Card>
      )}
      
      <Card style={styles.card}>
        <Text style={[styles.sectionTitle, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          Level Booking Sheet
        </Text>
        <ResultsTable 
          survey={survey}
          adjustedRLs={adjustedRLs}
        />
      </Card>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Export Results"
          icon={<FileText size={20} color="#FFFFFF" />}
          onPress={handleExport}
          primary
        />
        <Button
          title="Share Results"
          icon={<Share2 size={20} color="#6750A4" />}
          onPress={() => {}}
          style={{ marginTop: 12 }}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 8,
  },
});