"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { RotateCcw } from "lucide-react";

type FiltersProps = {
  locale: string;
};

/**
 * Filters Component
 *
 * Компонент для фильтрации квартир по комнатам и цене.
 *
 * Особенности:
 * - Фильтрация по количеству комнат (1, 2, 3, 4+)
 * - Фильтрация по диапазону цены
 * - Debounce для цены (450ms) для оптимизации
 * - Сохранение фильтров в URL параметрах
 * - Синхронизация при навигации (назад/вперед)
 * - Поддержка 3 языков
 *
 * API: json-server на порту 3001
 */
export default function Filters({ locale }: FiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Получаем текущие параметры из URL
  const urlRooms = searchParams.get("rooms") || "";
  const urlMinPrice = searchParams.get("minPrice") || "";
  const urlMaxPrice = searchParams.get("maxPrice") || "";
  const urlSearch = searchParams.get("search") || "";

  // Локальное состояние для цены и поиска с debounce
  const [minPrice, setMinPrice] = useState(urlMinPrice);
  const [maxPrice, setMaxPrice] = useState(urlMaxPrice);
  const [search, setSearch] = useState(urlSearch);
  const isInitialMount = useRef(true);

  // Синхронизация с URL при навигации
  useEffect(() => {
    setMinPrice(urlMinPrice);
    setMaxPrice(urlMaxPrice);
    setSearch(urlSearch);
  }, [urlMinPrice, urlMaxPrice, urlSearch]);

  // Debounce для цены и поиска (450ms)
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }

    const handler = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());

      if (minPrice) params.set("minPrice", minPrice);
      else params.delete("minPrice");

      if (maxPrice) params.set("maxPrice", maxPrice);
      else params.delete("maxPrice");

      if (search) params.set("search", search);
      else params.delete("search");

      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }, 450);

    return () => clearTimeout(handler);
  }, [minPrice, maxPrice, search, pathname, router, searchParams]);

  // Обработка выбора комнат
  const handleRoomsChange = (roomsVal: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (roomsVal) params.set("rooms", roomsVal);
    else params.delete("rooms");
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  // Сброс фильтров
  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    setSearch("");
    router.push(pathname, { scroll: false });
  };

  const isFiltered =
    !!urlRooms || !!urlMinPrice || !!urlMaxPrice || !!urlSearch;

  // Многоязычные метки
  const getLabels = () => {
    if (locale === "tg") {
      return {
        title: "Филтрҳо",
        search: "Ҷустуҷӯ",
        searchPlaceholder: "Номи квартирро ҷустуҷӯ кунед...",
        rooms: "Утоқҳо",
        roomsLabel: "Миқдори утоқҳо",
        all: "Ҳама",
        priceLabel: "Нарх (Руб)",
        from: "Аз",
        to: "То",
        clear: "Тоза кунед",
        reset: "Аз нав сар кунед",
      };
    } else if (locale === "ru") {
      return {
        title: "Фильтры",
        search: "Поиск",
        searchPlaceholder: "Поиск по названию...",
        rooms: "Комнаты",
        roomsLabel: "Количество комнат",
        all: "Все",
        priceLabel: "Цена в рублях",
        from: "От",
        to: "До",
        clear: "Очистить",
        reset: "Сбросить",
      };
    } else {
      return {
        title: "Filters",
        search: "Search",
        searchPlaceholder: "Search by name...",
        rooms: "Rooms",
        roomsLabel: "Number of rooms",
        all: "All",
        priceLabel: "Price (RUB)",
        from: "From",
        to: "To",
        clear: "Clear",
        reset: "Reset",
      };
    }
  };

  const labels = getLabels();

  return (
    <aside className="filter-card">
      <div className="filter-title-wrapper">
        <h3 className="filter-title">{labels.title}</h3>
        {isFiltered && (
          <button
            onClick={handleReset}
            className="room-btn active"
            style={{
              fontSize: "0.8rem",
              padding: "4px 10px",
              display: "flex",
              alignItems: "center",
              gap: "4px",
            }}
            title={labels.reset}
            aria-label={labels.reset}
          >
            <RotateCcw size={12} />
            <span>{labels.reset}</span>
          </button>
        )}
      </div>

      {/* Поиск квартиры */}
      <div className="filter-group">
        <label className="filter-label">{labels.search}</label>

        <div className="search-input-wrapper">
          <svg
            className="search-icon"
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={labels.searchPlaceholder}
            className="search-input"
          />

          {search && (
            <button
              type="button"
              className="search-clear-btn"
              onClick={() => setSearch("")}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Выбор комнат */}
      <div className="filter-group">
        <label className="filter-label">{labels.roomsLabel}</label>
        <div className="rooms-btn-group">
          <button
            type="button"
            className={`room-btn ${urlRooms === "" ? "active" : ""}`}
            onClick={() => handleRoomsChange("")}
            aria-pressed={urlRooms === ""}
          >
            {labels.all}
          </button>
          {["1", "2", "3", "4"].map((room) => (
            <button
              key={room}
              type="button"
              className={`room-btn ${urlRooms === room ? "active" : ""}`}
              onClick={() => handleRoomsChange(room)}
              aria-pressed={urlRooms === room}
            >
              {room === "4" ? "4+" : room}
            </button>
          ))}
        </div>
      </div>

      {/* Выбор цены */}
      <div className="filter-group">
        <label className="filter-label">{labels.priceLabel}</label>
        <div className="price-range-inputs">
          <div className="price-input-wrapper">
            <input
              type="number"
              placeholder={labels.from}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="input-field"
              min="0"
              aria-label={`${labels.from} ${labels.priceLabel}`}
            />
            <span className="price-currency">₽</span>
          </div>
          <div className="price-input-wrapper">
            <input
              type="number"
              placeholder={labels.to}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="input-field"
              min="0"
              aria-label={`${labels.to} ${labels.priceLabel}`}
            />
            <span className="price-currency">₽</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={handleReset}
        disabled={!isFiltered}
        className="clear-filters-btn"
        aria-label={labels.clear}
      >
        <span>{labels.clear}</span>
      </button>
    </aside>
  );
}
