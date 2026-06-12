import { Figurita, FiguritaEspecial, FiguritaJugador, Posicion } from './models/index.js';


class FiguritasRepository {
    async getJugadores() {
        const jugadores = await FiguritaJugador.findAll({
            include: [
                Posicion,
                Figurita
            ]
        });

        return jugadores;
    };

    async getEspeciales() {
        const especiales = await FiguritaEspecial.findAll({
            include: [
                Figurita
            ]
        });

        return especiales;
    };
}
