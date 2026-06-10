import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './DesignSourceSelect.css'

function DesignSourceSelect({ onConfirm, onBack }) {
  const { t } = useTranslation()
  const [selected, setSelected] = useState('')

  // Gallery examples of our leotards
  const galleryExamples = [
    { id: 'example-1', title: 'Пример 1' },
    { id: 'example-2', title: 'Пример 2' },
    { id: 'example-3', title: 'Пример 3' },
    { id: 'example-4', title: 'Пример 4' },
    { id: 'example-5', title: 'Пример 5' },
    { id: 'example-6', title: 'Пример 6' }
  ]

  const options = [
    {
      value: 'own-design',
      titleKey: 'designSource.ownDesign.title',
      descKey: 'designSource.ownDesign.desc',
      discountKey: 'designSource.ownDesign.discount',
      icon: '✓'
    },
    {
      value: 'inspiration-photos',
      titleKey: 'designSource.inspirationPhotos.title',
      descKey: 'designSource.inspirationPhotos.desc',
      discountKey: 'designSource.inspirationPhotos.discount',
      icon: '📷'
    },
    {
      value: 'custom-design',
      titleKey: 'designSource.customDesign.title',
      descKey: 'designSource.customDesign.desc',
      discountKey: 'designSource.customDesign.discount',
      icon: '✨'
    }
  ]

  const handleConfirm = () => {
    if (selected) {
      onConfirm(selected)
    }
  }

  return (
    <div className="select-wrapper">
      <h2>{t('steps.designSource')}</h2>

      <p className="design-source-description">{t('designSource.description')}</p>

      {/* Gallery of our leotard examples */}
      <div className="gallery-section">
        <h3>{t('result.similarDesigns') || 'Наши примеры купальников'}</h3>
        <div className="gallery-examples">
          {galleryExamples.map(item => (
            <div key={item.id} className="gallery-example-item">
              <div className="gallery-example-image">
                {/* Photo will be uploaded here */}
                <span>🎭</span>
              </div>
              <p className="gallery-example-title">{item.title}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="design-options-group">
        {options.map(opt => (
          <label key={opt.value} className={`design-option ${selected === opt.value ? 'selected' : ''}`}>
            <input
              type="radio"
              name="designSource"
              value={opt.value}
              checked={selected === opt.value}
              onChange={(e) => setSelected(e.target.value)}
              className="radio-input"
            />
            <div className="design-option-content">
              <div className="design-option-icon">{opt.icon}</div>
              <div className="design-option-text">
                <div className="design-option-title">{t(opt.titleKey)}</div>
                <div className="design-option-desc">{t(opt.descKey)}</div>
                <div className="design-option-discount">{t(opt.discountKey)}</div>
              </div>
            </div>
          </label>
        ))}
      </div>

      <div className="actions">
        <button onClick={handleConfirm} disabled={!selected} className="btn-primary">
          {t('buttons.continue')}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default DesignSourceSelect
