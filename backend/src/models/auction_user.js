const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/index');
const User = require('./user');
const Auction = require('./auction');


const AuctionUser = sequelize.define('auction_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
},
    {
        tableName: 'auction_user',
    }
)

AuctionUser.belongsTo(Auction, { foreignKey: 'auction_id' });
AuctionUser.belongsTo(User, { foreignKey: 'user_id' });

module.exports = AuctionUser;
