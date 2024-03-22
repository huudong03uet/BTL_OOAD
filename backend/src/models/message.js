const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/index');
const AuctionUser = require('./auction_user');
const User = require('./user')


const Message = sequelize.define('message', {
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
        tableName: 'message',
    }
)

Message.belongsTo(AuctionUser, { foreignKey: 'auction_user_id' });
Message.belongsTo(User, { foreignKey: 'user_id' });

module.exports = Message;
