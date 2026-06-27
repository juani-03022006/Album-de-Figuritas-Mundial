import { useEffect, useState } from 'react';
import { getSelecciones, createSeleccion, modifySeleccion } from '../apis/apiSelecciones.js';


export function useSelecciones() {
    const [selecciones, setSelecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const fetchSelecciones = async () => {
        try {
            setLoading(true);

            const result = await getSelecciones();
            setSelecciones(result);
        } catch (error) {
            throw new Error(error);
        } finally {
            setLoading(false);
        };
    };

    useEffect(() => {
        fetchSelecciones();
    }, []);

    const handleSeleccionesChange = async (nuevaSeleccion) => {
        try {
            await createSeleccion(nuevaSeleccion);
            await fetchSelecciones();
        } catch (error) {
            throw new Error(error);
        };
    };

    const handleSeleccionChange = async (datosSeleccion) => {
        try {
            console.log(datosSeleccion);
            await modifySeleccion(datosSeleccion);
            await fetchSelecciones();
        } catch (error) {
            throw new Error(error.message);
        };
    };

    return {
        selecciones,
        loading,
        addSeleccion: handleSeleccionesChange,
        modifySeleccion: handleSeleccionChange
    };
};
