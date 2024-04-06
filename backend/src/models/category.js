const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');


const Category = sequelize.define('category', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_path: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
},
    {
        tableName: 'category',
    }
);

module.exports = Category;
