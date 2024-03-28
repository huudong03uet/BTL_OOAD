const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionRoomProduct = require('./auction_room_product');
const BidHistory = require('./bid_history');

const Winner = sequelize.define('winner', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
},
    {
        tableName: 'winner',
    }
);

Winner.belongsTo(AuctionRoomProduct, {foreignKey: "auction_product_id"})
AuctionRoomProduct.hasMany(Winner, {foreignKey: "auction_product_id"})

Winner.hasOne(BidHistory, {foreignKey: "bid_history_id"})
BidHistory.hasOne(Winner, {foreignKey: "bid_history_id"})

module.exports = Winner;
