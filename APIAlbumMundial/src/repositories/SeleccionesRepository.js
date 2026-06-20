import { Seleccion } from './models/index.js';


class SeleccionRepository {
    async getSelecciones() {
        const selecciones = await Seleccion.findAll();
        return selecciones;
    };

    async createSeleccion(datosSeleccion) {
        const seleccionNueva = await Seleccion.create(datosSeleccion);
        return seleccionNueva;
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        const seleccion = await Seleccion.findOne({ where: { idSeleccion } });

        seleccion.set(datosSeleccion);
        await seleccion.save();

        return seleccion;
    };

    // Solo para testing. Habria que sacarla despues
    async deleteSelecciones() {
        try {
            const result = await Seleccion.truncate();
            return result;
        } catch (error) {
            throw new Error(error);
        };
    };
};

export default SeleccionRepository;
