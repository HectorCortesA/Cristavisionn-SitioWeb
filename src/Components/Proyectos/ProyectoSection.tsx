import React from "react";

interface ImageType {
  id: number;
  alt: string;
  src?: string;
}

interface ProyectoSectionProps {
  sectionId: string;
  title: string;
  description: string;
  images: ImageType[];
  showAll: boolean;
  onToggleShowAll: (sectionId: string) => void;
  onImageClick: (sectionId: string, imageId: number) => void;
}

const ProyectoSection: React.FC<ProyectoSectionProps> = ({
  sectionId,
  title,
  description,
  images,
  showAll,
  onToggleShowAll,
  onImageClick,
}) => {
  const visibleImages = showAll ? images : images.slice(0, 3);

  return (
    <section id={sectionId} className="proyectos-section">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>

      <div className="images-grid">
        {visibleImages.map((image) => (
          <div
            key={image.id}
            className="image-container"
            onClick={() => onImageClick(sectionId, image.id)}
          >
            <div className="image-placeholder">
              {/* Para agregar imágenes reales: <img src={image.src} alt={image.alt} /> */}
              <span className="image-text">{image.alt}</span>
              <div className="image-overlay">
                <span className="zoom-icon">🔍</span>
                <span className="view-text">Ver más grande</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {images.length > 3 && (
        <button
          className="show-more-btn"
          onClick={() => onToggleShowAll(sectionId)}
        >
          {showAll ? "Mostrar menos" : "Mostrar más"}
        </button>
      )}
    </section>
  );
};

export default ProyectoSection;
