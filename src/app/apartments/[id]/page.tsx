import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Square, Layers, Wallet } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Apartment } from '@/types';

type Props = {
  params: Promise<{ id: string }>;
};

async function getApartment(id: string): Promise<Apartment | null> {
  try {
    const res = await fetch(`http://localhost:3001/apartments/${id}`, {
      next: { revalidate: 30 }, // Cache on server for 30s
    });
    if (!res.ok) {
      if (res.status === 404) return null;
      throw new Error('Failed to fetch apartment data');
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching apartment details:', error);
    return null;
  }
}

export default async function ApartmentDetailPage({ params }: Props) {
  const { id } = await params;
  const apartment = await getApartment(id);

  if (!apartment) {
    notFound();
  }

  const formattedPrice = new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency: 'RUB',
    maximumFractionDigits: 0,
  }).format(apartment.price);

  return (
    <>
      {/* Decorative backgrounds */}
      <div className="bg-gradient-shapes">
        <div className="gradient-shape-1"></div>
        <div className="gradient-shape-2"></div>
      </div>

      <Header />

      <main className="container detail-page" style={{ flex: 1 }}>
        <Link href="/" className="back-btn animate-fade-in">
          <ArrowLeft size={16} />
          <span>Назад к списку</span>
        </Link>

        <div className="detail-layout">
          {/* Gallery Section */}
          <section className="detail-gallery animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <Image
              src={apartment.image}
              alt={apartment.title_ru || apartment.title_en || apartment.title_tg || 'Apartment Image'}
              fill
              className="detail-img"
              priority
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
          </section>

          {/* Info Section */}
          <section className="detail-info animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h1 className="detail-title">{apartment.title_ru || apartment.title_en || apartment.title_tg}</h1>

            <div className="detail-price-box">
              <div className="detail-price-info">
                <span className="card-price-label">Цена в месяц</span>
                <span className="detail-price-val">{formattedPrice}</span>
              </div>
              <div 
                className="spec-icon-wrapper" 
                style={{ 
                  background: 'var(--accent-transparent)', 
                  color: 'var(--accent)',
                  width: '52px',
                  height: '52px',
                  borderRadius: 'var(--radius-md)'
                }}
              >
                <Wallet size={24} />
              </div>
            </div>

            {/* Specifications */}
            <div className="detail-specs">
              <div className="spec-card">
                <div className="spec-icon-wrapper">
                  <Layers size={20} />
                </div>
                <div>
                  <span className="spec-card-title">Комнаты</span>
                  <div className="spec-card-val">
                    {apartment.rooms} {apartment.rooms === 1 ? 'комната' : apartment.rooms < 5 ? 'комнаты' : 'комнат'}
                  </div>
                </div>
              </div>

              <div className="spec-card">
                <div className="spec-icon-wrapper">
                  <Square size={20} />
                </div>
                <div>
                  <span className="spec-card-title">Площадь</span>
                  <div className="spec-card-val">{apartment.area} м²</div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="detail-description-section">
              <h3 className="detail-desc-title">Описание</h3>
              <p className="detail-desc-text">{apartment.description}</p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}
