import React, { useState, useEffect } from 'react';
import AutoResizingInput from './AutoResizingInput';
import './css/Plantillapage2.css';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';



const Plantillapage2 = ({ onPrint }) => {
    const [nombreSolicitante, setNombreSolicitante] = useState("'Nombre del solicitante'");
    const [fecha, setFecha] = useState("'Fecha de solicitud'");
    const [matricula, setMatricula] = useState("'0000000 '");
    const [grupo, setGrupo] = useState("'grupo y grado'");
    const [materia, setMateria] = useState("'Nombre de materia'");
    const [cicloescolar, setCicloescolar] = useState("'ciclo escolar'");

    const generarPDF = () => {
        const input = document.getElementById('plantilla');
    
        if (!input) {
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
                console.log("Función `generarPDF()` guardada correctamente en VentanaInicialDe.jsx");
                onPrint(() => generarPDF);
            }
        }, [onPrint]);

    return ( 
        <div>
            <div id='plantilla' className='documento'>
                <br />
                <br />
                <p style={{textAlign:'right'}}>
                    Santo Domingo Tehuantepec, Oax. a{' '}<AutoResizingInput type="text" value={fecha} onChange={(e) => setFecha(e.target.value)}/>
                    <br />
                    <strong>ASUNTO:</strong> Solicitud de examen especial 
                </p>
                <br />
                <p>
                    <strong>
                        L. C. YESENIA GARCÍA PALACIOS <br />
                        JEFA DEL DEPTO. DE SERVICIOS ESCOLARES <br />
                        UNIVERSIDAD DEL ISTMO <br />
                        TEHUANTEPEC, OAX.
                    </strong>
                </p>
                <br />
                <p style={{textAlign: 'justify'}}>
                    Por este medio solicito a usted, me considere en el acta del examen especial 
                    de la materia{' '}<AutoResizingInput className='casilla' type="text" value={materia} onChange={(e) => setMateria(e.target.value)}/>,
                    {' '}<AutoResizingInput className='casilla' type="text" value={grupo} onChange={(e) => setGrupo(e.target.value)} />{' '}
                    Semestre de la carrera de Ingeniería en Computación del ciclo escolar{' '}<AutoResizingInput className='casilla' type="text" value={cicloescolar} onChange={(e) => setCicloescolar(e.target.value)}/>.
                </p>
                <p style={{textAlign: 'justify'}}>
                    Informó también que el porcentaje de beca colegiatura en dicho semestre 
                    fue del 100%.
                </p>
                <p style={{textAlign: 'justify'}}>
                    Sin más por el momento y esperando verme favorecido, le envió un cordial saludo.
                </p>
                <br />
                <p style={{textAlign: 'center'}}>
                    ATENTAMENTE
                </p>
                <br />
                <br />
                <div className='firma'>
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
}

export default Plantillapage2;