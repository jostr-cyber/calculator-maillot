// Shared color palette for the demo (main-color step + fabric tinting).
export const COLORS = [
  // Base / classic
  { id: 'black',     hex: '#1a1a1a',  name: { en: 'Black',     ru: 'Черный',           es: 'Negro' } },
  { id: 'white',     hex: '#ffffff',  name: { en: 'White',     ru: 'Белый',            es: 'Blanco' } },
  { id: 'champagne', hex: '#e9d9b8',  name: { en: 'Champagne', ru: 'Шампань',          es: 'Champán' } },
  { id: 'gold',      hex: '#C2A36B',  name: { en: 'Gold',      ru: 'Золото',           es: 'Oro' } },
  { id: 'rose-gold', hex: '#b76e79',  name: { en: 'Rose gold', ru: 'Розовое золото',   es: 'Oro rosa' } },
  { id: 'nude',      hex: '#e0bda0',  name: { en: 'Nude',      ru: 'Бежевый телесный', es: 'Nude' } },
  { id: 'brown',     hex: '#6d4c2c',  name: { en: 'Brown',     ru: 'Коричневый',       es: 'Marrón' } },

  // Reds / pinks / purples
  { id: 'red',       hex: '#d62828',  name: { en: 'Red',       ru: 'Красный',          es: 'Rojo' } },
  { id: 'burgundy',  hex: '#7a1f2b',  name: { en: 'Burgundy',  ru: 'Бордо',            es: 'Burdeos' } },
  { id: 'coral',     hex: '#ee7777',  name: { en: 'Coral',     ru: 'Коралловый',       es: 'Coral' } },
  { id: 'peach',     hex: '#ffb38a',  name: { en: 'Peach',     ru: 'Персиковый',       es: 'Melocotón' } },
  { id: 'pink',      hex: '#f29ec4',  name: { en: 'Pink',      ru: 'Розовый',          es: 'Rosa' } },
  { id: 'fuchsia',   hex: '#c2185b',  name: { en: 'Fuchsia',   ru: 'Фуксия',           es: 'Fucsia' } },
  { id: 'lavender',  hex: '#b497d1',  name: { en: 'Lavender',  ru: 'Лавандовый',       es: 'Lavanda' } },
  { id: 'purple',    hex: '#5e35b1',  name: { en: 'Purple',    ru: 'Фиолетовый',       es: 'Morado' } },
  { id: 'plum',      hex: '#5a2a48',  name: { en: 'Plum',      ru: 'Сливовый',         es: 'Ciruela' } },

  // Blues / greens
  { id: 'navy',      hex: '#0c2e6e',  name: { en: 'Navy blue', ru: 'Темно-синий',      es: 'Azul marino' } },
  { id: 'blue',      hex: '#2196f3',  name: { en: 'Blue',      ru: 'Синий',            es: 'Azul' } },
  { id: 'sky',       hex: '#7ec4e8',  name: { en: 'Sky blue',  ru: 'Голубой',          es: 'Azul cielo' } },
  { id: 'turquoise', hex: '#3fbac2',  name: { en: 'Turquoise', ru: 'Бирюзовый',        es: 'Turquesa' } },
  { id: 'teal',      hex: '#0e8a8a',  name: { en: 'Teal',      ru: 'Темно-бирюзовый',  es: 'Verde azulado' } },
  { id: 'mint',      hex: '#aedfcf',  name: { en: 'Mint',      ru: 'Мятный',           es: 'Menta' } },
  { id: 'green',     hex: '#2e7d32',  name: { en: 'Green',     ru: 'Зеленый',          es: 'Verde' } },
  { id: 'olive',     hex: '#7a8a3a',  name: { en: 'Olive',     ru: 'Оливковый',        es: 'Oliva' } },

  // Warm bright
  { id: 'yellow',    hex: '#f6c945',  name: { en: 'Yellow',    ru: 'Желтый',           es: 'Amarillo' } },
  { id: 'orange',    hex: '#ef6c00',  name: { en: 'Orange',    ru: 'Оранжевый',        es: 'Naranja' } },

  // Greys
  { id: 'pearl',     hex: '#e8e6e2',  name: { en: 'Pearl grey', ru: 'Жемчужно-серый',  es: 'Gris perla' } },
  { id: 'silver',    hex: '#bdbdbd',  name: { en: 'Silver',     ru: 'Серебро',         es: 'Plata' } },
  { id: 'grey',      hex: '#8a8a8a',  name: { en: 'Grey',       ru: 'Серый',           es: 'Gris' } },
  { id: 'graphite',  hex: '#4a4a4a',  name: { en: 'Graphite',   ru: 'Графитовый',      es: 'Grafito' } },
  { id: 'charcoal',  hex: '#2b2b2b',  name: { en: 'Charcoal',   ru: 'Угольный',        es: 'Antracita' } },

  // Neon / fluorescent
  { id: 'neon-pink',    hex: '#ff2d95', name: { en: 'Neon pink',    ru: 'Неон розовый',    es: 'Rosa neón' } },
  { id: 'neon-magenta', hex: '#ff00ff', name: { en: 'Neon magenta', ru: 'Неон маджента',   es: 'Magenta neón' } },
  { id: 'neon-coral',   hex: '#ff5e62', name: { en: 'Neon coral',   ru: 'Неон коралл',     es: 'Coral neón' } },
  { id: 'neon-orange',  hex: '#ff7a00', name: { en: 'Neon orange',  ru: 'Неон оранжевый',  es: 'Naranja neón' } },
  { id: 'neon-yellow',  hex: '#f2ff00', name: { en: 'Neon yellow',  ru: 'Неон желтый',     es: 'Amarillo neón' } },
  { id: 'neon-lime',    hex: '#9aff00', name: { en: 'Neon lime',    ru: 'Неон салатовый',  es: 'Lima neón' } },
  { id: 'neon-green',   hex: '#00ff66', name: { en: 'Neon green',   ru: 'Неон зеленый',    es: 'Verde neón' } },
  { id: 'neon-aqua',    hex: '#00ffe0', name: { en: 'Neon aqua',    ru: 'Неон аква',       es: 'Agua neón' } },
  { id: 'neon-blue',    hex: '#00b3ff', name: { en: 'Neon blue',    ru: 'Неон синий',      es: 'Azul neón' } },
  { id: 'neon-purple',  hex: '#9d00ff', name: { en: 'Neon purple',  ru: 'Неон фиолетовый', es: 'Morado neón' } },

  // Special
  { id: 'multi', hex: 'multi', name: { en: 'Multicolor', ru: 'Многоцветный', es: 'Multicolor' } },
]

export const colorById = (id) => COLORS.find((c) => c.id === id) || null
