import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import ConfigurationSummary from './ConfigurationSummary'
import './BudgetSlider.css'

function BudgetSlider({ value, onBudgetChange, onContinue, onBack, config, currentPrice, complexity }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(value !== null && value !== '' ? value : 'undecided')

  // Budget values from 0 to 800+
  const budgetSteps = [
    { value: 0, label: '0' },
    { value: 200, label: '200' },
    { value: 250, label: '250' },
    { value: 300, label: '300' },
    { value: 350, label: '350' },
    { value: 400, label: '400' },
    { value: 450, label: '450' },
    { value: 500, label: '500' },
    { value: 550, label: '550' },
    { value: 600, label: '600' },
    { value: 650, label: '650' },
    { value: 700, label: '700' },
    { value: 750, label: '750' },
    { value: 800, label: '800' },
    { value: 'plus', label: '800+' }
  ]

  const handleSliderChange = (index) => {
    const newValue = budgetSteps[index].value
    setSelected(newValue)
    onBudgetChange(newValue)
  }

  const handleUndecided = () => {
    setSelected('undecided')
    onBudgetChange('undecided')
  }

  const handleContinue = () => {
    onBudgetChange(selected)
    onContinue()
  }

  // Find current index for slider
  const currentIndex = budgetSteps.findIndex(step => step.value === selected)
  const sliderValue = currentIndex >= 0 ? currentIndex : 0

  return (
    <div className="budget-slider">
      <h2>{t('steps.budget')}</h2>

      {config && currentPrice && complexity && (
        <ConfigurationSummary config={config} currentPrice={currentPrice} complexity={complexity} />
      )}

      <div className="slider-container">
        <div className="budget-display">
          {selected === 'undecided' ? t('budget.undecided') : `€${selected}+`}
        </div>
        <input
          type="range"
          min="0"
          max={budgetSteps.length - 1}
          value={sliderValue}
          onChange={(e) => handleSliderChange(parseInt(e.target.value))}
          className="slider"
        />
        <div className="slider-labels">
          <span>{budgetSteps[0].label}</span>
          <span>{budgetSteps[budgetSteps.length - 1].label}</span>
        </div>
      </div>

      <div className="budget-options">
        {budgetSteps.map((step, index) => (
          <button
            key={step.value}
            onClick={() => handleSliderChange(index)}
            className={`budget-option ${selected === step.value ? 'selected' : ''}`}
          >
            {step.label === '800+' ? '800+' : `€${step.label}`}
          </button>
        ))}
      </div>

      <button
        onClick={handleUndecided}
        className={`budget-undecided ${selected === 'undecided' ? 'selected' : ''}`}
      >
        {t('budget.undecided')}
      </button>

      <div className="actions">
        <button onClick={handleContinue} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default BudgetSlider
