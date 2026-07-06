import axios from 'axios';


export const getEspeciales = async () => {
    try {
        const result = await axios.get('http://localhost:4100/figuritas/especiales');
        return result.data;
    } catch (error) {
        throw error;
    };
};

export const createEspecial = async (datosEspecial) => {
    try {
        const result = await axios.post('http://localhost:4100/figuritas/especiales', datosEspecial);
        return result.data;
    } catch (error) {
        throw error;
    };
};

export const modifyEspecial = async (idEspecial, datosEspecial) => {
    try {
        const result = await axios.put(`http://localhost:4100/figuritas/especiales/${idEspecial}`, datosEspecial);
        return result.data;
    } catch (error) {
        throw error;
    };
};

export const getJugadores = async () => {
    try {
        const result = await axios.get('http://localhost:4100/figuritas/jugadores');
        return result.data;
    } catch (error) {
        throw error;
    };
};

export const createJugador = async (datosJugador) => {
    try {
        const result = await axios.post('http://localhost:4100/figuritas/jugadores', datosJugador);
        return result.data;
    } catch (error) {
        throw error;
    };
};

export const modifyJugador = async (idJugador, datosJugador) => {
    try {
        const result = await axios.put(`http://localhost:4100/figuritas/jugadores/${idJugador}`, datosJugador);
        return result.data;
    } catch (error) {
        throw error;
    };
};
