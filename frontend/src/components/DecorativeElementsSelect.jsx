import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './DecorativeElementsSelect.css'

function DecorativeElementsSelect({ onConfirm, onDecorativeElementsChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState([])
  const [openedImage, setOpenedImage] = useState(null)

  const handleImageClick = (image) => {
    setOpenedImage(image)
  }

  const closeModal = () => {
    setOpenedImage(null)
  }

  const galleryImages = [
    '/images/ornament/IMG_3259.PNG',
    '/images/ornament/IMG_3511.JPEG',
    '/images/ornament/IMG_3516.JPEG',
    '/images/ornament/IMG_3517.JPEG',
    '/images/ornament/IMG_3518.JPEG',
    '/images/ornament/IMG_3521.JPEG',
    '/images/ornament/IMG_3523.JPEG',
    '/images/ornament/IMG_3534.JPEG'
  ]

  const options = [
    { value: 'feathers', labelKey: 'decorativeElements.feathers', icon: '/images/pero.PNG', image: '🎭' },
    { value: 'fringe', labelKey: 'decorativeElements.fringe', icon: '/images/fringe.PNG', image: '🎭' },
    { value: 'flowers', labelKey: 'decorativeElements.flowers', icon: '/images/flower.PNG', image: '🎭' },
    { value: 'other', labelKey: 'decorativeElements.other', icon: '/images/pogon.PNG', image: '🎭' },
    { value: 'nothing', labelKey: 'decorativeElements.nothing', icon: '🚫', image: '🎭' }
  ]

  const handleToggle = (value) => {
    let newSelected

    if (value === 'nothing') {
      // If clicking "nothing", clear all other selections
      if (selected.includes('nothing')) {
        newSelected = []
      } else {
        newSelected = ['nothing']
      }
    } else {
      // If clicking other options, remove "nothing" if present
      newSelected = selected.filter(item => item !== 'nothing')

      if (newSelected.includes(value)) {
        newSelected = newSelected.filter(item => item !== value)
      } else {
        newSelected = [...newSelected, value]
      }
    }

    setSelected(newSelected)

    // Update price immediately
    if (onDecorativeElementsChange) {
      const result = newSelected.length === 0 ? 'none' : newSelected.join(',')
      onDecorativeElementsChange(result)
    }
  }

  const handleConfirm = () => {
    if (onContinue) {
      onContinue()
    } else {
      if (selected.length === 0) {
        onConfirm('none')
      } else {
        onConfirm(selected.join(','))
      }
    }
  }

  return (
    <div className="decorative-select">
      <h2>{t('steps.decorativeElements')}</h2>

      {/* Selection Options */}
      <div className="options-group">
        {options.map(opt => {
          // Determine if this checkbox should be disabled
          const isNothing = opt.value === 'nothing'
          const hasNothingSelected = selected.includes('nothing')
          const isDisabled = (isNothing && selected.length > 0 && !hasNothingSelected) ||
                            (!isNothing && hasNothingSelected)

          return (
            <label
              key={opt.value}
              className={`option-card ${selected.includes(opt.value) ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
            >
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => handleToggle(opt.value)}
                className="checkbox-input"
                disabled={isDisabled}
              />
              <div className="option-card-content">
                <div className="option-icon">
                  {opt.icon.startsWith('/') ? (
                    <img src={opt.icon} alt={t(opt.labelKey)} />
                  ) : (
                    <span className="icon-emoji">{opt.icon}</span>
                  )}
                </div>
                <div className="option-text">{t(opt.labelKey)}</div>
              </div>
            </label>
          )
        })}
      </div>

      {/* Examples Gallery */}
      <div className="decorative-gallery">
        <h3 className="gallery-title">Примеры дополнительных объемных деталей на купальниках нашего ателье: объемные цветы, бахрома, перья, погон на плечо, реалистичная имитация ремней и т.д.</h3>
        <div className="gallery-grid">
          {galleryImages.map((image, index) => (
            <div key={index} className="gallery-item">
              <img
                src={image}
                alt={`Пример детали ${index + 1}`}
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

export default DecorativeElementsSelect
