# 📖 Подробное объяснение кода компонентов

## 1️⃣ Filters.tsx (Компонент фильтров)

### 📌 Назначение
Компонент позволяет пользователям фильтровать квартиры по количеству комнат и цене.

### 🔍 Как это работает

```typescript
// 1. Получаем текущие параметры из URL
const urlRooms = searchParams.get('rooms') || '';
const urlMinPrice = searchParams.get('minPrice') || '';
const urlMaxPrice = searchParams.get('maxPrice') || '';

// 2. Локальное состояние для цены (для debounce)
const [minPrice, setMinPrice] = useState(urlMinPrice);
const [maxPrice, setMaxPrice] = useState(urlMaxPrice);
```

**Почему две состояния (URL и локальная)?**
- URL параметры хранят "сохраненные" фильтры
- Локальные state хранят текущие значения input полей
- Это позволяет делать debounce (450ms) перед обновлением URL

### 🎯 Основная логика

**1. Обработка выбора комнат (сразу обновляет URL)**
```typescript
const handleRoomsChange = (roomsVal: string) => {
  const params = new URLSearchParams(searchParams.toString());
  if (roomsVal) params.set('rooms', roomsVal);
  else params.delete('rooms');
  router.push(`${pathname}?${params.toString()}`, { scroll: false });
};
```

**2. Debounce для цены (обновляет URL после 450ms без ввода)**
```typescript
useEffect(() => {
  if (isInitialMount.current) {
    isInitialMount.current = false;
    return;
  }

  const handler = setTimeout(() => {
    // Обновляем URL параметры
    const params = new URLSearchParams(searchParams.toString());
    if (minPrice) params.set('minPrice', minPrice);
    else params.delete('minPrice');
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, 450); // 450ms debounce

  return () => clearTimeout(handler);
}, [minPrice, maxPrice, pathname, router, searchParams]);
```

### 🌐 Многоязычность

```typescript
const getLabels = () => {
  if (locale === 'tg') {
    return { title: 'Филтрҳо', rooms: 'Отоқҳо', ... };
  } else if (locale === 'ru') {
    return { title: 'Фильтры', rooms: 'Комнаты', ... };
  } else {
    return { title: 'Filters', rooms: 'Rooms', ... };
  }
};
```

### ✨ Ключевые особенности
- Debounce предотвращает частые обновления URL
- URL параметры сохраняются и восстанавливаются при навигации
- Фильтры работают сразу без нажатия кнопки "Применить"
- Кнопка "Сбросить" сбрасывает все фильтры

---

## 2️⃣ ApartmentList.tsx (Список квартир)

### 📌 Назначение
Отображает список квартир, применяет фильтры, показывает skeleton loader, обрабатывает ошибки.

### 🔍 Как это работает

**1. Получаем фильтры из URL**
```typescript
const rooms = searchParams.get('rooms') || '';
const minPrice = searchParams.get('minPrice') || '';
const maxPrice = searchParams.get('maxPrice') || '';
```

**2. Строим URL для API запроса**
```typescript
const queryParams = new URLSearchParams();

if (rooms) {
  if (rooms === '4') {
    // 4+ rooms - используем запрос rooms >= 4
    queryParams.append('rooms_gte', '4');
  } else {
    queryParams.append('rooms', rooms);
  }
}

if (minPrice) queryParams.append('price_gte', minPrice);  // price >= minPrice
if (maxPrice) queryParams.append('price_lte', maxPrice);  // price <= maxPrice

const fetchUrl = queryString
  ? `http://localhost:3001/apartments?${queryString}`
  : 'http://localhost:3001/apartments';
