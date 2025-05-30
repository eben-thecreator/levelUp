import AsyncStorage from '@react-native-async-storage/async-storage';
import { Survey } from '@/types';

const SURVEYS_STORAGE_KEY = 'land_survey_app_surveys';
const SETTINGS_STORAGE_KEY = 'land_survey_app_settings';

/**
 * Load all surveys from storage
 */
export async function loadSurveys(): Promise<Survey[]> {
  try {
    const surveysJson = await AsyncStorage.getItem(SURVEYS_STORAGE_KEY);
    if (surveysJson) {
      return JSON.parse(surveysJson);
    }
    return [];
  } catch (error) {
    console.error('Error loading surveys:', error);
    return [];
  }
}

/**
 * Get a specific survey by ID
 */
export async function getSurvey(id: string): Promise<Survey | null> {
  try {
    const surveys = await loadSurveys();
    return surveys.find(survey => survey.id === id) || null;
  } catch (error) {
    console.error('Error getting survey:', error);
    return null;
  }
}

/**
 * Create a new survey
 */
export async function createSurvey(survey: Survey): Promise<boolean> {
  try {
    const surveys = await loadSurveys();
    surveys.push(survey);
    await AsyncStorage.setItem(SURVEYS_STORAGE_KEY, JSON.stringify(surveys));
    return true;
  } catch (error) {
    console.error('Error creating survey:', error);
    return false;
  }
}

/**
 * Update an existing survey
 */
export async function updateSurvey(id: string, updatedSurvey: Survey): Promise<boolean> {
  try {
    const surveys = await loadSurveys();
    const index = surveys.findIndex(survey => survey.id === id);
    
    if (index >= 0) {
      surveys[index] = updatedSurvey;
      await AsyncStorage.setItem(SURVEYS_STORAGE_KEY, JSON.stringify(surveys));
      return true;
    }
    
    return false;
  } catch (error) {
    console.error('Error updating survey:', error);
    return false;
  }
}

/**
 * Delete a survey by ID
 */
export async function deleteSurvey(id: string): Promise<boolean> {
  try {
    const surveys = await loadSurveys();
    const filteredSurveys = surveys.filter(survey => survey.id !== id);
    
    await AsyncStorage.setItem(SURVEYS_STORAGE_KEY, JSON.stringify(filteredSurveys));
    return true;
  } catch (error) {
    console.error('Error deleting survey:', error);
    return false;
  }
}

/**
 * Load app settings
 */
export async function loadSettings(): Promise<any> {
  try {
    const settingsJson = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
    if (settingsJson) {
      return JSON.parse(settingsJson);
    }
    
    // Default settings
    return {
      darkMode: false,
      useDynamicColors: true,
      autoSave: true,
      defaultLoopType: 'closed',
      errorConstant: '12',
      units: 'meters',
    };
  } catch (error) {
    console.error('Error loading settings:', error);
    return null;
  }
}

/**
 * Save app settings
 */
export async function saveSettings(settings: any): Promise<boolean> {
  try {
    await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    return true;
  } catch (error) {
    console.error('Error saving settings:', error);
    return false;
  }
}