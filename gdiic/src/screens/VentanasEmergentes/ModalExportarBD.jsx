import React from "react";
import "./ModalExportarBD.css";

const ModalExportarBD = ({ onAceptar, onCancelar }) => {
  return (
    <div className="modal-overlay">
        <div className="modal-content">
            <br /><br />
            <div className="modal-header">
                <img className="modal-icon" alt="Icono de advertencia" src="/img/alerta-1-1.png" />
                <div className="modal-message">
                    ¿Desea exportar su base <br />de datos (documentos)?
                </div>
            </div>
            <br />
            <div className="modal-buttons">
                <button className="btn-cancelar" onClick={onCancelar}> Cancelar </button>
                <button className="btn-aceptar" onClick={onAceptar}> Aceptar </button>
            </div>
        </div>
    </div>
  );
};

export default ModalExportarBD;
