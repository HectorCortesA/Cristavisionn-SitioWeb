import "../Css/Proyectos.css";

import Navbar from "../Components/navbar";

import crista from "../assets/Logo/Cristavissioon.png";

function Proyectos() {
  return (
    <div className="proyectos-page">
      <div className="contenedor-nav">
        <img src={crista} alt="Logo" />
        <Navbar />
      </div>
    </div>
  );
}

export default Proyectos;
