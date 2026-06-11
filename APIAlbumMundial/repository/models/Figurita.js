import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection.js';


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
            unique: true,
        },
        pathToPic: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        tipo: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        idSeleccion: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        modelName: 'Figurita',
        tableName: 'figuritas',
        timestamps: false
    }
);

await Figurita.sync();
export default Figurita;
