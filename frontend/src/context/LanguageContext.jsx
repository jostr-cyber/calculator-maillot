import React, { createContext, useState, useEffect } from 'react';

// Import all translations
import en from '../locales/en.json';
import es from '../locales/es.json';
import ru from '../locales/ru.json';

export const LanguageContext = createContext();

const translations = {
  en,
  es,
  ru
};

const SUPPORTED_LANGUAGES = {
  en: { name: 'English', flag: 'EN' },
  es: { name: 'Español', flag: 'ES' },
  ru: { name: 'Русский', flag: 'RU' }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    // Get language from localStorage or default to 'en'
    const saved = localStorage.getItem('language');
    return saved && Object.keys(translations).includes(saved) ? saved : 'en';
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Function to get translated text with optional interpolation
  const t = (key, params = {}) => {
    const keys = key.split('.');
    let value = translations[language];

    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // If translation not found, try to get from English as fallback
        value = translations.en;
        for (const fallbackKey of keys) {
          value = value[fallbackKey];
        }
        break;
      }
    }

    let result = value || key;

    // Replace parameters if provided
    if (typeof result === 'string' && Object.keys(params).length > 0) {
      Object.entries(params).forEach(([paramKey, paramValue]) => {
        result = result.replace(`{${paramKey}}`, paramValue);
      });
    }

    return result;
  };

  const changeLanguage = (newLanguage) => {
    if (Object.keys(translations).includes(newLanguage)) {
      setLanguage(newLanguage);
    }
  };

  const value = {
    language,
    changeLanguage,
    t,
    supportedLanguages: SUPPORTED_LANGUAGES
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
