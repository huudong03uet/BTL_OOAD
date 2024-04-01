const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionRoomStatus = require("../../constants/auction_room_status")
const Location = require('./location');
const User = require('./user');
const Seller = require('./seller');


const AuctionRoom = sequelize.define('auction_room', {
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
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: AuctionRoomStatus.PUBLIC,
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
},
    {
        tableName: 'auction_room',
    }
)

AuctionRoom.belongsTo(Location, { foreignKey: "location_id" });
Location.hasMany(AuctionRoom, { foreignKey: "location_id" });

AuctionRoom.belongsToMany(Seller, { through: "Auction_Room_Seller", foreignKey: "auction_room_id" })
Seller.belongsToMany(AuctionRoom, { through: "Auction_Room_Seller", foreignKey: "seller_id" })

module.exports = AuctionRoom;
