'use strict';

const nodemailer = require('nodemailer');


const mail = (html, subject, from) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.SMTP_USER, // generated ethereal user
            pass: process.env.SMTP_PASS // generated ethereal password
        }
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from, // sender address
        to: 'hello@kali.digital', // list of receivers
        subject, // Subject line
        html: '<b>Hello world?</b>' // html body
    };

    // send mail with defined transport object
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject();
            }

            // Preview only available when sending through an Ethereal account
            resolve();

            // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
            // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
        });


    });



};

module.exports = mail;