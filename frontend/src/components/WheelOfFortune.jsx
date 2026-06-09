import React, { useState, useRef, useEffect } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './WheelOfFortune.css'

function WheelOfFortune({ budget, currentPrice, onDiscountApplied, size = 'small' }) {
  const { t } = useTranslation()
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedDiscount, setSelectedDiscount] = useState(null)
  const [hasSpun, setHasSpun] = useState(false)
  const canvasRef = useRef(null)

  // Determine discount options based on size (budget exceeded or not)
  const discountOptions = [3, 5, 7, 10, 15]

  // Draw the wheel
  useEffect(() => {
    drawWheel()
  }, [discountOptions])

  const drawWheel = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    const radius = canvas.width / 2
    const sliceAngle = (2 * Math.PI) / discountOptions.length

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw wheel segments
    discountOptions.forEach((discount, index) => {
      const startAngle = index * sliceAngle
      const endAngle = (index + 1) * sliceAngle

      // Draw segment
      ctx.beginPath()
      ctx.arc(radius, radius, radius - 10, startAngle, endAngle)
      ctx.lineTo(radius, radius)
      ctx.fillStyle = getSegmentColor(index)
      ctx.fill()

      // Draw border
      ctx.strokeStyle = 'white'
      ctx.lineWidth = 2
      ctx.stroke()

      // Draw text
      ctx.save()
      ctx.translate(radius, radius)
      ctx.rotate(startAngle + sliceAngle / 2)
      ctx.textAlign = 'right'
      ctx.fillStyle = 'white'
      ctx.font = 'bold 18px Arial'
      ctx.fillText(`${discount}%`, radius - 30, 8)
      ctx.restore()
    })

    // Draw center circle
    ctx.beginPath()
    ctx.arc(radius, radius, 20, 0, 2 * Math.PI)
    ctx.fillStyle = '#990099'
    ctx.fill()
    ctx.strokeStyle = 'white'
    ctx.lineWidth = 2
    ctx.stroke()

    // Draw pointer
    ctx.beginPath()
    ctx.moveTo(radius, 10)
    ctx.lineTo(radius - 10, 30)
    ctx.lineTo(radius + 10, 30)
    ctx.closePath()
    ctx.fillStyle = '#FFD700'
    ctx.fill()
    ctx.strokeStyle = '#FFA500'
    ctx.lineWidth = 2
    ctx.stroke()
  }

  const getSegmentColor = (index) => {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8', '#F7DC6F']
    return colors[index % colors.length]
  }

  const handleSpin = () => {
    if (isSpinning || hasSpun) return

    setIsSpinning(true)
    const spins = 5 + Math.random() * 5 // 5-10 full rotations
    const randomIndex = Math.floor(Math.random() * discountOptions.length)
    const selectedDiscount = discountOptions[randomIndex]

    const canvas = canvasRef.current
    const startRotation = 0
    const endRotation = spins * 360 + (randomIndex * (360 / discountOptions.length))

    let currentRotation = startRotation
    const duration = 3000 // 3 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeProgress = 1 - Math.pow(1 - progress, 3)

      currentRotation = startRotation + (endRotation - startRotation) * easeProgress

      // Apply rotation
      canvas.style.transform = `rotate(${currentRotation}deg)`

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsSpinning(false)
        setSelectedDiscount(selectedDiscount)
        setHasSpun(true)
        onDiscountApplied(selectedDiscount)
      }
    }

    requestAnimationFrame(animate)
  }

  return (
    <div className={`wheel-of-fortune ${size}`}>
      <h3>{t('steps.wheel')}</h3>
      <p className="wheel-description">
        {t('wheel.description')}
      </p>

      <div className="wheel-container">
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="wheel-canvas"
        ></canvas>
      </div>

      <div className="wheel-controls">
        <button
          onClick={handleSpin}
          disabled={isSpinning || hasSpun}
          className="spin-button"
        >
          {hasSpun ? t('buttons.spun') : isSpinning ? t('buttons.spinning') : t('buttons.spin')}
        </button>
      </div>

      {selectedDiscount !== null && (
        <div className="result-display">
          <div className="result-text">
            {t('wheel.result', { discount: selectedDiscount })}
          </div>
          <p className="result-amount">
            {t('wheel.resultAmount', { amount: Math.round(currentPrice * selectedDiscount / 100) })}
          </p>
        </div>
      )}
    </div>
  )
}

export default WheelOfFortune
