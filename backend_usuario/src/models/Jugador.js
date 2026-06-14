import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js';

export const Jugador = sequelize.define(
  'Jugador',
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
    apellido: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estatura: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    peso: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    club: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fechaNacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    idFigurita: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    idPosicion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    tableName: 'Jugador',
    timestamps: false,
  }
);
