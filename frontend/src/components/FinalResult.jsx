import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary } from '../utilities/calculationUtils'
import './FinalResult.css'

function FinalResult({ priceResult, complexity, estimatedCrystals, config, wheelDiscount, selectedBudget, onCustomizeAgain, onReducePrice }) {
  const { t } = useTranslation()
  const summary = formatConfigurationSummary(config)


  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hello! I want to order a leotard with the following configuration:\n\nPrice: €${priceResult.finalPrice}\n\nPlease help me with the next steps.`)
    window.open(`https://wa.me/34670770024?text=${text}`, '_blank')
  }

  const handleSendPhotos = () => {
    const text = encodeURIComponent(`Hello! I have inspiration photos for a leotard I'd like to order. Please let me know how I can send them to you.`)
    window.open(`https://wa.me/34670770024?text=${text}`, '_blank')
  }

  const handleDiscussDetails = () => {
    const text = encodeURIComponent(`Hello! I'd like to discuss the details of my leotard configuration. My estimated price is €${priceResult.finalPrice}.`)
    window.open(`https://wa.me/34670770024?text=${text}`, '_blank')
  }

  return (
    <div className="final-result">
      <div className="result-header">
        <h2>{t('result.title') || 'Your Custom Leotard'}</h2>
        <p className="result-subtitle">{t('result.subtitle') || 'Ready to order?'}</p>
      </div>

      <div className="result-content">
        {/* Price Section */}
        <div className="result-section price-section">
          <div className="price-main">
            <span className="price-label">{t('result.estimatedPrice') || 'Estimated price'}</span>
            <span className="price-amount">{priceResult.finalPrice} €</span>
          </div>
          <p className="price-disclaimer">
            {t('priceBreakdown.disclaimer') || '*This is a preliminary calculation. Final price may be clarified after discussing details.'}
          </p>
        </div>

        {/* Configuration Summary */}
        <div className="result-section summary-section">
          <h3>{t('result.selectedOptions') || 'Selected options'}</h3>
          <div className="options-list">
            {summary.length > 0 ? (
              summary.map((item, index) => (
                <div key={index} className="option-item">
                  <span className="option-checkmark">✓</span>
                  <span className="option-name">{typeof item === 'string' ? item : t(item.key)}</span>
                </div>
              ))
            ) : (
              <div className="option-item empty">
                <span>{t('result.noOptions') || 'No extra options selected'}</span>
              </div>
            )}
          </div>
        </div>

        {/* Discount Info */}
        {wheelDiscount > 0 && (
          <div className="result-section discount-section">
            <div className="discount-banner">
              <span className="discount-icon">🎉</span>
              <span className="discount-text">
                {t('result.discountApplied') || 'Discount applied'}: -{wheelDiscount}%
              </span>
            </div>
          </div>
        )}
      </div>

      {/* CTA Buttons - Multi-action */}
      <div className="result-actions">
        <button className="btn-primary btn-action" onClick={handleWhatsAppOrder}>
          {t('actionButtons.order') || '💚 Order this leotard'}
        </button>
        <button className="btn-secondary btn-action" onClick={handleSendPhotos}>
          {t('actionButtons.sendPhotos') || '📸 Send inspiration photos'}
        </button>
        <button className="btn-secondary btn-action" onClick={handleDiscussDetails}>
          {t('actionButtons.discuss') || '💬 Discuss on WhatsApp'}
        </button>
        <button className="btn-secondary btn-action" onClick={onCustomizeAgain}>
          {t('actionButtons.customize') || '🎨 Customize again'}
        </button>
        <button className="btn-secondary btn-action" onClick={onReducePrice}>
          {t('actionButtons.reducePrice.label') || '💰 Reduce the price'}
        </button>
      </div>
    </div>
  )
}

export default FinalResult
