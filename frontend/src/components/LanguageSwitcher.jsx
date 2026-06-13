import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import './LanguageSwitcher.css';

// Inline SVG flags so they render identically across platforms (Windows shows emoji flags as letters)
const FLAGS = {
  en: (
    <svg className="flag-svg" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#012169" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
      <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="4" />
      <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
      <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
    </svg>
  ),
  es: (
    <svg className="flag-svg" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="30" fill="#AA151B" />
      <rect y="7.5" width="60" height="15" fill="#F1BF00" />
    </svg>
  ),
  ru: (
    <svg className="flag-svg" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
      <rect width="60" height="10" fill="#fff" />
      <rect y="10" width="60" height="10" fill="#0039A6" />
      <rect y="20" width="60" height="10" fill="#D52B1E" />
    </svg>
  )
};

export const LanguageSwitcher = () => {
  const { language, changeLanguage, supportedLanguages } = useTranslation();

  return (
    <div className="language-switcher">
      {Object.entries(supportedLanguages).map(([code, { name }]) => (
        <button
          key={code}
          className={`language-button ${language === code ? 'active' : ''}`}
          onClick={() => changeLanguage(code)}
          title={`Switch to ${name}`}
          aria-label={name}
        >
          {FLAGS[code]}
        </button>
      ))}
    </div>
  );
};
