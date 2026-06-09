import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import crypto from 'crypto'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Generate a simple UUID-like ID
 */
function generateId() {
  return crypto.randomBytes(16).toString('hex').substring(0, 12) + Date.now().toString(36)
}

const DATA_DIR = path.join(__dirname, '..', 'data')
const SURVEYS_FILE = path.join(DATA_DIR, 'surveys.json')

/**
 * Initialize survey storage: ensure directory and file exist
 */
export function initializeSurveyStorage() {
  try {
    // Create data directory if it doesn't exist
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
      console.log(`[Survey Storage] Created data directory: ${DATA_DIR}`)
    }

    // Create surveys.json if it doesn't exist
    if (!fs.existsSync(SURVEYS_FILE)) {
      const initialData = { surveys: [] }
      fs.writeFileSync(SURVEYS_FILE, JSON.stringify(initialData, null, 2))
      console.log(`[Survey Storage] Created surveys.json file: ${SURVEYS_FILE}`)
    }
  } catch (error) {
    console.error('[Survey Storage] Error initializing storage:', error.message)
  }
}

/**
 * Save a survey response to the JSON file
 */
export function saveSurvey(surveyData) {
  try {
    // Validate required fields
    if (!surveyData.email || !surveyData.email.trim()) {
      throw new Error('Survey must include email')
    }

    // Read existing surveys
    let data = { surveys: [] }
    if (fs.existsSync(SURVEYS_FILE)) {
      const fileContent = fs.readFileSync(SURVEYS_FILE, 'utf-8')
      data = JSON.parse(fileContent)
    }

    // Create survey record with ID and timestamp
    const survey = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      email: surveyData.email,
      howFound: surveyData.howFound || [],
      importance: surveyData.importance || '',
      age: surveyData.age || '',
      whoYouAre: surveyData.whoYouAre || [],
      otherInfluence: surveyData.otherInfluence || '',
      favoriteLeotards: surveyData.favoriteLeotards || []
    }

    // Add to surveys array
    data.surveys.push(survey)

    // Write back to file with atomic write (write to temp then rename)
    const tempFile = SURVEYS_FILE + '.tmp'
    fs.writeFileSync(tempFile, JSON.stringify(data, null, 2))
    fs.renameSync(tempFile, SURVEYS_FILE)

    console.log(`[Survey Storage] Saved survey from ${survey.email} (ID: ${survey.id})`)
    return { success: true, id: survey.id }
  } catch (error) {
    console.error('[Survey Storage] Error saving survey:', error.message)
    return { success: false, error: error.message }
  }
}

/**
 * Get all surveys
 */
export function getAllSurveys() {
  try {
    if (!fs.existsSync(SURVEYS_FILE)) {
      return []
    }

    const fileContent = fs.readFileSync(SURVEYS_FILE, 'utf-8')
    const data = JSON.parse(fileContent)
    return data.surveys || []
  } catch (error) {
    console.error('[Survey Storage] Error reading surveys:', error.message)
    return []
  }
}

/**
 * Get surveys filtered by date range
 */
export function getSurveysByDateRange(startDate, endDate) {
  try {
    let surveys = getAllSurveys()

    if (startDate) {
      const start = new Date(startDate)
      surveys = surveys.filter(s => new Date(s.timestamp) >= start)
    }

    if (endDate) {
      const end = new Date(endDate)
      // Add 1 day to include the entire end date
      end.setDate(end.getDate() + 1)
      surveys = surveys.filter(s => new Date(s.timestamp) < end)
    }

    return surveys
  } catch (error) {
    console.error('[Survey Storage] Error filtering surveys:', error.message)
    return []
  }
}

/**
 * Generate JSON export of surveys
 */
export function generateExportJSON(surveys) {
  try {
    const exportData = {
      exportedAt: new Date().toISOString(),
      surveyCount: surveys.length,
      surveys: surveys
    }

    return JSON.stringify(exportData, null, 2)
  } catch (error) {
    console.error('[Survey Storage] Error generating JSON export:', error.message)
    return null
  }
}

/**
 * Generate filename for export with current date
 */
export function generateExportFilename(format = 'json') {
  const today = new Date()
  const dateStr = today.toISOString().split('T')[0] // YYYY-MM-DD
  return `surveys_${dateStr}.${format}`
}

/**
 * Get last updated timestamp of surveys
 */
export function getLastUpdated() {
  try {
    const surveys = getAllSurveys()
    if (surveys.length === 0) {
      return null
    }

    // Return the timestamp of the most recent survey
    return surveys[surveys.length - 1].timestamp
  } catch (error) {
    console.error('[Survey Storage] Error getting last updated:', error.message)
    return null
  }
}
