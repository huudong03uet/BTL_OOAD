const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/index');
const User = require('./user');
const Item = require('./item');


const Auction = sequelize.define('auction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    condition_evaluate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "public"
    },
    time_action: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    codition_coin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    time_register: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
    {
        tableName: 'auction',
    }
)

module.exports = Auction;
