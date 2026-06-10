import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './SleevesSelect.css'

function SleevesSelect({ value, onSleevesChange, onContinue, onBack }) {
  const { t } = useTranslation()

  const sleeves = [
    { value: 0, labelKey: 'sleeves.none' },
    { value: 1, labelKey: 'sleeves.one' },
    { value: 2, labelKey: 'sleeves.two' }
  ]

  return (
    <div className="sleeves-select">
      <h2>{t('steps.sleeves')}</h2>
      <div className="options-group">
        {sleeves.map(sleeve => (
          <label key={sleeve.value} className="option-label">
            <input
              type="radio"
              name="sleeves"
              value={sleeve.value}
              checked={value === sleeve.value}
              onChange={(e) => onSleevesChange(parseInt(e.target.value))}
              className="radio-input"
            />
            <span className="option-text">{t(sleeve.labelKey)}</span>
          </label>
        ))}
      </div>
      <div className="actions">
        <button
          onClick={onContinue}
          disabled={value === '' || value === null}
          className="btn-primary"
        >
          {t('buttons.continue')}
        </button>
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default SleevesSelect
