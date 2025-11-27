import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/Nabar.css";

interface NavbarProps {
  // Props opcionales si las necesitas
}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  // Función para verificar si la ruta está activa
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { path: "/", label: "Inicio" },
    { path: "/quienesomos", label: "¿Quienes somos?" },
    { path: "/contacto", label: "Contacto" },
    { path: "/Proyectos", label: "Proyectos" },
    { path: "/cotiza", label: "Cotiza" },
  ];

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {menuItems.map((item) => (
          <div key={item.path} className="button-wrap">
            <button
              onClick={() => handleNavigation(item.path)}
              className={`nav-button ${isActive(item.path) ? "active" : ""}`}
            >
              <span>{item.label}</span>
            </button>
            <div className="button-shadow"></div>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
