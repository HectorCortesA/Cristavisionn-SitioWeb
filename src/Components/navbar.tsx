import React from "react";
import "../Css/Nabar.css";

interface NavbarProps {
  // Props opcionales si las necesitas
}

const Navbar: React.FC<NavbarProps> = () => {
  const handleNavigation = (section: string) => {
    console.log(`Navegando a: ${section}`);
    // Tu lógica de navegación aquí
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Botón Contactanos */}
        <div className="button-wrap">
          <button onClick={() => handleNavigation("contactanos")}>
            <span>Contactanos</span>
          </button>
          <div className="button-shadow"></div>
        </div>

        {/* Botón ¿Quienes somos? */}
        <div className="button-wrap">
          <button onClick={() => handleNavigation("quienes-somos")}>
            <span>¿Quienes somos?</span>
          </button>
          <div className="button-shadow"></div>
        </div>

        {/* Botón Nuestros Clientes */}
        <div className="button-wrap">
          <button onClick={() => handleNavigation("nuestros-clientes")}>
            <span>Nuestros Clientes</span>
          </button>
          <div className="button-shadow"></div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
