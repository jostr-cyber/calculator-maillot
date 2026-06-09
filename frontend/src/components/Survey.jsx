import React, { useState } from 'react'
import { useTranslation } from '../hooks/useTranslation'
import './Survey.css'

function Survey({ onConfirm, onBack }) {
  const { t } = useTranslation()
  // Question 1: How found
  const [howFound, setHowFound] = useState([])

  // Question 2: What's important (single choice)
  const [importance, setImportance] = useState('')

  // Question 3: Other influence (optional)
  const [otherInfluence, setOtherInfluence] = useState('')

  // Question 4: Age (single choice)
  const [age, setAge] = useState('')

  // Question 5: Who you are
  const [whoYouAre, setWhoYouAre] = useState([])

  // Question 6: Email (mandatory)
  const [email, setEmail] = useState('')


  const isEmailValid = (emailValue) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(emailValue)
  }

  const isFormValid = () => {
    return (
      howFound.length > 0 &&
      importance !== '' &&
      age !== '' &&
      whoYouAre.length > 0 &&
      email !== '' &&
      isEmailValid(email)
    )
  }

  const handleHowFoundChange = (value) => {
    setHowFound(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const handleWhoYouAreChange = (value) => {
    setWhoYouAre(prev =>
      prev.includes(value)
        ? prev.filter(v => v !== value)
        : [...prev, value]
    )
  }

  const handleSubmit = () => {
    if (!isFormValid()) return

    const surveyData = {
      howFound,
      importance,
      otherInfluence,
      age,
      whoYouAre,
      email
    }

    // Log to console
    console.group('📋 Leotard Survey Response')
    console.log('Timestamp:', new Date().toISOString())
    console.log('Email:', surveyData.email)
    console.log('How Found:', surveyData.howFound)
    console.log('Importance:', surveyData.importance)
    console.log('Other Influence:', surveyData.otherInfluence)
    console.log('Age:', surveyData.age)
    console.log('Who You Are:', surveyData.whoYouAre)
    console.groupEnd()

    // Save to localStorage
    localStorage.setItem('leotardSurvey', JSON.stringify({
      timestamp: new Date().toISOString(),
      ...surveyData
    }))

    // Send to backend (non-blocking)
    fetch('/api/survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        surveyAnswers: surveyData,
        timestamp: new Date().toISOString()
      })
    }).catch(err => {
      console.error('Failed to send survey to backend:', err)
      // Graceful failure - continue anyway
    })

    // Call the callback
    onConfirm(surveyData)
  }

  return (
    <div className="survey-wrapper">
      <div className="survey-header">
        <h2>{t('steps.survey')}</h2>
        <p className="survey-intro">{t('survey.intro')}</p>
      </div>

      <div className="survey-form">
        {/* Question 1: How found */}
        <div className="survey-section">
          <div className="survey-question">
            <span className="mandatory-indicator">*</span> {t('survey.howFound.question')}
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={howFound.includes('social_media')}
                onChange={() => handleHowFoundChange('social_media')}
              />
              <span>{t('survey.howFound.socialMedia')}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={howFound.includes('real_life')}
                onChange={() => handleHowFoundChange('real_life')}
              />
              <span>{t('survey.howFound.realLife')}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={howFound.includes('random')}
                onChange={() => handleHowFoundChange('random')}
              />
              <span>{t('survey.howFound.random')}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={howFound.includes('friends')}
                onChange={() => handleHowFoundChange('friends')}
              />
              <span>{t('survey.howFound.friends')}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={howFound.includes('other')}
                onChange={() => handleHowFoundChange('other')}
              />
              <span>{t('survey.howFound.other')}</span>
            </label>
          </div>
          {howFound.length === 0 && (
            <div className="validation-error">{t('survey.validations.selectOne')}</div>
          )}
        </div>

        {/* Question 2: What's important */}
        <div className="survey-section">
          <div className="survey-question">
            <span className="mandatory-indicator">*</span> {t('survey.importance.question')}
          </div>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="importance"
                value="price"
                checked={importance === 'price'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.price')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="manufacturing_time"
                checked={importance === 'manufacturing_time'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.deadline')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="fast_delivery"
                checked={importance === 'fast_delivery'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.delivery')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="beautiful_design"
                checked={importance === 'beautiful_design'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.design')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="wow_effect"
                checked={importance === 'wow_effect'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.wowEffect')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="good_fit"
                checked={importance === 'good_fit'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.fit')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="gymnast_preference"
                checked={importance === 'gymnast_preference'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.daughter')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="artistry_marks"
                checked={importance === 'artistry_marks'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.score')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="importance"
                value="other"
                checked={importance === 'other'}
                onChange={(e) => setImportance(e.target.value)}
              />
              <span>{t('survey.importance.other')}</span>
            </label>
          </div>
          {importance === '' && (
            <div className="validation-error">{t('survey.validations.selectOneOption')}</div>
          )}
        </div>

        {/* Question 3: Other influence (optional) */}
        <div className="survey-section">
          <div className="survey-question">{t('survey.otherInfluence.question')}</div>
          <textarea
            value={otherInfluence}
            onChange={(e) => setOtherInfluence(e.target.value)}
            placeholder={t('survey.otherInfluence.placeholder')}
            className="survey-textarea"
          ></textarea>
          <p className="optional-note">{t('survey.otherInfluence.optional')}</p>
        </div>

        {/* Question 4: Age */}
        <div className="survey-section">
          <div className="survey-question">
            <span className="mandatory-indicator">*</span> {t('survey.age.question')}
          </div>
          <div className="radio-group">
            <label>
              <input
                type="radio"
                name="age"
                value="18-25"
                checked={age === '18-25'}
                onChange={(e) => setAge(e.target.value)}
              />
              <span>{t('survey.age.range1')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="age"
                value="26-35"
                checked={age === '26-35'}
                onChange={(e) => setAge(e.target.value)}
              />
              <span>{t('survey.age.range2')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="age"
                value="36-45"
                checked={age === '36-45'}
                onChange={(e) => setAge(e.target.value)}
              />
              <span>{t('survey.age.range3')}</span>
            </label>
            <label>
              <input
                type="radio"
                name="age"
                value="46+"
                checked={age === '46+'}
                onChange={(e) => setAge(e.target.value)}
              />
              <span>{t('survey.age.range4')}</span>
            </label>
          </div>
          {age === '' && (
            <div className="validation-error">{t('survey.validations.selectOneOption')}</div>
          )}
        </div>

        {/* Question 5: Who you are */}
        <div className="survey-section">
          <div className="survey-question">
            <span className="mandatory-indicator">*</span> {t('survey.whoYouAre.question')}
          </div>
          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                checked={whoYouAre.includes('mom')}
                onChange={() => handleWhoYouAreChange('mom')}
              />
              <span>{t('survey.whoYouAre.mother')}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={whoYouAre.includes('coach')}
                onChange={() => handleWhoYouAreChange('coach')}
              />
              <span>{t('survey.whoYouAre.coach')}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={whoYouAre.includes('judge')}
                onChange={() => handleWhoYouAreChange('judge')}
              />
              <span>{t('survey.whoYouAre.judge')}</span>
            </label>
            <label>
              <input
                type="checkbox"
                checked={whoYouAre.includes('other')}
                onChange={() => handleWhoYouAreChange('other')}
              />
              <span>{t('survey.whoYouAre.other')}</span>
            </label>
          </div>
          {whoYouAre.length === 0 && (
            <div className="validation-error">{t('survey.validations.selectOne')}</div>
          )}
        </div>

        {/* Question 6: Email (mandatory) */}
        <div className="survey-section">
          <div className="survey-question">
            <span className="mandatory-indicator">*</span> {t('survey.email.question')}
          </div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('survey.email.placeholder')}
            className="survey-input"
          />
          {email === '' && (
            <div className="validation-error">{t('survey.validations.enterEmail')}</div>
          )}
          {email !== '' && !isEmailValid(email) && (
            <div className="validation-error">{t('survey.validations.validEmail')}</div>
          )}
        </div>

      </div>

      {/* Actions */}
      <div className="survey-actions">
        <button
          onClick={handleSubmit}
          disabled={!isFormValid()}
          className="btn-primary"
        >
          {isFormValid() ? t('buttons.continue') : 'Заполните обязательные поля'}
        </button>
        <button onClick={onBack} className="btn-secondary">
          {t('buttons.back')}
        </button>
      </div>
    </div>
  )
}

export default Survey
