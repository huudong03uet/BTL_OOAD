const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Product = require('./product');
const BidHistory = require('./history_bid');

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

Winner.hasOne(Product, {foreignKey: "winner_id"})
Product.hasOne(Winner, {foreignKey: "product_id"})

Winner.hasOne(BidHistory, {foreignKey: "winner_id"})
BidHistory.hasOne(Winner, {foreignKey: "bid_history_id"})

module.exports = Winner;
