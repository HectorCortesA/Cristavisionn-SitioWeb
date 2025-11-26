import Navbar from "../Components/navbar";
import { Footer } from "../Components/Footer";
import crista from "../assets/Logo/Cristavissioon.png";

function cotiza() {
  return (
    <div className="cotiza-page">
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

export default cotiza;
