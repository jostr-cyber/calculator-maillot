import React, { useState } from 'react'
import './App.css'
import API_BASE_URL from './config/api'
import AdminSurveys from './pages/AdminSurveys'
import BudgetSelector from './components/BudgetSelector'
import HeightSlider from './components/HeightSlider'
import SleevesSelect from './components/SleevesSelect'
import SkirtSelect from './components/SkirtSelect'
import DecorativeElementsSelect from './components/DecorativeElementsSelect'
import AerographySelect from './components/AerographySelect'
import CombinaisionSelect from './components/CombinaisionSelect'
import UrgencySelect from './components/UrgencySelect'
import DesignSelect from './components/DesignSelect'
import Survey from './components/Survey'
import WheelOfFortune from './components/WheelOfFortune'
import PriceBreakdown from './components/PriceBreakdown'
import EmailConfirmation from './components/EmailConfirmation'
import ContactPreference from './components/ContactPreference'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { useTranslation } from './hooks/useTranslation'

// Budget reference levels for comparison only - do NOT affect pricing
const BUDGET_REFERENCE = {
  'under-250': { limit: 250, key: 'under-250' },
  'around-400': { limit: 400, key: 'around-400' },
  'around-800': { limit: 800, key: 'around-800' },
  'unknown': { limit: null, key: 'unknown' }
}

// Helper function to calculate budget comparison message
const calculateBudgetComparison = (finalPrice, budgetRef) => {
  if (!budgetRef || budgetRef.limit === null) {
    return {
      type: 'unknown',
      message: null
    }
  }

  const excess = finalPrice - budgetRef.limit
  if (excess > 0) {
    return {
      type: 'exceeded',
      message: excess > 0 ? `by ${Math.round(excess)}` : null,
      excessAmount: excess
    }
  } else {
    return {
      type: 'under',
      message: null
    }
  }
}

