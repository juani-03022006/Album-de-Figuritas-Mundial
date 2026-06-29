import axios from 'axios';


export const getEspeciales = async () => {
    const result = await axios.get('http://localhost:4000/figuritas/especiales');
    return result.data;
};

export const createEspecial = async (datosEspecial) => {
    const result = await axios.post('http://localhost:4000/figuritas/especiales', datosEspecial);
    return result.data;
};

export const modifyEspecial = async (datosEspecial) => {
    const result = await axios.put(`http://localhost:4000/figuritas/especiales/${datosEspecial.idEspecial}`, datosEspecial);
    return result.data;
};
