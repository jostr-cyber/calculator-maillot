import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import DesignsPreview from './DesignsPreview'
import './SleevesSelect.css'

function SleevesSelect({ value, onSleevesChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(value !== null && value !== '' ? value : 0)

  const sleeves = [
    {
      value: 0,
      icon: '👕',
      labelKey: 'sleeves.none',
      descKey: 'sleeves.noneDesc'
    },
    {
      value: 1,
      icon: '🦾',
      labelKey: 'sleeves.one',
      descKey: 'sleeves.oneDesc'
    },
    {
      value: 2,
      icon: '💪',
      labelKey: 'sleeves.two',
      descKey: 'sleeves.twoDesc'
    }
  ]

  const handleContinue = () => {
    onSleevesChange(selected)
    onContinue()
  }

  return (
    <div className="sleeves-select">
      <h2>{t('steps.sleeves')}</h2>

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      {config && complexity && (
        <DesignsPreview config={config} complexity={complexity} />
      )}

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
