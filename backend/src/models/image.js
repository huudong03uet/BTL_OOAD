const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const ImageType = require("../../constants/image_type");
const Admin = require('./admin');
const User = require('./user');
const Item = require('./item');


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

Image.belongsTo(Admin, {foreignKey: 'admin_id'});
Admin.hasOne(Image, {foreignKey: 'admin_id'});

Image.belongsTo(User, { foreignKey: 'user_id' })
User.hasOne(Image, { foreignKey: 'user_id' });

Image.belongsTo(Item, {foreignKey: "item_id"});
Item.hasMany(Image, {foreignKey: "item_id"});

module.exports = Image;
