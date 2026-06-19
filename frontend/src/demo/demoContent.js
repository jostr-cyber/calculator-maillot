// ============================================================================
// RhythmIQ DEMO — bilingual content (EN / RU)
// All demo-specific marketing/UI text lives here so the whole demo translates.
// Calculator step text comes from the shared locales (via useTranslation `t`).
// Brand names (RhythmIQ, RG Leotards Studio) are intentionally kept untranslated.
// ============================================================================

export const demoContent = {
  en: {
    liveDemo: 'Live demo',

    product: {
      name: 'RhythmIQ Smart Order System',
      subtitle: 'Leotard Calculator for Rhythmic Gymnastics Studios',
      calculatorName: 'Interactive Leotard Calculator',
    },

    atelier: {
      name: 'RG Leotards Studio',
      logoPlaceholder: 'Your Atelier Logo Here',
      genericNote: 'This demo uses a generic atelier identity. Every studio gets its own logo, colors and photos.',
    },

    features: [
      'Price estimation',
      'Client order collection',
      'Automatic WhatsApp requests',
      'Personalized for your atelier',
    ],

    benefitsTitle: 'Why studios use RhythmIQ',
    benefits: [
      'Saves time',
      'Filters unrealistic requests',
      'Reduces repetitive questions',
      'Collects complete orders',
      'Sends requests directly to WhatsApp',
      'Works 24/7',
    ],

    testimonialsTitle: 'What studios say',
    testimonials: [
      { quote: 'My clients stopped asking the same questions every day.', author: 'Elena', studio: 'Dream Spark Atelier' },
      { quote: 'Now clients send complete requests instead of dozens of messages.', author: 'Sofia', studio: 'Greece' },
      { quote: 'I spend less time answering repetitive questions.', author: 'Maria', studio: 'Spain' },
    ],

    infoCard: {
      title: 'Want your own Smart Order System?',
      items: ['your logo', 'your colors', 'your WhatsApp', 'your Instagram photos', 'personalized settings', 'hosting and maintenance included'],
      button: 'Contact us',
    },

    finalSales: {
      title: 'Want a Smart Order System for your atelier?',
      subtitle: 'Included:',
      includes: ['your logo', 'your colors', 'your WhatsApp', 'your Instagram gallery', 'automatic request collection', 'hosting and support'],
      button: 'Request information',
    },

    demoBadge: {
      title: 'Live demo',
      text: 'This is an interactive demo of RhythmIQ. Your version is fully personalized for your atelier.',
    },

    tryDemo: 'Try Demo',
    back: '← Back',
    poweredBy: 'Powered by',
    sendRequest: '💬 Send my request',
    onInstagram: 'on Instagram',
    bridgeText: 'This is exactly the request your client would send you — complete and ready.',
    bridgeButton: '✨ Get this for your atelier',
    restartDemo: '↺ Restart demo',
    contactWhatsApp: 'WhatsApp',
    contactInstagram: 'Instagram',
  },

  ru: {
    liveDemo: 'Демо',

    product: {
      name: 'RhythmIQ Smart Order System',
      subtitle: 'Калькулятор купальников для студий художественной гимнастики',
      calculatorName: 'Интерактивный калькулятор купальников',
    },

    atelier: {
      name: 'RG Leotards Studio',
      logoPlaceholder: 'Здесь будет логотип вашего ателье',
      genericNote: 'В демо используется обобщённый бренд ателье. Каждая студия получает свой логотип, цвета и фото.',
    },

    features: [
      'Расчёт стоимости',
      'Сбор заказов клиентов',
      'Автоматические заявки в WhatsApp',
      'Персонализация под ваше ателье',
    ],

    benefitsTitle: 'Почему студии выбирают RhythmIQ',
    benefits: [
      'Экономит время',
      'Отсеивает нереалистичные запросы',
      'Сокращает повторяющиеся вопросы',
      'Собирает полные заказы',
      'Отправляет заявки прямо в WhatsApp',
      'Работает 24/7',
    ],

    testimonialsTitle: 'Отзывы студий',
    testimonials: [
      { quote: 'Клиенты перестали каждый день задавать одни и те же вопросы.', author: 'Елена', studio: 'Dream Spark Atelier' },
      { quote: 'Теперь клиенты присылают полные заявки вместо десятков сообщений.', author: 'София', studio: 'Греция' },
      { quote: 'Я трачу меньше времени на повторяющиеся вопросы.', author: 'Мария', studio: 'Испания' },
    ],

    infoCard: {
      title: 'Хотите свою Smart Order System?',
      items: ['ваш логотип', 'ваши цвета', 'ваш WhatsApp', 'ваши фото из Instagram', 'персональные настройки', 'хостинг и поддержка включены'],
      button: 'Связаться с нами',
    },

    finalSales: {
      title: 'Хотите Smart Order System для вашего ателье?',
      subtitle: 'Включено:',
      includes: ['ваш логотип', 'ваши цвета', 'ваш WhatsApp', 'ваша галерея Instagram', 'автоматический сбор заявок', 'хостинг и поддержка'],
      button: 'Запросить информацию',
    },

    demoBadge: {
      title: 'Демо',
      text: 'Это интерактивное демо RhythmIQ. Ваша версия полностью персонализируется под ваше ателье.',
    },

    tryDemo: 'Попробовать демо',
    back: '← Назад',
    poweredBy: 'Работает на',
    sendRequest: '💬 Отправить заявку',
    onInstagram: 'в Instagram',
    bridgeText: 'Именно такую заявку пришлёт вам клиент — полную и готовую.',
    bridgeButton: '✨ Хочу такое для своего ателье',
    restartDemo: '↺ Начать заново',
    contactWhatsApp: 'WhatsApp',
    contactInstagram: 'Instagram',
  },
}

// Pick the demo content for the active language (only EN/RU supported in the demo).
export const getDemoContent = (language) => demoContent[language === 'ru' ? 'ru' : 'en']

export default demoContent
