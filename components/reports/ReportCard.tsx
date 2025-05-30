import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Survey } from '@/types';
import Card from '@/components/ui/Card';
import { formatDate } from '@/utils/formatters';

interface ReportCardProps {
  survey: Survey;
}

const ReportCard = ({ survey }: ReportCardProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Calculate some basic statistics
  const totalSetups = survey.setups?.length || 0;
  const totalReadings = survey.setups?.reduce((acc, setup) => acc + setup.readings.length, 0) || 0;
  const startDate = formatDate(survey.date);
  
  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
        {survey.title}
      </Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Setups
          </Text>
          <Text style={[styles.statValue, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
            {totalSetups}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Readings
          </Text>
          <Text style={[styles.statValue, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
            {totalReadings}
          </Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={[styles.statLabel, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Type
          </Text>
          <Text style={[styles.statValue, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
            {survey.loopType === 'closed' ? 'Closed Loop' : 'Open Loop'}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={[styles.date, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          {startDate}
        </Text>
        <Text style={[styles.surveyor, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          {survey.surveyor}
        </Text>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#CAC4D0',
    paddingTop: 12,
  },
  date: {
    fontSize: 12,
  },
  surveyor: {
    fontSize: 12,
  },
});

export default ReportCard;