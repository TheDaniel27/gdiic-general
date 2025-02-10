import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import "./css/MisDatos.css";

import ModalEditarNombre from "../VentanasEmergentes/ModalEditarNombre";
import ModalEditarCorreo from "../VentanasEmergentes/ModalEditarCorreo";
import ModalContraSave from "../VentanasEmergentes/ModalContraSave";




export const MisDatos = () => {
  const [user, setUser] = useState(null);
  // Estado para manejar el modal
  const [mostrarModalEditarNombre, setMostrarModalEditarNombre] = useState(false);
  const [mostrarModalEditarCorreo, setMostrarModalEditarCorreo] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [matricula, setMatricula] = useState(""); // ✅ Nuevo estado para la matrícula



  // ✅ Separar los estados para evitar re-render innecesario
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [contrasena, setContrasena] = useState(""); // ✅ Estado para la contraseña




  const [contrasenaVisible, setContrasenaVisible] = useState(false); // Estado para alternar visibilidad
  const [cambiarContrasena, setCambiarContrasena] = useState(false); // Control para mostrar el área de trabajo

  const [mostrarContrasenaActual, setMostrarContrasenaActual] = useState(false);
  const [mostrarContrasenaNueva, setMostrarContrasenaNueva] = useState(false);


  /*const contrasena  = "mysecretpassword";*/
  /*const matricula = "0121040044"*/





  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
        setUser(storedUser);
        setNombre(storedUser.name || "");
        setCorreo(storedUser.email || "");
        setMatricula(storedUser.idNumber || ""); // ✅ Guardamos la matrícula en el estado
        setContrasena(
          typeof storedUser.password === "object" ? storedUser.password.contrasena : storedUser.password
        );
    }
    setIsLoading(false);
}, []);

  if (isLoading) return <p>Cargando datos...</p>; // ✅ Evitar que la pantalla se quede bloqueada

  // ✅ Función para actualizar solo el nombre
  const updateNombre = (newName) => {
    setNombre(newName);
    
    setUser((prevUser) => {
        const updatedUser = { ...prevUser, name: newName };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Guardar en localStorage
        return updatedUser; // ✅ Actualizar el estado de user
    });
};
  // ✅ Función para actualizar solo el correo
  const updateCorreo = (newEmail) => {
    setCorreo(newEmail);

    setUser((prevUser) => {
        const updatedUser = { ...prevUser, email: newEmail };
        localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ Guardar en localStorage
        return updatedUser; // ✅ Actualizar el estado de user
    });
};

