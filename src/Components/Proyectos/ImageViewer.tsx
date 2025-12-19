import React from "react";
import "../../Css/ImageViewer.css";

interface ImageType {
  id: number;
  alt: string;
  src?: string;
}

interface ImageViewerProps {
  isOpen: boolean;
  onClose: () => void;
  image: ImageType | null;
  onNext: () => void;
  onPrev: () => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const ImageViewer: React.FC<ImageViewerProps> = ({
  isOpen,
  onClose,
  image,
  onNext,
  onPrev,
  hasNext,
  hasPrev,
}) => {
  if (!isOpen || !image) return null;

  return (
    <div className="image-viewer-overlay" onClick={onClose}>
      <div
        className="image-viewer-container"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="close-btn" onClick={onClose}>
          ✕
        </button>

        <div className="image-viewer-content">
          <div className="image-display">
            {/* Imagen real - reemplazar por <img src={image.src} alt={image.alt} /> */}
            <div className="image-full-placeholder">
              <span className="image-full-text">{image.alt}</span>
              <p className="image-note">(Imagen real aquí)</p>
            </div>
          </div>

          <div className="image-info">
            <h3 className="image-title">{image.alt}</h3>
            <div className="image-navigation">
              <button
                className="nav-btn prev-btn"
                onClick={onPrev}
                disabled={!hasPrev}
              >
                ← Anterior
              </button>

              <div className="image-counter">Imagen {image.id}</div>

              <button
                className="nav-btn next-btn"
                onClick={onNext}
                disabled={!hasNext}
              >
                Siguiente →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageViewer;
