import React from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { Survey, SetupReading } from '@/types';

interface ResultsTableProps {
  survey: Survey;
  adjustedRLs: {
    stations: string[];
    originalRLs: number[];
    adjustedRLs: number[];
  } | null;
}

const ResultsTable = ({ survey, adjustedRLs }: ResultsTableProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  if (!survey.setups || survey.setups.length === 0) {
    return (
      <Text style={[styles.emptyText, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
        No data available for results table.
      </Text>
    );
  }
  
  // Flatten all readings from all setups
  const allReadings: (SetupReading & { HI: number, setupIndex: number })[] = [];
  survey.setups.forEach((setup, setupIndex) => {
    setup.readings.forEach(reading => {
      allReadings.push({
        ...reading,
        HI: setup.HI,
        setupIndex,
      });
    });
  });
  
  return (
    <ScrollView horizontal style={styles.container}>
      <View>
        <View style={styles.headerRow}>
          <Text style={[styles.headerCell, styles.stationCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Station
          </Text>
          <Text style={[styles.headerCell, styles.readingCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            BS
          </Text>
          <Text style={[styles.headerCell, styles.readingCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            IS
          </Text>
          <Text style={[styles.headerCell, styles.readingCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            FS
          </Text>
          <Text style={[styles.headerCell, styles.hiCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            HI
          </Text>
          <Text style={[styles.headerCell, styles.rlCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            RL
          </Text>
          {adjustedRLs && (
            <Text style={[styles.headerCell, styles.rlCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              Adj. RL
            </Text>
          )}
          <Text style={[styles.headerCell, styles.remarksCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            Remarks
          </Text>
        </View>
        
        {allReadings.map((reading, index) => {
          // Find the RL for this reading - it would normally come from the adjustedRLs object
          // For simplicity, we're using the computedRL from the reading
          const stationIndex = adjustedRLs?.stations.findIndex(s => s === reading.station) ?? -1;
          const adjustedRL = stationIndex >= 0 ? adjustedRLs?.adjustedRLs[stationIndex] : null;
          
          return (
            <View 
              key={reading.id} 
              style={[
                styles.row,
                index % 2 === 0 ? 
                  { backgroundColor: isDark ? '#332D41' : '#F7F2FA' } : 
                  { backgroundColor: 'transparent' }
              ]}
            >
              <Text style={[styles.cell, styles.stationCell, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {reading.station}
              </Text>
              
              <Text style={[styles.cell, styles.readingCell, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {reading.type === 'BS' ? reading.reading.toFixed(3) : ''}
              </Text>
              
              <Text style={[styles.cell, styles.readingCell, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {reading.type === 'IS' ? reading.reading.toFixed(3) : ''}
              </Text>
              
              <Text style={[styles.cell, styles.readingCell, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {reading.type === 'FS' ? reading.reading.toFixed(3) : ''}
              </Text>
              
              <Text style={[styles.cell, styles.hiCell, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
                {reading.type === 'BS' ? reading.HI.toFixed(3) : ''}
              </Text>
              
              <Text style={[styles.cell, styles.rlCell, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {reading.computedRL?.toFixed(3) || ''}
              </Text>
              
              {adjustedRLs && (
                <Text 
                  style={[
                    styles.cell, 
                    styles.rlCell, 
                    { color: isDark ? '#D0BCFF' : '#6750A4' }
                  ]}
                >
                  {adjustedRL?.toFixed(3) || ''}
                </Text>
              )}
              
              <Text style={[styles.cell, styles.remarksCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
                {reading.remarks || ''}
              </Text>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  emptyText: {
    textAlign: 'center',
    padding: 16,
    fontStyle: 'italic',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#F4EFF4',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#CAC4D0',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CAC4D0',
  },
  headerCell: {
    padding: 8,
    fontWeight: '600',
    fontSize: 12,
  },
  cell: {
    padding: 8,
    fontSize: 14,
  },
  stationCell: {
    width: 80,
  },
  readingCell: {
    width: 70,
    textAlign: 'right',
  },
  hiCell: {
    width: 80,
    textAlign: 'right',
  },
  rlCell: {
    width: 80,
    textAlign: 'right',
  },
  remarksCell: {
    width: 120,
  },
});

export default ResultsTable;