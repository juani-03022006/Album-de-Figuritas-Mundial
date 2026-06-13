import Figurita from './Figurita.js';
import Posicion from './Posicion.js';
import Seleccion from './Seleccion.js';
import FiguritaEspecial from './FiguritaEspecial.js';
import FiguritaJugador from './FiguritaJugador.js';
import sequelize from '../sequelizeConnection.js';


// Figuritas del tipo jugador
Figurita.hasOne(FiguritaJugador, {
    foreignKey: 'idFigurita',
    as: 'jugador'
});
FiguritaJugador.belongsTo(Figurita, {
    foreignKey: 'idFigurita',
    as: 'jugador'
});

// Figuritas del tipo Especial
Figurita.hasOne(FiguritaEspecial, {
    foreignKey: 'idFigurita',
    as: 'especial'
});
FiguritaEspecial.belongsTo(Figurita, {
    foreignKey: 'idFigurita',
    as: 'especial'
});

// Posicion del jugador
Posicion.hasOne(FiguritaJugador, {
    foreignKey: 'idPosicion'
});
FiguritaJugador.belongsTo(Posicion, {
    foreignKey: 'idPosicion',
    as: 'posicion'
});

// Figuritas de cada selecion
Seleccion.hasMany(Figurita, {
    foreignKey: 'idSeleccion'
});
Figurita.belongsTo(Seleccion, {
    foreignKey: 'idSeleccion',
    as: 'seleccion'
});


await sequelize.sync();
export { Figurita, FiguritaEspecial, FiguritaJugador, Seleccion, Posicion };
