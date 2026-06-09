import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './HeightSlider.css'

function HeightSlider({ value, onHeightChange, onContinue, onBack }) {
  const { t } = useTranslation()

  return (
    <div className="height-slider">
      <h2>{t('steps.height')}</h2>
      <div className="slider-container">
        <div className="height-display">{value} {t('height.label')}</div>
        <input
          type="range"
          min="90"
          max="180"
          value={value}
          onChange={(e) => onHeightChange(parseInt(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>{t('height.min')}</span>
          <span>{t('height.max')}</span>
        </div>
      </div>
      <div className="actions">
        <button
          onClick={onContinue}
          className="btn-primary"
        >
          {t('buttons.continue')}
        </button>
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default HeightSlider
