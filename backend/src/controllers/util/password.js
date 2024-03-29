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

function random_password() {
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()_+';
    const allChars = uppercaseChars + lowercaseChars + numberChars + specialChars;

    let password = '';

    password += uppercaseChars.charAt(Math.floor(Math.random() * uppercaseChars.length));
    password += lowercaseChars.charAt(Math.floor(Math.random() * lowercaseChars.length));
    password += numberChars.charAt(Math.floor(Math.random() * numberChars.length));
    password += specialChars.charAt(Math.floor(Math.random() * specialChars.length));

    for (let i = 4; i < passwordLength; i++) {
        password += allChars.charAt(Math.floor(Math.random() * allChars.length));
    }

    password = password.split('').sort(() => Math.random() - 0.5).join('');

    return password;
}


module.exports = {hash_password, compare_password, random_password}
