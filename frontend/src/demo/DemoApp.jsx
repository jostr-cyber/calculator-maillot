import React, { useState, useEffect } from 'react'
import '../App.css'
import './DemoApp.css'
import { DemoLanguageSwitcher } from './DemoLanguageSwitcher'
import HeightSlider from '../components/HeightSlider'
import DesignSourceSelect from '../components/DesignSourceSelect'
import SleevesSelect from '../components/SleevesSelect'
import SkirtSelect from '../components/SkirtSelect'
import DecorativeElementsSelect from '../components/DecorativeElementsSelect'
import AerographySelect from '../components/AerographySelect'
import CombinaisionSelect from '../components/CombinaisionSelect'
import UrgencySelect from '../components/UrgencySelect'
import RhinestoneSelect from '../components/RhinestoneSelect'
import BudgetSlider from '../components/BudgetSlider'
import DemoWelcome from './DemoWelcome'
import DemoMainColorSelect from './DemoMainColorSelect'
import DemoFabricSelect from './DemoFabricSelect'
import DemoIntro from './DemoIntro'
import DemoFinalResult from './DemoFinalResult'
import DemoSales from './DemoSales'
import DemoBadge from './DemoBadge'
import clientConfig from './clientConfig'
import { getDemoContent } from './demoContent'
import { useTranslation } from '../hooks/useTranslation'
import {
  calculateComplexity,
  calculateEstimatedCrystals,
  calculatePriceLocal,
} from '../utilities/calculationUtils'

// Budget reference from the selected value (mirrors production logic)
const getBudgetRef = (value) => {
  if (!value || value === 'undecided' || value === 'unknown') return { limit: null }
  const limit = value === 'plus' ? 800 : Number(value)
  return !limit || isNaN(limit) ? { limit: null } : { limit }
}

const calculateBudgetComparison = (finalPrice, budgetRef) => {
  if (!budgetRef || budgetRef.limit === null) return { type: 'unknown', message: null }
  const excess = finalPrice - budgetRef.limit
  return excess > 0
    ? { type: 'exceeded', message: `by ${Math.round(excess)}`, excessAmount: excess }
    : { type: 'under', message: null }
}

// Base flow order — middle steps are filtered by clientConfig.availableOptions.
// "mainColor" is a demo-only visual step (no impact on the price engine).
const BASE_STEPS = [
  'height', 'mainColor', 'fabric', 'designSource', 'sleeves', 'skirt', 'decorativeElements',
  'aerography', 'combinaison', 'urgency', 'rhinestone', 'budget',
]

