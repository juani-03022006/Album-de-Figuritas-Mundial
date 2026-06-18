import axios from 'axios';


const getSelecciones = () => {
    const result = await axios.get('http://localhost:4000/selecciones/');
    return result;
};
