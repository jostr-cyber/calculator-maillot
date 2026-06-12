import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary } from '../utilities/calculationUtils'
import './FinalResult.css'

function FinalResult({ priceResult, complexity, estimatedCrystals, config, wheelDiscount, selectedBudget, onCustomizeAgain, onReducePrice }) {
  const { t } = useTranslation()
  const [showReducePriceModal, setShowReducePriceModal] = useState(false)
  const summary = formatConfigurationSummary(config)

  // Budget limits for mapping numeric values
  const BUDGET_LIMITS = {
    'under-250': 250,
    'around-400': 400,
    'around-800': 800,
    'unknown': null
  }

  // Helper function to map numeric budget values to category keys
  const mapBudgetValueToKey = (value) => {
    if (!value || value === 'undecided' || value === 'unknown') {
      return 'unknown'
    }
    if (value === 'plus' || value >= 800) {
      return 'around-800'
    }
    if (value >= 300) {
      return 'around-400'
    }
    if (value <= 250) {
      return 'under-250'
    }
    return 'unknown'
  }

  // Calculate budget excess
  const getBudgetExcess = () => {
    if (!selectedBudget || selectedBudget === 'undecided') {
      return null
    }
    const budgetKey = mapBudgetValueToKey(selectedBudget)
    if (budgetKey === 'unknown' || !BUDGET_LIMITS[budgetKey]) {
      return null
    }
    const budgetLimit = BUDGET_LIMITS[budgetKey]
    const excess = priceResult.finalPrice - budgetLimit
    console.log('🔍 Budget Debug:', { selectedBudget, budgetKey, budgetLimit, finalPrice: priceResult.finalPrice, excess })
    return excess > 0 ? Math.round(excess) : null
  }

  // Generate price reduction recommendations
  const generatePriceReductions = () => {
    const recommendations = []

    // Priority 1: Urgency (accelerated to standard) - ALWAYS SHOW if applicable
    if (config.urgency && config.urgency === 'accelerated') {
      recommendations.push({
        priority: 1,
        param: 'urgency',
        savings: Math.round(priceResult.finalPrice * 0.1),
        labelKey: 'priceReduction.recommendations.urgencyStandard',
        isComplexityChange: false
      })
    }

    // Priority 2: Rhinestones - ALWAYS SHOW if applicable
    const rhinestoneValue = config.rhinestone || ''
    if (rhinestoneValue && rhinestoneValue !== 'none' && rhinestoneValue !== '') {
      const rhinestoneMap = {
        'premium': { savings: 200, labelKey: 'priceReduction.recommendations.rhinestoneMaximum' },
        'maximum': { savings: 120, labelKey: 'priceReduction.recommendations.rhinestoneStandard' },
        'standard': { savings: 70, labelKey: 'priceReduction.recommendations.rhinestoneMinimal' },
        'minimal': { savings: 30, labelKey: 'priceReduction.recommendations.rhinestoneRemoveAll' }
      }
      if (rhinestoneMap[rhinestoneValue]) {
        recommendations.push({
          priority: 2,
          param: 'rhinestone',
          ...rhinestoneMap[rhinestoneValue],
          isComplexityChange: false
        })
      }
    }

    // Priority 3+: Complexity changes (suggest discussing with designer, not removing)
    // These show approximate savings based on complexity reduction (30-50%)

    // Sleeves complexity
    if (config.sleeves && config.sleeves > 0) {
      const approximateSavings = Math.round(priceResult.finalPrice * 0.08) // ~8% of total price
      recommendations.push({
        priority: 3,
        param: 'sleeves',
        savings: approximateSavings,
        labelKey: 'priceReduction.recommendations.sleevesComplexity',
        isComplexityChange: true,
        isApproximate: true
      })
    }

    // Skirt complexity
    if (config.skirt && config.skirt !== '') {
      const approximateSavings = Math.round(priceResult.finalPrice * 0.12) // ~12% of total price
      recommendations.push({
        priority: 4,
        param: 'skirt',
        savings: approximateSavings,
        labelKey: 'priceReduction.recommendations.skirtComplexity',
        isComplexityChange: true,
        isApproximate: true
      })
    }

    // Decorative elements complexity
    if (config.decorativeElements && config.decorativeElements !== 'none' && config.decorativeElements !== '') {
      const approximateSavings = Math.round(priceResult.finalPrice * 0.10) // ~10% of total price
      recommendations.push({
        priority: 5,
        param: 'decorativeElements',
        savings: approximateSavings,
        labelKey: 'priceReduction.recommendations.decorativeElementsComplexity',
        isComplexityChange: true,
        isApproximate: true
      })
    }

    // Aerography complexity
    if (config.aerography && config.aerography !== 'nothing' && config.aerography !== '') {
      const approximateSavings = Math.round(priceResult.finalPrice * 0.15) // ~15% of total price
      recommendations.push({
        priority: 6,
        param: 'aerography',
        savings: approximateSavings,
        labelKey: 'priceReduction.recommendations.aerographyComplexity',
        isComplexityChange: true,
        isApproximate: true
      })
    }

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
        <h2>{t('result.title') || 'Final calculation'}</h2>
        <p className="result-subtitle">{t('result.subtitle') || 'Based on your selected options'}</p>
      </div>

      <div className="result-content">
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
        <button className="btn-primary btn-action" onClick={handleReducePrice}>
          {t('actionButtons.reducePrice.label') || '💰 Reduce the price'}
        </button>
        <button className="btn-secondary btn-action" onClick={handleDiscussDetails}>
          {t('actionButtons.discuss') || '💬 Discuss on WhatsApp'}
        </button>
        <button className="btn-secondary btn-action" onClick={onCustomizeAgain}>
          {t('actionButtons.customize') || '🎨 Make new calculation'}
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
                <>
                  {priceReductions.map((reduction, index) => {
                    const handleComplexityClick = () => {
                      const message = encodeURIComponent(`Привет! Хотела бы обсудить детали дизайна купальника. Интересует: ${t(reduction.labelKey)}`)
                      window.open(`https://wa.me/34670770024?text=${message}`, '_blank')
                    }

                    return (
                      <div
                        key={index}
                        className={`reduction-item ${reduction.isComplexityChange ? 'complexity-change clickable' : ''}`}
                        onClick={reduction.isComplexityChange ? handleComplexityClick : undefined}
                        style={reduction.isComplexityChange ? { cursor: 'pointer' } : {}}
                      >
                        <div className="reduction-label">
                          <span className="reduction-priority">#{reduction.priority}</span>
                          <span className="reduction-text">
                            {t(reduction.labelKey)}
                            {reduction.isComplexityChange && (
                              <>
                                <br />
                                <span className="complexity-note">{t('priceReduction.discussWithDesigner') || 'Discuss with designer'}</span>
                              </>
                            )}
                          </span>
                        </div>
                      </div>
                    )
                  })}

                  {/* Total savings summary - show approximate price based on selected budget + main reductions */}
                  {(() => {
                    let targetPrice = null
                    let baseBudget = null

                    // Map selected budget to base price
                    if (selectedBudget) {
                      if (selectedBudget === 'under-250' || selectedBudget <= 250) {
                        baseBudget = 280
                      } else if (selectedBudget === 'around-400' || (selectedBudget >= 300 && selectedBudget < 800)) {
                        baseBudget = Math.round(selectedBudget + 50)
                      } else if (selectedBudget === 'around-800' || selectedBudget >= 800) {
                        baseBudget = Math.round(selectedBudget + 50)
                      }
                    }

                    // Calculate reductions from highest priority items (Urgency + Rhinestones)
                    const mainReductions = priceReductions
                      .filter(r => r.priority <= 2) // Only Urgency (1) and Rhinestones (2)
                      .reduce((sum, r) => sum + (r.savings || 0), 0)

                    if (baseBudget && mainReductions > 0) {
                      targetPrice = baseBudget - Math.round(mainReductions * 0.5) // Apply 50% of main reductions as buffer
                      targetPrice = Math.max(targetPrice, baseBudget - 100) // Don't reduce too much
                    } else if (baseBudget) {
                      targetPrice = baseBudget
                    }

                    return targetPrice ? (
                      <div className="reduction-summary">
                        <p className="summary-text">
                          {t('priceReduction.accordingToRecommendations') || 'According to these recommendations'}:
                          <span className="summary-price">{targetPrice} €</span>
                        </p>
                      </div>
                    ) : null
                  })()}
                </>
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
