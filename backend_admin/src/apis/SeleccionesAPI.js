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
            throw new Error(error.message);
        };
    };

    async getSeleccionPorNombrePais(nombrePais) {
        try {
            const result = await axios.get(`${this.urlAPI}/selecciones/${nombrePais}`);
            return result.data;
        } catch (error) {
            throw new Error(error.message);
        };
    }
    
    async createSeleccion(datosSeleccion) {
        try {
            const result = await axios.post(`${this.urlAPI}/selecciones`, datosSeleccion);
            return result.data;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        try {
            const result = await axios.put(`${this.urlAPI}/selecciones/${idSeleccion}`, datosSeleccion);
            return result.data;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

export default SeleccionesAPI;
