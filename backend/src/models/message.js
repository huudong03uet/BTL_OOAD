const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');


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

module.exports = Message;
