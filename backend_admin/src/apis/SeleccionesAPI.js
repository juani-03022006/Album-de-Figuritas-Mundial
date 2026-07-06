import axios from 'axios';


class SeleccionesAPI {
    constructor(urlAPI) {
        this.urlAPI = urlAPI;
    };

    async getSelecciones() {
        try {
            const result = await axios.get(`${this.urlAPI}/selecciones`);
            return result.data;
        } catch (error) {
            throw error;
        };
    };

    async getSeleccionPorNombrePais(nombrePais) {
        try {
            const result = await axios.get(`${this.urlAPI}/selecciones/${nombrePais}`);
            return result.data;
        } catch (error) {
            throw error;
        };
    }
    
    async createSeleccion(datosSeleccion) {
        try {
            const result = await axios.post(`${this.urlAPI}/selecciones`, datosSeleccion);
            return result.data;
        } catch (error) {
            throw error;
        };
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        try {
            const result = await axios.put(`${this.urlAPI}/selecciones/${idSeleccion}`, datosSeleccion);
            return result.data;
        } catch (error) {
            throw error;
        };
    };
};

export default SeleccionesAPI;
