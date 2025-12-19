import "../Css/Proyectos.css";
import Navbar from "../Components/navbar";
import crista from "../assets/Logo/Cristavicioon.webp";
import { useState, useCallback } from "react";
import MenuHorizontal from "../Components/Proyectos/MenuHorizontal";
import ProyectoSection from "../Components/Proyectos/ProyectoSection";
import ImageViewer from "../Components/Proyectos/ImageViewer";
import a1 from "../assets/Proyect/1.webp";
import a2 from "../assets/Proyect/2.webp";
import a3 from "../assets/Proyect/3.webp";
import a4 from "../assets/Proyect/4.webp";
import a5 from "../assets/Proyect/5.webp";
import a6 from "../assets/Proyect/6.webp";
import a7 from "../assets/Proyect/7.webp";
import a8 from "../assets/Proyect/8.webp";
import a9 from "../assets/Proyect/9.webp";
import a10 from "../assets/Proyect/10.webp";
import a11 from "../assets/Proyect/11.webp";
import a12 from "../assets/Proyect/12.webp";
import a13 from "../assets/Proyect/13.webp";
import a14 from "../assets/Proyect/14.webp";
import a15 from "../assets/Proyect/15.webp";
import a17 from "../assets/Proyect/17.webp";

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
    proyecto1: false,
    proyecto2: false,
    proyecto3: false,
    proyecto4: false,
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

  // Todas las imágenes en un array
  const allImages = [
    { id: 1, src: a1, alt: "Proyecto 1 " },
    { id: 2, src: a2, alt: "Proyecto 1" },
    { id: 3, src: a3, alt: "Proyecto 1" },
    { id: 4, src: a4, alt: "Proyecto 1" },
    { id: 5, src: a5, alt: "Proyecto 1" },
    { id: 6, src: a6, alt: "Proyecto 1" },
    { id: 7, src: a7, alt: "Proyecto 2" },
    { id: 8, src: a8, alt: "Proyecto 2" },
    { id: 9, src: a9, alt: "Proyecto 2" },
    { id: 10, src: a10, alt: "Proyecto 2" },
    { id: 11, src: a11, alt: "Proyecto 3" },
    { id: 12, src: a12, alt: "Proyecto 3" },
    { id: 13, src: a13, alt: "Proyecto 3" },
    { id: 14, src: a14, alt: "Proyecto 3" },
    { id: 15, src: a15, alt: "Proyecto 3" },
    { id: 16, src: a17, alt: "Proyecto 3" },
  ];

  // Secciones del menú - Dividiendo las imágenes en grupos
  const sections: SectionType[] = [
    {
      id: "proyectos",
      label: "Destacados",
      title: "Proyectos Destacados",
      description: "Una selección de mis mejores trabajos",
      images: [
        allImages[0], // a1
        allImages[1], // a2
        allImages[2], // a3
        allImages[3], // a4
        allImages[4], // a5
        allImages[5], // a6
      ],
    },
    {
      id: "proyecto1",
      label: "Casa habitación 1",
      title: "Casa habitación 1",
      description: "Casa habitación moderna y funcional",
      images: [
        allImages[7], // a4
        allImages[8], // a5
        allImages[9], // a7
        allImages[10], // a8
      ],
    },
    {
      id: "proyecto2",
      label: "Casa habitación 2",
      title: "Casa habitación 2",
      description: "Casa habitación moderna y funcional",
      images: [
        allImages[11], // a9
        allImages[12], // a10
        allImages[13], // a12
        allImages[14], // a13
        allImages[15],
      ],
    },
    {
      id: "proyecto3",
      label: "Casa habitación 3",
      title: "Casa habitación 3",
      description: "Casa habitación moderna y funcional",
      images: [
        allImages[13], // a14
        allImages[15], // a17 (como 16)
      ],
    },
    {
      id: "proyecto4",
      label: "Mobile",
      title: "Diseño Mobile",
      description: "Casa habitación moderna y funcional",
      images: [
        allImages[0], // a1 (puedes reusar o asignar otra)
        allImages[2], // a3
        allImages[10], // a11
      ],
    },
    {
      id: "otros",
      label: "Otros",
      title: "Proyectos Varios",
      description: "Casa habitación moderna y funcional",
      images: [
        allImages[1], // a2
        allImages[4], // a5
        allImages[7], // a8
        allImages[9], // a10
        allImages[12], // a13
        allImages[14], // a15
      ],
    },
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
      [sectionId]: !prev[sectionId as keyof ShowAllState],
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
              showAll={showAll[section.id as keyof ShowAllState] || false}
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
