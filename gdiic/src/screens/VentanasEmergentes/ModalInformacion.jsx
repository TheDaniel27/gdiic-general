import React from "react";
import "./ModalInformacion.css";

export const ModalInformacion = ({ correo, contrasena, onAceptar }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>¡Hola!</h2>
        <p>Se le ha asignado una nueva contraseña temporal.</p>
        <p>
          <strong>La información para entrar es:</strong>
        </p>
        <p>
          <strong>Correo: </strong> {correo}
        </p>
        <p>
          <strong>Contraseña: </strong> {contrasena}
        </p>
        <p>(En el futuro, puede cambiar su contraseña desde la sección “Mis datos”)</p>
        <br />
        <button className="modal-boton" onClick={onAceptar}>
          Aceptar
        </button>
      </div>
    </div>
  );
};

export default ModalInformacion;
