// Lightweight Upstash Redis (Vercel KV) helpers — no @vercel/kv package
// required, just fetch + env vars that Vercel KV auto-injects.

const KV_URL = process.env.KV_REST_API_URL
const KV_TOKEN = process.env.KV_REST_API_TOKEN

function ensureConfigured() {
  if (!KV_URL || !KV_TOKEN) {
    throw new Error('Vercel KV not configured (missing KV_REST_API_URL / KV_REST_API_TOKEN)')
  }
}

async function kvCommand(args) {
  ensureConfigured()
  const res = await fetch(KV_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(args),
  })
  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`KV ${args[0]} failed: ${res.status} ${text}`)
  }
  const data = await res.json()
  return data.result
}

// Hash-based storage: calculations are fields of a single Redis hash.
// HSET is atomic, so concurrent writes don't clobber each other.
const HASH_KEY = 'calculations:all'

export async function saveCalculation(id, record) {
  return kvCommand(['HSET', HASH_KEY, id, JSON.stringify(record)])
}

export async function getCalculation(id) {
  const raw = await kvCommand(['HGET', HASH_KEY, id])
  if (!raw) return null
  try { return JSON.parse(raw) } catch { return null }
}

export async function getAllCalculations() {
  const values = await kvCommand(['HVALS', HASH_KEY])
  if (!Array.isArray(values)) return []
  const list = []
  for (const v of values) {
    try { list.push(JSON.parse(v)) } catch { /* skip */ }
  }
  // Newest first
  list.sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0))
  return list
}
