const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');
const Auction = require('./auction')


const Item = sequelize.define('item', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
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

Item.belongsTo(User, { foreignKey: 'user_id' });
Item.belongsTo(Auction, { foreignKey: 'auction_id' });

module.exports = Item;
