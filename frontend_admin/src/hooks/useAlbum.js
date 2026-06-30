import { useEffect, useState } from 'react';
import { getSelecciones, createSeleccion, modifySeleccion } from '../apis/apiSelecciones.js';
import { getPosiciones, createPosicion, modifyPosicion } from '../apis/apiPosiciones.js';
import { getEspeciales, createEspecial, modifyEspecial, getJugadores, createJugador, modifyJugador } from '../apis/apiFiguritas.js';


export function useAlbum() {
    const [selecciones, setSelecciones] = useState([]);
    const [posiciones, setPosiciones] = useState([]);
    const [especiales, setEspeciales] = useState([]);
    const [jugadores, setJugadores] = useState([]);
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

    const handlePosicionesChange = async (datosPosicion) => {
        try {
            await createPosicion(datosPosicion);
            await fetchPosiciones();
        } catch (error) {
            throw new Error(error.message);
        };
    };

    const handlePosicionChange = async (datosPosicion) => {
        try {
            await modifyPosicion(datosPosicion);
            await fetchPosiciones();
        } catch (error) {
            throw new Error(error.message);
        };
    };

    // Para Especiales
    const fetchEspeciales = async () => {
        try {
            setLoading(true);

            const result = await getEspeciales();
            setEspeciales(result);
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        };
    };

    const handleEspecialesChange = async (datosEspecial) => {
        try {
            await createEspecial(datosEspecial);
            await fetchEspeciales();
        } catch (error) {
            throw new Error(error.message);
        };
    };

    const handleEspecialChange = async (datosEspecial) => {
        try {
            await modifyEspecial(datosEspecial);
            await fetchEspeciales();
        } catch (error) {
            throw new Error(error.message);
        };
    };

    // Para Jugadores
    const fetchJugadores = async () => {
        try {
            setLoading(true);

            const result = await getJugadores();
            return result.data;
        } catch (error) {
            throw new Error(error.message);
        } finally {
            setLoading(false);
        };
    };
    
    useEffect(() => {
        fetchSelecciones();
        fetchPosiciones();
        fetchEspeciales();
        fetchJugadores();
    }, []);
    
    return {
        selecciones,
        posiciones,
        especiales,
        jugadores,
        loading,
        addSeleccion: handleSeleccionesChange,
        modifySeleccion: handleSeleccionChange,
        addPosicion: handlePosicionesChange,
        modifyPosicion: handlePosicionChange,
        addEspecial: handleEspecialesChange,
        modifyEspecial: handleEspecialChange
    };
};
