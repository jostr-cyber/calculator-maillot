// POST /api/analytics/calculation
// Upsert a calculation snapshot to Vercel KV and ping Telegram on meaningful
// state changes (first save, status flips to whatsapp_clicked).

import { saveCalculation, getCalculation } from '../_lib/kv.js'
import { notifyTelegram, editTelegramMessage } from '../_lib/telegram.js'
import { sendEstimateEmail } from '../_lib/email.js'

// Atelier-side contacts used inside the estimate email (CTA + footer link).
const INSTAGRAM_URL = 'https://www.instagram.com/rgleotards_eu/'
const WHATSAPP_NUMBER = '34670770024'

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
    const justGotEmail =
      record.email && (!existing || existing.email !== record.email)
    const justOpenedReduce =
      record.reduceModalOpened && !existing?.reduceModalOpened

    // Estimate email: send once per record as soon as we have an email address.
    // If the visitor leaves an email later (saveCalc block), this fires then.
    const shouldSendEmail = record.email && !record.emailSent
    if (shouldSendEmail) {
      const emailRes = await sendEstimateEmail(record, {
        instagramUrl: INSTAGRAM_URL,
        whatsappNumber: WHATSAPP_NUMBER,
      }).catch(() => ({ ok: false }))
      if (emailRes?.ok) {
        record.emailSent = true
        record.emailSentAt = new Date().toISOString()
      }
    }

    if (isNew) {
      const sent = await notifyTelegram(record).catch(() => null)
      if (sent?.messageId) record.telegramMessageId = sent.messageId
      await saveCalculation(incoming.id, record)
    } else {
      await saveCalculation(incoming.id, record)
      const shouldNotify = justClickedWhatsApp || justSavedContact || justGotEmail || justOpenedReduce
      if (shouldNotify) {
        let statusChangedTo = null
        if (justClickedWhatsApp) statusChangedTo = 'whatsapp_clicked'
        else if (justSavedContact) statusChangedTo = 'contact_saved'
        else if (justGotEmail) statusChangedTo = 'email_captured'

        const msgId = record.telegramMessageId
        let edited = null
        if (msgId) {
          edited = await editTelegramMessage(msgId, record, { isUpdate: true, statusChangedTo }).catch(() => null)
        }
        // Fallback: if no message_id stored (e.g., record was created before
        // edit-mode was deployed) or the edit call failed, send a fresh
        // notification so the atelier doesn't miss the update.
        if (!edited?.ok) {
          const sent = await notifyTelegram(record, { isUpdate: true, statusChangedTo }).catch(() => null)
          if (sent?.messageId) {
            record.telegramMessageId = sent.messageId
            await saveCalculation(incoming.id, record)
          }
        }
      }
    }

    res.json({ ok: true, isNew })
  } catch (error) {
    console.error('[analytics/calculation] error:', error)
    res.status(500).json({ error: error.message })
  }
}
