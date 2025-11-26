import "../Css/Home.css";
import Carousel from "../Components/ui/carousel";
import Navbar from "../Components/navbar";
import crista from "../assets/Logo/Cristavissioon.png";
import { Footer } from "../Components/Footer";

function HomeScreens() {
  return (
    <div className="home-page">
      <div className="contenedor-nav">
        <img src={crista} alt="Logo" />
        <div className="navbar">
          <Navbar />
        </div>
      </div>
      <div className="home-content">
        <Carousel />
      </div>

      <Footer />
    </div>
  );
}

export default HomeScreens;
