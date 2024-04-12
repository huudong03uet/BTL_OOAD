const client = require('../../../conf/redis');

let set_value_redis = async (key, jsonValue) => {
    const stringValue = JSON.stringify(jsonValue);
    // await client.connect()
    await client.set(key, stringValue);
    // await client.disconnect();
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
    // await client.connect()
    const stringValue = await client.get(key);
    // await client.disconnect();
    const jsonValue = JSON.parse(stringValue);
    return jsonValue;
};

let delete_key_redis = async (key) => {
    // await client.connect()
    await client.del(key);
    // await client.disconnect();
};

module.exports = {
    set_value_redis,
    get_value_redis,
    delete_key_redis,
    update_value_redis
};
