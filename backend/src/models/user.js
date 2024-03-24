const { DataTypes} = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Image = require('./image')
const Item = require('./item');
const AuctionUser = require('./auction_user');
const History = require('../models/history');
const LoveItem = require('./love_item');
const Message = require('./message');

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

User.hasOne(Image);
User.hasMany(Item);
User.hasMany(AuctionUser);
User.hasOne(History);
User.hasMany(LoveItem);
User.hasMany(Message);

module.exports = User;
