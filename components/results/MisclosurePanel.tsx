import React from 'react';
import { View, Text, StyleSheet, useColorScheme } from 'react-native';
import { Survey } from '@/types';

interface MisclosurePanelProps {
  misclosureData: {
    misclosure: number;
    allowableError: number;
    isWithinTolerance: boolean;
  };
  survey: Survey;
}

const MisclosurePanel = ({ misclosureData, survey }: MisclosurePanelProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  const { misclosure, allowableError, isWithinTolerance } = misclosureData;
  
  return (
    <View 
      style={[
        styles.container,
        { 
          backgroundColor: isWithinTolerance 
            ? (isDark ? '#133929' : '#E7F8EF') 
            : (isDark ? '#49111C' : '#FADAD3') 
        }
      ]}
    >
      <Text 
        style={[
          styles.statusText,
          { 
            color: isWithinTolerance 
              ? (isDark ? '#94ECBE' : '#006C45') 
              : (isDark ? '#FFAFC8' : '#B3261E')
          }
        ]}
      >
        {isWithinTolerance ? 'PASSED' : 'FAILED'}: Misclosure Check
      </Text>
      
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Misclosure:
          </Text>
          <Text 
            style={[
              styles.detailValue,
              { 
                color: isWithinTolerance 
                  ? (isDark ? '#94ECBE' : '#006C45') 
                  : (isDark ? '#FFAFC8' : '#B3261E')
              }
            ]}
          >
            {misclosure.toFixed(4)} m
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Allowable Error:
          </Text>
          <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            ±{allowableError.toFixed(4)} m
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Starting RL:
          </Text>
          <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            {survey.startRL.toFixed(3)} m
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Computed Final RL:
          </Text>
          <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            {(survey.closeRL + misclosure).toFixed(3)} m
          </Text>
        </View>
        
        <View style={styles.detailRow}>
          <Text style={[styles.detailLabel, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Known Closing RL:
          </Text>
          <Text style={[styles.detailValue, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            {survey.closeRL.toFixed(3)} m
          </Text>
        </View>
      </View>
      
      <Text style={[styles.correctionNote, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
        {isWithinTolerance
          ? 'The misclosure is within the allowable limit. Linear adjustment has been applied to all RLs.'
          : 'The misclosure exceeds the allowable limit. Check your readings and consider re-surveying.'}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  detailsContainer: {
    marginVertical: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  detailLabel: {
    fontSize: 14,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '500',
  },
  correctionNote: {
    fontSize: 14,
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default MisclosurePanel;