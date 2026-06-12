import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection.js';


class Posicion extends Model { };

Posicion.init(
    {
        idPosicion: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        descripcion: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }
    },
    {
        sequelize,
        modelName: 'Posicion',
        tableName: 'posiciones',
        timestamps: false
    }
);

export default Posicion;
