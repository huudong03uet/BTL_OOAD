const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Item = require('./item');
const User = require('./user');


const LoveItem = sequelize.define('love_item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
},
    {
        tableName: 'love_item',
    }
)

LoveItem.belongsTo(Item, {foreignKey: 'item_id'})
Item.hasMany(LoveItem, {foreignKey: 'item_id'});

LoveItem.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(LoveItem, { foreignKey: 'user_id' });

module.exports = LoveItem;
