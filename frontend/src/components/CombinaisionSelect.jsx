import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './CombinaisionSelect.css'

function CombinaisionSelect({ onConfirm, onCombinaisionChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('')

  const options = [
    { value: 'standard', labelKey: 'combinaison.leotard', descKey: 'combinaison.leotardDesc' },
    { value: 'full', labelKey: 'combinaison.combinaison', descKey: 'combinaison.combinaisonDesc' }
  ]

  const handleContinue = () => {
    if (onContinue) {
      onContinue()
    } else {
      onConfirm(selected)
    }
  }

  return (
    <div className="combinaison-select">
      <h2>{t('steps.combinaison')}</h2>

      {/* Selection Options */}
      <div className="combinaison-grid">
        {options.map(option => (
          <label
            key={option.value}
            className={`combinaison-card ${selected === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="combinaison"
              value={option.value}
              checked={selected === option.value}
              onChange={(e) => {
                const newValue = e.target.value
                setSelected(newValue)
                if (onCombinaisionChange) {
                  onCombinaisionChange(newValue)
                }
              }}
              className="radio-input"
            />
            <div className="combinaison-card-content">
              <div className="combinaison-label">{t(option.labelKey)}</div>
              <div className="combinaison-desc">{t(option.descKey)}</div>
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

export default CombinaisionSelect
