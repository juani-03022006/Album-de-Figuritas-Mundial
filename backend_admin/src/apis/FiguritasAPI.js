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
};

export default FiguritasAPI;
