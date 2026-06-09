import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './EmailConfirmation.css'

function EmailConfirmation({ email, onEmailChange, onContinue }) {
  const { t } = useTranslation()
  const [showInput, setShowInput] = useState(false)
  const [tempEmail, setTempEmail] = useState(email)
  const [emailError, setEmailError] = useState('')

  const validateEmail = (emailStr) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailStr)
  }

  const handleEmailChange = () => {
    if (!tempEmail.trim()) {
      setEmailError(t('emailConfirmation.invalidEmail'))
      return
    }
    if (!validateEmail(tempEmail)) {
      setEmailError(t('emailConfirmation.invalidEmail'))
      return
    }
    setEmailError('')
    onEmailChange(tempEmail)
    setShowInput(false)
  }

  const handleContinue = () => {
    if (!email || !validateEmail(email)) {
      setEmailError(t('emailConfirmation.invalidEmail'))
      return
    }
    setEmailError('')
    onContinue()
  }

  return (
    <div className="email-confirmation-wrapper">
      <h2>{t('emailConfirmation.title')}</h2>
      <p className="email-confirmation-description">
        {t('emailConfirmation.description')}
      </p>

      {showInput ? (
        <div className="email-input-section">
          <input
            type="email"
            value={tempEmail}
            onChange={(e) => {
              setTempEmail(e.target.value)
              setEmailError('')
            }}
            placeholder={t('emailConfirmation.placeholder')}
            className="email-input"
          />
          {emailError && <p className="email-error">{emailError}</p>}
          <div className="email-input-actions">
            <button
              onClick={handleEmailChange}
              className="btn-primary"
            >
              {t('buttons.save')}
            </button>
            <button
              onClick={() => {
                setShowInput(false)
                setTempEmail(email)
                setEmailError('')
              }}
              className="btn-secondary"
            >
              {t('buttons.back')}
            </button>
          </div>
        </div>
      ) : (
        <div className="email-display-section">
          <p className="email-display">
            <strong>{t('survey.email.question')}:</strong> {email || 'Not provided'}
          </p>
          <button
            onClick={() => setShowInput(true)}
            className="btn-secondary"
          >
            {t('emailConfirmation.changeEmail')}
          </button>
        </div>
      )}

      <div className="actions">
        <button onClick={handleContinue} className="btn-primary">
          {t('buttons.next')}
        </button>
      </div>
    </div>
  )
}

export default EmailConfirmation
