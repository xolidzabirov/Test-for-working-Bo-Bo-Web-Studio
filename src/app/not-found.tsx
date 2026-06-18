import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  return (
    <>
      {/* Decorative backgrounds */}
      <div className="bg-gradient-shapes">
        <div className="gradient-shape-1"></div>
        <div className="gradient-shape-2"></div>
      </div>

      <Header />

      <main className="container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
        <div className="no-results" style={{ maxWidth: '500px', width: '100%', padding: '48px 32px', border: '1px solid var(--card-border)' }}>
          <div 
            className="spec-icon-wrapper" 
            style={{ 
              background: 'var(--accent-transparent)', 
              color: 'var(--accent)',
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              margin: '0 auto 24px auto'
            }}
          >
            <AlertCircle size={32} />
          </div>
          
          <h1 className="catalog-title" style={{ fontSize: '2rem', marginBottom: '16px' }}>404</h1>
          <h2 className="no-results-title" style={{ fontSize: '1.25rem', marginBottom: '12px' }}>
            Страница не найдена
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', fontSize: '0.95rem', lineHeight: '1.6' }}>
            Квартира, которую вы ищете, не существует или была удалена из базы данных.
          </p>

          <Link href="/" className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            <Home size={18} />
            <span>Вернуться на главную</span>
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
