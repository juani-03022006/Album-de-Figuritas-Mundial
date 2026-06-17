import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection.js';


class Usuario extends Model { };

Usuario.init({
    idUsuario: {
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
},
    {
        sequelize,
        modelName: 'Usuario',
        tableName: 'usuarios',
        timestamps: false,
    }
);

export default Usuario;
