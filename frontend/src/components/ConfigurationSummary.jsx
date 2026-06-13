import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { formatConfigurationSummary, formatPrice } from '../utilities/calculationUtils'
import './ConfigurationSummary.css'

function ConfigurationSummary({ config, currentPrice, complexity }) {
  const { t, language } = useTranslation()

  const summary = formatConfigurationSummary(config)

  return (
    <div className="configuration-summary">
      <div className="summary-header">
        <h3>{t('summary.title') || 'Your selection'}</h3>
      </div>

      <div className="summary-items">
        {summary.length > 0 ? (
          summary.map((item, index) => (
            <div key={index} className="summary-item">
              <span className="summary-text">{typeof item === 'string' ? item : '• ' + t(item.key)}</span>
            </div>
          ))
        ) : (
          <div className="summary-item empty">
            <span>{t('summary.noSelections') || 'No selections yet'}</span>
          </div>
        )}
      </div>

      <div className="summary-footer">
        {currentPrice && (
          <div className="current-price">
            <span className="price-label">{t('summary.currentEstimate') || 'Current estimate'}</span>
            <span className="price-value">{formatPrice(currentPrice, language)}</span>
          </div>
        )}

        {complexity && (
          <div className="complexity-indicator">
            <span className="complexity-label">{t('summary.complexity') || 'Complexity'}</span>
            <span className={`complexity-badge complexity-${complexity.level.toLowerCase()}`}>
              {t(complexity.labelKey) || complexity.level}
            </span>
          </div>
        )}
      </div>

      {currentPrice && (
        <p className="price-note">{t('summary.priceNote')}</p>
      )}
    </div>
  )
}

export default ConfigurationSummary
