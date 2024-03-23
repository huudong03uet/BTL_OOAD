const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/index');
const ImageType = require("../../constants/image_type")
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
        type: DataTypes.STRING,
        allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ImageType.AVATAR,
    }
},
    {
        tableName: 'image',
    }
)

Image.hasOne(User, { foreignKey: 'user_id' });
Image.hasOne(Admin, { foreignKey: 'admin_id' });
Image.belongsTo(Item, { foreignKey: 'item_id' });

module.exports = Image;
