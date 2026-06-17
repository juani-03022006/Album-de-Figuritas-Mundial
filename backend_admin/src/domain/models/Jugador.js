import { Figurita } from './Figurita.js';


export class Jugador extends Figurita {
    constructor(posicionPagina, nombre, apellido, peso, estatura, fechaNacimiento, Posicion) {
        super(posicionPagina);

        this.nombre = nombre;
        this.apellido = apellido;
        this.peso = peso;
        this.estatura = estatura;
        this.fechaNacimiento = fechaNacimiento;
        this.Posicion = Posicion;
    };

    obtenerInfoJugador() {
        return ({
            "posicionPagina": this.posicionPagina,
            "nombre": this.nombre,
            "apellido": this.apellido,
            "peso": this.peso,
            "estatura": this.estatura,
            "fechaNacimiento": this.fechaNacimiento,
            "posicion": this.Posicion.obtenerPosicion()
        });
    };
};
