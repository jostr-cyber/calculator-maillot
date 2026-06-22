import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { getDemoContent } from './demoContent'
import { colorById } from './demoColors'
import './DemoFabricSelect.css'

// Demo-only step: pick fabric type(s) for the leotard base. Multi-select.
// Cards show placeholder gradients now — real fabric photos will be swapped in
// later (drop /demo-images/fabric-<id>.* and update the CSS overrides).

// First row holds the most-used fabrics (atelier tip: smooth velvet, glossy
// biflex, matte biflex are the bread-and-butter choices).
const FABRICS = [
  { id: 'velvet-smooth'   },
  { id: 'biflex-glossy'   },
  { id: 'biflex-matte'    },
  { id: 'velvet-crushed'  },
  { id: 'biflex-hologram' },
  { id: 'biflex-silk'     },
  { id: 'mesh'            },
  { id: 'biflex-print', photos: [
    '/demo-images/fabric-biflex-print-1.png',
    '/demo-images/fabric-biflex-print-2.jpg',
    '/demo-images/fabric-biflex-print-3.jpg',
  ] },
  { id: 'velvet-embossed', photos: [
    '/demo-images/fabric-velvet-embossed-1.jpg',
    '/demo-images/fabric-velvet-embossed-2.jpg',
    '/demo-images/fabric-velvet-embossed-3.jpg',
  ] },
]

// Fabrics that cannot be made in true "multicolor" — they show a warning when
// the user picks the "multi" color on the previous step. Adjust this list with
// what the atelier confirms is genuinely impossible to multi-color in production.
// Prints (biflex-print, velvet-embossed) are inherently a fixed pattern, so they
// also belong here — re-dyeing a printed fabric in arbitrary colors isn't doable.
const MULTICOLOR_INCOMPATIBLE = new Set([
  'velvet-smooth', 'velvet-crushed', 'velvet-embossed',
  'biflex-hologram', 'biflex-print',
])


function FabricCard({ fabric, selected, onClick, label }) {
  const [idx, setIdx] = React.useState(0)
  const hasCarousel = Array.isArray(fabric.photos) && fabric.photos.length > 1
  const swatchStyle = hasCarousel
    ? { backgroundImage: `url('${fabric.photos[idx]}')`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : undefined

  const stop = (e) => { e.preventDefault(); e.stopPropagation() }
  const prev = (e) => { stop(e); setIdx((idx - 1 + fabric.photos.length) % fabric.photos.length) }
  const next = (e) => { stop(e); setIdx((idx + 1) % fabric.photos.length) }

  return (
    <button
      type="button"
      className={`fb-card fb-${fabric.id} ${selected ? 'fb-selected' : ''}`}
      onClick={onClick}
      aria-pressed={selected}
      title={label}
    >
      <span className={`fb-swatch fb-swatch-${fabric.id} ${hasCarousel ? 'fb-swatch-photo' : ''}`} style={swatchStyle} aria-hidden="true">
        {hasCarousel && (
          <>
            <span className="fb-arrow fb-arrow-prev" onClick={prev} role="button" aria-label="Previous photo">‹</span>
            <span className="fb-arrow fb-arrow-next" onClick={next} role="button" aria-label="Next photo">›</span>
            <span className="fb-dots">
              {fabric.photos.map((_, i) => (
                <span key={i} className={`fb-dot ${i === idx ? 'fb-dot-active' : ''}`} />
              ))}
            </span>
          </>
        )}
        {selected && <span className="fb-check">✓</span>}
      </span>
      <span className="fb-label">{label}</span>
    </button>
  )
}

function DemoFabricSelect({ baseFabrics, onBaseChange, onContinue, onBack, mainColor, trustMaster, onTrustMaster, onChangeColor }) {
  const { t, language } = useTranslation()
  const dc = getDemoContent(language)
  const F = dc.fabric
  const [warningFor, setWarningFor] = useState(null) // fabric id

  const isMulti = mainColor === 'multi'

  const toggle = (id) => {
    if (isMulti && MULTICOLOR_INCOMPATIBLE.has(id) && !baseFabrics.includes(id)) {
      setWarningFor(id)
      return
    }
    onBaseChange(baseFabrics.includes(id) ? baseFabrics.filter((x) => x !== id) : [...baseFabrics, id])
  }

  const handleTrustMaster = () => {
    setWarningFor(null)
    onTrustMaster()
    onContinue()
  }

  const handleCloseWarning = () => setWarningFor(null)
  const handleGoChangeColor = () => {
    setWarningFor(null)
    onChangeColor && onChangeColor()
  }

  const canContinue = baseFabrics.length > 0 || trustMaster

  // Tint photo-based fabric swatches with the selected color (CSS var).
  // 'multi' / 'unknown' / no choice → no tint (fabric stays in original photo color:
  // bifleckses/velvets are white-ish, mesh stays beige — looks clean and honest).
  const selectedColor = colorById(mainColor)
  const tint = selectedColor && selectedColor.hex && selectedColor.hex !== 'multi'
    ? selectedColor.hex
    : 'transparent'
  const wrapperStyle = { '--fb-tint': tint }

  return (
    <div className="select-wrapper fabric-step" style={wrapperStyle}>
      <h2>{F.title}</h2>
      <p className="fb-hint">{F.hint}</p>

      <div className="fb-grid">
        {FABRICS.map((f) => (
          <FabricCard
            key={f.id}
            fabric={f}
            selected={baseFabrics.includes(f.id)}
            onClick={() => toggle(f.id)}
            label={F.types[f.id]}
          />
        ))}
      </div>

      <button className={`fb-trust-master ${trustMaster ? 'fb-trust-active' : ''}`} onClick={handleTrustMaster}>
        ✦ {F.trustMaster}
      </button>

      {trustMaster && (
        <p className="fb-trust-note">{F.trustNote}</p>
      )}

      <div className="actions">
        <button onClick={onContinue} disabled={!canContinue} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>

      {warningFor && (
        <div className="fb-modal-overlay" onClick={handleCloseWarning}>
          <div className="fb-modal" onClick={(e) => e.stopPropagation()}>
            <button className="fb-modal-close" onClick={handleCloseWarning} aria-label="Close">✕</button>
            <div className="fb-modal-icon">⚠</div>
            <h3 className="fb-modal-title">{F.incompatible.title}</h3>
            <p className="fb-modal-text">{F.incompatible.text}</p>
            <div className="fb-modal-actions">
              <button className="fb-modal-btn fb-modal-secondary" onClick={handleCloseWarning}>
                {F.incompatible.chooseOtherFabric}
              </button>
              <button className="fb-modal-btn fb-modal-secondary" onClick={handleGoChangeColor}>
                {F.incompatible.chooseOtherColor}
              </button>
              <button className="fb-modal-btn fb-modal-primary" onClick={handleTrustMaster}>
                ✦ {F.incompatible.trustMaster}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DemoFabricSelect
