import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { SetupReading } from '@/types';
import Card from '@/components/ui/Card';

interface SetupSummaryProps {
  readings: SetupReading[];
  computedData: {
    HI: number;
    RLs: number[];
  };
  startingRL: number;
}

const SetupSummary = ({ readings, computedData, startingRL }: SetupSummaryProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // Find the FS reading if it exists
  const fsReading = readings.find(r => r.type === 'FS');
  
  // Get index of the FS reading to get its RL from computedData
  const fsIndex = fsReading ? readings.indexOf(fsReading) : -1;
  const fsRL = fsIndex >= 0 ? computedData.RLs[fsIndex] : null;
  
  // Calculate elevation change
  const elevationChange = fsRL !== null ? fsRL - startingRL : null;
  const isRising = elevationChange !== null ? elevationChange > 0 : null;
  
  return (
    <Card style={styles.card}>
      <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
        Setup Summary
      </Text>
      
      <View style={styles.summaryRow}>
        <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          Height of Instrument (HI):
        </Text>
        <Text style={[styles.value, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
          {computedData.HI.toFixed(3)} m
        </Text>
      </View>
      
      <View style={styles.summaryRow}>
        <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          Starting RL:
        </Text>
        <Text style={[styles.value, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          {startingRL.toFixed(3)} m
        </Text>
      </View>
      
      {fsRL !== null && (
        <>
          <View style={styles.summaryRow}>
            <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Final RL:
            </Text>
            <Text style={[styles.value, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {fsRL.toFixed(3)} m
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Elevation Change:
            </Text>
            <Text 
              style={[
                styles.value, 
                { 
                  color: isRising 
                    ? (isDark ? '#94ECBE' : '#006C45') 
                    : (isDark ? '#FFAFC8' : '#B3261E')
                }
              ]}
            >
              {isRising ? '+' : ''}{elevationChange.toFixed(3)} m
              {isRising ? ' (Rising)' : ' (Falling)'}
            </Text>
          </View>
        </>
      )}
      
      <View style={styles.summaryRow}>
        <Text style={[styles.label, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          Number of Readings:
        </Text>
        <Text style={[styles.value, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          {readings.length}
        </Text>
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
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
  },
  value: {
    fontSize: 14,
    fontWeight: '500',
  },
});

export default SetupSummary;