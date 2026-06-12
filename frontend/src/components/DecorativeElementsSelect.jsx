import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './DecorativeElementsSelect.css'

function DecorativeElementsSelect({ onConfirm, onDecorativeElementsChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState([])

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

      {/* Images Gallery */}
      <div className="decorative-gallery">
        <div className="gallery-grid">
          {options.map(opt => (
            <div key={opt.value} className="gallery-item">
              <div className="gallery-image-placeholder">
                <span>{opt.image}</span>
              </div>
              <p className="gallery-label">{t(opt.labelKey)}</p>
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

export default DecorativeElementsSelect
