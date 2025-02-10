import React from "react";
import "./ModalContraSave.css";

const ModalContraSave = ({ onAceptar }) => {
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <br /><br />
            <div className="modal-header">
                <img className="modal-icon" alt="Icono de advertencia" src="img/informacion-2-1.png" />
                <div className="modal-message">
                    Contraseña actualizada<br />correctamente
                </div>
            </div>
            <br />
            <div className="modal-buttons">
                <button className="btn-aceptar" onClick={onAceptar}> Aceptar </button>
            </div>
        </div>
    </div>
  );
};

export default ModalContraSave;