```

**3. Получаем данные с помощью SWR**
```typescript
const { data, error, isLoading } = useSWR<Apartment[]>(fetchUrl, fetcher, {
  revalidateOnFocus: false,    // не перезагружать при фокусе окна
  dedupingInterval: 2000,      // не делать запросы чаще чем каждые 2 секунды
});
```

### 📊 Состояния компонента

**1. Показываем Skeleton во время загрузки**
```typescript
if (isLoading || !isHydrated) {
  return (
    <div>
      <h2>Все квартиры</h2>
      <div className="apartments-grid">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
```

**2. Обрабатываем ошибки**
```typescript
if (error) {
  return (
    <div className="no-results">
      <h3>Ошибка загрузки каталога</h3>
      <p>Не удалось подключиться к серверу базы данных...</p>
    </div>
  );
}
```

**3. Показываем "Не найдено" если результатов нет**
```typescript
if (apartments.length === 0) {
  return (
    <div className="no-results">
      <Home className="no-results-icon" />
      <h3>Подходящие квартиры не найдены</h3>
      <p>Попробуйте смягчить условия поиска или сбросить фильтры.</p>
    </div>
  );
}
```

**4. Отображаем список квартир**
```typescript
return (
  <div>
    <div className="catalog-content-header">
      <h2>{labels.allApartments}</h2>
      <span className="catalog-count">{apartments.length}</span>
    </div>
    <div className="apartments-grid">
      {apartments.map((apartment) => (
        <ApartmentCard 
          key={apartment.id} 
          apartment={apartment} 
          locale={locale} 
        />
      ))}
    </div>
  </div>
);
```

### 🌐 Многоязычность

Все текстовые строки берутся из функции `getLabels()`:

```typescript
const labels = getLabels();
// labels.allApartments  - "Все квартиры" (тг/ru) или "All Apartments" (en)
// labels.noFound        - сообщение об отсутствии результатов
// labels.error          - сообщение об ошибке
// labels.tryFilter      - совет как изменить фильтры
```

### ✨ Ключевые особенности
- Синхронизация с URL параметрами
- Skeleton loading для лучшего UX
- Обработка трех типов состояний: загрузка, ошибка, успех
- Поддержка 3 языков
- Адаптивная сетка (`apartments-grid`)

---

## 3️⃣ SkeletonCard.tsx (Скелет карточки)

### 📌 Назначение
Показывает placeholder карточки квартиры во время загрузки для улучшения UX.

### 📐 Структура

```typescript
<div className="skeleton-card">          {/* Контейнер карточки */}
  <div className="skeleton-img skeleton"></div>     {/* Placeholder изображения */}
  <div className="skeleton-body">                   {/* Тело карточки */}
    <div className="skeleton-line title skeleton"></div>      {/* Название */}
    <div className="skeleton-stats">
      <div className="skeleton-stat skeleton"></div> {/* Иконка + число */}
      <div className="skeleton-stat skeleton"></div>
    </div>
    <div className="skeleton-line skeleton"></div>   {/* Описание */}
    <div className="skeleton-line short skeleton"></div>  {/* Короткая строка */}
    <div className="skeleton-footer">
      <div className="skeleton-price skeleton"></div> {/* Цена */}
      <div className="skeleton-btn skeleton"></div>   {/* Кнопка */}
    </div>
  </div>
</div>
```

### 🎨 CSS Анимация

```css
/* Базовый стиль скелета */
.skeleton {
  background: linear-gradient(
    90deg,
    var(--input-border) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    var(--input-border) 100%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Shimmer анимация */
@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### ✨ Преимущества
- Показывает пользователю, что контент загружается
- Создает плавный переход между состояниями
- Улучшает воспринимаемую скорость приложения
- Не блокирует взаимодействие с интерфейсом

---

## 📊 Поток данных

```
URL изменяется
    ↓
Filters компонент обновляет параметры
    ↓
ApartmentList получает новые searchParams
    ↓
SWR делает новый запрос к API
    ↓
API возвращает отфильтрованные квартиры
    ↓
ApartmentList рендерит ApartmentCard компоненты
    ↓
Пользователь видит отфильтрованный список
```

## 🎯 Ключевые паттерны

### 1. **URL-driven State**
Фильтры хранятся в URL, а не в React state. Это позволяет:
- Сохранять фильтры при перезагрузке страницы
- Делиться ссылками с определенными фильтрами
- Использовать кнопки назад/вперед браузера

### 2. **Debounce**
Для цены используется debounce, чтобы не делать запрос на каждое нажатие клавиши.

### 3. **Skeleton Loading**
Пока данные загружаются, показываем placeholder для лучшего UX.

### 4. **Multi-language**
Все компоненты получают `locale` и отображают текст на соответствующем языке.

### 5. **SWR Cache**
Данные кешируются SWR, чтобы избежать лишних запросов.
