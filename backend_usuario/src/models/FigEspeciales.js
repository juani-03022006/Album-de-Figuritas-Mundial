import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const FigEspeciales = sequelize.define(
  'FigEspeciales',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idFigurita: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
  },
  {
    tableName: 'FigEspeciales',
    timestamps: false,
  }
);
