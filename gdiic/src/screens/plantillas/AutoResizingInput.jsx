import React, { useRef, useEffect, useState } from 'react';

const AutoResizingInput = ({ value, onChange, placeholder, bold }) => {
    const [width, setWidth] = useState(0);
    const spanRef = useRef(null);

  // Efecto para ajustar el ancho del input según el contenido
    useEffect(() => {
        if (spanRef.current) {
        setWidth(spanRef.current.offsetWidth + 5); // +5 para un poco de espacio adicional
        }
    }, [value]);

    return (
        <div style={{ display: 'inline-block', position: 'relative' }}>
        {/* Span oculto para medir el ancho del texto */}
        <span
            ref={spanRef}
            style={{
            visibility: 'hidden',
            position: 'absolute',
            whiteSpace: 'pre',
            fontSize: '12pt',
            fontFamily: 'Arial, serif',
            fontWeight: bold ? 'bold' : 'normal', // Aplica negrita si la prop bold es true
            }}
        >
            {value || placeholder}
        </span>

        {/* Input sin bordes ni fondo */}
        <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            style={{
            width: `${width}px`,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            padding: '0',
            margin: 'none',
            fontFamily: 'Arial, serif',
            fontSize: '12pt',
            fontWeight: bold ? 'bold' : 'normal', // Aplica negrita si la prop bold es true
            color: 'inherit',
            }}
        />
        </div>
    );
};

export default AutoResizingInput;
