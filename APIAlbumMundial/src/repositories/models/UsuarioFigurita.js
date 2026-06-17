import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection.js';

class UsuarioFigurita extends Model { };

UsuarioFigurita.init(
    {
        idUsuario: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
        idFigurita: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
    },
    {
        sequelize,
        modelName: 'UsuarioFigurita',
        tableName: 'usuario-figurita',
        timestamps: false,
    }
);

export default UsuarioFigurita;