function DemoApp() {
  const { t, language } = useTranslation()
  const dc = getDemoContent(language)

  const flow = ['intro', ...BASE_STEPS.filter((s) => clientConfig.availableOptions?.[s] !== false), 'result']

  const [step, setStep] = useState('welcome')
  const [selectedBudget, setSelectedBudget] = useState(null)
  const [height, setHeight] = useState(150)
  const [heightCategory, setHeightCategory] = useState('150-170')
  const [mainColor, setMainColor] = useState('')
  const [baseFabrics, setBaseFabrics] = useState([])
  const [trustMaster, setTrustMaster] = useState(false)
  const [designSource, setDesignSource] = useState('')
  const [design, setDesign] = useState('')
  const [sleeves, setSleeves] = useState(0)
  const [skirt, setSkirt] = useState('')
  const [decorativeElements, setDecorativeElements] = useState('')
  const [shoulder] = useState('')
  const [aerography, setAerography] = useState('')
  const [combinaison, setCombinaison] = useState('')
  const [premiumStones, setPremiumStones] = useState('')
  const [urgency, setUrgency] = useState('')
  const [rhinestone, setRhinestone] = useState('')

  const [currentPrice, setCurrentPrice] = useState(null)
  const [complexity, setComplexity] = useState(null)
  const [estimatedCrystals, setEstimatedCrystals] = useState(0)
  const [priceResult, setPriceResult] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'auto' }) }, [step])

  // Theme variables driven by clientConfig
  const themeStyle = {
    '--demo-main': clientConfig.mainColor,
    '--demo-main-dark': clientConfig.mainColorDark,
    '--demo-soft': clientConfig.accentSoft,
    '--demo-text': clientConfig.textColor,
    '--demo-card': clientConfig.cardColor,
    '--demo-bg': clientConfig.backgroundStyle,
  }

  const buildConfig = () => ({
    height: heightCategory,
    sleeves: sleeves || 0,
    skirt: skirt || '',
    decorativeElements: decorativeElements || 'nothing',
    shoulder: shoulder || '',
    aerography: aerography || 'nothing',
    combinaison: combinaison || 'standard',
    premiumStones: premiumStones || 'none',
    urgency: urgency || 'none',
    rhinestone: rhinestone || 'none',
    design: design || 'our-design',
    designSource,
  })

  // Live price preview (shared engine)
  useEffect(() => {
    if (step === 'height' || !designSource) return
    const timer = setTimeout(() => {
      const cfg = buildConfig()
      const data = calculatePriceLocal(cfg)
      setCurrentPrice(data.finalPrice)
      setComplexity(calculateComplexity(cfg))
      setEstimatedCrystals(calculateEstimatedCrystals(cfg))
    }, 300)
    return () => clearTimeout(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sleeves, skirt, decorativeElements, aerography, combinaison, urgency, design, designSource, step, heightCategory, premiumStones, rhinestone])

  // Demo-only heading override: replace the production "steps.budget" title with
  // a more actionable phrasing on the budget step (production locales untouched).
  useEffect(() => {
    if (step !== 'budget') return
    const overrides = {
      ru: 'Укажите ваш желаемый бюджет',
      en: "What's your desired budget?",
      es: '¿Cuál es tu presupuesto deseado?',
    }
    const text = overrides[language] || overrides.en
    const apply = () => {
      const h2 = document.querySelector('.demo-app .budget-slider h2')
      if (h2 && h2.textContent !== text) h2.textContent = text
    }
    apply()
    const observer = new MutationObserver(apply)
    observer.observe(document.body, { childList: true, subtree: true, characterData: true })
    return () => observer.disconnect()
  }, [step, language])

  const goNext = () => {
    const i = flow.indexOf(step)
    if (i >= 0 && i < flow.length - 1) setStep(flow[i + 1])
  }
  const goBack = () => {
    const i = flow.indexOf(step)
    if (i > 0) setStep(flow[i - 1])
  }

  const handleHeightChange = (v) => {
    setHeight(v)
    if (v >= 170) setHeightCategory('170+')
    else if (v >= 150) setHeightCategory('150-170')
    else if (v >= 130) setHeightCategory('130-150')
    else setHeightCategory('<130')
  }

  const handleDesignSourceSelect = (source) => {
    setDesignSource(source)
    setDesign('our-design')
    goNext()
  }

  const handleCalculate = (budgetVal = null) => {
    try {
      const cfg = buildConfig()
      const data = calculatePriceLocal(cfg)
      const budgetToUse = budgetVal !== null ? budgetVal : selectedBudget
      data.budgetComparison = calculateBudgetComparison(data.finalPrice, getBudgetRef(budgetToUse))
      setPriceResult(data)
      setStep('result')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleReset = () => {
    setSelectedBudget(null); setHeight(150); setHeightCategory('150-170')
    setMainColor('')
    setBaseFabrics([]); setTrustMaster(false)
    setDesignSource(''); setDesign(''); setSleeves(0); setSkirt('')
    setDecorativeElements(''); setAerography(''); setCombinaison('')
    setPremiumStones(''); setUrgency(''); setRhinestone('')
    setPriceResult(null); setError(null); setCurrentPrice(null)
    setComplexity(null); setEstimatedCrystals(0); setStep('welcome')
  }

  const config = buildConfig()

  if (step === 'welcome') {
    return (
      <div className="demo-app" style={themeStyle}>
        <DemoWelcome onTryDemo={() => setStep('intro')} />
      </div>
    )
  }

  if (step === 'intro') {
    return (
      <div className="demo-app" style={themeStyle}>
        <DemoIntro onStart={() => setStep(flow[1])} onBack={() => setStep('welcome')} />
      </div>
    )
  }

  if (step === 'sales') {
    return (
      <div className="demo-app" style={themeStyle}>
        <DemoSales onRestart={handleReset} />
      </div>
    )
  }

  return (
    <div className="demo-app" style={themeStyle}>
      <DemoLanguageSwitcher />
      <DemoBadge />
      <div className="container">
        <h1 className="demo-step-brand">{dc.atelier.name}</h1>
        <p className="demo-step-sub">{dc.product.calculatorName}</p>
        {error && <div className="error">{t('errors.priceCalculation')}: {error}</div>}

        {step === 'height' && (
          <HeightSlider value={height} onHeightChange={handleHeightChange} onContinue={goNext} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'mainColor' && (
          <DemoMainColorSelect value={mainColor} onColorChange={setMainColor} onContinue={goNext} onBack={goBack} />
        )}
        {step === 'fabric' && (
          <DemoFabricSelect
            baseFabrics={baseFabrics}
            onBaseChange={(arr) => { setBaseFabrics(arr); if (arr.length > 0) setTrustMaster(false) }}
            onContinue={goNext}
            onBack={goBack}
            mainColor={mainColor}
            trustMaster={trustMaster}
            onTrustMaster={() => { setTrustMaster(true); setBaseFabrics([]) }}
            onChangeColor={() => setStep('mainColor')}
          />
        )}
        {step === 'designSource' && (
          <DesignSourceSelect onConfirm={handleDesignSourceSelect} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'sleeves' && (
          <SleevesSelect value={sleeves} onSleevesChange={setSleeves} onContinue={goNext} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'skirt' && (
          <SkirtSelect onSkirtChange={setSkirt} onContinue={goNext} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'decorativeElements' && (
          <DecorativeElementsSelect onDecorativeElementsChange={setDecorativeElements} onContinue={goNext} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'aerography' && (
          <AerographySelect onAerographyChange={setAerography} onContinue={goNext} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'combinaison' && (
          <CombinaisionSelect onCombinaisionChange={setCombinaison} onContinue={() => { setPremiumStones('none'); goNext() }} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'urgency' && (
          <UrgencySelect onUrgencyChange={setUrgency} onContinue={goNext} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'rhinestone' && (
          <RhinestoneSelect value={rhinestone} onRhinestoneChange={setRhinestone} onContinue={goNext} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'budget' && (
          <BudgetSlider value={selectedBudget} onBudgetChange={setSelectedBudget} onContinue={(v) => { setSelectedBudget(v); setTimeout(() => handleCalculate(v), 0) }} onBack={goBack} config={config} currentPrice={currentPrice} complexity={complexity} />
        )}
        {step === 'result' && priceResult && (
          <DemoFinalResult priceResult={priceResult} complexity={complexity} estimatedCrystals={estimatedCrystals} config={config} wheelDiscount={0} selectedBudget={selectedBudget} onCustomizeAgain={handleReset} onProceed={() => setStep('sales')} />
        )}
      </div>
    </div>
  )
}

export default DemoApp
