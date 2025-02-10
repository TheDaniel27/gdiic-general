import "./ModalCarpeta.css";

export const ModalNuevaCarpeta = ({ isOpen, closeModal }) => {
    if (!isOpen) return null; // No renderizar si no está abierto

  return (
    <div className="modal-overlay-nueva">
      <div className="modal-container-nueva">
        <h2 className="modal-title-nueva">Carpeta nueva</h2>
        <input className="modal-input-nueva" placeholder="Carpeta sin título" />
        <br /> <br />
        <div className="modal-buttons-nueva">
          <button className="modal-btn-nueva cancel-nueva" onClick={closeModal}>
            Cancelar
          </button>
          <button className="modal-btn-nueva create-nueva" onClick={closeModal}>
            Crear
          </button>
          <br />
        </div>
      </div>
    </div>
  );
};

export default ModalNuevaCarpeta;
