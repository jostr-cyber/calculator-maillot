import React from 'react'
import clientConfig from './clientConfig'
import './DemoBadge.css'

// "This is a demo. Your version can be customized for your atelier."
function DemoBadge() {
  const badge = clientConfig.demoBadge
  if (!badge || !badge.show) return null

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
