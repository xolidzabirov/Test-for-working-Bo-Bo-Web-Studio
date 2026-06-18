'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Header() {
  const router = useRouter();
  const [locale, setLocale] = useState('tg');

  useEffect(() => {
    const savedLocale = localStorage.getItem('locale') || 'tg';
    setLocale(savedLocale);
  }, []);

  const handleLanguageChange = (newLocale: string) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    router.refresh();
  };

  return (
    <header className="site-header">
      <div className="container header-container">
        <Link href="/" className="logo-link">
          <div className="logo-icon">
            <Home className="logo-icon-svg" />
          </div>
          <span className="logo-text">Xolid</span>
        </Link>
        <nav className="nav-menu">
          <Link href="/" className="nav-link active">
            {locale === 'tg' ? 'Каталог' : locale === 'ru' ? 'Каталог' : 'Catalog'}
          </Link>
          <a href="#" className="nav-link">
            {locale === 'tg' ? 'Давомӣ' : locale === 'ru' ? 'О компании' : 'About'}
          </a>
          <a href="#" className="nav-link">
            {locale === 'tg' ? 'Алоқа' : locale === 'ru' ? 'Контакты' : 'Contact'}
          </a>
        </nav>
        <div className="language-selector">
          <button 
            onClick={() => handleLanguageChange('tg')}
            className={`lang-btn ${locale === 'tg' ? 'active' : ''}`}
          >
            TG
          </button>
          <button 
            onClick={() => handleLanguageChange('ru')}
            className={`lang-btn ${locale === 'ru' ? 'active' : ''}`}
          >
            РУ
          </button>
          <button 
            onClick={() => handleLanguageChange('en')}
            className={`lang-btn ${locale === 'en' ? 'active' : ''}`}
          >
            EN
          </button>
        </div>
      </div>
    </header>
  );
}
