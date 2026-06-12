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
              src="/images/IMG_3490.JPEG"
              alt="Пример юбки 1"
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <img
              src="/images/IMG_3492.JPEG"
              alt="Пример юбки 2"
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <img
              src="/images/IMG_3494.JPEG"
              alt="Пример юбки 3"
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <img
              src="/images/IMG_3509.JPEG"
              alt="Пример юбки 4"
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <img
              src="/images/IMG_3511.JPEG"
              alt="Пример юбки 5"
              className="gallery-image"
            />
          </div>
          <div className="gallery-item">
            <img
              src="/images/IMG_8652.PNG"
              alt="Пример юбки 6"
              className="gallery-image"
            />
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
