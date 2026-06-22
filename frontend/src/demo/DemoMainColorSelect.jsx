import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { getDemoContent } from './demoContent'
import { COLORS, COLOR_GROUPS, GROUP_LABELS } from './demoColors'
import './DemoMainColorSelect.css'

// Demo-only step inserted after "height" — purely UI/visual (no impact on the
// shared calculator price engine). User picks one swatch by clicking it.

// Realistic metallic gradients (light-highlight → mid-tone → shadow → highlight)
// so gold / rose-gold / silver read as actual metal, not solid color chips.
const METALLIC_BG = {
  gold:        'linear-gradient(135deg, #fff5cc 0%, #f3d56f 22%, #c2a36b 50%, #9c7b3a 72%, #fff0b8 100%)',
  'rose-gold': 'linear-gradient(135deg, #fde6df 0%, #e3b6a8 22%, #b76e79 50%, #8a4a55 72%, #fadcd0 100%)',
  silver:      'linear-gradient(135deg, #ffffff 0%, #e6e6e6 22%, #b0b0b0 50%, #8a8a8a 72%, #f4f4f4 100%)',
}

function Swatch({ color, selected, onClick, label }) {
  const metallicBg = METALLIC_BG[color.id]
  const style = metallicBg
    ? { background: metallicBg }
    : color.hex === 'multi'
      ? { background: 'conic-gradient(#ee7777, #f6c945, #aedfcf, #7ec4e8, #b497d1, #ee7777)' }
      : { background: color.hex }
  const needsBorder = ['#ffffff', '#aedfcf', '#e9d9b8', '#e0bda0', '#e8e6e2', '#f2ff00'].includes(color.hex)
  const isNeon = color.id.startsWith('neon-')
  const isMetallic = !!metallicBg
  return (
    <button
      type="button"
      className={`mc-swatch ${selected ? 'mc-selected' : ''} ${needsBorder ? 'mc-light' : ''} ${isNeon ? 'mc-neon' : ''} ${isMetallic ? 'mc-metallic' : ''}`}
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

  const handlePick = (color) => onColorChange(color.id)
  const handleDontKnow = () => { onColorChange('unknown'); onContinue() }

  return (
    <div className="select-wrapper main-color-step">
      <h2>{dc.mainColor.title}</h2>
      <p className="mc-hint">{dc.mainColor.hint}</p>

      {COLOR_GROUPS.map((groupId) => {
        const groupColors = COLORS.filter((c) => c.group === groupId)
        if (groupColors.length === 0) return null
        const groupLabel = (GROUP_LABELS[groupId] || {})[language] || (GROUP_LABELS[groupId] || {}).en || groupId
        return (
          <section key={groupId} className={`mc-group mc-group-${groupId}`}>
            <h3 className="mc-group-title">{groupLabel}</h3>
            <div className="mc-grid">
              {groupColors.map((c) => (
                <Swatch
                  key={c.id}
                  color={c}
                  selected={value === c.id}
                  onClick={() => handlePick(c)}
                  label={c.name[language] || c.name.en}
                />
              ))}
            </div>
          </section>
        )
      })}

      {selectedColor && (
        <div className="mc-selected-row">
          <span className="mc-selected-label">{dc.mainColor.selected}:</span>
          <span className="mc-selected-name">{selectedColor.name[language] || selectedColor.name.en}</span>
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
