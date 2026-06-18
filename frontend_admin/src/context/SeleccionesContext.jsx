import { createContext, useContext, useState } from 'react';
import { useSelecciones } from '../hooks/useSelecciones.js';


const SeleccionesContext = createContext(null);

export const SeleccionesProvider = ({ children }) => {
    const value = useSelecciones();

    return (
        <SeleccionesContext.Provider value={value}>
            {children}
        </SeleccionesContext.Provider>
    );
};

export function useSeleccionesContext() {
    const context = useContext(SeleccionesContext);

    if (context === null) {
        throw new Error('useSeleccionesContext debe usarse dentro de un SeleccionesProvider');
    };

    return context;
};
