import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelizeConnection.js';


class Figurita extends Model { };

Figurita.init(
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
        sequelize,
        modelName: 'Figurita',
        tableName: 'figuritas',
        timestamps: false,
    }
);

export default Figurita;
