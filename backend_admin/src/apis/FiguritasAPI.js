import axios from 'axios';
import FormData from 'form-data';


class FiguritasAPI {
    constructor(urlAPI) {
        this.urlAPI = urlAPI;
    };

    async deleteFigurita(idFigurita) {
        try {
            const result = await axios.delete(`${this.urlAPI}/jugadores/${idFigurita}`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    }

    async getJugadoresPorSeleccion(idSeleccion) {
        try {
            const result = await axios.get(`${this.urlAPI}/jugadores/seleccion/${idSeleccion}`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    }

    async createJugador(datosJugador, fotoJugador) {
        try {
            const formJugador = new FormData();

            formJugador.append("nroFigurita", datosJugador.nroFigurita);
            formJugador.append("nombreFoto", fotoJugador.originalname);
            formJugador.append("tipo", datosJugador.tipo);
            formJugador.append("idSeleccion", datosJugador.idSeleccion);
            formJugador.append("jugador", datosJugador.jugador);
            formJugador.append('fotoJugador', fotoJugador.buffer, {
                filename: fotoJugador.originalname,
                contentType: fotoJugador.mimetype
            });

            const result = await axios.post(`${this.urlAPI}/jugadores/`, formJugador, {
                headers: formJugador.getHeaders()
            });
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modifyJugador(idJugador, datosJugador) {
        try {
            const result = await axios.put(`${this.urlAPI}/jugadores/${idJugador}`, datosJugador);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async getEspecialesPorSeleccion(idSeleccion) {
        try {
            const result = await axios.get(`${this.urlAPI}/especiales/seleccion/${idSeleccion}`);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async createEspecial(datosEspecial, fotoEspecial) {
        try {
            const formEspecial = new FormData();

            formEspecial.append("nroFigurita", datosEspecial.nroFigurita);
            formEspecial.append("nombreFoto", fotoEspecial.originalname);
            formEspecial.append("tipo", datosEspecial.tipo);
            formEspecial.append("idSeleccion", datosEspecial.idSeleccion);
            formEspecial.append("especial", datosEspecial.especial);
            formEspecial.append('fotoEspecial', fotoEspecial.buffer, {
                filename: fotoEspecial.originalname,
                contentType: fotoEspecial.mimetype
            });

            const result = await axios.post(`${this.urlAPI}/especiales/`, formEspecial, {
                headers: formEspecial.getHeaders()
            });
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modifyEspecial(idEspecial, datosEspecial) {
        try {
            const result = await axios.put(`${this.urlAPI}/especiales/${idEspecial}`, datosEspecial);
            return result.data;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default FiguritasAPI;
