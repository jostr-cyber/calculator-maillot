import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './SkirtSelect.css'

function SkirtSelect({ onConfirm, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [skirtOption, setSkirtOption] = useState('')

  const skirtOptions = [
    {
      value: 'none',
      icon: '👗',
      labelKey: 'skirt.none',
      descKey: 'skirt.noneDesc',
      image: '🎭'
    },
    {
      value: 'front',
      icon: '🎀',
      labelKey: 'skirt.front',
      descKey: 'skirt.frontDesc',
      image: '🎭'
    },
    {
      value: 'back',
      icon: '💃',
      labelKey: 'skirt.back',
      descKey: 'skirt.backDesc',
      image: '🎭'
    },
    {
      value: 'both',
      icon: '✨',
      labelKey: 'skirt.both',
      descKey: 'skirt.bothDesc',
      image: '🎭'
    }
  ]

  const handleConfirm = () => {
    onConfirm(skirtOption || 'none')
  }

  return (
    <div className="skirt-select">
      <h2>{t('steps.skirt')}</h2>

      {/* Selection Options */}
      <div className="skirt-grid">
        {skirtOptions.map(option => (
          <label
            key={option.value}
            className={`skirt-card ${skirtOption === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="skirt"
              value={option.value}
              checked={skirtOption === option.value}
              onChange={(e) => setSkirtOption(e.target.value)}
              className="radio-input"
            />
            <div className="skirt-card-content">
              <div className="skirt-icon">{option.icon}</div>
              <div className="skirt-label">{t(option.labelKey)}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Images Gallery */}
      <div className="skirt-gallery">
        <div className="gallery-grid">
          {skirtOptions.map(option => (
            <div key={option.value} className="gallery-item">
              <div className="gallery-image-placeholder">
                <span>{option.image}</span>
              </div>
              <p className="gallery-label">{t(option.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      <div className="actions">
        <button onClick={handleConfirm} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default SkirtSelect
