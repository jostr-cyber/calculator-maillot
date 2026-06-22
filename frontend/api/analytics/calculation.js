// POST /api/analytics/calculation
// Upsert a calculation snapshot to Vercel KV and ping Telegram on meaningful
// state changes (first save, status flips to whatsapp_clicked).

import { saveCalculation, getCalculation } from '../_lib/kv.js'
import { notifyTelegram } from '../_lib/telegram.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }
  try {
    const incoming = req.body || {}
    if (!incoming.id) {
      return res.status(400).json({ error: 'id required' })
    }

    const meta = {
      ip: req.headers['x-forwarded-for']?.toString().split(',')[0].trim()
        || req.socket?.remoteAddress
        || null,
      userAgent: req.headers['user-agent'] || null,
      referer: req.headers['referer'] || null,
    }

    const now = new Date().toISOString()
    const existing = await getCalculation(incoming.id)
    const record = {
      ...(existing || {}),
      ...incoming,
      updatedAt: now,
      createdAt: existing?.createdAt || incoming.createdAt || now,
      serverMeta: { ...(existing?.serverMeta || {}), ...meta },
    }
    await saveCalculation(incoming.id, record)

    // Telegram notifications:
    //   - first time we see a calculation     → "New calculation"
    //   - subsequent status flip to WhatsApp  → "Client wrote in WhatsApp!"
    //   - other intermediate updates          → silent (dashboard only)
    const isNew = !existing
    const justClickedWhatsApp =
      existing && existing.status !== 'whatsapp_clicked' && record.status === 'whatsapp_clicked'
    if (isNew) {
      notifyTelegram(record).catch(() => {})
    } else if (justClickedWhatsApp) {
      notifyTelegram(record, { isUpdate: true, statusChangedTo: 'whatsapp_clicked' }).catch(() => {})
    }

    res.json({ ok: true, isNew })
  } catch (error) {
    console.error('[analytics/calculation] error:', error)
    res.status(500).json({ error: error.message })
  }
}
