import "../Css/Proyectos.css";
import Navbar from "../Components/navbar";
import crista from "../assets/Logo/Cristavicioon.webp";
import { useState, useCallback } from "react";
import MenuHorizontal from "../Components/Proyectos/MenuHorizontal";
import ProyectoSection from "../Components/Proyectos/ProyectoSection";
import ImageViewer from "../Components/Proyectos/ImageViewer";
import { Footer } from "../Components/Footer";
import type {
  SectionType,
  ShowAllState,
  ImageType,
} from "../types/proyectos.types";

function Proyectos() {
  const [activeSection, setActiveSection] = useState<string>("proyectos");
  const [showAll, setShowAll] = useState<ShowAllState>({
    proyectos: false,
    web: false,
    mobile: false,
    design: false,
    ecommerce: false,
    otros: false,
  });
  const [viewerState, setViewerState] = useState<{
    isOpen: boolean;
    currentSection: string | null;
    currentImageId: number | null;
  }>({
    isOpen: false,
    currentSection: null,
    currentImageId: null,
  });

  // Secciones del menú
  const sections: SectionType[] = [
    {
      id: "proyectos",
      label: "Proyectos",
      title: "Proyectos Destacados",
      description: "Una selección de mis mejores trabajos",
      images: [
        { id: 1, alt: "Proyecto 1" },
        { id: 2, alt: "Proyecto 2" },
        { id: 3, alt: "Proyecto 3" },
        { id: 4, alt: "Proyecto 4" },
        { id: 5, alt: "Proyecto 5" },
        { id: 6, alt: "Proyecto 6" },
      ],
    },
    {
      id: "Proyecto1",
      label: "Proyectos 1",
      title: "Proyectos 1",
      description: "Proyectos 1",
      images: [
        { id: 1, alt: "Web 1" },
        { id: 2, alt: "Web 2" },
        { id: 3, alt: "Web 3" },
        { id: 4, alt: "Web 4" },
        { id: 5, alt: "Web 5" },
        { id: 6, alt: "Web 6" },
      ],
    },
    {
      id: "Proyecto2",
      label: "Proyecto 2",
      title: "Proyecto 2",
      description: "Proyecto 2",
      images: [
        { id: 1, alt: "Mobile 1" },
        { id: 2, alt: "Mobile 2" },
        { id: 3, alt: "Mobile 3" },
        { id: 4, alt: "Mobile 4" },
        { id: 5, alt: "Mobile 5" },
        { id: 6, alt: "Mobile 6" },
      ],
    },
    {
      id: "Proyecto3",
      label: "Proyectos 3",
      title: "Proyectos 3",
      description: "Interfaces y experiencias de usuario",
      images: [
        { id: 1, alt: "Diseño 1" },
        { id: 2, alt: "Diseño 2" },
        { id: 3, alt: "Diseño 3" },
        { id: 4, alt: "Diseño 4" },
        { id: 5, alt: "Diseño 5" },
        { id: 6, alt: "Diseño 6" },
      ],
    },
    {
      id: "Proyectos 4",
      label: "Proyectos 4",
      title: "Proyectos 4",
      description: "Tiendas online y plataformas de venta",
      images: [
        { id: 1, alt: "Ecommerce 1" },
        { id: 2, alt: "Ecommerce 2" },
        { id: 3, alt: "Ecommerce 3" },
        { id: 4, alt: "Ecommerce 4" },
        { id: 5, alt: "Ecommerce 5" },
        { id: 6, alt: "Ecommerce 6" },
      ],
    },
    {
      id: "otros",
      label: "Otros",
      title: "Otros Proyectos",
      description: "Proyectos diversos y experimentales",
      images: [
        { id: 1, alt: "Otros 1" },
        { id: 2, alt: "Otros 2" },
        { id: 3, alt: "Otros 3" },
        { id: 4, alt: "Otros 4" },
        { id: 5, alt: "Otros 5" },
        { id: 6, alt: "Otros 6" },
      ],
    },

    // ... otras secciones igual que antes
  ];

  // Función para hacer scroll a una sección
  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Función para alternar "Mostrar más"
  const toggleShowAll = (sectionId: string) => {
    setShowAll((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // Función para abrir el visor de imágenes
  const handleImageClick = useCallback((sectionId: string, imageId: number) => {
    setViewerState({
      isOpen: true,
      currentSection: sectionId,
      currentImageId: imageId,
    });
  }, []);

  // Función para cerrar el visor
  const handleCloseViewer = useCallback(() => {
    setViewerState({
      isOpen: false,
      currentSection: null,
      currentImageId: null,
    });
  }, []);

  // Función para navegar a la siguiente imagen
  const handleNextImage = useCallback(() => {
    if (viewerState.currentSection && viewerState.currentImageId) {
      const currentSection = sections.find(
        (s) => s.id === viewerState.currentSection
      );
      if (currentSection) {
        const currentIndex = currentSection.images.findIndex(
          (img) => img.id === viewerState.currentImageId
        );
        if (currentIndex < currentSection.images.length - 1) {
          setViewerState((prev) => ({
            ...prev,
            currentImageId: currentSection.images[currentIndex + 1].id,
          }));
        }
      }
    }
  }, [viewerState, sections]);

  // Función para navegar a la imagen anterior
  const handlePrevImage = useCallback(() => {
    if (viewerState.currentSection && viewerState.currentImageId) {
      const currentSection = sections.find(
        (s) => s.id === viewerState.currentSection
      );
      if (currentSection) {
        const currentIndex = currentSection.images.findIndex(
          (img) => img.id === viewerState.currentImageId
        );
        if (currentIndex > 0) {
          setViewerState((prev) => ({
            ...prev,
            currentImageId: currentSection.images[currentIndex - 1].id,
          }));
        }
      }
    }
  }, [viewerState, sections]);

  // Obtener imagen actual para el visor
  const getCurrentImage = (): ImageType | null => {
    if (!viewerState.currentSection || !viewerState.currentImageId) return null;

    const currentSection = sections.find(
      (s) => s.id === viewerState.currentSection
    );
    if (!currentSection) return null;

    return (
      currentSection.images.find(
        (img) => img.id === viewerState.currentImageId
      ) || null
    );
  };

  // Verificar si hay siguiente/imagen anterior
  const hasNext = (): boolean => {
    if (!viewerState.currentSection || !viewerState.currentImageId)
      return false;

    const currentSection = sections.find(
      (s) => s.id === viewerState.currentSection
    );
    if (!currentSection) return false;

    const currentIndex = currentSection.images.findIndex(
      (img) => img.id === viewerState.currentImageId
    );
    return currentIndex < currentSection.images.length - 1;
  };

  const hasPrev = (): boolean => {
    if (!viewerState.currentSection || !viewerState.currentImageId)
      return false;

    const currentSection = sections.find(
      (s) => s.id === viewerState.currentSection
    );
    if (!currentSection) return false;

    const currentIndex = currentSection.images.findIndex(
      (img) => img.id === viewerState.currentImageId
    );
    return currentIndex > 0;
  };

  // Datos para el menú horizontal
  const menuItems = sections.map((section) => ({
    id: section.id,
    label: section.label,
  }));

  return (
    <div className="proyectos-page">
      <div className="contenedor-nav">
        <img src={crista} alt="Logo" />
        <div className="navbar">
          <Navbar />
        </div>
      </div>

      <div className="proyectos-container">
        {/* Menú horizontal */}
        <MenuHorizontal
          sections={menuItems}
          activeSection={activeSection}
          onSectionClick={scrollToSection}
        />

        {/* Contenido principal */}
        <main className="proyectos-content">
          {/* Renderizar cada sección */}
          {sections.map((section) => (
            <ProyectoSection
              key={section.id}
              sectionId={section.id}
              title={section.title}
              description={section.description}
              images={section.images}
              showAll={showAll[section.id]}
              onToggleShowAll={toggleShowAll}
              onImageClick={handleImageClick}
            />
          ))}
        </main>
      </div>

      {/* Visor de imágenes modal */}
      <ImageViewer
        isOpen={viewerState.isOpen}
        onClose={handleCloseViewer}
        image={getCurrentImage()}
        onNext={handleNextImage}
        onPrev={handlePrevImage}
        hasNext={hasNext()}
        hasPrev={hasPrev()}
      />
      <Footer />
    </div>
  );
}

export default Proyectos;
