import { createContext, useContext, useState } from 'react';

const ComparisonContext = createContext(null);

export function ComparisonProvider({ children }) {
  const [isComparisonMode, setIsComparisonMode] = useState(false);
  const [comparisonConfig, setComparisonConfig] = useState({
    workDays: 14,
    offDays: 7,
    inductionDays: 3,
    drillingDaysRequired: 90,
  });
  const [comparisonResult, setComparisonResult] = useState(null);

  const toggleComparisonMode = () => {
    setIsComparisonMode((prev) => !prev);
    if (isComparisonMode) {
      // Reset when disabling
      setComparisonResult(null);
    }
  };

  const updateComparisonConfig = (field, value) => {
    setComparisonConfig((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const setComparisonScheduleResult = (result) => {
    setComparisonResult(result);
  };

  return (
    <ComparisonContext.Provider
      value={{
        isComparisonMode,
        toggleComparisonMode,
        comparisonConfig,
        updateComparisonConfig,
        comparisonResult,
        setComparisonScheduleResult,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}
