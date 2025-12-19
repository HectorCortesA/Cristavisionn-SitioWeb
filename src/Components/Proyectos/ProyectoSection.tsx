import React from "react";

interface ImageType {
  id: number;
  alt: string;
  src?: string; // Opcional para cuando agregues las imágenes reales
}

interface ProyectoSectionProps {
  sectionId: string;
  title: string;
  description: string;
  images: ImageType[];
  showAll: boolean;
  onToggleShowAll: (sectionId: string) => void;
}

const ProyectoSection: React.FC<ProyectoSectionProps> = ({
  sectionId,
  title,
  description,
  images,
  showAll,
  onToggleShowAll,
}) => {
  const visibleImages = showAll ? images : images.slice(0, 3);

  return (
    <section id={sectionId} className="proyectos-section">
      <h2 className="section-title">{title}</h2>
      <p className="section-description">{description}</p>

      <div className="images-grid">
        {visibleImages.map((image) => (
          <div key={image.id} className="image-container">
            <div className="image-placeholder">
              {/* Para agregar imágenes reales:
                <img src={image.src} alt={image.alt} />
              */}
              <span className="image-text">{image.alt}</span>
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
