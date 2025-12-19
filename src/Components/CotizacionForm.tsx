import { useState, type ChangeEvent, type FormEvent } from "react";
import "../Css/CotizacionForm.css";

// Interface para los datos del formulario
interface FormData {
  nombre: string;
  telefono: string;
  email: string;
  tipoTrabajo: string;
  material: string;
  dimensiones: string;
  cantidad: string;
  grosorVidrio: string;
  colorAluminio: string;
  tipoApertura: string;
  descripcion: string;
  fechaRequerida: string;
  requiereInstalacion: string;
  direccionInstalacion: string;
  archivoAdjunto: File | null;
}

function CotizacionForm() {
  // Estado inicial del formulario
  const initialFormData: FormData = {
    nombre: "",
    telefono: "",
    email: "",
    tipoTrabajo: "",
    material: "",
    dimensiones: "",
    cantidad: "1",
    grosorVidrio: "",
    colorAluminio: "",
    tipoApertura: "",
    descripcion: "",
    fechaRequerida: "",
    requiereInstalacion: "no",
    direccionInstalacion: "",
    archivoAdjunto: null,
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Manejar cambios en los campos
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Manejar archivos
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });
    }
  };

  // Validar formulario
  const validateForm = (): boolean => {
    if (!formData.nombre.trim()) {
      alert("Por favor ingrese su nombre");
      return false;
    }
    if (!formData.telefono.trim()) {
      alert("Por favor ingrese su teléfono");
      return false;
    }
    if (!formData.tipoTrabajo) {
      alert("Por favor seleccione el tipo de trabajo");
      return false;
    }
    if (!formData.dimensiones.trim()) {
      alert("Por favor ingrese las dimensiones");
      return false;
    }
    if (!formData.descripcion.trim()) {
      alert("Por favor ingrese una descripción");
      return false;
    }
    return true;
  };

  // Manejar envío del formulario
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Aquí puedes agregar la lógica para enviar los datos
      // Por ejemplo, usando fetch o axios
      console.log("Datos del formulario:", formData);

      // Simular envío a API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      alert(
        " ¡Cotización enviada con éxito! Nos pondremos en contacto en menos de 24 horas."
      );

      // Resetear formulario
      setFormData(initialFormData);
    } catch (error) {
      console.error("Error al enviar la cotización:", error);
      alert(
        "Hubo un error al enviar la cotización. Por favor intente nuevamente."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Limpiar formulario
  const handleClear = () => {
    if (window.confirm("¿Está seguro de limpiar todos los campos?")) {
      setFormData(initialFormData);
    }
  };

  return (
    <div className="cotizacion-form-container">
      {/* SOLO EL FORMULARIO CON BLUR BLANCO DEL 50% */}
      <form onSubmit={handleSubmit} className="cotizacion-form">
        <div className="form-background-blur"></div>

        <div className="cotizacion-form-content">
          <div className="form-header">
            <h1>Cotización de Cristalería</h1>
            <p className="subtitle">
              Complete el formulario para recibir un presupuesto personalizado
            </p>
            <h2>Información del Cliente</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="nombre">
                  Nombre Completo <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej: Juan Pérez Rodríguez"
                  disabled={isSubmitting}
                />
                <label htmlFor="telefono">
                  Teléfono <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  required
                  placeholder="Ej: 555-123-4567"
                  disabled={isSubmitting}
                />

                <label htmlFor="email">Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Ej: cliente@email.com"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <h2>Especificaciones del Trabajo</h2>

            <div className="form-group">
              <label htmlFor="tipoTrabajo">
                Tipo de Trabajo <span className="required">*</span>
              </label>
              <select
                id="tipoTrabajo"
                name="tipoTrabajo"
                value={formData.tipoTrabajo}
                onChange={handleChange}
                required
                disabled={isSubmitting}
              >
                <option value="">-- Seleccione el tipo de trabajo --</option>
                <option value="ventana-corrediza">Ventana Corrediza</option>
                <option value="ventana-abatible">Ventana Abatible</option>
                <option value="puerta">Puerta/Ventana</option>
                <option value="cancel-bano">Cancel de Baño</option>
                <option value="mampara">Mampara de Ducha</option>
                <option value="barandal">Barandal de Cristal</option>
                <option value="escalera">Escalera de Cristal</option>
                <option value="division">División de Oficina</option>
                <option value="vitrina">Vitrina Exhibidora</option>
                <option value="fachada">Fachada de Cristal</option>
                <option value="otros">Otro (especifique en descripción)</option>
              </select>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="material">Material Principal</label>
                <select
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">-- Seleccione material --</option>
                  <option value="aluminio-blanco">Aluminio Blanco</option>
                  <option value="aluminio-chocolate">Aluminio Chocolate</option>
                  <option value="aluminio-natural">Aluminio Natural</option>
                  <option value="vidrio-templado">Vidrio Templado</option>
                  <option value="vidrio-laminado">Vidrio Laminado</option>
                  <option value="vidrio-normal">Vidrio Normal</option>
                  <option value="acero-inoxidable">Acero Inoxidable</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="grosorVidrio">Grosor del Vidrio (mm)</label>
                <select
                  id="grosorVidrio"
                  name="grosorVidrio"
                  value={formData.grosorVidrio}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="">-- Seleccione grosor --</option>
                  <option value="4">4mm</option>
                  <option value="5">5mm</option>
                  <option value="6">6mm</option>
                  <option value="8">8mm</option>
                  <option value="10">10mm</option>
                  <option value="12">12mm</option>
                </select>
              </div>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="dimensiones">
                  Dimensiones (Ancho x Alto) <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="dimensiones"
                  name="dimensiones"
                  value={formData.dimensiones}
                  onChange={handleChange}
                  required
                  placeholder="Ej: 1.20m x 2.10m"
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="cantidad">Cantidad de Piezas</label>
                <input
                  type="number"
                  id="cantidad"
                  name="cantidad"
                  value={formData.cantidad}
                  onChange={handleChange}
                  min="1"
                  max="100"
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="tipoApertura">Tipo de Apertura</label>
              <select
                id="tipoApertura"
                name="tipoApertura"
                value={formData.tipoApertura}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">-- Seleccione apertura --</option>
                <option value="corrediza">Corrediza</option>
                <option value="abatible">Abatible</option>
                <option value="fija">Fija</option>
                <option value="pivotante">Pivotante</option>
                <option value="plegadiza">Plegadiza</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="descripcion">
                Descripción Detallada <span className="required">*</span>
              </label>
              <textarea
                id="descripcion"
                name="descripcion"
                value={formData.descripcion}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Describa en detalle lo que necesita. Incluya especificaciones especiales, ubicación, observaciones, etc."
                disabled={isSubmitting}
              />
            </div>

            <div className="form-group">
              <label htmlFor="archivoAdjunto">
                Adjuntar Foto o Plano (opcional)
              </label>
              <input
                type="file"
                id="archivoAdjunto"
                name="archivoAdjunto"
                onChange={handleFileChange}
                accept="image/*,.pdf,.dwg"
                disabled={isSubmitting}
              />
              <small className="file-hint">
                Formatos aceptados: JPG, PNG, PDF, DWG (máx. 10MB)
              </small>
            </div>
            <h2>Información Adicional</h2>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="fechaRequerida">
                  Fecha Requerida Aproximada
                </label>
                <input
                  type="date"
                  id="fechaRequerida"
                  name="fechaRequerida"
                  value={formData.fechaRequerida}
                  onChange={handleChange}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="requiereInstalacion">
                  ¿Requiere Instalación?
                </label>
                <select
                  id="requiereInstalacion"
                  name="requiereInstalacion"
                  value={formData.requiereInstalacion}
                  onChange={handleChange}
                  disabled={isSubmitting}
                >
                  <option value="no">No, solo fabricación</option>
                  <option value="si">Sí, con instalación</option>
                  <option value="cotizar">
                    Cotizar instalación por separado
                  </option>
                </select>
              </div>
            </div>

            {formData.requiereInstalacion !== "no" && (
              <div className="form-group">
                <label htmlFor="direccionInstalacion">
                  Dirección para Instalación
                </label>
                <textarea
                  id="direccionInstalacion"
                  name="direccionInstalacion"
                  value={formData.direccionInstalacion}
                  onChange={handleChange}
                  rows={2}
                  placeholder="Dirección completa, ciudad, código postal..."
                  disabled={isSubmitting}
                />
              </div>
            )}
          </div>

          <div className="terms-section">
            <div className="form-group checkbox-group">
              <input
                type="checkbox"
                id="terminos"
                name="terminos"
                required
                disabled={isSubmitting}
              />
              <label htmlFor="terminos">
                Acepto que mis datos sean utilizados para contactarme y generar
                la cotización. He leído y acepto la{" "}
                <a href="/privacidad" target="_blank" rel="noopener noreferrer">
                  política de privacidad
                </a>
                .
              </label>
            </div>
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Enviando..." : "Enviar Solicitud de Cotización"}
            </button>

            <button
              type="button"
              className="btn-clear"
              onClick={handleClear}
              disabled={isSubmitting}
            >
              Limpiar Formulario
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CotizacionForm;
