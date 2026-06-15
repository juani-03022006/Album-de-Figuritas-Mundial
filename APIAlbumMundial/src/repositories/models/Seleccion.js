import { DataTypes } from 'sequelize';
import { sequelize } from '../sequelizeConnection.js';

export const Seleccion = sequelize.define(
  'Seleccion',
  {
    idSeleccion: {
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
    asociacion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    flagUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nroDesde: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    nroHasta: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    colorMain: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorAccent1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorAccent2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    colorText: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'Seleccion',
    timestamps: false,
  }
);
