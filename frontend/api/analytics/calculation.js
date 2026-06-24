// POST /api/analytics/calculation
// Upsert a calculation snapshot to Vercel KV and ping Telegram on meaningful
// state changes (first save, status flips to whatsapp_clicked).

import { saveCalculation, getCalculation } from '../_lib/kv.js'
import { notifyTelegram, editTelegramMessage } from '../_lib/telegram.js'

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
    // Telegram: one message per calculation. First save sends it; later
    // updates (contact saved, WhatsApp clicked, reduce-cost opened) edit the
    // SAME message in place so the atelier sees the full picture on one row
    // instead of getting multiple bot pings per visitor.
    const isNew = !existing
    const justClickedWhatsApp =
      existing && existing.status !== 'whatsapp_clicked' && record.status === 'whatsapp_clicked'
    const justSavedContact =
      record.status === 'contact_saved' &&
      record.savedContact &&
      (!existing || existing.savedContact !== record.savedContact)
    const justOpenedReduce =
      record.reduceModalOpened && !existing?.reduceModalOpened

    if (isNew) {
      const sent = await notifyTelegram(record).catch(() => null)
      if (sent?.messageId) record.telegramMessageId = sent.messageId
      await saveCalculation(incoming.id, record)
    } else {
      await saveCalculation(incoming.id, record)
      const msgId = record.telegramMessageId
      if (msgId && (justClickedWhatsApp || justSavedContact || justOpenedReduce)) {
        let statusChangedTo = null
        if (justClickedWhatsApp) statusChangedTo = 'whatsapp_clicked'
        else if (justSavedContact) statusChangedTo = 'contact_saved'
        editTelegramMessage(msgId, record, { isUpdate: true, statusChangedTo }).catch(() => {})
      }
    }

    res.json({ ok: true, isNew })
  } catch (error) {
    console.error('[analytics/calculation] error:', error)
    res.status(500).json({ error: error.message })
  }
}
