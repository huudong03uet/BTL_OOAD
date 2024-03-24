const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const ItemStatus = require("../../constants/item_status");
const Auction = require('./auction');
const User = require('./user');


const Item = sequelize.define('item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ItemStatus.NOT_SOLD,
    },
    max_bid: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0.0,
    },
    count_bid: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    estimate_min: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0.0,
    },
    estimate_max: {
        type: DataTypes.DOUBLE,
        allowNull: true,
        defaultValue: 0.0,
    },
    dimensions: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    artist: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "UNK",
    },
    condition_report: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'No damages observed.',
    },
    provenance: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName: 'item',
    }
);

Item.belongsTo(Auction, {foreignKey: "auction_id"})
Auction.hasMany(Item, {foreignKey: "auction_id"})

Item.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Item, { foreignKey: 'user_id' });

module.exports = Item;
