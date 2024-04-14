const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const InspectionType = require("../../constants/inspection")
const Admin = require('./admin');
const Product = require('./product');


const Inspection = sequelize.define('inspection', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
},
    {
        tableName: 'inspection',
    }
)

Inspection.belongsTo(Admin, {foreignKey: 'admin_id'})
Admin.hasMany(Inspection, {foreignKey: 'admin_id'});

Inspection.belongsTo(Product, {foreignKey: 'product_id'})
Product.hasMany(Inspection, {foreignKey: 'product_id'});

module.exports = Inspection;
