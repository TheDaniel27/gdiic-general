import React, { useState } from "react";
import "./css/MisDocumentos.css";
import ModalCarpeta from "../VentanasEmergentes/ModalCarpeta";


export const MisDocumentos = () => {
    const [modalAbierto, setModalAbierto] = useState(false); // Estado para controlar el modal

    return (
        <div className="contenido">
            <div className="group-80" onClick={() => setModalAbierto(true)}>
              <div className="overlap-34">
                <div className="text-wrapper-147">Nueva carpeta</div>
                <img className="mas-2" alt="Mas" src="/img/mas-2.png" />
              </div>
            </div>


            <ModalCarpeta isOpen={modalAbierto} closeModal={() => setModalAbierto(false)} />
        </div>
    );
  };
export default MisDocumentos;