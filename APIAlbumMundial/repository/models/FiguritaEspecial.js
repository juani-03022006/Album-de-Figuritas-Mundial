import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection.js';


class FiguritaEspecial extends Model { };

FiguritaEspecial.init(
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
        }
    },
    {
        sequelize,
        modelName: 'FiguritaEspecial',
        tableName: 'figurita_especial',
        timestamps: false
    }
)
