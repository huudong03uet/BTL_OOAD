const client = require('../../../conf/redis');

let set_value_redis = async (key, jsonValue, ttl = 60 * 60 * 24 * 7) => {
    const stringValue = JSON.stringify(jsonValue);
    await client.set(key, stringValue);
    // const expireTime = Date.now() + ttl;
    // await client.expireAt(key, Math.floor(expireTime));
};

let update_value_redis = async (key, value) => {
    if (key.includes('_')) {
        const [user_id, stt] = key.split('_');

        await delete_key_redis(`${user_id}_3`);
        let product_id = await get_value_redis(`${user_id}_2`)
        if (product_id !== value) {
            await set_value_redis(`${user_id}_3`, product_id);
        }
        product_id = await get_value_redis(`${user_id}_1`)
        if (product_id !== value) {
            await set_value_redis(`${user_id}_2`, product_id);
        }
        await set_value_redis(`${user_id}_1`, value);
        return;
    } else {
        throw new Error('Key should contain "_"');
    }
};

let get_value_redis = async (key) => {
    const stringValue = await client.get(key);
    if (stringValue === null) {
        return null;
    }
    const jsonValue = JSON.parse(stringValue);
    return jsonValue;
};

let delete_key_redis = async (key) => {
    await client.del(key);
};


async function get_notifies(key) {
    try {
        let keys = await client.keys(key, (err, keys) => {
            if (err) {
                reject(err);
            } else {
                resolve(keys);
            }
        });

        const values = await Promise.all(keys.map(key => get_value_redis(key)));

        return values;

    } catch (error) {
        console.error(`Error getting notifies for ${role} ${role_id}: ${error.message}`);
        throw error;
    }
}

module.exports = {
    set_value_redis,
    get_value_redis,
    delete_key_redis,
    update_value_redis,
    get_notifies
};
