const bcrypt = require('bcrypt');
const logger = require("../../../conf/logger")

let hash_password = async (password) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        return { success: true, hashedPassword };
    } catch (err) {
        logger.error(`Hash password: ${err}`)
        return { success: false, error: err };
    }
}


let compare_password = async (password1, password2) => {
    try {
        const result = await bcrypt.compare(password1, password2);
        return result;
    } catch (err) {
        logger.error(`Compare password: ${err}`)
        return false;
    }
}


module.exports = {hash_password, compare_password}
