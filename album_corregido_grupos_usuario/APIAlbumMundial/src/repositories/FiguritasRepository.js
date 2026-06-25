import { Figurita, FiguritaEspecial, FiguritaJugador, Posicion } from './models/index.js';

function normalizarFiguritaPayload(datosFigurita) {
    const { pathToPic, pathTopic, tipo, jugador, especial, ...rest } = datosFigurita;

    return {
        ...rest,
        pathTopic: pathTopic ?? pathToPic,
        tipo: String(tipo ?? '').trim().toLowerCase(),
        ...(jugador ? { jugador } : {}),
        ...(especial ? { especial } : {}),
    };
}

class FiguritasRepository {
    async deleteFigurita(idFigurita) {
        try {
            await FiguritaJugador.destroy({ where: { idFigurita } });
            await FiguritaEspecial.destroy({ where: { idFigurita } });
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
            const nuevoJugador = await Figurita.create(normalizarFiguritaPayload(datosJugador), {
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
            if (!jugador) throw new Error(`No se encontró jugador ${idJugador}`);

            jugador.set(datosNuevosJugador);
            await jugador.save();
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
            const nuevaEspecial = await Figurita.create(normalizarFiguritaPayload(datosEspecial), {
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
            const especial = await FiguritaEspecial.findOne({ where: { id: idEspecial } });
            if (!especial) throw new Error(`No se encontró figurita especial ${idEspecial}`);

            especial.set(datosNuevosEspecial);
            await especial.save();
            return especial;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

export default FiguritasRepository;
