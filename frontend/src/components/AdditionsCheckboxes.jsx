import React, { useState } from 'react'
import './AdditionsCheckboxes.css'

function AdditionsCheckboxes({ onConfirm, hasSkirt, hasFeathers, hasSwarovski, onBack }) {
  const [skirtFront, setSkirtFront] = useState(false)
  const [skirtBack, setSkirtBack] = useState(false)
  const [decorativeElements, setDecorativeElements] = useState(false)
  const [shoulder, setShoulder] = useState(false)
  const [aerography, setAerography] = useState(false)
  const [drawing, setDrawing] = useState(false)
  const [combinaison, setCombinaison] = useState(false)
  const [premiumStones, setPremiumStones] = useState(false)
  const [urgency, setUrgency] = useState(false)

  const handleConfirm = () => {
    onConfirm(skirtFront, skirtBack, decorativeElements, shoulder, aerography, drawing, combinaison, premiumStones, urgency)
  }

  return (
    <div className="additions-checkboxes">
      <h2>Дополнения</h2>
      <div className="checkbox-group">
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={skirtFront}
            onChange={(e) => setSkirtFront(e.target.checked)}
          />
          <span>Юбка спереди</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={skirtBack}
            onChange={(e) => setSkirtBack(e.target.checked)}
          />
          <span>Юбка сзади</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={decorativeElements}
            onChange={(e) => setDecorativeElements(e.target.checked)}
          />
          <span>Декоративные элементы (перья, кожаные вставки, кнопки)</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={shoulder}
            onChange={(e) => setShoulder(e.target.checked)}
          />
          <span>Погон на плечо</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={aerography}
            onChange={(e) => setAerography(e.target.checked)}
          />
          <span>Аэрография (переход цветов, тонировка)</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={drawing}
            onChange={(e) => setDrawing(e.target.checked)}
          />
          <span>Рисунок (персонаж, сцена, другое)</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={combinaison}
            onChange={(e) => setCombinaison(e.target.checked)}
          />
          <span>Комбинезон</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={premiumStones}
            onChange={(e) => setPremiumStones(e.target.checked)}
          />
          <span>Камни Премиум (Swarovski, Preciosa)</span>
        </label>
        <label className="checkbox-label">
          <input
            type="checkbox"
            checked={urgency}
            onChange={(e) => setUrgency(e.target.checked)}
          />
          <span>⚡ Срочность (изготовление макс.3 дня)</span>
        </label>
      </div>
      <div className="actions">
        <button
          onClick={handleConfirm}
          className="btn-primary"
        >
          Продолжить
        </button>
        <button
          onClick={onBack}
          className="btn-secondary"
        >
          Назад
        </button>
      </div>
    </div>
  )
}

export default AdditionsCheckboxes
