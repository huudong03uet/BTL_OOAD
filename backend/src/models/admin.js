const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Location = require('./location');


const Admin = sequelize.define('admin', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    admin_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    avatar_path: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        tableName: 'admin',
    }
);

Admin.belongsTo(Location, {foreignKey: "location_id"});
Location.hasMany(Admin, {foreignKey: "location_id"});

module.exports = Admin;
