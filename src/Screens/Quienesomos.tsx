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

      <Footer />
    </div>
  );
}

export default Quienesomos;
