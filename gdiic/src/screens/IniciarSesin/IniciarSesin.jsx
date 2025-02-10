import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

export const IniciarSesin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate();


  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
      });

      alert("Inicio de sesión exitoso");
      //Guardar los datos del usuario en LocalStorage
      localStorage.setItem("user", JSON.stringify(response.data.user));
      
      navigate("/ventana-inicial-de-plantillas-todo-limpio"); // Redirigir a otra pantalla después de iniciar sesión
    } catch (error) {
      alert(error.response?.data?.message || "Error al iniciar sesión");
    }
  };
//hola
  return (
    <div className="iniciar-sesin">
      <div className="div-2">
        <div className="overlap-4">
          <div className="rectangle-4" />
          <div className="rectangle-5" />
          <div className="text-wrapper-22">INICIAR SESIÓN</div>
          <div className="text-wrapper-23">Correo</div>
          <div className="rectangle-6" />
          <div className="text-wrapper-24">Contraseña</div>
          <div className="rectangle-7" />

          {/* Botón de iniciar sesión */}
          <button className="group-10"onClick={handleLogin}>
            <div className="overlap-group-3">
              <div className="text-wrapper-25">Iniciar sesión</div>
            </div>
          </button>


          <img className="line" alt="Line" src="/img/line-1.svg" />

          <p className="text-wrapper-26">¿Aún no tienes una cuenta?</p>
          <p className="text-wrapper-27">
            ¡No te preocupes! Puedes crear una nueva en
          </p>

          {/* Mensajes de error condicionales */}
          {emailError && <div className="text-wrapper-28">Correo inválido</div>}
          {passwordError && <div className="text-wrapper-29">Contraseña inválida</div>}

          {emailError && <img className="obligatorio" alt="Obligatorio" src="/img/obligatorio-1.png" />}
          {passwordError && <img className="obligatorio-2" alt="Obligatorio" src="/img/obligatorio-1.png" />}

          {/* Campos de entrada */}
          <input
            className="nombre-organizacin"
            placeholder="nombre@organización.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="input"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <img className="line-2" alt="Line" src="/img/line-2.svg" />
          <img className="polygon" alt="Polygon" src="/img/polygon-2.svg" />

          <div className="crear-cuenta" onClick={() => navigate("/registrase-alumno-o-docente")} style={{ cursor: "pointer", color: "#3999d4" }}>
            <span className="span">Crear cuenta</span>
            <span className="text-wrapper-30">.</span>
          </div>

        </div>

        <p className="text-wrapper-31">Gestor de Documentación Interna - IC</p>

        <img className="UNISTMO-logo" alt="Unistmo logo" src="/img/unistmo-logo-1.png" />
      </div>
    </div>
  );
};
