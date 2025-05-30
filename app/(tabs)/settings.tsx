import { View, Text, StyleSheet, Switch, ScrollView, Pressable, useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react-native';
import { loadSettings, saveSettings } from '@/utils/storage';
import SettingsSection from '@/components/settings/SettingsSection';

export default function SettingsScreen() {
  const [settings, setSettings] = useState({
    darkMode: false,
    useDynamicColors: true,
    autoSave: true,
    defaultLoopType: 'closed',
    errorConstant: '12',
    units: 'meters',
  });
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  useEffect(() => {
    const getSettings = async () => {
      const savedSettings = await loadSettings();
      if (savedSettings) {
        setSettings(savedSettings);
      }
    };
    
    getSettings();
  }, []);

  const updateSetting = async (key: string, value: any) => {
    const updatedSettings = { ...settings, [key]: value };
    setSettings(updatedSettings);
    await saveSettings(updatedSettings);
  };

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: isDark ? '#1C1B1F' : '#F7F2FA' }]}
      contentContainerStyle={styles.content}
    >
      <SettingsSection title="Appearance">
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Use Dynamic Colors
          </Text>
          <Switch
            value={settings.useDynamicColors}
            onValueChange={(value) => updateSetting('useDynamicColors', value)}
            trackColor={{ false: '#79747E', true: '#D0BCFF' }}
            thumbColor={settings.useDynamicColors ? '#6750A4' : '#F4EFF4'}
          />
        </View>
      </SettingsSection>
      
      <SettingsSection title="Survey Defaults">
        <Pressable 
          style={styles.settingRow}
          onPress={() => updateSetting('defaultLoopType', settings.defaultLoopType === 'closed' ? 'open' : 'closed')}
        >
          <Text style={[styles.settingText, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Default Loop Type
          </Text>
          <View style={styles.valueContainer}>
            <Text style={[styles.valueText, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
              {settings.defaultLoopType === 'closed' ? 'Closed' : 'Open'}
            </Text>
            <ChevronRight size={20} color={isDark ? '#CAC4D0' : '#79747E'} />
          </View>
        </Pressable>
        
        <Pressable 
          style={styles.settingRow}
          onPress={() => {}}
        >
          <Text style={[styles.settingText, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Error Constant (K)
          </Text>
          <View style={styles.valueContainer}>
            <Text style={[styles.valueText, { color: isDark ? '#D0BCFF' : '#6750A4' }]}>
              {settings.errorConstant} mm
            </Text>
            <ChevronRight size={20} color={isDark ? '#CAC4D0' : '#79747E'} />
          </View>
        </Pressable>
      </SettingsSection>
      
      <SettingsSection title="Data Management">
        <View style={styles.settingRow}>
          <Text style={[styles.settingText, { color: isDark ? '#E6E0E9' : '#1C1B1F' }]}>
            Auto-Save
          </Text>
          <Switch
            value={settings.autoSave}
            onValueChange={(value) => updateSetting('autoSave', value)}
            trackColor={{ false: '#79747E', true: '#D0BCFF' }}
            thumbColor={settings.autoSave ? '#6750A4' : '#F4EFF4'}
          />
        </View>
      </SettingsSection>
      
      <SettingsSection title="About">
        <Text style={[styles.versionText, { color: isDark ? '#CAC4D0' : '#79747E' }]}>
          Land Survey Level Loop v1.0.0
        </Text>
      </SettingsSection>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  settingText: {
    fontSize: 16,
    fontWeight: '400',
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valueText: {
    fontSize: 16,
    marginRight: 8,
    fontWeight: '500',
  },
  versionText: {
    paddingVertical: 16,
    fontSize: 14,
  },
});