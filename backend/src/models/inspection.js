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
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [InspectionType.DENIED, InspectionType.INSPECTED, InspectionType.INSPECTTING, InspectionType.NOT_INSPECT],
        defaultValue: InspectionType.NOT_INSPECT,
    },
},
    {
        tableName: 'inspection',
    }
)

Inspection.belongsTo(Admin, { foreignKey: 'admin_id' })
Admin.hasMany(Inspection, { foreignKey: 'admin_id' });


Inspection.hasOne(Product, {foreignKey: "inspect_id"})
Product.hasOne(Inspection, {foreignKey: "product_id"});

module.exports = Inspection;
