const winston = require('winston');
require('dotenv').config({path: './conf/.env'})

const { combine, timestamp, align, printf} = winston.format;


const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || "debug",
    format: combine(
        timestamp({format: "YYYY-MM-DD hh:mm:ss.SSS A"}),
        align(),
        printf(infor => `[${infor.timestamp}] ${infor.level}: ${infor.message}`)
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ dirname: "logs", filename: 'app.log' })
    ]
});

logger.on('error', (error) => {
    console.error('Logger error:', error);
});

module.exports = logger;
