const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const User = require('./user');


const Report = sequelize.define('report', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    star: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
    }
},
    {
        tableName: 'report',
    }
)

Report.belongsTo(User, { foreignKey: 'user_id' });
Report.belongsTo(User, { foreignKey: 'user_evaluate' });

module.exports = Report;
