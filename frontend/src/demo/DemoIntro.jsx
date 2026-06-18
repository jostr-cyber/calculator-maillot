import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import clientConfig from './clientConfig'
import './DemoIntro.css'

function DemoIntro({ onStart, onBack }) {
  const { t } = useTranslation()
  const c = clientConfig
  const startLabel = c.buttonLabels?.start || t('intro.startButton')

  return (
    <div className="demo-intro">
      <LanguageSwitcher />

      <div className="demo-intro-card">
        {onBack && (
          <button className="demo-intro-back" onClick={onBack}>← Back</button>
        )}

        <div className="demo-brand">
          {c.atelier.logo ? (
            <img src={c.atelier.logo} alt={c.atelier.name} className="demo-brand-logo" />
          ) : (
            <div className="demo-logo-placeholder">{c.atelier.logoPlaceholder}</div>
          )}
          <div className="demo-brand-name">{c.atelier.name}</div>
          <div className="demo-brand-tagline">{c.product.calculatorName}</div>
        </div>

        <div className="demo-intro-art">
          <div className="demo-intro-art-inner">
            <span className="demo-intro-art-icon">✦</span>
          </div>
        </div>

        <p className="demo-intro-lead">{t('intro.description')}</p>

        <button className="btn-start demo-start" onClick={onStart}>
          <span>{startLabel}</span>
          <span className="arrow">→</span>
        </button>

        <p className="demo-generic-note">{c.atelier.genericNote}</p>
        <p className="demo-powered">Powered by {c.product.name}</p>
      </div>
    </div>
  )
}

export default DemoIntro
