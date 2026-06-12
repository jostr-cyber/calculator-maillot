import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './AerographySelect.css'

function AerographySelect({ onConfirm, onAerographyChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(new Set()) // Using Set to store selected options
  const [openedImage, setOpenedImage] = useState(null)

  const handleImageClick = (image) => {
    setOpenedImage(image)
  }

  const closeModal = () => {
    setOpenedImage(null)
  }

  const galleryImages = [
    '/images/aerog/IMG_3515.JPEG',
    '/images/aerog/IMG_3522 (1).JPEG',
    '/images/aerog/IMG_3524.JPEG',
    '/images/aerog/IMG_3527.JPEG',
    '/images/aerog/IMG_3538.JPEG',
    '/images/aerog/IMG_6818.PNG',
    '/images/aerog/IMG_6835.PNG',
    '/images/aerog/IMG_6836.PNG'
  ]

  const options = [
    { value: 'nothing', labelKey: 'aerography.nothing', descKey: 'aerography.nothingDesc' },
    { value: 'drawing', labelKey: 'aerography.drawing', descKey: 'aerography.drawingDesc' },
    { value: 'aerography', labelKey: 'aerography.aerography', descKey: 'aerography.aerographyDesc' }
  ]

  const handleToggle = (value) => {
    const newSelected = new Set(selected)

    // If "nothing" is selected, clear all and select "nothing"
    if (value === 'nothing') {
      if (newSelected.has('nothing')) {
        newSelected.delete('nothing')
      } else {
        newSelected.clear()
        newSelected.add('nothing')
      }
    } else {
      // If toggling drawing or aerography, remove "nothing" if it exists
      if (newSelected.has('nothing')) {
        newSelected.delete('nothing')
      }

      // Toggle the selected option
      if (newSelected.has(value)) {
        newSelected.delete(value)
      } else {
        newSelected.add(value)
      }

      // If nothing is selected after this, add "nothing" back
      if (newSelected.size === 0) {
        newSelected.add('nothing')
      }
    }

    setSelected(newSelected)

    // Update price immediately
    if (onAerographyChange) {
      const result = newSelected.has('nothing') ? 'nothing' : Array.from(newSelected).join(',')
      onAerographyChange(result)
    }
  }

  const handleContinue = () => {
    if (onContinue) {
      onContinue()
    } else {
      // Convert Set to string format (e.g., "drawing,aerography" or "nothing")
      const result = selected.has('nothing') ? 'nothing' : Array.from(selected).join(',')
      onConfirm(result)
    }
  }

  return (
    <div className="aerography-select">
      <h2>{t('steps.aerography')}</h2>

      {/* Selection Options */}
      <div className="aerography-grid">
        {options.map(option => (
          <label
            key={option.value}
            className={`aerography-card ${selected.has(option.value) ? 'selected' : ''}`}
          >
            <input
              type="checkbox"
              name="aerography"
              value={option.value}
              checked={selected.has(option.value)}
              onChange={() => handleToggle(option.value)}
              className="checkbox-input"
            />
            <div className="aerography-card-content">
              <div className="aerography-label">{t(option.labelKey)}</div>
              <div className="aerography-desc">{t(option.descKey)}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Examples Gallery */}
      <div className="aerography-gallery">
        <h3 className="gallery-title">Примеры росписи и аэрографии на купальниках нашего ателье</h3>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image}
                alt={`Пример росписи ${index + 1}`}
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

export default AerographySelect
