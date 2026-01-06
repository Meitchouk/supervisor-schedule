import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { useTranslation } from 'react-i18next';

import App from './app/App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';
import { ScheduleProvider } from './context/ScheduleContext';
import './i18n/config';
import './styles/globals.css';

/**
 * AppWrapper component to handle dynamic document title and initial loading
 */
function AppWrapper() {
  const { t } = useTranslation();
  const { startInitialLoading, stopInitialLoading } = useLoading();

  useEffect(() => {
    document.title = t('documentTitle');
  }, [t]);

  useEffect(() => {
    // Activate initial loading on mount (only affects LoadingBar)
    startInitialLoading();

    // Stop initial loading after app setup
    const timer = setTimeout(() => {
      stopInitialLoading();
    }, 500);

    return () => {
      clearTimeout(timer);
      stopInitialLoading(); // Ensure initial loading stops on unmount
    };
  }, []);

  return <App />;
}

/**
 * Main entry point for the React application.
 *
 * Initializes the React application with multiple context providers for:
 * - Loading state management
 * - Language/internationalization (i18n)
 * - Theme management
 * - Schedule data management
 *
 * The application is wrapped in React.StrictMode for development checks.
 *
 * @requires react
 * @requires react-dom
 * @requires ./app/App
 * @requires ./context/ThemeContext
 * @requires ./context/LanguageContext
 * @requires ./context/LoadingContext
 * @requires ./context/ScheduleContext
 * @requires ./i18n/config
 * @requires ./styles/globals.css
 */
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ScheduleProvider>
            <AppWrapper />
          </ScheduleProvider>
        </ThemeProvider>
      </LanguageProvider>
    </LoadingProvider>
  </React.StrictMode>,
);
