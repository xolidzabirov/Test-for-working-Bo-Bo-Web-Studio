# 🔧 CRUD API Documentation

## REST API Endpoints для управления квартирами

Все endpoints работают через Next.js API Routes и проксируют запросы к JSON Server на порту 3001.

### 📍 Base URL
```
http://localhost:3000/api/apartments
```

---

## 📖 Endpoints

### 1️⃣ GET - Получить все квартиры (с опциональной фильтрацией)

```http
GET /api/apartments
GET /api/apartments?rooms=2&minPrice=50000&maxPrice=100000
```

**Query Parameters:**
- `rooms` (optional) - количество комнат (1, 2, 3, 4)
- `minPrice` (optional) - минимальная цена
- `maxPrice` (optional) - максимальная цена

**Response:**
```json
[
  {
    "id": 1,
    "title_tg": "Студияи худвору дар марказ",
    "title_ru": "Уютная студия в центре города",
    "title_en": "Cozy studio in the city center",
    "price": 45000,
    "rooms": 1,
    "area": 32,
    "image": "https://...",
    "description_tg": "...",
    "description_ru": "...",
    "description_en": "..."
  },
  ...
]
```

**Status: 200 OK**

---

### 2️⃣ POST - Создать новую квартиру

```http
POST /api/apartments
Content-Type: application/json

{
  "title_tg": "Квартираи нав",
  "title_ru": "Новая квартира",
  "title_en": "New apartment",
  "price": 60000,
  "rooms": 2,
  "area": 50,
  "image": "https://images.unsplash.com/...",
  "description_tg": "Тавсифи квартира...",
  "description_ru": "Описание квартиры...",
  "description_en": "Apartment description..."
}
```

**Response:**
```json
{
  "id": 9,
  "title_tg": "Квартираи нав",
  "title_ru": "Новая квартира",
  "title_en": "New apartment",
  "price": 60000,
  "rooms": 2,
  "area": 50,
  "image": "https://...",
  "description_tg": "...",
  "description_ru": "...",
  "description_en": "..."
}
```

**Status: 201 Created**

---

### 3️⃣ GET - Получить одну квартиру по ID

```http
GET /api/apartments/1
```

**Response:**
```json
{
  "id": 1,
  "title_tg": "Студияи худвору дар марказ",
  "title_ru": "Уютная студия в центре города",
  "title_en": "Cozy studio in the city center",
  "price": 45000,
  "rooms": 1,
  "area": 32,
  "image": "https://...",
  "description_tg": "...",
  "description_ru": "...",
  "description_en": "..."
}
```

**Status: 200 OK**

**Ошибка (квартира не найдена):**
```
Status: 404 Not Found
```

---

### 4️⃣ PUT - Обновить квартиру

```http
PUT /api/apartments/1
Content-Type: application/json

{
  "id": 1,
  "title_tg": "Студияи нову сохташуда",
  "title_ru": "Обновленная студия",
  "title_en": "Updated studio",
  "price": 50000,
  "rooms": 1,
  "area": 35,
  "image": "https://...",
  "description_tg": "...",
  "description_ru": "...",
  "description_en": "..."
}
```

**Response:** Обновленные данные квартиры

**Status: 200 OK**

**Ошибка (квартира не найдена):**
```
Status: 404 Not Found
```

---

### 5️⃣ DELETE - Удалить квартиру

```http
DELETE /api/apartments/1
```

**Response:**
```json
{
  "message": "Apartment deleted successfully"
}
```

**Status: 200 OK**

**Ошибка (квартира не найдена):**
```
Status: 404 Not Found
```

---

## 📋 Данные квартиры

### Структура объекта Apartment

```typescript
type Apartment = {
  id: number | string;
  title?: string;
  title_tg?: string;      // Название на таджикском
  title_ru?: string;      // Название на русском
  title_en?: string;      // Название на английском
  price: number;          // Цена в рублях
  rooms: number;          // Количество комнат (1-4)
  area: number;           // Площадь в м²
  image: string;          // URL изображения
  description?: string;
  description_tg?: string;  // Описание на таджикском
  description_ru?: string;  // Описание на русском
  description_en?: string;  // Описание на английском
};
```

