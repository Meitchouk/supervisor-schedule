/**
 * ScheduleHistoryContext
 * Manages the history of generated schedules with temporal storage
 */

import { createContext, useContext, useState, useEffect } from 'react';
import { generateScheduleHash } from '../utils/scheduleHash';

const ScheduleHistoryContext = createContext(null);

const STORAGE_KEY = 'supervisor-schedule-history';
const MAX_HISTORY_ITEMS = 20; // Limit to prevent overflow

/**
 * Load history from localStorage
 */
function loadHistory() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.warn('Failed to load schedule history:', error);
  }
  return [];
}

/**
 * Save history to localStorage
 */
function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.warn('Failed to save schedule history:', error);
  }
}

/**
 * ScheduleHistoryProvider component
 */
export function ScheduleHistoryProvider({ children }) {
  const [history, setHistory] = useState(loadHistory);

  // Save history whenever it changes
  useEffect(() => {
    saveHistory(history);
  }, [history]);

  /**
   * Add a schedule to history
   */
  const addToHistory = (config, scheduleResult) => {
    const hash = generateScheduleHash(config, scheduleResult);

    setHistory((prev) => {
      // Check if duplicate exists
      const existingIndex = prev.findIndex((item) => item.hash === hash);

      if (existingIndex !== -1) {
        // Duplicate found - increment counter and update timestamp
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          duplicateCount: (updated[existingIndex].duplicateCount || 1) + 1,
          lastGeneratedAt: new Date().toISOString(),
        };
        return updated;
      }

      // New unique schedule - add to beginning
      const newItem = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        config: { ...config },
        scheduleResult: { ...scheduleResult }, // Store complete schedule
        hash,
        duplicateCount: 1,
        totalDays: scheduleResult.totalDays,
        drillingDaysCompleted: scheduleResult.drillingDaysCompleted,
        hasErrors: scheduleResult.hasErrors || false,
      };

      // Add to beginning and limit size
      return [newItem, ...prev].slice(0, MAX_HISTORY_ITEMS);
    });
  };

  /**
   * Clear all history
   */
  const clearHistory = () => {
    setHistory([]);
  };

  /**
   * Remove a specific item from history
   */
  const removeFromHistory = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <ScheduleHistoryContext.Provider
      value={{
        history,
        addToHistory,
        clearHistory,
        removeFromHistory,
      }}
    >
      {children}
    </ScheduleHistoryContext.Provider>
  );
}

/**
 * useScheduleHistory hook
 */
export function useScheduleHistory() {
  const context = useContext(ScheduleHistoryContext);
  if (!context) {
    throw new Error(
      'useScheduleHistory must be used within ScheduleHistoryProvider',
    );
  }
  return context;
}
