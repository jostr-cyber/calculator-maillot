import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './BudgetSelector.css'

function BudgetSelector({ onSelect }) {
  const { t } = useTranslation()

  const budgets = [
    { value: 'around-800', titleKey: 'budget.around800.title', descKey: 'budget.around800.desc' },
    { value: 'around-400', titleKey: 'budget.around400.title', descKey: 'budget.around400.desc' },
    { value: 'under-250', titleKey: 'budget.under250.title', descKey: 'budget.under250.desc' },
    { value: 'unknown', titleKey: 'budget.unknown.title', descKey: 'budget.unknown.desc' }
  ]

  return (
    <div className="budget-selector">
      <h2>{t('steps.budget')}</h2>
      <p className="budget-note">{t('budget.note')}</p>
      <div className="budget-options">
        {budgets.map(budget => (
          <button
            key={budget.value}
            onClick={() => onSelect(budget.value)}
            className="budget-option"
          >
            <div className="budget-title">{t(budget.titleKey)}</div>
            <div className="budget-desc">{t(budget.descKey)}</div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default BudgetSelector
