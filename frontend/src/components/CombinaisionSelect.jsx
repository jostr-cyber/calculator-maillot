import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './SelectCommon.css'

function CombinaisionSelect({ onConfirm, onBack }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('')

  const options = [
    { value: 'standard', labelKey: 'combinaison.leotard' },
    { value: 'full', labelKey: 'combinaison.combinaison' }
  ]

  return (
    <div className="select-wrapper">
      <h2>{t('steps.combinaison')}</h2>
      <div className="select-container">
        <select
          value={selected}
          onChange={(e) => setSelected(e.target.value)}
          className="select-field"
        >
          <option value="">{t('combinaison.label')}</option>
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>{t(opt.labelKey)}</option>
          ))}
        </select>
      </div>
      <div className="actions">
        <button onClick={() => onConfirm(selected)} className="btn-primary">
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
