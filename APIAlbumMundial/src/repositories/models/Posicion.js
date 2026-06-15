import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelizeConnection.js';

export const Posicion = sequelize.define(
  'Posicion',
  {
    idPosicion: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Posicion',
    timestamps: false,
  }
);
