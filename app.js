const express = require('express');
const bodyParser = require('body-parser');
const sendgridMail = require('@sendgrid/mail');
const { check, validationResult } = require('express-validator/check');

require('dotenv').config()


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static(__dirname + '/public'));

const validators = [
    check('email').isEmail(),
    check('name').isLength({ min: 3 }),
    check('comments').isLength({ min: 3 })
];

app.post('/contact', validators, (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.send('Ensure you have the name, email and message fields filled properly');
    }

    const { name, email, phone, subject, comments } = req.body;
    
    sendgridMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
        to: process.env.EMAIL,
        from: 'noreply@kali-digital.com',
        subject: `You've been contacted by ${name}`,
        text: `${subject} \n${comments} \nEmail: ${email} \nPhone: ${phone}`,
        html: `<div>
                <p><strong>${subject}:</strong></p>
                <p>${comments}</p>
                <span><strong>Email: </strong> ${email}</span> <br>
                <span><strong>Phone: </strong> ${phone}</span>
              </div>
            `,
    };
    sendgridMail.send(msg).then(() => {
        res.send('Email sent successfully');
    }).catch(err => res.send(err))
});

const port = process.env.PORT || '1800'

app.listen(port, function () {
  console.log(`App listening on port ${port}!`);
});
