import axios from 'axios';


class PosicionesAPI {
    constructor(urlAPI) {
        this.urlAPI = urlAPI;
    };

    async getPosiciones() {
        try {
            const result = await axios.get(`${this.urlAPI}/posiciones/`);
            return result.data;
        } catch (error) {
            console.error(error);
        };
    };
    
    async createPosicion(datosNuevaPosicion) {
        try {
            const result = await axios.post(`${this.urlAPI}/posiciones/`, datosNuevaPosicion);
            return result.data;
        } catch (error) {
            console.error(error);
        };
    };

    async modifyPosicion(idPosicion, datosPosicion) {
        try {
            const result = await axios.put(`${this.urlAPI}/posiciones/${idPosicion}`, datosPosicion);
            return result.data;
        } catch (error) {
            console.error(error);
        };
    };

    async deletePosicion(idPosicion) {
        try {
            const result = await axios.delete(`${this.urlAPI}/posiciones/${idPosicion}`);
            return result.data;
        } catch (error) {
            console.error(error);
        };
    };
};

export default PosicionesAPI;
