const { DataTypes } = require('sequelize');

const sequelize = require('../../conf/sequelize');
const ReceiptConfirmStatus = require("../../constants/receipt_confirm")
const Winner = require('./winner');


const ReceiptConfirmation = sequelize.define('receipt_confirm', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM,
        allowNull: false,
        values: [ReceiptConfirmStatus.NOT_RECEIVE, ReceiptConfirmStatus.OUT_DATE, ReceiptConfirmStatus.PAID, ReceiptConfirmStatus.RECEIVED, ReceiptConfirmStatus.UNPAID],
        defaultValue: ReceiptConfirmStatus.NOT_RECEIVE,
    },
},
    {
        tableName: 'receipt_confirm',
    }
);

ReceiptConfirmation.hasOne(Winner, {foreignKey: "receipt_confirm_id"})
Winner.hasOne(ReceiptConfirmation, {foreignKey: "winner_id"})

module.exports = ReceiptConfirmation;