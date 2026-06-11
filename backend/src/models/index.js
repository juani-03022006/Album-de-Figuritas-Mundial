import { sequelize } from '../config/database.js';
import { Posicion } from './Posicion.js';
import { Seleccion } from './Seleccion.js';
import { Figurita } from './Figurita.js';
import { Jugador } from './Jugador.js';
import { FigEspeciales } from './FigEspeciales.js';
import { Usuario } from './Usuario.js';
import { UsuarioFigurita } from './UsuarioFigurita.js';

Seleccion.hasMany(Figurita, { foreignKey: 'idSeleccion' });
Figurita.belongsTo(Seleccion, { foreignKey: 'idSeleccion' });

Figurita.hasOne(Jugador, { foreignKey: 'idFigurita', as: 'jugador' });
Jugador.belongsTo(Figurita, { foreignKey: 'idFigurita' });

Figurita.hasOne(FigEspeciales, { foreignKey: 'idFigurita', as: 'especial' });
FigEspeciales.belongsTo(Figurita, { foreignKey: 'idFigurita' });

Posicion.hasMany(Jugador, { foreignKey: 'idPosicion' });
Jugador.belongsTo(Posicion, { foreignKey: 'idPosicion' });

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

export {
  sequelize,
  Posicion,
  Seleccion,
  Figurita,
  Jugador,
  FigEspeciales,
  Usuario,
  UsuarioFigurita,
};
