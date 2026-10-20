import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../Css/Nabar.css";

interface NavbarProps {
  // Props opcionales si las necesitas
}

const Navbar: React.FC<NavbarProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false); // menú desplegable en móvil

  const handleNavigation = (path: string) => {
    setOpen(false);
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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <nav className="navbar" aria-label="Principal">
      <button
        type="button"
        className="navbar-toggle"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="navbar-links"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
      >
        <svg
          viewBox="0 0 24 24"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          aria-hidden="true"
        >
          <path d={open ? "M6 6l12 12M18 6L6 18" : "M4 9h16M4 15h16"} />
        </svg>
      </button>

      <div
        id="navbar-links"
        className={`navbar-container${open ? " is-open" : ""}`}
      >
        {menuItems.map((item) => (
          <button
            key={item.path}
            type="button"
            onClick={() => handleNavigation(item.path)}
            className={`nav-button${isActive(item.path) ? " active" : ""}${
              item.path === "/cotiza" ? " is-cta" : ""
            }`}
            aria-current={isActive(item.path) ? "page" : undefined}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;