import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme } from 'react-native';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Survey } from '@/types';
import { formatDate } from '@/utils/formatters';

interface JobCardProps {
  survey: Survey;
}

const JobCard = ({ survey }: JobCardProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  return (
    <Link href={`/job/${survey.id}`} asChild>
      <Pressable>
        <View 
          style={[
            styles.card, 
            { backgroundColor: isDark ? '#2D2C32' : '#FFFFFF' }
          ]}
        >
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
                {survey.title}
              </Text>
              <View 
                style={[
                  styles.loopTypeBadge,
                  { 
                    backgroundColor: isDark ? '#49454F' : '#F7F2FA',
                  }
                ]}
              >
                <Text 
                  style={[
                    styles.loopTypeText,
                    { color: isDark ? '#D0BCFF' : '#6750A4' }
                  ]}
                >
                  {survey.loopType === 'closed' ? 'Closed Loop' : 'Open Loop'}
                </Text>
              </View>
            </View>
            
            <Text style={[styles.surveyor, { color: isDark ? '#CAC4D0' : '#49454F' }]}>
              {survey.surveyor}
            </Text>
            
            <View style={styles.detailsRow}>
              <Text style={[styles.date, { color: isDark ? '#CAC4D0' : '#79747E' }]}>
                {formatDate(survey.date)}
              </Text>
              <Text style={[styles.setupCount, { color: isDark ? '#CAC4D0' : '#79747E' }]}>
                {survey.setups?.length || 0} setups
              </Text>
            </View>
          </View>
          
          <ChevronRight size={20} color={isDark ? '#CAC4D0' : '#79747E'} />
        </View>
      </Pressable>
    </Link>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    marginBottom: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  loopTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 8,
  },
  loopTypeText: {
    fontSize: 12,
    fontWeight: '500',
  },
  surveyor: {
    fontSize: 14,
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 12,
  },
  setupCount: {
    fontSize: 12,
  },
});

export default JobCard;