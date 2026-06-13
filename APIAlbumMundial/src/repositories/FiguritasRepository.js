import { Figurita, FiguritaEspecial, FiguritaJugador, Posicion } from './models/index.js';


class FiguritasRepository {
    async getJugadores() {
        const jugadores = await FiguritaJugador.findAll({
            include: [
                { model: Posicion, as: 'posicion' },
                { model: Figurita, as: 'figurita' }
            ]
        });

        return jugadores;
    };

    async createJugador(datosJugador) {
        const nuevoJugador = await Figurita.create(datosJugador, {
            include: [{
                model: FiguritaJugador,
                as: 'jugador'
            }]
        });

        return nuevoJugador;
    };

    async modifyJugador(idJugador, datosNuevosJugador) {
        const jugador = await FiguritaJugador.findOne({ where: { idJugador } });

        jugador.set(datosNuevosJugador);
        jugador.save();

        return jugador;
    };

    async getEspeciales() {
        const especiales = await FiguritaEspecial.findAll({
            include: [
                Figurita
            ]
        });

        return especiales;
    };

    async createEspecial(datosEspecial) {
        const nuevaFigurita = await Figurita.create(datosEspecial, {
            include: [{
                model: FiguritaEspecial,
                as: 'especial'
            }]
        });

        return nuevaFigurita;
    };

    async modifyEspecial(idEspecial, datosNuevosEspecial) {
        const especial = await FiguritaEspecial.findOne({ where: { idEspecial } });

        especial.set(datosNuevosEspecial);
        especial.save();
        return especial;
    };
};

export default FiguritasRepository;
