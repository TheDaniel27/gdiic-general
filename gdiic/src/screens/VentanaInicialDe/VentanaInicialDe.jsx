import { useEffect,useState } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import "./style.css";


import MisDatos from "../ventanasdetrabajo/MisDatos";
import MisDocumentos from "../ventanasdetrabajo/MisDocumentos";
import Plantillas from "../ventanasdetrabajo/Plantillas";
import PlantillasRecientes from "../ventanasdetrabajo/PlantillasRecientes";
import ModalInformacion from "../VentanasEmergentes/ModalInformacion";
import VentanaEmergente from "../VentanasEmergentes/ModalExportarBD";
import ModalSaveDoc from "../VentanasEmergentes/ModalSaveDoc";


export const VentanaInicialDe = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [plantillaSeleccionada, setPlantillaSeleccionada] = useState(false); // Nuevo estado
  const [selectedDatabaseAction, setSelectedDatabaseAction] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Todos los documentos");
  const [activeMenu, setActiveMenu] = useState(null);
  const [mostrarModalSave, setMostrarModalSave] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [mostrarModal, setMostrarModal] = useState(false);

  if (!user) {
    console.log("No hay usuario en LocalStorage, redirigiendo al login...");
    navigate("/iniciar-sesion");
    return null; // Evita renderizar la pantalla vacía
  }

  //Para cerrar sesion
  const handleLogout = () => {
    localStorage.removeItem("user"); // ❌ Borrar datos de sesión
    alert("Has cerrado sesión");
    navigate("/iniciar-sesion"); // Redirigir al login
  };


  const toggleMenu = (menu) => {
    setActiveMenu(activeMenu === menu ? null : menu);
  };
  const selectOption = () => {
    setActiveMenu(null); // Cierra el menú al seleccionar una opción
  };
  const handleSelect = (id) => {
    setSelectedId(id);
  };
  const handleDatabaseAction = (action) => {
    setSelectedDatabaseAction(action === selectedDatabaseAction ? null : action);
    // Establecer un temporizador para eliminar el borde después de 3 segundos
    setTimeout(() => {
      setSelectedDatabaseAction(null); // Restablece el estado después de 3 segundos
    }, 3000);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const seleccionarElemento = (item) => {
    setSelectedItem(item);
    setIsOpen(false);
  };

  //Textos para añadir al filtrado superior
  const opciones = ["Todos los documentos", "Documentos recientes"];
  
  const nombreSeleccionado = {
    "plantillas": "Plantillas",
    "plantillas-recientes": "Plantillas recientes",
    "mis-documentos": "Mis documentos",
    "mis-datos": "Mis datos",
    "mis-datos-contraseña":"Mis datos > Cambiar conttraseña"
  };

  useEffect(() => {
    // Obtener los datos del usuario almacenados en localStorage
    const correoGuardado = localStorage.getItem("correoUsuario");
    const contrasenaGuardada = localStorage.getItem("contrasenaUsuario");

    if (correoGuardado && contrasenaGuardada) {
      setCorreo(correoGuardado);
      setContrasena(contrasenaGuardada);
      setMostrarModal(true); // Mostrar el modal automáticamente

      // Eliminar los datos para que no se muestren nuevamente
      localStorage.removeItem("correoUsuario");
      localStorage.removeItem("contrasenaUsuario");
    }
    }, []);

     // Estado para mostrar u ocultar el modal de exportar base de datos
      const [mostrarVentanaEmergente, setMostrarVentanaEmergente] = useState(false);

      const handleAceptarExportar = () => {
        // Aquí puedes agregar la lógica para exportar la base de datos
        console.log("Exportando la base de datos...");
        setMostrarVentanaEmergente(false); // Cierra el modal
      };

      const handleCancelarExportar = () => {
        setMostrarVentanaEmergente(false); // Cierra el modal
      };
      /////////////////////////////////
      const [generarPDF, setGenerarPDF] = useState(null); // Guardar la función imprimir PDF

      const handlePlantillaSeleccionada = (seleccionada, generarPDFCallback) => {
        setPlantillaSeleccionada(seleccionada);
        if (generarPDFCallback) {
          console.log("✅ Función `generarPDF()` guardada correctamente.");
          setGenerarPDF(() => generarPDFCallback); // Guardamos la función para usarla después
        }
      };
      /////////////////////////////////  
      ////////Funcion para manejar la selecion del archivo para la casilla importar base de datos
      const handleFileSelect = (event) => {
        const file = event.target.files[0]; // Obtiene el archivo seleccionado
        if (file) {
          console.log("Archivo seleccionado:", file.name);
          // Aquí puedes agregar lógica para procesar el archivo, subirlo, etc.
        }
      };      
      ////////////////////////////////////


  return (
    <div className="ventana-inicial-de">
      <div className="div-4">
        <div className="overlap-10">
          <div className="overlap-11">
            <img className="rectangle-15" alt="Rectangle" src="/img/rectangle-15-2.svg"/>

            <div className="text-wrapper-48">
              {nombreSeleccionado[selectedId] || "Plantillas"}
            </div>

            <div className="group-21">
              <div className="overlap-12">
                <div className="text-wrapper-49">GDIIC</div>

                <p className="text-wrapper-50">
                  Gestor de Documentación Interna - IC
                </p>
              </div>
            </div>
          </div>

          {/* Botones de selección */}
          <div className="sidebar">
            <div className={`group-wrapper ${selectedId === "mis-documentos" ? "selected" : ""}`} onClick={() => {handleSelect("mis-documentos"); setPlantillaSeleccionada(false);}}>
              <div className="group-22">
                <div className="text-wrapper-51">Mis documentos</div>
                <img className="img-4" alt="Carpeta" src="/img/carpeta-1.png" />
              </div>
            </div>

            <div className={`group-27 ${selectedId === "plantillas-recientes" ? "selected" : ""}`} onClick={() => {handleSelect("plantillas-recientes"); setPlantillaSeleccionada(false);}}>
              <div className="group-28">
                <div className="text-wrapper-54">Plantillas recientes</div>
                <img className="img-4" alt="Recientemente" src="/img/recientemente-1.png" />
              </div>
            </div>

            <div className={`group-29 ${selectedId === "mis-datos" ? "selected" : ""}`} onClick={() => {handleSelect("mis-datos"); setPlantillaSeleccionada(false);}}>
              <div className="group-30">
                <div className="text-wrapper-55">Mis datos</div>
                <img className="img-4" alt="Mis datos" src="/img/mis-datos-1.png" />
              </div>
            </div>

            <div className={`group-31 ${selectedId === "plantillas" ? "selected" : ""}`} onClick={() => {handleSelect("plantillas"); setPlantillaSeleccionada(false);}}>
              <div className="group-32">
                <div className="text-wrapper-56">Plantillas</div>
              </div>
              <img className="expediente" alt="Expediente" src="/img/expediente-3.png" />
            </div>
          </div>
          {/* Imagen base */}
          <img className="rectangle-14" alt="Rectangle" src="/img/rectangle-12-2.svg" />

          {/* Contenido dinámico sobre la imagen */}
          <div className="contenido-superpuesto">
            {selectedId === "mis-documentos" && <MisDocumentos />}
            {selectedId === "plantillas-recientes" && <PlantillasRecientes onSelectPlantilla={handlePlantillaSeleccionada} onPrint={setGenerarPDF} />}
            {selectedId === "mis-datos" && <MisDatos />}
            {selectedId === "plantillas" && <Plantillas onSelectPlantilla={handlePlantillaSeleccionada} onPrint={setGenerarPDF} />}
          </div>




          {/* "Exportar mi base de datos" */}
          <div className={`group-23 ${selectedDatabaseAction === "exportar" ? "border-black" : ""}`} onClick={() => {handleDatabaseAction("exportar"); setMostrarVentanaEmergente(true)}} >
            <div className="group-24">
              <p className="text-wrapper-52">Exportar mi base de datos</p>
              <img className="exportar-3" alt="Exportar" src="/img/exportar-4.png" />
            </div>
          </div>

          {/* "Importar base de datos" */}
          <div 
            className={`group-25 ${selectedDatabaseAction === "importar" ? "border-black" : ""}`} 
            onClick={() => {
              handleDatabaseAction("importar");
              document.getElementById("fileInput").click(); // Abre el explorador de archivos
            }}
          >
            <div className="group-26">
              <div className="text-wrapper-53">Importar base de datos</div>
              <img className="importar-3" alt="Importar" src="/img/importar-4.png" />
            </div>
          </div>

          {/* Input oculto para seleccionar el archivo */}
          <input 
            type="file" 
            id="fileInput" 
            style={{ display: "none" }} 
            onChange={(e) => handleFileSelect(e)}
          />

          {mostrarVentanaEmergente && (<VentanaEmergente onAceptar={handleAceptarExportar} onCancelar={handleCancelarExportar}/>)}

        </div>

        {!plantillaSeleccionada && selectedId !== "mis-datos" ? (
          // Mostrar el área de "Filtrar"
          <>
            <div className="text-wrapper-57">Filtrar</div>
            <div className="lista-container">
              <div className="group-33" onClick={toggleDropdown}>
                <div className="overlap-group-5">
                  <div className="rectangle-16" />
                  <div className="rectangle-17" />
                  <div className="text-wrapper-58">{selectedItem}</div>
                  <img
                    className="flecha-hacia-abajo"
                    alt="Flecha hacia abajo"
                    src="/img/flecha-hacia-abajo-1.png"
                  />
                </div>
              </div>
              {isOpen && (
                <div className="dropdown-list">
                  {opciones.map((opcion, index) => (
                    <div
                      key={index}
                      className="dropdown-item"
                      onClick={() => seleccionarElemento(opcion)}
                    >
                      {opcion}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          // Mostrar los íconos de la plantilla (solo si hay plantilla seleccionada)
          plantillaSeleccionada && (
            <div className="iconos-plantilla" style={{ position: "fixed", top: "125px", right: "1390px", zIndex: "1000", display: "flex", gap: "20px"}}>
              <img src="/img/save-icon.png" alt="Guardar PDF" style={{ width: "30px", height: "30px",cursor: "pointer",}} onClick={() => setMostrarModalSave(true)}/>

              <img src="/img/print-icon.png" alt="Imprimir PDF" onClick={() => {
                if (generarPDF) {
                  generarPDF();
                } else {
                  console.warn("⚠️ No hay función `generarPDF()` disponible.");
                }
              }}
              style={{ width: "32px", height: "32px",cursor: "pointer",}}/>
            </div>
          )
        )}


        <div className="overlap-13">
          <div className="rectangle-18" />
          {/* Menú */}
          <div className="menu-item" onClick={() => toggleMenu("menu")}>Menú</div>
          {activeMenu === "menu" && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={selectOption}>Plantillas</div>
              <div className="dropdown-item" onClick={selectOption}>Plantillas recientes</div>
              <div className="dropdown-item" onClick={selectOption}>Mis documentos</div>
              <div className="dropdown-item" onClick={selectOption}>Mis datos</div>
            </div>
          )}

          {/* Ayuda */}
          <div className="menu-item" onClick={() => toggleMenu("ayuda")}>Ayuda</div>
          {activeMenu === "ayuda" && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={selectOption}>Contacto</div>
            </div>
          )}

          {/* Acerca de */}
          <div className="menu-item" onClick={() => toggleMenu("acerca")}>Acerca de</div>
          {activeMenu === "acerca" && (
            <div className="dropdown">
              <div className="dropdown-item" onClick={selectOption}>Equipo</div>
            </div>
          )}

          {/* Cerrar sesión */}
          <div className="group-34" onClick={handleLogout}>
            <div className="text-wrapper-62">Cerrar sesión</div>
            <img className="image-3" alt="Cerrar sesión" src="/img/image-1-1.png" />
          </div>
        </div>
          {/* Mostrar modal con la información del usuario */}
          {mostrarModal && (
            <ModalInformacion
              correo={correo}
              contrasena={contrasena}
              onAceptar={() => setMostrarModal(false)}
            />
          )}
      </div>
      {mostrarModalSave && <ModalSaveDoc onAceptar={() => setMostrarModalSave(false)} />}
    </div>
  );
};
