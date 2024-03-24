const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');


const History = sequelize.define('history', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName: 'history',
    }
);

module.exports = History;
