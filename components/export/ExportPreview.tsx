import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Survey } from '@/types';
import Card from '@/components/ui/Card';

interface ExportPreviewProps {
  survey: Survey;
  format: 'pdf' | 'excel';
}

const ExportPreview = ({ survey, format }: ExportPreviewProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
        Preview
      </Text>
      
      <View 
        style={[
          styles.previewContainer, 
          { 
            backgroundColor: isDark ? '#332D41' : '#F7F2FA',
            borderColor: isDark ? '#79747E' : '#CAC4D0' 
          }
        ]}
      >
        <View style={styles.previewHeader}>
          <Text style={[styles.previewTitle, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            {survey.title}
          </Text>
          
          <View style={styles.previewRow}>
            <Text style={[styles.previewLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Surveyor:
            </Text>
            <Text style={[styles.previewValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {survey.surveyor}
            </Text>
          </View>
          
          <View style={styles.previewRow}>
            <Text style={[styles.previewLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Date:
            </Text>
            <Text style={[styles.previewValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {new Date(survey.date).toLocaleDateString()}
            </Text>
          </View>
          
          <View style={styles.previewRow}>
            <Text style={[styles.previewLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Loop Type:
            </Text>
            <Text style={[styles.previewValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {survey.loopType === 'closed' ? 'Closed Loop' : 'Open Loop'}
            </Text>
          </View>
          
          {survey.setups && (
            <View style={styles.previewRow}>
              <Text style={[styles.previewLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                Setups:
              </Text>
              <Text style={[styles.previewValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {survey.setups.length}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.previewContent}>
          <Text style={[styles.previewText, { color: isDark ? '#CAC4D0' : '#79747E' }]}>
            {format === 'pdf' ? 
              'PDF will include: Complete level booking table, misclosure analysis, elevation profile, and survey metadata.' :
              'Excel file will include: Raw data sheet, computed results sheet with formulas, and summary dashboard.'}
          </Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  previewContainer: {
    borderWidth: 1,
    borderRadius: 8,
    overflow: 'hidden',
  },
  previewHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CAC4D0',
  },
  previewTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  previewRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  previewLabel: {
    width: 80,
    fontSize: 14,
  },
  previewValue: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
  },
  previewContent: {
    padding: 16,
  },
  previewText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default ExportPreview;