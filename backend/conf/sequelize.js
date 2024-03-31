const { Sequelize } = require('sequelize');
const logger = require('./logger')
require('dotenv').config({path: './conf/.env'})

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
});

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true });
        // await sequelize.sync({ force: true });
        logger.info('Connection has been established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
})();

module.exports = sequelize; 
