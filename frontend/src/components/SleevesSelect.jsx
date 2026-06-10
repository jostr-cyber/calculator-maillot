import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './SleevesSelect.css'

function SleevesSelect({ value, onSleevesChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(value !== null && value !== '' ? value : 0)
  const [openedImage, setOpenedImage] = useState(null)

  const sleeves = [
    {
      value: 0,
      icon: '👕',
      labelKey: 'sleeves.none',
      descKey: 'sleeves.noneDesc',
      imageKey: 'sleeves.noneImg',
      image: '/images/3.PNG'
    },
    {
      value: 1,
      icon: '🦾',
      labelKey: 'sleeves.one',
      descKey: 'sleeves.oneDesc',
      imageKey: 'sleeves.oneImg',
      image: '/images/3b.PNG'
    },
    {
      value: 2,
      icon: '💪',
      labelKey: 'sleeves.two',
      descKey: 'sleeves.twoDesc',
      imageKey: 'sleeves.twoImg',
      image: '/images/3c.PNG'
    },
    {
      value: 3,
      icon: '🎀',
      labelKey: 'sleeves.straps',
      descKey: 'sleeves.strapsDesc',
      imageKey: 'sleeves.strapsImg',
      image: '/images/4.PNG'
    }
  ]

  const handleContinue = () => {
    onSleevesChange(selected)
    onContinue()
  }

  const handleImageClick = (image) => {
    setOpenedImage(image)
  }

  const closeModal = () => {
    setOpenedImage(null)
  }

  return (
    <div className="sleeves-select">
      <h2>{t('steps.sleeves')}</h2>

      {/* Selection Options */}
      <div className="sleeves-grid">
        {sleeves.map(sleeve => (
          <label
            key={sleeve.value}
            className={`sleeve-card ${selected === sleeve.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="sleeves"
              value={sleeve.value}
              checked={selected === sleeve.value}
              onChange={(e) => setSelected(parseInt(e.target.value))}
              className="radio-input"
            />
            <div className="sleeve-card-content">
              <div className="sleeve-icon">{sleeve.icon}</div>
              <div className="sleeve-label">{t(sleeve.labelKey)}</div>
              <div className="sleeve-desc">{t(sleeve.descKey)}</div>
            </div>
          </label>
        ))}
      </div>

      {/* Images Gallery */}
      <div className="sleeves-gallery">
        <div className="gallery-grid">
          {sleeves.map(sleeve => (
            <div key={sleeve.value} className="gallery-item">
              <img
                src={sleeve.image}
                alt={t(sleeve.imageKey)}
                className="gallery-image"
                onClick={() => handleImageClick(sleeve.image)}
                style={{ cursor: 'pointer' }}
              />
              <p className="gallery-label">{t(sleeve.imageKey)}</p>
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

export default SleevesSelect
