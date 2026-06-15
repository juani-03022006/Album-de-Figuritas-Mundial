import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelizeConnection.js';

export const Usuario = sequelize.define(
  'Usuario',
  {
    idUsuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Usuario',
    timestamps: false,
  }
);
