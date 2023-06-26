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
            allowNull:true // changed to true so it can accept negative values 
            //If it´s change to false 
            //we prevent that the user submits an empty input and it´s handle with the same ERROR that is on addMoney, since the remove feature is working with TINYINT. 
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
