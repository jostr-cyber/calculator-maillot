import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './BudgetSelector.css'

function BudgetSelector({ onSelect }) {
  const { t } = useTranslation()

  const budgets = [
    { value: '800', price: '≈ 800€' },
    { value: '400', price: '≈ 400€' },
    { value: '200', price: '≈ 200€' }
  ]

  return (
    <div className="budget-selector">
      <h2>{t('steps.budget')}</h2>
      <div className="budget-options">
        {budgets.map(budget => (
          <button
            key={budget.value}
            onClick={() => onSelect(budget.value)}
            className="budget-option"
          >
            <div className="budget-label">{budget.price}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BudgetSelector
