const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');

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
    }
},
    {
        tableName: 'seller',
    }
);

Seller.hasOne(User, {foreignKey: "seller_id"})
User.hasOne(Seller, {foreignKey: "user_id"})

module.exports = Seller;
