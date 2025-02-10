import React, { useState, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './css/Plantillapage3.css';
import imgunistmo from '/img/v13_89.png';
import AutoResizingInput from './AutoResizingInput';

const Plantillapage3 = ({ onPrint }) => {

    const [nombredocente1, setNombreDodecente1] = useState("'M.C. Nombre Apellidos'");
    const [nombredocente2, setNombreDodecente2] = useState("'M.C.C. Nombre Apellidos'");
    const [nombredocente, setNombreDodecente] = useState("'M.C.c. nombre apellidos'");
    const [titulotesis, setTituloTesis] = useState("'TÍTULO DE TRABAJO DE TESIS'");
    const [nombreegresado, setNombreegresado] = useState("'C. Nombre Apellidos'");
    const [nombrejefe, setNombrejefe] = useState("'M. C. C. Nombre Apellidos'");
    const [numeroofficio, setNumeroOfficio] = useState("'000-JIC/AAAA'");
    
    const [fecha, setFecha] = useState("'Fecha de solicitud'");


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
            <nav>
                
            </nav>
            <div className='documento' id='plantilla'>
                <div className='margenes'>
                    <div className='encabezado'>
                        <img src={imgunistmo} alt="" />
                        <div style={{ textAlign: 'center' }} >
                            <div className='texto'>
                                <span style={{ fontSize: "36pt" }}>U</span><span style={{ fontSize: "24pt"}}>NIVERSIDAD DEL</span> <span style={{ fontSize: "36pt"}}>I</span><span style={{ fontSize: "24pt"}}>STMO</span>
                            </div>
                            <p style={{ fontSize: "9pt", textAlign: 'center', marginTop:'0', marginBottom: '1px'}}>www.unistmo.edu.mx</p>
                        </div>
                    </div>
                    <div className='hr'><div className='linea'></div></div>
                    <p style={{ fontSize: "8pt", textAlign: 'right',  marginTop: '0'}}>"2024, AÑO DEL BICENTENARIO DE LA INTEGRACIÓN DE OAXACA A LA REPÚBLICA MEXICANA"</p>

                    <p style={{textAlign: 'right'}}>
                        OFICIO No.{' '}<AutoResizingInput type="text" value={numeroofficio} onChange={(e) => setNumeroOfficio(e.target.value)} book/> <br />
                        Asunto: Revisión de anteproyecto de tesis <br />
                        Santo Domingo Tehuantepec, Oax.,{' '}<AutoResizingInput type="text" value={fecha} onChange={(e) => setFecha(e.target.value)} book/>
                    </p>
                    <p>
                        <strong>
                        <AutoResizingInput type="text" value={nombredocente} onChange={(e) => setNombreDodecente(e.target.value)} bold book/><br />
                        UNIVERSIDAD DEL ISTMO
                        P R E S E N T E.
                        </strong>
                    </p>
                    <p style={{textAlign:'justify'}}>
                        Con base en el Reglamento de alumnos de la Universidad del Istmo, Título VII, 
                        Capítulo IV, Artículo 116, me permito designarlo como revisor del anteproyecto de 
                        la Tesis titulada{' '}<AutoResizingInput type="text" value={titulotesis} onChange={(e) => setTituloTesis(e.target.value)} book/>
                        , sometido a evaluación por la{' '}<AutoResizingInput type="text" value={nombreegresado} onChange={(e) => setNombreegresado(e.target.value)} book/>
                        , egresada de la carrera de Ingeniería en Computación.
                    </p>
                    <p style={{textAlign:'justify'}}>
                        En su correo electrónico encontrará dicho anteproyecto, le agradeceré lo 
                        analice cuidadosamente junto con el resto de los revisores:{' '}<AutoResizingInput type="text" value={nombredocente1} onChange={(e) => setNombreDodecente1(e.target.value)} book/>{' '}
                        y{' '}<AutoResizingInput type="text" value={nombredocente2} onChange={(e) => setNombreDodecente2(e.target.value)} book/>
                        , y emitan su veredicto a más tardar en 5 
                        días hábiles contados a partir de la fecha actual.
                    </p>
                    <p style={{textAlign:'justify'}}>
                        Sin más por el momento le agradezco su atención y le reitero que me encuentro en 
                        la mejor disposición para cualquier aclaración al respecto.
                    </p>
                    <p style={{textAlign:'center', marginBottom: '0'}}>
                        A T E N T A M E N T E.
                    </p>
                    <p style={{textAlign:'center' , fontSize: '10pt', marginTop:'0px', fontStyle: 'italic'}}>
                        voluntas  totum potest <br />
                        guiráa zanda ne guendaracala’dxi
                    </p>
                    <br />
                    <br />
                    <div>
                        <p style={{textAlign:'center'}}>
                            <strong>
                            <AutoResizingInput type="text" value={nombrejefe} onChange={(e) => setNombrejefe(e.target.value)} bold book/><br />
                                Jefe de Carrera de Ing. en Computación
                            </strong>
                        </p>
                    </div>
                    <br />
                    <br />
                    <p style={{fontSize: '6pt'}}>
                        C.f.p.- Dr. Nombre Apellidos. - Vice-Rector Académico. - Para su conocimiento. <br />
                        .- Archivo. <br />
                        *INICIALES JEFE
                    </p>
                    <br />
                    <div>
                        <div className='hr1' ><div className='linea1'></div></div>
                        <table>
                            <tr>
                                <td>
                                    <p style={{textAlign:'center'}}>
                                        Campus Tehuantepec <br />
                                        Cd. Universitaria, Sto. Domingo Tehuantepec, Oax. <br />
                                        (971) 5224050 
                                    </p>
                                </td>
                                <td>
                                    <p style={{textAlign:'center'}}>
                                        Campus Ixtepec <br />
                                        Cd. Universitaria, Cd. Ixtepec, Oax. <br />
                                        (971) 7127050
                                    </p>
                                </td>
                                <td>
                                    <p style={{textAlign:'center'}}>
                                        Campus Juchitán <br />
                                        Cd. Universitaria, H. Cd. de Juchitán de Zaragoza, Oax. <br />
                                        (971) 712 7050
                                    </p>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        
    );
}

export default Plantillapage3;
