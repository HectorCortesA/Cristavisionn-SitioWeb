import "../Css/Proyectos.css";
import Navbar from "../Components/navbar";
import crista from "../assets/Logo/Cristavissioon.png";
import { useState } from "react";
import MenuHorizontal from "../Components/Proyectos/MenuHorizontal";
import ProyectoSection from "../Components/Proyectos/ProyectoSection";
import type { SectionType, ShowAllState } from "../types/proyectos.types";

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
            />
          ))}
        </main>
      </div>
    </div>
  );
}

export default Proyectos;
