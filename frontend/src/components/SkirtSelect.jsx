import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import DesignsPreview from './DesignsPreview'
import './SkirtSelect.css'

function SkirtSelect({ onConfirm, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [skirtOption, setSkirtOption] = useState('')

  const skirtOptions = [
    {
      value: 'none',
      icon: '👗',
      labelKey: 'skirt.none',
      descKey: 'skirt.noneDesc'
    },
    {
      value: 'front',
      icon: '🎀',
      labelKey: 'skirt.front',
      descKey: 'skirt.frontDesc'
    },
    {
      value: 'back',
      icon: '💃',
      labelKey: 'skirt.back',
      descKey: 'skirt.backDesc'
    },
    {
      value: 'both',
      icon: '✨',
      labelKey: 'skirt.both',
      descKey: 'skirt.bothDesc'
    }
  ]

  const handleConfirm = () => {
    onConfirm(skirtOption || 'none')
  }

  return (
    <div className="skirt-select">
      <h2>{t('steps.skirt')}</h2>

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      {config && complexity && (
        <DesignsPreview config={config} complexity={complexity} />
      )}

      <div className="skirt-grid">
        {skirtOptions.map(option => (
          <label
            key={option.value}
            className={`skirt-card ${skirtOption === option.value ? 'selected' : ''}`}
          >
            <input
              type="radio"
              name="skirt"
              value={option.value}
              checked={skirtOption === option.value}
              onChange={(e) => setSkirtOption(e.target.value)}
              className="radio-input"
            />
            <div className="skirt-card-content">
              <div className="skirt-icon">{option.icon}</div>
              <div className="skirt-label">{t(option.labelKey)}</div>
              <div className="skirt-desc">{t(option.descKey)}</div>
            </div>
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

export default SkirtSelect
