import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import clientConfig from './clientConfig'
import { getDemoContent } from './demoContent'
import './DemoSales.css'

function DemoSales({ onRestart }) {
  const { language } = useTranslation()
  const c = getDemoContent(language)
  const s = c.finalSales
  const waHref = `https://wa.me/${clientConfig.whatsappNumber}`

  return (
    <div className="rq-sales">
      <div className="rq-sales-card">
        <div className="rq-logo-mark">RIQ</div>
        <h1 className="rq-sales-title">{s.title}</h1>
        <p className="rq-sales-sub">{s.subtitle}</p>

        <ul className="rq-sales-list">
          {s.includes.map((it, i) => (
            <li key={i}><span className="rq-check">✓</span>{it}</li>
          ))}
        </ul>

        <div className="rq-sales-contacts">
          <a className="rq-contact" href={waHref} target="_blank" rel="noopener noreferrer">
            <span className="rq-contact-label">{c.contactWhatsApp}</span>
            <span className="rq-contact-value">{clientConfig.whatsappDisplay}</span>
          </a>
          <a className="rq-contact" href={clientConfig.instagramLink} target="_blank" rel="noopener noreferrer">
            <span className="rq-contact-label">{c.contactInstagram}</span>
            <span className="rq-contact-value">{clientConfig.instagramHandle}</span>
          </a>
        </div>

        <a className="rq-cta-primary rq-sales-cta" href={waHref} target="_blank" rel="noopener noreferrer">
          {s.button} <span className="rq-arrow">→</span>
        </a>

        <button className="rq-sales-restart" onClick={onRestart}>{c.restartDemo}</button>

        <p className="rq-sales-foot">{c.product.name} · {c.product.subtitle}</p>
      </div>
    </div>
  )
}

export default DemoSales
