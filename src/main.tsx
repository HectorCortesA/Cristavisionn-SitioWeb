import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomeScreens from "./Screens/HomeScreen.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <HomeScreens />
  </StrictMode>
);
