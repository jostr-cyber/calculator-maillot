import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary, getProductionTime, getComplexityPercentage } from '../utilities/calculationUtils'
import './FinalResult.css'

function FinalResult({ priceResult, complexity, estimatedCrystals, config, wheelDiscount }) {
  const { t } = useTranslation()
  const summary = formatConfigurationSummary(config)
  const productionTime = getProductionTime(config.urgency)
  const complexityPercentage = getComplexityPercentage(complexity)

  const getDesignSourceLabel = () => {
    const designSourceMap = {
      'own-design': t('designSource.ownDesign.title'),
      'inspiration-photos': t('designSource.inspirationPhotos.title'),
      'custom-design': t('designSource.customDesign.title'),
      'our-design': t('designSource.ownDesign.title'),
      'customer-design': t('designSource.customDesign.title')
    }
    return designSourceMap[config.design] || config.design
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
        </div>

        {/* Complexity Section */}
        <div className="result-section complexity-section">
          <div className="complexity-display">
            <div className="complexity-info">
              <span className="complexity-title">{t('result.complexity') || 'Complexity level'}</span>
              <span className={`complexity-level complexity-${complexity.level.toLowerCase()}`}>
                {complexity.label}
              </span>
            </div>
            <div className="complexity-bar">
              <div className="complexity-scale">
                <span className="scale-label">Simple</span>
                <div className="scale-track">
                  <div
                    className={`scale-indicator complexity-${complexity.level.toLowerCase()}`}
                    style={{ width: `${complexityPercentage}%` }}
                  ></div>
                </div>
                <span className="scale-label">Luxury</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Details Section */}
        <div className="result-section details-section">
          <div className="details-grid">
            <div className="detail-item">
              <span className="detail-icon">⏱️</span>
              <div className="detail-content">
                <span className="detail-label">{t('result.productionTime') || 'Production time'}</span>
                <span className="detail-value">{productionTime}</span>
              </div>
            </div>
            <div className="detail-item">
              <span className="detail-icon">💎</span>
              <div className="detail-content">
                <span className="detail-label">{t('result.estimatedCrystals') || 'Estimated crystals'}</span>
                <span className="detail-value">~{estimatedCrystals.toLocaleString()} stones</span>
              </div>
            </div>
          </div>
        </div>

        {/* Design Source */}
        <div className="result-section design-source-section">
          <div className="source-item">
            <span className="source-label">{t('result.designSource') || 'Design source'}</span>
            <span className="source-value">{getDesignSourceLabel()}</span>
          </div>
        </div>

        {/* Configuration Summary */}
        <div className="result-section summary-section">
          <h3>{t('result.selectedOptions') || 'Selected options'}</h3>
          <div className="options-list">
            {summary.length > 0 ? (
              summary.map((item, index) => (
                <div key={index} className="option-item">
                  <span className="option-checkmark">✓</span>
                  <span className="option-name">{item}</span>
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

      {/* CTA Buttons */}
      <div className="result-actions">
        <button className="btn-primary btn-order">
          {t('buttons.orderWhatsApp') || 'Order a leotard!'}
        </button>
        <button className="btn-secondary btn-customize">
          {t('buttons.customizeAgain') || 'Customize again'}
        </button>
      </div>
    </div>
  )
}

export default FinalResult
