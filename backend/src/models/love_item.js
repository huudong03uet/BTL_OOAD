const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');


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

module.exports = LoveItem;
