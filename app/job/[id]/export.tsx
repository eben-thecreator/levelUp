import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, useColorScheme } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { getSurvey } from '@/utils/storage';
import { Survey } from '@/types';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { FileText, FilePdf, Mail, Share2 } from 'lucide-react-native';
import ExportPreview from '@/components/export/ExportPreview';

export default function ExportScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [survey, setSurvey] = useState<Survey | null>(null);
  const [exportFormat, setExportFormat] = useState<'pdf' | 'excel'>('pdf');
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
  
  const handleExport = () => {
    // Export functionality would be implemented here
    // For web, this could use libraries to generate PDF/Excel
    // For native, would use react-native-share
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
      <Card style={styles.card}>
        <Text style={[styles.title, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
          Export Options
        </Text>
        
        <View style={styles.formatButtons}>
          <Button
            title="PDF Report"
            icon={<FilePdf size={20} color={exportFormat === 'pdf' ? '#FFFFFF' : '#6750A4'} />}
            onPress={() => setExportFormat('pdf')}
            style={[
              styles.formatButton,
              exportFormat === 'pdf' ? { backgroundColor: '#6750A4' } : { backgroundColor: 'transparent' }
            ]}
            textStyle={{
              color: exportFormat === 'pdf' ? '#FFFFFF' : '#6750A4'
            }}
          />
          <Button
            title="Excel Spreadsheet"
            icon={<FileText size={20} color={exportFormat === 'excel' ? '#FFFFFF' : '#6750A4'} />}
            onPress={() => setExportFormat('excel')}
            style={[
              styles.formatButton,
              { marginLeft: 12 },
              exportFormat === 'excel' ? { backgroundColor: '#6750A4' } : { backgroundColor: 'transparent' }
            ]}
            textStyle={{
              color: exportFormat === 'excel' ? '#FFFFFF' : '#6750A4'
            }}
          />
        </View>
      </Card>
      
      <ExportPreview survey={survey} format={exportFormat} />
      
      <View style={styles.buttonContainer}>
        <Button
          title={exportFormat === 'pdf' ? "Export PDF" : "Export Excel"}
          icon={exportFormat === 'pdf' ? <FilePdf size={20} color="#FFFFFF" /> : <FileText size={20} color="#FFFFFF" />}
          onPress={handleExport}
          primary
        />
        
        <View style={styles.shareButtons}>
          <Button
            title="Email"
            icon={<Mail size={20} color="#6750A4" />}
            onPress={() => {}}
            style={styles.shareButton}
          />
          <Button
            title="Share"
            icon={<Share2 size={20} color="#6750A4" />}
            onPress={() => {}}
            style={[styles.shareButton, { marginLeft: 12 }]}
          />
        </View>
      </View>
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
  card: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  formatButtons: {
    flexDirection: 'row',
  },
  formatButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#6750A4',
  },
  buttonContainer: {
    marginTop: 24,
  },
  shareButtons: {
    flexDirection: 'row',
    marginTop: 12,
  },
  shareButton: {
    flex: 1,
  },
});