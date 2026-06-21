// Shared color palette for the demo (main-color step + fabric tinting).
export const COLORS = [
  // Base / classic
  { id: 'black',     hex: '#1a1a1a',  name: { en: 'Black',     ru: 'Черный' } },
  { id: 'white',     hex: '#ffffff',  name: { en: 'White',     ru: 'Белый' } },
  { id: 'champagne', hex: '#e9d9b8',  name: { en: 'Champagne', ru: 'Шампань' } },
  { id: 'gold',      hex: '#C2A36B',  name: { en: 'Gold',      ru: 'Золото' } },
  { id: 'rose-gold', hex: '#b76e79',  name: { en: 'Rose gold', ru: 'Розовое золото' } },
  { id: 'nude',      hex: '#e0bda0',  name: { en: 'Nude',      ru: 'Бежевый телесный' } },
  { id: 'brown',     hex: '#6d4c2c',  name: { en: 'Brown',     ru: 'Коричневый' } },

  // Reds / pinks / purples
  { id: 'red',       hex: '#d62828',  name: { en: 'Red',       ru: 'Красный' } },
  { id: 'burgundy',  hex: '#7a1f2b',  name: { en: 'Burgundy',  ru: 'Бордо' } },
  { id: 'coral',     hex: '#ee7777',  name: { en: 'Coral',     ru: 'Коралловый' } },
  { id: 'peach',     hex: '#ffb38a',  name: { en: 'Peach',     ru: 'Персиковый' } },
  { id: 'pink',      hex: '#f29ec4',  name: { en: 'Pink',      ru: 'Розовый' } },
  { id: 'fuchsia',   hex: '#c2185b',  name: { en: 'Fuchsia',   ru: 'Фуксия' } },
  { id: 'lavender',  hex: '#b497d1',  name: { en: 'Lavender',  ru: 'Лавандовый' } },
  { id: 'purple',    hex: '#5e35b1',  name: { en: 'Purple',    ru: 'Фиолетовый' } },
  { id: 'plum',      hex: '#5a2a48',  name: { en: 'Plum',      ru: 'Сливовый' } },

  // Blues / greens
  { id: 'navy',      hex: '#0c2e6e',  name: { en: 'Navy blue', ru: 'Темно-синий' } },
  { id: 'blue',      hex: '#2196f3',  name: { en: 'Blue',      ru: 'Синий' } },
  { id: 'sky',       hex: '#7ec4e8',  name: { en: 'Sky blue',  ru: 'Голубой' } },
  { id: 'turquoise', hex: '#3fbac2',  name: { en: 'Turquoise', ru: 'Бирюзовый' } },
  { id: 'teal',      hex: '#0e8a8a',  name: { en: 'Teal',      ru: 'Темно-бирюзовый' } },
  { id: 'mint',      hex: '#aedfcf',  name: { en: 'Mint',      ru: 'Мятный' } },
  { id: 'green',     hex: '#2e7d32',  name: { en: 'Green',     ru: 'Зеленый' } },
  { id: 'olive',     hex: '#7a8a3a',  name: { en: 'Olive',     ru: 'Оливковый' } },

  // Warm bright
  { id: 'yellow',    hex: '#f6c945',  name: { en: 'Yellow',    ru: 'Желтый' } },
  { id: 'orange',    hex: '#ef6c00',  name: { en: 'Orange',    ru: 'Оранжевый' } },

  // Greys
  { id: 'pearl',     hex: '#e8e6e2',  name: { en: 'Pearl grey', ru: 'Жемчужно-серый' } },
  { id: 'silver',    hex: '#bdbdbd',  name: { en: 'Silver',     ru: 'Серебро' } },
  { id: 'grey',      hex: '#8a8a8a',  name: { en: 'Grey',       ru: 'Серый' } },
  { id: 'graphite',  hex: '#4a4a4a',  name: { en: 'Graphite',   ru: 'Графитовый' } },
  { id: 'charcoal',  hex: '#2b2b2b',  name: { en: 'Charcoal',   ru: 'Угольный' } },

  // Neon / fluorescent
  { id: 'neon-pink',    hex: '#ff2d95', name: { en: 'Neon pink',    ru: 'Неон розовый' } },
  { id: 'neon-magenta', hex: '#ff00ff', name: { en: 'Neon magenta', ru: 'Неон маджента' } },
  { id: 'neon-coral',   hex: '#ff5e62', name: { en: 'Neon coral',   ru: 'Неон коралл' } },
  { id: 'neon-orange',  hex: '#ff7a00', name: { en: 'Neon orange',  ru: 'Неон оранжевый' } },
  { id: 'neon-yellow',  hex: '#f2ff00', name: { en: 'Neon yellow',  ru: 'Неон желтый' } },
  { id: 'neon-lime',    hex: '#9aff00', name: { en: 'Neon lime',    ru: 'Неон салатовый' } },
  { id: 'neon-green',   hex: '#00ff66', name: { en: 'Neon green',   ru: 'Неон зеленый' } },
  { id: 'neon-aqua',    hex: '#00ffe0', name: { en: 'Neon aqua',    ru: 'Неон аква' } },
  { id: 'neon-blue',    hex: '#00b3ff', name: { en: 'Neon blue',    ru: 'Неон синий' } },
  { id: 'neon-purple',  hex: '#9d00ff', name: { en: 'Neon purple',  ru: 'Неон фиолетовый' } },

  // Special
  { id: 'multi', hex: 'multi', name: { en: 'Multicolor', ru: 'Многоцветный' } },
]

export const colorById = (id) => COLORS.find((c) => c.id === id) || null
