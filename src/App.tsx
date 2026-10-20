import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import Contact from "./Screens/Contact";
import Quienesomos from "./Screens/Quienesomos";
import Cotiza from "./Screens/cotiza";
import Proyectos from "./Screens/Proyectos";
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  return (
    <div className="App">
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Contacto" element={<Contact />} />
        <Route path="/Quienesomos" element={<Quienesomos />} />
        <Route path="/Cotiza" element={<Cotiza />} />
        <Route path="/Proyectos" element={<Proyectos />} />
      </Routes>
    </div>
  );
}

export default App;