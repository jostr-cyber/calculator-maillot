import React, { useState, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary, formatPrice, computeOptimizedPrice } from '../utilities/calculationUtils'
import { saveCalculation, updateCalculation } from '../utilities/calculationStore'
import { buildWhatsAppMessage } from '../utilities/whatsappMessage'
import './FinalResult.css'

const WHATSAPP_NUMBER = '34670770024'

function FinalResult({ priceResult, complexity, estimatedCrystals, config, wheelDiscount, selectedBudget, calculationId, onCustomizeAgain, onReducePrice }) {
  const { t, language } = useTranslation()
  const [showReducePriceModal, setShowReducePriceModal] = useState(false)
  const [reduceModalOpened, setReduceModalOpened] = useState(false)
  const summary = formatConfigurationSummary(config)

  // Calculate budget excess against the actual selected budget value
  const getBudgetExcess = () => {
    if (!selectedBudget || selectedBudget === 'undecided' || selectedBudget === 'unknown') {
      return null
    }
    // selectedBudget is the exact value chosen on the slider (e.g. 300), or 'plus' for 800+
    const budgetLimit = selectedBudget === 'plus' ? 800 : Number(selectedBudget)
    if (!budgetLimit || isNaN(budgetLimit)) {
      return null
    }
    const excess = priceResult.finalPrice - budgetLimit
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
  const optimizedPrice = computeOptimizedPrice(priceResult.finalPrice, priceReductions)
  const recommendationKeys = priceReductions.map((r) => r.labelKey)

  // Build the full structured calculation record (also the JSON for a future admin/CRM).
  const buildRecord = (extra = {}) => ({
    id: calculationId,
    language,
    createdAt: new Date().toISOString(),
    status: 'calculator_completed',
    config: {
      leotardType: config.combinaison,
      height: config.height,
      designSource: config.designSource,
      design: config.design,
      sleeves: config.sleeves,
      skirt: config.skirt,
      decorativeElements: config.decorativeElements,
      aerography: config.aerography,
      rhinestone: config.rhinestone,
      urgency: config.urgency
    },
    budget: selectedBudget,
    complexity: complexity ? { level: complexity.level, labelKey: complexity.labelKey } : null,
    originalPrice: priceResult.finalPrice,
    finalPrice: priceResult.finalPrice,
    reduceModalOpened: false,
    recommendationsShown: recommendationKeys,
    recommendationsApplied: [],
    optimizedPrice: null,
    whatsappMessage: null,
    ...extra
  })

  // Save the calculation as soon as the customer reaches the final screen (status: calculator_completed).
  useEffect(() => {
    if (calculationId) {
      saveCalculation(buildRecord())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [calculationId])

  const handleReducePrice = () => {
    setShowReducePriceModal(true)
    if (!reduceModalOpened) {
      setReduceModalOpened(true)
      // Opening the modal counts as applying the recommendations
      updateCalculation(calculationId, {
        reduceModalOpened: true,
        recommendationsApplied: recommendationKeys,
        optimizedPrice
      })
    }
  }

  const closeReducePriceModal = () => {
    setShowReducePriceModal(false)
  }

  const handleDiscussDetails = () => {
    const optimized = reduceModalOpened
    const record = {
      ...buildRecord(),
      reduceModalOpened,
      recommendationsApplied: reduceModalOpened ? recommendationKeys : [],
      optimizedPrice: reduceModalOpened ? optimizedPrice : null
    }
    const message = buildWhatsAppMessage(record, { t, language, optimized })
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
    updateCalculation(calculationId, { status: 'whatsapp_clicked', whatsappMessage: message })
  }

  return (
    <div className="final-result">
      <div className="result-header">
        <h2>{t('result.title') || 'Final calculation'}</h2>
        <p className="result-subtitle">{t('result.subtitle') || 'Based on your selected options'}</p>
        {calculationId && (
          <p className="calculation-id">{t('result.calculationId') || 'Calculation ID'}: {calculationId}</p>
        )}
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
            <span className="price-amount">{formatPrice(priceResult.finalPrice, language)}</span>
          </div>
          <p className="price-personalized">
            {t('result.personalizedEstimate', { price: formatPrice(priceResult.finalPrice, language) })}
          </p>
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
                <p>{t('priceReduction.exceedInfo') || 'Your desired budget exceeded by'} <strong>{formatPrice(budgetExcess, language)}</strong></p>
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
                      const message = encodeURIComponent(t('priceReduction.whatsappMessage', { item: t(reduction.labelKey) }))
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

                  {/* Approximate price after applying the recommendations - always below the current estimate */}
                  {optimizedPrice ? (
                    <div className="reduction-summary">
                      <p className="summary-text">
                        {t('priceReduction.accordingToRecommendations') || 'According to these recommendations'}:
                        <span className="summary-price">{formatPrice(optimizedPrice, language)}</span>
                      </p>
                    </div>
                  ) : null}
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
