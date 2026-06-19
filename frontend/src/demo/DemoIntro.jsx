import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { DemoLanguageSwitcher } from './DemoLanguageSwitcher'
import clientConfig from './clientConfig'
import { getDemoContent } from './demoContent'
import './DemoIntro.css'

function DemoIntro({ onStart, onBack }) {
  const { t, language } = useTranslation()
  const c = getDemoContent(language)
  const startLabel = t('intro.startButton')

  return (
    <div className="demo-intro">
      <DemoLanguageSwitcher />

      <div className="demo-intro-card">
        {onBack && (
          <button className="demo-intro-back" onClick={onBack}>{c.back}</button>
        )}

        <div className="demo-brand">
          {clientConfig.atelier?.logo ? (
            <img src={clientConfig.atelier.logo} alt={c.atelier.name} className="demo-brand-logo" />
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
        <p className="demo-powered">{c.poweredBy} {c.product.name}</p>
      </div>
    </div>
  )
}

export default DemoIntro
