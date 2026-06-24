import axios from 'axios';


export const getSelecciones = async () => {
    const result = await axios.get('http://localhost:4000/selecciones');
    return result.data;
};

export const createSeleccion = async (seleccion) => {
    const result = await axios.post('http://localhost:4000/selecciones', seleccion);
    return result.data;
}

export const deleteSeleccion = async (idSeleccion) => {
    const result = await axios.delete(`http://localhost:4000/selecciones/${idSeleccion}`);
    return result.data;
};
