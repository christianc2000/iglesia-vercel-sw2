import React, { useState } from 'react';

function Buscador({ onBuscar }) {
    const [query, setQuery] = useState('');

    const handleInputChange = (event) => {
        const inputValue = event.target.value;
        setQuery(inputValue);
        // Llamar a la función onBuscar cada vez que cambia la consulta
        onBuscar(inputValue);
    };

    return (
        <div className="relative flex flex-1 flex-shrink-0">
            <input
                className='peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500'
                type="text"
                placeholder="Buscar evento..."
                value={query}
                onChange={handleInputChange}
            />
        </div>
    );
}

export default Buscador;
