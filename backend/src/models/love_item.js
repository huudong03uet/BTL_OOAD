const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/index');
const Item = require('./item');
const User = require('./user')


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

LoveItem.belongsTo(Item, { foreignKey: 'item_id' });
LoveItem.belongsTo(User, { foreignKey: 'user_id' });

module.exports = LoveItem;
