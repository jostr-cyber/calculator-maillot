import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './SelectCommon.css'
import './UrgencySelect.css'

function UrgencySelect({ onConfirm, onUrgencyChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('none')

  const options = [
    {
      value: 'none',
      labelKey: 'urgency.standard.title',
      descKey: 'urgency.standard.time'
    },
    {
      value: 'accelerated',
      labelKey: 'urgency.expedited.title',
      descKey: 'urgency.expedited.time'
    }
  ]

  return (
    <div className="select-wrapper">
      <h2>{t('steps.urgency')}</h2>

      <div className="radio-group urgency-options">
        {options.map(opt => (
          <label key={opt.value} className="radio-label urgency-label">
            <input
              type="radio"
              name="urgency"
              value={opt.value}
              checked={selected === opt.value}
              onChange={(e) => {
                const newValue = e.target.value
                setSelected(newValue)
                if (onUrgencyChange) {
                  onUrgencyChange(newValue)
                }
              }}
            />
            <div className="option-content">
              <span className="option-label">{t(opt.labelKey)}</span>
              <span className="option-description">{t(opt.descKey)} • {opt.value === 'none' ? t('urgency.standard.price') : t('urgency.expedited.price')}</span>
            </div>
          </label>
        ))}
      </div>

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      <div className="actions">
        <button onClick={() => {
          if (onContinue) {
            onContinue()
          } else {
            onConfirm(selected)
          }
        }} className="btn-primary">{t('buttons.continue')}</button>
        <button onClick={onBack} className="btn-secondary">{t('buttons.back')}</button>
      </div>
    </div>
  )
}

export default UrgencySelect
