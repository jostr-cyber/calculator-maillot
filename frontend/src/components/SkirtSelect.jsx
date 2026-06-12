import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './SkirtSelect.css'

function SkirtSelect({ onConfirm, onSkirtChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [skirtOption, setSkirtOption] = useState('')

  const skirtOptions = [
    {
      value: 'none',
      iconImage: '/images/skirt-bez.PNG',
      labelKey: 'skirt.none',
      descKey: 'skirt.noneDesc',
      image: '/images/skirt-bez.PNG'
    },
    {
      value: 'front',
      iconImage: '/images/skirt-front.PNG',
      labelKey: 'skirt.front',
      descKey: 'skirt.frontDesc',
      image: '/images/skirt-front.PNG'
    },
    {
      value: 'back',
      iconImage: '/images/skirt-back.PNG',
      labelKey: 'skirt.back',
      descKey: 'skirt.backDesc',
      image: '/images/skirt-back.PNG'
    },
    {
      value: 'both',
      iconImage: '/images/skirt-both.PNG',
      labelKey: 'skirt.both',
      descKey: 'skirt.bothDesc',
      image: '/images/skirt-both.PNG'
    }
  ]

  const handleConfirm = () => {
    if (onContinue) {
      onContinue()
    } else {
      onConfirm(skirtOption || 'none')
    }
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
              onChange={(e) => {
                const newValue = e.target.value
                setSkirtOption(newValue)
                if (onSkirtChange) {
                  onSkirtChange(newValue)
                }
              }}
              className="radio-input"
            />
            <div className="skirt-card-content">
              <img src={option.iconImage} alt={t(option.labelKey)} className="skirt-icon" />
              <div className="skirt-label">{t(option.labelKey)}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Images Gallery */}
      <div className="skirt-gallery">
        <h3 className="gallery-title">{t('skirt.galleryTitle')}</h3>
        <div className="gallery-grid">
          {skirtOptions.map(option => (
            <div key={option.value} className="gallery-item">
              <img
                src={option.image}
                alt={t(option.labelKey)}
                className="gallery-image"
              />
              <p className="gallery-label">{t(option.labelKey)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Examples Gallery */}
      <div className="skirt-gallery">
        <h3 className="gallery-title">Примеры юбок нашего производства</h3>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img
              src="/images/skirt-bez.PNG"
              alt="Пример без юбки"
              className="gallery-image"
            />
            <p className="gallery-label">Без юбки</p>
          </div>
          <div className="gallery-item">
            <img
              src="/images/skirt-front.PNG"
              alt="Пример юбка спереди"
              className="gallery-image"
            />
            <p className="gallery-label">Юбка спереди</p>
          </div>
          <div className="gallery-item">
            <img
              src="/images/skirt-back.PNG"
              alt="Пример юбка сзади"
              className="gallery-image"
            />
            <p className="gallery-label">Юбка сзади</p>
          </div>
          <div className="gallery-item">
            <img
              src="/images/skirt-both.PNG"
              alt="Пример юбка спереди и сзади"
              className="gallery-image"
            />
            <p className="gallery-label">Юбка спереди и сзади</p>
          </div>
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
