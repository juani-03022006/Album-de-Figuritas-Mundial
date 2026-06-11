import { Posicion } from './models/index.js';


class PosicionesRepository {
    async getPosiciones() {
        const posiciones = await Posicion.findAll();

        return posiciones;
    };

    async modifyPosicion(idPosicion, { descripcion }) {
        const posicion = await Posicion.findOne({ where: { idPosicion } });

        posicion.set({
            descripcion: descripcion
        });
        await posicion.save();

        return posicion;
    };

    async createPosicion({ descripcion }) {
        const nuevaPosicion = await Posicion.create({
            descripcion: descripcion
        });

        return nuevaPosicion;
    };
};

export default PosicionesRepository;