//Funcion para el cambio de contraseña
const handleChangePassword = async () => {
  const currentPassword = document.getElementById("contrasenaActual").value.trim();
  const newPassword = document.getElementById("nuevaContrasena").value.trim();

  if (!currentPassword || !newPassword) {
      alert("Ambos campos son obligatorios.");
      return;
  }

  // ✅ Obtener el usuario de localStorage
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (!storedUser || !storedUser._id) {
      alert("Error: No se encontró el usuario en localStorage.");
      console.error("❌ No se encontró el _id del usuario en localStorage:", storedUser);
      return;
  }

  console.log("📡 Enviando petición al backend con:");
  console.log("🆔 ID del usuario:", storedUser._id);
  console.log("🔑 Contraseña actual:", currentPassword);
  console.log("🔒 Nueva contraseña:", newPassword);

  try {
      const response = await axios.put(`http://localhost:5000/api/auth/update-password/${storedUser._id}`, {
          currentPassword,
          newPassword,
      });

      alert("Contraseña cambiada con éxito.");
      console.log("✅ Respuesta del backend:", response.data);
      setCambiarContrasena(false)
      handleGuardarDocumento()
      // Actualizar la contraseña en localStorage
      const updatedUser = { ...storedUser, password: newPassword };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setContrasena(newPassword);
  } catch (error) {
      console.error("❌ Error en el cambio de contraseña:", error);
      alert(error.response?.data?.message || "Error en el servidor");
  }
};






  
  //Función para actualizar el usuario en la UI y LocalStorage
  const updateUser = (updatedUser) => {
    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
  };  
  // Función para manejar el cambio de contraseña y abrir el modal
  const handleGuardarDocumento = () => {
    console.log("Contraseña actualizada correctamente");
    setMostrarModal(true); // Mostrar el modal
  };

  // Función para abrir el modal de edición de nombre
  const handleEditarNombre = () => {
    console.log("Editando nombre...");
    setMostrarModalEditarNombre(true);
  };
  // Función para abrir el modal de edición de correo
  const handleEditarcorreo = () => {
    console.log("Editando correo...");
    setMostrarModalEditarCorreo(true);
  };

  const toggleContrasena = () => {
    setContrasenaVisible(!contrasenaVisible);
  };

  // Función para mostrar el área de cambio de contraseña
  const handleEditarContrasena = () => {
    setCambiarContrasena(true);
  };

  const toggleContrasenaActual = () => {
    setMostrarContrasenaActual(!mostrarContrasenaActual);
  };

  const toggleContrasenaNueva = () => {
    setMostrarContrasenaNueva(!mostrarContrasenaNueva);
  };

  return (
    <div className="chamilo">
      {cambiarContrasena ? (
        /* Área de trabajo para cambiar la contraseña */
        <div className="area-cambio-contrasena">
          <div className="group-12" onClick={() => setCambiarContrasena(false)}>
            <img className="volver" alt="Volver" src="/img/volver-1.png" />
            <div className="text-wrapper-35">Volver a mis datos</div>
          </div>

          <div className="formulario">
            <div className="campo">
              <label htmlFor="contrasenaActual">Contraseña actual:</label>
              <div className="input-contenedor">
                <input type={mostrarContrasenaActual ? "text" : "password"}
                  id="contrasenaActual"
                  placeholder="Contraseña actual"
                />
                <img
                  className="ojo"
                  alt="Mostrar/Ocultar Contraseña"
                  src={
                    mostrarContrasenaActual
                      ? "/img/ojo-abierto.png"
                      : "/img/ojo-cerrado.png"
                  }
                  onClick={toggleContrasenaActual}
                />
              </div>
            </div>

            <div className="campo">
              <label htmlFor="nuevaContrasena">Contraseña nueva:</label>
              <div className="input-contenedor">
                <input type={mostrarContrasenaNueva ? "text" : "password"}
                  id="nuevaContrasena"
                  placeholder="Contraseña nueva"
                />
                <img
                  className="ojo"
                  alt="Mostrar/Ocultar Contraseña"
                  src={
                    mostrarContrasenaNueva
                      ? "/img/ojo-abierto.png"
                      : "/img/ojo-cerrado.png"
                  }
                  onClick={toggleContrasenaNueva}
                />
              </div>
            </div>

            <button type="submit" className="btn-cambiar" 
                onClick={() => { 
                    handleChangePassword(); // ✅ Llamamos a la función correctamente
                }}>
                Cambiar
            </button>
          </div>

          
        </div>
      ) : (
        /* Área principal */
        <>
          <h1 className="text-wrapper-4">Hola,</h1>

          <div className="fila">
            <div className="text-wrapper-3">{user?.name || "Nombre no disponible"}</div>
            <img className="lapiz" alt="Lapiz" src="/img/lapiz-2.png" title="Editar" onClick={() => setMostrarModalEditarNombre(true)} />
          </div>

          <div className="fila">
            <div className="text-wrapper-6">Tu correo:</div>
            <div className="text-wrapper-5">{user?.email || "Correo no disponible"}</div>
            <img className="lapiz" alt="Lapiz" src="/img/lapiz-2.png" title="Editar" onClick={() => setMostrarModalEditarCorreo(true)} />
          </div>

          <div className="fila">
            <div className="text-wrapper-6">Tu matrícula:</div>
            <div className="text-wrapper-5">{matricula || "No disponible"}</div>
          </div>

          <div className="fila">
            <div className="text-wrapper-6">Tu contraseña:</div>
            <div className="text-wrapper-5">
              {contrasenaVisible ? contrasena : "********"}
            </div>
            <img className="ojo2" alt="Mostrar/Ocultar Contraseña" src={contrasenaVisible ? "/img/ojo-abierto.png" : "/img/ojo-cerrado.png"} onClick={toggleContrasena}/>
            <img className="lapiz" alt="Lapiz" src="/img/lapiz-2.png" title="Editar" onClick={handleEditarContrasena} />
          </div>

        </>
      )}
      {/* Modal para editar nombre */}
      {mostrarModalEditarNombre && (
                <ModalEditarNombre 
                    isOpen={mostrarModalEditarNombre} 
                    closeModal={() => setMostrarModalEditarNombre(false)} 
                    user={user}
                    updateNombre={updateNombre} 
                />
            )}

            {/* Modal para editar correo */}
            {mostrarModalEditarCorreo && (
                <ModalEditarCorreo 
                    isOpen={mostrarModalEditarCorreo} 
                    closeModal={() => setMostrarModalEditarCorreo(false)} 
                    user={user}
                    updateCorreo={updateCorreo} 
                />
        )}
      {mostrarModal && <ModalContraSave onAceptar={() => setMostrarModal(false)} />}

    </div>
  );
};

export default MisDatos;