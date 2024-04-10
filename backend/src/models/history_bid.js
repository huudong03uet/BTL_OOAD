const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Product = require('./product');
const User = require('./user');

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

BidHistory.belongsTo(User, {foreignKey: "user_id"})
User.hasMany(BidHistory, {foreignKey: "user_id"})

module.exports = BidHistory;
