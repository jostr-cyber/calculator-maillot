import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { getDemoContent } from './demoContent'
import { COLORS } from './demoColors'
import './DemoMainColorSelect.css'

// Demo-only step inserted after "height" — purely UI/visual (no impact on the
// shared calculator price engine). User picks one swatch by clicking it.

function Swatch({ color, selected, onClick, label }) {
  const style = color.hex === 'multi'
    ? { background: 'conic-gradient(#ee7777, #f6c945, #aedfcf, #7ec4e8, #b497d1, #ee7777)' }
    : { background: color.hex }
  const needsBorder = ['#ffffff', '#aedfcf', '#e9d9b8', '#e0bda0', '#e8e6e2', '#f2ff00'].includes(color.hex)
  const isNeon = color.id.startsWith('neon-')
  return (
    <button
      type="button"
      className={`mc-swatch ${selected ? 'mc-selected' : ''} ${needsBorder ? 'mc-light' : ''} ${isNeon ? 'mc-neon' : ''}`}
      style={isNeon ? { ...style, boxShadow: `0 0 12px ${color.hex}, 0 3px 8px rgba(120,95,55,.2)` } : style}
      onClick={onClick}
      aria-label={label}
      title={label}
    >
      {selected && <span className="mc-check">✓</span>}
    </button>
  )
}

function DemoMainColorSelect({ value, onColorChange, onContinue, onBack }) {
  const { t, language } = useTranslation()
  const dc = getDemoContent(language)
  const selectedColor = COLORS.find((c) => c.id === value) || null

  const handlePick = (color) => {
    onColorChange(color.id)
  }

  const handleDontKnow = () => {
    onColorChange('unknown')
    onContinue()
  }

  return (
    <div className="select-wrapper main-color-step">
      <h2>{dc.mainColor.title}</h2>
      <p className="mc-hint">{dc.mainColor.hint}</p>

      <div className="mc-grid">
        {COLORS.map((c) => (
          <Swatch
            key={c.id}
            color={c}
            selected={value === c.id}
            onClick={() => handlePick(c)}
            label={c.name[language === 'ru' ? 'ru' : 'en']}
          />
        ))}
      </div>

      {selectedColor && (
        <div className="mc-selected-row">
          <span className="mc-selected-label">{dc.mainColor.selected}:</span>
          <span className="mc-selected-name">{selectedColor.name[language === 'ru' ? 'ru' : 'en']}</span>
        </div>
      )}

      <button className="mc-dontknow" onClick={handleDontKnow}>
        {dc.mainColor.dontKnow}
      </button>

      <div className="actions">
        <button onClick={onContinue} disabled={!value} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default DemoMainColorSelect
