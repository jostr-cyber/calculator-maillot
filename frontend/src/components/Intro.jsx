import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './Intro.css'

function Intro({ onStart }) {
  const { t } = useTranslation()

  return (
    <div className="intro-container">
      <div className="intro-content">
        <h1 className="intro-title">
          {t('app.title') || 'Калькулятор стоимости купальника'}
        </h1>
        <p className="intro-subtitle">в ателье RG LeotART</p>

        <div className="intro-image">
          <img
            src="/images/intro-leotards.png"
            alt="Примеры купальников"
            className="intro-image-content"
          />
        </div>

        <p className="intro-description">
          {t('intro.description') || 'Рассчитайте стоимость вашего индивидуального купальника за несколько простых шагов'}
        </p>

        <button className="btn-start" onClick={onStart}>
          <span>{t('intro.startButton') || 'Начать расчет'}</span>
          <span className="arrow">→</span>
        </button>
      </div>
    </div>
  )
}

export default Intro
