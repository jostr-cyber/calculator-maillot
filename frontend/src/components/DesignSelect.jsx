import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './SelectCommon.css'
import './DesignSelect.css'

function DesignSelect({ onConfirm, onBack }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('our-design')

  return (
    <div className="select-wrapper">
      <h2>{t('steps.design')}</h2>

      <div className="design-container">
        <label className="design-option">
          <input
            type="radio"
            name="design"
            value="our-design"
            checked={selected === 'our-design'}
            onChange={() => setSelected('our-design')}
          />
          <div className="design-content">
            <span className="design-title">{t('design.our.title')}</span>
            <span className="design-description">{t('design.our.description')}</span>
            <span className="design-description">{t('design.artist.description')}</span>
            <span className="design-description">{t('design.requirements.description')}</span>
            <span className="design-discount">{t('design.basePrice')}</span>
          </div>
        </label>

        <label className="design-option">
          <input
            type="radio"
            name="design"
            value="customer-design"
            checked={selected === 'customer-design'}
            onChange={() => setSelected('customer-design')}
          />
          <div className="design-content">
            <span className="design-title">{t('design.your.title')}</span>
            <span className="design-description">{t('design.your.ai')}</span>
            <span className="design-description">{t('design.your.photo')}</span>
            <span className="design-description">{t('design.your.copy')}</span>
            <span className="design-discount">{t('design.your.discount')}</span>
          </div>
        </label>
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

export default DesignSelect
