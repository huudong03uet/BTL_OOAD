const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Product = require('./product');


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
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName: 'image',
    }
);

Image.belongsTo(Product, {foreignKey: "product_id"});
Product.hasMany(Image, {foreignKey: "product_id"});

module.exports = Image;
