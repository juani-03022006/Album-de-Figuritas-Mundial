import { useEffect, useState } from 'react';

export function useSelecciones() {
    const [selecciones, setSelecciones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSelecciones = async () => {
            try {
                setLoading(true);

                const result = await getSelecciones();

                if (!result.ok) throw new Error('Error al cargar las selecciones.');

                const data = await result.json;
                setSelecciones(data);
            } catch (error) {
                setError(error);
            };
        };

        fetchSelecciones();
    }, []);

    const handleSeleccionesChange = (nuevaSeleccion) => {
        setSelecciones((prev) => [...prev, nuevaSeleccion]);
    };

    return {
        selecciones,
        loading,
        error,
        setSelecciones: handleSeleccionesChange
    };
};
