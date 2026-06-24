import Figurita from './Figurita.js';
import Posicion from './Posicion.js';
import Seleccion from './Seleccion.js';
import FiguritaEspecial from './FiguritaEspecial.js';
import FiguritaJugador from './FiguritaJugador.js';
import Usuario from './Usuario.js';
import UsuarioFigurita from './UsuarioFigurita.js';
import sequelize from '../sequelizeConnection.js';


Seleccion.hasMany(Figurita, { foreignKey: 'idSeleccion' });
Figurita.belongsTo(Seleccion, { foreignKey: 'idSeleccion' });

Figurita.hasOne(FiguritaJugador, { foreignKey: 'idFigurita', as: 'jugador' });
FiguritaJugador.belongsTo(Figurita, { foreignKey: 'idFigurita' });

Figurita.hasOne(FiguritaEspecial, { foreignKey: 'idFigurita', as: 'especial' });
FiguritaEspecial.belongsTo(Figurita, { foreignKey: 'idFigurita' });

Posicion.hasMany(FiguritaJugador, { foreignKey: 'idPosicion' });
FiguritaJugador.belongsTo(Posicion, { foreignKey: 'idPosicion' });

Usuario.belongsToMany(Figurita, {
  through: UsuarioFigurita,
  foreignKey: 'idUsuario',
  otherKey: 'idFigurita',
});

Figurita.belongsToMany(Usuario, {
  through: UsuarioFigurita,
  foreignKey: 'idFigurita',
  otherKey: 'idUsuario',
});

// Posicion del jugador
Posicion.hasOne(FiguritaJugador, {
    foreignKey: 'idPosicion',
    as: 'posicion'
});
FiguritaJugador.belongsTo(Posicion, {
    foreignKey: 'idPosicion',
    as: 'posicion'
});

// Figuritas de cada selecion
Seleccion.hasMany(Figurita, {
    foreignKey: 'idSeleccion',
    as: 'seleccion'
});
Figurita.belongsTo(Seleccion, {
    foreignKey: 'idSeleccion',
    as: 'seleccion'
});

Usuario.belongsToMany(Figurita, {
    through: UsuarioFigurita,
    foreignKey: 'idUsuario',
    otherKey: 'idFigurita',
});

Figurita.belongsToMany(Usuario, {
    through: UsuarioFigurita,
    foreignKey: 'idFigurita',
    otherKey: 'idUsuario',
});


await sequelize.sync();
export { Figurita, FiguritaEspecial, FiguritaJugador, Seleccion, Posicion, Usuario, UsuarioFigurita };
