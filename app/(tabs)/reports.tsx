import { View, Text, StyleSheet, FlatList, useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { loadSurveys } from '@/utils/storage';
import { Survey } from '@/types';
import ReportCard from '@/components/reports/ReportCard';
import EmptyState from '@/components/ui/EmptyState';

export default function ReportsScreen() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const colorScheme = useColorScheme();

  useEffect(() => {
    const fetchSurveys = async () => {
      const savedSurveys = await loadSurveys();
      const completedSurveys = savedSurveys.filter(
        survey => survey.setups && survey.setups.length > 0
      );
      setSurveys(completedSurveys);
    };
    
    fetchSurveys();
  }, []);

  return (
    <View style={[
      styles.container,
      { backgroundColor: colorScheme === 'dark' ? '#1C1B1F' : '#F7F2FA' }
    ]}>
      {surveys.length > 0 ? (
        <FlatList
          data={surveys}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <ReportCard survey={item} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState 
          title="No Reports Available" 
          message="Complete a survey to generate reports"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
});