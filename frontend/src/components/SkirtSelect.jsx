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
      <div className="select-container">
        <select
          value={skirtOption}
          onChange={(e) => setSkirtOption(e.target.value)}
          className="select-field"
        >
          <option value="">{t('skirt.label')}</option>
          {skirtOptions.map(option => (
            <option key={option.value} value={option.value}>
              {t(option.labelKey)}
            </option>
          ))}
        </select>
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

export default SkirtSelect
