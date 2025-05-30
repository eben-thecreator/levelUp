import { format, parseISO } from 'date-fns';

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string): string {
  try {
    return format(parseISO(dateString), 'MMM d, yyyy');
  } catch (e) {
    return dateString;
  }
}

/**
 * Format a number to a fixed decimal places
 */
export function formatNumber(value: number, decimals: number = 3): string {
  return value.toFixed(decimals);
}

/**
 * Format elevation change with sign and direction
 */
export function formatElevationChange(value: number): string {
  const sign = value >= 0 ? '+' : '';
  const direction = value >= 0 ? 'Rising' : 'Falling';
  return `${sign}${value.toFixed(3)} m (${direction})`;
}