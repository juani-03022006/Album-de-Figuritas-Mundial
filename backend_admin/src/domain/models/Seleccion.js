export class Seleccion {
    constructor(nombreSeleccion, Confederacion, Pais) {
        this.nombreSeleccion = nombreSeleccion;
        this.Confederacion = Confederacion;
        this.Pais = Pais;
    };

    obtenerInfoSeleccion() {
        return ({
            "nombreSeleccion": this.nombreSeleccion,
            "nombreConfederacion": this.Confederacion.obtenerNombre(),
            "nombrePais": this.Pais.obtenerNombre(),
            "banderaPais": this.Pais.obtenerBandera()
        });
    };
};
