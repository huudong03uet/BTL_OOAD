const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Location = require('./location');

const User = sequelize.define('user', {
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
    user_name: {
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
        defaultValue: "abc@gmail.com",
    },
    coin: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
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
        tableName: 'user',
    }
);

User.belongsTo(Location, {foreignKey: "location_id"});
Location.hasMany(User, {foreignKey: "location_id"});

module.exports = User;
