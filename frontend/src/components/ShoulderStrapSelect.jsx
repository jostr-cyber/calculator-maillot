import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './ShoulderStrapSelect.css'

function ShoulderStrapSelect({ onConfirm, onBack }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState([])

  const options = [
    { value: 'decorated_shoulder', label: 'Погон, украшенный камнями и/или бахромой' },
    { value: 'wing', label: 'Крылышко' },
    { value: 'pendants', label: 'Подвесы (бретели, свисающие на предплечье)' },
    { value: 'none', label: 'Без декоративного элемента на плечо' }
  ]

  const handleToggle = (value) => {
    if (value === 'none') {
      // If clicking "none", clear all other selections
      if (selected.includes('none')) {
        setSelected([])
      } else {
        setSelected(['none'])
      }
    } else {
      // If clicking other options, remove "none" if present
      let newSelected = selected.filter(item => item !== 'none')

      if (newSelected.includes(value)) {
        newSelected = newSelected.filter(item => item !== value)
      } else {
        newSelected = [...newSelected, value]
      }

      setSelected(newSelected)
    }
  }

  const handleConfirm = () => {
    if (selected.length === 0) {
      onConfirm('none')
    } else {
      onConfirm(selected.join(','))
    }
  }

  return (
    <div className="select-wrapper">
      <h2>{t('additions.shoulder')}</h2>
      <div className="checkboxes-container">
        {options.map(opt => {
          // Determine if this checkbox should be disabled
          const isNone = opt.value === 'none'
          const hasNoneSelected = selected.includes('none')
          const isDisabled = (isNone && selected.length > 0 && !hasNoneSelected) ||
                            (!isNone && hasNoneSelected)

          return (
            <label key={opt.value} className={`checkbox-label ${isDisabled ? 'disabled' : ''}`}>
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => handleToggle(opt.value)}
                className="checkbox-input"
                disabled={isDisabled}
              />
              <span className="checkbox-text">{opt.label}</span>
            </label>
          )
        })}
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

export default ShoulderStrapSelect
