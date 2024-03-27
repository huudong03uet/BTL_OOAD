const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionRoomRequestStatus = require('../../constants/auction_room_request_status')
const Seller = require('./seller');
const AuctionRoom = require('./auction_room');
const Admin = require('./admin');


const AuctionRoomRequest = sequelize.define('auction_room_request', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: AuctionRoomRequestStatus.NOT_YET
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    admin_report: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},
    {
        tableName: 'auction_room_request',
    }
)

AuctionRoomRequest.belongsTo(Seller, {foreignKey: "seller_id"})
Seller.hasMany(AuctionRoomRequest, {foreignKey: "seller_id"})

AuctionRoomRequest.belongsTo(AuctionRoom, {foreignKey: "auction_room_id"})
AuctionRoom.hasMany(AuctionRoomRequest, {foreignKey: "auction_room_id"})

AuctionRoomRequest.belongsTo(Admin, {foreignKey: "admin_id"})
Admin.hasMany(AuctionRoomRequest, {foreignKey: "admin_id"})

module.exports = AuctionRoomRequest;
