import React from 'react';
import { View, Text, StyleSheet, useColorScheme, TouchableOpacity } from 'react-native';
import { SetupReading } from '@/types';
import { Trash2 } from 'lucide-react-native';

interface ReadingListProps {
  readings: SetupReading[];
  computedData: {
    HI: number;
    RLs: number[];
  } | null;
  onDelete: (index: number) => void;
}

const ReadingList = ({ readings, computedData, onDelete }: ReadingListProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  if (readings.length === 0) {
    return null;
  }
  
  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'BS': return 'Backsight';
      case 'IS': return 'Intermediate';
      case 'FS': return 'Foresight';
      default: return type;
    }
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={[styles.headerCell, styles.stationCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          Station
        </Text>
        <Text style={[styles.headerCell, styles.typeCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          Type
        </Text>
        <Text style={[styles.headerCell, styles.readingCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          Reading
        </Text>
        {computedData && (
          <Text style={[styles.headerCell, styles.rlCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
            RL
          </Text>
        )}
        <Text style={[styles.headerCell, styles.actionCell, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
          Action
        </Text>
      </View>
      
      {readings.map((reading, index) => (
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
          <Text 
            style={[
              styles.cell, 
              styles.typeCell, 
              { 
                color: isDark ? '#E6E0E9' : '#1C1B1F',
                backgroundColor: reading.type === 'BS' ? 
                  (isDark ? '#4A4458' : '#EAE7ED') : 
                  reading.type === 'FS' ? 
                    (isDark ? '#4F378B' : '#EFE9FF') : 
                    'transparent'
              }
            ]}
          >
            {getTypeLabel(reading.type)}
          </Text>
          <Text style={[styles.cell, styles.readingCell, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            {reading.reading.toFixed(3)}
          </Text>
          {computedData && (
            <Text style={[styles.cell, styles.rlCell, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
              {computedData.RLs[index] ? computedData.RLs[index].toFixed(3) : '-'}
            </Text>
          )}
          <TouchableOpacity 
            style={styles.actionCell}
            onPress={() => onDelete(index)}
          >
            <Trash2 size={18} color="#B3261E" />
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#CAC4D0',
    borderRadius: 8,
    overflow: 'hidden',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#CAC4D0',
    backgroundColor: '#F4EFF4',
    paddingVertical: 8,
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
    flex: 2,
  },
  typeCell: {
    flex: 2,
    borderRadius: 4,
    marginVertical: 4,
    textAlign: 'center',
  },
  readingCell: {
    flex: 1.5,
    textAlign: 'right',
  },
  rlCell: {
    flex: 1.5,
    textAlign: 'right',
  },
  actionCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReadingList;