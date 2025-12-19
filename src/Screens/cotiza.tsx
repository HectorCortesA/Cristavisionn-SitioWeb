import Navbar from "../Components/navbar";
import { Footer } from "../Components/Footer";
import crista from "../assets/Logo/Cristavissioon.png";
import CotizacionForm from "../Components/CotizacionForm";
import "../Css/cotiza.css";

function Cotiza() {
  return (
    <div className="cotiza-page">
      {/* Navbar */}
      <div className="contenedor-nav">
        <img src={crista} alt="Logo Cristalería" />
        <div className="navbar">
          <Navbar />
        </div>
      </div>
      <div className="cotiza-content">
        <div className="cotiza-header">
          <h1>Cotización de Cristalería</h1>
          <p className="cotiza-subtitle">
            Solicite su presupuesto personalizado. Complete el formulario y
            recibirá una cotización detallada en menos de 24 horas.
          </p>
        </div>

        <CotizacionForm />

        <div className="cotiza-info-section">
          <h2>¿Por qué cotizar con nosotros?</h2>
          <div className="info-grid">
            <div className="info-card">
              <div className="info-icon">🏆</div>
              <h3>37+ Años de Experiencia</h3>
              <p>
                Trayectoria que garantiza calidad y profesionalismo en cada
                proyecto
              </p>
            </div>
            <div className="info-card">
              <div className="info-icon">⚡</div>
              <h3>Respuesta Rápida</h3>
              <p>Cotización en menos de 24 horas hábiles</p>
            </div>
            <div className="info-card">
              <div className="info-icon">🔧</div>
              <h3>Instalación Profesional</h3>
              <p>Equipo especializado en instalación de cristalería</p>
            </div>
            <div className="info-card">
              <div className="info-icon">💰</div>
              <h3>Mejor Precio Garantizado</h3>
              <p>Calidad premium a precios competitivos</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Cotiza;
