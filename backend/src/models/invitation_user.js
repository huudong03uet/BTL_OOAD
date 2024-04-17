const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const UserInvitationStatus = require("../../constants/user_invitation")
const User = require('./user');
const Auction = require('./auction');
const Seller = require('./seller');


const InvitationUser = sequelize.define('invitation_user', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [UserInvitationStatus.ACCEPTED, UserInvitationStatus.DENIED, UserInvitationStatus.NOT_YET],
        defaultValue: UserInvitationStatus.NOT_YET
    },
},
    {
        tableName: 'invitation_user',
    }
);

InvitationUser.belongsTo(Seller, {foreignKey: "inviter_id"})
Seller.hasMany(InvitationUser, {foreignKey: "inviter_id"})

InvitationUser.belongsTo(User, {foreignKey: "user_id"})
User.hasMany(InvitationUser, {foreignKey: "user_id"})

InvitationUser.belongsTo(Auction, {foreignKey: "auction_id"})
Auction.hasMany(InvitationUser, {foreignKey: "auction_id"})

module.exports = InvitationUser;
