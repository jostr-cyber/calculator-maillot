import React from 'react'
import clientConfig from './clientConfig'
import './DemoSales.css'

function DemoSales({ onRestart }) {
  const c = clientConfig
  const s = c.finalSales
  const waHref = `https://wa.me/${c.whatsappNumber}`

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
            <span className="rq-contact-label">WhatsApp</span>
            <span className="rq-contact-value">{c.whatsappDisplay}</span>
          </a>
          <a className="rq-contact" href={c.instagramLink} target="_blank" rel="noopener noreferrer">
            <span className="rq-contact-label">Instagram</span>
            <span className="rq-contact-value">{c.instagramHandle}</span>
          </a>
        </div>

        <a className="rq-cta-primary rq-sales-cta" href={waHref} target="_blank" rel="noopener noreferrer">
          {s.buttonLabel} <span className="rq-arrow">→</span>
        </a>

        <button className="rq-sales-restart" onClick={onRestart}>↺ Restart demo</button>

        <p className="rq-sales-foot">{c.product.name} · {c.product.subtitle}</p>
      </div>
    </div>
  )
}

export default DemoSales
