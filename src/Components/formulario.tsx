import "../Css/formulario.css";
import React, { useState, type JSX } from "react";

export function Formulario(): JSX.Element {
  const [nombre, setNombre] = useState<string>("");
  const [correo, setCorreo] = useState<string>("");
  const [nota, setNota] = useState<string>("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Nombre:", nombre);
    console.log("Correo:", correo);
    console.log("Nota:", nota);
  };
  return (
    <div className="form-section">
      <h3 className="section-title">Datos</h3>

      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <input
            type="text"
            value={nombre}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setNombre(e.target.value)
            }
            placeholder="Nombre:"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <input
            type="email"
            value={correo}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setCorreo(e.target.value)
            }
            placeholder="Correo:"
            className="form-input"
          />
        </div>

        <div className="form-group">
          <textarea
            value={nota}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setNota(e.target.value)
            }
            placeholder="Nota:"
            className="form-textarea"
            rows={3}
          />
        </div>

        <button type="submit" className="submit-button">
          Enviar
        </button>
      </form>
    </div>
  );
}
