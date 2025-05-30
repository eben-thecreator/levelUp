import React, { createContext, useContext, useState, useEffect } from 'react';
import { Survey } from '@/types';
import { loadSurveys } from '@/utils/storage';

interface JobContextType {
  surveys: Survey[];
  refreshSurveys: () => Promise<void>;
  loading: boolean;
}

const JobContext = createContext<JobContextType>({
  surveys: [],
  refreshSurveys: async () => {},
  loading: true
});

export const useJobs = () => useContext(JobContext);

export const JobProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [surveys, setSurveys] = useState<Survey[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSurveys = async () => {
    setLoading(true);
    try {
      const data = await loadSurveys();
      setSurveys(data);
    } catch (error) {
      console.error('Error loading surveys:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSurveys();
  }, []);

  return (
    <JobContext.Provider
      value={{
        surveys,
        refreshSurveys: fetchSurveys,
        loading
      }}
    >
      {children}
    </JobContext.Provider>
  );
};