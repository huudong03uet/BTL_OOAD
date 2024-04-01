const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');
const Location = require('./location');

const Seller = sequelize.define('seller', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Seller"
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "abc@gmail.com",
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
},
    {
        tableName: 'seller',
    }
);

Seller.hasOne(User, {foreignKey: "seller_id"})
User.hasOne(Seller, {foreignKey: "user_id"})

Seller.belongsTo(Location, {foreignKey: "location_id"});
Location.hasMany(Seller, {foreignKey: "location_id"});

module.exports = Seller;
