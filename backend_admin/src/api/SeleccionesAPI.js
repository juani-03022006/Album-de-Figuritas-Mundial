import axios from 'axios';


class SeleccionesAPI {
    constructor(urlAPI) {
        this.urlAPI = urlAPI;
    };

    async getSelecciones() {
        try {
            const result = await axios.get(`${this.urlAPI}/selecciones/`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };
    
    async createSeleccion(datosNuevaSeleccion) {
        try {
            const result = await axios.post(`${this.urlAPI}/selecciones/`, datosNuevaSeleccion);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        try {
            const result = await axios.put(`${this.urlAPI}/selecciones/${idSeleccion}`, datosSeleccion);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default SeleccionesAPI;
