import { useEffect, useState } from 'react';
import { getSelecciones, createSeleccion, modifySeleccion } from '../apis/apiSelecciones.js';
import { getPosiciones, createPosicion, modifyPosicion } from '../apis/apiPosiciones.js';


export function useAlbum() {
    const [selecciones, setSelecciones] = useState([]);
    const [posiciones, setPosiciones] = useState([])
    const [loading, setLoading] = useState(true);

    // Para selecciones
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
            await modifySeleccion(datosSeleccion);
            await fetchSelecciones();
        } catch (error) {
            throw new Error(error.message);
        };
    };
    
    // Para posiciones
    const fetchPosiciones = async () => {
        try {
            setLoading(true);

            const result = await getPosiciones();
            setPosiciones(result);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        };
    };
    
    useEffect(() => {
        fetchSelecciones();
        fetchPosiciones();
    }, []);
    
    return {
        selecciones,
        posiciones,
        loading,
        addSeleccion: handleSeleccionesChange,
        modifySeleccion: handleSeleccionChange
    };
};
