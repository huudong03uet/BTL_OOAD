const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionStatus = require("../../constants/auction_status")
const Location = require('./location');
const User = require('./user');
const Seller = require('./seller');


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
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [AuctionStatus.PRIVATE, AuctionStatus.PUBLIC],
        defaultValue: AuctionStatus.PUBLIC,
    },
    time_auction: {
        type: DataTypes.DATE,
        allowNull: false,
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
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    is_delete: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
    {
        tableName: 'auction',
    }
)

Auction.belongsTo(Location, { foreignKey: "location_id" });
Location.hasMany(Auction, { foreignKey: "location_id" });

Auction.belongsTo(Seller, { foreignKey: "seller_id" })
Seller.hasMany(Auction, { foreignKey: "seller_id" })

Auction.belongsToMany(User, {through: "Auction_Participant", foreignKey: "auction_id"})
User.belongsToMany(Auction, {through: "Auction_Participant", foreignKey: "user_id"})

module.exports = Auction;
