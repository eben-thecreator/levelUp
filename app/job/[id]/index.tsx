import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { PlusCircle, FileText, Trash2 } from 'lucide-react-native';
import Button from '@/components/ui/Button';
import { getSurvey, deleteSurvey } from '@/utils/storage';
import { Survey } from '@/types';
import Card from '@/components/ui/Card';
import SetupList from '@/components/job/SetupList';
import { formatDate } from '@/utils/formatters';
import AlertDialog from '@/components/ui/AlertDialog';

export default function SurveyDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  useEffect(() => {
    const loadSurvey = async () => {
      if (id) {
        const data = await getSurvey(id);
        setSurvey(data);
      }
    };
    
    loadSurvey();
  }, [id]);
  
  const handleDelete = async () => {
    if (id) {
      await deleteSurvey(id);
      router.replace('/');
    }
  };
  
  const handleAddSetup = () => {
    if (id) {
      router.push(`/job/${id}/setup`);
    }
  };
  
  const handleViewResults = () => {
    if (id) {
      router.push(`/job/${id}/results`);
    }
  };
  
  if (!survey) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={{ color: isDark ? '#E6E0E9' : '#1C1B1F' }}>Loading...</Text>
      </View>
    );
  }
  
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Card style={styles.infoCard}>
        <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          {survey.title}
        </Text>
        <Text style={[styles.subtitle, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          {survey.surveyor} • {formatDate(survey.date)}
        </Text>
        
        <View style={styles.detailsContainer}>
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Loop Type:
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {survey.loopType === 'closed' ? 'Closed Loop' : 'Open Loop'}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Starting RL:
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {survey.startRL.toFixed(3)} m
            </Text>
          </View>
          
          {survey.loopType === 'closed' && survey.closeRL && (
            <View style={styles.detailRow}>
              <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                Closing RL:
              </Text>
              <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {survey.closeRL.toFixed(3)} m
              </Text>
            </View>
          )}
          
          <View style={styles.detailRow}>
            <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Instrument:
            </Text>
            <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {survey.instrument || 'Not specified'}
            </Text>
          </View>
        </View>
      </Card>
      
      <View style={styles.setupsHeader}>
        <Text style={[styles.setupsTitle, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          Instrument Setups
        </Text>
        <Text style={[styles.setupsCount, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          {survey.setups?.length || 0} setups
        </Text>
      </View>
      
      <SetupList setups={survey.setups || []} />
      
      <View style={styles.actionsContainer}>
        <Button
          title="Add Setup"
          icon={<PlusCircle size={20} color="#FFFFFF" />}
          onPress={handleAddSetup}
          primary
        />
        
        {survey.setups && survey.setups.length > 0 && (
          <Button
            title="View Results"
            icon={<FileText size={20} color="#6750A4" />}
            onPress={handleViewResults}
            style={{ marginTop: 12 }}
          />
        )}
        
        <Button
          title="Delete Survey"
          icon={<Trash2 size={20} color="#B3261E" />}
          onPress={() => setShowDeleteAlert(true)}
          style={{ marginTop: 12 }}
          danger
        />
      </View>
      
      <AlertDialog
        visible={showDeleteAlert}
        title="Delete Survey"
        message="Are you sure you want to delete this survey? This action cannot be undone."
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteAlert(false)}
      />
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
  infoCard: {
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    marginBottom: 16,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  detailLabel: {
    width: 100,
    fontSize: 14,
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  setupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 4,
  },
  setupsTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  setupsCount: {
    fontSize: 14,
  },
  actionsContainer: {
    marginTop: 24,
  },
});