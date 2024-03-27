const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');
const Seller = require('./seller');


const Review = sequelize.define('review', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
},
    {
        tableName: 'review',
    }
)

Review.belongsTo(Seller, { foreignKey: 'seller_id' });
Seller.hasMany(Review, { foreignKey: 'seller_id' })

Review.belongsTo(User, { foreignKey: 'user_evaluate' });
User.hasMany(Review, { foreignKey: 'user_evaluate' })

module.exports = Review;
