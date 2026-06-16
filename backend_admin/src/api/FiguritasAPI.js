import axios from 'axios';
import FormData from 'form-data';


class FiguritasAPI {
    constructor(urlAPI) {
        this.urlAPI = urlAPI;
    };

    async createJugador(datosJugador, fotoJugador) {
        const formJugador = new FormData();

        formJugador.append("nroFigurita", datosJugador.nroFigurita);
        formJugador.append("tipo", datosJugador.tipo);
        formJugador.append("idSeleccion", datosJugador.idSeleccion);
        formJugador.append("jugador", datosJugador.jugador);
        formJugador.append('fotoJugador', fotoJugador.buffer, {
            filename: foto.originalname,
            contentType: foto.mimetype
        });

        const result = await axios.post(`${this.urlAPI}/jugadores/`, formJugador, {
            headers: formJugador.getHeaders()
        });
        return response.data;
    };
};
