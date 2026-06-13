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

    async createFigurita(datosFigurita) {
        const nuevaFigurita = await Figurita.create(datosFigurita, {
            include: [(
                datosFigurita.tipo === 'j' ? {
                    model: FiguritaJugador,
                    as: 'jugador'
                } : {
                    model: FiguritaEspecial,
                    as: 'especial'
                }
            )]
        });

        return nuevaFigurita;
    };

    async modifyJugador(idJugador, datosNuevosJugador) {
        const jugador = await FiguritaJugador.findOne({ where: { idJugador } });

        jugador.set(datosNuevosJugador);
        jugador.save();

        return jugador;
    };

    async modifyEspecial(idEspecial, datosNuevosEspecial) {
        const especial = await FiguritaEspecial.findOne({ where: { idEspecial } });

        especial.set(datosNuevosEspecial);
        especial.save();
        return especial;
    };
};

export default FiguritasRepository;
