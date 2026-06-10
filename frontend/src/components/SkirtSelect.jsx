import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './SkirtSelect.css'

function SkirtSelect({ onConfirm, onBack }) {
  const { t } = useTranslation()
  const [skirtOption, setSkirtOption] = useState('')

  const skirtOptions = [
    { value: 'none', labelKey: 'skirt.none' },
    { value: 'front', labelKey: 'skirt.front' },
    { value: 'back', labelKey: 'skirt.back' },
    { value: 'both', labelKey: 'skirt.both' }
  ]

  const handleConfirm = () => {
    onConfirm(skirtOption)
  }

  return (
    <div className="skirt-select">
      <h2>{t('steps.skirt')}</h2>
      <div className="options-group">
        {skirtOptions.map(option => (
          <label key={option.value} className="option-label">
            <input
              type="radio"
              name="skirt"
              value={option.value}
              checked={skirtOption === option.value}
              onChange={(e) => setSkirtOption(e.target.value)}
              className="radio-input"
            />
            <span className="option-text">{t(option.labelKey)}</span>
          </label>
        ))}
      </div>
      <div className="actions">
        <button onClick={handleConfirm} disabled={!skirtOption} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default SkirtSelect
