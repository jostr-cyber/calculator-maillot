import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './SelectCommon.css'
import './PremiumStonesSelect.css'

function PremiumStonesSelect({ level, onConfirm, onBack }) {
  const { t } = useTranslation()
  // Track selected stones (can select multiple)
  const [selected, setSelected] = useState([])

  // Price mapping for each stone option by level (Elite, Standard, Economy)
  const stonePrices = {
    'standard': { 'Elite': 0, 'Standard': 0, 'Economy': 0 },
    'premium-small-100': { 'Elite': 100, 'Standard': 100, 'Economy': 50 },
    'premium-small-200': { 'Elite': 150, 'Standard': 150, 'Economy': 100 },
    'premium-small-300': { 'Elite': 200, 'Standard': 200, 'Economy': 150 },
    'premium-medium': { 'Elite': 50, 'Standard': 50, 'Economy': 50 },
    'premium-sew-10': { 'Elite': 50, 'Standard': 50, 'Economy': 50 },
    'premium-sew-20': { 'Elite': 100, 'Standard': 100, 'Economy': 100 },
    'premium-sew-30': { 'Elite': 150, 'Standard': 150, 'Economy': 150 },
    'premium-mixed': { 'Elite': 100, 'Standard': 100, 'Economy': 100 }
  }

  // Build stone options with prices
  const buildStoneOptions = () => {
    const baseOptions = [
      { value: 'standard', baseName: 'Стандартные стразы (Азия, Китай), входящие в базовую стоимость (~3000 шт.)' },
      { value: 'premium-small-100', baseName: 'Премиум стразы ss10-ss20 - 100 штук' },
      { value: 'premium-small-200', baseName: 'Премиум стразы ss10-ss20 - 200 штук' },
      { value: 'premium-small-300', baseName: 'Премиум стразы ss10-ss20 - 300 штук' },
      { value: 'premium-medium', baseName: 'Премиум стразы средние (ss30-ss40) на весь купальник' },
      { value: 'premium-sew-10', baseName: 'Пришивные Премиум стразы - 10 штук' },
      { value: 'premium-sew-20', baseName: 'Пришивные Премиум стразы - 20 штук' },
      { value: 'premium-sew-30', baseName: 'Пришивные Премиум стразы - 30 штук' },
      { value: 'premium-mixed', baseName: 'Премиум стразы микс ss10-ss34 + пришивные' }
    ]

    return baseOptions.map(option => {
      const price = stonePrices[option.value][level] || 0
      const priceLabel = price > 0 ? ` (+${price}€)` : ''
      return {
        value: option.value,
        label: `${option.baseName}${priceLabel}`
      }
    })
  }

  const stoneOptions = buildStoneOptions()

  const toggleSelection = (value) => {
    setSelected(prev =>
      prev.includes(value)
        ? prev.filter(item => item !== value)
        : [...prev, value]
    )
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
      <h2>{t('premiumStones.swarovski')}</h2>
      <p className="stones-description">
        {t('additions.warning')}
      </p>

      <div className="stones-options">
        {stoneOptions.map(option => (
          <label key={option.value} className={`checkbox-label ${selected.includes(option.value) ? 'selected' : ''}`}>
            <input
              type="checkbox"
              value={option.value}
              checked={selected.includes(option.value)}
              onChange={() => toggleSelection(option.value)}
            />
            <span className="checkbox-text">{option.label}</span>
          </label>
        ))}
      </div>

      <div className="actions">
        <button
          onClick={handleConfirm}
          className="btn-primary"
        >
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default PremiumStonesSelect
