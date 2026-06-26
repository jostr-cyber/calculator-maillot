import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './EmailIntro.css'

// Optional email capture step shown right before the calculator starts.
// If the visitor enters a valid email and continues, we'll mail the estimate
// to them once they reach the final price. If they skip, the calculator
// proceeds normally and we still offer a contact field at the end.
function EmailIntro({ value, onChange, onContinue, onSkip }) {
  const { t } = useTranslation()
  const [local, setLocal] = useState(value || '')
  const [touched, setTouched] = useState(false)

  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.trim())

  const handleSubmit = (e) => {
    e.preventDefault()
    setTouched(true)
    if (!isValid) return
    onChange(local.trim().toLowerCase())
    onContinue()
  }

  return (
    <div className="email-intro">
      <div className="email-intro-card">
        <div className="email-intro-icon">📧</div>
        <h2 className="email-intro-title">{t('result.emailIntro.title')}</h2>
        <p className="email-intro-subtitle">{t('result.emailIntro.subtitle')}</p>

        <form onSubmit={handleSubmit} className="email-intro-form">
          <input
            type="email"
            className={`email-intro-input ${touched && !isValid ? 'invalid' : ''}`}
            placeholder={t('result.emailIntro.placeholder')}
            value={local}
            onChange={(e) => setLocal(e.target.value)}
            onBlur={() => setTouched(true)}
            autoComplete="email"
            inputMode="email"
            autoFocus
          />
          {touched && local && !isValid && (
            <p className="email-intro-error">{t('result.emailIntro.invalid')}</p>
          )}

          <button type="submit" className="email-intro-continue" disabled={!isValid}>
            {t('result.emailIntro.continue')} →
          </button>

          <button type="button" className="email-intro-skip" onClick={onSkip}>
            {t('result.emailIntro.skip')}
          </button>
        </form>
      </div>
    </div>
  )
}

export default EmailIntro
