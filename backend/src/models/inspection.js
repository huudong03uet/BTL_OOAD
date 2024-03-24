const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const Admin = require('./admin');
const Item = require('./item');


const Inspection = sequelize.define('inspection', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    coin: {
        type: DataTypes.DOUBLE,
        defaultValue: 0.0,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
    }
},
    {
        tableName: 'inspection',
    }
)

Inspection.belongsTo(Admin, {foreignKey: 'admin_id'})
Admin.hasMany(Inspection);

Inspection.belongsTo(Item, {foreignKey: 'item_id'})
Item.hasMany(Inspection, {foreignKey: 'item_id'});

module.exports = Inspection;
