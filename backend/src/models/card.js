const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');
const Admin = require('./admin');
const Seller = require('./seller');


const Card = sequelize.define('card', {
    id: {
        type: DataTypes.INTEGER,
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


Card.hasOne(User, {foreignKey: "card_id"})
User.hasOne(Card, {foreignKey: "user_id"})

Card.hasOne(Admin, {foreignKey: "card_id"})
Admin.hasOne(Card, {foreignKey: "admin_id"})

Card.hasOne(Seller, {foreignKey: "card_id"})
Seller.hasOne(Card, {foreignKey: "seller_id"})

module.exports = Card;
