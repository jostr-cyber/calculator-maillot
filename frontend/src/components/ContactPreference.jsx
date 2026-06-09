import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './ContactPreference.css'

function ContactPreference({ onContinue, onBack }) {
  const { t } = useTranslation()
  const [selectedMethod, setSelectedMethod] = useState('')
  const [contactValue, setContactValue] = useState('')
  const [error, setError] = useState('')

  const methods = [
    { value: 'telegram', labelKey: 'contactPreference.telegram' },
    { value: 'whatsapp', labelKey: 'contactPreference.whatsapp' },
    { value: 'viber', labelKey: 'contactPreference.viber' },
    { value: 'other', labelKey: 'contactPreference.other' }
  ]

  const getPlaceholder = (method) => {
    const placeholders = t('contactPreference.placeholders')
    return placeholders[method] || ''
  }

  const handleContinue = () => {
    if (!selectedMethod) {
      setError(t('contactPreference.required'))
      return
    }
    if (!contactValue.trim()) {
      setError(t('contactPreference.required'))
      return
    }
    setError('')
    onContinue({
      method: selectedMethod,
      value: contactValue
    })
  }

  return (
    <div className="contact-preference-wrapper">
      <h2>{t('contactPreference.title')}</h2>
      <p className="contact-preference-description">
        {t('contactPreference.description')}
      </p>

      <div className="methods-container">
        {methods.map(method => (
          <div
            key={method.value}
            className={`method-option ${selectedMethod === method.value ? 'selected' : ''}`}
            onClick={() => {
              setSelectedMethod(method.value)
              setError('')
            }}
          >
            <input
              type="radio"
              name="contact-method"
              value={method.value}
              checked={selectedMethod === method.value}
              onChange={(e) => {
                setSelectedMethod(e.target.value)
                setError('')
              }}
              className="radio-input"
            />
            <label className="radio-label">
              {t(method.labelKey)}
            </label>
          </div>
        ))}
      </div>

      {selectedMethod && (
        <div className="input-section">
          <input
            type="text"
            value={contactValue}
            onChange={(e) => {
              setContactValue(e.target.value)
              setError('')
            }}
            placeholder={getPlaceholder(selectedMethod)}
            className="contact-input"
          />
        </div>
      )}

      {error && <p className="error-message">{error}</p>}

      <div className="actions">
        <button onClick={handleContinue} className="btn-primary">
          {t('buttons.finish')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default ContactPreference
