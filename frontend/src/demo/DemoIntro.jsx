import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import clientConfig from './clientConfig'
import DemoBadge from './DemoBadge'
import './DemoIntro.css'

function DemoIntro({ onStart }) {
  const { t } = useTranslation()
  const startLabel = clientConfig.buttonLabels?.start || t('intro.startButton')

  return (
    <div className="demo-intro">
      <LanguageSwitcher />
      <DemoBadge />

      <div className="demo-intro-card">
        <div className="demo-brand">
          {clientConfig.logo ? (
            <img src={clientConfig.logo} alt={clientConfig.brandName} className="demo-brand-logo" />
          ) : (
            <div className="demo-brand-name">{clientConfig.brandName}</div>
          )}
          <div className="demo-brand-tagline">{clientConfig.tagline}</div>
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
      </div>
    </div>
  )
}

export default DemoIntro
