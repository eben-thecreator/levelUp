import { Survey, SetupReading, InstrumentSetup } from '@/types';

/**
 * Process setup data to compute HI and RLs
 */
export function processSetupData(readings: SetupReading[], startingRL: number) {
  // Sort readings to ensure BS is first
  const sortedReadings = [...readings].sort((a, b) => {
    if (a.type === 'BS') return -1;
    if (b.type === 'BS') return 1;
    if (a.type === 'FS') return 1;
    if (b.type === 'FS') return -1;
    return 0;
  });
  
  // Find BS reading
  const bsReading = sortedReadings.find(r => r.type === 'BS');
  
  if (!bsReading) {
    // Can't compute HI without BS
    return null;
  }
  
  // Compute HI (Height of Instrument)
  const HI = startingRL + bsReading.reading;
  
  // Compute RLs for all readings
  const RLs = sortedReadings.map(reading => {
    if (reading.type === 'BS') {
      return startingRL;
    } else {
      // For IS and FS, RL = HI - reading
      return HI - reading.reading;
    }
  });
  
  return { HI, RLs };
}

/**
 * Calculate misclosure for a closed loop survey
 */
export function calculateMisclosure(survey: Survey) {
  if (!survey.setups || survey.setups.length === 0 || !survey.closeRL) {
    return null;
  }
  
  // Get the last setup
  const lastSetup = survey.setups[survey.setups.length - 1];
  
  // Find the FS reading from the last setup
  const lastFsReading = lastSetup.readings.find(r => r.type === 'FS');
  
  if (!lastFsReading || lastFsReading.computedRL === undefined) {
    return null;
  }
  
  // Calculate misclosure: Computed Final RL - Known Final RL
  const misclosure = lastFsReading.computedRL - survey.closeRL;
  
  // Calculate allowable error: K * sqrt(n)
  // Where K is a constant (e.g., 12 mm) and n is the number of setups
  const K = 0.012; // 12 mm in meters
  const n = survey.setups.length;
  const allowableError = K * Math.sqrt(n);
  
  // Check if misclosure is within tolerance
  const isWithinTolerance = Math.abs(misclosure) <= allowableError;
  
  return {
    misclosure,
    allowableError,
    isWithinTolerance,
  };
}

/**
 * Calculate adjusted RLs for linear error distribution
 */
export function getAdjustedRLs(survey: Survey, misclosureData: any) {
  if (!survey.setups || survey.setups.length === 0 || !misclosureData) {
    return null;
  }
  
  const { misclosure } = misclosureData;
  
  // Count backsights to determine correction factor
  const bsCount = survey.setups.length;
  
  if (bsCount === 0) {
    return null;
  }
  
  // Calculate correction per backsight
  // Note: if misclosure is positive, correction is negative and vice versa
  const correctionPerBS = -misclosure / bsCount;
  
  // Collect all stations and their RLs
  const stations: string[] = [];
  const originalRLs: number[] = [];
  const adjustedRLs: number[] = [];
  
  // Process each setup
  survey.setups.forEach((setup, setupIndex) => {
    setup.readings.forEach(reading => {
      if (reading.computedRL !== undefined) {
        stations.push(reading.station);
        originalRLs.push(reading.computedRL);
        
        // Apply correction based on how many backsights preceded this reading
        // The adjustment is cumulative as we move through the setups
        const adjustment = correctionPerBS * (setupIndex + 1);
        adjustedRLs.push(reading.computedRL + adjustment);
      }
    });
  });
  
  return {
    stations,
    originalRLs,
    adjustedRLs,
  };
}