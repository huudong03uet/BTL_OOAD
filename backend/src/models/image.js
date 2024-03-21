const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/index');
const User = require('./user');
const Item = require('./item');
const Admin = require('./admin')


const Image = sequelize.define('image', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    path: {
        type: DataTypes.BLOB,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "avater"
    }
},
    {
        tableName: 'image',
    }
)

Image.hasOne(User, { foreignKey: 'user_id' });
Image.hasOne(Admin, { foreignKey: 'admin_id' });
Image.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = Item;
