const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');


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
);


Message.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(Message, { foreignKey: 'user_id' });

Message.belongsTo(User, { foreignKey: 'user_2_id' })
User.hasMany(Message, { foreignKey: 'user_2_id' });

module.exports = Message;
