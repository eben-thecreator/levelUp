import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { loadSettings, saveSettings } from '@/utils/storage';

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
  useDynamicColors: boolean;
  toggleDynamicColors: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  isDark: false,
  toggleTheme: () => {},
  useDynamicColors: true,
  toggleDynamicColors: () => {}
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useColorScheme();
  const [isDark, setIsDark] = useState(deviceColorScheme === 'dark');
  const [useDynamicColors, setUseDynamicColors] = useState(true);

  useEffect(() => {
    const loadThemeSettings = async () => {
      const settings = await loadSettings();
      if (settings) {
        setUseDynamicColors(settings.useDynamicColors);
        if (!settings.useDynamicColors) {
          setIsDark(settings.darkMode);
        }
      }
    };
    
    loadThemeSettings();
  }, []);

  useEffect(() => {
    if (useDynamicColors) {
      setIsDark(deviceColorScheme === 'dark');
    }
  }, [deviceColorScheme, useDynamicColors]);

  const toggleTheme = async () => {
    const newDarkMode = !isDark;
    setIsDark(newDarkMode);
    
    const settings = await loadSettings();
    if (settings) {
      const updatedSettings = { ...settings, darkMode: newDarkMode };
      await saveSettings(updatedSettings);
    }
  };

  const toggleDynamicColors = async () => {
    const newDynamicColors = !useDynamicColors;
    setUseDynamicColors(newDynamicColors);
    
    const settings = await loadSettings();
    if (settings) {
      const updatedSettings = { ...settings, useDynamicColors: newDynamicColors };
      await saveSettings(updatedSettings);
      
      if (newDynamicColors) {
        setIsDark(deviceColorScheme === 'dark');
      }
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        isDark,
        toggleTheme,
        useDynamicColors,
        toggleDynamicColors
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};