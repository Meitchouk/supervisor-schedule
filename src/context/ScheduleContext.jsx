import { createContext, useContext, useState } from 'react';
import { useLoading } from './LoadingContext';
import { generateSchedule } from '../features/scheduler/generateSchedule';
import { validateSchedule } from '../features/scheduler/validateSchedule';

const ScheduleContext = createContext(null);

/**
 * ScheduleProvider component.
 * Manages schedule configuration and generation state.
 */
export function ScheduleProvider({ children }) {
  const { startLoading, stopLoading } = useLoading();
  const [config, setConfig] = useState({
    workDays: 14,
    offDays: 7,
    inductionDays: 5,
    drillingDaysRequired: 30,
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
      // Simulate async operation for better UX
      await new Promise((resolve) => setTimeout(resolve, 800));

      // Generate schedule
      const result = generateSchedule(config);

      // Validate schedule
      const validation = validateSchedule(result);

      // Combine results
      const finalResult = {
        ...result,
        issues: validation.issues,
        hasErrors: validation.hasErrors,
      };

      setScheduleResult(finalResult);

      // console.log('Schedule generated:', finalResult);
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
