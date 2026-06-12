import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection.js';


class Seleccion extends Model { };

Seleccion.init(
    {
        idSeleccion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nombreSeleccion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        nombrePais: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        banderaPais: {
            type: DataTypes.CHAR,
            allowNull: false,
            unique: true
        },
        nroDesde: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        nroHasta: {
            type: DataTypes.INTEGER,
            allowNull: false,
            unique: true
        },
        colorPrincipal: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colorAcento1: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colorAcento2: {
            type: DataTypes.STRING,
            allowNull: false
        },
        colorTitulo: {
            type: DataTypes.STRING,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: 'Seleccion',
        tableName: 'selecciones',
        timestamps: false
    }
);

export default Seleccion;
