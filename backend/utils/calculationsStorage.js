import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const DATA_DIR = path.join(__dirname, '..', 'data')
const FILE = path.join(DATA_DIR, 'calculations.json')

export function initializeCalculationsStorage() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true })
      console.log(`[Calculations] Created data dir: ${DATA_DIR}`)
    }
    if (!fs.existsSync(FILE)) {
      fs.writeFileSync(FILE, JSON.stringify({ calculations: [] }, null, 2))
      console.log(`[Calculations] Created file: ${FILE}`)
    }
  } catch (e) {
    console.error('[Calculations] init error:', e.message)
  }
}

function readAll() {
  try {
    if (!fs.existsSync(FILE)) return { calculations: [] }
    const raw = fs.readFileSync(FILE, 'utf-8')
    return JSON.parse(raw)
  } catch (e) {
    console.error('[Calculations] read error:', e.message)
    return { calculations: [] }
  }
}

function writeAll(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2))
}

/**
 * Upsert a calculation — if a record with the same id exists, merge incoming
 * fields into it; otherwise append as new. Caller's id should be sticky for the
 * whole session (e.g. RG-12345), so navigating around the result screen doesn't
 * create duplicate rows.
 */
export function upsertCalculation(incoming, meta = {}) {
  if (!incoming || !incoming.id) {
    throw new Error('calculation must include an id')
  }
  const data = readAll()
  const list = data.calculations || []
  const idx = list.findIndex((c) => c.id === incoming.id)

  // Server-side stamps
  const now = new Date().toISOString()
  const enriched = {
    ...incoming,
    updatedAt: now,
    serverMeta: { ...(list[idx]?.serverMeta || {}), ...meta },
  }

  if (idx >= 0) {
    // Preserve original createdAt and merge any new server fields
    list[idx] = { ...list[idx], ...enriched, createdAt: list[idx].createdAt || enriched.createdAt }
  } else {
    enriched.createdAt = enriched.createdAt || now
    list.unshift(enriched) // newest first
  }

  data.calculations = list
  writeAll(data)
  return { ok: true, total: list.length, isNew: idx < 0 }
}

export function getAllCalculations() {
  const data = readAll()
  return data.calculations || []
}

export function getCalculationsSummary() {
  const list = getAllCalculations()
  return {
    total: list.length,
    submittedToWhatsApp: list.filter((c) => c.status === 'whatsapp_clicked').length,
    completed: list.filter((c) => c.status === 'calculator_completed').length,
    oldest: list.length ? list[list.length - 1]?.createdAt : null,
    newest: list.length ? list[0]?.createdAt : null,
  }
}
