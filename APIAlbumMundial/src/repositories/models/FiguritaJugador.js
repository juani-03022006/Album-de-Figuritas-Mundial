import { DataTypes, Model } from 'sequelize';
import sequelize from '../sequelizeConnection.js';


class FiguritaJugador extends Model { };

FiguritaJugador.init(
    {
        idJugador: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
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
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        fechaNacimiento: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        idPosicion: {
            type: DataTypes.INTEGER,
        },
        idFigurita: {
            type: DataTypes.INTEGER,
        }
    },
    {
        sequelize,
        modelName: 'FiguritaJugador',
        tableName: 'figurita_jugador',
        timestamps: false
    }
);

export default FiguritaJugador;
