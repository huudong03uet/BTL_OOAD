const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const ImageType = require("../../constants/image_type")


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

module.exports = Image;
