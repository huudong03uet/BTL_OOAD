const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionType = require('../../constants/auction_type')


const Auction = sequelize.define('auction', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    condition_evaluate: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: AuctionType.PUBLIC,
    },
    time_action: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
    condition_coin: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    time_register: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
},
    {
        tableName: 'auction',
    }
)

module.exports = Auction;
