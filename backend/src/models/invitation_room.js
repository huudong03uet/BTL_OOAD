const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const RoomInvitationStatus = require("../../constants/room_invitation")
const User = require('./user');
const AuctionRoom = require('./auction_room');
const Product = require('./product');


const InvitationRoom = sequelize.define('invitation_room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: RoomInvitationStatus.NOT_YET,
    },
},
    {
        tableName: 'invitation_room',
    }
);

InvitationRoom.belongsTo(User, {foreignKey: "inviter_id"})
User.hasMany(InvitationRoom, {foreignKey: "inviter_id"})

InvitationRoom.belongsTo(Product, {foreignKey: "product_id"})
Product.hasMany(InvitationRoom, {foreignKey: "product_id"})

InvitationRoom.belongsTo(AuctionRoom, {foreignKey: "auction_room_id"})
AuctionRoom.hasMany(InvitationRoom, {foreignKey: "auction_room_id"})

module.exports = InvitationRoom;
