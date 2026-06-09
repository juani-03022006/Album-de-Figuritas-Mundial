import { Figurita } from './Figurita.js';

export class Jugador extends Figurita {
    constructor({ numeroFigurita, Equipo, Posicion, fechaNacimiento, estatura, peso, nombre, apellido }) {
        super(numeroFigurita);

        // Deberia tener una funcion para verificar los tipos?

        if (typeof Equipo.obtenerNombre !== 'function') {
            throw new Error('El equipo debe ser de la clase Equipo.');
        };

        if (typeof Posicion.obtenerPosicion !== 'function') {
            throw new Error('La posición debe ser de la clase Posicion.');
        };
        
        if (typeof fechaNacimiento !== 'string') {
            throw new Error('La fecha de nacimiento debe ser correcta.');
        };

        if (typeof nombre !== 'string') {
            throw new Error('El nombre debe ser una cadena de texto.');
        };

        if (typeof apellido !== 'string') {
            throw new Error('El apellido debe ser una cadena de texto.');
        };


        this.Equipo = Equipo;
        this.Posicion = Posicion;
        this.fechaNacimiento = fechaNacimiento;
        this.estatura = estatura;
        this.peso = peso;
        this.nombre = nombre;
        this.apellido = apellido;
    };

    obtenerEquipo() {
        return this.Equipo.obtenerNombre();
    };

    obtenerPosicion() {
        return this.Posicion.obtenerPosicion();
    };

    obtenerInformacionJugador() {
        return {
            "nombre": this.nombre,
            "apellido": this.apellido,
            "estatura": this.estatura,
            "peso": this.peso,
            "fechaNacimiento": this.fechaNacimiento
        };
    };
};
