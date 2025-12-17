import Navbar from "../Components/navbar";
import { Footer } from "../Components/Footer";
import crista from "../assets/Logo/Cristavissioon.png";

function Quienesomos() {
  return (
    <div className="Quienes-page">
      <div className="contenedor-nav">
        <img src={crista} alt="Logo" />
        <div className="navbar">
          <Navbar />
        </div>
      </div>
      <div
        className="Contenido"
        style={{ textAlign: "center", color: "white" }}
      >
        <h1>Compromiso y calidad en cancelería de aluminio</h1>
        <div className="text-descriptivo">
          <p>
            Somos una empresa con más de 37 años de experiencia, comprometida
            con la calidad y la excelencia en la fabricación de cancelería en
            aluminio con vidrio normal y templado. A lo largo de nuestra
            trayectoria, hemos trabajado en proyectos residenciales y
            comerciales, ofreciendo soluciones funcionales, seguras y
            estéticamente atractivas.
          </p>
          <p>
            Nos distinguimos por nuestro profesionalismo, compromiso y atención
            personalizada, cuidando cada detalle para garantizar la satisfacción
            de nuestros clientes. Realizamos presupuestos sin compromiso,
            brindando servicio dentro y fuera de la ciudad, siempre enfocados en
            cumplir con los más altos estándares de calidad.
          </p>
        </div>
        <div className="divider">
          <h2>Valores de la empresa</h2>
        </div>
        <div className="contenedor-experencia">
          <p>Más de 37 años de experiencia</p>
        </div>
        <div className="Contenedor-Servicios">
          <h2>Servicios</h2>
          <ul>Cancelería en aluminio</ul>
          <ul>Cancelería en vidrio</ul>
          <ul>Cancelería en vidrio templado</ul>
          <ul>Diseños personalizados</ul>
        </div>
        <div className="Zona">
          <h3>Servicio dentro y fuera de la ciudad</h3>
        </div>
        <div className="btn-Presupuesto">
          <button>Presupuesto</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Quienesomos;
