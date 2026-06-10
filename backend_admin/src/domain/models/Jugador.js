import { Figurita } from './Figurita.js';


export class Jugador extends Figurita {
    constructor(numeroFigurita, nombre, apellido, peso, estatura, fechaNacimiento) {
        super(numeroFigurita);

        this.nombre = nombre;
        this.apellido = apellido;
        this.peso = peso;
        this.estatura = estatura;
        this.fechaNacimiento = fechaNacimiento;
    };

    obtenerInfoJugador() {
        return ({
            "numeroFigurita": this.numeroFigurita,
            "nombre": this.nombre,
            "apellido": this.apellido,
            "peso": this.peso,
            "estatura": this.estatura,
            "fechaNacimiento": this.fechaNacimiento
        });
    };
};
