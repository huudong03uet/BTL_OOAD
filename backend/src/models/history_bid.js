const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Product = require('./product');

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
    view: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
    {
        tableName: 'bid_history',
    }
);

BidHistory.belongsTo(Product, {foreignKey: "product_id"})
Product.hasMany(BidHistory, {foreignKey: "product_id"})

module.exports = BidHistory;
