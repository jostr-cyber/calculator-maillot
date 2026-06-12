import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './RhinestoneSelect.css'

function RhinestoneSelect({ value, onRhinestoneChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(value !== null && value !== '' ? value : 'none')
  const [openedImage, setOpenedImage] = useState(null)

  const handleImageClick = (image) => {
    setOpenedImage(image)
  }

  const closeModal = () => {
    setOpenedImage(null)
  }

  const gallerySets = [
    {
      label: 'Без страз',
      images: ['/images/straz/no straz.JPEG', '/images/straz/no straz2.PNG', '/images/straz/no straz 3.jpg', '/images/straz/no straz 4.jpg']
    },
    {
      label: 'Минимальный набор страз',
      images: ['/images/straz/min.jpg', '/images/straz/min2.JPEG', '/images/straz/min 3.jpg', '/images/straz/min 4.jpg']
    },
    {
      label: 'Стандартный набор страз',
      images: ['/images/straz/standart.JPEG', '/images/straz/standart2.JPEG', '/images/straz/standart3.JPEG', '/images/straz/standart4.JPEG']
    },
    {
      label: 'Максимальный набор страз',
      images: ['/images/straz/maks.JPEG', '/images/straz/maks2.JPEG', '/images/straz/maks3.JPEG', '/images/straz/maks4.JPEG']
    }
  ]

  const rhinestoneOptions = [
    {
      value: 'none',
      labelKey: 'rhinestone.none',
      descKey: 'rhinestone.noneDesc'
    },
    {
      value: 'minimal',
      labelKey: 'rhinestone.minimal',
      descKey: 'rhinestone.minimalDesc'
    },
    {
      value: 'standard',
      labelKey: 'rhinestone.standard',
      descKey: 'rhinestone.standardDesc'
    },
    {
      value: 'maximum',
      labelKey: 'rhinestone.maximum',
      descKey: 'rhinestone.maximumDesc'
    },
    {
      value: 'premium',
      labelKey: 'rhinestone.premium',
      descKey: 'rhinestone.premiumDesc'
    }
  ]

  const handleContinue = () => {
    onRhinestoneChange(selected)
    onContinue()
  }

  return (
    <div className="rhinestone-select">
      <h2>{t('steps.rhinestone')}</h2>

      {/* Selection Options */}
      <div className="rhinestone-grid">
        {rhinestoneOptions.map(option => (
          <label
            key={option.value}
            className={`rhinestone-card ${selected === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="rhinestone"
              value={option.value}
              checked={selected === option.value}
              onChange={(e) => {
                const newValue = e.target.value
                setSelected(newValue)
                onRhinestoneChange(newValue)
              }}
              className="radio-input"
            />
            <div className="rhinestone-card-content">
              <div className="rhinestone-label">{t(option.labelKey)}</div>
              <div className="rhinestone-desc">{t(option.descKey)}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Examples Gallery */}
      <div className="rhinestone-gallery">
        <h3 className="gallery-title">Примеры наборов страз на купальниках нашего ателье</h3>
        {gallerySets.map((set, setIndex) => (
          <div key={setIndex} className="gallery-set">
            <p className="gallery-set-label">{set.label}</p>
            <div className="gallery-grid">
              {set.images.map((image, index) => (
                <div key={index} className="gallery-item">
                  <img
                    src={image}
                    alt={`${set.label} ${index + 1}`}
                    className="gallery-image"
                    onClick={() => handleImageClick(image)}
                    style={{ cursor: 'pointer' }}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {openedImage && (
        <div className="image-modal" onClick={closeModal}>
          <div className="image-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="image-modal-close" onClick={closeModal}>✕</button>
            <img src={openedImage} alt="Full size" className="image-modal-image" />
          </div>
        </div>
      )}

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      <div className="actions">
        <button onClick={handleContinue} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default RhinestoneSelect
