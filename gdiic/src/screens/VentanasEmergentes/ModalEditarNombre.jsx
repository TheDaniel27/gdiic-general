import React, { useState } from "react";
import axios from "axios";
import "./ModalEditarNombre.css";

export const ModalEditarNombre = ({ isOpen, closeModal, user, updateNombre }) => {
    if (!isOpen) return null; // No renderizar si no está abierto

    const [newName, setNewName] = useState(user.name || ""); // ✅ Usar el nombre actual
    
    const handleUpdateName = async () => {
      if (!newName.trim()) {
          alert("El nombre no puede estar vacío.");
          return;
      }
  
      try {
          const response = await axios.put(`http://localhost:5000/api/auth/update/${user._id}`, { // ✅ Ahora usamos el ID correcto
              name: newName, // ✅ Solo actualizamos el nombre
          });
  
          alert("Nombre actualizado con éxito");
          console.log("✅ Respuesta del backend:", response.data); // 🛠️ Ver si el backend responde
          
          updateNombre(newName);
          closeModal();
      } catch (error) {
          alert(error.response?.data?.message || "Error al actualizar el nombre");
      }
  };

  return (
    <div className="modal-overlay-nueva">
            <div className="modal-container-nueva">
                <h2 className="modal-title-nueva">Editar nombre</h2>
                <input 
                    className="modal-input-nueva" 
                    placeholder="Nuevo nombre" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                />
                <br /> <br />
                <div className="modal-buttons-nueva">
                    <button className="modal-btn-nueva cancel-nueva" onClick={closeModal}>
                        Cancelar
                    </button>
                    <button className="modal-btn-nueva create-nueva" onClick={handleUpdateName}>
                        Guardar
                    </button>
                    <br />
                </div>
            </div>
        </div>
  );
};

export default ModalEditarNombre;
