// ============================================================================
// RhythmIQ SMART ORDER SYSTEM — DEMO CONFIGURATION
// ============================================================================
// This single file holds all content + branding for the demo. To produce a
// real per-atelier version, copy this file, swap the atelier identity / colors /
// contacts, and point main.demo.jsx at it. Production (App.jsx) is untouched.
// ============================================================================

const clientConfig = {
  // --- Product identity (the SaaS being sold) -------------------------------
  product: {
    name: 'RhythmIQ Smart Order System',
    subtitle: 'Leotard Calculator for Rhythmic Gymnastics Studios',
    // The system is more than a calculator — use these softer names in-app.
    calculatorName: 'Interactive Leotard Calculator',
    calculatorNameAlt: 'Leotard Calculator & Client Order Assistant',
  },

  // --- Generic atelier identity (what a studio would see as "theirs") -------
  // Intentionally generic — every real studio gets its own logo/colors/photos.
  atelier: {
    name: 'RG Leotards Studio',
    logoPlaceholder: 'Your Atelier Logo Here',
    logo: '', // a real atelier logo path/URL goes here
    genericNote: 'This demo uses a generic atelier identity. Every studio gets its own logo, colors and photos.',
  },

  // --- Theme ----------------------------------------------------------------
  mainColor: '#C2A36B',
  mainColorDark: '#9E8350',
  accentSoft: '#F3E9DA',
  textColor: '#3A3026',
  cardColor: '#FFFFFF',
  backgroundStyle: 'linear-gradient(135deg, #F8F0E3 0%, #E9D9C2 100%)',

  // --- Contact (demo product contacts) --------------------------------------
  whatsappNumber: '34600777024',
  whatsappDisplay: '+34 600 777 024',
  instagramHandle: '@rhythmiq.tools',
  instagramLink: 'https://instagram.com/rhythmiq.tools',

  // --- Locale ---------------------------------------------------------------
  defaultLanguage: 'en',
  currency: { code: 'EUR', symbol: '€', position: 'suffix' },

  // --- Pricing presentation -------------------------------------------------
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

  // --- Welcome screen content ----------------------------------------------
  features: [
    { icon: '✨', text: 'Price estimation' },
    { icon: '✨', text: 'Client order collection' },
    { icon: '✨', text: 'Automatic WhatsApp requests' },
    { icon: '✨', text: 'Personalized for your atelier' },
  ],

  testimonials: [
    { stars: 5, quote: 'My clients stopped asking the same questions every day.', author: 'Elena', studio: 'Dream Spark Atelier' },
    { stars: 5, quote: 'Now clients send complete requests instead of dozens of messages.', author: 'Sofia', studio: 'Greece' },
    { stars: 5, quote: 'I spend less time answering repetitive questions.', author: 'Maria', studio: 'Spain' },
  ],

  benefits: {
    title: 'Why studios use RhythmIQ',
    items: [
      'Saves time',
      'Filters unrealistic requests',
      'Reduces repetitive questions',
      'Collects complete orders',
      'Sends requests directly to WhatsApp',
      'Works 24/7',
    ],
  },

  infoCard: {
    title: 'Want your own Smart Order System?',
    items: [
      'your logo',
      'your colors',
      'your WhatsApp',
      'your Instagram photos',
      'personalized settings',
      'hosting and maintenance included',
    ],
    buttonLabel: 'Contact us',
  },

  // --- Final sales page -----------------------------------------------------
  finalSales: {
    title: 'Want a Smart Order System for your atelier?',
    subtitle: 'Included:',
    includes: [
      'your logo',
      'your colors',
      'your WhatsApp',
      'your Instagram gallery',
      'automatic request collection',
      'hosting and support',
    ],
    buttonLabel: 'Request information',
  },

  // --- Demo banner ----------------------------------------------------------
  demoBadge: {
    show: true,
    title: 'Live demo',
    text: 'This is an interactive demo of RhythmIQ. Your version is fully personalized for your atelier.',
  },

  // --- Button labels (null = use built-in translation) ----------------------
  buttonLabels: {
    tryDemo: 'Try Demo',
    start: null,
    reducePrice: null,
    discuss: '💬 Send my request',
    customize: null,
  },
};

export default clientConfig;