### Требования к полям

- **id**: Уникальный идентификатор (автоматически генерируется JSON Server)
- **title_tg/ru/en**: Обязательны для отображения в интерфейсе
- **price**: Число > 0
- **rooms**: 1, 2, 3 или 4+
- **area**: Число > 0 (м²)
- **image**: Валидный URL
- **description_tg/ru/en**: Обязательны для страницы деталей

---

## 🧪 Примеры использования

### cURL

**Получить все квартиры:**
```bash
curl http://localhost:3000/api/apartments
```

**Получить квартиры с фильтром:**
```bash
curl "http://localhost:3000/api/apartments?rooms=2&minPrice=50000"
```

**Создать новую квартиру:**
```bash
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
    "description_tg": "Опис",
    "description_ru": "Опис",
    "description_en": "Desc"
  }'
```

**Обновить квартиру:**
```bash
curl -X PUT http://localhost:3000/api/apartments/1 \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "title_tg": "Квартира сохташуда",
    "title_ru": "Обновленная квартира",
    "title_en": "Updated apartment",
    "price": 80000,
    "rooms": 2,
    "area": 55,
    "image": "https://...",
    "description_tg": "...",
    "description_ru": "...",
    "description_en": "..."
  }'
```

**Удалить квартиру:**
```bash
curl -X DELETE http://localhost:3000/api/apartments/1
```

### JavaScript Fetch

**GET запрос:**
```javascript
const response = await fetch('/api/apartments?rooms=2&minPrice=50000');
const apartments = await response.json();
console.log(apartments);
```

**POST запрос:**
```javascript
const response = await fetch('/api/apartments', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    title_tg: 'Квартира',
    title_ru: 'Квартира',
    title_en: 'Apartment',
    price: 75000,
    rooms: 2,
    area: 50,
    image: 'https://...',
    description_tg: 'Опис',
    description_ru: 'Опис',
    description_en: 'Desc'
  })
});
const newApartment = await response.json();
console.log(newApartment);
```

**PUT запрос:**
```javascript
const response = await fetch('/api/apartments/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    id: 1,
    title_tg: 'Квартира сохташуда',
    title_ru: 'Обновленная квартира',
    title_en: 'Updated apartment',
    price: 80000,
    rooms: 2,
    area: 55,
    image: 'https://...',
    description_tg: '...',
    description_ru: '...',
    description_en: '...'
  })
});
const updated = await response.json();
console.log(updated);
```

**DELETE запрос:**
```javascript
const response = await fetch('/api/apartments/1', {
  method: 'DELETE'
});
const result = await response.json();
console.log(result);
```

---

## ✅ Обработка ошибок

### 400 Bad Request
Если данные неверного формата

### 404 Not Found
Если квартира не существует

### 500 Internal Server Error
Если произойдет ошибка на сервере

---

## 🔗 Интеграция в компоненты

### ApartmentList.tsx использует GET

```typescript
const { data, error, isLoading } = useSWR<Apartment[]>(fetchUrl, fetcher);
// fetchUrl = http://localhost:3001/apartments?rooms=2&price_gte=50000
```

### Page.tsx для создания/редактирования

```typescript
// Создание
const response = await fetch('/api/apartments', {
  method: 'POST',
  body: JSON.stringify(newApartment)
});

// Обновление
const response = await fetch(`/api/apartments/${id}`, {
  method: 'PUT',
  body: JSON.stringify(updatedApartment)
});

// Удаление
const response = await fetch(`/api/apartments/${id}`, {
  method: 'DELETE'
});
```

---

## 📊 Производительность

- **GET /apartments**: Кешируется SWR на 2 секунды
- **Фильтры**: Debounce 450ms перед запросом
- **Изображения**: Используется Next.js Image для оптимизации

---

## 🔐 Безопасность

В production рекомендуется:
- Добавить аутентификацию
- Валидировать входные данные
- Использовать HTTPS
- Установить CORS политику
- Добавить rate limiting
