import React, { useState } from "react";
import axios from "axios";
import "./ModalEditarCorreo.css";

export const ModalEditarCorreo = ({ isOpen, closeModal, user, updateCorreo }) => {
    if (!isOpen) return null; // No renderizar si no está abierto

    const [newEmail, setNewEmail] = useState(user.email || ""); // ✅ Usar el nombre actual

    const handleUpdateEmail = async () => {
      if (!newEmail.trim()) {
          alert("El correo no puede estar vacío.");
          return;
      }
  
      try {
          const response = await axios.put(`http://localhost:5000/api/auth/update/${user._id}`, { // ✅ Ahora usamos el ID correcto
              email: newEmail, // ✅ Solo actualizamos el correo
          });
  
          alert("Correo actualizado con éxito");
          console.log("✅ Respuesta del backend:", response.data); // 🛠️ Ver si el backend responde
          updateCorreo(newEmail);
          closeModal();
      } catch (error) {
          alert(error.response?.data?.message || "Error al actualizar el correo");
      }
  };
  

  return (
    <div className="modal-overlay-nueva">
            <div className="modal-container-nueva">
                <h2 className="modal-title-nueva">Editar correo</h2>
                <input 
                    className="modal-input-nueva" 
                    placeholder="Nuevo correo" 
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                />
                <br /> <br />
                <div className="modal-buttons-nueva">
                    <button className="modal-btn-nueva cancel-nueva" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button className="modal-btn-nueva create-nueva" onClick={handleUpdateEmail}>
                        Guardar
                    </button>
                    <br />
                </div>
            </div>
        </div>
  );
};

export default ModalEditarCorreo;
