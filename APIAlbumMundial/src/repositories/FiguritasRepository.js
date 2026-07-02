import { Figurita, FiguritaEspecial, FiguritaJugador, Posicion } from './models/index.js';


class FiguritasRepository {
    async deleteFigurita(idFigurita) {
        try {
            const jugador = await FiguritaJugador.findOne({ where: { idFigurita: idFigurita } });

            if (jugador) {
                await jugador.destroy();
            };

            const result = await Figurita.destroy({ where: { idFigurita } });
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    }

    async getJugadores() {
        try {
            const jugadores = await FiguritaJugador.findAll({
                include: [
                    { model: Posicion, as: 'posicion' },
                    { model: Figurita, as: 'figurita' }
                ]
            });

            return jugadores;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getJugadoresPorSeleccion(idSeleccion) {
        try {
            const jugadores = await FiguritaJugador.findAll({
                include: [
                    { model: Posicion, as: 'posicion' },
                    { model: Figurita, as: 'figurita', where: { idSeleccion } }
                ]
            });

            return jugadores;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createJugador(datosJugador) {
        try {
            const nuevoJugador = await Figurita.create(datosJugador, {
                include: [
                    { model: FiguritaJugador, as: 'jugador' }
                ]
            });

            return nuevoJugador;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async modifyJugador(idJugador, datosNuevosJugador) {
        try {
            const jugador = await FiguritaJugador.findOne({ where: { idJugador } });

            jugador.set(datosNuevosJugador);
            jugador.save();
            return jugador;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getEspeciales() {
        try {
            const especiales = await FiguritaEspecial.findAll({
                include: [
                    { model: Figurita, as: 'figurita' }
                ]
            });

            return especiales;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getEspecialesPorSeleccion(idSeleccion) {
        try {
            const especiales = await FiguritaEspecial.findAll({
                include: [
                    { model: Figurita, as: 'figurita', where: { idSeleccion } }
                ]
            });

            return especiales;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createEspecial(datosEspecial) {
        try {
            const nuevaEspecial = await Figurita.create(datosEspecial, {
                include: [
                    { model: FiguritaEspecial, as: 'especial' }
                ]
            });

            return nuevaEspecial;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async modifyEspecial(idEspecial, datosNuevosEspecial) {
        try {
            const especial = await Figurita.findOne({
                include: { 
                    model: FiguritaEspecial, as: 'especial',
                    where: { id: idEspecial },
                    required: true
                }
            });

            console.log(especial)

            especial.set(datosNuevosEspecial);
            especial.save();
            return especial;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

export default FiguritasRepository;
