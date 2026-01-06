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
    // If user has manually set a language, use it
    const saved = localStorage.getItem('language');
    if (saved) return saved;

    // Otherwise, check browser language preference
    const browserLang = navigator.language || navigator.userLanguage;
    if (browserLang) {
      // Extract primary language code (e.g., 'es-ES' -> 'es')
      const langCode = browserLang.split('-')[0].toLowerCase();
      // Check if we support this language
      if (langCode === 'es' || langCode === 'en') {
        return langCode;
      }
    }

    // Default to Spanish if no preference found
    return 'es';
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
