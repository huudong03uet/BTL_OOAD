const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Image = require('./image');
const Inspection = require('./inspection');
const LoveItem = require('./love_item');


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
},
    {
        tableName: 'item',
    }
)

Item.hasMany(Image);
Item.hasMany(Inspection);
Item.hasMany(LoveItem);

module.exports = Item;
