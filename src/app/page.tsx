'use client';

import { Suspense, useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Filters from '@/components/Filters';
import ApartmentList from '@/components/ApartmentList';
import SkeletonCard from '@/components/SkeletonCard';

function SearchBarFallback() {
  return (
    <aside className="filter-card">
      <div className="filter-title-wrapper">
        <h3 className="filter-title">...</h3>
      </div>
      <div className="filter-group">
        <div style={{ height: '40px', background: 'var(--input-border)', borderRadius: 'var(--radius-sm)' }} className="skeleton"></div>
      </div>
      <div className="filter-group">
        <div style={{ height: '40px', background: 'var(--input-border)', borderRadius: 'var(--radius-sm)' }} className="skeleton"></div>
      </div>
    </aside>
  );
}

function ApartmentListFallback() {
  return (
    <div>
      <div className="catalog-content-header">
        <h2 className="catalog-title">...</h2>
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

/**
 * Home Page
 * 
 * Главная страница приложения.
 * Отображает список квартир с фильтрацией.
 */
export default function Home() {
  const [locale, setLocale] = useState('tg');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'tg';
    setLocale(savedLocale);

    // Слушаем изменения в localStorage
    const handleStorageChange = () => {
      const updatedLocale = localStorage.getItem('locale') || 'tg';
      setLocale(updatedLocale);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const getHeroTexts = () => {
    if (locale === 'tg') {
      return {
        title: 'Квартирҳои муосир барои ҷавони қубул',
        subtitle: 'Аз пешниҳодҳои беҳтарин барои иҷоро интихоб кунед. Филтрирующ қулай барои отоқҳо ва хараҷ.',
      };
    } else if (locale === 'ru') {
      return {
        title: 'Современные квартиры для комфортной жизни',
        subtitle: 'Выбирайте из лучших предложений по аренде. Удобная фильтрация по комнатам и стоимости.',
      };
    } else {
      return {
        title: 'Modern apartments for comfortable living',
        subtitle: 'Choose from the best rental offers. Convenient filtering by rooms and price.',
      };
    }
  };

  const heroTexts = getHeroTexts();

  return (
    <>
      {/* Background decorative shapes */}
      <div className="bg-gradient-shapes">
        <div className="gradient-shape-1"></div>
        <div className="gradient-shape-2"></div>
      </div>

      <Header />

      <main className="container" style={{ flex: 1, paddingTop: '40px' }}>
        {/* Hero Section */}
        <section style={{ marginBottom: '40px', textAlign: 'center' }} className="animate-fade-in">
          <h1 style={{ 
            fontSize: '2.5rem', 
            fontWeight: 800, 
            lineHeight: 1.2, 
            letterSpacing: '-1px',
            marginBottom: '12px',
            background: 'linear-gradient(135deg, var(--text-primary) 30%, var(--primary))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            {heroTexts.title}
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            {heroTexts.subtitle}
          </p>
        </section>

        {/* Catalog Layout */}
        <div className="catalog-layout">
          <Suspense fallback={<SearchBarFallback />}>
            <Filters locale={locale} />
          </Suspense>

          <section>
            <Suspense fallback={<ApartmentListFallback />}>
              <ApartmentList locale={locale} />
            </Suspense>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
