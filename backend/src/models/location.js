const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');


const Location = sequelize.define('location', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    country: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    state: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    postal_code: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    x: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    y: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    }
},
    {
        tableName: 'location',
    }
);

module.exports = Location;
