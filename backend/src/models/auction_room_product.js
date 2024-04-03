const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const AuctionRoomProductStatus = require('../../constants/auction_product_status')
const Seller = require('./seller');
const AuctionRoom = require('./auction_room');
const Product = require('./product');


const AuctionRoomProduct = sequelize.define('auction_room_product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    max_estimate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    min_estimate: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    numerical_order: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    auto_extend_time: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: AuctionRoomProductStatus.NOT_YET_SOLD,
    },
},
    {
        tableName: 'auction_room_product',
    }
)

AuctionRoom.belongsToMany(Product, { through: AuctionRoomProduct, foreignKey: "auction_room_id"})
Product.belongsToMany(AuctionRoom, { through: AuctionRoomProduct, foreignKey: "product_id"})

module.exports = AuctionRoomProduct;
