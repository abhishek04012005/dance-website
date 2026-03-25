import styles from './Gallery.module.css';
import { useState } from 'react';

type GalleryItem = {
  title: string;
  image: string;
  category?: string;
};

type GallerySectionData = {
  label: string;
  headline: string;
  description: string;
  subtitle: string;
  categories: string[];
  stats: { value: string; label: string }[];
};

type GalleryProps = {
  items: GalleryItem[];
  gallerySection?: GallerySectionData;
};

export default function Gallery({ items, gallerySection }: GalleryProps) {
  const [activeFilter, setActiveFilter] = useState('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const section = gallerySection || {
    label: 'Our Moments',
    headline: 'Studio gallery',
    description: '',
    subtitle: 'Capture the magic of movement',
    categories: ['All', 'Classes', 'Events', 'Performances', 'Community'],
    stats: []
  };

  // Assign categories to items in a round-robin fashion for demo
  const itemsWithCategory = items.map((item, idx) => ({
    ...item,
    category: section.categories[Math.max(1, (idx % (section.categories.length - 1)) + 1)]
  }));

  // Filter items
  const filteredItems = activeFilter === 'All' 
    ? itemsWithCategory 
    : itemsWithCategory.filter(item => item.category === activeFilter);

  const openLightbox = (item: GalleryItem) => {
    setSelectedImage(item);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  const goToPrevious = () => {
    if (!selectedImage) return;
    const currentIdx = filteredItems.findIndex(i => i.image === selectedImage.image);
    const prevIdx = currentIdx === 0 ? filteredItems.length - 1 : currentIdx - 1;
    setSelectedImage(filteredItems[prevIdx]);
  };

  const goToNext = () => {
    if (!selectedImage) return;
    const currentIdx = filteredItems.findIndex(i => i.image === selectedImage.image);
    const nextIdx = (currentIdx + 1) % filteredItems.length;
    setSelectedImage(filteredItems[nextIdx]);
  };

  return (
    <section id="gallery" className={styles.gallerySection}>
      {/* Header */}
      <div className={styles.head}>
        <div className={styles.decorTop}>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
          <span className={styles.dot}></span>
        </div>
        
        <p className={styles.label}>{section.label}</p>
        <h2 className={styles.title}>
          <span className={styles.titleWord}>{section.headline}</span>
        </h2>
        
        {section.description && (
          <p className={styles.description}>{section.description}</p>
        )}
        
        {section.subtitle && (
          <p className={styles.subtitle}>{section.subtitle}</p>
        )}

        {section.stats && section.stats.length > 0 && (
          <div className={styles.statsRow}>
            {section.stats.map((stat, idx) => (
              <div key={idx} className={styles.statItem}>
                <div className={styles.statValue}>{stat.value}</div>
                <div className={styles.statLabel}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}

        <div className={styles.separator}></div>
      </div>

      {/* Filter Buttons */}
      <div className={styles.filters}>
        {section.categories.map(category => (
          <button
            key={category}
            className={`${styles.filterBtn} ${activeFilter === category ? styles.active : ''}`}
            onClick={() => setActiveFilter(category)}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <div className={styles.masonryGrid}>
        {filteredItems.map((item, idx) => (
          <div
            key={`${item.title}-${idx}`}
            className={styles.masonryItem}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className={styles.imageContainer}>
              <img src={item.image} alt={item.title} />
              <div className={styles.overlay}>
                <button
                  className={styles.expandBtn}
                  onClick={() => openLightbox(item)}
                  title="View fullscreen"
                >
                  ⛶
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {lightboxOpen && (
        <div className={styles.lightboxBackdrop} onClick={closeLightbox}>
          <div className={styles.lightboxContainer} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeLightbox}>✕</button>
            
            {selectedImage && (
              <>
                <div className={styles.lightboxContent}>
                  <img src={selectedImage.image} alt={selectedImage.title} />
                </div>
                <div className={styles.lightboxInfo}>
                  <h3>{selectedImage.title}</h3>
                  {selectedImage.category && (
                    <p className={styles.category}>{selectedImage.category}</p>
                  )}
                </div>
                
                <button className={styles.navBtn} onClick={goToPrevious} title="Previous">
                  ❮
                </button>
                <button className={styles.navBtn} onClick={goToNext} title="Next" style={{ right: '20px' }}>
                  ❯
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
