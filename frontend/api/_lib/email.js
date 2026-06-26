// Send the client's estimate as a polished HTML email via Resend.
// Failures are swallowed — analytics/email should never break the calculator UX.

const RESEND_API_KEY = process.env.RESEND_API_KEY
const FROM_EMAIL = process.env.FROM_EMAIL || 'calc@rgleotards.eu'
const FROM_NAME = process.env.FROM_NAME || 'RG Leotards · Calculator'
const REPLY_TO = process.env.REPLY_TO_EMAIL

const isConfigured = () => Boolean(RESEND_API_KEY && FROM_EMAIL)

function esc(s) {
  if (s == null) return ''
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

// Tiny translation pack for the email body. Kept inline so the email function
// has no extra deps; the main calculator locales stay the source of truth.
const T = {
  ru: {
    subject: 'Ваш расчёт купальника — RG Leotards',
    hi: 'Здравствуйте!',
    intro: 'Спасибо что воспользовались нашим калькулятором. Ниже — ваш расчёт. Сохраните это письмо чтобы вернуться к нему позже.',
    yourEstimate: 'Ваша примерная стоимость',
    optimizedPrice: 'С оптимизацией',
    yourBudget: 'Ваш бюджет',
    complexity: 'Сложность',
    yourSelection: 'Что вы выбрали',
    discussCta: '💬 Обсудить заказ в WhatsApp',
    instaCta: '📷 Мы в Instagram',
    disclaimer: 'Это предварительная оценка. Финальную цену можем уточнить когда обсудим детали.',
    signature: 'С уважением,<br>команда RG Leotards',
    calcId: 'ID расчёта',
    cfg: {
      designSource: 'Источник дизайна',
      sleeves: 'Рукава',
      skirt: 'Юбка',
      decorativeElements: 'Декор',
      aerography: 'Роспись/Аэрография',
      rhinestone: 'Стразы',
      urgency: 'Срочность',
      height: 'Рост гимнастки',
      combinaison: 'Тип купальника',
    },
  },
  en: {
    subject: 'Your leotard estimate — RG Leotards',
    hi: 'Hello!',
    intro: "Thanks for using our calculator. Below is your estimate — save this email so you can come back to it any time.",
    yourEstimate: 'Your estimated price',
    optimizedPrice: 'With optimisation',
    yourBudget: 'Your budget',
    complexity: 'Complexity',
    yourSelection: 'Your selection',
    discussCta: '💬 Discuss the order on WhatsApp',
    instaCta: '📷 Find us on Instagram',
    disclaimer: 'This is a preliminary estimate. The final price can be adjusted once we discuss the details.',
    signature: 'Warm regards,<br>the RG Leotards team',
    calcId: 'Calculation ID',
    cfg: {
      designSource: 'Design source',
      sleeves: 'Sleeves',
      skirt: 'Skirt',
      decorativeElements: 'Decorative elements',
      aerography: 'Artwork / airbrushing',
      rhinestone: 'Rhinestones',
      urgency: 'Urgency',
      height: "Gymnast's height",
      combinaison: 'Leotard type',
    },
  },
  es: {
    subject: 'Tu presupuesto de maillot — RG Leotards',
    hi: '¡Hola!',
    intro: 'Gracias por usar nuestra calculadora. Aquí tienes tu presupuesto — guarda este correo para volver cuando quieras.',
    yourEstimate: 'Tu precio estimado',
    optimizedPrice: 'Con optimización',
    yourBudget: 'Tu presupuesto',
    complexity: 'Complejidad',
    yourSelection: 'Tu selección',
    discussCta: '💬 Hablar del pedido por WhatsApp',
    instaCta: '📷 Síguenos en Instagram',
    disclaimer: 'Es un presupuesto preliminar. El precio final se ajusta al hablar los detalles.',
    signature: 'Un saludo,<br>el equipo de RG Leotards',
    calcId: 'ID del cálculo',
    cfg: {
      designSource: 'Origen del diseño',
      sleeves: 'Mangas',
      skirt: 'Falda',
      decorativeElements: 'Elementos decorativos',
      aerography: 'Pintura / aerografía',
      rhinestone: 'Strass',
      urgency: 'Urgencia',
      height: 'Estatura de la gimnasta',
      combinaison: 'Tipo de maillot',
    },
  },
}

const pickLang = (l) => (l === 'ru' || l === 'es' ? l : 'en')

function fmtPrice(amount) {
  if (amount == null) return '—'
  return `€${amount}`
}

function buildSelectionRows(cfg, t) {
  const rows = []
  const map = {
    height: cfg.height,
    designSource: cfg.designSource,
    combinaison: cfg.leotardType || cfg.combinaison,
    sleeves: cfg.sleeves ? `×${cfg.sleeves}` : null,
    skirt: cfg.skirt,
    decorativeElements: cfg.decorativeElements && cfg.decorativeElements !== 'none' && cfg.decorativeElements !== 'nothing' ? cfg.decorativeElements : null,
    aerography: cfg.aerography && cfg.aerography !== 'nothing' ? cfg.aerography : null,
    rhinestone: cfg.rhinestone && cfg.rhinestone !== 'none' ? cfg.rhinestone : null,
    urgency: cfg.urgency && cfg.urgency !== 'none' ? cfg.urgency : null,
  }
  for (const [k, v] of Object.entries(map)) {
    if (!v) continue
    const label = t.cfg[k] || k
    rows.push(`<tr><td style="padding:6px 12px;color:#6b6b6b;font-size:13px;border-bottom:1px solid #f0e8d8;">${esc(label)}</td><td style="padding:6px 12px;color:#1a1a1a;font-size:13px;font-weight:500;border-bottom:1px solid #f0e8d8;text-align:right;">${esc(v)}</td></tr>`)
  }
  return rows.join('')
}

function buildHtml(record, instagramUrl, whatsappNumber) {
  const t = T[pickLang(record.language)]
  const cfg = record.config || {}
  const price = fmtPrice(record.finalPrice)
  const optimized = record.optimizedPrice ? fmtPrice(record.optimizedPrice) : null
  const budget = record.budget && record.budget !== 'undecided' && record.budget !== 'unknown'
    ? (record.budget === 'plus' ? '€800+' : `€${record.budget}`)
    : null
  const complexity = record.complexity?.level || null
  const calculatorUrl = 'https://rgleotards.eu'
  const waHref = whatsappNumber ? `https://wa.me/${whatsappNumber}` : null
  const selectionRows = buildSelectionRows(cfg, t)

  return `<!DOCTYPE html>
<html lang="${pickLang(record.language)}">
<head><meta charset="utf-8"><title>${esc(t.subject)}</title></head>
<body style="margin:0;padding:0;background:#faf6ec;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1a1a1a;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#faf6ec;padding:32px 16px;">
    <tr><td align="center">
      <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(120,95,55,0.08);">
        <tr><td style="background:linear-gradient(135deg,#c2a36b 0%,#9e8350 100%);padding:32px 36px;color:#fff;">
          <div style="font-size:13px;letter-spacing:1.5px;text-transform:uppercase;opacity:0.85;margin-bottom:6px;">RG Leotards</div>
          <div style="font-size:24px;font-weight:700;line-height:1.3;">${esc(t.yourEstimate)}</div>
          <div style="font-size:32px;font-weight:800;margin-top:8px;">${esc(price)}</div>
          ${optimized ? `<div style="font-size:14px;opacity:0.9;margin-top:4px;">${esc(t.optimizedPrice)}: <b>${esc(optimized)}</b></div>` : ''}
        </td></tr>
        <tr><td style="padding:28px 36px;color:#3a3026;">
          <p style="font-size:16px;margin:0 0 8px;font-weight:600;">${esc(t.hi)}</p>
          <p style="font-size:14px;line-height:1.55;color:#5b4d38;margin:0 0 22px;">${esc(t.intro)}</p>

          <div style="background:#faf6ec;border:1px solid #e9d9b8;border-radius:12px;padding:16px 18px;margin-bottom:18px;">
            <div style="font-size:11px;letter-spacing:0.8px;text-transform:uppercase;color:#9e8350;font-weight:700;margin-bottom:10px;">${esc(t.yourSelection)}</div>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0">${selectionRows}</table>
          </div>

          ${budget || complexity ? `<div style="display:block;margin-bottom:22px;font-size:13px;color:#5b4d38;">
            ${budget ? `<span style="display:inline-block;background:#faf6ec;padding:6px 12px;border-radius:999px;border:1px solid #e9d9b8;margin-right:6px;">${esc(t.yourBudget)}: <b>${esc(budget)}</b></span>` : ''}
            ${complexity ? `<span style="display:inline-block;background:#faf6ec;padding:6px 12px;border-radius:999px;border:1px solid #e9d9b8;">${esc(t.complexity)}: <b>${esc(complexity)}</b></span>` : ''}
          </div>` : ''}

          <p style="font-size:12.5px;line-height:1.5;color:#8a7a5f;font-style:italic;margin:0 0 22px;">${esc(t.disclaimer)}</p>

          ${waHref ? `<div style="text-align:center;margin:8px 0 16px;"><a href="${esc(waHref)}" style="display:inline-block;background:#25D366;color:#fff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">${esc(t.discussCta)}</a></div>` : ''}
          ${instagramUrl ? `<div style="text-align:center;margin:8px 0 4px;"><a href="${esc(instagramUrl)}" style="display:inline-block;color:#9e8350;text-decoration:none;font-size:13px;font-weight:600;">${esc(t.instaCta)} →</a></div>` : ''}

          <p style="font-size:14px;line-height:1.55;color:#3a3026;margin:22px 0 0;">${t.signature}</p>
        </td></tr>
        <tr><td style="background:#faf6ec;padding:14px 36px;text-align:center;font-size:11px;color:#8a7a5f;border-top:1px solid #f0e8d8;">
          ${esc(t.calcId)}: <code style="background:#fff;padding:2px 6px;border-radius:4px;">${esc(record.id || '')}</code> · <a href="${esc(calculatorUrl)}" style="color:#9e8350;text-decoration:none;">rgleotards.eu</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`
}

export async function sendEstimateEmail(record, opts = {}) {
  if (!isConfigured()) return { ok: false, skipped: true, reason: 'no-config' }
  if (!record.email) return { ok: false, skipped: true, reason: 'no-email' }
  const t = T[pickLang(record.language)]
  const html = buildHtml(record, opts.instagramUrl, opts.whatsappNumber)
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `${FROM_NAME} <${FROM_EMAIL}>`,
        to: [record.email],
        reply_to: REPLY_TO || undefined,
        subject: t.subject,
        html,
      }),
    })
    const data = await res.json().catch(() => ({}))
    return { ok: res.ok, status: res.status, id: data?.id || null, error: data?.error || null }
  } catch (e) {
    return { ok: false, error: e.message }
  }
}
