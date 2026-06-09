import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './LanguageSwitcher.css';

export const LanguageSwitcher = () => {
  const { language, changeLanguage, supportedLanguages } = useTranslation();

  return (
    <div className="language-switcher">
      {Object.entries(supportedLanguages).map(([code, { flag }]) => (
        <button
          key={code}
          className={`language-button ${language === code ? 'active' : ''}`}
          onClick={() => changeLanguage(code)}
          title={`Switch to ${code.toUpperCase()}`}
        >
          {flag}
        </button>
      ))}
    </div>
  );
};
