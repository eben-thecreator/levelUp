export interface Survey {
  id: string;
  title: string;
  surveyor: string;
  instrument?: string;
  date: string;
  loopType: 'open' | 'closed';
  startRL: number;
  closeRL?: number;
  setups?: InstrumentSetup[];
  createdAt: string;
}

export interface InstrumentSetup {
  id: string;
  setupIndex: number;
  HI: number;
  readings: SetupReading[];
}

export interface SetupReading {
  id: string;
  station: string;
  reading: number;
  type: 'BS' | 'IS' | 'FS';
  remarks?: string;
  computedRL?: number;
}