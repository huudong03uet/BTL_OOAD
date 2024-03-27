const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');
const AuctionRoom = require('./auction_room');


const LiveChat = sequelize.define('live_chat', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
    {
        tableName: 'live_chat',
    }
);

LiveChat.belongsTo(AuctionRoom, { foreignKey: "auction_room_id"});
AuctionRoom.hasMany(LiveChat, { foreignKey: "auction_room_id"})

LiveChat.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(LiveChat, { foreignKey: 'user_id' });

module.exports = LiveChat;
