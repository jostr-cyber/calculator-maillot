import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './PriceBreakdown.css'

function PriceBreakdown({ data, wheelDiscount = 0 }) {
  const { t } = useTranslation()
  if (!data) return null

  const discountAmount = Math.round(data.finalPrice * wheelDiscount / 100)
  const finalPriceAfterDiscount = data.finalPrice - discountAmount

  // Helper functions for display labels
  const getSkirtLabel = () => {
    switch (data.skirtType) {
      case 'front':
        return t('priceBreakdown.breakdown.skirtFront')
      case 'back':
        return t('priceBreakdown.breakdown.skirtBack')
      case 'front_and_back':
        return t('priceBreakdown.breakdown.skirtBoth')
      default:
        return t('skirt.label')
    }
  }

  const getDecorativeLabel = () => {
    return data.decorativeElementsPrice > 0 ? t('priceBreakdown.breakdown.decorativeElements') : t('priceBreakdown.breakdown.noDecorative')
  }

  const getModelLabel = () => {
    switch (data.modelType) {
      case 'standard':
        return t('combinaison.leotard')
      case 'straps':
        return t('priceBreakdown.breakdown.withStraps')
      case 'combinaison':
        return t('combinaison.combinaison')
      case 'combinaison_straps':
        return `${t('combinaison.combinaison')} ${t('priceBreakdown.breakdown.withStraps').toLowerCase()}`
      default:
        return t('combinaison.leotard')
    }
  }

  const getStonesLabel = () => {
    if (data.stonesType === 'standard' || !data.stonesType) {
      return t('premiumStones.none')
    }
    // For premium stones, extract a short description
    if (data.stonesType.startsWith('premium-small-')) {
      const qty = data.stonesType.replace('premium-small-', '')
      return `Премиум (мелкие камни ${qty} шт)`
    }
    if (data.stonesType === 'premium-medium') {
      return 'Премиум (средние камни)'
    }
    if (data.stonesType.startsWith('premium-sew-')) {
      const qty = data.stonesType.replace('premium-sew-', '')
      return `Премиум (пришивные ${qty} шт)`
    }
    if (data.stonesType === 'premium-mixed') {
      return 'Премиум (микс)'
    }
    return t('premiumStones.none')
  }

  const getPremiumStonesLabel = () => {
    if (!data.premiumStonesArray || data.premiumStonesArray.length === 0) {
      return ''
    }

    const type = data.premiumStonesArray[0] // Usually one premium type

    if (type.startsWith('premium-small-')) {
      const qty = type.replace('premium-small-', '')
      return `Мелкие (${qty} шт)`
    }
    if (type === 'premium-medium') {
      return 'Средние камни'
    }
    if (type.startsWith('premium-sew-')) {
      const qty = type.replace('premium-sew-', '')
      return `Пришивные (${qty} шт)`
    }
    if (type === 'premium-mixed') {
      return 'Микс'
    }
    return t('premiumStones.premium')
  }

  const getUrgencyLabel = () => {
    switch (data.urgencyType) {
      case 'accelerated':
        return t('urgency.expedited.title')
      case 'urgent':
        return t('priceBreakdown.breakdown.urgent')
      default:
        return t('urgency.standard.title')
    }
  }

  const getSkirtPrice = () => {
    if (data.skirtType === 'front_and_back') {
      return data.skirtFrontPrice
    }
    return data.skirtFrontPrice + data.skirtBackPrice
  }

  const skirtPrice = getSkirtPrice()

  return (
    <div className="price-breakdown">
      <h2>{t('priceBreakdown.completed')}</h2>

      <div className="price-summary">
        <div className="final-price">
          {wheelDiscount > 0 ? finalPriceAfterDiscount : data.finalPrice}
          <span className="currency">{data.currency}</span>
        </div>
      </div>
    </div>
  )
}

export default PriceBreakdown
