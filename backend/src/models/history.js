const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionUser = require('./auction_user');
const User = require('./user');


const History = sequelize.define('history', {
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
    }
},
    {
        tableName: 'history',
    }
);

History.belongsTo(AuctionUser, {foreignKey: "auction_user_id"});
AuctionUser.hasOne(History, {foreignKey: "auction_user_id"})

History.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(History, { foreignKey: 'user_id' });

module.exports = History;
