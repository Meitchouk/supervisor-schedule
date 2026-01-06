import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslations from './locales/en.json';
import esTranslations from './locales/es.json';

function getSavedLanguage() {
  try {
    return localStorage.getItem('language') || 'en';
  } catch (error) {
    console.warn('Failed to read language from localStorage:', error);
    return 'en';
  }
}

i18next.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslations },
    es: { translation: esTranslations },
  },
  lng: getSavedLanguage(),
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18next;
