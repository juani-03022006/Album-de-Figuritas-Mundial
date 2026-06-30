import axios from 'axios';


export const getPosiciones = async () => {
    const result = await axios.get('http://localhost:4100/posiciones');
    return result.data;
};

export const createPosicion = async (datosPosicion) => {
    const result = await axios.post('http://localhost:4100/posiciones', datosPosicion);
    return result.data;
};

export const modifyPosicion = async (datosPosicion) => {
    const result = await axios.put(`http://localhost:4100/posiciones/${datosPosicion.idPosicion}`, datosPosicion);
    return result.data;
};