function App() {
  const { t } = useTranslation()
  const [step, setStep] = useState('budget')
  const [selectedBudget, setSelectedBudget] = useState(null) // Budget reference for comparison only
  const [height, setHeight] = useState(150)
  const [sleeves, setSleeves] = useState('')
  const [skirt, setSkirt] = useState('')
  const [decorativeElements, setDecorativeElements] = useState('')
  const [shoulder, setShoulder] = useState('')
  const [aerography, setAerography] = useState('')
  const [combinaison, setCombinaison] = useState('')
  const [premiumStones, setPremiumStones] = useState('')
  const [urgency, setUrgency] = useState('')
  const [design, setDesign] = useState('')
  const [priceResult, setPriceResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [wheelDiscount, setWheelDiscount] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState(null)
  const [returnedFromResult, setReturnedFromResult] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [contactMethod, setContactMethod] = useState('')
  const [contactValue, setContactValue] = useState('')

  const handleBudgetSelect = (budgetValue) => {
    // Budget is for reference only, doesn't affect pricing
    setSelectedBudget(budgetValue)
    setStep('height')
  }

  const handleHeightChange = (heightValue) => {
    setHeight(heightValue)
  }

  const handleHeightContinue = () => {
    setStep('design')
  }

  const handleSleevesChange = (sleevesValue) => {
    setSleeves(sleevesValue)
  }

  const handleSleevesContinue = () => {
    setStep('skirt')
  }

  const handleBack = () => {
    const steps = ['budget', 'height', 'design', 'sleeves', 'skirt', 'decorativeElements', 'aerography', 'combinaison', 'premiumStones', 'urgency', 'survey', 'wheelOfFortune', 'result', 'emailConfirmation', 'contactPreference']
    const currentIndex = steps.indexOf(step)
    if (currentIndex > 0) {
      setStep(steps[currentIndex - 1])
    }
  }

  const handleSurveyConfirm = async (answers) => {
    setSurveyAnswers(answers)
    setLoading(true)
    setError(null)

    try {
      let heightCategory
      if (height >= 170) {
        heightCategory = '170+'
      } else if (height >= 150) {
        heightCategory = '150-170'
      } else if (height >= 130) {
        heightCategory = '130-150'
      } else {
        heightCategory = '<130'
      }

      const response = await fetch(`${API_BASE_URL}/api/calculate-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          height: heightCategory,
          sleeves: sleeves === '' ? 0 : parseInt(sleeves),
          skirt,
          decorativeElements,
          shoulder,
          aerography,
          combinaison,
          premiumStones,
          urgency,
          design
        })
      })

      if (!response.ok) {
        throw new Error('Failed to calculate price')
      }

      const data = await response.json()

      // Debug logging
      console.log('🔍 Price Calculation Result:', {
        finalPrice: data.finalPrice,
        selectedBudget: selectedBudget
      })

      // Calculate budget comparison
      const budgetRef = BUDGET_REFERENCE[selectedBudget]
      const comparison = calculateBudgetComparison(data.finalPrice, budgetRef)

      // Add comparison info to result
      data.budgetComparison = comparison

      // Skip wheel of fortune - go directly to result
      console.log('✅ Skipping wheel of fortune - going to result')
      setPriceResult(data)
      setStep('result')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleDesignChangeFromResult = async (designValue) => {
    // This function is called when returning from result and changing design
    // It skips survey/wheel and directly calculates with the new design value
    setLoading(true)
    setError(null)

    try {
      let heightCategory
      if (height >= 170) {
        heightCategory = '170+'
      } else if (height >= 150) {
        heightCategory = '150-170'
      } else if (height >= 130) {
        heightCategory = '130-150'
      } else {
        heightCategory = '<130'
      }

      const response = await fetch(`${API_BASE_URL}/api/calculate-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          height: heightCategory,
          sleeves: sleeves === '' ? 0 : parseInt(sleeves),
          skirt,
          decorativeElements,
          shoulder,
          aerography,
          combinaison,
          premiumStones,
          urgency,
          design: designValue
        })
      })

      if (!response.ok) {
        throw new Error('Failed to calculate price')
      }

      const data = await response.json()

      // Calculate budget comparison
      const budgetRef = BUDGET_REFERENCE[selectedBudget]
      const comparison = calculateBudgetComparison(data.finalPrice, budgetRef)
      data.budgetComparison = comparison

      // Skip survey and wheel, go directly to result with saved discount
      console.log(`✅ Returning from result - skipping survey and wheel, applying saved discount ${wheelDiscount}%`)
      setPriceResult(data)
      setStep('result')
      setReturnedFromResult(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleCalculate = async (urgencyVal = urgency) => {
    setLoading(true)
    setError(null)

    try {
      let heightCategory
      if (height >= 170) {
        heightCategory = '170+'
      } else if (height >= 150) {
        heightCategory = '150-170'
      } else if (height >= 130) {
        heightCategory = '130-150'
      } else {
        heightCategory = '<130'
      }

      const response = await fetch(`${API_BASE_URL}/api/calculate-price`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          height: heightCategory,
          sleeves: sleeves === '' ? 0 : parseInt(sleeves),
          skirt,
          decorativeElements,
          shoulder,
          aerography,
          combinaison,
          premiumStones,
          urgency: urgencyVal,
          design
        })
      })

      if (!response.ok) {
        throw new Error('Failed to calculate price')
      }

      const data = await response.json()

      // Calculate budget comparison
      const budgetRef = BUDGET_REFERENCE[selectedBudget]
      const comparison = calculateBudgetComparison(data.finalPrice, budgetRef)
      data.budgetComparison = comparison

      // Debug logging
      console.log('🔍 Price Calculation Result:', {
        finalPrice: data.finalPrice,
        selectedBudget: selectedBudget
      })

      // Skip survey and go directly to result
      console.log('✅ Skipping survey - going directly to result')
      setPriceResult(data)
      setStep('result')
      setReturnedFromResult(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleEmailConfirmationContinue = () => {
    setStep('contactPreference')
  }

  const handleContactPreferenceContinue = async (preferences) => {
    setLoading(true)
    setError(null)

    try {
      // Store contact preferences
      setContactMethod(preferences.method)
      setContactValue(preferences.value)

      // Send final order data to backend
      const orderData = {
        email: userEmail,
        contactMethod: preferences.method,
        contactValue: preferences.value,
        selectedBudget,
        height,
        sleeves,
        skirt,
        decorativeElements,
        shoulder,
        aerography,
        combinaison,
        premiumStones,
        urgency,
        design,
        priceResult,
        wheelDiscount,
        surveyAnswers
      }

      // Log the data being sent
      console.log('📤 Sending order data:', orderData)

      // Optional: Send to backend API
      // const response = await fetch('/api/submit-order', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(orderData)
      // })
      // if (!response.ok) throw new Error('Failed to submit order')

      // For now, just reset and go back to budget
      handleReset()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedBudget(null)
    setHeight(150)
    setSleeves('')
    setSkirt('')
    setDecorativeElements('')
    setShoulder('')
    setAerography('')
    setCombinaison('')
    setPremiumStones('')
    setUrgency('')
    setDesign('')
    setPriceResult(null)
    setError(null)
    // NOTE: Intentionally NOT clearing wheelDiscount here so it persists across "Start Over"
    // Users keep their won discount even if they select a different budget
    // setWheelDiscount(0)
    setBudgetExceeded(false)
    setSurveyAnswers(null)
    setReturnedFromResult(false)
    setUserEmail('')
    setContactMethod('')
    setContactValue('')
    setStep('budget')
  }

  // Check if admin route
  if (window.location.pathname === '/admin') {
    return <AdminSurveys />
  }

  return (
    <div className="app">
      <LanguageSwitcher />
      <div className="container">
        <h1>{t('app.title')}</h1>

        {error && <div className="error">{t('errors.priceCalculation')}: {error}</div>}

        {step === 'budget' && (
          <BudgetSelector onSelect={handleBudgetSelect} />
        )}

        {step === 'height' && (
          <HeightSlider value={height} onHeightChange={handleHeightChange} onContinue={handleHeightContinue} onBack={handleBack} />
        )}

        {step === 'sleeves' && (
          <SleevesSelect value={sleeves} onSleevesChange={handleSleevesChange} onContinue={handleSleevesContinue} onBack={handleBack} />
        )}

        {step === 'skirt' && (
          <SkirtSelect onConfirm={(val) => { setSkirt(val); setStep('decorativeElements') }} onBack={handleBack} />
        )}

        {step === 'decorativeElements' && (
          <DecorativeElementsSelect onConfirm={(val) => { setDecorativeElements(val); setStep('aerography') }} onBack={handleBack} />
        )}

        {step === 'aerography' && (
          <AerographySelect onConfirm={(val) => { setAerography(val); setStep('combinaison') }} onBack={handleBack} />
        )}

        {step === 'combinaison' && (
          <CombinaisionSelect onConfirm={(val) => {
            setCombinaison(val)
            setPremiumStones('none')
            setStep('urgency')
          }} onBack={handleBack} />
        )}

        {step === 'urgency' && (
          <UrgencySelect budget={budget} onConfirm={(val) => {
            setUrgency(val)
            handleCalculate(val)
          }} onBack={handleBack} />
        )}

        {step === 'design' && (
          <DesignSelect onConfirm={(val) => {
            setDesign(val)
            setStep('sleeves')
          }} onBack={handleBack} />
        )}

        {step === 'survey' && (
          <Survey
            onConfirm={handleSurveyConfirm}
            onBack={handleBack}
          />
        )}

        {/* Wheel of Fortune temporarily hidden */}
        {/* {step === 'wheelOfFortune' && priceResult && (
          <>
            <WheelOfFortune
              budget={budget}
              currentPrice={priceResult.finalPrice}
              onDiscountApplied={(discount) => {
                setWheelDiscount(discount)
                setStep('result')
              }}
              size={budgetExceeded ? 'large' : 'small'}
            />
          </>
        )} */}

        {step === 'result' && priceResult && (
          <>
            <PriceBreakdown
              data={priceResult}
              wheelDiscount={wheelDiscount}
            />
            <div className="actions">
              <button
                onClick={handleReset}
                className="btn-secondary"
              >
                {t('buttons.recalculate')}
              </button>
              <button
                onClick={() => {
                  window.open('https://wa.me/34670770024?text=I%20want%20to%20order%20a%20leotard', '_blank')
                }}
                className="btn-primary"
              >
                {t('buttons.orderWhatsApp')}
              </button>
            </div>
          </>
        )}

        {step === 'emailConfirmation' && (
          <EmailConfirmation
            email={userEmail}
            onEmailChange={setUserEmail}
            onContinue={handleEmailConfirmationContinue}
          />
        )}

        {step === 'contactPreference' && (
          <ContactPreference
            onContinue={handleContactPreferenceContinue}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  )
}

export default App
