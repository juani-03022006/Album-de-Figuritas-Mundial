import { Seleccion } from './models/index.js';


class SeleccionRepository {
    async getSelecciones() {
        try {
            const selecciones = await Seleccion.findAll();
            return selecciones;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async getSeleccionPorNombrePais(nombrePais) {
        try {
            const seleccion = await Seleccion.findOne({ where: { nombrePais } });
            return seleccion ?? `No se encontraron Selecciones con el nombre ${nombrePais}!`;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    async createSeleccion(datosSeleccion) {
        try {
            const seleccionNueva = await Seleccion.create(datosSeleccion);
            return seleccionNueva;
        } catch (error) {
            throw error;
        };
    };

    async modifySeleccion(idSeleccion, datosSeleccion) {
        try {
            const seleccion = await Seleccion.findOne({ where: { idSeleccion } });

            seleccion.set(datosSeleccion);
            await seleccion.save();

            return seleccion;
        } catch (error) {
            throw new Error(error.message);
        };
    };

    // Solo para testing. Habria que sacarla despues
    async deleteSelecciones() {
        try {
            const result = await Seleccion.truncate();
            return result;
        } catch (error) {
            throw new Error(error.message);
        };
    };
};

export default SeleccionRepository;
