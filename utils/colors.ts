import { Platform } from 'react-native';

const baseColors = {
  primary: '#7C3AED', // Vibrant purple
  primaryDark: '#6D28D9',
  primaryLight: '#A78BFA',
  background: '#FFFFFF',
  backgroundDark: '#0F172A',
  surface: '#F8FAFC',
  surfaceDark: '#1E293B',
  text: '#1E293B',
  textDark: '#F1F5F9',
  textSecondary: '#64748B',
  textSecondaryDark: '#94A3B8',
  border: '#E2E8F0',
  borderDark: '#334155',
  error: '#EF4444',
  errorDark: '#DC2626',
  success: '#10B981',
  successDark: '#059669',
};

export const colors = {
  light: {
    primary: baseColors.primary,
    background: baseColors.background,
    surface: baseColors.surface,
    text: baseColors.text,
    textSecondary: baseColors.textSecondary,
    border: baseColors.border,
    error: baseColors.error,
    success: baseColors.success,
    tint: {
      purple: baseColors.primaryLight,
      red: baseColors.error,
    },
    elevation: {
      small: Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
        },
        android: {
          elevation: 2,
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.05,
          shadowRadius: 3,
        },
      }),
      medium: Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
        android: {
          elevation: 4,
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.1,
          shadowRadius: 6,
        },
      }),
    },
  },
  dark: {
    primary: baseColors.primaryDark,
    background: baseColors.backgroundDark,
    surface: baseColors.surfaceDark,
    text: baseColors.textDark,
    textSecondary: baseColors.textSecondaryDark,
    border: baseColors.borderDark,
    error: baseColors.errorDark,
    success: baseColors.successDark,
    tint: {
      purple: baseColors.primary,
      red: baseColors.errorDark,
    },
    elevation: {
      small: Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
        },
        android: {
          elevation: 3,
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3,
        },
      }),
      medium: Platform.select({
        ios: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 6,
        },
        android: {
          elevation: 6,
        },
        default: {
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.35,
          shadowRadius: 6,
        },
      }),
    },
  },
};