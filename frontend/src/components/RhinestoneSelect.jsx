import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './RhinestoneSelect.css'

function RhinestoneSelect({ value, onRhinestoneChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(value !== null && value !== '' ? value : 'none')

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
              onChange={(e) => setSelected(e.target.value)}
              className="radio-input"
            />
            <div className="rhinestone-card-content">
              <div className="rhinestone-label">{t(option.labelKey)}</div>
              <div className="rhinestone-desc">{t(option.descKey)}</div>
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

export default RhinestoneSelect
