import AdmZip from 'adm-zip';
import fs from 'fs';


class FiguritasService {
    constructor(FiguritasRepository) {
        if (!FiguritasRepository || typeof FiguritasRepository.createJugador !== 'function') {
            throw new Error('El Repositorio de figuritas es obligatorio!');
        };

        this.FiguritasRepository = FiguritasRepository;
    };

    // Para jugadores
    async obtenerJugadores() {
        try {
            const jugadores = await this.FiguritasRepository.getJugadores();
            return jugadores;
        } catch (error) {
            console.error(error);
        };
    };

    async obtenerJugadoresPorSeleccion(idSeleccion) {
        try {
            const jugadores = await this.FiguritasRepository.getJugadoresPorSeleccion(idSeleccion);
            return jugadores;
        } catch (error) {
            console.error(error);
        };
    };

    async crearJugador(datosJugador) {
        try {
            datosJugador.pathToPic = `uploads/jugadores/${datosJugador.nombreFoto}`;
            delete datosJugador.nombreFoto;

            console.log(datosJugador);

            const nuevoJugador = await this.FiguritasRepository.createJugador(datosJugador);
            return nuevoJugador;
        } catch (error) {
            console.error(error);
        };
    };

    async crearJugadores(arrayDatosJugadores, archivoZipFotos) {
        try {
            const zip = new AdmZip(archivoZipFotos);
            zip.extractAllTo('public/uploads/jugadores', true);

            for (const jugador of arrayDatosJugadores) {
                jugador.pathToPic = `uploads/jugadores/${jugador.nombreFoto}`;
                delete jugador.nombreFoto;
            };

            const nuevosJugadores = await this.FiguritasRepository.createJugadores(arrayDatosJugadores);
            return nuevosJugadores;
        } catch (error) {
            console.error(error);
        } finally {
            fs.unlink(archivoZipFotos, (err) => {
                if (err) {
                    console.error('Error deleting file:', err);
                    return;
                }
                console.log('File deleted successfully');
            });
        };
    };

    async modificarJugador(idJugadorModificado, datosNuevosJugador) {
        try {
            const jugadorModificado = await this.FiguritasRepository.modifyJugador(idJugadorModificado, datosNuevosJugador);
            return jugadorModificado;
        } catch (error) {
            console.error(error);
        };
    };

    // Para especiales
    async obtenerEspeciales() {
        try {
            const especiales = await this.FiguritasRepository.getEspeciales();
            return especiales;
        } catch (error) {
            console.error(error);
        };
    };

    async crearEspecial(datosEspecial) {
        try {
            datosEspecial.pathToPic = `uploads/especiales/${datosEspecial.nombreFoto}`;
            delete datosEspecial.nombreFoto;

            const nuevaEspecial = await this.FiguritasRepository.createEspecial(datosEspecial);
            return nuevaEspecial;
        } catch (error) {
            console.error(error);
        };
    };

    async crearEspeciales(arrayDatosEspeciales, archivoZipFotos) {
        try {
            const zip = new AdmZip(archivoZipFotos);
            zip.extractAllTo('public/uploads/jugadores', true);

            for (const especial of arrayDatosEspeciales) {
                especial.pathToPic = `uploads/especiales/${especial.nombreFoto}`;
                delete especial.nombreFoto;
            };

            const nuevasEspeciales = await this.FiguritasRepository.createEspeciales(arrayDatosEspeciales);
            return nuevasEspeciales;
        } catch (error) {
            console.error(error);
        } finally {
            await fs.unlink(archivoZipFotos);
        };
    }

    async modificarEspecial(idEspecialModificada, datosNuevosEspecial) {
        try {
            const especialModificada = await this.FiguritasRepository.modifyEspecial(idEspecialModificada, datosNuevosEspecial);
            return especialModificada;
        } catch (error) {
            console.error(error);
        };
    };
};

export default FiguritasService;
