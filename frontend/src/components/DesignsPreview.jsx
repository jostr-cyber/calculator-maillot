import React from 'react'
import { useTranslation } from '../hooks/useTranslation'
import { getMatchingSimilarDesigns } from '../utilities/calculationUtils'
import './DesignsPreview.css'

function DesignsPreview({ config, complexity }) {
  const { t } = useTranslation()

  if (!config || !complexity) {
    return null
  }

  const similarDesigns = getMatchingSimilarDesigns(config, complexity)

  return (
    <div className="designs-preview">
      <div className="preview-header">
        <h3>{t('result.similarDesigns') || 'Similar designs'}</h3>
        <p className="preview-note">{t('result.gallerySimilarityNote') || 'Images show designs with similar complexity and style'}</p>
      </div>

      <div className="preview-gallery">
        <div className="gallery-grid">
          {similarDesigns.designs.slice(0, 3).map((designId, idx) => (
            <div key={idx} className="gallery-item">
              <div className="gallery-image-placeholder">
                <span>🎭</span>
                <small>{designId}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default DesignsPreview
