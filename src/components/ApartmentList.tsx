"use client";

import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Home } from "lucide-react";
import ApartmentCard from "./ApartmentCard";
import SkeletonCard from "./SkeletonCard";
import { Apartment } from "@/types";

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error("Error loading apartments");
    return res.json();
  });

type ApartmentListProps = {
  locale: string;
};

/**
 * ApartmentList Component
 *
 * Основной компонент для отображения списка квартир с фильтрацией.
 *
 * Особенности:
 * - Использует SWR для кеширования данных
 * - Поддерживает фильтрацию по комнатам и цене через query параметры
 * - Показывает skeleton loading во время загрузки
 * - Обрабатывает ошибки подключения к API
 * - Поддерживает 3 языка (таджикский, русский, английский)
 */
export default function ApartmentList({ locale }: ApartmentListProps) {
  const searchParams = useSearchParams();
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Получаем фильтры из URL параметров
  const rooms = searchParams.get("rooms") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const search = searchParams.get("search") || "";

  // Строим URL для API запроса с фильтрами
  const queryParams = new URLSearchParams();

  if (rooms) {
    if (rooms === "4") {
      queryParams.append("rooms_gte", "4");
    } else {
      queryParams.append("rooms", rooms);
    }
  }

  if (minPrice) queryParams.append("price_gte", minPrice);
  if (maxPrice) queryParams.append("price_lte", maxPrice);

  const queryString = queryParams.toString();
  const fetchUrl = queryString
    ? `http://localhost:3001/apartments?${queryString}`
    : "http://localhost:3001/apartments";

  const { data, error, isLoading } = useSWR<Apartment[]>(fetchUrl, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 2000,
  });

  // Многоязычные текстовые строки
  const getLabels = () => {
    if (locale === "tg") {
      return {
        allApartments: "Ҳама квартирҳо",
        noFound: "Квартирҳои мувофиқ ёфт нашуданд",
        tryFilter: "Шартҳои ҷустуҷӯро софт кунед ё филтрҳо озгзо кунед.",
        error: "Хатоӣ дар бор кардани каталог",
        errorMsg:
          "Бо сервери базаи маълумот алоқа барқарор карда наметавонистем. Боварӣ кунед, ки сервер бо фарманди npm run backend дар порти 3001 оғоз шудааст.",
      };
    } else if (locale === "ru") {
      return {
        allApartments: "Все квартиры",
        noFound: "Подходящие квартиры не найдены",
        tryFilter: "Попробуйте смягчить условия поиска или сбросить фильтры.",
        error: "Ошибка загрузки каталога",
        errorMsg:
          "Не удалось подключиться к серверу базы данных. Убедитесь, что сервер запущен с помощью команды npm run backend на порту 3001.",
      };
    } else {
      return {
        allApartments: "All Apartments",
        noFound: "No apartments found",
        tryFilter: "Try changing your search criteria or reset filters.",
        error: "Error loading catalog",
        errorMsg:
          "Could not connect to database server. Make sure the server is running with npm run backend on port 3001.",
      };
    }
  };

  const labels = getLabels();

  // Показываем skeleton loader во время загрузки
  if (isLoading || !isHydrated) {
    return (
      <div>
        <div className="catalog-content-header">
          <h2 className="catalog-title">{labels.allApartments}</h2>
          <span className="catalog-count">...</span>
        </div>
        <div className="apartments-grid">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

  // Обработка ошибок подключения
  if (error) {
    return (
      <div className="no-results" style={{ borderColor: "var(--accent)" }}>
        <h3 className="no-results-title" style={{ color: "var(--accent)" }}>
          {labels.error}
        </h3>
        <p style={{ marginTop: "8px" }}>{labels.errorMsg}</p>
      </div>
    );
  }

  const apartments = data || [];

  const filteredApartments = apartments.filter((apartment) => {
    if (!search.trim()) return true;

    const query = search.toLowerCase().trim();

    return (
      (apartment.title_tg || "").toLowerCase().includes(query) ||
      (apartment.title_ru || "").toLowerCase().includes(query) || 
      (apartment.title_en || "").toLowerCase().includes(query)
    );
  });

  // Если нет результатов по фильтрам
  if (filteredApartments.length === 0) {
    return (
      <div>
        <div className="catalog-content-header">
          <h2 className="catalog-title">
            {search
              ? `${labels.allApartments}: "${search}"`
              : labels.allApartments}
          </h2>
          <span className="catalog-count">
            {filteredApartments.length}
          </span>{" "}
        </div>
        <div className="no-results">
          <Home className="no-results-icon" />
          <h3 className="no-results-title">{labels.noFound}</h3>
          <p>{labels.tryFilter}</p>
        </div>
      </div>
    );
  }

  // Отображаем список квартир
  return (
    <div>
      <div className="catalog-content-header">
        <h2 className="catalog-title">{labels.allApartments}</h2>
        <span className="catalog-count">{filteredApartments.length}</span>
      </div>
      <div className="apartments-grid">
        {filteredApartments.map((apartment) => (
          <ApartmentCard
            key={apartment.id}
            apartment={apartment}
            locale={locale}
          />
        ))}
      </div>
    </div>
  );
}
