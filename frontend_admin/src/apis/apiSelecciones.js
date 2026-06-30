import axios from 'axios';


export const getSelecciones = async () => {
    const result = await axios.get('http://localhost:4100/selecciones');
    return result.data;
};

export const createSeleccion = async (seleccion) => {
    const result = await axios.post('http://localhost:4100/selecciones', seleccion);
    return result.data;
}

export const modifySeleccion = async (datosSeleccion) => {
    const result = await axios.put(`http://localhost:4100/selecciones/${datosSeleccion.idSeleccion}`, datosSeleccion);
    return result.data;
};
