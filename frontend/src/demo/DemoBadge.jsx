import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import clientConfig from './clientConfig'
import { getDemoContent } from './demoContent'
import './DemoBadge.css'

// "Live demo" banner shown across the demo.
function DemoBadge() {
  const { language } = useTranslation()
  if (clientConfig.demoBadge && clientConfig.demoBadge.show === false) return null
  const badge = getDemoContent(language).demoBadge

  return (
    <div className="demo-badge">
      <span className="demo-badge-dot">●</span>
      <span className="demo-badge-text">
        <strong>{badge.title}</strong> — {badge.text}
      </span>
    </div>
  )
}

export default DemoBadge
