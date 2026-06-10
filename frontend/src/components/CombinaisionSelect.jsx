import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import DesignsPreview from './DesignsPreview'
import './SelectCommon.css'

function CombinaisionSelect({ onConfirm, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('')

  const options = [
    { value: 'standard', labelKey: 'combinaison.leotard' },
    { value: 'full', labelKey: 'combinaison.combinaison' }
  ]

  return (
    <div className="select-wrapper">
      <h2>{t('steps.combinaison')}</h2>
      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}
      {config && complexity && (
        <DesignsPreview config={config} complexity={complexity} />
      )}
      <div className="options-group">
        {options.map(opt => (
          <label key={opt.value} className="option-label">
            <input
              type="radio"
              name="combinaison"
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
        <button onClick={() => onConfirm(selected)} disabled={!selected} className="btn-primary">
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
