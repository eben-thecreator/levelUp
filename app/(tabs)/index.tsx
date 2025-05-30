import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import { PlusCircle } from 'lucide-react-native';
import { StatusBar } from 'expo-status-bar';
import JobCard from '@/components/job/JobCard';
import { Survey } from '@/types';
import { loadSurveys } from '@/utils/storage';
import EmptyState from '@/components/ui/EmptyState';

export default function SurveysScreen() {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const colorScheme = useColorScheme();
  
  useEffect(() => {
    const fetchSurveys = async () => {
      const savedSurveys = await loadSurveys();
      setSurveys(savedSurveys);
    };
    
    fetchSurveys();
  }, []);
  
  return (
    <View style={[
      styles.container, 
      { backgroundColor: colorScheme === 'dark' ? '#1C1B1F' : '#F7F2FA' }
    ]}>
      <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
      
      {surveys.length > 0 ? (
        <FlatList
          data={surveys}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <JobCard survey={item} />}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <EmptyState 
          title="No Surveys Yet" 
          message="Create your first survey to get started with leveling."
        />
      )}
      
      <Link href="/job/new" asChild>
        <Pressable 
          style={[
            styles.fab, 
            { backgroundColor: '#6750A4' }
          ]}
        >
          <PlusCircle size={24} color="#FFFFFF" />
          <Text style={styles.fabText}>New Survey</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: '500',
  },
});