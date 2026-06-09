import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './DetailsInput.css'

function DetailsInput({ value, onChange }) {
  const { t } = useTranslation()

  return (
    <div className="details-input">
      <h2>{t('details.label')}</h2>
      <p className="details-hint">{t('details.placeholder')}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={t('details.placeholder')}
        className="textarea"
        rows="4"
      />
    </div>
  )
}

export default DetailsInput
