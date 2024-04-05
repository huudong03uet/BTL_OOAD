const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionRequestStatus = require('../../constants/auction_request_status')
const Seller = require('./seller');
const Auction = require('./auction');
const Admin = require('./admin');


const AuctionRequest = sequelize.define('auction_request', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: AuctionRequestStatus.NOT_YET
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    admin_report: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    view: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    }
},
    {
        tableName: 'auction_request',
    }
)

AuctionRequest.belongsTo(Seller, {foreignKey: "seller_id"})
Seller.hasMany(AuctionRequest, {foreignKey: "seller_id"})

AuctionRequest.belongsTo(Auction, {foreignKey: "auction_id"})
Auction.hasMany(AuctionRequest, {foreignKey: "auction_id"})

AuctionRequest.belongsTo(Admin, {foreignKey: "admin_id"})
Admin.hasMany(AuctionRequest, {foreignKey: "admin_id"})

module.exports = AuctionRequest;
