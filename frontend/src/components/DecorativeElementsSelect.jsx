import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import DesignsPreview from './DesignsPreview'
import './DecorativeElementsSelect.css'

function DecorativeElementsSelect({ onConfirm, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState([])

  const options = [
    { value: 'feathers', labelKey: 'decorativeElements.feathers' },
    { value: 'fringe', labelKey: 'decorativeElements.fringe' },
    { value: 'flowers', labelKey: 'decorativeElements.flowers' },
    { value: 'other', labelKey: 'decorativeElements.other' },
    { value: 'nothing', labelKey: 'decorativeElements.nothing' }
  ]

  const handleToggle = (value) => {
    if (value === 'nothing') {
      // If clicking "nothing", clear all other selections
      if (selected.includes('nothing')) {
        setSelected([])
      } else {
        setSelected(['nothing'])
      }
    } else {
      // If clicking other options, remove "nothing" if present
      let newSelected = selected.filter(item => item !== 'nothing')

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
      <h2>{t('steps.decorativeElements')}</h2>
      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}
      {config && complexity && (
        <DesignsPreview config={config} complexity={complexity} />
      )}
      <div className="options-group">
        {options.map(opt => {
          // Determine if this checkbox should be disabled
          const isNothing = opt.value === 'nothing'
          const hasNothingSelected = selected.includes('nothing')
          const isDisabled = (isNothing && selected.length > 0 && !hasNothingSelected) ||
                            (!isNothing && hasNothingSelected)

          return (
            <label key={opt.value} className={`option-label ${isDisabled ? 'disabled' : ''}`}>
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={() => handleToggle(opt.value)}
                className="checkbox-input"
                disabled={isDisabled}
              />
              <span className="option-text">{t(opt.labelKey)}</span>
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

export default DecorativeElementsSelect
