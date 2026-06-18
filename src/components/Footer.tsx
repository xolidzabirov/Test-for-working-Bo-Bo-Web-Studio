'use client';

import { useEffect, useState } from 'react';

/**
 * Footer Component
 * 
 * Подвал приложения с информацией о компании.
 * Поддерживает 3 языка.
 */
export default function Footer() {
  const [locale, setLocale] = useState('tg');
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'tg';
    setLocale(savedLocale);
  }, []);

  const getLabels = () => {
    if (locale === 'tg') {
      return {
        company: 'Xolid Rentals',
        rights: `© ${currentYear} Xolid Rentals. Тамоми ҳуқуқҳо ҳифз шудаанд.`,
        desc: 'Сохташуда ҳамчун вазифаи тестии барои рушди Frontend (Next.js, React, TypeScript).',
      };
    } else if (locale === 'ru') {
      return {
        company: 'Xolid Rentals',
        rights: `© ${currentYear} Xolid Rentals. Все права защищены.`,
        desc: 'Сделано в качестве тестового задания для Frontend разработчика (Next.js, React, TypeScript).',
      };
    } else {
      return {
        company: 'Xolid Rentals',
        rights: `© ${currentYear} Xolid Rentals. All rights reserved.`,
        desc: 'Created as a test task for a Frontend developer (Next.js, React, TypeScript).',
      };
    }
  };

  const labels = getLabels();

  return (
    <footer className="site-footer">
      <div className="container footer-container">
        <div className="footer-logo">
          <span style={{ color: 'var(--text-primary)', fontWeight: 800 }}>Xolid</span>
        </div>
        <p>{labels.rights}</p>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          {labels.desc}
        </p>
      </div>
    </footer>
  );
}
