import { Jugador } from '../domain/models/Jugador.js';


export class SeleccionService {
    constructor({ FiguritasRepositorio }) {
        this.FiguritasRepositorio = FiguritasRepositorio;
    };

    async #aniadirJugador({ posicionPagina, nombre, apellido, peso, estatura, fechaNacimiento, Posicion }) {
        const figuritaJugador = new Jugador(posicionPagina, nombre, apellido, peso, estatura, fechaNacimiento, Posicion);

        // Operacion en el repo (duda en el README.md)

        return figuritaJugador.obtenerInfoJugador();
    };

    async #aniadirTecnico() {};

    async #aniadirEscudo() {};

    async #aniadirFormacion() {};

    
    async crearSeleccion() {};
};
