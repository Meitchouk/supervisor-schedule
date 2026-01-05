import React, { createContext, useContext, useEffect, useState } from 'react';
import i18next from 'i18next';

/**
 * Language context for managing application language/localization.
 */
const LanguageContext = createContext();

/**
 * Language provider component.
 * Wraps the application and provides language context to all children.
 */
export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || i18next.language || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    i18next.changeLanguage(language);
  }, [language]);

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

/**
 * Custom hook to use language context.
 * @returns {Object} Language context with language and changeLanguage function
 */
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
