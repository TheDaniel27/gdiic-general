import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { IniciarSesin } from "./screens/IniciarSesin";
import { MisDatos } from "./screens/MisDatos";
import { MisDatosVistaPara } from "./screens/MisDatosVistaPara";
import { RegistraseAlumno } from "./screens/RegistraseAlumno";
import { RegistraseAlumnoO } from "./screens/RegistraseAlumnoO";
import { RegistraseDocente } from "./screens/RegistraseDocente";
import { VentanaDe } from "./screens/VentanaDe";
import { VentanaDeMis } from "./screens/VentanaDeMis";
import { VentanaDeScreen } from "./screens/VentanaDeScreen";
import { VentanaInicialDe } from "./screens/VentanaInicialDe";
import { VentanaInicialDeScreen } from "./screens/VentanaInicialDeScreen";

const user = JSON.parse(localStorage.getItem("user"));

const router = createBrowserRouter([
  {
    path: "/*",
    element: <IniciarSesin />,
  },
  {
    path: "/iniciar-sesion",
    element: <IniciarSesin />,
  },
  {
    path: "/mis-datos",
    element: <MisDatos />,
  },
  {
    path: "/mis-datos-vista-para-cambiar-contrasena",
    element: <MisDatosVistaPara />,
  },
  {
    path: "/ventana-inicial-de-plantillas-todo-limpio",
    element: <VentanaInicialDe />,
  },
  {
    path: "/registrase-alumno",
    element: <RegistraseAlumno />,
  },
  {
    path: "/registrase-docente",
    element: <RegistraseDocente />,
  },
  {
    path: "/ventana-inicial-de-plantillas",
    element: <VentanaInicialDeScreen />,
  },
  {
    path: "/registrase-alumno-o-docente",
    element: <RegistraseAlumnoO />,
  },
  {
    path: "/ventana-de-plantillas-recientes",
    element: <VentanaDe />,
  },
  {
    path: "/ventana-de-plantillas", //cuidado esta ventana es de "Mis documentos sin nada"
    element: <VentanaDeScreen />,
  },
  {
    path: "/ventana-de-mis-documentos-con-carpeta-y-documento",
    element: <VentanaDeMis />,
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};
