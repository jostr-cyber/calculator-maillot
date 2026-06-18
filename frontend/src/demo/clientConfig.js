// ============================================================================
// SMART ORDER SYSTEM — CLIENT CONFIGURATION
// ============================================================================
// This is the ONLY file you need to edit to rebrand the demo for a new atelier.
// Copy this file (e.g. clientConfig.atelierName.js), change the values below,
// and point main.demo.jsx at it. Nothing else has to change.
//
// The production calculator (App.jsx) does NOT use this file and is untouched.
// ============================================================================

const clientConfig = {
  // --- Brand identity -------------------------------------------------------
  brandName: 'Atelier Demo',
  tagline: 'Custom Leotard Pricing — Smart Order System',

  // Path (in /public) or URL to the atelier logo. Leave '' to show brandName text.
  logo: '',

  // --- Theme ----------------------------------------------------------------
  // mainColor drives buttons, accents and highlights.
  mainColor: '#C2A36B',           // champagne gold
  mainColorDark: '#9E8350',       // hover / darker accent
  accentSoft: '#F3E9DA',          // soft card tint
  textColor: '#3A3026',           // warm dark brown for text
  cardColor: '#FFFFFF',           // card surface

  // backgroundStyle: any valid CSS `background` value.
  // Presets you can paste here:
  //   beige:     'linear-gradient(135deg, #F7F1E7 0%, #EFE3D2 100%)'
  //   champagne: 'linear-gradient(135deg, #F8F0E3 0%, #E9D9C2 100%)'
  //   lightRose: 'linear-gradient(135deg, #FBF1F0 0%, #F3E2E4 100%)'
  //   studio:    'radial-gradient(circle at 30% 20%, #FBF6EF 0%, #ECE0CE 70%)'
  backgroundStyle: 'linear-gradient(135deg, #F8F0E3 0%, #E9D9C2 100%)',

  // --- Contact (DEMO placeholders — not a real business) --------------------
  // International format, digits only, no +. This is a placeholder so the demo
  // never routes leads to a real WhatsApp.
  whatsappNumber: '1234567890',
  instagramLink: 'https://instagram.com',

  // --- Locale ---------------------------------------------------------------
  defaultLanguage: 'en',          // 'en' | 'es' | 'ru' (switcher stays available)
  currency: {
    code: 'EUR',
    symbol: '€',
    position: 'suffix',           // 'prefix' (€180) | 'suffix' (180 €)
  },

  // --- Pricing presentation (display tiers on the budget step) --------------
  // These are the budget reference points shown to the client. The underlying
  // calculation engine is shared with production; adjust here to reframe the
  // demo's price positioning for a given atelier.
  priceRanges: [
    { value: 250, labelKey: 'budget.low.title' },
    { value: 400, labelKey: 'budget.medium.title' },
    { value: 800, labelKey: 'budget.high.title' },
  ],

  // --- Available options -----------------------------------------------------
  // Toggle which configuration steps appear in the demo flow. Set to false to
  // hide a step for a given atelier (e.g. an atelier that doesn't do aerography).
  availableOptions: {
    height: true,
    designSource: true,
    sleeves: true,
    skirt: true,
    decorativeElements: true,
    aerography: true,
    combinaison: true,
    urgency: true,
    rhinestone: true,
    budget: true,
  },

  // --- Button labels --------------------------------------------------------
  // Override any CTA label here. Leave a value as null to use the built-in
  // translation for the current language.
  buttonLabels: {
    start: null,                  // intro start button
    reducePrice: null,
    discuss: '💬 Request a quote',
    customize: null,
  },

  // --- Demo banner ----------------------------------------------------------
  demoBadge: {
    show: true,
    title: 'This is a demo',
    text: 'Your version can be customized for your atelier — colors, logo, prices, options, language and contacts.',
  },
};

export default clientConfig;
