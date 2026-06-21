import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { DemoLanguageSwitcher } from './DemoLanguageSwitcher'
import clientConfig from './clientConfig'
import { getDemoContent } from './demoContent'
import './DemoWelcome.css'

function Stars({ n }) {
  return <span className="rq-stars">{'★'.repeat(n)}</span>
}

function DemoWelcome({ onTryDemo }) {
  const { language } = useTranslation()
  const c = getDemoContent(language)
  // "Contact us" goes to the real RhythmIQ seller (atelier owner buying RhythmIQ).
  const salesNumber = clientConfig.salesWhatsapp || clientConfig.whatsappNumber
  const contactHref = `https://wa.me/${salesNumber}`
  const W = c.worksForYou
  const M = c.moreThan

  return (
    <div className="rq-welcome">
      <DemoLanguageSwitcher />

      <div className="rq-demo-pill">
        <span className="rq-dot">●</span> {c.liveDemo}
      </div>

      {/* HERO */}
      <header className="rq-hero">
        <div className="rq-logo-mark">RIQ</div>
        <h1 className="rq-title">{c.product.name}</h1>
        <p className="rq-subtitle">{c.product.subtitle}</p>

        <ul className="rq-features">
          {c.features.map((f, i) => (
            <li key={i}><span className="rq-feat-icon">✨</span>{f}</li>
          ))}
        </ul>

        <p className="rq-features-note">{c.featuresNote}</p>

        <button className="rq-cta-primary" onClick={onTryDemo}>
          {c.tryDemo} <span className="rq-arrow">→</span>
        </button>

        <p className="rq-generic-note">{c.atelier.genericNote}</p>
      </header>

      {/* BENEFITS */}
      <section className="rq-section">
        <h2 className="rq-section-title">{c.benefitsTitle}</h2>
        <div className="rq-benefits">
          {c.benefits.map((b, i) => (
            <div key={i} className="rq-benefit"><span className="rq-check">✓</span>{b}</div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="rq-section">
        <h2 className="rq-section-title">{c.testimonialsTitle}</h2>
        <div className="rq-testimonials">
          {c.testimonials.map((t, i) => (
            <figure key={i} className="rq-testimonial">
              <Stars n={5} />
              <blockquote>“{t.quote}”</blockquote>
              <figcaption>— {t.author}, {t.studio}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* WORKS-FOR-YOU (atelier use) */}
      <section className="rq-section rq-works-section">
        <h2 className="rq-section-title">{W.title}</h2>
        <p className="rq-section-sub">{W.subtitle}</p>
        <div className="rq-works-grid">
          {W.items.map((it, i) => (
            <div key={i} className="rq-work-item">
              <span className="rq-check">✓</span>{it}
            </div>
          ))}
        </div>

        <div className="rq-helper-card">
          <div className="rq-helper-mark">★</div>
          <h3>{W.helperCard.title}</h3>
          <p>{W.helperCard.text}</p>
        </div>
      </section>

      {/* MORE THAN A CALCULATOR */}
      <section className="rq-section rq-more-section">
        <h2 className="rq-section-title">{M.title}</h2>
        <p className="rq-section-paragraph">{M.text}</p>
        <div className="rq-more-cards">
          {M.cards.map((card, i) => (
            <div key={i} className="rq-more-card">
              <span className="rq-more-bullet">✦</span>
              {card}
            </div>
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
          {c.infoCard.button}
        </a>
      </section>

      {/* SECONDARY TRY DEMO */}
      <div className="rq-bottom-cta">
        <button className="rq-cta-primary" onClick={onTryDemo}>
          {c.tryDemo} <span className="rq-arrow">→</span>
        </button>
      </div>

      <footer className="rq-foot">
        {c.product.name} · {c.product.calculatorName}
      </footer>
    </div>
  )
}

export default DemoWelcome
