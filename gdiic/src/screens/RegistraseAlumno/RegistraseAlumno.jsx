import React from "react";
import "./style.css";

export const RegistraseAlumno = () => {
  return (
    <div className="registrase-alumno">
      <div className="div-5">
        <div className="overlap-14">
          <div className="rectangle-19" />

          <div className="group-35"> 
            <a href="#">
              <div className="overlap-group-6">
                <div className="text-wrapper-63">Registrarse e iniciar</div>
              </div>
            </a>
          </div>

          <div className="text-wrapper-64">Matrícula</div>
          <div className="rectangle-20" />
          <input className="ej" placeholder="ej: 0123456789" />

          <div className="rectangle-21" />

          <div className="text-wrapper-65">REGÍSTRATE</div>

          <div className="text-wrapper-66">Identifícate:</div>

          <div className="group-36">
            <div className="text-wrapper-67">Docente</div>

            <div className="rectangle-22" />
          </div>

          <div className="group-37">
            <div className="group-38">
              <div className="text-wrapper-67">Estudiante</div>

              <div className="rectangle-22" />
            </div>
          </div>

          <div className="text-wrapper-68">Nombre</div>
          <div className="rectangle-23" />
          <input className="ej-juan-peprez" placeholder="ej: Juan PePérez " />

          <div className="text-wrapper-69">Correo</div>
          <div className="rectangle-24" />
          <input className="nombre-organizacin-2" placeholder="nombre@organización.com"/>

          <div className="text-wrapper-70">Número de matrícula inválido</div>
          <img className="obligatorio-3" alt="Obligatorio" src="/img/obligatorio-1.png"/>

          <img className="line-3" alt="Line" src="/img/line-2.svg" />

          <img className="polygon-2" alt="Polygon" src="/img/polygon-2.svg" />

          <div className="text-wrapper-71">¿Ya tienes una cuenta?</div>

          <p className="haz-clic-aqu-para">
            <a href="#">
                <span className="text-wrapper-72">
                  Haz clic aquí para iniciar sesión
                </span>
              <span className="text-wrapper-73">.</span>
            </a>
          </p>
        </div>

        <p className="text-wrapper-74">Gestor de Documentación Interna - IC</p>

        <img
          className="UNISTMO-logo-2"
          alt="Unistmo logo"
          src="/img/unistmo-logo-1.png"
        />
      </div>
    </div>
  );
};
