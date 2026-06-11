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
        },
        nombrePais: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        banderaPais: {
            type: DataTypes.CHAR,
            allowNull: false,
        },
        nroDesde: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        nroHasta: {
            type: DataTypes.INTEGER,
            allowNull: false,
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
