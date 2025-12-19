import "../Css/footer.css";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-brand">
          <p className="footer-text">Cristavisionn C.V | {currentYear}</p>
          <p className="footer-subtext">Todos los derechos reservados</p>
        </div>

        {/* Opcional: Agregar enlaces o información adicional */}
        <div className="footer-links">
          <a href="/privacy" className="footer-link">
            Política de Privacidad
          </a>
          <a href="/terms" className="footer-link">
            Términos de Servicio
          </a>
          <a href="/contact" className="footer-link">
            Contacto
          </a>
        </div>
      </div>
    </footer>
  );
}
