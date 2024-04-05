const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');
const Product = require('./product');


const LoveProduct = sequelize.define('love_product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
},
    {
        tableName: 'love_product',
    }
)

LoveProduct.belongsTo(Product, {foreignKey: 'product_id'})
Product.hasMany(LoveProduct, {foreignKey: 'product_id'});

LoveProduct.belongsTo(User, { foreignKey: 'user_id' })
User.hasMany(LoveProduct, { foreignKey: 'user_id' });

module.exports = LoveProduct;
