import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './AerographySelect.css'

function AerographySelect({ onConfirm, onAerographyChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(new Set()) // Using Set to store selected options

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
