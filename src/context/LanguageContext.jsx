import React, { createContext, useContext, useEffect, useState } from 'react';
import i18next from 'i18next';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      const saved = localStorage.getItem('language');
      if (saved) return saved;

      const browserLang = navigator.language || navigator.userLanguage;
      if (browserLang) {
        const langCode = browserLang.split('-')[0].toLowerCase();
        if (langCode === 'es' || langCode === 'en') {
          return langCode;
        }
      }

      return 'es';
    } catch (error) {
      console.warn('Failed to read language from localStorage:', error);
      return 'es';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('language', language);
    } catch (error) {
      console.warn('Failed to save language to localStorage:', error);
    }
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

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
