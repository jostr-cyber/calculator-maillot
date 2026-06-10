import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './AerographySelect.css'

function AerographySelect({ onConfirm, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('nothing')

  const options = [
    { value: 'nothing', labelKey: 'aerography.nothing', descKey: 'aerography.nothingDesc' },
    { value: 'drawing', labelKey: 'aerography.drawing', descKey: 'aerography.drawingDesc' },
    { value: 'aerography', labelKey: 'aerography.aerography', descKey: 'aerography.aerographyDesc' }
  ]

  const handleContinue = () => {
    onConfirm(selected)
  }

  return (
    <div className="aerography-select">
      <h2>{t('steps.aerography')}</h2>

      {/* Selection Options */}
      <div className="aerography-grid">
        {options.map(option => (
          <label
            key={option.value}
            className={`aerography-card ${selected === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="aerography"
              value={option.value}
              checked={selected === option.value}
              onChange={(e) => setSelected(e.target.value)}
              className="radio-input"
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
