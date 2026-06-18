'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Square, Layers } from 'lucide-react';
import { Apartment } from '@/types';
import { getLocalizedText } from '@/lib/i18n-utils';

type ApartmentCardProps = {
  apartment: Apartment;
  locale: string;
};

/**
 * ApartmentCard Component
 * 
 * Карточка квартиры со всей информацией.
 * Показывает:
 * - Изображение
 * - Название
 * - Количество комнат
 * - Площадь
 * - Цену
 * - Ссылку на подробную информацию
 * 
 * Поддерживает 3 языка через пропс locale.
 */
export default function ApartmentCard({ apartment, locale }: ApartmentCardProps) {
  const { id, price, rooms, area, image } = apartment;
  const title = getLocalizedText(apartment, 'title', locale);

  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(price);

  const getRoomsLabel = (num: number) => {
    if (locale === 'tg') {
      return `${num} ${num === 1 ? 'утоқ' : 'утоқа'}`;
    } else if (locale === 'ru') {
      return `${num} ${num === 1 ? 'комната' : num < 5 ? 'комнаты' : 'комнат'}`;
    } else {
      return `${num} ${num === 1 ? 'room' : 'rooms'}`;
    }
  };

  const getPriceLabel = () => {
    if (locale === 'tg') return 'Нарх';
    if (locale === 'ru') return 'Цена';
    return 'Price';
  };

  const getAreaLabel = () => {
    if (locale === 'tg') return 'Минтақа';
    if (locale === 'ru') return 'Площадь';
    return 'Area';
  };

  const getDetailsLabel = () => {
    if (locale === 'tg') return 'Таҳқиқи нигоҳ';
    if (locale === 'ru') return 'Подробнее';
    return 'Details';
  };

  const getCardBadgeLabel = () => {
    if (locale === 'tg') return 'Квартира';
    if (locale === 'ru') return 'Квартира';
    return 'Apartment';
  };

  return (
    <article className="apartment-card animate-fade-in">
      <div className="card-img-wrapper">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="card-img"
          priority={Number(id) <= 3}
        />
        <div className="card-badge">{getCardBadgeLabel()}</div>
      </div>

      <div className="card-body">
        <h3 className="card-title" title={title}>
          {title}
        </h3>

        <div className="card-stats">
          <div className="stat-item" title={getAreaLabel()}>
            <Layers className="stat-icon" />
            <span>{getRoomsLabel(rooms)}</span>
          </div>
          <div className="stat-item" title={getAreaLabel()}>
            <Square className="stat-icon" />
            <span>{area} м²</span>
          </div>
        </div>

        <div className="card-footer">
          <div className="card-price-wrapper">
            <span className="card-price-label">{getPriceLabel()}</span>
            <span className="card-price-value">{formattedPrice}</span>
          </div>

          <Link href={`/apartments/${id}`} className="btn-primary">
            <span>{getDetailsLabel()}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </article>
  );
}
