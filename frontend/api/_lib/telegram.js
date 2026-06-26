// Telegram bot helper — fires a notification per new calculation. Failures are
// swallowed because analytics must never break the calculator UX.

const TOKEN = process.env.TELEGRAM_BOT_TOKEN
const CHAT_ID = process.env.TELEGRAM_CHAT_ID

const isConfigured = () => Boolean(TOKEN && CHAT_ID)

function esc(s) {
  if (s == null) return ''
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function formatCalcMessage(rec, opts = {}) {
  const { isUpdate, statusChangedTo } = opts
  const c = rec.config || {}
  const price = rec.finalPrice != null ? `€${rec.finalPrice}` : '—'
  const optimized = rec.optimizedPrice ? ` → оптимизированная €${rec.optimizedPrice}` : ''
  const budget = rec.budget && rec.budget !== 'undecided' && rec.budget !== 'unknown'
    ? `€${rec.budget === 'plus' ? '800+' : rec.budget}`
    : 'не указан'
  const complexity = rec.complexity?.level || '—'
  const lang = ({ ru: '🇷🇺 ru', en: '🇬🇧 en', es: '🇪🇸 es' })[rec.language] || rec.language || '—'

  const opts2 = []
  if (c.height) opts2.push(`📏 рост: <b>${esc(c.height)}</b>`)
  if (c.designSource) opts2.push(`✏️ дизайн: <b>${esc(c.designSource)}</b>`)
  if (c.sleeves) opts2.push(`👕 рукав×${c.sleeves}`)
  if (c.skirt) opts2.push(`👗 юбка: ${esc(c.skirt)}`)
  if (c.decorativeElements && c.decorativeElements !== 'none' && c.decorativeElements !== 'nothing')
    opts2.push(`✨ декор: ${esc(c.decorativeElements)}`)
  if (c.aerography && c.aerography !== 'nothing')
    opts2.push(`🎨 ${esc(c.aerography)}`)
  if (c.rhinestone && c.rhinestone !== 'none')
    opts2.push(`💎 стразы: ${esc(c.rhinestone)}`)
  if (c.urgency && c.urgency !== 'none')
    opts2.push(`⏱ ${esc(c.urgency)}`)
  if (c.combinaison) opts2.push(`🧵 ${esc(c.combinaison)}`)

  let title
  let contactLine = ''
  if (statusChangedTo === 'whatsapp_clicked') {
    title = `🔥 <b>Клиент написал в WhatsApp!</b>\n<code>${esc(rec.id)}</code>`
  } else if (statusChangedTo === 'contact_saved') {
    title = `🔔 <b>Клиент оставил контакт</b>\n<code>${esc(rec.id)}</code>`
    contactLine = `\n📱 <b>Контакт:</b> <code>${esc(rec.savedContact || '')}</code>\n<i>Можно написать первой — клиент ждёт ответа</i>\n`
  } else if (rec.reduceModalOpened && isUpdate) {
    title = `💰 Открыл «снизить цену»\n<code>${esc(rec.id)}</code>`
  } else {
    title = `📊 <b>Новый расчёт</b>\n<code>${esc(rec.id)}</code>`
  }
  // For regular new-calc messages: also show contact line if already present
  if (!contactLine && rec.savedContact) {
    contactLine = `\n📱 <b>Контакт:</b> <code>${esc(rec.savedContact)}</code>\n`
  }
  // Email line (separate from contactLine so both can appear)
  let emailLine = ''
  if (rec.email) {
    const sentMark = rec.emailSent ? ' ✉ отправлено' : ''
    emailLine = `\n📧 <b>Email:</b> <code>${esc(rec.email)}</code>${sentMark}\n`
  }

  return [
    title,
    contactLine,
    emailLine,
    '',
    `💰 Цена: <b>${esc(price)}</b>${esc(optimized)}`,
    `🎯 Бюджет: ${esc(budget)}`,
    `⭐ Сложность: ${esc(complexity)}`,
    `🌐 Язык: ${esc(lang)}`,
    '',
    '<b>Конфигурация:</b>',
    ...opts2.map((s) => ' · ' + s),
  ].filter(Boolean).join('\n')
}

export async function notifyTelegram(rec, opts = {}) {
  if (!isConfigured()) return { ok: false, skipped: true, reason: 'no-config' }
  const text = formatCalcMessage(rec, opts)
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    const data = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, messageId: data?.result?.message_id || null }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}

// Edit an already-sent Telegram message in place. Used so that as the user
// progresses (enters contact, clicks WhatsApp), the same message updates
// instead of spamming a new one each time. Telegram allows edits up to ~48h.
export async function editTelegramMessage(messageId, rec, opts = {}) {
  if (!isConfigured() || !messageId) return { ok: false, skipped: true }
  const text = formatCalcMessage(rec, opts)
  try {
    const res = await fetch(`https://api.telegram.org/bot${TOKEN}/editMessageText`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        message_id: messageId,
        text,
        parse_mode: 'HTML',
        disable_web_page_preview: true,
      }),
    })
    return { ok: res.ok, status: res.status }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}
