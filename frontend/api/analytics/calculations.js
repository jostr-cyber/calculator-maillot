// GET /api/analytics/calculations?key=...
// Returns all saved calculations + a small summary block. Auth-gated by a
// shared key (ANALYTICS_KEY env var) so randoms can't browse client data.

import { getAllCalculations } from '../_lib/kv.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  const expected = process.env.ANALYTICS_KEY
  const provided = req.query?.key || req.headers['x-admin-key']
  if (!expected) {
    return res.status(500).json({ error: 'ANALYTICS_KEY not configured' })
  }
  if (provided !== expected) {
    return res.status(401).json({ error: 'unauthorized' })
  }
  try {
    const list = await getAllCalculations()
    const summary = {
      total: list.length,
      submittedToWhatsApp: list.filter((c) => c.status === 'whatsapp_clicked').length,
      completed: list.filter((c) => c.status === 'calculator_completed').length,
      oldest: list.length ? list[list.length - 1]?.createdAt : null,
      newest: list.length ? list[0]?.createdAt : null,
    }
    res.json({ summary, calculations: list })
  } catch (error) {
    console.error('[analytics/calculations] error:', error)
    res.status(500).json({ error: error.message })
  }
}
