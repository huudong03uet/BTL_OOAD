const redis = require('redis');
require('dotenv').config({ path: './conf/.env' });

const client = redis.createClient({
    host: process.env.DB_HOST,
    port: process.env.REDIS_PORT
});

client.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

(async () => {
    try {
        await client.connect()
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
    }
})();

module.exports = client;
