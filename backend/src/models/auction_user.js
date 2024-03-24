const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Auction = require('./auction');
const User = require('./user');


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
);

AuctionUser.belongsTo(Auction, {foreignKey: "auction_user_id"})
Auction.hasMany(AuctionUser, {foreignKey: "auction_user_id"})

AuctionUser.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(AuctionUser, { foreignKey: 'user_id' });

module.exports = AuctionUser;
