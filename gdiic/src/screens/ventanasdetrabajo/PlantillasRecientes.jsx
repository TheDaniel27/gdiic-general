import { useState, useEffect  } from "react";
import React from "react";
import "./css/PlantillasRecientes.css";
import Plantillapage from "../plantillas/Plantillapage";
import Plantillapage2 from "../plantillas/Plantillapage2"
import Plantillapage3 from "../plantillas/Plantillapage3"
import Plantillapage4 from "../plantillas/Plantillapage4"

export const PlantillasRecientes = ({onSelectPlantilla, onPrint}) => {
    const [selectedPlantilla, setSelectedPlantilla] = useState(null);
        const [pendingSelection, setPendingSelection] = useState(null);
    
    const plantillas = [
        { id: 1, name: "Plantilla de solicitud de curso de verano", image: "/img/solicitud-verano.png", component: <Plantillapage onPrint={onPrint} /> },
        { id: 2, name: "Plantilla de solicitud de examen especial", image: "/img/solicitud-examen-especial.png", component: <Plantillapage2 onPrint={onPrint} /> },
        { id: 3, name: "Plantilla de revision de anteproyecto de tesis", image: "/img/revision-anteproyecto-tesis.png", component: <Plantillapage3 onPrint={onPrint} /> },
        { id: 4, name: "Plantilla de asignación de asesor de estancias", image: "/img/asignacion-asesor-estancias.png", component: <Plantillapage4 onPrint={onPrint} /> }
        
    ];

    const handlePlantillaClick = (id) => {
        if (pendingSelection === id) {
            // Segundo clic: Selecciona la plantilla y muestra el contenido
            setSelectedPlantilla(id);
            setPendingSelection(null); // Resetea la selección temporal
            onSelectPlantilla(true);
        } else {
            // Primer clic: Marca como "pendiente" para el segundo clic
            setPendingSelection(id);
        }
    };
    
    // Función para quitar la selección si se hace clic fuera de las plantillas
    const handleClickOutside = (event) => {
        if (!event.target.closest(".group-44")) { // Si el clic no fue en una plantilla
            setPendingSelection(null); // Desmarca la selección temporal
        }
    };
    
    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    if (selectedPlantilla) {
        const selectedComponent = plantillas.find((p) => p.id === selectedPlantilla)?.component;
        return <div className="plantilla-area">{selectedComponent}</div>;
    }

    return (
        <div className="contenido2">
            {plantillas.map((plantilla) => (
                <div
                    key={plantilla.id}
                    className={`group-44 ${selectedPlantilla === plantilla.id ? "selected" : ""} ${pendingSelection === plantilla.id ? "pending" : ""}`}
                    onClick={() => handlePlantillaClick(plantilla.id)}
                >
                    <img className="image-4" alt={plantilla.name} src={plantilla.image} />
                    <p className="text-wrapper-90">{plantilla.name}</p>
                </div>
            ))}
        </div>
    );
};


export default PlantillasRecientes;
