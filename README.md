# 🏠 Xolid - Apartment Rental Catalog

Современное веб-приложение для просмотра списка квартир с фильтрацией, поддержка трех языков (таджикский, русский, английский).

[![Next.js](https://img.shields.io/badge/Next.js-16-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)

## ✨ Особенности

- ✅ **Полностью функциональные CRUD операции** (Create, Read, Update, Delete)
- 🌐 **3 языка** - Таджикский, Русский, Английский
- 🔍 **Фильтрация** по количеству комнат и цене
- ⚡ **Skeleton Loading** для улучшения UX
- 📱 **100% Адаптивный дизайн**
- 🎨 **Современный интерфейс** с CSS переменными
- 💾 **Фильтры сохраняются в URL**
- 🚀 **Оптимизированные компоненты**
- 📊 **SWR для кеширования данных**

## 🛠 Технологический стек

| Технология | Версия | Назначение |
|-----------|--------|-----------|
| Next.js | 16.2.9 | React фреймворк |
| React | 19.2.4 | UI библиотека |
| TypeScript | 5 | Строгая типизация |
| SWR | 2.4.1 | Кеширование данных |
| JSON Server | 1.0.0-beta.15 | Mock API (база данных) |
| Lucide React | 1.21.0 | SVG иконки |

## 📋 Требования

- **Node.js** 18+ 
- **npm** 9+
- Два открытых терминала (один для фронтенда, один для бэкенда)

## 🚀 Быстрый старт

### 1️⃣ Клонировать репозиторий

```bash
git clone https://github.com/xolidzabirov/Test-for-working-Bo-Bo-Web-Studio.git
cd xolid
```

### 2️⃣ Установить зависимости

```bash
npm install
```

### 3️⃣ Запустить JSON Server (база данных)

**В первом терминале:**

```bash
npm run backend
```

Сервер запустится на **http://localhost:3001**

Вы увидите:
```
  \{^_^}/ hi!

  Loading db.json
  Done

  Resources
  http://localhost:3001/apartments

  Home
  http://localhost:3001/
```

### 4️⃣ Запустить фронтенд (во втором терминале)

```bash
npm run dev -- --webpack
```

Откройте [http://localhost:3000](http://localhost:3000) в браузере

Вы увидите приложение с карточками квартир на таджикском языке по умолчанию.

## 📖 Как использовать

### Переключение языков 🌍

В правом углу Header есть кнопки:
- **TG** - Таджикский
- **РУ** - Русский
- **EN** - Английский

Язык сохраняется в `localStorage`

### Фильтрация квартир 🔍

**Левая сторона страницы - панель фильтров:**

1. **По комнатам** - нажмите на кнопку (Все, 1, 2, 3, 4+)
2. **По цене** - введите минимальную и максимальную цену
3. Фильтры применяются **автоматически** и сохраняются в URL

Пример URL с фильтрами:
```
http://localhost:3000/?rooms=2&minPrice=50000&maxPrice=100000
```

### Просмотр деталей квартиры 📍

Нажмите кнопку **"Подробнее"** / **"Taҳқиқи нигоҳ"** на карточке квартиры для просмотра полной информации.

## 📁 Структура проекта

```
xolid/
├── src/
│   ├── app/
│   │   ├── api/apartments/           # 🔌 API endpoints
│   │   │   ├── route.ts             # GET, POST /apartments
│   │   │   └── [id]/route.ts        # GET, PUT, DELETE /apartments/[id]
│   │   ├── apartments/[id]/
│   │   │   └── page.tsx             # 📄 Страница квартиры
│   │   ├── globals.css              # 🎨 Глобальные стили
│   │   ├── layout.tsx               # 📐 Layout
│   │   ├── page.tsx                 # 🏠 Главная страница
│   │   └── not-found.tsx            # ⚠️ 404 страница
│   ├── components/
│   │   ├── ApartmentCard.tsx        # 🎴 Карточка квартиры
│   │   ├── ApartmentList.tsx        # 📊 Список квартир
│   │   ├── Filters.tsx              # 🔎 Компонент фильтров
│   │   ├── Footer.tsx               # 👣 Подвал
│   │   ├── Header.tsx               # 📌 Заголовок
│   │   └── SkeletonCard.tsx         # ⏳ Skeleton loader
│   ├── types/
│   │   └── index.ts                 # 📝 TypeScript типы
│   └── lib/
│       └── i18n-utils.ts            # 🌐 Утилиты многоязычности
├── public/
│   └── assest/                      # 🖼️ Статические файлы
├── db.json                          # 💾 База данных
├── next.config.ts                   # ⚙️ Конфиг Next.js
├── tsconfig.json                    # ⚙️ Конфиг TypeScript
├── package.json                     # 📦 Зависимости
└── README.md                        # 📖 Документация
```

## 🔧 Доступные команды

```bash
# Запуск dev сервера
npm run dev -- --webpack

# Запуск JSON Server (база данных)
npm run backend

# Сборка для production
npm run build

# Запуск production версии
npm start

# ESLint проверка кода
npm run lint
```

## 🌐 API Endpoints

Base URL: `http://localhost:3000/api/apartments`

### GET - Получить квартиры
```bash
GET /api/apartments
GET /api/apartments?rooms=2&minPrice=50000&maxPrice=100000
```

**Response:**
```json
[
  {
    "id": 1,
    "title_tg": "...",
    "title_ru": "...",
    "title_en": "...",
    "price": 45000,
    "rooms": 1,
    "area": 32,
    "image": "https://...",
    "description_tg": "...",
    "description_ru": "...",
    "description_en": "..."
  }
]
```

### POST - Создать квартиру
```bash
POST /api/apartments
Content-Type: application/json

{
  "title_tg": "Квартира",
  "title_ru": "Квартира",
  "title_en": "Apartment",
  "price": 75000,
  "rooms": 2,
  "area": 50,
  "image": "https://...",
  "description_tg": "...",
  "description_ru": "...",
  "description_en": "..."
}
```

**Status: 201 Created**

### GET - Получить одну квартиру
```bash
GET /api/apartments/1
```

**Status: 200 OK** или **404 Not Found**

### PUT - Обновить квартиру
```bash
PUT /api/apartments/1
Content-Type: application/json
{ ... полные данные квартиры ... }
```

**Status: 200 OK** или **404 Not Found**

### DELETE - Удалить квартиру
```bash
DELETE /api/apartments/1
```

**Response:**
```json
{ "message": "Apartment deleted successfully" }
```

**Status: 200 OK** или **404 Not Found**

📌 Подробная документация API см. в `CRUD_API.md`

## 📚 Документация компонентов

Подробное объяснение компонентов и их работы находится в файле `CODE_EXPLANATION.md`

**Основные компоненты:**
- **Filters.tsx** - фильтрация с debounce для цены (450ms)
- **ApartmentList.tsx** - список с SWR кешированием
- **SkeletonCard.tsx** - placeholder при загрузке
- **ApartmentCard.tsx** - карточка квартиры с мультиязычностью

## 🎯 Функциональные требования (выполнено ✅)

- ✅ Список квартир на главной странице
- ✅ Фильтрация по комнатам и цене
- ✅ Страница деталей квартиры
- ✅ 404 страница для несуществующих квартир
- ✅ Фильтры сохраняются в URL
- ✅ Skeleton loading во время загрузки
- ✅ Поддержка 3 языков (TG, RU, EN)
- ✅ Полностью функциональные CRUD операции
- ✅ Адаптивный дизайн (мобильные, планшеты, ПК)
- ✅ TypeScript без `any` типов
- ✅ Чистый, читаемый код

## 🧪 Примеры использования API

### cURL

```bash
# Получить все квартиры
curl http://localhost:3000/api/apartments

# Получить с фильтрацией
curl "http://localhost:3000/api/apartments?rooms=2&minPrice=50000"

# Создать квартиру
curl -X POST http://localhost:3000/api/apartments \
  -H "Content-Type: application/json" \
  -d '{
    "title_tg": "Квартира",
    "title_ru": "Квартира",
    "title_en": "Apartment",
    "price": 75000,
    "rooms": 2,
    "area": 50,
    "image": "https://...",
    "description_tg": "...",
    "description_ru": "...",
    "description_en": "..."
  }'

# Обновить квартиру
curl -X PUT http://localhost:3000/api/apartments/1 \
  -H "Content-Type: application/json" \
  -d '{...}'

# Удалить квартиру
curl -X DELETE http://localhost:3000/api/apartments/1
```

### JavaScript/Fetch

```javascript
// GET все квартиры
const apartments = await fetch('/api/apartments')
  .then(r => r.json());

// POST - создать
const created = await fetch('/api/apartments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title_ru: 'Новая квартира',
    title_en: 'New apartment',
    title_tg: 'Квартираи нав',
    price: 75000,
    rooms: 2,
    area: 50,
    image: 'https://...',
    description_ru: '...',
    description_en: '...',
    description_tg: '...'
  })
}).then(r => r.json());

// PUT - обновить
const updated = await fetch('/api/apartments/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ ... })
}).then(r => r.json());

// DELETE - удалить
await fetch('/api/apartments/1', { method: 'DELETE' });
```

## 🎨 Пользовательский интерфейс

- 📌 **Header** с логотипом и переключателем языков (TG, РУ, EN)
- 🎯 **Hero секция** с приветствием на выбранном языке
- 🔎 **Фильтры** слева (комнаты, цена) с debounce
- 📊 **Сетка квартир** в центре (адаптивная, 1-3 колонки)
- 👣 **Footer** с информацией о компании и авторским правом
- 🌓 **Поддержка темной/светлой темы** - в зависимости от системных настроек

## 📱 Адаптивность

Приложение полностью адаптивно для:
- 📱 **Мобильные** (320px и выше)
- 📱 **Планшеты** (768px и выше)
- 🖥️ **Рабочие столы** (1024px и выше)

Используется:
- Flexbox и CSS Grid
- Media queries
- Responsive images через Next.js Image
- Touch-friendly UI элементы

## 🌍 Многоязычность

Все текстовые строки поддерживают 3 языка через параметр `locale`:

```typescript
// В db.json и API
{
  "id": 1,
  "title_tg": "Квартираи нав",        // Таджикский
  "title_ru": "Новая квартира",       // Русский
  "title_en": "New apartment",        // Английский
  "description_tg": "...",
  "description_ru": "...",
  "description_en": "..."
}
```

**Переключение языков:**
1. Нажмите TG/РУ/EN в Header
2. Язык сохраняется в `localStorage`
3. Все компоненты получают `locale` как props
4. Текст обновляется динамически

## ⚙️ Конфигурация

### Next.js (`next.config.ts`)
```typescript
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
};
```

### TypeScript (`tsconfig.json`)
- Строгие типы (`strict: true`)
- Path aliases: `@/*` для `src/*`

## 🐛 Troubleshooting

### Порт 3000/3001 занят

```bash
# Windows - найти процесс
netstat -ano | findstr ":3000"

# Убить процесс (замените PID)
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3000
kill -9 <PID>
```

### JSON Server не запускается

```bash
# Проверить порт 3001
npm run backend

# Если ошибка, проверить db.json
cat db.json
```

### Нет данных в приложении

1. Убедитесь, что `npm run backend` запущен на порту 3001
2. Проверьте консоль браузера (F12) на ошибки
3. Проверьте что URL в коде указывает на `localhost:3001`

### Ошибка "Image is missing required alt property"

Все изображения должны иметь `alt` текст:
```typescript
<Image
  src={...}
  alt="Descriptive text for the image"  // ← Обязательно!
  fill
/>
```

## 📊 Производительность

- **FCP** (First Contentful Paint): < 1s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **Image Optimization**: Автоматическая оптимизация через Next.js Image
- **Caching**: SWR кеширует данные на 2 секунды

## 📝 Данные

### Структура квартиры (db.json)

```json
{
  "id": 1,
  "title_tg": "Студияи худвору дар марказ",
  "title_ru": "Уютная студия в центре города",
  "title_en": "Cozy studio in the city center",
  "price": 45000,
  "rooms": 1,
  "area": 32,
  "image": "https://images.unsplash.com/...",
  "description_tg": "Студияи заибо...",
  "description_ru": "Стильная и компактная студия...",
  "description_en": "Stylish and compact studio..."
}
```

## 🤝 Контрибьютинг

Приветствуются pull requests! Для больших изменений сначала откройте issue.

## 📄 Лицензия

MIT - смотрите [LICENSE](LICENSE) для деталей

## 👨‍💻 Автор

Создано как тестовое задание для позиции **Frontend Developer**

- GitHub: [@xolidzabirov](https://github.com/xolidzabirov)

## 🎓 Что реализовано

- ✅ Next.js 16 с App Router
- ✅ React 19 с новыми хуками
- ✅ TypeScript strict mode (без `any`)
- ✅ REST API через Next.js API Routes
- ✅ Многоязычность на 3 языках
- ✅ Адаптивный дизайн на CSS
- ✅ Performance optimization
- ✅ Skeleton loading
- ✅ CRUD операции (Create, Read, Update, Delete)
- ✅ SWR кеширование данных
- ✅ Фильтрация с debounce
- ✅ URL-driven state management

---

**Готово к использованию!** 🎉

Если у вас есть вопросы, откройте issue на GitHub.
