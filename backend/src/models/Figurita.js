import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Figurita = sequelize.define(
  'Figurita',
  {
    idFigurita: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nroFigurita: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    pathTopic: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    tipo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    idSeleccion: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'Figurita',
    timestamps: false,
  }
);
