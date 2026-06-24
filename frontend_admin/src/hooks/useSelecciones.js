import { useEffect, useState } from 'react';
import { getSelecciones, createSeleccion, deleteSeleccion } from '../api/apiSelecciones.js';


export function useSelecciones() {
    const [selecciones, setSelecciones] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchSelecciones = async () => {
            try {
                setLoading(true);

                const result = await getSelecciones();
                setSelecciones(result);
            } catch (error) {
                throw new Error(error);
            };
        };

        fetchSelecciones();
    }, []);

    const handleSeleccionesChange = async (nuevaSeleccion) => {
        try {
            console.log(nuevaSeleccion);
            const dataSeleccion = await createSeleccion(nuevaSeleccion);

            await fetchSelecciones();
        } catch (error) {
            throw new Error(error);
        };
    };

    const handleSeleccionDelete = async (idSeleccion) => {
        try {
            await deleteSeleccion(idSeleccion);

            setSelecciones((prev) => prev.filter((seleccion) => seleccion.idSeleccion !== idSeleccion));
        } catch (error) {
            throw new Error(error);
        };
    };

    return {
        selecciones,
        loading,
        addSeleccion: handleSeleccionesChange,
        deleteSeleccion: handleSeleccionDelete
    };
};
