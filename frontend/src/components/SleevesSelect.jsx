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
      <select
        value={value}
        onChange={(e) => {
          const val = e.target.value
          onSleevesChange(val === '' ? '' : parseInt(val))
        }}
        className="select"
      >
        <option value="">{t('sleeves.label')}</option>
        {sleeves.map(sleeve => (
          <option key={sleeve.value} value={sleeve.value}>
            {t(sleeve.labelKey)}
          </option>
        ))}
      </select>
      <div className="actions">
        <button
          onClick={onContinue}
          disabled={value === ''}
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
