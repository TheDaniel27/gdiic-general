import React, { useState, useEffect } from 'react';
import AutoResizingInput from './AutoResizingInput';
import './css/Plantillapage.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import unistmo from '/img/v13_89.png';


const Plantillapage = ({ onPrint }) => {
    // Estado para manejar los campos editables
    const [fecha, setFecha] = useState("' Fecha de solicitud '");
    const [materia, setMateria] = useState("' Nombre de materia '");
    const [grupo, setGrupo] = useState("' grado y semestre ' ");
    const [jefe, setJefe] = useState("' Jefe de carrera '");
    const [nombreSolicitante, setNombreSolicitante] = useState(" 'Nombre del solicitante '");
    const [matricula, setMatricula] = useState(" '0000000 '");
    const [semestre, setSemestre] = useState("' semestre ' ");

    const generarPDF = () => {
        console.log("📄 Generando PDF...");
        const input = document.getElementById('plantilla');
    
        if (!input) {
            console.error("❌ ERROR: Elemento con id 'plantilla' no encontrado.");
            console.error("El elemento con id 'plantilla' no fue encontrado.");
            return;
        }
    
        // Reemplaza los inputs con spans
        const inputs = input.querySelectorAll('input');
        const spans = [];
    
        inputs.forEach((input) => {
            if (input && input.parentElement) {
                const span = document.createElement('span');
                span.textContent = input.value;
                span.style.display = 'inline-block';
                input.replaceWith(span);
                spans.push({ input, span });
            } else {
                console.warn("Un input no tiene un elemento padre válido.");
            }
        });

        html2canvas(input, {
            scale: 2,
            useCORS: true,
        }).then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', [215.9, 279.4]);
            const imgWidth = 215.9;
            const imgHeight = (canvas.height * imgWidth) / canvas.width;
        
            if (imgHeight > 279.4) {
                const totalPages = Math.ceil(imgHeight / 279.4);
                for (let i = 0; i < totalPages; i++) {
                if (i > 0) pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, -i * 279.4, imgWidth, imgHeight);
                }
            } else {
                pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
            }
    
            pdf.save('documento.pdf');
    
          // Restaura los inputs
            spans.forEach(({ input, span }) => {
                if (span && span.parentElement) {
                    span.replaceWith(input);
                }
            });
        });
    };

     // Llamar a la función que nos pasaron cuando se seleccione la plantilla
     useEffect(() => {
        if (onPrint) {
            console.log("✅ Función `generarPDF()` guardada correctamente en VentanaInicialDe.jsx");
            onPrint(() => generarPDF); // ✅ Pasamos la función sin ejecutarla inmediatamente
        }
    }, [onPrint]);

    return (
        <div>
            
            <div className="documento" id="plantilla">
                <div className='imagenytitulo'>
                        <div>
                            <img src={unistmo} alt=""/>
                        </div>
                        <div className='encabezado'>
                            <div className='uni'>
                                <h1 style={{fontFamily:'arial', fontSize: '24pt'}}>UNIVERSIDAD DEL ISTMO</h1>
                                <h3 style={{fontFamily:'arial', fontSize: '16pt'}}>Campus Tehuantepec</h3>
                            </div>
                        </div>
                    </div>
                    <br />
                    <br />
                
                <div>
                        <p className='fecha'>
                            Santo Domingo Tehuantepec, Oax. a{' '}<AutoResizingInput type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                            <br />
                            <strong>ASUNTO: </strong>Solicitud de curso de verano
                        </p>
                </div>
                <p>
                    <strong>
                    <AutoResizingInput className='jefe' type="text" value={jefe} onChange={(e) => setJefe(e.target.value)} bold/> <br />
                        Jefe de carrera de Ingeniería en Computación <br />
                        PRESENTE 
                    </strong>
                </p>
                <br />
                <br />
                <p className='cuerpo'>
                    Por este medio solicito a usted, la apertura para el curso de verano que se llevará a cabo de la materia no acreditada de{' '}
                    <AutoResizingInput className='casilla' type="text" value={materia} onChange={(e) => setMateria(e.target.value)}/>{' '}del 
                    <AutoResizingInput className='casilla' type="text" value={grupo} onChange={(e) => setGrupo(e.target.value)} /> de la carrera de Ingeniería en Computación, siendo el alumno{' '}
                    <AutoResizingInput className='casilla' type="text" value={nombreSolicitante} onChange={(e) => setNombreSolicitante(e.target.value)} /> con
                    matricula{' '} <AutoResizingInput className='casilla' type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} placeholder="Matrícula" /> que actualmente 
                    cursa el{' '} <AutoResizingInput className='casilla' type="text" value={semestre} onChange={(e) => setSemestre(e.target.value)}/>semestre de la ya mencionada carrera.
                    <br />
                    Sin más que agregar por el momento me despido cordialmente deseándole un excelente día y agradeciendo por la atención prestada.
                </p>
                <br />
                <br />
                <br />
                <p className='atentamente'>ATENTAMENTE</p>
                <br />
                <br />
                <div className="firma">
                    <p>
                    <AutoResizingInput className='casilla' type="text" value={nombreSolicitante} onChange={(e) => setNombreSolicitante(e.target.value)} />
                    </p>
                    <p>
                        Matricula{' '}
                        <AutoResizingInput className='casilla' type="text" value={matricula} onChange={(e) => setMatricula(e.target.value)} placeholder="Matrícula" />
                    </p>
                </div>
            </div>
            
        </div>
    );
};

export default Plantillapage;
