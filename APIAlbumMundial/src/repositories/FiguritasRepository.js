import { Figurita, FiguritaEspecial, FiguritaJugador, Posicion } from './models/index.js';
import sequelize from './sequelizeConnection.js';


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
            throw error;
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
            throw error;
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
            throw error;
        };
    };

    async createJugador(datosJugador) {
        try {
            const nuevoJugador = await FiguritaJugador.create(datosJugador, {
                include: [
                    { model: Figurita, as: 'figurita' }
                ]
            });

            return nuevoJugador;
        } catch (error) {
            throw error;
        };
    };

    async modifyJugador(idJugador, datosNuevosJugador) {
        const t = await sequelize.transaction();

        try {
            const jugador = await FiguritaJugador.findOne({ where: { idJugador } });
            const idFigurita = jugador.idFigurita;
            const figurita = await Figurita.findOne({ where: { idFigurita } });

            jugador.set(datosNuevosJugador);
            figurita.set(datosNuevosJugador.figurita);

            await jugador.save({ transaction: t });
            await figurita.save({ transaction: t });

            await t.commit();
            return { ...jugador, figurita: figurita };
        } catch (error) {
            await t.rollback();
            throw error;
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
            throw error;
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
            throw error;
        };
    };

    async createEspecial(datosEspecial) {
        try {
            const nuevaEspecial = await FiguritaEspecial.create(datosEspecial, {
                include: [
                    { model: Figurita, as: 'figurita' }
                ]
            });

            return nuevaEspecial;
        } catch (error) {
            throw error;
        };
    };

    async modifyEspecial(idEspecial, datosNuevosEspecial) {
        const t = await sequelize.transaction();

        try {
            const especial = await FiguritaEspecial.findOne({ where: { id: idEspecial } });
            const idFigurita = especial.idFigurita;
            const figurita = await Figurita.findOne({ where: { idFigurita } });

            especial.set(datosNuevosEspecial);
            figurita.set(datosNuevosEspecial.figurita);

            await especial.save({ transaction: t });
            await figurita.save({ transaction: t });

            await t.commit();
            return { ...especial, figurita: figurita };
        } catch (error) {
            await t.rollback();
            throw error;
        };
    };
};

export default FiguritasRepository;
