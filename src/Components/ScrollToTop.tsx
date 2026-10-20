import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

// Al cambiar de página, la nueva empieza arriba.
// Sin esto el navegador conserva el scroll de la página anterior.
function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;