import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { InstrumentSetup } from '@/types';
import Card from '@/components/ui/Card';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

interface SetupListProps {
  setups: InstrumentSetup[];
  surveyId?: string;
}

const SetupList = ({ setups, surveyId }: SetupListProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  if (setups.length === 0) {
    return (
      <Card>
        <Text style={[styles.emptyText, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          No instrument setups recorded yet. Add your first setup to begin.
        </Text>
      </Card>
    );
  }
  
  const handleViewSetup = (setupIndex: number) => {
    if (surveyId) {
      // Navigate to setup details if needed
      // router.push(`/job/${surveyId}/setup/${setupIndex}`);
    }
  };
  
  return (
    <View style={styles.container}>
      {setups.map((setup, index) => {
        // Find BS and FS readings
        const bsReading = setup.readings.find(r => r.type === 'BS');
        const fsReading = setup.readings.find(r => r.type === 'FS');
        const isCount = setup.readings.filter(r => r.type === 'IS').length;
        
        return (
          <Card key={setup.id} style={styles.setupCard}>
            <TouchableOpacity 
              style={styles.setupContent}
              onPress={() => handleViewSetup(index)}
            >
              <View style={styles.setupHeader}>
                <Text style={[styles.setupTitle, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                  Setup #{index + 1}
                </Text>
                <Text style={[styles.readingCount, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                  {setup.readings.length} readings
                </Text>
              </View>
              
              <View style={styles.setupDetails}>
                <View style={styles.detailRow}>
                  <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                    HI:
                  </Text>
                  <Text style={[styles.detailValue, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
                    {setup.HI.toFixed(3)} m
                  </Text>
                </View>
                
                {bsReading && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                      BS:
                    </Text>
                    <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                      {bsReading.station} ({bsReading.reading.toFixed(3)} m)
                    </Text>
                  </View>
                )}
                
                {isCount > 0 && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                      IS:
                    </Text>
                    <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                      {isCount} intermediate sights
                    </Text>
                  </View>
                )}
                
                {fsReading && (
                  <View style={styles.detailRow}>
                    <Text style={[styles.detailLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                      FS:
                    </Text>
                    <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                      {fsReading.station} ({fsReading.reading.toFixed(3)} m)
                    </Text>
                  </View>
                )}
              </View>
              
              <View style={styles.chevronContainer}>
                <ChevronRight size={20} color={isDark ? '#CAC4D0' : '#79747E'} />
              </View>
            </TouchableOpacity>
          </Card>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  setupCard: {
    marginBottom: 12,
  },
  setupContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  setupHeader: {
    flex: 1,
  },
  setupTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  readingCount: {
    fontSize: 12,
  },
  setupDetails: {
    flex: 2,
    marginLeft: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    width: 40,
    fontSize: 14,
    fontWeight: '500',
  },
  detailValue: {
    flex: 1,
    fontSize: 14,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 14,
    padding: 16,
  },
  chevronContainer: {
    marginLeft: 'auto',
    paddingLeft: 8,
  },
});

export default SetupList;