import React, { useState, useEffect } from 'react'
import './App.css'
import API_BASE_URL from './config/api'
import AdminSurveys from './pages/AdminSurveys'
import Intro from './components/Intro'
import BudgetSelector from './components/BudgetSelector'
import HeightSlider from './components/HeightSlider'
import SleevesSelect from './components/SleevesSelect'
import SkirtSelect from './components/SkirtSelect'
import DecorativeElementsSelect from './components/DecorativeElementsSelect'
import AerographySelect from './components/AerographySelect'
import CombinaisionSelect from './components/CombinaisionSelect'
import UrgencySelect from './components/UrgencySelect'
import DesignSourceSelect from './components/DesignSourceSelect'
import Survey from './components/Survey'
import WheelOfFortune from './components/WheelOfFortune'
import FinalResult from './components/FinalResult'
import PriceBreakdown from './components/PriceBreakdown'
import EmailConfirmation from './components/EmailConfirmation'
import ContactPreference from './components/ContactPreference'
import { LanguageSwitcher } from './components/LanguageSwitcher'
import { useTranslation } from './hooks/useTranslation'
import {
  calculateComplexity,
  calculateEstimatedCrystals,
  calculateCurrentPrice,
  calculatePriceLocal,
  getProductionTime
} from './utilities/calculationUtils'

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

  // Main configuration state
  const [step, setStep] = useState('intro')
  const [selectedBudget, setSelectedBudget] = useState(null)
  const [height, setHeight] = useState(150)
  const [heightCategory, setHeightCategory] = useState('150-170')
  const [designSource, setDesignSource] = useState('')
  const [design, setDesign] = useState('')
  const [sleeves, setSleeves] = useState(0)
  const [skirt, setSkirt] = useState('')
  const [decorativeElements, setDecorativeElements] = useState('')
  const [shoulder, setShoulder] = useState('')
  const [aerography, setAerography] = useState('')
  const [combinaison, setCombinaison] = useState('')
  const [premiumStones, setPremiumStones] = useState('')
  const [urgency, setUrgency] = useState('')

  // Price and results state
  const [currentPrice, setCurrentPrice] = useState(null)
  const [complexity, setComplexity] = useState(null)
  const [estimatedCrystals, setEstimatedCrystals] = useState(0)
  const [priceResult, setPriceResult] = useState(null)

  // UI state
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [wheelDiscount, setWheelDiscount] = useState(0)
  const [surveyAnswers, setSurveyAnswers] = useState(null)
  const [returnedFromResult, setReturnedFromResult] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [contactMethod, setContactMethod] = useState('')
  const [contactValue, setContactValue] = useState('')

  // Step order: intro -> height -> designSource -> sleeves -> skirt -> decorativeElements -> aerography -> combinaison -> urgency -> budget (for comparison) -> survey -> result
  const steps = [
    'intro',
    'height',
    'designSource',
    'sleeves',
    'skirt',
    'decorativeElements',
    'aerography',
    'combinaison',
    'urgency',
    'budget',
    'survey',
    'result',
    'emailConfirmation',
    'contactPreference'
  ]

  // Calculate current price whenever configuration changes (debounced)
  useEffect(() => {
    if (step === 'budget' || step === 'height' || !designSource) {
      return // Skip if not ready
    }

    const config = {
      height: heightCategory,
      sleeves: sleeves || 0,
      skirt: skirt || '',
      decorativeElements: decorativeElements || 'nothing',
      shoulder: shoulder || '',
      aerography: aerography || 'nothing',
      combinaison: combinaison || 'standard',
      premiumStones: premiumStones || 'none',
      urgency: urgency || 'none',
      design: design || 'our-design'
    }

    // Debounce price calculation
    const timer = setTimeout(() => {
      const data = calculatePriceLocal(config)
      setCurrentPrice(data.finalPrice)
      const complexityLevel = calculateComplexity(config)
      setComplexity(complexityLevel)
      const crystals = calculateEstimatedCrystals(config)
      setEstimatedCrystals(crystals)
    }, 300)

    return () => clearTimeout(timer)
  }, [sleeves, skirt, decorativeElements, aerography, combinaison, urgency, design, designSource, step, heightCategory, shoulder, premiumStones])

  const calculatePriceAsync = async (urgencyVal = urgency) => {
    const config = {
      height: heightCategory,
      sleeves: sleeves || 0,
      skirt: skirt || '',
      decorativeElements: decorativeElements || 'nothing',
      shoulder: shoulder || '',
      aerography: aerography || 'nothing',
      combinaison: combinaison || 'standard',
      premiumStones: premiumStones || 'none',
      urgency: urgencyVal || 'none',
      design: design || 'our-design'
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/calculate-price`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (!response.ok) {
        throw new Error('Failed to calculate price')
      }

      const data = await response.json()

      // Calculate budget comparison
      const budgetRef = BUDGET_REFERENCE[selectedBudget]
      const comparison = calculateBudgetComparison(data.finalPrice, budgetRef)
      data.budgetComparison = comparison

      setPriceResult(data)
      setStep('result')
      setReturnedFromResult(false)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  const handleIntroStart = () => {
    setStep('height')
  }

  const handleBudgetSelect = (budgetValue) => {
    setSelectedBudget(budgetValue)
    setStep('survey')
  }

  const handleHeightChange = (heightValue) => {
    setHeight(heightValue)
    // Calculate height category
    if (heightValue >= 170) {
      setHeightCategory('170+')
    } else if (heightValue >= 150) {
      setHeightCategory('150-170')
    } else if (heightValue >= 130) {
      setHeightCategory('130-150')
    } else {
      setHeightCategory('<130')
    }
  }

  const handleHeightContinue = () => {
    setStep('designSource')
  }

  const handleDesignSourceSelect = (source) => {
    setDesignSource(source)
    setDesign('our-design') // Default to our design
    setStep('sleeves')
  }

  const handleDesignSelect = (designValue) => {
    setDesign(designValue)
    setStep('sleeves')
  }

  const handleSleevesChange = (sleevesValue) => {
    setSleeves(sleevesValue)
  }

  const handleSleevesContinue = () => {
    setStep('skirt')
  }

  const handleBack = () => {
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
      const config = {
        height: heightCategory,
        sleeves: sleeves || 0,
        skirt: skirt || '',
        decorativeElements: decorativeElements || 'nothing',
        shoulder: shoulder || '',
        aerography: aerography || 'nothing',
        combinaison: combinaison || 'standard',
        premiumStones: premiumStones || 'none',
        urgency: urgency || 'none',
        design: design || 'our-design',
        designSource: designSource || 'our-design'
      }

      const data = calculatePriceLocal(config)

      // Calculate budget comparison
      const budgetRef = BUDGET_REFERENCE[selectedBudget]
      const comparison = calculateBudgetComparison(data.finalPrice, budgetRef)
      data.budgetComparison = comparison

      setPriceResult(data)
      setStep('result')
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
      const config = {
        height: heightCategory,
        sleeves: sleeves || 0,
        skirt: skirt || '',
        decorativeElements: decorativeElements || 'nothing',
        shoulder: shoulder || '',
        aerography: aerography || 'nothing',
        combinaison: combinaison || 'standard',
        premiumStones: premiumStones || 'none',
        urgency: urgencyVal || 'none',
        design: design || 'our-design',
        designSource: designSource || 'our-design'
      }

      const data = calculatePriceLocal(config)

      // Calculate budget comparison
      const budgetRef = BUDGET_REFERENCE[selectedBudget]
      const comparison = calculateBudgetComparison(data.finalPrice, budgetRef)
      data.budgetComparison = comparison

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
      setContactMethod(preferences.method)
      setContactValue(preferences.value)

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
        designSource,
        priceResult,
        wheelDiscount,
        surveyAnswers
      }

      console.log('📤 Sending order data:', orderData)
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
    setDesignSource('')
    setDesign('')
    setSleeves(0)
    setSkirt('')
    setDecorativeElements('')
    setShoulder('')
    setAerography('')
    setCombinaison('')
    setPremiumStones('')
    setUrgency('')
    setPriceResult(null)
    setError(null)
    setSurveyAnswers(null)
    setReturnedFromResult(false)
    setUserEmail('')
    setContactMethod('')
    setContactValue('')
    setCurrentPrice(null)
    setComplexity(null)
    setEstimatedCrystals(0)
    setStep('intro')
  }

  // Check if admin route
  if (window.location.pathname === '/admin') {
    return <AdminSurveys />
  }

  const config = {
    height: heightCategory,
    sleeves,
    skirt,
    decorativeElements,
    shoulder,
    aerography,
    combinaison,
    premiumStones,
    urgency,
    design,
    designSource
  }

  return (
    <div className="app">
      {step === 'intro' ? (
        <Intro onStart={handleIntroStart} />
      ) : (
        <>
          <LanguageSwitcher />
          <div className="container">
            <h1>{t('app.title')}</h1>

            {error && <div className="error">{t('errors.priceCalculation')}: {error}</div>}
            {loading && <div className="loading">{t('loading') || 'Loading...'}</div>}

            {step === 'height' && (
          <HeightSlider
            value={height}
            onHeightChange={handleHeightChange}
            onContinue={handleHeightContinue}
            onBack={handleBack}
            config={config}
            currentPrice={currentPrice}
            complexity={complexity}
          />
        )}

        {step === 'designSource' && (
          <DesignSourceSelect
            onConfirm={handleDesignSourceSelect}
            onBack={handleBack}
          />
        )}

        {step === 'sleeves' && (
          <SleevesSelect
            value={sleeves}
            onSleevesChange={handleSleevesChange}
            onContinue={handleSleevesContinue}
            onBack={handleBack}
            config={config}
            currentPrice={currentPrice}
            complexity={complexity}
          />
        )}

        {step === 'skirt' && (
          <SkirtSelect
            onConfirm={(val) => { setSkirt(val); setStep('decorativeElements') }}
            onBack={handleBack}
            config={config}
            currentPrice={currentPrice}
            complexity={complexity}
          />
        )}

        {step === 'decorativeElements' && (
          <DecorativeElementsSelect
            onConfirm={(val) => { setDecorativeElements(val); setStep('aerography') }}
            onBack={handleBack}
            config={config}
            currentPrice={currentPrice}
            complexity={complexity}
          />
        )}

        {step === 'aerography' && (
          <AerographySelect
            onConfirm={(val) => { setAerography(val); setStep('combinaison') }}
            onBack={handleBack}
            config={config}
            currentPrice={currentPrice}
            complexity={complexity}
          />
        )}

        {step === 'combinaison' && (
          <CombinaisionSelect
            onConfirm={(val) => {
              setCombinaison(val)
              setPremiumStones('none')
              setStep('urgency')
            }}
            onBack={handleBack}
            config={config}
            currentPrice={currentPrice}
            complexity={complexity}
          />
        )}

        {step === 'urgency' && (
          <UrgencySelect
            onConfirm={(val) => {
              setUrgency(val)
              handleCalculate(val)
            }}
            onBack={handleBack}
            config={config}
            currentPrice={currentPrice}
            complexity={complexity}
          />
        )}

        {step === 'budget' && (
          <BudgetSelector onSelect={handleBudgetSelect} />
        )}

        {step === 'survey' && (
          <Survey
            onConfirm={handleSurveyConfirm}
            onBack={handleBack}
          />
        )}

        {step === 'result' && priceResult && (
          <FinalResult
            priceResult={priceResult}
            complexity={complexity}
            estimatedCrystals={estimatedCrystals}
            config={config}
            wheelDiscount={wheelDiscount}
            selectedBudget={selectedBudget}
            onCustomizeAgain={handleReset}
            onReducePrice={() => {
              alert('Would you like to reduce your selection to lower the price? Click Customize again to adjust your options.');
            }}
          />
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
        </>
      )}
    </div>
  )
}

export default App
