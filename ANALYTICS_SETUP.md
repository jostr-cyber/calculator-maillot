# 📊 Настройка аналитики (Vercel KV + Telegram)

Чтобы расчёты клиентов **сохранялись 24/7** и приходили тебе **в Telegram** —
нужно один раз настроить 3 вещи. Времени: ~15 минут.

---

## ШАГ 1. Создать Telegram-бот (3 минуты)

1. В Telegram открой **[@BotFather](https://t.me/BotFather)**
2. Напиши `/newbot`
3. Придумай **название** (например: `RhythmIQ Analytics`)
4. Придумай **username** заканчивающийся на `_bot` (например: `rhythmiq_calc_bot`)
5. BotFather пришлёт **токен** вида:
   ```
   7891234567:AAGqWk_xxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. **Скопируй и сохрани** — это `TELEGRAM_BOT_TOKEN`

---

## ШАГ 2. Узнать свой Telegram chat_id (1 минута)

1. Открой созданного бота **в Telegram** и нажми **Start**
2. Затем открой **[@userinfobot](https://t.me/userinfobot)** и нажми `/start`
3. Бот пришлёт **`Id: 123456789`**
4. **Скопируй и сохрани** — это `TELEGRAM_CHAT_ID`

> Альтернативно: открой в браузере `https://api.telegram.org/bot<TOKEN>/getUpdates` после того как написал что-то своему боту, и найди `"chat":{"id":...}`.

---

## ШАГ 3. Включить Vercel KV (3 минуты)

1. Заходи в **[Vercel Dashboard](https://vercel.com/dashboard)** → твой проект **calculator-maillot**
2. Сверху → вкладка **Storage**
3. Кнопка **Create Database** → выбери **Upstash Redis** (бывшая Vercel KV)
4. Имя: `rhythmiq-analytics` (или любое)
5. Регион — поближе, **Frankfurt (fra1)** или **London (lhr1)**
6. Нажми **Create** → потом **Connect Project** → выбери `calculator-maillot`
7. Vercel **автоматически добавит** в проект переменные окружения:
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_URL`
   - `KV_REST_API_READ_ONLY_TOKEN`

   Ничего самой настраивать не надо.

---

## ШАГ 4. Добавить остальные env-переменные (2 минуты)

1. Vercel → твой проект → **Settings** → **Environment Variables**
2. Добавь **3 переменные** (выбирай scope: Production, Preview, Development):

| Имя | Значение |
|---|---|
| `TELEGRAM_BOT_TOKEN` | токен из шага 1 |
| `TELEGRAM_CHAT_ID` | id из шага 2 |
| `ANALYTICS_KEY` | придумай свой пароль, например `rg-dash-2026-xxxxx` (он защищает дашборд) |

3. Нажми **Save** на каждую

---

## ШАГ 5. Передеплоить (1 минута)

1. Любой `git push` в main триггерит передеплой и Vercel подтянет новые env-переменные
2. Или вручную: Vercel → проект → **Deployments** → последний → меню `⋯` → **Redeploy**

---

## ШАГ 6. Проверить (1 минута)

1. Открой **боевой сайт** (`calculator-maillot.vercel.app` или твой домен)
2. Пройди калькулятор до финального экрана
3. **В Telegram** должно прийти сообщение:
   ```
   📊 Новый расчёт
   RG-XXXXX

   💰 Цена: €450
   🎯 Бюджет: €300
   ⭐ Сложность: Advanced
   🌐 Язык: ru
   ...
   ```
4. Открой **дашборд**:
   `https://calculator-maillot.vercel.app/admin/analytics`

   Введи `ANALYTICS_KEY` который придумала в шаге 4 → увидишь расчёт в таблице.

---

## Где смотреть аналитику

- **🤖 Telegram** — мгновенные уведомления о каждом расчёте + отдельное «🔥 Клиент написал в WhatsApp!» когда жмёт кнопку
- **📊 Дашборд** — `https://calculator-maillot.vercel.app/admin/analytics` (или на телефоне)
  - 4 карточки сверху: всего / WhatsApp / снижали цену / средняя цена
  - Популярные опции (язык, источник дизайна, декор, аэрография)
  - Полная таблица расчётов с фильтрами и поиском
  - Обновляется автоматически каждые 30 секунд

---

## Что собирается

- **ID расчёта** (RG-XXXXX)
- **Все опции**: рост, рукава, юбка, декор, аэрография, стразы, срочность, дизайн-источник
- **Цены**: исходная + оптимизированная (если открывали «снизить цену»)
- **Бюджет клиента**
- **Сложность**: simple / advanced / luxury
- **Язык** клиента
- **Статус**: посчитал → открыл совет → нажал WhatsApp
- **Метаданные**: IP, браузер, откуда пришёл

---

## Локальная разработка (опционально)

Локально на твоём компьютере аналитика продолжает работать **через Express backend**
(порт 8000, файл `backend/data/calculations.json`). При деплое на Vercel —
тот же frontend автоматически использует Vercel KV + Telegram.

Локальный backend запускается так:
```bash
cd backend
node server.js
```

Локальный ключ дашборда (`/admin/analytics`): `rg-analytics-dev`
