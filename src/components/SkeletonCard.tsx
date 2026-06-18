/**
 * SkeletonCard Component
 * 
 * Отображает placeholder (скелет) карточки квартиры во время загрузки данных.
 * Использует CSS анимацию для создания эффекта shimmer.
 */

export default function SkeletonCard() {
  return (
    <div className="skeleton-card">
      <div className="skeleton-img skeleton"></div>
      <div className="skeleton-body">
        <div className="skeleton-line title skeleton"></div>
        <div className="skeleton-stats">
          <div className="skeleton-stat skeleton"></div>
          <div className="skeleton-stat skeleton"></div>
        </div>
        <div className="skeleton-line skeleton"></div>
        <div className="skeleton-line short skeleton"></div>
        <div className="skeleton-footer">
          <div className="skeleton-price skeleton"></div>
          <div className="skeleton-btn skeleton"></div>
        </div>
      </div>
    </div>
  );
}
