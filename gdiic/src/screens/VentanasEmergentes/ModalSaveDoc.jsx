import React from "react";
import "./ModalSaveDoc.css";

const ModalSaveDocNuevo = ({ onAceptar }) => {
  return (
    <div className="modal-overlay-nuevo">
        <div className="modal-content-nuevo">
            <br /><br />
            <div className="modal-header-nuevo">
                <div className="modal-message-nuevo">
                    Documento guardado <br />en la sección <br />
                    "Mis documentos"
                </div>
            </div>
            <br />
            <div className="modal-buttons-nuevo">
                <button className="btn-aceptar-nuevo" onClick={onAceptar}> Aceptar </button>
            </div>
        </div>
    </div>
  );
};

export default ModalSaveDocNuevo;
