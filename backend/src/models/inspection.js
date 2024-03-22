const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/index');
const Item = require('./item');
const Admin = require('./admin')


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

Inspection.belongsTo(Item, { foreignKey: 'item_id' });
Inspection.belongsTo(Admin, { foreignKey: 'admin_id' });

module.exports = Inspection;
