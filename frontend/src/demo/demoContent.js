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
      'Understanding client preferences',
      'Pre-orders sent straight to your WhatsApp',
      'Full history of every client calculation',
      'Personalized for your atelier',
      'Quick pricing for the master',
    ],
    featuresNote: 'Every client calculation helps you better understand demand — which models, elements and options are chosen most often.',

    benefitsTitle: 'Why studios use RhythmIQ',
    benefits: [
      "Saves hours on answering the same questions that don't lead to orders",
      'Helps you understand demand and client preferences',
      'Helps you discuss the budget before any work begins',
      'Pre-orders go straight to your WhatsApp',
      "Reduces time spent on chats that don't convert",
      'Gives the client a reason to reach out to you',
    ],

    testimonialsTitle: 'What studios say',
    testimonials: [
      { quote: 'Clients arrive better prepared, and I spend less time on explanations', author: 'Elena', studio: 'Dream Spark Atelier' },
      { quote: 'After using the calculator, people are more likely to follow up and place an order', author: 'Sofia', studio: 'Greece' },
      { quote: "It's easier to discuss the budget and suggest suitable options", author: 'Maria', studio: 'Spain' },
    ],

    worksForYou: {
      title: 'The calculator works for you',
      subtitle: 'Use Smart Order System inside the atelier',
      items: [
        'Price new orders quickly',
        "Stop keeping prices and markups in your head",
        'All surcharges for extra options are calculated automatically',
        'Check the price of your own work in seconds',
        'Use the calculator during in-person client meetings',
        'A single pricing system for the whole atelier — especially helpful when several masters work together',
      ],
      helperCard: {
        title: 'Your personal pricing assistant',
        text: "The calculator isn't only for clients. Many masters use it every day to price a new leotard quickly, miss nothing, and quote the cost with confidence.",
      },
    },

    moreThan: {
      title: 'RhythmIQ — more than a calculator',
      text: "It's a tool that helps a studio receive inquiries, understand client preferences, price faster, and turn interest in a leotard into a real conversation.",
      cards: [
        'Assistant for clients',
        'Source of statistics and insights',
        'A reason for first contact',
        'Pricing tool inside the atelier',
        'Saves time on messaging',
      ],
    },

    infoCard: {
      title: 'Want your own Smart Order System?',
      items: [
        'your logo',
        'your colors',
        'your Instagram photos',
        'your WhatsApp',
        'your prices and pricing rules',
        'personalized settings',
        'initial setup included',
        'monthly calculator updates and additions',
        'a tool for your clients',
        'a tool for use inside the atelier',
      ],
      button: 'Contact us',
    },

    finalSales: {
      title: 'Want a Smart Order System for your atelier?',
      subtitle: 'Included:',
      includes: [
        'your logo',
        'your colors',
        'your WhatsApp',
        'your Instagram gallery',
        'automatic request collection',
        "automatic calculation of all extras and surcharges in the leotard's price",
        "history of every client calculation, including those who didn't submit a request",
        'hosting and support',
      ],
      button: 'Request information',
      simpleConnect: {
        title: 'Easy setup',
        intro: 'No complex configuration required.',
        text: 'Once your system is live, you simply get a ready-to-use link to your personal Smart Order System.',
        howTitle: 'All you need to do:',
        howItems: [
          'add the link to your Instagram bio',
          'place it on Taplink or your website',
          'share it via WhatsApp or Telegram',
          'use it in stories, Reels and ads',
        ],
        outcome: 'Clients run the calculation themselves, and pre-orders come straight to you.',
        always: "Everything works 24 hours a day — even when you're busy sewing or can't reply right away.",
      },
    },

    demoBadge: {
      title: 'Live demo',
      text: 'An interactive demo of RhythmIQ. Your version will be fully personalized for your atelier.',
    },

    tryDemo: 'Try Demo',
    back: '← Back',
    poweredBy: 'Powered by',
    sendRequest: '💬 Send my request',
    onInstagram: 'on Instagram',
    bridgeText: "This is exactly the kind of request your client would send you — complete and ready to act on.",
    bridgeButton: '✨ Get this for your atelier',
    restartDemo: '↺ Restart demo',
    contactWhatsApp: 'WhatsApp',
    contactInstagram: 'Instagram',

    mainColor: {
      title: "Choose the leotard's main color",
      hint: 'Tap a color',
      selected: 'Selected color',
      dontKnow: "I'm not sure yet",
    },

    fabric: {
      title: 'Choose the fabric for the base',
      hint: 'Tap a fabric (you can choose several)',
      trustMaster: "I'll let the master choose the fabric",
      trustNote: "You've let the master choose the fabric",
      incompatible: {
        title: "Multicolor isn't possible with this fabric",
        text: "This fabric can't be dyed in multiple colors. Please choose another fabric, another color, or tap \"I'll let the master choose\".",
        chooseOtherFabric: 'Choose another fabric',
        chooseOtherColor: 'Choose another color',
        trustMaster: "I'll let the master choose",
      },
      types: {
        'velvet-smooth':   'Smooth velvet',
        'velvet-crushed':  'Crushed velvet',
        'biflex-glossy':   'Glossy biflex',
        'biflex-matte':    'Matte biflex',
        'biflex-hologram': 'Biflex with hologram effect',
        'biflex-silk':     'Biflex with silk effect',
        'mesh':            'Mesh',
        'biflex-print':    'Biflex with print',
        'velvet-embossed': 'Smooth velvet with embossed print',
      },
    },
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
      genericNote: 'В демо используется обобщенный бренд ателье. Каждая студия получает свой логотип, цвета и фото.',
    },

    features: [
      'Расчет стоимости',
      'Понимание предпочтений клиентов',
      'Предварительные заявки прямо в ваш WhatsApp',
      'История всех расчетов клиентов',
      'Персонализация под ваше ателье',
      'Быстрый расчет для мастера',
    ],
    featuresNote: 'Каждый расчет клиента помогает вам лучше понимать спрос: какие модели, элементы и опции выбирают чаще всего.',

    benefitsTitle: 'Почему студии выбирают RhythmIQ',
    benefits: [
      'Экономит часы на ответах на одинаковые вопросы, которые не приводят к заказу',
      'Помогает понять спрос и предпочтения клиентов',
      'Помогает обсуждать бюджет еще до начала работы',
      'Предварительные заявки приходят прямо в WhatsApp',
      'Сокращает время мастера на переписке, которая не приводит к заказам',
      'Дает повод клиенту связаться с вами',
    ],

    testimonialsTitle: 'Отзывы студий',
    testimonials: [
      { quote: 'Клиенты приходят уже более подготовленными, а я трачу меньше времени на объяснения', author: 'Елена', studio: 'Dream Spark Atelier' },
      { quote: 'После калькулятора люди чаще доходят до переписки и заказа', author: 'София', studio: 'Греция' },
      { quote: 'Мне стало проще обсуждать бюджет и предлагать подходящие варианты', author: 'Мария', studio: 'Испания' },
    ],

    worksForYou: {
      title: 'Калькулятор работает на вас',
      subtitle: 'Используйте Smart Order System внутри ателье',
      items: [
        'Быстро рассчитывайте стоимость новых заказов',
        'Не держите цены и надбавки в голове',
        'Все надбавки на доп. опции рассчитываются автоматически',
        'Проверяйте цену на собственные изделия за несколько секунд',
        'Используйте свой калькулятор при личном общении с клиентом',
        'Единая система расчета для всего ателье, особенно если работает несколько мастеров',
      ],
      helperCard: {
        title: 'Ваш персональный помощник по расчету стоимости',
        text: 'Калькулятором пользуются не только клиенты. Многие мастера используют его каждый день, чтобы быстро рассчитать цену нового купальника, ничего не забыть и уверенно назвать стоимость.',
      },
    },

    moreThan: {
      title: 'RhythmIQ — больше, чем калькулятор',
      text: 'Это инструмент, который помогает студии принимать обращения, анализировать предпочтения клиентов, быстрее считать стоимость и превращать интерес к купальнику в реальный диалог.',
      cards: [
        'Помощник для клиентов',
        'Источник статистики и аналитики',
        'Повод для первого контакта',
        'Инструмент расчета внутри ателье',
        'Экономия времени на переписках',
      ],
    },

    infoCard: {
      title: 'Хотите свою Smart Order System?',
      items: [
        'ваш логотип',
        'ваши цвета',
        'ваши фото из Instagram',
        'ваш WhatsApp',
        'ваши цены и ваши правила расчета',
        'индивидуальные настройки',
        'первоначальная настройка включена',
        'обновления и дополнения в калькулятор доступны ежемесячно',
        'инструмент для ваших клиентов',
        'инструмент для работы внутри ателье',
      ],
      button: 'Связаться с нами',
    },

    finalSales: {
      title: 'Хотите Smart Order System для вашего ателье?',
      subtitle: 'Включено:',
      includes: [
        'ваш логотип',
        'ваши цвета',
        'ваш WhatsApp',
        'ваша галерея Instagram',
        'автоматический сбор заявок',
        'автоматический расчет всех доплат и надбавок в стоимости купальника',
        'история всех расчетов клиентов, даже тех, кто не отправил заявку',
        'хостинг и поддержка',
      ],
      button: 'Запросить информацию',
      simpleConnect: {
        title: 'Простое подключение',
        intro: 'Никаких сложных настроек не требуется.',
        text: 'После запуска вы просто получаете готовую ссылку на свою персональную Smart Order System.',
        howTitle: 'Достаточно:',
        howItems: [
          'добавить ссылку в шапку профиля Instagram',
          'разместить ее в Taplink или на своем сайте',
          'прикрепить к WhatsApp или Telegram',
          'использовать в сторис, Reels и рекламных объявлениях',
        ],
        outcome: 'Клиенты смогут самостоятельно пройти расчет, а предварительные заявки будут приходить прямо к вам.',
        always: 'Все работает 24 часа в сутки, даже когда вы заняты пошивом или не можете сразу ответить на сообщения.',
      },
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
    bridgeText: 'Именно такую заявку пришлет вам клиент — полную и готовую.',
    bridgeButton: '✨ Хочу такое для своего ателье',
    restartDemo: '↺ Начать заново',
    contactWhatsApp: 'WhatsApp',
    contactInstagram: 'Instagram',

    mainColor: {
      title: 'Выберите основной цвет купальника',
      hint: 'Нажмите на кружок с цветом',
      selected: 'Выбранный цвет',
      dontKnow: 'Пока не знаю',
    },

    fabric: {
      title: 'Выберите желаемый тип ткани для основы',
      hint: 'Нажмите на ткань (можно выбрать несколько)',
      trustMaster: 'Доверяю выбор подходящей ткани мастеру',
      trustNote: 'Вы доверили мастеру выбор ткани',
      incompatible: {
        title: 'Многоцвет невозможен для этой ткани',
        text: 'Этот тип ткани не поддается окраске в несколько цветов. Пожалуйста, выберите другой тип ткани, другой цвет или нажмите кнопку «Доверяю выбор мастеру».',
        chooseOtherFabric: 'Выбрать другую ткань',
        chooseOtherColor: 'Выбрать другой цвет',
        trustMaster: 'Доверяю выбор мастеру',
      },
      types: {
        'velvet-smooth':   'Гладкий бархат',
        'velvet-crushed':  'Краш бархат (мятый)',
        'biflex-glossy':   'Глянцевый бифлекс',
        'biflex-matte':    'Матовый бифлекс',
        'biflex-hologram': 'Бифлекс с эффектом голограммы',
        'biflex-silk':     'Бифлекс с эффектом шелка',
        'mesh':            'Сетка',
        'biflex-print':    'Бифлекс с принтом',
        'velvet-embossed': 'Гладкий бархат с объемным принтом',
      },
    },
  },
}

// Pick the demo content for the active language (only EN/RU supported in the demo).
export const getDemoContent = (language) => demoContent[language === 'ru' ? 'ru' : 'en']

export default demoContent
