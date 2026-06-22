// Shared color palette for the demo (main-color step + fabric tinting).
// Each color has a `group` for visual grouping on the step. Groups render in
// this order: neutrals, metallics, pastels, bright, neon, special.

export const COLOR_GROUPS = ['neutrals', 'metallics', 'pastels', 'bright', 'neon', 'special']

export const GROUP_LABELS = {
  neutrals:  { en: 'Neutrals',         ru: 'Нейтральные',  es: 'Neutros' },
  metallics: { en: 'Metallics',        ru: 'Металлики',    es: 'Metálicos' },
  pastels:   { en: 'Pastels',          ru: 'Пастельные',   es: 'Pasteles' },
  bright:    { en: 'Bright colors',    ru: 'Яркие цвета',  es: 'Colores vivos' },
  neon:      { en: 'Neon colors',      ru: 'Неоновые',     es: 'Neones' },
  special:   { en: 'Multicolor',       ru: 'Многоцветный', es: 'Multicolor' },
}

export const COLORS = [
  // Neutrals (black, white, beige tones, greys, charcoal)
  { id: 'black',     group: 'neutrals', hex: '#1a1a1a',  name: { en: 'Black',        ru: 'Черный',           es: 'Negro' } },
  { id: 'white',     group: 'neutrals', hex: '#ffffff',  name: { en: 'White',        ru: 'Белый',            es: 'Blanco' } },
  { id: 'champagne', group: 'neutrals', hex: '#e9d9b8',  name: { en: 'Champagne',    ru: 'Шампань',          es: 'Champán' } },
  { id: 'nude',      group: 'neutrals', hex: '#e0bda0',  name: { en: 'Nude',         ru: 'Бежевый телесный', es: 'Nude' } },
  { id: 'brown',     group: 'neutrals', hex: '#6d4c2c',  name: { en: 'Brown',        ru: 'Коричневый',       es: 'Marrón' } },
  { id: 'pearl',     group: 'neutrals', hex: '#e8e6e2',  name: { en: 'Pearl grey',   ru: 'Жемчужно-серый',   es: 'Gris perla' } },
  { id: 'grey',      group: 'neutrals', hex: '#8a8a8a',  name: { en: 'Grey',         ru: 'Серый',            es: 'Gris' } },
  { id: 'graphite',  group: 'neutrals', hex: '#4a4a4a',  name: { en: 'Graphite',     ru: 'Графитовый',       es: 'Grafito' } },
  { id: 'charcoal',  group: 'neutrals', hex: '#2b2b2b',  name: { en: 'Charcoal',     ru: 'Угольный',         es: 'Antracita' } },

  // Metallics
  { id: 'gold',      group: 'metallics', hex: '#C2A36B',  name: { en: 'Gold',        ru: 'Золото',           es: 'Oro' } },
  { id: 'rose-gold', group: 'metallics', hex: '#b76e79',  name: { en: 'Rose gold',   ru: 'Розовое золото',   es: 'Oro rosa' } },
  { id: 'silver',    group: 'metallics', hex: '#bdbdbd',  name: { en: 'Silver',      ru: 'Серебро',          es: 'Plata' } },

  // Pastels
  { id: 'peach',     group: 'pastels', hex: '#ffb38a',  name: { en: 'Peach',         ru: 'Персиковый',       es: 'Melocotón' } },
  { id: 'pink',      group: 'pastels', hex: '#f29ec4',  name: { en: 'Pink',          ru: 'Розовый',          es: 'Rosa' } },
  { id: 'lavender',  group: 'pastels', hex: '#b497d1',  name: { en: 'Lavender',      ru: 'Лавандовый',       es: 'Lavanda' } },
  { id: 'sky',       group: 'pastels', hex: '#7ec4e8',  name: { en: 'Sky blue',      ru: 'Голубой',          es: 'Azul cielo' } },
  { id: 'mint',      group: 'pastels', hex: '#aedfcf',  name: { en: 'Mint',          ru: 'Мятный',           es: 'Menta' } },

  // Bright
  { id: 'red',       group: 'bright', hex: '#d62828',  name: { en: 'Red',            ru: 'Красный',          es: 'Rojo' } },
  { id: 'burgundy',  group: 'bright', hex: '#7a1f2b',  name: { en: 'Burgundy',       ru: 'Бордо',            es: 'Burdeos' } },
  { id: 'coral',     group: 'bright', hex: '#ee7777',  name: { en: 'Coral',          ru: 'Коралловый',       es: 'Coral' } },
  { id: 'fuchsia',   group: 'bright', hex: '#c2185b',  name: { en: 'Fuchsia',        ru: 'Фуксия',           es: 'Fucsia' } },
  { id: 'purple',    group: 'bright', hex: '#5e35b1',  name: { en: 'Purple',         ru: 'Фиолетовый',       es: 'Morado' } },
  { id: 'plum',      group: 'bright', hex: '#5a2a48',  name: { en: 'Plum',           ru: 'Сливовый',         es: 'Ciruela' } },
  { id: 'navy',      group: 'bright', hex: '#0c2e6e',  name: { en: 'Navy blue',      ru: 'Темно-синий',      es: 'Azul marino' } },
  { id: 'blue',      group: 'bright', hex: '#2196f3',  name: { en: 'Blue',           ru: 'Синий',            es: 'Azul' } },
  { id: 'turquoise', group: 'bright', hex: '#3fbac2',  name: { en: 'Turquoise',      ru: 'Бирюзовый',        es: 'Turquesa' } },
  { id: 'teal',      group: 'bright', hex: '#0e8a8a',  name: { en: 'Teal',           ru: 'Темно-бирюзовый',  es: 'Verde azulado' } },
  { id: 'green',     group: 'bright', hex: '#2e7d32',  name: { en: 'Green',          ru: 'Зеленый',          es: 'Verde' } },
  { id: 'olive',     group: 'bright', hex: '#7a8a3a',  name: { en: 'Olive',          ru: 'Оливковый',        es: 'Oliva' } },
  { id: 'yellow',    group: 'bright', hex: '#f6c945',  name: { en: 'Yellow',         ru: 'Желтый',           es: 'Amarillo' } },
  { id: 'orange',    group: 'bright', hex: '#ef6c00',  name: { en: 'Orange',         ru: 'Оранжевый',        es: 'Naranja' } },

  // Neon / fluorescent
  { id: 'neon-pink',    group: 'neon', hex: '#ff2d95', name: { en: 'Neon pink',     ru: 'Неон розовый',    es: 'Rosa neón' } },
  { id: 'neon-magenta', group: 'neon', hex: '#ff00ff', name: { en: 'Neon magenta',  ru: 'Неон маджента',   es: 'Magenta neón' } },
  { id: 'neon-coral',   group: 'neon', hex: '#ff5e62', name: { en: 'Neon coral',    ru: 'Неон коралл',     es: 'Coral neón' } },
  { id: 'neon-orange',  group: 'neon', hex: '#ff7a00', name: { en: 'Neon orange',   ru: 'Неон оранжевый',  es: 'Naranja neón' } },
  { id: 'neon-yellow',  group: 'neon', hex: '#f2ff00', name: { en: 'Neon yellow',   ru: 'Неон желтый',     es: 'Amarillo neón' } },
  { id: 'neon-lime',    group: 'neon', hex: '#9aff00', name: { en: 'Neon lime',     ru: 'Неон салатовый',  es: 'Lima neón' } },
  { id: 'neon-green',   group: 'neon', hex: '#00ff66', name: { en: 'Neon green',    ru: 'Неон зеленый',    es: 'Verde neón' } },
  { id: 'neon-aqua',    group: 'neon', hex: '#00ffe0', name: { en: 'Neon aqua',     ru: 'Неон аква',       es: 'Agua neón' } },
  { id: 'neon-blue',    group: 'neon', hex: '#00b3ff', name: { en: 'Neon blue',     ru: 'Неон синий',      es: 'Azul neón' } },
  { id: 'neon-purple',  group: 'neon', hex: '#9d00ff', name: { en: 'Neon purple',   ru: 'Неон фиолетовый', es: 'Morado neón' } },

  // Special
  { id: 'multi',     group: 'special', hex: 'multi',   name: { en: 'Multicolor',    ru: 'Многоцветный',    es: 'Multicolor' } },
]

export const colorById = (id) => COLORS.find((c) => c.id === id) || null
