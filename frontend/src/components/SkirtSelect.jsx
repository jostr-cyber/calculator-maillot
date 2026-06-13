import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './SkirtSelect.css'

function SkirtSelect({ onConfirm, onSkirtChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [skirtOption, setSkirtOption] = useState('')
  const [openedImage, setOpenedImage] = useState(null)

  const handleImageClick = (image) => {
    setOpenedImage(image)
  }

  const closeModal = () => {
    setOpenedImage(null)
  }

  const galleryImages = [
    '/images/IMG_3494.JPEG',
    '/images/IMG_3496 (1).JPEG',
    '/images/IMG_3497 (1).JPEG',
    '/images/IMG_3498 (1).JPEG',
    '/images/IMG_3500 (1).JPEG',
    '/images/IMG_3509.JPEG',
    '/images/IMG_3511.JPEG',
    '/images/IMG_8652 (1).PNG'
  ]

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

      {/* Examples Gallery */}
      <div className="skirt-gallery">
        <h3 className="gallery-title">{t('skirt.galleryTitle')}</h3>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image}
                alt={`${t('skirt.galleryTitle')} ${index + 1}`}
                className="gallery-image"
                onClick={() => handleImageClick(image)}
                style={{ cursor: 'pointer' }}
              />
            </div>
          ))}
        </div>
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
