import React from 'react';
import { View, Text, StyleSheet, Pressable, useColorScheme, Animated } from 'react-native';
import { Link } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import { Survey } from '@/types';
import { formatDate } from '@/utils/formatters';
import { colors } from '@/utils/colors';

interface JobCardProps {
  survey: Survey;
}

const JobCard = ({ survey }: JobCardProps) => {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? colors.dark : colors.light;
  const scaleAnim = React.useRef(new Animated.Value(1)).current;
  
  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };
  
  return (
    <Link href={`/job/${survey.id}`} asChild>
      <Pressable onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View 
          style={[
            styles.card, 
            { 
              backgroundColor: theme.groupedBackground,
              transform: [{ scale: scaleAnim }]
            }
          ]}
        >
          <View style={styles.content}>
            <View style={styles.titleRow}>
              <Text style={[styles.title, { color: theme.text }]}>
                {survey.title}
              </Text>
              <View 
                style={[
                  styles.loopTypeBadge,
                  { backgroundColor: isDark ? '#1C1C1E' : theme.secondaryBackground }
                ]}
              >
                <Text style={[styles.loopTypeText, { color: theme.primary }]}>
                  {survey.loopType === 'closed' ? 'Closed Loop' : 'Open Loop'}
                </Text>
              </View>
            </View>
            
            <Text style={[styles.surveyor, { color: theme.secondaryText }]}>
              {survey.surveyor}
            </Text>
            
            <View style={styles.detailsRow}>
              <Text style={[styles.date, { color: theme.secondaryText }]}>
                {formatDate(survey.date)}
              </Text>
              <Text style={[styles.setupCount, { color: theme.secondaryText }]}>
                {survey.setups?.length || 0} setups
              </Text>
            </View>
          </View>
          
          <ChevronRight size={20} color={theme.secondaryText} />
        </Animated.View>
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    fontSize: 17,
    fontWeight: '600',
    fontFamily: 'SF-Pro-Text-Semibold',
    flex: 1,
  },
  loopTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    marginLeft: 8,
  },
  loopTypeText: {
    fontSize: 13,
    fontWeight: '500',
    fontFamily: 'SF-Pro-Text-Medium',
  },
  surveyor: {
    fontSize: 15,
    fontFamily: 'SF-Pro-Text-Regular',
    marginBottom: 8,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
  },
  setupCount: {
    fontSize: 13,
    fontFamily: 'SF-Pro-Text-Regular',
  },
});

export default JobCard;