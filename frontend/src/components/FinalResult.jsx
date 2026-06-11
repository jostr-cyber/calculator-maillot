import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary } from '../utilities/calculationUtils'
import './FinalResult.css'

function FinalResult({ priceResult, complexity, estimatedCrystals, config, wheelDiscount, selectedBudget, onCustomizeAgain, onReducePrice }) {
  const { t } = useTranslation()
  const [showReducePriceModal, setShowReducePriceModal] = useState(false)
  const summary = formatConfigurationSummary(config)

  // Budget limits for comparison
  const BUDGET_LIMITS = {
    'under-250': 250,
    'around-400': 400,
    'around-800': 800,
    'unknown': null
  }

  // Calculate budget excess
  const getBudgetExcess = () => {
    if (!selectedBudget || selectedBudget === 'unknown' || !BUDGET_LIMITS[selectedBudget]) {
      return null
    }
    const budgetLimit = BUDGET_LIMITS[selectedBudget]
    const excess = priceResult.finalPrice - budgetLimit
    return excess > 0 ? Math.round(excess) : null
  }

  // Generate price reduction recommendations
  const generatePriceReductions = () => {
    const recommendations = []

    // Priority 1: Rhinestones
    if (config.rhinestone && config.rhinestone !== 'none') {
      const rhinestoneMap = {
        'premium': { savings: 200, labelKey: 'priceReduction.recommendations.rhinestoneMaximum' },
        'maximum': { savings: 120, labelKey: 'priceReduction.recommendations.rhinestoneStandard' },
        'standard': { savings: 70, labelKey: 'priceReduction.recommendations.rhinestoneMinimal' },
        'minimal': { savings: 30, labelKey: 'priceReduction.recommendations.rhinestoneRemoveAll' }
      }
      if (rhinestoneMap[config.rhinestone]) {
        recommendations.push({
          priority: 1,
          param: 'rhinestone',
          ...rhinestoneMap[config.rhinestone]
        })
      }
    }

    // Priority 2: Urgency (accelerated to standard)
    if (config.urgency && config.urgency === 'accelerated') {
      recommendations.push({
        priority: 2,
        param: 'urgency',
        savings: Math.round(priceResult.finalPrice * 0.1), // 10% surcharge
        labelKey: 'priceReduction.recommendations.urgencyStandard'
      })
    }

    // Priority 3: Decorative elements
    if (config.decorativeElements && config.decorativeElements !== 'none' && config.decorativeElements !== '') {
      const elements = config.decorativeElements.split(',').filter(e => e.trim());
      let savings = 0;
      elements.forEach(el => {
        const e = el.trim();
        if (e === 'feathers') savings += 10;
        else if (e === 'fringe') savings += 20;
        else if (e === 'flowers') savings += 10;
        else if (e === 'other') savings += 15;
      });
      if (savings > 0) {
        recommendations.push({
          priority: 3,
          param: 'decorativeElements',
          savings: savings,
          labelKey: 'priceReduction.recommendations.decorativeElements'
        })
      }
    }

    // Priority 4: Aerography
    if (config.aerography && config.aerography !== 'nothing' && config.aerography !== '') {
      recommendations.push({
        priority: 4,
        param: 'aerography',
        savings: 20,
        labelKey: 'priceReduction.recommendations.aerography'
      })
    }

    // Don't recommend changing combinaison - if they selected it, they need it
    // Don't recommend changing design - it's part of their creative vision
    // Don't recommend changing skirt/sleeves - they're structural choices

    return recommendations.sort((a, b) => a.priority - b.priority)
  }

  const budgetExcess = getBudgetExcess()
  const priceReductions = generatePriceReductions()

  const handleReducePrice = () => {
    setShowReducePriceModal(true)
  }

  const closeReducePriceModal = () => {
    setShowReducePriceModal(false)
  }


  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(`Hello! I want to order a leotard with the following configuration:\n\nPrice: €${priceResult.finalPrice}\n\nPlease help me with the next steps.`)
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
        <button className="btn-secondary btn-action" onClick={handleDiscussDetails}>
          {t('actionButtons.discuss') || '💬 Discuss on WhatsApp'}
        </button>
        <button className="btn-secondary btn-action" onClick={handleReducePrice}>
          {t('actionButtons.reducePrice.label') || '💰 Reduce the price'}
        </button>
        <button className="btn-secondary btn-action" onClick={onCustomizeAgain}>
          {t('actionButtons.customize') || '🎨 Customize again'}
        </button>
      </div>

      {/* Reduce Price Modal */}
      {showReducePriceModal && (
        <div className="reduce-price-modal-overlay" onClick={closeReducePriceModal}>
          <div className="reduce-price-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeReducePriceModal}>✕</button>

            <h3>{t('priceReduction.title') || 'Ways to reduce the price'}</h3>

            {budgetExcess ? (
              <div className="budget-excess-info">
                <p>{t('priceReduction.exceedInfo') || 'Your desired budget exceeded by'} <strong>{budgetExcess} €</strong></p>
                <p className="budget-excess-recommendation">
                  {t('priceReduction.recommendation') || 'To reduce the cost of the leotard, we recommend changing some of your selected parameters:'}
                </p>
              </div>
            ) : (
              <div className="no-budget-info">
                <p>{t('priceReduction.noBudgetComparison') || 'You did not select a specific budget, but here are ways to reduce the cost:'}</p>
              </div>
            )}

            <div className="reduction-list">
              {priceReductions.length > 0 ? (
                priceReductions.map((reduction, index) => (
                  <div key={index} className="reduction-item">
                    <div className="reduction-label">
                      <span className="reduction-priority">#{reduction.priority}</span>
                      <span className="reduction-text">{t(reduction.labelKey)}</span>
                    </div>
                    <span className="reduction-savings">-{reduction.savings} €</span>
                  </div>
                ))
              ) : (
                <p className="no-recommendations">{t('priceReduction.noRecommendations') || 'No further reductions available'}</p>
              )}
            </div>

            <button className="modal-close-btn" onClick={closeReducePriceModal}>
              {t('buttons.back') || 'Back'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FinalResult
