import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './app/App';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext';
import { LoadingProvider } from './context/LoadingContext';
import { ScheduleProvider } from './context/ScheduleContext';
import './i18n/config';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoadingProvider>
      <LanguageProvider>
        <ThemeProvider>
          <ScheduleProvider>
            <App />
          </ScheduleProvider>
        </ThemeProvider>
      </LanguageProvider>
    </LoadingProvider>
  </React.StrictMode>,
);
