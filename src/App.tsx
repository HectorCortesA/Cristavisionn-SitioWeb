import "./App.css";
import { Routes, Route } from "react-router-dom";
import HomeScreen from "./Screens/HomeScreen";
import Contact from "./Screens/Contact";
import Quienesomos from "./Screens/Quienesomos";
import Cotiza from "./Screens/cotiza";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/Contacto" element={<Contact />} />
        <Route path="/Quienesomos" element={<Quienesomos />} />
        <Route path="/Cotiza" element={<Cotiza />} />
      </Routes>
    </div>
  );
}

export default App;
