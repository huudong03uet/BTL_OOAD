const nodemailer = require('nodemailer');
const logger = require('./logger')
require('dotenv').config({path: './conf/.env'})


const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});


let send_email = async (from_mail, to_mail, message, subject) => {
    await transporter.sendMail(
        {
            from: from_mail,
            to: to_mail,
            subject: subject,
            text: message,
        }, (err) => {
            if (err) {
                logger.error(`Send mail: ${err}`)
                return false;
            } else {
                logger.info(`Send mail: DONE`)
                return true;
            }
        }
    );
}

module.exports = send_email;
