// ============================================================================
// RhythmIQ SMART ORDER SYSTEM — DEMO SETTINGS (non-text)
// ============================================================================
// Settings only. All translatable text lives in demoContent.js (EN/RU).
// To produce a real per-atelier version, copy this file + demoContent.js,
// swap colors / contacts / logo / text, and point main.demo.jsx at it.
// Production (App.jsx) is untouched.
// ============================================================================

const clientConfig = {
  // --- Theme ----------------------------------------------------------------
  mainColor: '#C2A36B',
  mainColorDark: '#9E8350',
  accentSoft: '#F3E9DA',
  textColor: '#3A3026',
  cardColor: '#FFFFFF',
  backgroundStyle: 'linear-gradient(135deg, #F8F0E3 0%, #E9D9C2 100%)',

  // --- Atelier logo (image only; atelier text lives in demoContent.js) ------
  atelier: { logo: '' }, // '' → show "Your Atelier Logo Here" placeholder

  // --- Contact (demo product contacts) --------------------------------------
  whatsappNumber: '34600777024',
  whatsappDisplay: '+34 600 777 024',
  instagramHandle: '@rhythmiq.tools',
  instagramLink: 'https://instagram.com/rhythmiq.tools',

  // --- Locale (demo supports EN + RU only) ----------------------------------
  defaultLanguage: 'en',
  currency: { code: 'EUR', symbol: '€', position: 'suffix' },

  // --- Pricing presentation (reference tiers) -------------------------------
  priceRanges: [
    { value: 250, labelKey: 'budget.low.title' },
    { value: 400, labelKey: 'budget.medium.title' },
    { value: 800, labelKey: 'budget.high.title' },
  ],

  // --- Which calculator steps appear in the demo ----------------------------
  availableOptions: {
    height: true, designSource: true, sleeves: true, skirt: true,
    decorativeElements: true, aerography: true, combinaison: true,
    urgency: true, rhinestone: true, budget: true,
  },

  // --- Demo banner ----------------------------------------------------------
  demoBadge: { show: true },
}

export default clientConfig
