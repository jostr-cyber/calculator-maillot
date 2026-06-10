import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary, getProductionTime, getComplexityPercentage, generateRecommendation, generateWhatWeWouldChange, calculateValueForMoney, getMatchingSimilarDesigns } from '../utilities/calculationUtils'
import './FinalResult.css'

function FinalResult({ priceResult, complexity, estimatedCrystals, config, wheelDiscount, selectedBudget, onCustomizeAgain, onReducePrice }) {
  const { t } = useTranslation()
  const [galleryExpanded, setGalleryExpanded] = useState(false)
  const summary = formatConfigurationSummary(config)
  const productionTime = getProductionTime(config.urgency)
  const complexityPercentage = getComplexityPercentage(complexity)
  const recommendation = generateRecommendation(config, complexity)
  const whatWeWouldChange = generateWhatWeWouldChange(config, priceResult.finalPrice)
  const valueForMoney = calculateValueForMoney(config, priceResult.finalPrice, complexity)
  const similarDesigns = getMatchingSimilarDesigns(config, complexity)

  const BUDGET_LIMITS = {
    'under-250': 250,
    'around-400': 400,
    'around-800': 800,
    'unknown': null
  }

  const getDesignSourceLabel = () => {
    const designSourceMap = {
      'own-design': t('designSource.ownDesign.title'),
      'inspiration-photos': t('designSource.inspirationPhotos.title'),
      'custom-design': t('designSource.customDesign.title'),
      'our-design': t('designSource.ownDesign.title') || t('design.our.title'),
      'customer-design': t('designSource.customDesign.title')
    }
    return designSourceMap[config.designSource] || designSourceMap[config.design] || config.design
  }

  const getBudgetComparison = () => {
    if (!selectedBudget || selectedBudget === 'unknown') {
      return null
    }

    const budgetLimit = BUDGET_LIMITS[selectedBudget]
    if (!budgetLimit) return null

    const difference = priceResult.finalPrice - budgetLimit
    if (difference > 0) {
      return {
        status: 'above',
        amount: Math.round(difference),
        label: t('result.budgetAbove', { amount: Math.round(difference) }) || `${Math.round(difference)} EUR above budget`
      }
    } else if (difference < 0) {
      return {
        status: 'below',
        amount: Math.round(Math.abs(difference)),
        label: t('result.budgetBelow') || 'Below your budget'
      }
    }
    return null
  }

  const budgetComparison = getBudgetComparison()

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
        </div>

        {/* Budget Comparison Section */}
        {budgetComparison && (
          <div className={`result-section budget-comparison-section budget-${budgetComparison.status}`}>
            <div className="budget-item">
              <span className="budget-label">{t('result.budgetComparison') || 'Budget comparison'}</span>
              <span className="budget-value">{budgetComparison.label}</span>
            </div>
          </div>
        )}

        {/* Complexity Section */}
        <div className="result-section complexity-section">
          <div className="complexity-display">
            <div className="complexity-info">
              <span className="complexity-title">{t('result.complexity') || 'Complexity level'}</span>
              <span className={`complexity-level complexity-${complexity.level.toLowerCase()}`}>
                {t(complexity.labelKey) || complexity.level}
              </span>
            </div>
            <div className="complexity-bar">
              <div className="complexity-scale">
                <span className="scale-label">{t('complexity.simple') || 'Simple'}</span>
                <div className="scale-track">
                  <div
                    className={`scale-indicator complexity-${complexity.level.toLowerCase()}`}
                    style={{ width: `${complexityPercentage}%` }}
                  ></div>
                </div>
                <span className="scale-label">{t('complexity.luxury') || 'Luxury'}</span>
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
                <span className="detail-value">{t(productionTime) || productionTime}</span>
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

        {/* Recommendation Section */}
        <div className="result-section recommendation-section">
          <div className="recommendation-content">
            <h3>{t('result.recommendation') || 'Our recommendation'}</h3>
            <p className="recommendation-text">
              {typeof recommendation === 'string' && recommendation.includes('This')
                ? '💡 Наша профессиональная рекомендация основана на вашем выборе параметров и сложности дизайна.'
                : recommendation}
            </p>
          </div>
        </div>

        {/* What Would We Change Section */}
        <div className="result-section what-we-would-change-section">
          <div className="change-content">
            <h3>{t('result.whatWeWouldChange') || 'What would we change?'}</h3>
            <p className="change-text">
              💡 {whatWeWouldChange.key && whatWeWouldChange.savings > 0
                ? t(`result.whatWeWouldChangeOptions.${whatWeWouldChange.key}`, { savings: whatWeWouldChange.savings })
                : whatWeWouldChange.key && whatWeWouldChange.increase > 0
                ? t(`result.whatWeWouldChangeOptions.${whatWeWouldChange.key}`, { increase: whatWeWouldChange.increase })
                : t(`result.whatWeWouldChangeOptions.${whatWeWouldChange.key}`)
              }
            </p>
          </div>
        </div>

        {/* Value for Money Section */}
        <div className="result-section value-for-money-section">
          <div className="value-content">
            <div className="value-header">
              <span className="value-title">{t('result.valueForMoney') || 'Value for money'}</span>
              <span className="value-rating">{t(`result.valueRatings.${valueForMoney.labelKey}`)}</span>
            </div>
            <p className="value-description">{t(`result.valueRatings.${valueForMoney.descriptionKey}`)}</p>
          </div>
        </div>

        {/* Similar Designs Gallery Section */}
        <div className="result-section similar-designs-section">
          <div className="gallery-header">
            <h3>{t('result.similarDesigns') || 'Similar designs'}</h3>
            <button
              className="gallery-toggle-btn"
              onClick={() => setGalleryExpanded(!galleryExpanded)}
            >
              {galleryExpanded
                ? (t('buttons.hideExamples') || '▼ Hide examples')
                : (t('buttons.showExamples') || '▶ Show examples')}
            </button>
          </div>

          <div className={`gallery-container ${galleryExpanded ? 'expanded' : 'preview'}`}>
            <div className="gallery-grid">
              {similarDesigns.designs.slice(0, galleryExpanded ? 9 : 3).map((designId, idx) => (
                <div key={idx} className="gallery-item">
                  <div className="gallery-image-placeholder">
                    <span>🎭</span>
                    <small>{designId}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <p className="gallery-note">{t('result.gallerySimilarityNote') || 'Images show designs with similar complexity and style'}</p>
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
