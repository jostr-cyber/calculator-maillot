import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './SelectCommon.css'
import './DeadlineSelect.css'

function DeadlineSelect({ onDeadlineChange, onBookSlot, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [type, setType] = useState('')
  const [date, setDate] = useState('')

  const today = new Date().toISOString().split('T')[0]

  const handleDateChange = (e) => {
    const value = e.target.value
    setType('date')
    setDate(value)
    if (onDeadlineChange) onDeadlineChange({ type: 'date', date: value })
  }

  const handleBookSlotClick = () => {
    setType('book_slot')
    setDate('')
    if (onDeadlineChange) onDeadlineChange({ type: 'book_slot', date: '' })
    if (onBookSlot) onBookSlot()
    if (onContinue) onContinue()
  }

  const handleUnknownClick = () => {
    setType('unknown')
    setDate('')
    if (onDeadlineChange) onDeadlineChange({ type: 'unknown', date: '' })
  }

  const canContinue = type === 'date' ? Boolean(date) : type === 'unknown'

  return (
    <div className="select-wrapper">
      <h2>{t('deadline.title')}</h2>

      <div className="options-group deadline-options">
        <label className={`option-label deadline-date-option ${type === 'date' ? 'deadline-option-active' : ''}`}>
          <input
            type="radio"
            name="deadline"
            className="radio-input"
            checked={type === 'date'}
            readOnly
          />
          <div className="deadline-date-content">
            <span className="option-text">{t('deadline.byDate')}</span>
            <input
              type="date"
              className="deadline-date-input"
              value={date}
              min={today}
              onChange={handleDateChange}
            />
          </div>
        </label>

        <button
          type="button"
          className={`option-label deadline-action-btn ${type === 'book_slot' ? 'deadline-option-active' : ''}`}
          onClick={handleBookSlotClick}
        >
          <span className="option-text">{t('deadline.bookSlot')}</span>
        </button>

        <button
          type="button"
          className={`option-label deadline-action-btn ${type === 'unknown' ? 'deadline-option-active' : ''}`}
          onClick={handleUnknownClick}
        >
          <span className="option-text">{t('deadline.unknown')}</span>
        </button>
      </div>

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      <div className="actions">
        <button onClick={onContinue} className="btn-primary" disabled={!canContinue}>{t('buttons.continue')}</button>
        <button onClick={onBack} className="btn-secondary">{t('buttons.back')}</button>
      </div>
    </div>
  )
}

export default DeadlineSelect
