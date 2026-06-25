import { Posicion } from './models/index.js';


class PosicionesRepository {
    async getPosiciones() {
        try {
            const posiciones = await Posicion.findAll();
            return posiciones;
        } catch (error) {
            throw new Error(error);
        };
    };

    async createPosicion({ descripcion }) {
        try {
            const nuevaPosicion = await Posicion.create({ descripcion: descripcion });
            return nuevaPosicion;
        } catch (error) {
            throw new Error(error);
        };
    };

    async modifyPosicion(idPosicion, { descripcion }) {
        try {
            const posicion = await Posicion.findOne({ where: { idPosicion } });

            posicion.set({ descripcion: descripcion });
            await posicion.save();

            return posicion;
        } catch (error) {
            throw new Error(error);
        };
    };

    async deletePosicion(idPosicion) {
        try {
            const posiconEliminada = await Posicion.destroy({ where: { idPosicion } });
            return posiconEliminada;
        } catch (error) {
            throw new Error(error);
        };
    }
};

export default PosicionesRepository;
