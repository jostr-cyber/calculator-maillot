import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './DesignSourceSelect.css'

function DesignSourceSelect({ onConfirm, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('')

  const options = [
    {
      value: 'own-design',
      titleKey: 'designSource.ownDesign.title',
      descKey: 'designSource.ownDesign.desc',
      discountKey: 'designSource.ownDesign.discount',
      image: '/images/design-done.PNG'
    },
    {
      value: 'inspiration-photos',
      titleKey: 'designSource.inspirationPhotos.title',
      descKey: 'designSource.inspirationPhotos.desc',
      discountKey: 'designSource.inspirationPhotos.discount',
      image: '/images/design-reference.PNG'
    },
    {
      value: 'custom-design',
      titleKey: 'designSource.customDesign.title',
      descKey: 'designSource.customDesign.desc',
      discountKey: 'designSource.customDesign.discount',
      image: '/images/design-artist.PNG'
    }
  ]

  const handleConfirm = () => {
    if (selected) {
      onConfirm(selected)
    }
  }

  return (
    <div className="select-wrapper">
      <h2>{t('steps.designSource')}</h2>

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      <div className="design-options-group">
        {options.map(opt => (
          <label key={opt.value} className={`design-option ${selected === opt.value ? 'selected' : ''}`}>
            <input
              type="radio"
              name="designSource"
              value={opt.value}
              checked={selected === opt.value}
              onChange={(e) => setSelected(e.target.value)}
              className="radio-input"
            />
            <div className="design-option-content">
              <img src={opt.image} alt={t(opt.titleKey)} className="design-option-image" />
              <div className="design-option-text">
                <div className="design-option-title">{t(opt.titleKey)}</div>
                <div className="design-option-desc">{t(opt.descKey)}</div>
                <div className="design-option-discount">{t(opt.discountKey)}</div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="actions">
        <button onClick={handleConfirm} disabled={!selected} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default DesignSourceSelect
