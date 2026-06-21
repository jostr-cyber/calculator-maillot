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

// Spanish copy. Natural, modern Castilian — leans neutral for client-facing
// strings so it reads well in Spain and LATAM. "Atelier" kept as a loanword
// (industry-standard in Spanish-speaking fashion).
demoContent.es = {
  liveDemo: 'Demo',

  product: {
    name: 'RhythmIQ Smart Order System',
    subtitle: 'Calculadora de maillots para estudios de gimnasia rítmica',
    calculatorName: 'Calculadora interactiva de maillots',
  },

  atelier: {
    name: 'RG Leotards Studio',
    logoPlaceholder: 'Aquí irá el logo de tu atelier',
    genericNote: 'Esta demo usa una identidad genérica de atelier. Cada estudio recibe su propio logo, colores y fotos.',
  },

  features: [
    'Estimación de precios',
    'Comprensión de las preferencias del cliente',
    'Solicitudes previas directamente a tu WhatsApp',
    'Historial completo de cada cálculo de cliente',
    'Personalizado para tu atelier',
    'Cálculo rápido para la maestra',
  ],
  featuresNote: 'Cada cálculo de cliente te ayuda a entender mejor la demanda: qué modelos, elementos y opciones se eligen con más frecuencia.',

  benefitsTitle: 'Por qué los estudios eligen RhythmIQ',
  benefits: [
    'Ahorra horas respondiendo las mismas preguntas que no llevan a un pedido',
    'Te ayuda a entender la demanda y las preferencias del cliente',
    'Te ayuda a hablar del presupuesto antes de empezar el trabajo',
    'Las solicitudes previas llegan directamente a tu WhatsApp',
    'Reduce el tiempo dedicado a conversaciones que no acaban en pedido',
    'Le da al cliente un motivo para contactarte',
  ],

  testimonialsTitle: 'Lo que dicen los estudios',
  testimonials: [
    { quote: 'Los clientes llegan mejor preparados y dedico menos tiempo a explicar', author: 'Elena', studio: 'Dream Spark Atelier' },
    { quote: 'Después de usar la calculadora, la gente da el paso más a menudo: escribe y hace el pedido', author: 'Sofía', studio: 'Grecia' },
    { quote: 'Es más fácil hablar del presupuesto y sugerir opciones adecuadas', author: 'María', studio: 'España' },
  ],

  worksForYou: {
    title: 'La calculadora trabaja para ti',
    subtitle: 'Usa Smart Order System dentro del atelier',
    items: [
      'Calcula rápidamente el precio de los nuevos pedidos',
      'Deja de tener los precios y los recargos en la cabeza',
      'Todos los recargos por opciones adicionales se calculan automáticamente',
      'Comprueba el precio de tu propio trabajo en segundos',
      'Usa la calculadora durante las reuniones presenciales con la clienta',
      'Un único sistema de cálculo para todo el atelier, especialmente cuando trabajan varias maestras',
    ],
    helperCard: {
      title: 'Tu asistente personal de precios',
      text: 'La calculadora no es solo para los clientes. Muchas maestras la usan a diario para calcular rápido el precio de un nuevo maillot, no olvidar nada y dar el precio con seguridad.',
    },
  },

  moreThan: {
    title: 'RhythmIQ — más que una calculadora',
    text: 'Es una herramienta que ayuda al estudio a recibir consultas, entender las preferencias del cliente, calcular más rápido y convertir el interés por un maillot en una conversación real.',
    cards: [
      'Asistente para clientes',
      'Fuente de estadísticas y análisis',
      'Un motivo para el primer contacto',
      'Herramienta de cálculo dentro del atelier',
      'Ahorra tiempo en mensajes',
    ],
  },

  infoCard: {
    title: '¿Quieres tu propio Smart Order System?',
    items: [
      'tu logo',
      'tus colores',
      'tus fotos de Instagram',
      'tu WhatsApp',
      'tus precios y tus reglas de cálculo',
      'configuración personalizada',
      'configuración inicial incluida',
      'actualizaciones y ampliaciones mensuales de la calculadora',
      'una herramienta para tus clientes',
      'una herramienta para usar dentro del atelier',
    ],
    button: 'Contáctanos',
  },

  finalSales: {
    title: '¿Quieres un Smart Order System para tu atelier?',
    subtitle: 'Incluye:',
    includes: [
      'tu logo',
      'tus colores',
      'tu WhatsApp',
      'tu galería de Instagram',
      'recogida automática de solicitudes',
      'cálculo automático de todos los extras y recargos en el precio del maillot',
      'historial de cada cálculo de cliente, incluso de quienes no enviaron solicitud',
      'hosting y soporte',
    ],
    button: 'Solicitar información',
    simpleConnect: {
      title: 'Puesta en marcha sencilla',
      intro: 'No requiere ninguna configuración compleja.',
      text: 'Una vez activado tu sistema, recibirás un enlace personalizado, listo para usar, a tu Smart Order System.',
      howTitle: 'Lo único que tienes que hacer:',
      howItems: [
        'añadir el enlace a tu bio de Instagram',
        'colocarlo en Taplink o en tu web',
        'compartirlo por WhatsApp o Telegram',
        'usarlo en stories, Reels y anuncios',
      ],
      outcome: 'Los clientes hacen el cálculo por su cuenta y las solicitudes previas llegan directamente a ti.',
      always: 'Todo funciona las 24 horas del día, incluso cuando estás ocupada cosiendo o no puedes responder al instante.',
    },
  },

  demoBadge: {
    title: 'Demo',
    text: 'Una demo interactiva de RhythmIQ. Tu versión estará totalmente personalizada para tu atelier.',
  },

  tryDemo: 'Probar demo',
  back: '← Atrás',
  poweredBy: 'Funciona con',
  sendRequest: '💬 Enviar mi solicitud',
  onInstagram: 'en Instagram',
  bridgeText: 'Esta es exactamente la solicitud que te enviaría tu cliente: completa y lista para gestionar.',
  bridgeButton: '✨ Quiero esto para mi atelier',
  restartDemo: '↺ Reiniciar demo',
  contactWhatsApp: 'WhatsApp',
  contactInstagram: 'Instagram',

  mainColor: {
    title: 'Elige el color principal del maillot',
    hint: 'Toca un color',
    selected: 'Color seleccionado',
    dontKnow: 'Aún no lo sé',
  },

  fabric: {
    title: 'Elige el tipo de tela para la base',
    hint: 'Toca una tela (puedes elegir varias)',
    trustMaster: 'Confío en la elección de tela de la maestra',
    trustNote: 'Has confiado a la maestra la elección de la tela',
    incompatible: {
      title: 'El multicolor no es posible con esta tela',
      text: 'Este tipo de tela no se puede teñir en varios colores. Por favor, elige otra tela, otro color o toca «Confío en la elección de la maestra».',
      chooseOtherFabric: 'Elegir otra tela',
      chooseOtherColor: 'Elegir otro color',
      trustMaster: 'Confío en la elección de la maestra',
    },
    types: {
      'velvet-smooth':   'Terciopelo liso',
      'velvet-crushed':  'Terciopelo crash (arrugado)',
      'biflex-glossy':   'Biflex brillante',
      'biflex-matte':    'Biflex mate',
      'biflex-hologram': 'Biflex con efecto holograma',
      'biflex-silk':     'Biflex con efecto seda',
      'mesh':            'Malla',
      'biflex-print':    'Biflex estampado',
      'velvet-embossed': 'Terciopelo liso con estampado en relieve',
    },
  },
}

// Pick the demo content for the active language (EN / RU / ES supported in the demo).
export const getDemoContent = (language) => demoContent[language] || demoContent.en

export default demoContent
