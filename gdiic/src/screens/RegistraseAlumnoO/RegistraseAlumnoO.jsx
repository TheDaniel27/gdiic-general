import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";


export const RegistraseAlumnoO = () => {
  ///Para la base de datos
  const [userType, setUserType] = useState(""); // "Docente" o "Estudiante"
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [password, setPassword] = useState(""); // La contraseña se generará aquí
  ////////////////////////////////////////////////////////////////

  const [correo, setCorreo] = useState("");
  const navigate = useNavigate();

  const generarContrasena = () => {
    const caracteres = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+";
    let contrasena = "";
    for (let i = 0; i < 8; i++) {
      contrasena += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    return contrasena;
  };

  ///Para la base de datos
  const handleRegister = async () => {
    if (!userType) {
      alert("Por favor selecciona si eres Docente o Estudiante.");
      return;
    }

    // ✅ Generamos la contraseña antes de enviarla al backend
    const newPassword = generarContrasena();
    setPassword(newPassword);

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", {
        role: userType, // Usamos el valor seleccionado en los radios
        name,
        email,
        idNumber,
        password: newPassword, // Enviamos la contraseña generada desde React
      });
      // ✅ Verificar si el backend devuelve el usuario con `_id`
      const userFromServer = response.data.user;
      if (!userFromServer || !userFromServer._id) {
          console.error("❌ No se recibió el `_id` del usuario en la respuesta del backend.");
          alert("Error: No se pudo obtener la información del usuario.");
          return;
      }



      // ✅ Guardar datos en `localStorage`
      const userData = {
        _id: userFromServer._id,  // 🔥 Guardamos el ID del usuario
        role: userFromServer.role,
        name: userFromServer.name,
        email: userFromServer.email,
        idNumber: userFromServer.idNumber,
        password: newPassword,
    };
    localStorage.setItem("user", JSON.stringify(userData));
      console.log("✅ Datos guardados en localStorage:", userData); // ✅ Verificar que se guardaron


      
      alert(`Registro exitoso. Tu contraseña es: ${newPassword}`);
      navigate("/ventana-inicial-de-plantillas-todo-limpio"); // Redirigir al login después de registrarse
    } catch (error) {
      alert(error.response?.data?.message || "Error en el registro");
    }
  };
  //////////////////////////////////////////////////////////////

  const handleRegistro = () => {
    const nuevaContrasena = generarContrasena();
    localStorage.setItem("correoUsuario", correo);
    localStorage.setItem("contrasenaUsuario", nuevaContrasena);
    // Redirigir a la nueva pantalla
    navigate("/ventana-inicial-de-plantillas-todo-limpio");
  };

  return (
    <div className="registrase-alumno-o">
      <div className="div-7">
        <div className="overlap-group-9">
          <div className="rectangle-37" />

          <div className="rectangle-38" />

          <div className="text-wrapper-103">REGÍSTRATE</div>

          <div className="text-wrapper-104">Identifícate:</div>

          <div className="radio-group-nuevo">
            <div className="radio-option-nuevo">
              <input type="radio" name="userType" value="Docente"
              onChange={(e) => setUserType(e.target.value)}/>
              <span className="radio-label-nuevo">Docente</span>
            </div>
            <div className="radio-option-nuevo">
              <input type="radio" name="userType" value="Estudiante" 
              onChange={(e) => setUserType(e.target.value)}/>
              <span className="radio-label-nuevo">Estudiante</span>
            </div>
          </div>


          {/* ✅ Aquí se oculta todo hasta que se seleccione Docente o Estudiante */}
          {userType && (
            <div>
              {/* Campos Nombre y Correo */}
              <div className="text-wrapper-68">Nombre</div>
              <div className="rectangle-23" />
              <input type="text" className="ej-juan-peprez" placeholder="ej: Juan Pérez " value={name} onChange={(e) => setName(e.target.value)} />

              <div className="text-wrapper-69">Correo</div>
              <div className="rectangle-24" />
              <input type="email" className="nombre-organizacin-2" placeholder="nombre@organización.com" value={email} onChange={(e) => setEmail(e.target.value)} />


              {/* ✅ Sección Condicional para Docente */}
              {userType === "Docente" && (
                <div>
                  <div className="text-wrapper-76">Número de nómina</div>
                  <div className="rectangle-26" />
                  <input type="text" className="ej-2" placeholder="ej: 88769940" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                  <div className="text-wrapper-82">Número de nómina inválido</div>
                  <img
                    className="obligatorio-4"
                    alt="Obligatorio"
                    src="/img/obligatorio-1.png"
                  />
                </div>
              )}

              {/* ✅ Sección Condicional para Estudiante */}
              {userType === "Estudiante" && (
                <div>
                  <div className="text-wrapper-64">Matrícula</div>
                  <div className="rectangle-20" />
                  <input type="text" className="ej" placeholder="ej: 0123456789" value={idNumber} onChange={(e) => setIdNumber(e.target.value)} />
                  <div className="text-wrapper-70">Número de matrícula inválido</div>
                  <img
                    className="obligatorio-3"
                    alt="Obligatorio"
                    src="/img/obligatorio-1.png"
                  />
                </div>
              )}
              
            <div className="group-35" onClick={handleRegister}>
              <div className="overlap-group-6">
                <div className="text-wrapper-63">Registrarse e iniciar</div>
              </div>
            </div>
            </div>
          )}

          

          <div className="text-wrapper-107">¿Ya tienes una cuenta?</div>
          <p className="haz-clic-aqu-para-3" onClick={() => navigate("/iniciar-sesion")} style={{ cursor: "pointer", color: "#3999d4" }}>
            <span className="text-wrapper-108">Haz clic aquí para iniciar sesión</span>
            <span className="text-wrapper-109">.</span>
          </p>

          <img className="line-5" alt="Line" src="/img/line-2.svg" />

          <img className="polygon-4" alt="Polygon" src="/img/polygon-2.svg" />
        </div>

        <p className="text-wrapper-110">Gestor de Documentación Interna - IC</p>

        <img className="UNISTMO-logo-4" alt="Unistmo logo" src="/img/unistmo-logo-1.png"/>
      </div>


    </div>
  );
};
