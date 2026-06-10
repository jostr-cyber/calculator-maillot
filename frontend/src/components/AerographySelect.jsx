import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './AerographySelect.css'

function AerographySelect({ onConfirm, onBack }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('nothing')

  const options = [
    { value: 'volumetric', labelKey: 'aerography.drawing' },
    { value: 'nothing', labelKey: 'aerography.nothing' }
  ]

  const handleConfirm = () => {
    onConfirm(selected)
  }

  return (
    <div className="select-wrapper">
      <h2>{t('steps.aerography')}</h2>
      <div className="options-group">
        {options.map(opt => (
          <label key={opt.value} className="option-label">
            <input
              type="radio"
              name="aerography"
              value={opt.value}
              checked={selected === opt.value}
              onChange={(e) => setSelected(e.target.value)}
              className="radio-input"
            />
            <span className="option-text">{t(opt.labelKey)}</span>
          </label>
        ))}
      </div>

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

export default AerographySelect
