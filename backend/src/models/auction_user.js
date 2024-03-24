const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const History = require('../models/history');
const Message = require('./message');


const AuctionUser = sequelize.define('auction_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
},
    {
        tableName: 'auction_user',
    }
);

AuctionUser.hasOne(History)
AuctionUser.hasMany(Message)

module.exports = AuctionUser;
