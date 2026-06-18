import React from 'react'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import clientConfig from './clientConfig'
import './DemoWelcome.css'

function Stars({ n }) {
  return <span className="rq-stars">{'★'.repeat(n)}</span>
}

function DemoWelcome({ onTryDemo }) {
  const c = clientConfig
  const contactHref = `https://wa.me/${c.whatsappNumber}`

  return (
    <div className="rq-welcome">
      <LanguageSwitcher />

      <div className="rq-demo-pill">
        <span className="rq-dot">●</span> Live demo
      </div>

      {/* HERO */}
      <header className="rq-hero">
        <div className="rq-logo-mark">RIQ</div>
        <h1 className="rq-title">{c.product.name}</h1>
        <p className="rq-subtitle">{c.product.subtitle}</p>

        <ul className="rq-features">
          {c.features.map((f, i) => (
            <li key={i}><span className="rq-feat-icon">{f.icon}</span>{f.text}</li>
          ))}
        </ul>

        <button className="rq-cta-primary" onClick={onTryDemo}>
          {c.buttonLabels.tryDemo} <span className="rq-arrow">→</span>
        </button>

        <p className="rq-generic-note">{c.atelier.genericNote}</p>
      </header>

      {/* BENEFITS */}
      <section className="rq-section">
        <h2 className="rq-section-title">{c.benefits.title}</h2>
        <div className="rq-benefits">
          {c.benefits.items.map((b, i) => (
            <div key={i} className="rq-benefit"><span className="rq-check">✓</span>{b}</div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="rq-section">
        <h2 className="rq-section-title">What studios say</h2>
        <div className="rq-testimonials">
          {c.testimonials.map((t, i) => (
            <figure key={i} className="rq-testimonial">
              <Stars n={t.stars} />
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>— {t.author}, {t.studio}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* INFO CARD */}
      <section className="rq-info-card">
        <h2>{c.infoCard.title}</h2>
        <ul className="rq-info-list">
          {c.infoCard.items.map((it, i) => (
            <li key={i}><span className="rq-check">✔</span>{it}</li>
          ))}
        </ul>
        <a className="rq-cta-secondary" href={contactHref} target="_blank" rel="noopener noreferrer">
          {c.infoCard.buttonLabel}
        </a>
      </section>

      {/* SECONDARY TRY DEMO */}
      <div className="rq-bottom-cta">
        <button className="rq-cta-primary" onClick={onTryDemo}>
          {c.buttonLabels.tryDemo} <span className="rq-arrow">→</span>
        </button>
      </div>

      <footer className="rq-foot">
        {c.product.name} · {c.product.calculatorName}
      </footer>
    </div>
  )
}

export default DemoWelcome
