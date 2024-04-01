const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');
const Admin = require('./admin');
const Seller = require('./seller');


const Card = sequelize.define('card', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    expiry: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    CVN: {
        type: DataTypes.STRING,
        allowNull: true,
    }
},
    {
        tableName: 'card',
    }
);


Card.belongsTo(User, {foreignKey: "user_id"})
User.hasMany(Card, {foreignKey: "user_id"})

Card.belongsTo(Admin, {foreignKey: "admin_id"})
Admin.hasMany(Card, {foreignKey: "admin_id"})

Card.belongsTo(Seller, {foreignKey: "seller_id"})
Seller.hasMany(Card, {foreignKey: "seller_id"})

module.exports = Card;
