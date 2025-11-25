import "../Css/Home.css";
import Carousel from "../Components/ui/carousel";
import Navbar from "../Components/navbar";

function HomeScreens() {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Cristavisionn</h1>
      <Navbar />
      <div className="home-content">
        <Carousel />
      </div>
    </div>
  );
}

export default HomeScreens;
