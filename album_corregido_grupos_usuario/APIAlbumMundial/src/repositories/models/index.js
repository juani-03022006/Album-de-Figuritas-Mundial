import Figurita from './Figurita.js';
import Posicion from './Posicion.js';
import Seleccion from './Seleccion.js';
import FiguritaEspecial from './FiguritaEspecial.js';
import FiguritaJugador from './FiguritaJugador.js';
import Usuario from './Usuario.js';
import UsuarioFigurita from './UsuarioFigurita.js';
import sequelize from '../sequelizeConnection.js';

Seleccion.hasMany(Figurita, { foreignKey: 'idSeleccion', as: 'figuritas' });
Figurita.belongsTo(Seleccion, { foreignKey: 'idSeleccion', as: 'seleccion' });

Figurita.hasOne(FiguritaJugador, { foreignKey: 'idFigurita', as: 'jugador' });
FiguritaJugador.belongsTo(Figurita, { foreignKey: 'idFigurita', as: 'figurita' });

Figurita.hasOne(FiguritaEspecial, { foreignKey: 'idFigurita', as: 'especial' });
FiguritaEspecial.belongsTo(Figurita, { foreignKey: 'idFigurita', as: 'figurita' });

Posicion.hasMany(FiguritaJugador, { foreignKey: 'idPosicion', as: 'jugadores' });
FiguritaJugador.belongsTo(Posicion, { foreignKey: 'idPosicion', as: 'posicion' });

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

await sequelize.sync({ alter: true });

export {
    sequelize,
    Figurita,
    FiguritaEspecial,
    FiguritaEspecial as FigEspeciales,
    FiguritaJugador,
    FiguritaJugador as Jugador,
    Seleccion,
    Posicion,
    Usuario,
    UsuarioFigurita,
};
