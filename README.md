# Калькулятор купальников

Веб-приложение для расчета стоимости гимнастических купальников на заказ.

## Структура проекта

```
.
├── backend/          # Node.js + Express API
│   ├── server.js
│   ├── config/
│   │   └── prices.js
│   ├── package.json
│   ├── Prices.csv
│   └── .env
├── frontend/         # React + Vite приложение
│   ├── src/
│   │   ├── components/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── App.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
├── Prices.csv        # Данные о ценах
├── Workflow.md       # Описание интерфейса
└── README.md
```

## Установка и запуск

### 1. Установка зависимостей бэкенда

```bash
cd backend
npm install
```

### 2. Установка зависимостей фронтенда

```bash
cd frontend
npm install
```

### 3. Запуск бэкенда

```bash
cd backend
npm run dev
```

Сервер запустится на `http://localhost:5001`

### 4. Запуск фронтенда (в новом терминале)

```bash
cd frontend
npm run dev
```

Приложение откроется на `http://localhost:5173`

## API Endpoints

### POST /api/calculate-price

Рассчитывает цену купальника.

**Request:**
```json
{
  "level": "Standard",
  "height": "170+",
  "sleeves": 1,
  "hasSkirt": true,
  "hasFeathers": false,
  "hasSwarovski": false
}
```

**Response:**
```json
{
  "basePrice": 250,
  "heightModifier": 20,
  "priceWithHeight": 300,
  "sleevePrice": 20,
  "skirtPrice": 30,
  "feathersPrice": 0,
  "swarovskiPrice": 0,
  "finalPrice": 350,
  "currency": "EUR",
  "breakdown": { ... }
}
```

## Функциональность

1. **Выбор бюджета** → определяет уровень (Elite/Standard/Economy)
2. **Ввод роста** → применяется модификатор цены
3. **Выбор рукавов** → добавляет стоимость
4. **Выбор дополнений** → юбка, перья, камни Swarovski
5. **Пожелания** → текстовое поле для комментариев
6. **Расчет цены** → показывает подробную разбивку

## Цена расчитывается по формуле:

```
finalPrice = basePrice + (basePrice × heightModifier/100) + sleeves×sleevePrice + additions
```

Данные берутся из файла `Prices.csv`.

## Требования к дизайну

- Фон: `#990099` (фиолетовый)
- Шрифт: Montserrat (из Google Fonts)
- Адаптивный дизайн для мобильных и десктопов

## Технический стек

- **Бэкенд:** Node.js, Express, CSV Parser
- **Фронтенд:** React, Vite
- **Стили:** CSS3
- **Язык:** Русский

## Лицензия

MIT
