const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const UserInvitationStatus = require("../../constants/user_invitation")
const User = require('./user');
const AuctionRoom = require('./auction_room');
const Seller = require('./seller');


const InvitationUser = sequelize.define('invitation_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: UserInvitationStatus.NOT_YET
    },
    view: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
    {
        tableName: 'invitation_user',
    }
);

InvitationUser.belongsTo(Seller, {foreignKey: "inviter_id"})
Seller.hasMany(InvitationUser, {foreignKey: "inviter_id"})

InvitationUser.belongsTo(User, {foreignKey: "user_id"})
User.hasMany(InvitationUser, {foreignKey: "user_id"})

InvitationUser.belongsTo(AuctionRoom, {foreignKey: "auction_room_id"})
AuctionRoom.hasMany(InvitationUser, {foreignKey: "auction_room_id"})

module.exports = InvitationUser;
