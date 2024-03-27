const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionRoomProduct = require('./auction_room_product');

const BidHistory = sequelize.define('bid_history', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    amount: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
},
    {
        tableName: 'bid_history',
    }
);

BidHistory.belongsTo(AuctionRoomProduct, {foreignKey: "auction_product_id"})
AuctionRoomProduct.hasMany(BidHistory, {foreignKey: "auction_product_id"})

module.exports = BidHistory;
