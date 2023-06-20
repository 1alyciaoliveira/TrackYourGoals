const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Transaction extends Model { }

Transaction.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user',
                key: 'id',
            },
        },
        objective_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'objective',
                key: 'id',
            },
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull:false
        },
        type: {
            type: DataTypes.TINYINT,
            allowNull:false
        },
        description: {
            type: DataTypes.STRING,
        },
        date_created: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }     
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'transaction',
    }
)

module.exports = Transaction;
