const nodemailer = require('nodemailer');
require('dotenv').config({path: './conf/.env'})


const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE || 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
    }
});

module.exports = transporter;
