import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const UsuarioFigurita = sequelize.define(
  'UsuarioFigurita',
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    idFigurita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  },
  {
    tableName: 'UsuarioFigurita',
    timestamps: false,
  }
);
