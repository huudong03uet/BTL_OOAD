const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/index');


const User = sequelize.define('user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        defaultValue: "abc@gmail.com",
    },
    evaluate: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    coin: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
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
},
    {
        tableName: 'user',
    }
)

module.exports = User;
