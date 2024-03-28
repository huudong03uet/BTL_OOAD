const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const CoinHistoryType = require("../../constants/coin_history")
const User = require('./user');

const CoinHistory = sequelize.define('coin_history', {
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
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: CoinHistoryType.BUY
    },
},
    {
        tableName: 'coin_history',
    }
);

CoinHistory.belongsTo(User, {foreignKey: "user_id"})
User.hasMany(CoinHistory, {foreignKey: "user_id"})

module.exports = CoinHistory;
