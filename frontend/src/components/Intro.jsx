import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from './LanguageSwitcher'
import './Intro.css'

function Intro({ onStart }) {
  const { t } = useTranslation()

  return (
    <div className="intro-container">
      <LanguageSwitcher />
      <div className="intro-content">
        <h1 className="intro-title">
          {t('intro.appTitle')}
        </h1>

        <div className="intro-image">
          <img
            src="/images/2.PNG"
            alt={t('intro.imageAlt')}
            className="intro-image-content"
          />
        </div>

        <button className="btn-start" onClick={onStart}>
          <span>{t('intro.startButton')}</span>
          <span className="arrow">→</span>
        </button>
      </div>
    </div>
  )
}

export default Intro
