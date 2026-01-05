import { createContext, useContext, useState } from 'react';

/**
 * LoadingContext - Manages global loading state
 * Provides loading state and control methods throughout the app
 */
const LoadingContext = createContext(undefined);

/**
 * Custom hook to access loading context
 * @returns {Object} Loading context with isLoading and setLoading
 */
export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within LoadingProvider');
  }
  return context;
}

/**
 * LoadingProvider component
 * Wraps the application to provide global loading state
 */
export function LoadingProvider({ children }) {
  const [isLoading, setIsLoading] = useState(false);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  const value = {
    isLoading,
    startLoading,
    stopLoading,
    setLoading: setIsLoading,
  };

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}
