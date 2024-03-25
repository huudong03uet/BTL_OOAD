const transporter = require("../../../conf/email")
const logger = require("../../../conf/logger")


let send_email = async (from_mail, to_mail, message, subject) => {
    // console.log(from_mail, to_mail, message, subject)
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
