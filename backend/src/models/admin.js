const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Image = require('./image');
const Inspection = require('./inspection');


const Admin = sequelize.define('admin', {
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
        defaultValue: "admin@gmail.com",
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        tableName: 'admin',
    }
);

Admin.hasOne(Image);
Admin.hasMany(Inspection)

module.exports = Admin;
