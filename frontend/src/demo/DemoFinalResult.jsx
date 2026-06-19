import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary, formatPrice, computeOptimizedPrice } from '../utilities/calculationUtils'
import { buildWhatsAppMessage } from '../utilities/whatsappMessage'
import clientConfig from './clientConfig'
import { getDemoContent } from './demoContent'
import '../components/FinalResult.css'
import './DemoFinalResult.css'

// Demo: routes to the placeholder number in clientConfig — never a real business.
const WHATSAPP_NUMBER = clientConfig.whatsappNumber

function DemoFinalResult({ priceResult, complexity, config, wheelDiscount, selectedBudget, onCustomizeAgain, onProceed }) {
  const { t, language } = useTranslation()
  const [showReducePriceModal, setShowReducePriceModal] = useState(false)
  const [reduceModalOpened, setReduceModalOpened] = useState(false)
  const summary = formatConfigurationSummary(config)

  const dc = getDemoContent(language)

  const getBudgetExcess = () => {
    if (!selectedBudget || selectedBudget === 'undecided' || selectedBudget === 'unknown') return null
    const budgetLimit = selectedBudget === 'plus' ? 800 : Number(selectedBudget)
    if (!budgetLimit || isNaN(budgetLimit)) return null
    const excess = priceResult.finalPrice - budgetLimit
    return excess > 0 ? Math.round(excess) : null
  }

  // Same recommendation logic as production (kept identical so the demo behaves like the real product)
  const generatePriceReductions = () => {
    const recommendations = []
    if (config.urgency === 'accelerated') {
      recommendations.push({ priority: 1, savings: Math.round(priceResult.finalPrice * 0.1), labelKey: 'priceReduction.recommendations.urgencyStandard', isComplexityChange: false })
    }
    const rhinestoneValue = config.rhinestone || ''
    if (rhinestoneValue && rhinestoneValue !== 'none') {
      const map = {
        premium: { savings: 200, labelKey: 'priceReduction.recommendations.rhinestoneMaximum' },
        maximum: { savings: 120, labelKey: 'priceReduction.recommendations.rhinestoneStandard' },
        standard: { savings: 70, labelKey: 'priceReduction.recommendations.rhinestoneMinimal' },
        minimal: { savings: 30, labelKey: 'priceReduction.recommendations.rhinestoneRemoveAll' },
      }
      if (map[rhinestoneValue]) recommendations.push({ priority: 2, ...map[rhinestoneValue], isComplexityChange: false })
    }
    if (config.sleeves > 0) recommendations.push({ priority: 3, savings: Math.round(priceResult.finalPrice * 0.08), labelKey: 'priceReduction.recommendations.sleevesComplexity', isComplexityChange: true })
    if (config.skirt) recommendations.push({ priority: 4, savings: Math.round(priceResult.finalPrice * 0.12), labelKey: 'priceReduction.recommendations.skirtComplexity', isComplexityChange: true })
    if (config.decorativeElements && config.decorativeElements !== 'none') recommendations.push({ priority: 5, savings: Math.round(priceResult.finalPrice * 0.1), labelKey: 'priceReduction.recommendations.decorativeElementsComplexity', isComplexityChange: true })
    if (config.aerography && config.aerography !== 'nothing') recommendations.push({ priority: 6, savings: Math.round(priceResult.finalPrice * 0.15), labelKey: 'priceReduction.recommendations.aerographyComplexity', isComplexityChange: true })
    return recommendations.sort((a, b) => a.priority - b.priority)
  }

  const budgetExcess = getBudgetExcess()
  const priceReductions = generatePriceReductions()
  const optimizedPrice = computeOptimizedPrice(priceResult.finalPrice, priceReductions)

  const buildRecord = (optimized) => ({
    id: 'DEMO',
    language,
    createdAt: new Date().toISOString(),
    status: 'demo',
    config: {
      leotardType: config.combinaison, height: config.height, designSource: config.designSource,
      design: config.design, sleeves: config.sleeves, skirt: config.skirt,
      decorativeElements: config.decorativeElements, aerography: config.aerography,
      rhinestone: config.rhinestone, urgency: config.urgency,
    },
    budget: selectedBudget,
    complexity: complexity ? { level: complexity.level, labelKey: complexity.labelKey } : null,
    originalPrice: priceResult.finalPrice,
    finalPrice: priceResult.finalPrice,
    reduceModalOpened: optimized,
    recommendationsShown: priceReductions.map((r) => r.labelKey),
    recommendationsApplied: optimized ? priceReductions.map((r) => r.labelKey) : [],
    optimizedPrice: optimized ? optimizedPrice : null,
    whatsappMessage: null,
  })

  const handleReducePrice = () => {
    setShowReducePriceModal(true)
    setReduceModalOpened(true)
  }
  const closeReducePriceModal = () => setShowReducePriceModal(false)

  const openWhatsApp = (optimized) => {
    const message = buildWhatsAppMessage(buildRecord(optimized), { t, language, optimized })
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank')
  }

  const handleDiscussDetails = () => openWhatsApp(reduceModalOpened)
  const handleDiscussOptimized = () => openWhatsApp(true)

  return (
    <div className="final-result demo-final">
      <div className="result-header">
        <h2>{t('result.title') || 'Final calculation'}</h2>
        <p className="result-subtitle">{t('result.subtitle') || 'Based on your selected options'}</p>
      </div>

      <div className="result-content">
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
              <div className="option-item empty"><span>{t('result.noOptions') || 'No extra options selected'}</span></div>
            )}
          </div>
        </div>

        <div className="result-section price-section">
          <div className="price-main">
            <span className="price-label">{t('result.estimatedPrice') || 'Estimated price'}</span>
            <span className="price-amount">{formatPrice(priceResult.finalPrice, language)}</span>
          </div>
          <p className="price-disclaimer">
            {t('priceBreakdown.disclaimer') || '*Preliminary calculation. Final price clarified after discussing details.'}
          </p>
        </div>
      </div>

      <div className="result-actions">
        <button className="btn-primary btn-action" onClick={handleReducePrice}>
          {t('actionButtons.reducePrice.label') || '💰 Reduce the price'}
        </button>
        <button className="btn-secondary btn-action" onClick={handleDiscussDetails}>
          {dc.sendRequest}
        </button>
        <button className="btn-secondary btn-action" onClick={onCustomizeAgain}>
          {t('actionButtons.customize') || '🎨 Make new calculation'}
        </button>
      </div>

      {clientConfig.instagramLink && (
        <a className="demo-instagram" href={clientConfig.instagramLink} target="_blank" rel="noopener noreferrer">
          ◎ {dc.atelier.name} {dc.onInstagram}
        </a>
      )}

      {onProceed && (
        <div className="demo-sales-bridge">
          <p>{dc.bridgeText}</p>
          <button className="demo-bridge-btn" onClick={onProceed}>
            {dc.bridgeButton} <span className="arrow">→</span>
          </button>
        </div>
      )}

      {showReducePriceModal && (
        <div className="reduce-price-modal-overlay" onClick={closeReducePriceModal}>
          <div className="reduce-price-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeReducePriceModal}>✕</button>
            <h3>{t('priceReduction.title') || 'Ways to reduce the price'}</h3>

            {budgetExcess ? (
              <div className="budget-excess-info">
                <p>{t('priceReduction.exceedInfo') || 'Your desired budget exceeded by'} <strong>{formatPrice(budgetExcess, language)}</strong></p>
              </div>
            ) : (
              <div className="no-budget-info">
                <p>{t('priceReduction.noBudgetComparison') || 'Here are ways to reduce the cost:'}</p>
              </div>
            )}

            <div className="reduction-list">
              {priceReductions.length > 0 ? (
                <>
                  {priceReductions.map((reduction, index) => (
                    <div key={index} className={`reduction-item ${reduction.isComplexityChange ? 'complexity-change' : ''}`}>
                      <div className="reduction-label">
                        <span className="reduction-priority">#{reduction.priority}</span>
                        <span className="reduction-text">
                          {t(reduction.labelKey)}
                          {reduction.isComplexityChange && (
                            <><br /><span className="complexity-note">{t('priceReduction.discussWithDesigner') || 'Discuss with designer'}</span></>
                          )}
                        </span>
                      </div>
                    </div>
                  ))}
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

            <button className="modal-whatsapp-btn" onClick={handleDiscussOptimized}>
              {dc.sendRequest}
            </button>
            <button className="modal-close-btn" onClick={closeReducePriceModal}>
              {t('buttons.back') || 'Back'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default DemoFinalResult
