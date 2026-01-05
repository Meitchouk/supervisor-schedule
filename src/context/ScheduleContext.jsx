import { createContext, useContext, useState } from 'react';
import { useLoading } from './LoadingContext';

const ScheduleContext = createContext(null);

/**
 * ScheduleProvider component.
 * Manages schedule configuration and generation state.
 */
export function ScheduleProvider({ children }) {
  const { startLoading, stopLoading } = useLoading();
  const [config, setConfig] = useState({
    workDays: 5,
    offDays: 2,
    inductionDays: 1,
    drillingDaysRequired: 10,
  });

  const [scheduleResult, setScheduleResult] = useState(null);

  const handleConfigChange = (field, value) => {
    setConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGenerateSchedule = async () => {
    startLoading();
    try {
      // Simulate async operation (e.g., API call or complex calculation)
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // TODO: Implement actual schedule generation logic
      console.log('Generate schedule with config:', config);
      setScheduleResult(null);
    } finally {
      stopLoading();
    }
  };

  return (
    <ScheduleContext.Provider
      value={{
        config,
        scheduleResult,
        handleConfigChange,
        handleGenerateSchedule,
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

/**
 * useSchedule hook.
 * Access schedule state and actions.
 */
export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (!context) {
    throw new Error('useSchedule must be used within a ScheduleProvider');
  }
  return context;
}
