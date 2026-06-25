import axios from 'axios';


class FiguritasAPI {
    constructor(urlAPI) {
        this.urlAPI = urlAPI;
    };

    // Figuritas
    async deleteFigurita(idFigurita) {
        try {
            const result = await axios.delete(`${this.urlAPI}/figuritas/${idFigurita}`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    // Jugadores
    async getJugadores() {
        try {
            const result = await axios.get(`${this.urlAPI}/figuritas/jugadores`)
        } catch (error) {
            throw new Error(error);
        };
    };

    async getJugadoresPorSeleccion(idSeleccion) {
        try {
            const result = await axios.get(`${this.urlAPI}/figuritas/jugadores/seleccion/${idSeleccion}`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    }

    async createJugador(datosJugador) {
        try {
            const result = await axios.post(`${this.urlAPI}/figuritas/jugadores`, datosJugador);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modifyJugador(idJugador, datosJugador) {
        try {
            const result = await axios.put(`${this.urlAPI}/figuritas/jugadores/${idJugador}`, datosJugador);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    // Especiales
    async getEspeciales() {
        try {
            const result = await axios.get(`${this.urlAPI}/figuritas/especiales`);
            return result.data
        } catch (error) {
            throw new Error(error);
        };
    };

    async getEspecialesPorSeleccion(idSeleccion) {
        try {
            const result = await axios.get(`${this.urlAPI}/figuritas/especiales/seleccion/${idSeleccion}`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async createEspecial(datosEspecial) {
        try {
            const result = await axios.post(`${this.urlAPI}/figuritas/especiales/`, datosEspecial);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modifyEspecial(idEspecial, datosEspecial) {
        try {
            const result = await axios.put(`${this.urlAPI}/figuritas/especiales/${idEspecial}`, datosEspecial);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default FiguritasAPI;
